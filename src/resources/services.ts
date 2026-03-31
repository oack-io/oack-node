import type { BaseClient } from "../client.js";
import type { CreateServiceParams, Service, ServiceAnalytics, UpdateServiceParams } from "../types/services.js";

export class Services {
	constructor(private client: BaseClient) {}

	async create(accountId: string, params: CreateServiceParams): Promise<Service> {
		return JSON.parse(
			await this.client.request("POST", `/api/v1/accounts/${accountId}/services`, { json: params }),
		) as Service;
	}

	async list(accountId: string): Promise<Service[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/accounts/${accountId}/services`)) as Service[];
	}

	async get(accountId: string, serviceId: string): Promise<Service> {
		return JSON.parse(
			await this.client.request("GET", `/api/v1/accounts/${accountId}/services/${serviceId}`),
		) as Service;
	}

	async update(accountId: string, serviceId: string, params: UpdateServiceParams): Promise<Service> {
		return JSON.parse(
			await this.client.request("PUT", `/api/v1/accounts/${accountId}/services/${serviceId}`, { json: params }),
		) as Service;
	}

	async delete(accountId: string, serviceId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/accounts/${accountId}/services/${serviceId}`);
	}

	async linkMonitors(accountId: string, serviceId: string, monitorIds: string[]): Promise<void> {
		await this.client.request("POST", `/api/v1/accounts/${accountId}/services/${serviceId}/monitors`, {
			json: { monitor_ids: monitorIds },
		});
	}

	async unlinkMonitor(accountId: string, serviceId: string, monitorId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/accounts/${accountId}/services/${serviceId}/monitors/${monitorId}`);
	}

	async linkIncidents(accountId: string, serviceId: string, incidentIds: string[]): Promise<void> {
		await this.client.request("POST", `/api/v1/accounts/${accountId}/services/${serviceId}/incidents`, {
			json: { incident_ids: incidentIds },
		});
	}

	async unlinkIncident(accountId: string, serviceId: string, incidentId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/accounts/${accountId}/services/${serviceId}/incidents/${incidentId}`);
	}

	async getAnalytics(accountId: string, serviceId: string): Promise<ServiceAnalytics> {
		return JSON.parse(
			await this.client.request("GET", `/api/v1/accounts/${accountId}/services/${serviceId}/analytics`),
		) as ServiceAnalytics;
	}
}
