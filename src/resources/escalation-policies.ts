import type { BaseClient } from "../client.js";
import type {
	EscalationPolicy,
	CreateEscalationPolicyParams,
	UpdateEscalationPolicyParams,
} from "../types/escalation-policies.js";

export class EscalationPolicies {
	constructor(private client: BaseClient) {}

	async create(accountId: string, params: CreateEscalationPolicyParams): Promise<EscalationPolicy> {
		return JSON.parse(
			await this.client.request(
				"POST",
				`/api/v1/accounts/${accountId}/oncall/escalation-policies`,
				{ json: params },
			),
		) as EscalationPolicy;
	}

	async list(accountId: string): Promise<EscalationPolicy[]> {
		return JSON.parse(
			await this.client.request(
				"GET",
				`/api/v1/accounts/${accountId}/oncall/escalation-policies`,
			),
		) as EscalationPolicy[];
	}

	async update(
		accountId: string,
		policyId: string,
		params: UpdateEscalationPolicyParams,
	): Promise<EscalationPolicy> {
		return JSON.parse(
			await this.client.request(
				"PUT",
				`/api/v1/accounts/${accountId}/oncall/escalation-policies/${policyId}`,
				{ json: params },
			),
		) as EscalationPolicy;
	}

	async delete(accountId: string, policyId: string): Promise<void> {
		await this.client.request(
			"DELETE",
			`/api/v1/accounts/${accountId}/oncall/escalation-policies/${policyId}`,
		);
	}
}
