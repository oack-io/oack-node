import type { BaseClient } from "../client.js";
import type { Checker, GeoRegion } from "../types/geo.js";

export class Geo {
	constructor(private client: BaseClient) {}

	async listCheckers(): Promise<Checker[]> {
		return JSON.parse(await this.client.request("GET", "/api/v1/checkers")) as Checker[];
	}

	async listRegions(): Promise<GeoRegion[]> {
		const resp = JSON.parse(await this.client.request("GET", "/api/v1/regions")) as { regions: GeoRegion[] };
		return resp.regions;
	}
}
