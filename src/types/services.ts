export interface Service {
	id: string;
	account_id: string;
	name: string;
	description: string;
	integration_key: string;
	escalation_policy_id?: string;
	status: string;
	tags: string[];
	monitor_ids?: string[];
	component_ids?: string[];
	dependency_ids?: string[];
	dependent_ids?: string[];
	created_at: string;
	updated_at: string;
}

export interface CreateServiceParams {
	name: string;
	description?: string;
	escalation_policy_id?: string;
	tags?: string[];
	monitor_ids?: string[];
}

export interface UpdateServiceParams {
	name?: string;
	description?: string;
	escalation_policy_id?: string;
	tags?: string[];
}

export interface ServiceAnalytics {
	mttr_seconds: number | null;
	mttf_seconds: number | null;
	incident_count: number;
	by_severity: Record<string, number>;
	open_action_items: number;
	mttr_by_severity: Record<string, number | null>;
	uptime_pct?: number | null;
}
