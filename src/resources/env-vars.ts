import type { BaseClient } from "../client.js";
import type { CreateEnvVarParams, EnvVar, UpdateEnvVarParams } from "../types/env-vars.js";

export class EnvVars {
	constructor(private client: BaseClient) {}

	async list(teamId: string): Promise<EnvVar[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/teams/${teamId}/env`)) as EnvVar[];
	}

	async create(teamId: string, params: CreateEnvVarParams): Promise<EnvVar> {
		return JSON.parse(await this.client.request("POST", `/api/v1/teams/${teamId}/env`, { json: params })) as EnvVar;
	}

	async update(teamId: string, key: string, params: UpdateEnvVarParams): Promise<EnvVar> {
		return JSON.parse(
			await this.client.request("PUT", `/api/v1/teams/${teamId}/env/${key}`, { json: params }),
		) as EnvVar;
	}

	async delete(teamId: string, key: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/teams/${teamId}/env/${key}`);
	}
}
