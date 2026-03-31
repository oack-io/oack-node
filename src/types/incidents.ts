export interface AccountIncident {
	id: string;
	account_id: string;
	name: string;
	status: string;
	severity: string;
	summary: string;
	created_by: string;
	owner_id?: string;
	declared_at: string;
	resolved_at?: string;
	duration_seconds?: number | null;
	is_private: boolean;
	tags: string[];
	source: string;
	monitor_ids?: string[];
	status_page_ids?: string[];
	service_ids?: string[];
	escalation_policy_id?: string;
	created_at: string;
	updated_at: string;
}

export interface AccountIncidentUpdate {
	id: string;
	incident_id: string;
	status: string;
	message: string;
	created_by: string;
	notify_subscribers: boolean;
	created_at: string;
}

export interface EscalationState {
	status: string;
	current_level: number;
	acknowledged_by?: string;
	acknowledged_at?: string;
}

export interface EscalationEvent {
	level: number;
	user_id: string;
	schedule_id: string;
	trigger: string;
	created_at: string;
}

export interface AccountIncidentWithDetails extends AccountIncident {
	updates: AccountIncidentUpdate[];
	escalation_state?: EscalationState;
	escalation_events?: EscalationEvent[];
}

export interface CreateAccountIncidentParams {
	name: string;
	severity?: string;
	summary?: string;
	is_private?: boolean;
	tags?: string[];
	monitor_ids?: string[];
	status_page_ids?: string[];
	service_ids?: string[];
	primary_escalation_policy_id?: string;
	no_escalation?: boolean;
}

export interface UpdateAccountIncidentParams {
	name?: string;
	status?: string;
	severity?: string;
	summary?: string;
	owner_id?: string;
	is_private?: boolean;
	tags?: string[];
}

export interface PostAccountIncidentUpdateParams {
	status: string;
	message: string;
	notify_subscribers: boolean;
}

export interface ListAccountIncidentsParams {
	status?: string;
	severity?: string;
	tag?: string;
	service_id?: string;
	from?: string;
	to?: string;
	limit?: number;
	offset?: number;
}

export interface AccountIncidentAnalytics {
	mttr_seconds: number | null;
	mttf_seconds: number | null;
	incident_count: number;
	by_severity: Record<string, number>;
	open_action_items: number;
	mttr_by_severity: Record<string, number | null>;
	uptime_pct?: number | null;
}
