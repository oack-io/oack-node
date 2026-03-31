export interface Postmortem {
	id: string;
	incident_id: string;
	account_id: string;
	status: string;
	summary: string;
	timeline_md: string;
	root_cause_md: string;
	impact_md: string;
	lessons_md: string;
	body_md: string;
	share_token?: string;
	created_by: string;
	published_at?: string;
	action_items: PostmortemAction[];
	created_at: string;
	updated_at: string;
}

export interface PostmortemAction {
	id: string;
	postmortem_id: string;
	title: string;
	description: string;
	owner_id?: string;
	status: string;
	priority: string;
	due_date?: string;
	completed_at?: string;
	created_at: string;
	updated_at: string;
}

export interface CreatePostmortemParams {
	body_md?: string;
}

export interface UpdatePostmortemParams {
	summary?: string;
	timeline_md?: string;
	root_cause_md?: string;
	impact_md?: string;
	lessons_md?: string;
	body_md?: string;
}

export interface CreateActionItemParams {
	title: string;
	description?: string;
	owner_id?: string;
	priority?: string;
	due_date?: string;
}

export interface UpdateActionItemParams {
	title?: string;
	description?: string;
	owner_id?: string;
	status?: string;
	priority?: string;
	due_date?: string;
}

export interface PostmortemTemplate {
	id: string;
	account_id: string;
	name: string;
	content: string;
	is_default: boolean;
	created_by: string;
	created_at: string;
	updated_at: string;
}

export interface CreatePostmortemTemplateParams {
	name: string;
	content: string;
	is_default: boolean;
}

export interface UpdatePostmortemTemplateParams {
	name?: string;
	content?: string;
	is_default?: boolean;
}
