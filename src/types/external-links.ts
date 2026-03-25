export interface ExternalLink {
	id: string;
	team_id: string;
	name: string;
	url_template: string;
	icon_url: string;
	time_window_minutes: number;
	created_at: string;
	updated_at: string;
}

export interface CreateExternalLinkParams {
	name: string;
	url_template: string;
	icon_url?: string;
	time_window_minutes: number;
}

export interface UpdateExternalLinkParams {
	name?: string;
	url_template?: string;
	icon_url?: string;
	time_window_minutes?: number;
}

export interface CreateExternalLinkResult extends ExternalLink {
	auto_assigned_monitors: string[];
}
