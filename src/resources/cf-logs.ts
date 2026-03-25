import type { BaseClient } from "../client.js";
import type { CFLogEntry } from "../types/cf-logs.js";

export class CFLogs {
	constructor(private client: BaseClient) {}

	async get(teamId: string, monitorId: string, probeId: string): Promise<CFLogEntry> {
		return JSON.parse(await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}/probes/${probeId}/cf-log`)) as CFLogEntry;
	}

	async list(teamId: string, monitorId: string, options?: { from?: string; to?: string; limit?: number }): Promise<CFLogEntry[]> {
		const params: Record<string, string> = {};
		if (options?.from) params.from = options.from;
		if (options?.to) params.to = options.to;
		if (options?.limit != null) params.limit = String(options.limit);
		const qs = Object.keys(params).length > 0 ? params : undefined;
		return JSON.parse(await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}/cf-logs`, { params: qs })) as CFLogEntry[];
	}
}
