export interface EscalationPolicy {
	id: string;
	account_id: string;
	name: string;
	levels: EscalationLevel[];
	created_at: string;
	updated_at: string;
}

export interface EscalationLevel {
	schedule_id: string;
	ack_timeout_minutes?: number;
	duration_minutes?: number;
}

export interface CreateEscalationPolicyParams {
	name: string;
	levels?: EscalationLevel[];
}

export interface UpdateEscalationPolicyParams {
	name?: string;
	levels?: EscalationLevel[];
}
