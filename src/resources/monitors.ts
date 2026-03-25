import type { BaseClient } from "../client.js";
import type { CreateMonitorParams, Monitor } from "../types/monitors.js";

export class Monitors {
	constructor(private client: BaseClient) {}

	async create(teamId: string, params: CreateMonitorParams): Promise<Monitor> {
		return JSON.parse(
			await this.client.request("POST", `/api/v1/teams/${teamId}/monitors`, { json: params }),
		) as Monitor;
	}

	async list(teamId: string): Promise<Monitor[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/teams/${teamId}/monitors`)) as Monitor[];
	}

	async get(teamId: string, monitorId: string): Promise<Monitor> {
		return JSON.parse(await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}`)) as Monitor;
	}

	async update(teamId: string, monitorId: string, params: CreateMonitorParams): Promise<Monitor> {
		return JSON.parse(
			await this.client.request("PUT", `/api/v1/teams/${teamId}/monitors/${monitorId}`, { json: params }),
		) as Monitor;
	}

	async delete(teamId: string, monitorId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/teams/${teamId}/monitors/${monitorId}`);
	}

	async pause(teamId: string, monitorId: string): Promise<Monitor> {
		return JSON.parse(
			await this.client.request("POST", `/api/v1/teams/${teamId}/monitors/${monitorId}/pause`),
		) as Monitor;
	}

	async unpause(teamId: string, monitorId: string): Promise<Monitor> {
		return JSON.parse(
			await this.client.request("POST", `/api/v1/teams/${teamId}/monitors/${monitorId}/unpause`),
		) as Monitor;
	}

	async duplicate(teamId: string, monitorId: string): Promise<Monitor> {
		return JSON.parse(
			await this.client.request("POST", `/api/v1/teams/${teamId}/monitors/${monitorId}/duplicate`),
		) as Monitor;
	}

	async move(teamId: string, monitorId: string, targetTeamId: string): Promise<Monitor> {
		return JSON.parse(
			await this.client.request("POST", `/api/v1/teams/${teamId}/monitors/${monitorId}/move`, {
				json: { target_team_id: targetTeamId },
			}),
		) as Monitor;
	}

	async testAlert(teamId: string, monitorId: string): Promise<void> {
		await this.client.request("POST", `/api/v1/teams/${teamId}/monitors/${monitorId}/test-alert`);
	}
}
