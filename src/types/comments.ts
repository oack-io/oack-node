export interface Comment {
	id: string;
	monitor_id: string;
	author_id: string;
	parent_id: string | null;
	body: string;
	anchor_from: string;
	anchor_to: string;
	is_resolved: boolean;
	resolved_by: string | null;
	resolved_at: string | null;
	edited_at: string | null;
	is_deleted: boolean;
	created_at: string;
}

export interface CreateCommentParams {
	body: string;
	anchor_at?: string;
	anchor_from?: string;
	anchor_to?: string;
}

export interface CommentEdit {
	id: string;
	previous_body: string;
	edited_by: string;
	edited_at: string;
}
