import type { BaseClient } from "../client.js";
import type { AcceptInviteResult, CreateTeamAPIKeyParams, CreateTeamAPIKeyResult, Team, TeamAPIKey, TeamInvite, TeamMember } from "../types/teams.js";

export class Teams {
	constructor(private client: BaseClient) {}

	async create(accountId: string, name: string): Promise<Team> {
		return JSON.parse(await this.client.request("POST", `/api/v1/accounts/${accountId}/teams`, { json: { name } })) as Team;
	}

	async list(): Promise<Team[]> {
		return JSON.parse(await this.client.request("GET", "/api/v1/teams")) as Team[];
	}

	async listByAccount(accountId: string): Promise<Team[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/accounts/${accountId}/teams`)) as Team[];
	}

	async get(teamId: string): Promise<Team> {
		return JSON.parse(await this.client.request("GET", `/api/v1/teams/${teamId}`)) as Team;
	}

	async update(teamId: string, name: string): Promise<Team> {
		return JSON.parse(await this.client.request("PUT", `/api/v1/teams/${teamId}`, { json: { name } })) as Team;
	}

	async delete(teamId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/teams/${teamId}`);
	}

	async listMembers(teamId: string): Promise<TeamMember[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/teams/${teamId}/members`)) as TeamMember[];
	}

	async addMember(teamId: string, userId: string, role: string): Promise<TeamMember> {
		return JSON.parse(await this.client.request("POST", `/api/v1/teams/${teamId}/members`, { json: { user_id: userId, role } })) as TeamMember;
	}

	async removeMember(teamId: string, userId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/teams/${teamId}/members/${userId}`);
	}

	async setMemberRole(teamId: string, userId: string, role: string): Promise<void> {
		await this.client.request("PUT", `/api/v1/teams/${teamId}/members/${userId}/role`, { json: { role } });
	}

	async listInvites(teamId: string): Promise<TeamInvite[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/teams/${teamId}/invites`)) as TeamInvite[];
	}

	async createInvite(teamId: string): Promise<TeamInvite> {
		return JSON.parse(await this.client.request("POST", `/api/v1/teams/${teamId}/invites`)) as TeamInvite;
	}

	async revokeInvite(teamId: string, inviteId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/teams/${teamId}/invites/${inviteId}`);
	}

	async acceptInvite(token: string): Promise<AcceptInviteResult> {
		return JSON.parse(await this.client.request("POST", `/api/v1/invites/${token}/accept`)) as AcceptInviteResult;
	}

	async createAPIKey(teamId: string, params: CreateTeamAPIKeyParams): Promise<CreateTeamAPIKeyResult> {
		return JSON.parse(await this.client.request("POST", `/api/v1/teams/${teamId}/api-keys`, { json: params })) as CreateTeamAPIKeyResult;
	}

	async listAPIKeys(teamId: string): Promise<TeamAPIKey[]> {
		return JSON.parse(await this.client.request("GET", `/api/v1/teams/${teamId}/api-keys`)) as TeamAPIKey[];
	}

	async deleteAPIKey(teamId: string, keyId: string): Promise<void> {
		await this.client.request("DELETE", `/api/v1/teams/${teamId}/api-keys/${keyId}`);
	}
}
