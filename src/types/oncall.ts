export interface OnCallSchedule {
	id: string;
	account_id: string;
	name: string;
	timezone: string;
	rotation_type: string;
	participants: string[];
	handoff_time: string;
	handoff_day: number;
	created_at: string;
	updated_at: string;
}

export interface CreateScheduleParams {
	name: string;
	timezone?: string;
	rotation_type?: string;
	participants?: string[];
	handoff_time?: string;
	handoff_day?: number;
}

export interface UpdateScheduleParams {
	name?: string;
	timezone?: string;
	rotation_type?: string;
	participants?: string[];
	handoff_time?: string;
	handoff_day?: number;
}

export interface OnCallOverride {
	id: string;
	schedule_id: string;
	original_user_id: string;
	replacement_user_id: string;
	start_at: string;
	end_at: string;
	reason: string;
	created_at: string;
}

export interface CreateOverrideParams {
	original_user_id: string;
	replacement_user_id: string;
	start_at: string;
	end_at: string;
	reason?: string;
}

export interface WhosOnCall {
	schedule_id: string;
	schedule_name: string;
	user_id: string;
	override_id?: string;
}
