export interface EnvVar {
	id: string;
	team_id: string;
	key: string;
	value: string;
	is_secret: boolean;
	created_at: string;
	updated_at: string;
}

export interface CreateEnvVarParams {
	key: string;
	value: string;
	is_secret?: boolean;
}

export interface UpdateEnvVarParams {
	value: string;
	is_secret?: boolean;
}
