import type { BaseClient } from "../client.js";
import type { Probe, ProbeAggregation, ProbeList, ProbeListOptions } from "../types/probes.js";

export class Probes {
	constructor(private client: BaseClient) {}

	async list(teamId: string, monitorId: string, options?: ProbeListOptions): Promise<ProbeList> {
		const params: Record<string, string> = {};
		if (options?.limit != null) params.limit = String(options.limit);
		if (options?.offset != null) params.offset = String(options.offset);
		if (options?.is_up != null) params.is_up = String(options.is_up);
		const qs = Object.keys(params).length > 0 ? params : undefined;
		return JSON.parse(
			await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}/probes`, { params: qs }),
		) as ProbeList;
	}

	async get(teamId: string, monitorId: string, probeId: string): Promise<Probe> {
		return JSON.parse(
			await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}/probes/${probeId}`),
		) as Probe;
	}

	async getDetails(teamId: string, monitorId: string, probeId: string): Promise<unknown> {
		return JSON.parse(
			await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}/probes/${probeId}/details`),
		);
	}

	async downloadPcap(teamId: string, monitorId: string, probeId: string): Promise<string> {
		return await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}/probes/${probeId}/pcap`);
	}

	async aggregate(
		teamId: string,
		monitorId: string,
		options: { from: number; to: number; step: string; agg: string },
	): Promise<ProbeAggregation> {
		const params = { from: String(options.from), to: String(options.to), step: options.step, agg: options.agg };
		return JSON.parse(
			await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}/probes/aggregate`, { params }),
		) as ProbeAggregation;
	}
}
