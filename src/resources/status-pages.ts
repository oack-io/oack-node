import type { BaseClient } from "../client.js";
import type {
	StatusPage,
	CreateStatusPageParams,
	UpdateStatusPageParams,
	ComponentGroup,
	CreateComponentGroupParams,
	UpdateComponentGroupParams,
	Component,
	CreateComponentParams,
	UpdateComponentParams,
	Incident,
	CreateIncidentParams,
	UpdateIncidentParams,
	IncidentUpdate,
	PostIncidentUpdateParams,
	IncidentWithUpdates,
	Maintenance,
	CreateMaintenanceParams,
	UpdateMaintenanceParams,
	MaintenanceUpdate,
	PostMaintenanceUpdateParams,
	MaintenanceWithUpdates,
	Subscriber,
	IncidentTemplate,
	CreateIncidentTemplateParams,
	UpdateIncidentTemplateParams,
} from "../types/status-pages.js";

export class StatusPages {
	constructor(private client: BaseClient) {}

	// ── Status Pages ────────────────────────────────────────────────────────────

	async create(accountId: string, params: CreateStatusPageParams): Promise<StatusPage> {
		return JSON.parse(await this.client.request("POST", `/api/v1/accounts/${accountId}/status-pages`, { json: params })) as StatusPage;
	}

	async list(accountId: string): Promise<StatusPage[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/accounts/${accountId}/status-pages`)) as StatusPage[];
	}

	async get(accountId: string, pageId: string): Promise<StatusPage> {
		return JSON.parse(await this.client.request("GET", `/api/v1/accounts/${accountId}/status-pages/${pageId}`)) as StatusPage;
	}

	async update(accountId: string, pageId: string, params: UpdateStatusPageParams): Promise<StatusPage> {
		return JSON.parse(await this.client.request("PUT", `/api/v1/accounts/${accountId}/status-pages/${pageId}`, { json: params })) as StatusPage;
	}

	async delete(accountId: string, pageId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/accounts/${accountId}/status-pages/${pageId}`);
	}

	// ── Component Groups ────────────────────────────────────────────────────────

	async createComponentGroup(accountId: string, pageId: string, params: CreateComponentGroupParams): Promise<ComponentGroup> {
		return JSON.parse(await this.client.request("POST", `/api/v1/accounts/${accountId}/status-pages/${pageId}/component-groups`, { json: params })) as ComponentGroup;
	}

	async listComponentGroups(accountId: string, pageId: string): Promise<ComponentGroup[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/accounts/${accountId}/status-pages/${pageId}/component-groups`)) as ComponentGroup[];
	}

	async updateComponentGroup(accountId: string, pageId: string, groupId: string, params: UpdateComponentGroupParams): Promise<ComponentGroup> {
		return JSON.parse(await this.client.request("PUT", `/api/v1/accounts/${accountId}/status-pages/${pageId}/component-groups/${groupId}`, { json: params })) as ComponentGroup;
	}

	async deleteComponentGroup(accountId: string, pageId: string, groupId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/accounts/${accountId}/status-pages/${pageId}/component-groups/${groupId}`);
	}

	// ── Components ──────────────────────────────────────────────────────────────

	async createComponent(accountId: string, pageId: string, params: CreateComponentParams): Promise<Component> {
		return JSON.parse(await this.client.request("POST", `/api/v1/accounts/${accountId}/status-pages/${pageId}/components`, { json: params })) as Component;
	}

	async listComponents(accountId: string, pageId: string): Promise<Component[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/accounts/${accountId}/status-pages/${pageId}/components`)) as Component[];
	}

	async updateComponent(accountId: string, pageId: string, compId: string, params: UpdateComponentParams): Promise<Component> {
		return JSON.parse(await this.client.request("PUT", `/api/v1/accounts/${accountId}/status-pages/${pageId}/components/${compId}`, { json: params })) as Component;
	}

	async deleteComponent(accountId: string, pageId: string, compId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/accounts/${accountId}/status-pages/${pageId}/components/${compId}`);
	}

	// ── Incidents ───────────────────────────────────────────────────────────────

	async createIncident(accountId: string, pageId: string, params: CreateIncidentParams): Promise<Incident> {
		return JSON.parse(await this.client.request("POST", `/api/v1/accounts/${accountId}/status-pages/${pageId}/incidents`, { json: params })) as Incident;
	}

	async listIncidents(accountId: string, pageId: string): Promise<Incident[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/accounts/${accountId}/status-pages/${pageId}/incidents`)) as Incident[];
	}

	async getIncident(accountId: string, pageId: string, incidentId: string): Promise<IncidentWithUpdates> {
		return JSON.parse(await this.client.request("GET", `/api/v1/accounts/${accountId}/status-pages/${pageId}/incidents/${incidentId}`)) as IncidentWithUpdates;
	}

	async updateIncident(accountId: string, pageId: string, incidentId: string, params: UpdateIncidentParams): Promise<Incident> {
		return JSON.parse(await this.client.request("PUT", `/api/v1/accounts/${accountId}/status-pages/${pageId}/incidents/${incidentId}`, { json: params })) as Incident;
	}

	async deleteIncident(accountId: string, pageId: string, incidentId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/accounts/${accountId}/status-pages/${pageId}/incidents/${incidentId}`);
	}

	async postIncidentUpdate(accountId: string, pageId: string, incidentId: string, params: PostIncidentUpdateParams): Promise<IncidentUpdate> {
		return JSON.parse(await this.client.request("POST", `/api/v1/accounts/${accountId}/status-pages/${pageId}/incidents/${incidentId}/updates`, { json: params })) as IncidentUpdate;
	}

	// ── Maintenances ────────────────────────────────────────────────────────────

	async createMaintenance(accountId: string, pageId: string, params: CreateMaintenanceParams): Promise<Maintenance> {
		return JSON.parse(await this.client.request("POST", `/api/v1/accounts/${accountId}/status-pages/${pageId}/maintenances`, { json: params })) as Maintenance;
	}

	async listMaintenances(accountId: string, pageId: string): Promise<Maintenance[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/accounts/${accountId}/status-pages/${pageId}/maintenances`)) as Maintenance[];
	}

	async getMaintenance(accountId: string, pageId: string, maintId: string): Promise<MaintenanceWithUpdates> {
		return JSON.parse(await this.client.request("GET", `/api/v1/accounts/${accountId}/status-pages/${pageId}/maintenances/${maintId}`)) as MaintenanceWithUpdates;
	}

	async updateMaintenance(accountId: string, pageId: string, maintId: string, params: UpdateMaintenanceParams): Promise<Maintenance> {
		return JSON.parse(await this.client.request("PUT", `/api/v1/accounts/${accountId}/status-pages/${pageId}/maintenances/${maintId}`, { json: params })) as Maintenance;
	}

	async deleteMaintenance(accountId: string, pageId: string, maintId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/accounts/${accountId}/status-pages/${pageId}/maintenances/${maintId}`);
	}

	async postMaintenanceUpdate(accountId: string, pageId: string, maintId: string, params: PostMaintenanceUpdateParams): Promise<MaintenanceUpdate> {
		return JSON.parse(await this.client.request("POST", `/api/v1/accounts/${accountId}/status-pages/${pageId}/maintenances/${maintId}/updates`, { json: params })) as MaintenanceUpdate;
	}

	// ── Subscribers ─────────────────────────────────────────────────────────────

	async listSubscribers(accountId: string, pageId: string): Promise<Subscriber[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/accounts/${accountId}/status-pages/${pageId}/subscribers`)) as Subscriber[];
	}

	async deleteSubscriber(accountId: string, pageId: string, subscriberId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/accounts/${accountId}/status-pages/${pageId}/subscribers/${subscriberId}`);
	}

	// ── Incident Templates ──────────────────────────────────────────────────────

	async createIncidentTemplate(accountId: string, pageId: string, params: CreateIncidentTemplateParams): Promise<IncidentTemplate> {
		return JSON.parse(await this.client.request("POST", `/api/v1/accounts/${accountId}/status-pages/${pageId}/incident-templates`, { json: params })) as IncidentTemplate;
	}

	async listIncidentTemplates(accountId: string, pageId: string): Promise<IncidentTemplate[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/accounts/${accountId}/status-pages/${pageId}/incident-templates`)) as IncidentTemplate[];
	}

	async updateIncidentTemplate(accountId: string, pageId: string, templateId: string, params: UpdateIncidentTemplateParams): Promise<IncidentTemplate> {
		return JSON.parse(await this.client.request("PUT", `/api/v1/accounts/${accountId}/status-pages/${pageId}/incident-templates/${templateId}`, { json: params })) as IncidentTemplate;
	}

	async deleteIncidentTemplate(accountId: string, pageId: string, templateId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/accounts/${accountId}/status-pages/${pageId}/incident-templates/${templateId}`);
	}
}
