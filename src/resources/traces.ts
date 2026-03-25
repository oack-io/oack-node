import type { BaseClient } from "../client.js";
import type { TraceList } from "../types/traces.js";

export class Traces {
	constructor(private client: BaseClient) {}

	async list(teamId: string, monitorId: string, options?: { checker_id?: string; limit?: number }): Promise<TraceList> {
		const params: Record<string, string> = {};
		if (options?.checker_id) params.checkerID = options.checker_id;
		if (options?.limit != null) params.limit = String(options.limit);
		const qs = Object.keys(params).length > 0 ? params : undefined;
		return JSON.parse(
			await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}/traces`, { params: qs }),
		) as TraceList;
	}

	async request(teamId: string, monitorId: string): Promise<void> {
		await this.client.request("POST", `/api/v1/teams/${teamId}/monitors/${monitorId}/traces`);
	}
}
