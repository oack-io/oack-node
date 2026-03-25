/**
 * Acceptance tests — run against a real API (localhost or production).
 *
 * Requires environment variables:
 *   OACK_API_KEY     — account-level API key (e.g. oack_acc_...)
 *   OACK_ACCOUNT_ID  — account UUID
 *   OACK_API_URL     — API base URL (default: http://localhost:8080)
 *
 * Run:
 *   OACK_API_KEY=... OACK_ACCOUNT_ID=... npx vitest run tests/acc.test.ts
 */

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Oack } from "../src/index.js";

const API_KEY = process.env.OACK_API_KEY ?? "";
const ACCOUNT_ID = process.env.OACK_ACCOUNT_ID ?? "";
const API_URL = process.env.OACK_API_URL ?? "http://localhost:8080";

const skip = !API_KEY || !ACCOUNT_ID;

const unique = String(Date.now());

function createClient(): Oack {
	return new Oack({ apiKey: API_KEY, baseUrl: API_URL });
}

describe.skipIf(skip)("Acceptance Tests", () => {
	const client = createClient();

	// -------------------------------------------------------------------
	// Teams
	// -------------------------------------------------------------------
	describe("Teams", () => {
		let teamId: string;
		const teamName = `ts-acc-team-${unique}`;

		afterAll(async () => {
			if (teamId) await client.teams.delete(teamId);
		});

		it("create", async () => {
			const team = await client.teams.create(ACCOUNT_ID, teamName);
			expect(team.id).toBeTruthy();
			expect(team.name).toBe(teamName);
			teamId = team.id;
		});

		it("get", async () => {
			const team = await client.teams.get(teamId);
			expect(team.id).toBe(teamId);
			expect(team.name).toBe(teamName);
		});

		it("list", async () => {
			const teams = await client.teams.list();
			expect(teams.some((t) => t.id === teamId)).toBe(true);
		});

		it("update", async () => {
			const updated = await client.teams.update(teamId, `${teamName}-updated`);
			expect(updated.name).toBe(`${teamName}-updated`);
		});

		it("list members", async () => {
			const members = await client.teams.listMembers(teamId);
			expect(members.length).toBeGreaterThanOrEqual(1);
		});
	});

	// -------------------------------------------------------------------
	// Monitors
	// -------------------------------------------------------------------
	describe("Monitors", () => {
		let teamId: string;
		let monitorId: string;
		const monitorName = `ts-acc-monitor-${unique}`;

		beforeAll(async () => {
			const team = await client.teams.create(ACCOUNT_ID, `ts-acc-mon-team-${unique}`);
			teamId = team.id;
		});

		afterAll(async () => {
			if (monitorId) await client.monitors.delete(teamId, monitorId);
			if (teamId) await client.teams.delete(teamId);
		});

		it("create", async () => {
			const monitor = await client.monitors.create(teamId, {
				name: monitorName,
				url: "https://example.com",
			});
			expect(monitor.id).toBeTruthy();
			expect(monitor.name).toBe(monitorName);
			expect(monitor.url).toBe("https://example.com");
			monitorId = monitor.id;
		});

		it("get", async () => {
			const monitor = await client.monitors.get(teamId, monitorId);
			expect(monitor.id).toBe(monitorId);
		});

		it("list", async () => {
			const monitors = await client.monitors.list(teamId);
			expect(monitors.some((m) => m.id === monitorId)).toBe(true);
		});

		it("update", async () => {
			const updated = await client.monitors.update(teamId, monitorId, {
				name: `${monitorName}-updated`,
				url: "https://example.com",
			});
			expect(updated.name).toBe(`${monitorName}-updated`);
		});

		it("pause", async () => {
			const paused = await client.monitors.pause(teamId, monitorId);
			expect(paused.status).toBe("paused");
		});

		it("unpause", async () => {
			const unpaused = await client.monitors.unpause(teamId, monitorId);
			expect(unpaused.status).toBe("active");
		});

		it("duplicate", async () => {
			const dup = await client.monitors.duplicate(teamId, monitorId);
			expect(dup.id).not.toBe(monitorId);
			await client.monitors.delete(teamId, dup.id);
		});
	});

	// -------------------------------------------------------------------
	// Alert Channels
	// -------------------------------------------------------------------
	describe("Alert Channels", () => {
		let teamId: string;
		let channelId: string;
		const channelName = `ts-acc-webhook-${unique}`;

		beforeAll(async () => {
			const team = await client.teams.create(ACCOUNT_ID, `ts-acc-alert-team-${unique}`);
			teamId = team.id;
		});

		afterAll(async () => {
			if (channelId) await client.alertChannels.delete(teamId, channelId);
			if (teamId) await client.teams.delete(teamId);
		});

		it("create", async () => {
			const ch = await client.alertChannels.create(teamId, {
				type: "webhook",
				name: channelName,
				config: { url: "https://httpbin.org/post" },
			});
			expect(ch.id).toBeTruthy();
			expect(ch.type).toBe("webhook");
			channelId = ch.id;
		});

		it("list", async () => {
			const channels = await client.alertChannels.list(teamId);
			expect(channels.some((c) => c.id === channelId)).toBe(true);
		});

		it("get", async () => {
			const ch = await client.alertChannels.get(teamId, channelId);
			expect(ch.name).toBe(channelName);
		});
	});

	// -------------------------------------------------------------------
	// Accounts (read-only)
	// -------------------------------------------------------------------
	describe("Accounts", () => {
		it("list", async () => {
			const accounts = await client.accounts.list();
			expect(accounts.length).toBeGreaterThanOrEqual(1);
		});

		it("get", async () => {
			const account = await client.accounts.get(ACCOUNT_ID);
			expect(account.id).toBe(ACCOUNT_ID);
		});

		it("list members", async () => {
			const members = await client.accounts.listMembers(ACCOUNT_ID);
			expect(members.length).toBeGreaterThanOrEqual(1);
		});

		it("get subscription", async () => {
			const sub = await client.accounts.getSubscription(ACCOUNT_ID);
			expect(sub.account_id).toBe(ACCOUNT_ID);
		});
	});

	// -------------------------------------------------------------------
	// Metrics & Probes (read-only)
	// -------------------------------------------------------------------
	describe("Metrics", () => {
		let teamId: string;
		let monitorId: string;

		beforeAll(async () => {
			const team = await client.teams.create(ACCOUNT_ID, `ts-acc-metrics-team-${unique}`);
			teamId = team.id;
			const monitor = await client.monitors.create(teamId, {
				name: `ts-acc-metrics-mon-${unique}`,
				url: "https://example.com",
			});
			monitorId = monitor.id;
		});

		afterAll(async () => {
			if (monitorId) await client.monitors.delete(teamId, monitorId);
			if (teamId) await client.teams.delete(teamId);
		});

		it("monitor metrics", async () => {
			const metrics = await client.metrics.getMonitorMetrics(teamId, monitorId);
			expect(metrics.last_24h).toBeDefined();
		});

		it("expiration", async () => {
			const exp = await client.metrics.getExpiration(teamId, monitorId);
			expect(exp).toBeDefined();
		});

		it("probes list", async () => {
			const probes = await client.probes.list(teamId, monitorId);
			expect(probes.total).toBeGreaterThanOrEqual(0);
		});
	});

	// -------------------------------------------------------------------
	// Geo
	// -------------------------------------------------------------------
	describe("Geo", () => {
		it("list regions", async () => {
			const regions = await client.geo.listRegions();
			expect(Array.isArray(regions)).toBe(true);
		});

		it("list checkers", async () => {
			const checkers = await client.geo.listCheckers();
			expect(Array.isArray(checkers)).toBe(true);
		});
	});

	// -------------------------------------------------------------------
	// External Links
	// -------------------------------------------------------------------
	describe("External Links", () => {
		let teamId: string;
		let linkId: string;
		const linkName = `ts-acc-link-${unique}`;

		beforeAll(async () => {
			const team = await client.teams.create(ACCOUNT_ID, `ts-acc-extlink-team-${unique}`);
			teamId = team.id;
		});

		afterAll(async () => {
			if (linkId) await client.externalLinks.delete(teamId, linkId);
			if (teamId) await client.teams.delete(teamId);
		});

		it("create", async () => {
			const link = await client.externalLinks.create(teamId, {
				name: linkName,
				url_template: "https://grafana.example.com/d/abc?from={{from}}&to={{to}}",
				time_window_minutes: 30,
			});
			expect(link.id).toBeTruthy();
			linkId = link.id;
		});

		it("list", async () => {
			const links = await client.externalLinks.list(teamId);
			expect(links.some((l) => l.id === linkId)).toBe(true);
		});

		it("get", async () => {
			const link = await client.externalLinks.get(teamId, linkId);
			expect(link.name).toBe(linkName);
		});
	});

	// -------------------------------------------------------------------
	// User
	// -------------------------------------------------------------------
	describe("User", () => {
		it("whoami", async () => {
			const user = await client.user.whoami();
			expect(user.id).toBeTruthy();
		});
	});
});
