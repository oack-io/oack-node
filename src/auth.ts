/**
 * RFC 8628 Device Authorization Flow — browser-based login with in-memory JWT.
 *
 * Opens the verification URL in the default browser, polls until the user
 * completes authentication, and returns the JWT. The token lives only in
 * memory and is never written to disk.
 */

import { OackError } from "./errors.js";

const DEFAULT_BASE_URL = "https://api.oack.io";

export interface DeviceFlowOptions {
	/** API base URL (default: https://api.oack.io). */
	baseUrl?: string;
	/** HTTP request timeout in milliseconds (default: 30000). */
	timeout?: number;
	/** Whether to auto-open the verification URL in the browser (default: true). */
	openBrowser?: boolean;
}

interface DeviceCodeResponse {
	device_code: string;
	user_code: string;
	verification_uri_complete: string;
	interval: number;
}

interface TokenPollResponse {
	access_token?: string;
	error?: string;
}

/**
 * Run the RFC 8628 device authorization flow and return a JWT.
 *
 * Opens the verification URL in the default browser, then polls until
 * the user completes authentication. The token is returned as a plain
 * string and lives only in memory — it is never written to disk.
 *
 * @example
 * ```typescript
 * import { deviceFlowAuthenticate, Oack } from "oack-node";
 *
 * const jwt = await deviceFlowAuthenticate();
 * const client = new Oack({ apiKey: jwt });
 * ```
 */
export async function deviceFlowAuthenticate(options?: DeviceFlowOptions): Promise<string> {
	const baseUrl = (options?.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, "");
	const timeout = options?.timeout ?? 30_000;
	const openBrowser = options?.openBrowser ?? true;

	const codeResp = await fetch(`${baseUrl}/api/v1/auth/device/code`, {
		method: "POST",
		signal: AbortSignal.timeout(timeout),
	});

	if (!codeResp.ok) {
		throw new OackError(`device code request failed: HTTP ${codeResp.status}`);
	}

	const codeData = (await codeResp.json()) as DeviceCodeResponse;
	const { device_code, user_code, verification_uri_complete } = codeData;
	let pollInterval = (codeData.interval || 5) * 1000;

	console.log("\nTo authenticate, open the following URL in your browser:\n");
	console.log(`  ${verification_uri_complete}\n`);
	console.log(`User code: ${user_code}\n`);
	console.log("Waiting for authorization...\n");

	if (openBrowser) {
		await openUrl(verification_uri_complete);
	}

	while (true) {
		await sleep(pollInterval);

		const tokenResp = await fetch(`${baseUrl}/api/v1/auth/device/token`, {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: `device_code=${encodeURIComponent(device_code)}`,
			signal: AbortSignal.timeout(timeout),
		});

		const tokenData = (await tokenResp.json()) as TokenPollResponse;
		const error = tokenData.error ?? "";

		if (!error && tokenData.access_token) {
			console.log("Authenticated successfully.\n");
			return tokenData.access_token;
		}

		if (error === "authorization_pending") continue;
		if (error === "slow_down") {
			pollInterval += 5000;
			continue;
		}
		if (error === "expired_token") {
			throw new OackError("device code expired — re-run to start a new flow");
		}
		throw new OackError(`unexpected token endpoint error: ${error}`);
	}
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function openUrl(url: string): Promise<void> {
	const { platform } = process;
	const { exec } = await import("node:child_process");
	const cmd = platform === "darwin" ? "open" : platform === "win32" ? "start" : "xdg-open";
	exec(`${cmd} ${JSON.stringify(url)}`);
}
