import type { BaseClient } from "../client.js";
import type { Watchdog, CreateWatchdogParams, UpdateWatchdogParams } from "../types/status-pages.js";

export class Watchdogs {
	constructor(private client: BaseClient) {}

	async create(accountId: string, pageId: string, compId: string, params: CreateWatchdogParams): Promise<Watchdog> {
		return JSON.parse(await this.client.request("POST", `/api/v1/accounts/${accountId}/status-pages/${pageId}/components/${compId}/watchdogs`, { json: params })) as Watchdog;
	}

	async list(accountId: string, pageId: string, compId: string): Promise<Watchdog[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/accounts/${accountId}/status-pages/${pageId}/components/${compId}/watchdogs`)) as Watchdog[];
	}

	async update(accountId: string, pageId: string, compId: string, watchdogId: string, params: UpdateWatchdogParams): Promise<Watchdog> {
		return JSON.parse(await this.client.request("PUT", `/api/v1/accounts/${accountId}/status-pages/${pageId}/components/${compId}/watchdogs/${watchdogId}`, { json: params })) as Watchdog;
	}

	async delete(accountId: string, pageId: string, compId: string, watchdogId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/accounts/${accountId}/status-pages/${pageId}/components/${compId}/watchdogs/${watchdogId}`);
	}
}
