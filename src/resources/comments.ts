import type { BaseClient } from "../client.js";
import type { Comment, CreateCommentParams, CommentEdit } from "../types/comments.js";

export class Comments {
	constructor(private client: BaseClient) {}

	async create(teamId: string, monitorId: string, params: CreateCommentParams): Promise<Comment> {
		return JSON.parse(await this.client.request("POST", `/api/v1/teams/${teamId}/monitors/${monitorId}/comments`, { json: params })) as Comment;
	}

	async list(teamId: string, monitorId: string): Promise<Comment[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}/comments`)) as Comment[];
	}

	async edit(teamId: string, monitorId: string, commentId: string, body: string): Promise<Comment> {
		return JSON.parse(await this.client.request("PUT", `/api/v1/teams/${teamId}/monitors/${monitorId}/comments/${commentId}`, { json: { body } })) as Comment;
	}

	async delete(teamId: string, monitorId: string, commentId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/teams/${teamId}/monitors/${monitorId}/comments/${commentId}`);
	}

	async reply(teamId: string, monitorId: string, commentId: string, body: string): Promise<Comment> {
		return JSON.parse(await this.client.request("POST", `/api/v1/teams/${teamId}/monitors/${monitorId}/comments/${commentId}/replies`, { json: { body } })) as Comment;
	}

	async listReplies(teamId: string, monitorId: string, commentId: string): Promise<Comment[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}/comments/${commentId}/replies`)) as Comment[];
	}

	async resolve(teamId: string, monitorId: string, commentId: string): Promise<Comment> {
		return JSON.parse(await this.client.request("POST", `/api/v1/teams/${teamId}/monitors/${monitorId}/comments/${commentId}/resolve`)) as Comment;
	}

	async reopen(teamId: string, monitorId: string, commentId: string): Promise<Comment> {
		return JSON.parse(await this.client.request("POST", `/api/v1/teams/${teamId}/monitors/${monitorId}/comments/${commentId}/reopen`)) as Comment;
	}

	async listEdits(teamId: string, monitorId: string, commentId: string): Promise<CommentEdit[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}/comments/${commentId}/edits`)) as CommentEdit[];
	}

	async listByTeam(teamId: string): Promise<Comment[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/teams/${teamId}/comments`)) as Comment[];
	}

	async listByAccount(accountId: string): Promise<Comment[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/accounts/${accountId}/comments`)) as Comment[];
	}
}
