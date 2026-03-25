import { parseError } from "./errors.js";

const DEFAULT_BASE_URL = "https://api.oack.io";
const DEFAULT_TIMEOUT = 30_000;
const DEFAULT_MAX_RETRIES = 2;
const RETRYABLE_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504]);
const IDEMPOTENT_METHODS = new Set(["GET", "PUT", "DELETE", "HEAD", "OPTIONS"]);

export interface OackOptions {
	apiKey: string | (() => string);
	baseUrl?: string;
	timeout?: number;
	maxRetries?: number;
}

export class BaseClient {
	private readonly baseUrl: string;
	private readonly timeout: number;
	private readonly maxRetries: number;
	private readonly apiKey: string | (() => string);

	constructor(options: OackOptions) {
		this.apiKey = options.apiKey;
		this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, "");
		this.timeout = options.timeout ?? DEFAULT_TIMEOUT;
		this.maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;
	}

	private getToken(): string {
		return typeof this.apiKey === "function" ? this.apiKey() : this.apiKey;
	}

	async request(method: string, path: string, options?: { json?: unknown; params?: Record<string, string> }): Promise<string> {
		let url = this.baseUrl + path;
		if (options?.params) {
			const qs = new URLSearchParams(options.params).toString();
			if (qs) url += `?${qs}`;
		}

		const headers: Record<string, string> = {};
		const token = this.getToken();
		if (token) headers.Authorization = `Bearer ${token}`;

		let body: string | undefined;
		if (options?.json !== undefined) {
			headers["Content-Type"] = "application/json";
			body = JSON.stringify(options.json);
		}

		let lastError: Error | undefined;

		for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
			const controller = new AbortController();
			const timer = setTimeout(() => controller.abort(), this.timeout);

			let resp: Response;
			try {
				resp = await fetch(url, { method, headers, body, signal: controller.signal });
			} catch (err) {
				clearTimeout(timer);
				lastError = err instanceof Error ? err : new Error(String(err));
				if (attempt < this.maxRetries && IDEMPOTENT_METHODS.has(method.toUpperCase())) {
					await sleep(backoffDelay(attempt));
					continue;
				}
				throw lastError;
			} finally {
				clearTimeout(timer);
			}

			if (resp.status < 400) {
				return await resp.text();
			}

			const retryAfter = parseRetryAfter(resp);
			if (
				RETRYABLE_STATUS_CODES.has(resp.status) &&
				attempt < this.maxRetries &&
				(IDEMPOTENT_METHODS.has(method.toUpperCase()) || resp.status === 429)
			) {
				const delay = retryAfter != null && retryAfter > 0 ? retryAfter * 1000 : backoffDelay(attempt);
				await sleep(delay);
				continue;
			}

			const respBody = await resp.text();
			throw parseError(resp.status, respBody, retryAfter);
		}

		throw lastError ?? new Error("max retries exceeded");
	}
}

function parseRetryAfter(resp: Response): number | null {
	const val = resp.headers.get("retry-after");
	if (val == null) return null;
	const n = Number.parseFloat(val);
	return Number.isNaN(n) ? null : n;
}

function backoffDelay(attempt: number): number {
	return Math.min(500 * 2 ** attempt + Math.random() * 250, 30_000);
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
