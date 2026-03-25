export interface PDIntegration {
	id: string;
	account_id: string;
	region: string;
	api_key: string;
	service_ids: string[];
	sync_enabled: boolean;
	sync_error: string;
	last_synced_at: string | null;
	created_by: string;
	created_at: string;
	updated_at: string;
}

export interface CreatePDIntegrationParams {
	api_key: string;
	region: string;
	service_ids?: string[];
}

export interface UpdatePDIntegrationParams {
	api_key?: string;
	region?: string;
	service_ids?: string[];
	sync_enabled?: boolean;
}

export interface CFIntegration {
	id: string;
	account_id: string;
	zone_id: string;
	zone_name: string;
	api_token: string;
	enabled: boolean;
	session_error: string;
	last_connected_at: string | null;
	created_by: string;
	created_at: string;
	updated_at: string;
}

export interface CreateCFIntegrationParams {
	zone_id: string;
	zone_name: string;
	api_token: string;
}

export interface UpdateCFIntegrationParams {
	api_token?: string;
	zone_name?: string;
	enabled?: boolean;
}
