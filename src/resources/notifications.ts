import type { BaseClient } from "../client.js";
import type { MonitorNotifications, NotificationDefaults } from "../types/notifications.js";

export class Notifications {
	constructor(private client: BaseClient) {}

	async getDefaults(accountId: string): Promise<NotificationDefaults> {
		return JSON.parse(
			await this.client.request("GET", `/api/v1/me/accounts/${accountId}/notification-defaults`),
		) as NotificationDefaults;
	}

	async setDefaults(accountId: string, channelIds: string[]): Promise<NotificationDefaults> {
		return JSON.parse(
			await this.client.request("PUT", `/api/v1/me/accounts/${accountId}/notification-defaults`, {
				json: { channel_ids: channelIds },
			}),
		) as NotificationDefaults;
	}

	async copyChannels(fromAccountId: string, toAccountId: string): Promise<void> {
		await this.client.request("POST", "/api/v1/me/alert-channels/copy", {
			json: { from_account_id: fromAccountId, to_account_id: toAccountId },
		});
	}

	async getMonitor(teamId: string, monitorId: string): Promise<MonitorNotifications> {
		return JSON.parse(
			await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}/my/notifications`),
		) as MonitorNotifications;
	}

	async setMonitor(teamId: string, monitorId: string, channelIds: string[]): Promise<MonitorNotifications> {
		return JSON.parse(
			await this.client.request("PUT", `/api/v1/teams/${teamId}/monitors/${monitorId}/my/notifications`, {
				json: { channel_ids: channelIds },
			}),
		) as MonitorNotifications;
	}

	async removeMonitor(teamId: string, monitorId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/teams/${teamId}/monitors/${monitorId}/my/notifications`);
	}
}
