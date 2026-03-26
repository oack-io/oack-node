export interface Account {
	id: string;
	name: string;
	plan: string;
	deleted_at: string | null;
	created_at: string;
	updated_at: string;
}

export interface AccountMember {
	user_id: string;
	email: string;
	name: string;
	avatar_url: string;
	role: string;
	joined_at: string;
}

export interface AccountInvite {
	id: string;
	account_id: string;
	email: string;
	role: string;
	invited_by: string;
	token: string;
	invite_url: string;
	expires_at: string;
	accepted_at?: string | null;
	revoked_at?: string | null;
	created_at: string;
}

export interface Subscription {
	id: string;
	account_id: string;
	plan: string;
	status: string;
	expires_at: string | null;
	created_at: string;
	updated_at: string;
}

export interface AccountAPIKey {
	id: string;
	account_id: string;
	name: string;
	key_prefix: string;
	created_by: string;
	expires_at: string | null;
	created_at: string;
}

export interface CreateAccountAPIKeyParams {
	name: string;
	expires_at?: string;
}

export interface CreateAccountAPIKeyResult {
	key: string;
	api_key: AccountAPIKey;
}
