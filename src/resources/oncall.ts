import type { BaseClient } from "../client.js";
import type {
	CreateOverrideParams,
	CreateScheduleParams,
	OnCallOverride,
	OnCallSchedule,
	UpdateScheduleParams,
	WhosOnCall,
} from "../types/oncall.js";

export class OnCall {
	constructor(private client: BaseClient) {}

	// ── Schedules ──────────────────────────────────────────────────────

	async createSchedule(accountId: string, params: CreateScheduleParams): Promise<OnCallSchedule> {
		return JSON.parse(
			await this.client.request("POST", `/api/v1/accounts/${accountId}/oncall/schedules`, {
				json: params,
			}),
		) as OnCallSchedule;
	}

	async getSchedule(accountId: string, scheduleId: string): Promise<OnCallSchedule> {
		return JSON.parse(
			await this.client.request("GET", `/api/v1/accounts/${accountId}/oncall/schedules/${scheduleId}`),
		) as OnCallSchedule;
	}

	async listSchedules(accountId: string): Promise<OnCallSchedule[]> {
		return JSON.parse(
			await this.client.request("GET", `/api/v1/accounts/${accountId}/oncall/schedules`),
		) as OnCallSchedule[];
	}

	async updateSchedule(accountId: string, scheduleId: string, params: UpdateScheduleParams): Promise<OnCallSchedule> {
		return JSON.parse(
			await this.client.request("PUT", `/api/v1/accounts/${accountId}/oncall/schedules/${scheduleId}`, {
				json: params,
			}),
		) as OnCallSchedule;
	}

	async deleteSchedule(accountId: string, scheduleId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/accounts/${accountId}/oncall/schedules/${scheduleId}`);
	}

	// ── Overrides ──────────────────────────────────────────────────────

	async createOverride(accountId: string, scheduleId: string, params: CreateOverrideParams): Promise<OnCallOverride> {
		return JSON.parse(
			await this.client.request("POST", `/api/v1/accounts/${accountId}/oncall/schedules/${scheduleId}/overrides`, {
				json: params,
			}),
		) as OnCallOverride;
	}

	async listOverrides(accountId: string, scheduleId: string): Promise<OnCallOverride[]> {
		return JSON.parse(
			await this.client.request("GET", `/api/v1/accounts/${accountId}/oncall/schedules/${scheduleId}/overrides`),
		) as OnCallOverride[];
	}

	async deleteOverride(accountId: string, scheduleId: string, overrideId: string): Promise<void> {
		await this.client.request(
			"DELETE",
			`/api/v1/accounts/${accountId}/oncall/schedules/${scheduleId}/overrides/${overrideId}`,
		);
	}

	// ── Who's on call ──────────────────────────────────────────────────

	async whosOnCall(accountId: string): Promise<WhosOnCall[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/accounts/${accountId}/oncall/now`)) as WhosOnCall[];
	}
}
