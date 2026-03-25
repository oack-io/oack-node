import type { BaseClient } from "../client.js";
import type {
	CFIntegration,
	CreateCFIntegrationParams,
	CreatePDIntegrationParams,
	PDIntegration,
	UpdateCFIntegrationParams,
	UpdatePDIntegrationParams,
} from "../types/integrations.js";

export class Integrations {
	constructor(private client: BaseClient) {}

	// ── PagerDuty ───────────────────────────────────────────────────────────────

	async createPagerDuty(accountId: string, params: CreatePDIntegrationParams): Promise<PDIntegration> {
		return JSON.parse(
			await this.client.request("POST", `/api/v1/accounts/${accountId}/integrations/pagerduty`, { json: params }),
		) as PDIntegration;
	}

	async getPagerDuty(accountId: string): Promise<PDIntegration> {
		return JSON.parse(
			await this.client.request("GET", `/api/v1/accounts/${accountId}/integrations/pagerduty`),
		) as PDIntegration;
	}

	async updatePagerDuty(accountId: string, params: UpdatePDIntegrationParams): Promise<PDIntegration> {
		return JSON.parse(
			await this.client.request("PUT", `/api/v1/accounts/${accountId}/integrations/pagerduty`, { json: params }),
		) as PDIntegration;
	}

	async deletePagerDuty(accountId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/accounts/${accountId}/integrations/pagerduty`);
	}

	async syncPagerDuty(accountId: string): Promise<void> {
		await this.client.request("POST", `/api/v1/accounts/${accountId}/integrations/pagerduty/sync`);
	}

	// ── Cloudflare Zone ─────────────────────────────────────────────────────────

	async createCloudflare(accountId: string, params: CreateCFIntegrationParams): Promise<CFIntegration> {
		return JSON.parse(
			await this.client.request("POST", `/api/v1/accounts/${accountId}/integrations/cloudflare-zone`, { json: params }),
		) as CFIntegration;
	}

	async listCloudflare(accountId: string): Promise<CFIntegration[]> {
		return JSON.parse(
			await this.client.request("GET", `/api/v1/accounts/${accountId}/integrations/cloudflare-zone`),
		) as CFIntegration[];
	}

	async getCloudflare(accountId: string, integrationId: string): Promise<CFIntegration> {
		return JSON.parse(
			await this.client.request("GET", `/api/v1/accounts/${accountId}/integrations/cloudflare-zone/${integrationId}`),
		) as CFIntegration;
	}

	async updateCloudflare(
		accountId: string,
		integrationId: string,
		params: UpdateCFIntegrationParams,
	): Promise<CFIntegration> {
		return JSON.parse(
			await this.client.request("PUT", `/api/v1/accounts/${accountId}/integrations/cloudflare-zone/${integrationId}`, {
				json: params,
			}),
		) as CFIntegration;
	}

	async deleteCloudflare(accountId: string, integrationId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/accounts/${accountId}/integrations/cloudflare-zone/${integrationId}`);
	}
}
