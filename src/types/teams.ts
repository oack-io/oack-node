export interface Team {
	id: string;
	name: string;
	created_at: string;
	updated_at: string;
}

export interface TeamMember {
	user_id: string;
	email: string;
	name: string;
	avatar_url: string;
	role: string;
	joined_at: string;
}

export interface TeamInvite {
	id: string;
	team_id: string;
	token: string;
	role: string;
	created_by: string;
	expires_at: string;
	created_at: string;
}

export interface AcceptInviteResult {
	team_id: string;
	team_name: string;
	role: string;
}

export interface TeamAPIKey {
	id: string;
	team_id: string;
	name: string;
	key_prefix: string;
	created_by: string;
	expires_at: string | null;
	created_at: string;
}

export interface CreateTeamAPIKeyParams {
	name: string;
	expires_at?: string;
}

export interface CreateTeamAPIKeyResult {
	key: string;
	api_key: TeamAPIKey;
}
