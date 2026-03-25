import type { BaseClient } from "../client.js";
import type {
	User,
	Preferences,
	UpdatePreferencesParams,
	PushDevice,
	TelegramLink,
	TelegramLinkStatus,
	NotificationPreferences,
	UpdateNotificationPreferencesParams,
} from "../types/user.js";

export class UserResource {
	constructor(private client: BaseClient) {}

	async whoami(): Promise<User> {
		return JSON.parse(await this.client.request("GET", "/api/v1/me")) as User;
	}

	async getPreferences(): Promise<Preferences> {
		return JSON.parse(await this.client.request("GET", "/api/v1/me/preferences")) as Preferences;
	}

	async updatePreferences(params: UpdatePreferencesParams): Promise<Preferences> {
		return JSON.parse(await this.client.request("PUT", "/api/v1/me/preferences", { json: params })) as Preferences;
	}

	async registerDevice(token: string, platform: string): Promise<PushDevice> {
		return JSON.parse(await this.client.request("POST", "/api/v1/me/devices", { json: { token, platform } })) as PushDevice;
	}

	async listDevices(): Promise<PushDevice[]> {
		return JSON.parse(await this.client.request("GET", "/api/v1/me/devices")) as PushDevice[];
	}

	async unregisterDevice(token: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/me/devices/${encodeURIComponent(token)}`);
	}

	async createTelegramLink(options?: { account_id?: string }): Promise<TelegramLink> {
		const params: Record<string, string> = {};
		if (options?.account_id) params.account_id = options.account_id;
		const qs = Object.keys(params).length > 0 ? params : undefined;
		return JSON.parse(await this.client.request("POST", "/api/v1/me/telegram-link", { params: qs })) as TelegramLink;
	}

	async getTelegramLinkStatus(code: string): Promise<TelegramLinkStatus> {
		return JSON.parse(await this.client.request("GET", `/api/v1/me/telegram-link/${code}/status`)) as TelegramLinkStatus;
	}

	async getNotificationPreferences(): Promise<NotificationPreferences> {
		return JSON.parse(await this.client.request("GET", "/api/v1/me/notification-preferences")) as NotificationPreferences;
	}

	async updateNotificationPreferences(params: UpdateNotificationPreferencesParams): Promise<NotificationPreferences> {
		return JSON.parse(await this.client.request("PUT", "/api/v1/me/notification-preferences", { json: params })) as NotificationPreferences;
	}
}
