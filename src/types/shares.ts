export interface Share {
	id: string;
	token: string;
	share_url: string;
	monitor_id: string;
	from: string;
	to: string;
	access_mode: string;
	expires_at: string;
	redacted_groups: string[];
	include_comments: boolean;
	view_count: number;
	created_at: string;
}

export interface CreateShareParams {
	from: string;
	to: string;
	access_mode?: string;
	expires_in?: string;
	redacted_groups?: string[];
	include_groups?: string[];
	include_comments?: boolean;
}
