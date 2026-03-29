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

import { afterAll, beforeAll, describe, expect, it } from "vitest";
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
				url: "https://www.google.com",
				check_interval_ms: 30000,
			});
			expect(monitor.id).toBeTruthy();
			expect(monitor.name).toBe(monitorName);
			expect(monitor.url).toBe("https://www.google.com");
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
				url: "https://www.google.com",
				check_interval_ms: 30000,
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
				config: { url: "https://webhook.site/test" },
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
			expect(sub.plan).toBeTruthy();
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
				url: "https://www.google.com",
				check_interval_ms: 30000,
			});
			monitorId = monitor.id;
		});

		afterAll(async () => {
			if (monitorId) await client.monitors.delete(teamId, monitorId);
			if (teamId) await client.teams.delete(teamId);
		});

		it("monitor metrics", async () => {
			const metrics = await client.metrics.getMonitorMetrics(teamId, monitorId);
			expect(metrics).toBeDefined();
		});

		it("expiration", async () => {
			const exp = await client.metrics.getExpiration(teamId, monitorId);
			expect(exp).toBeDefined();
		});

		it("probes list", async () => {
			const probes = await client.probes.list(teamId, monitorId);
			expect(Array.isArray(probes.probes ?? probes)).toBe(true);
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
	// Monitor ↔ Alert Channel Linking
	// -------------------------------------------------------------------
	describe("Monitor-Alert Channel Link", () => {
		let teamId: string;
		let monitorId: string;
		let channelId: string;

		beforeAll(async () => {
			const team = await client.teams.create(ACCOUNT_ID, `ts-acc-link-team-${unique}`);
			teamId = team.id;
			const monitor = await client.monitors.create(teamId, {
				name: `ts-acc-link-mon-${unique}`,
				url: "https://www.google.com",
				check_interval_ms: 30000,
			});
			monitorId = monitor.id;
			const ch = await client.alertChannels.create(teamId, {
				type: "webhook",
				name: `ts-acc-link-ch-${unique}`,
				config: { url: "https://webhook.site/test" },
			});
			channelId = ch.id;
		});

		afterAll(async () => {
			if (monitorId) await client.monitors.delete(teamId, monitorId);
			if (channelId) await client.alertChannels.delete(teamId, channelId);
			if (teamId) await client.teams.delete(teamId);
		});

		it("link channel to monitor", async () => {
			await client.alertChannels.linkMonitorChannel(teamId, monitorId, channelId);
			const linked = await client.alertChannels.listMonitorChannels(teamId, monitorId);
			expect(linked).toContain(channelId);
		});

		it("unlink channel from monitor", async () => {
			await client.alertChannels.unlinkMonitorChannel(teamId, monitorId, channelId);
			const linked = await client.alertChannels.listMonitorChannels(teamId, monitorId);
			expect(linked).not.toContain(channelId);
		});

		it("set monitor channels", async () => {
			const result = await client.alertChannels.setMonitorChannels(teamId, monitorId, [channelId]);
			expect(result).toContain(channelId);

			const cleared = await client.alertChannels.setMonitorChannels(teamId, monitorId, []);
			expect(cleared).toHaveLength(0);
		});
	});

	// -------------------------------------------------------------------
	// Status Pages (full hierarchy)
	// -------------------------------------------------------------------
	describe("Status Pages", () => {
		let teamId: string;
		let monitorId: string;
		let pageId: string;

		beforeAll(async () => {
			const team = await client.teams.create(ACCOUNT_ID, `ts-acc-sp-team-${unique}`);
			teamId = team.id;
			const monitor = await client.monitors.create(teamId, {
				name: `ts-acc-sp-mon-${unique}`,
				url: "https://www.google.com",
				check_interval_ms: 30000,
			});
			monitorId = monitor.id;
		});

		afterAll(async () => {
			if (pageId) await client.statusPages.delete(ACCOUNT_ID, pageId);
			if (monitorId) await client.monitors.delete(teamId, monitorId);
			if (teamId) await client.teams.delete(teamId);
		});

		it("create status page", async () => {
			const page = await client.statusPages.create(ACCOUNT_ID, {
				name: `ts-acc-page-${unique}`,
				slug: `ts-acc-${unique}-status`,
			});
			expect(page.id).toBeTruthy();
			expect(page.slug).toBe(`ts-acc-${unique}-status`);
			pageId = page.id;
		});

		it("get status page", async () => {
			const page = await client.statusPages.get(ACCOUNT_ID, pageId);
			expect(page.id).toBe(pageId);
		});

		it("list status pages", async () => {
			const pages = await client.statusPages.list(ACCOUNT_ID);
			expect(pages.some((p) => p.id === pageId)).toBe(true);
		});

		it("update status page", async () => {
			const updated = await client.statusPages.update(ACCOUNT_ID, pageId, {
				name: `ts-acc-page-${unique}-updated`,
				slug: `ts-acc-${unique}-status`,
			});
			expect(updated.name).toBe(`ts-acc-page-${unique}-updated`);
		});

		it("component group CRUD", async () => {
			const group = await client.statusPages.createComponentGroup(ACCOUNT_ID, pageId, {
				name: `ts-acc-group-${unique}`,
				position: 0,
			});
			expect(group.id).toBeTruthy();

			const groups = await client.statusPages.listComponentGroups(ACCOUNT_ID, pageId);
			expect(groups.some((g) => g.id === group.id)).toBe(true);

			await client.statusPages.deleteComponentGroup(ACCOUNT_ID, pageId, group.id);
		});

		it("component CRUD", async () => {
			const comp = await client.statusPages.createComponent(ACCOUNT_ID, pageId, {
				name: `ts-acc-comp-${unique}`,
				position: 0,
			});
			expect(comp.id).toBeTruthy();

			const comps = await client.statusPages.listComponents(ACCOUNT_ID, pageId);
			expect(comps.some((c) => c.id === comp.id)).toBe(true);

			await client.statusPages.deleteComponent(ACCOUNT_ID, pageId, comp.id);
		});

		it("watchdog CRUD", async () => {
			const comp = await client.statusPages.createComponent(ACCOUNT_ID, pageId, {
				name: `ts-acc-wd-comp-${unique}`,
				position: 0,
			});

			const wd = await client.watchdogs.create(ACCOUNT_ID, pageId, comp.id, {
				monitor_id: monitorId,
				severity: "major",
			});
			expect(wd.id).toBeTruthy();

			const wds = await client.watchdogs.list(ACCOUNT_ID, pageId, comp.id);
			expect(wds.some((w) => w.id === wd.id)).toBe(true);

			await client.watchdogs.delete(ACCOUNT_ID, pageId, comp.id, wd.id);
			await client.statusPages.deleteComponent(ACCOUNT_ID, pageId, comp.id);
		});

		it("incident CRUD", async () => {
			const inc = await client.statusPages.createIncident(ACCOUNT_ID, pageId, {
				name: `ts-acc-incident-${unique}`,
				message: "Test incident",
				severity: "minor",
			});
			expect(inc.id).toBeTruthy();

			const incidents = await client.statusPages.listIncidents(ACCOUNT_ID, pageId);
			expect(incidents.some((i) => i.id === inc.id)).toBe(true);

			const fetched = await client.statusPages.getIncident(ACCOUNT_ID, pageId, inc.id);
			expect(fetched.name).toBe(`ts-acc-incident-${unique}`);

			await client.statusPages.deleteIncident(ACCOUNT_ID, pageId, inc.id);
		});

		it("maintenance CRUD", async () => {
			const maint = await client.statusPages.createMaintenance(ACCOUNT_ID, pageId, {
				name: `ts-acc-maint-${unique}`,
				message: "Test maintenance",
				scheduled_start: "2099-01-01T00:00:00Z",
				scheduled_end: "2099-01-02T00:00:00Z",
				scheduled_duration_minutes: 60,
			});
			expect(maint.id).toBeTruthy();

			const maints = await client.statusPages.listMaintenances(ACCOUNT_ID, pageId);
			expect(maints.some((m) => m.id === maint.id)).toBe(true);

			await client.statusPages.deleteMaintenance(ACCOUNT_ID, pageId, maint.id);
		});

		it("incident template CRUD", async () => {
			const tmpl = await client.statusPages.createIncidentTemplate(ACCOUNT_ID, pageId, {
				title: `ts-acc-tmpl-${unique}`,
				name: `ts-acc-tmpl-${unique}`,
				message: "Template body",
				severity: "minor",
			});
			expect(tmpl.id).toBeTruthy();

			const tmpls = await client.statusPages.listIncidentTemplates(ACCOUNT_ID, pageId);
			expect(tmpls.some((t) => t.id === tmpl.id)).toBe(true);

			await client.statusPages.deleteIncidentTemplate(ACCOUNT_ID, pageId, tmpl.id);
		});
	});

	// -------------------------------------------------------------------
	// Team API Keys
	// -------------------------------------------------------------------
	describe("Team API Keys", () => {
		let teamId: string;

		beforeAll(async () => {
			const team = await client.teams.create(ACCOUNT_ID, `ts-acc-apikey-team-${unique}`);
			teamId = team.id;
		});

		afterAll(async () => {
			if (teamId) await client.teams.delete(teamId);
		});

		it("create, list, delete", async () => {
			const result = await client.teams.createAPIKey(teamId, {
				name: `ts-acc-key-${unique}`,
			});
			expect(result.key).toBeTruthy();
			expect(result.api_key.id).toBeTruthy();

			const keys = await client.teams.listAPIKeys(teamId);
			expect(keys.some((k) => k.id === result.api_key.id)).toBe(true);

			await client.teams.deleteAPIKey(teamId, result.api_key.id);
		});
	});

	// -------------------------------------------------------------------
	// Monitor (full fields)
	// -------------------------------------------------------------------
	describe("Monitor Full Fields", () => {
		let teamId: string;

		beforeAll(async () => {
			const team = await client.teams.create(ACCOUNT_ID, `ts-acc-monfull-team-${unique}`);
			teamId = team.id;
		});

		afterAll(async () => {
			if (teamId) await client.teams.delete(teamId);
		});

		it("create with all optional fields", async () => {
			const monitor = await client.monitors.create(teamId, {
				name: `ts-acc-full-${unique}`,
				url: "https://www.google.com",
				check_interval_ms: 60000,
				timeout_ms: 10000,
				http_method: "GET",
				http_version: "1.1",
				headers: { "X-Test": "true" },
				follow_redirects: true,
				allowed_status_codes: ["2xx"],
				failure_threshold: 5,
				latency_threshold_ms: 5000,
				ssl_expiry_enabled: true,
				ssl_expiry_thresholds: [30, 14, 7],
				domain_expiry_enabled: false,
				uptime_threshold_good: 99.9,
				uptime_threshold_degraded: 99.0,
				uptime_threshold_critical: 95.0,
			});
			expect(monitor.id).toBeTruthy();
			expect(monitor.check_interval_ms).toBe(60000);
			expect(monitor.timeout_ms).toBe(10000);
			expect(monitor.http_method).toBe("GET");
			expect(monitor.follow_redirects).toBe(true);
			expect(monitor.failure_threshold).toBe(5);
			expect(monitor.latency_threshold_ms).toBe(5000);

			await client.monitors.delete(teamId, monitor.id);
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

	// -------------------------------------------------------------------
	// Account API Keys
	// -------------------------------------------------------------------
	describe("Account API Keys", () => {
		let keyId: string;

		afterAll(async () => {
			if (keyId) await client.accounts.deleteAPIKey(ACCOUNT_ID, keyId);
		});

		it("create", async () => {
			const result = await client.accounts.createAPIKey(ACCOUNT_ID, { name: `ts-acc-key-${unique}` });
			expect(result.key).toBeTruthy();
			expect(result.api_key.name).toBe(`ts-acc-key-${unique}`);
			keyId = result.api_key.id;
		});

		it("list", async () => {
			const keys = await client.accounts.listAPIKeys(ACCOUNT_ID);
			expect(keys.some((k) => k.id === keyId)).toBe(true);
		});
	});

	// -------------------------------------------------------------------
	// Comments
	// -------------------------------------------------------------------
	describe("Comments", () => {
		let teamId: string;
		let monitorId: string;

		beforeAll(async () => {
			const team = await client.teams.create(ACCOUNT_ID, `ts-acc-comments-team-${unique}`);
			teamId = team.id;
			const monitor = await client.monitors.create(teamId, {
				name: `ts-acc-comments-mon-${unique}`,
				url: "https://www.google.com",
				check_interval_ms: 30000,
			});
			monitorId = monitor.id;
		});

		afterAll(async () => {
			if (monitorId) await client.monitors.delete(teamId, monitorId);
			if (teamId) await client.teams.delete(teamId);
		});

		it("create, list, edit, resolve, reopen, reply, delete", async () => {
			// Create
			const comment = await client.comments.create(teamId, monitorId, {
				body: "test comment",
				anchor_at: new Date().toISOString(),
			});
			expect(comment.id).toBeTruthy();
			expect(comment.body).toBe("test comment");

			// List
			const from = new Date(Date.now() - 60 * 60 * 1000).toISOString();
			const to = new Date(Date.now() + 60 * 60 * 1000).toISOString();
			const comments = await client.comments.list(teamId, monitorId, { from, to, include_resolved: true });
			expect(comments.some((c) => c.id === comment.id)).toBe(true);

			// Edit
			const edited = await client.comments.edit(teamId, monitorId, comment.id, "edited body");
			expect(edited.body).toBe("edited body");

			// Resolve
			await client.comments.resolve(teamId, monitorId, comment.id);

			// Reopen
			await client.comments.reopen(teamId, monitorId, comment.id);

			// Reply
			const reply = await client.comments.reply(teamId, monitorId, comment.id, "reply text");
			expect(reply.id).toBeTruthy();

			// List replies
			const replies = await client.comments.listReplies(teamId, monitorId, comment.id);
			expect(replies.some((r) => r.id === reply.id)).toBe(true);

			// Delete
			await client.comments.delete(teamId, monitorId, reply.id);
			await client.comments.delete(teamId, monitorId, comment.id);
		});
	});

	// -------------------------------------------------------------------
	// Shares
	// -------------------------------------------------------------------
	describe("Shares", () => {
		let teamId: string;
		let monitorId: string;

		beforeAll(async () => {
			const team = await client.teams.create(ACCOUNT_ID, `ts-acc-shares-team-${unique}`);
			teamId = team.id;
			const monitor = await client.monitors.create(teamId, {
				name: `ts-acc-shares-mon-${unique}`,
				url: "https://www.google.com",
				check_interval_ms: 30000,
			});
			monitorId = monitor.id;
		});

		afterAll(async () => {
			if (monitorId) await client.monitors.delete(teamId, monitorId);
			if (teamId) await client.teams.delete(teamId);
		});

		it("create, list, revoke", async () => {
			const now = new Date();
			const from = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
			const to = now.toISOString();
			const share = await client.shares.create(teamId, monitorId, {
				from,
				to,
				access_mode: "public",
				expires_in: "7d",
			});
			expect(share.id).toBeTruthy();
			expect(share.token).toBeTruthy();

			const shares = await client.shares.list(teamId, monitorId);
			expect(shares.some((s) => s.id === share.id)).toBe(true);

			await client.shares.revoke(teamId, monitorId, share.id);
		});
	});

	// -------------------------------------------------------------------
	// Traces
	// -------------------------------------------------------------------
	describe("Traces", () => {
		let teamId: string;
		let monitorId: string;

		beforeAll(async () => {
			const team = await client.teams.create(ACCOUNT_ID, `ts-acc-traces-team-${unique}`);
			teamId = team.id;
			const monitor = await client.monitors.create(teamId, {
				name: `ts-acc-traces-mon-${unique}`,
				url: "https://www.google.com",
				check_interval_ms: 30000,
			});
			monitorId = monitor.id;
		});

		afterAll(async () => {
			if (monitorId) await client.monitors.delete(teamId, monitorId);
			if (teamId) await client.teams.delete(teamId);
		});

		it("list", async () => {
			try {
				const traces = await client.traces.list(teamId, monitorId);
				expect(Array.isArray(traces)).toBe(true);
			} catch (e: any) {
				// Traces endpoint may not be enabled in all environments
				if (e?.statusCode === 404) {
					return;
				}
				throw e;
			}
		});
	});

	// -------------------------------------------------------------------
	// User Preferences
	// -------------------------------------------------------------------
	describe("User Preferences", () => {
		it("get preferences", async () => {
			const prefs = await client.user.getPreferences();
			expect(prefs).toBeTruthy();
		});
	});

	// -------------------------------------------------------------------
	// Monitor move, testAlert
	// -------------------------------------------------------------------
	describe("Monitor Actions", () => {
		let teamId: string;
		let team2Id: string;

		beforeAll(async () => {
			const team = await client.teams.create(ACCOUNT_ID, `ts-acc-actions-team-${unique}`);
			teamId = team.id;
			const team2 = await client.teams.create(ACCOUNT_ID, `ts-acc-actions-team2-${unique}`);
			team2Id = team2.id;
		});

		afterAll(async () => {
			if (team2Id) await client.teams.delete(team2Id);
			if (teamId) await client.teams.delete(teamId);
		});

		it("move monitor between teams", async () => {
			const monitor = await client.monitors.create(teamId, {
				name: `ts-acc-move-${unique}`,
				url: "https://www.google.com",
				check_interval_ms: 30000,
			});

			const moved = await client.monitors.move(teamId, monitor.id, team2Id);
			expect(moved.team_id).toBe(team2Id);

			await client.monitors.delete(team2Id, monitor.id);
		});

		it("test alert", async () => {
			const monitor = await client.monitors.create(teamId, {
				name: `ts-acc-testalert-${unique}`,
				url: "https://www.google.com",
				check_interval_ms: 30000,
			});

			await client.monitors.testAlert(teamId, monitor.id);
			await client.monitors.delete(teamId, monitor.id);
		});
	});

	// -------------------------------------------------------------------
	// Env Vars
	// -------------------------------------------------------------------
	describe("EnvVars", () => {
		let envTeamId: string;
		const envTeamName = `ts-env-${unique}`;
		const testKey = `TEST_KEY_${unique}`;

		beforeAll(async () => {
			const team = await client.teams.create(ACCOUNT_ID, envTeamName);
			envTeamId = team.id;
		});

		afterAll(async () => {
			if (envTeamId) await client.teams.delete(envTeamId);
		});

		it("create", async () => {
			const ev = await client.envVars.create(envTeamId, {
				key: testKey,
				value: "test-value",
				is_secret: false,
			});
			expect(ev.key).toBe(testKey);
			expect(ev.value).toBe("test-value");
			expect(ev.is_secret).toBe(false);
		});

		it("list", async () => {
			const vars = await client.envVars.list(envTeamId);
			expect(vars.some((v) => v.key === testKey)).toBe(true);
		});

		it("update", async () => {
			const updated = await client.envVars.update(envTeamId, testKey, {
				value: "updated-value",
			});
			expect(updated.value).toBe("updated-value");
		});

		it("delete", async () => {
			await client.envVars.delete(envTeamId, testKey);
			const remaining = await client.envVars.list(envTeamId);
			expect(remaining.some((v) => v.key === testKey)).toBe(false);
		});
	});
});
