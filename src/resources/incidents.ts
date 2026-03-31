import type { BaseClient } from "../client.js";
import type {
	AccountIncident,
	AccountIncidentWithDetails,
	AccountIncidentUpdate,
	AccountIncidentAnalytics,
	CreateAccountIncidentParams,
	UpdateAccountIncidentParams,
	PostAccountIncidentUpdateParams,
	ListAccountIncidentsParams,
} from "../types/incidents.js";

export class AccountIncidents {
	constructor(private client: BaseClient) {}

	async create(accountId: string, params: CreateAccountIncidentParams): Promise<AccountIncident> {
		return JSON.parse(
			await this.client.request("POST", `/api/v1/accounts/${accountId}/incidents`, { json: params }),
		) as AccountIncident;
	}

	async get(accountId: string, incidentId: string): Promise<AccountIncidentWithDetails> {
		return JSON.parse(
			await this.client.request("GET", `/api/v1/accounts/${accountId}/incidents/${incidentId}`),
		) as AccountIncidentWithDetails;
	}

	async list(accountId: string, params?: ListAccountIncidentsParams): Promise<AccountIncident[]> {
		const query = new URLSearchParams();
		if (params?.status) query.set("status", params.status);
		if (params?.severity) query.set("severity", params.severity);
		if (params?.tag) query.set("tag", params.tag);
		if (params?.service_id) query.set("service_id", params.service_id);
		if (params?.from) query.set("from", params.from);
		if (params?.to) query.set("to", params.to);
		if (params?.limit) query.set("limit", String(params.limit));
		if (params?.offset) query.set("offset", String(params.offset));
		const qs = query.toString();
		const path = `/api/v1/accounts/${accountId}/incidents` + (qs ? `?${qs}` : "");
		return JSON.parse(await this.client.request("GET", path)) as AccountIncident[];
	}

	async update(
		accountId: string,
		incidentId: string,
		params: UpdateAccountIncidentParams,
	): Promise<AccountIncident> {
		return JSON.parse(
			await this.client.request("PUT", `/api/v1/accounts/${accountId}/incidents/${incidentId}`, {
				json: params,
			}),
		) as AccountIncident;
	}

	async delete(accountId: string, incidentId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/accounts/${accountId}/incidents/${incidentId}`);
	}

	async postUpdate(
		accountId: string,
		incidentId: string,
		params: PostAccountIncidentUpdateParams,
	): Promise<AccountIncidentUpdate> {
		return JSON.parse(
			await this.client.request(
				"POST",
				`/api/v1/accounts/${accountId}/incidents/${incidentId}/updates`,
				{ json: params },
			),
		) as AccountIncidentUpdate;
	}

	async acknowledge(accountId: string, incidentId: string): Promise<void> {
		await this.client.request(
			"POST",
			`/api/v1/accounts/${accountId}/incidents/${incidentId}/acknowledge`,
		);
	}

	async linkMonitors(accountId: string, incidentId: string, monitorIds: string[]): Promise<void> {
		await this.client.request(
			"POST",
			`/api/v1/accounts/${accountId}/incidents/${incidentId}/monitors`,
			{ json: { monitor_ids: monitorIds } },
		);
	}

	async unlinkMonitor(accountId: string, incidentId: string, monitorId: string): Promise<void> {
		await this.client.request(
			"DELETE",
			`/api/v1/accounts/${accountId}/incidents/${incidentId}/monitors/${monitorId}`,
		);
	}

	async linkStatusPages(accountId: string, incidentId: string, statusPageIds: string[]): Promise<void> {
		await this.client.request(
			"POST",
			`/api/v1/accounts/${accountId}/incidents/${incidentId}/status-pages`,
			{ json: { status_page_ids: statusPageIds } },
		);
	}

	async unlinkStatusPage(accountId: string, incidentId: string, pageId: string): Promise<void> {
		await this.client.request(
			"DELETE",
			`/api/v1/accounts/${accountId}/incidents/${incidentId}/status-pages/${pageId}`,
		);
	}

	async getAnalytics(
		accountId: string,
		options?: { from?: string; to?: string; service_id?: string },
	): Promise<AccountIncidentAnalytics> {
		const query = new URLSearchParams();
		if (options?.from) query.set("from", options.from);
		if (options?.to) query.set("to", options.to);
		if (options?.service_id) query.set("service_id", options.service_id);
		const qs = query.toString();
		const path = `/api/v1/accounts/${accountId}/incidents/analytics` + (qs ? `?${qs}` : "");
		return JSON.parse(await this.client.request("GET", path)) as AccountIncidentAnalytics;
	}
}
