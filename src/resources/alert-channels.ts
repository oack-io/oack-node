import { NotFoundError } from "../errors.js";
import type { BaseClient } from "../client.js";
import type { AlertChannel, AlertEvent, CreateAlertChannelParams } from "../types/alert-channels.js";

export class AlertChannels {
	constructor(private client: BaseClient) {}

	async create(teamId: string, params: CreateAlertChannelParams): Promise<AlertChannel> {
		return JSON.parse(await this.client.request("POST", `/api/v1/teams/${teamId}/alert-channels`, { json: params })) as AlertChannel;
	}

	async list(teamId: string): Promise<AlertChannel[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/teams/${teamId}/alert-channels`)) as AlertChannel[];
	}

	async get(teamId: string, channelId: string): Promise<AlertChannel> {
		const channels = await this.list(teamId);
		const ch = channels.find((c) => c.id === channelId);
		if (!ch) throw new NotFoundError("alert channel not found");
		return ch;
	}

	async update(teamId: string, channelId: string, params: CreateAlertChannelParams): Promise<AlertChannel> {
		return JSON.parse(await this.client.request("PUT", `/api/v1/teams/${teamId}/alert-channels/${channelId}`, { json: params })) as AlertChannel;
	}

	async delete(teamId: string, channelId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/teams/${teamId}/alert-channels/${channelId}`);
	}

	async test(teamId: string, channelId: string): Promise<void> {
		await this.client.request("POST", `/api/v1/teams/${teamId}/alert-channels/${channelId}/test`);
	}

	async listMonitorChannels(teamId: string, monitorId: string): Promise<string[]> {
		const resp = JSON.parse(await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}/alert-channels`)) as { channel_ids: string[] };
		return resp.channel_ids;
	}

	async setMonitorChannels(teamId: string, monitorId: string, channelIds: string[]): Promise<string[]> {
		const resp = JSON.parse(await this.client.request("PUT", `/api/v1/teams/${teamId}/monitors/${monitorId}/alert-channels`, { json: { channel_ids: channelIds } })) as { channel_ids: string[] };
		return resp.channel_ids;
	}

	async linkMonitorChannel(teamId: string, monitorId: string, channelId: string): Promise<void> {
		await this.client.request("POST", `/api/v1/teams/${teamId}/monitors/${monitorId}/alert-channels/${channelId}`);
	}

	async unlinkMonitorChannel(teamId: string, monitorId: string, channelId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/teams/${teamId}/monitors/${monitorId}/alert-channels/${channelId}`);
	}

	async listEvents(teamId: string, monitorId: string): Promise<AlertEvent[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}/alert-events`)) as AlertEvent[];
	}
}
