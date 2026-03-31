import type { BaseClient } from "../client.js";
import type { CreateTriggerParams, UpdateTriggerParams, Trigger } from "../types/status-pages.js";

export class Triggers {
	constructor(private client: BaseClient) {}

	async create(accountId: string, pageId: string, compId: string, params: CreateTriggerParams): Promise<Trigger> {
		return JSON.parse(
			await this.client.request(
				"POST",
				`/api/v1/accounts/${accountId}/status-pages/${pageId}/components/${compId}/triggers`,
				{ json: params },
			),
		) as Trigger;
	}

	async list(accountId: string, pageId: string, compId: string): Promise<Trigger[]> {
		return JSON.parse(
			await this.client.request(
				"GET",
				`/api/v1/accounts/${accountId}/status-pages/${pageId}/components/${compId}/triggers`,
			),
		) as Trigger[];
	}

	async update(
		accountId: string,
		pageId: string,
		compId: string,
		triggerId: string,
		params: UpdateTriggerParams,
	): Promise<Trigger> {
		return JSON.parse(
			await this.client.request(
				"PUT",
				`/api/v1/accounts/${accountId}/status-pages/${pageId}/components/${compId}/triggers/${triggerId}`,
				{ json: params },
			),
		) as Trigger;
	}

	async delete(accountId: string, pageId: string, compId: string, triggerId: string): Promise<void> {
		await this.client.request(
			"DELETE",
			`/api/v1/accounts/${accountId}/status-pages/${pageId}/components/${compId}/triggers/${triggerId}`,
		);
	}
}
