import type { BaseClient } from "../client.js";
import type { CreateShareParams, Share } from "../types/shares.js";

export class Shares {
	constructor(private client: BaseClient) {}

	async create(teamId: string, monitorId: string, params: CreateShareParams): Promise<Share> {
		return JSON.parse(
			await this.client.request("POST", `/api/v1/teams/${teamId}/monitors/${monitorId}/shares`, { json: params }),
		) as Share;
	}

	async list(teamId: string, monitorId: string): Promise<Share[]> {
		return JSON.parse(
			await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}/shares`),
		) as Share[];
	}

	async revoke(teamId: string, monitorId: string, shareId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/teams/${teamId}/monitors/${monitorId}/shares/${shareId}`);
	}
}
