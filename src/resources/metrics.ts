import type { BaseClient } from "../client.js";
import type {
	ChartEvent,
	ChartEventListOptions,
	CreateChartEventParams,
	Expiration,
	IngestChartEventParams,
	MonitorMetrics,
	TimelineEvent,
	UpdateChartEventParams,
} from "../types/metrics.js";

export class Metrics {
	constructor(private client: BaseClient) {}

	async getMonitorMetrics(teamId: string, monitorId: string): Promise<MonitorMetrics> {
		return JSON.parse(
			await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}/metrics`),
		) as MonitorMetrics;
	}

	async getExpiration(teamId: string, monitorId: string): Promise<Expiration> {
		return JSON.parse(
			await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}/expiration`),
		) as Expiration;
	}

	async listTimeline(
		teamId: string,
		monitorId: string,
		options?: { limit?: number; offset?: number },
	): Promise<TimelineEvent[]> {
		const params: Record<string, string> = {};
		if (options?.limit != null) params.limit = String(options.limit);
		if (options?.offset != null) params.offset = String(options.offset);
		const qs = Object.keys(params).length > 0 ? params : undefined;
		return JSON.parse(
			await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}/timeline`, { params: qs }),
		) as TimelineEvent[];
	}

	async createChartEvent(teamId: string, params: CreateChartEventParams): Promise<ChartEvent> {
		return JSON.parse(
			await this.client.request("POST", `/api/v1/teams/${teamId}/events`, { json: params }),
		) as ChartEvent;
	}

	async listChartEvents(teamId: string, options: ChartEventListOptions): Promise<ChartEvent[]> {
		const params: Record<string, string> = { from: options.from, to: options.to };
		if (options.monitor_id) params.monitor_id = options.monitor_id;
		if (options.kind) params.kind = options.kind;
		if (options.source) params.source = options.source;
		return JSON.parse(
			await this.client.request("GET", `/api/v1/teams/${teamId}/events`, { params }),
		) as ChartEvent[];
	}

	async updateChartEvent(teamId: string, eventId: string, params: UpdateChartEventParams): Promise<ChartEvent> {
		return JSON.parse(
			await this.client.request("PUT", `/api/v1/teams/${teamId}/events/${eventId}`, { json: params }),
		) as ChartEvent;
	}

	async deleteChartEvent(teamId: string, eventId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/teams/${teamId}/events/${eventId}`);
	}

	async ingestChartEvent(teamId: string, params: IngestChartEventParams): Promise<ChartEvent> {
		return JSON.parse(
			await this.client.request("POST", `/api/v1/teams/${teamId}/events/ingest`, { json: params }),
		) as ChartEvent;
	}
}
