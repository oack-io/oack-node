import type { BaseClient } from "../client.js";
import type {
	CreateActionItemParams,
	CreatePostmortemParams,
	CreatePostmortemTemplateParams,
	Postmortem,
	PostmortemAction,
	PostmortemTemplate,
	UpdateActionItemParams,
	UpdatePostmortemParams,
	UpdatePostmortemTemplateParams,
} from "../types/postmortems.js";

export class Postmortems {
	constructor(private client: BaseClient) {}

	// ── Postmortem CRUD ────────────────────────────────────────────────

	async create(accountId: string, incidentId: string, params: CreatePostmortemParams): Promise<Postmortem> {
		return JSON.parse(
			await this.client.request("POST", `/api/v1/accounts/${accountId}/incidents/${incidentId}/postmortem`, {
				json: params,
			}),
		) as Postmortem;
	}

	async get(accountId: string, incidentId: string): Promise<Postmortem> {
		return JSON.parse(
			await this.client.request("GET", `/api/v1/accounts/${accountId}/incidents/${incidentId}/postmortem`),
		) as Postmortem;
	}

	async update(accountId: string, incidentId: string, params: UpdatePostmortemParams): Promise<Postmortem> {
		return JSON.parse(
			await this.client.request("PUT", `/api/v1/accounts/${accountId}/incidents/${incidentId}/postmortem`, {
				json: params,
			}),
		) as Postmortem;
	}

	async delete(accountId: string, incidentId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/accounts/${accountId}/incidents/${incidentId}/postmortem`);
	}

	async publish(accountId: string, incidentId: string): Promise<Postmortem> {
		return JSON.parse(
			await this.client.request("POST", `/api/v1/accounts/${accountId}/incidents/${incidentId}/postmortem/publish`),
		) as Postmortem;
	}

	async generateShareToken(accountId: string, incidentId: string): Promise<string> {
		const resp = JSON.parse(
			await this.client.request("POST", `/api/v1/accounts/${accountId}/incidents/${incidentId}/postmortem/share`),
		) as { share_token: string };
		return resp.share_token;
	}

	// ── Action Items ───────────────────────────────────────────────────

	async createActionItem(
		accountId: string,
		incidentId: string,
		params: CreateActionItemParams,
	): Promise<PostmortemAction> {
		return JSON.parse(
			await this.client.request(
				"POST",
				`/api/v1/accounts/${accountId}/incidents/${incidentId}/postmortem/action-items`,
				{ json: params },
			),
		) as PostmortemAction;
	}

	async updateActionItem(
		accountId: string,
		incidentId: string,
		itemId: string,
		params: UpdateActionItemParams,
	): Promise<PostmortemAction> {
		return JSON.parse(
			await this.client.request(
				"PUT",
				`/api/v1/accounts/${accountId}/incidents/${incidentId}/postmortem/action-items/${itemId}`,
				{ json: params },
			),
		) as PostmortemAction;
	}

	async deleteActionItem(accountId: string, incidentId: string, itemId: string): Promise<void> {
		await this.client.request(
			"DELETE",
			`/api/v1/accounts/${accountId}/incidents/${incidentId}/postmortem/action-items/${itemId}`,
		);
	}

	// ── Templates ──────────────────────────────────────────────────────

	async createTemplate(accountId: string, params: CreatePostmortemTemplateParams): Promise<PostmortemTemplate> {
		return JSON.parse(
			await this.client.request("POST", `/api/v1/accounts/${accountId}/postmortem-templates`, { json: params }),
		) as PostmortemTemplate;
	}

	async listTemplates(accountId: string): Promise<PostmortemTemplate[]> {
		return JSON.parse(
			await this.client.request("GET", `/api/v1/accounts/${accountId}/postmortem-templates`),
		) as PostmortemTemplate[];
	}

	async getTemplate(accountId: string, templateId: string): Promise<PostmortemTemplate> {
		return JSON.parse(
			await this.client.request("GET", `/api/v1/accounts/${accountId}/postmortem-templates/${templateId}`),
		) as PostmortemTemplate;
	}

	async updateTemplate(
		accountId: string,
		templateId: string,
		params: UpdatePostmortemTemplateParams,
	): Promise<PostmortemTemplate> {
		return JSON.parse(
			await this.client.request("PUT", `/api/v1/accounts/${accountId}/postmortem-templates/${templateId}`, {
				json: params,
			}),
		) as PostmortemTemplate;
	}

	async deleteTemplate(accountId: string, templateId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/accounts/${accountId}/postmortem-templates/${templateId}`);
	}
}
