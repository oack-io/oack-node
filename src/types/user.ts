export interface User {
	id: string;
	email: string;
	email_verified: boolean;
	name: string;
	role: string;
	provider?: string;
	avatar?: string;
	created_at: string;
	updated_at: string;
}

export interface Preferences {
	user_id: string;
	time_format: string;
	theme: string;
}

export interface UpdatePreferencesParams {
	time_format?: string;
	theme?: string;
}

export interface PushDevice {
	id: string;
	token: string;
	platform: string;
	created_at: string;
}

export interface TelegramLink {
	link: string;
	code: string;
	expires_in: number;
}

export interface TelegramLinkStatus {
	status: string;
	channel_id?: string;
}

export interface NotificationPreferences {
	muted_monitors: string[];
	quiet_hours: QuietHours | null;
	updated_at: string;
}

export interface QuietHours {
	start: string;
	end: string;
	timezone: string;
}

export interface UpdateNotificationPreferencesParams {
	muted_monitors?: string[];
	quiet_hours?: QuietHours | null;
}
