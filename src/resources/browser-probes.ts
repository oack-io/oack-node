import type { BaseClient } from "../client.js";
import type {
	BrowserProbe,
	BrowserProbeAggregation,
	BrowserProbeList,
	BrowserProbeListOptions,
} from "../types/browser-probes.js";

export class BrowserProbes {
	constructor(private client: BaseClient) {}

	async list(teamId: string, monitorId: string, options?: BrowserProbeListOptions): Promise<BrowserProbeList> {
		const params: Record<string, string> = {};
		if (options?.from) params.from = options.from;
		if (options?.to) params.to = options.to;
		if (options?.limit != null) params.limit = String(options.limit);
		const qs = Object.keys(params).length > 0 ? params : undefined;
		return JSON.parse(
			await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}/browser-probes`, {
				params: qs,
			}),
		) as BrowserProbeList;
	}

	async get(teamId: string, monitorId: string, probeId: string): Promise<BrowserProbe> {
		return JSON.parse(
			await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}/browser-probes/${probeId}`),
		) as BrowserProbe;
	}

	async aggregate(
		teamId: string,
		monitorId: string,
		options: { from: string; to: string; step?: string },
	): Promise<BrowserProbeAggregation> {
		const params: Record<string, string> = { from: options.from, to: options.to };
		if (options.step) params.step = options.step;
		return JSON.parse(
			await this.client.request("GET", `/api/v1/teams/${teamId}/monitors/${monitorId}/browser-probes/aggregate`, {
				params,
			}),
		) as BrowserProbeAggregation;
	}

	async downloadScreenshot(teamId: string, monitorId: string, probeId: string): Promise<string> {
		return await this.client.request(
			"GET",
			`/api/v1/teams/${teamId}/monitors/${monitorId}/browser-probes/${probeId}/screenshot`,
		);
	}

	async downloadHar(teamId: string, monitorId: string, probeId: string): Promise<string> {
		return await this.client.request(
			"GET",
			`/api/v1/teams/${teamId}/monitors/${monitorId}/browser-probes/${probeId}/har`,
		);
	}
}
