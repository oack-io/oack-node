import type { BaseClient } from "../client.js";
import type { TestScriptParams, TestScriptResult } from "../types/test-script.js";

interface SubmitResponse {
	test_id: string;
}

interface PollResponse {
	status: string;
	result?: TestScriptResult;
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export class TestScript {
	constructor(private client: BaseClient) {}

	async run(teamId: string, monitorId: string, params: TestScriptParams): Promise<TestScriptResult> {
		const submitPath = `/api/v1/teams/${teamId}/monitors/${monitorId}/test-script`;

		const submit = JSON.parse(await this.client.request("POST", submitPath, { json: params })) as SubmitResponse;

		if (!submit.test_id) {
			throw new Error("server returned empty test_id");
		}

		const pollPath = `${submitPath}/${submit.test_id}`;
		const pollIntervalMs = 2000;
		const timeoutMs = 5 * 60 * 1000;
		const deadline = Date.now() + timeoutMs;

		while (Date.now() < deadline) {
			await sleep(pollIntervalMs);
			const poll = JSON.parse(await this.client.request("GET", pollPath)) as PollResponse;
			if (poll.status === "done" && poll.result) {
				return poll.result;
			}
		}

		throw new Error(`test timed out after ${timeoutMs / 1000}s`);
	}
}
