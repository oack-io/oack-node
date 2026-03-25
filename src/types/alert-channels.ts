export interface AlertChannel {
	id: string;
	team_id: string;
	type: string;
	name: string;
	config: Record<string, string>;
	enabled: boolean;
	email_verified: boolean;
	scope: string;
	created_at: string;
	updated_at: string;
}

export interface CreateAlertChannelParams {
	type: string;
	name: string;
	config: Record<string, string>;
	enabled?: boolean;
}

export interface AlertEvent {
	id: string;
	monitor_id: string;
	channel_id: string;
	type: string;
	message: string;
	delivered: boolean;
	error: string;
	created_at: string;
}
