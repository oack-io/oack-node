import type { BaseClient } from "../client.js";
import type { Account, AccountInvite, AccountMember, Subscription } from "../types/accounts.js";

export class Accounts {
	constructor(private client: BaseClient) {}

	async create(name: string): Promise<Account> {
		return JSON.parse(await this.client.request("POST", "/api/v1/accounts", { json: { name } })) as Account;
	}

	async list(): Promise<Account[]> {
		return JSON.parse(await this.client.request("GET", "/api/v1/accounts")) as Account[];
	}

	async get(accountId: string): Promise<Account> {
		return JSON.parse(await this.client.request("GET", `/api/v1/accounts/${accountId}`)) as Account;
	}

	async update(accountId: string, name: string): Promise<Account> {
		return JSON.parse(await this.client.request("PUT", `/api/v1/accounts/${accountId}`, { json: { name } })) as Account;
	}

	async delete(accountId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/accounts/${accountId}`);
	}

	async restore(accountId: string): Promise<Account> {
		return JSON.parse(await this.client.request("POST", `/api/v1/accounts/${accountId}/restore`)) as Account;
	}

	async transfer(accountId: string, userId: string): Promise<Account> {
		return JSON.parse(await this.client.request("POST", `/api/v1/accounts/${accountId}/transfer`, { json: { user_id: userId } })) as Account;
	}

	async listMembers(accountId: string): Promise<AccountMember[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/accounts/${accountId}/members`)) as AccountMember[];
	}

	async setMemberRole(accountId: string, userId: string, role: string): Promise<AccountMember> {
		return JSON.parse(await this.client.request("PUT", `/api/v1/accounts/${accountId}/members/${userId}/role`, { json: { role } })) as AccountMember;
	}

	async removeMember(accountId: string, userId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/accounts/${accountId}/members/${userId}`);
	}

	async getSubscription(accountId: string): Promise<Subscription> {
		return JSON.parse(await this.client.request("GET", `/api/v1/accounts/${accountId}/subscription`)) as Subscription;
	}

	async updateSubscription(accountId: string, plan: string, status: string): Promise<Subscription> {
		return JSON.parse(await this.client.request("PUT", `/api/v1/accounts/${accountId}/subscription`, { json: { plan, status } })) as Subscription;
	}

	async createInvite(accountId: string, email: string, role: string): Promise<AccountInvite> {
		return JSON.parse(await this.client.request("POST", `/api/v1/accounts/${accountId}/invites`, { json: { email, role } })) as AccountInvite;
	}

	async listInvites(accountId: string): Promise<AccountInvite[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/accounts/${accountId}/invites`)) as AccountInvite[];
	}

	async revokeInvite(accountId: string, inviteId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/accounts/${accountId}/invites/${inviteId}`);
	}
}
