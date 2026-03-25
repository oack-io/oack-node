import type { BaseClient } from "../client.js";
import type {
	CreateExternalLinkParams,
	CreateExternalLinkResult,
	ExternalLink,
	UpdateExternalLinkParams,
} from "../types/external-links.js";

export class ExternalLinks {
	constructor(private client: BaseClient) {}

	async create(teamId: string, params: CreateExternalLinkParams): Promise<CreateExternalLinkResult> {
		return JSON.parse(
			await this.client.request("POST", `/api/v1/teams/${teamId}/external-links`, { json: params }),
		) as CreateExternalLinkResult;
	}

	async list(teamId: string): Promise<ExternalLink[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/teams/${teamId}/external-links`)) as ExternalLink[];
	}

	async get(teamId: string, linkId: string): Promise<ExternalLink> {
		return JSON.parse(
			await this.client.request("GET", `/api/v1/teams/${teamId}/external-links/${linkId}`),
		) as ExternalLink;
	}

	async update(teamId: string, linkId: string, params: UpdateExternalLinkParams): Promise<ExternalLink> {
		return JSON.parse(
			await this.client.request("PUT", `/api/v1/teams/${teamId}/external-links/${linkId}`, { json: params }),
		) as ExternalLink;
	}

	async delete(teamId: string, linkId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/teams/${teamId}/external-links/${linkId}`);
	}

	async assign(teamId: string, monitorId: string, externalLinkId: string): Promise<void> {
		await this.client.request("POST", `/api/v1/teams/${teamId}/monitors/${monitorId}/external-links`, {
			json: { external_link_id: externalLinkId },
		});
	}

	async unassign(teamId: string, monitorId: string, linkId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/teams/${teamId}/monitors/${monitorId}/external-links/${linkId}`);
	}

	async listMonitorLinks(teamId: string, monitorId: string): Promise<ExternalLink[]> {
		return JSON.parse(
			await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}/external-links`),
		) as ExternalLink[];
	}
}
