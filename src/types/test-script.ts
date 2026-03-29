import type { ConsoleMessage, StepResult } from "./browser-probes.js";

export interface WebVitals {
	lcp_ms: number;
	fcp_ms: number;
	cls: number;
	ttfb_ms: number;
}

export interface TestScriptParams {
	script?: string;
	suite?: string;
	pw_project?: string;
	pw_grep?: string;
	env_overrides?: Record<string, string>;
}

export interface TestScriptResult {
	passed: boolean;
	total_ms: number;
	error?: string;
	status: number;
	steps?: StepResult[];
	console_messages?: ConsoleMessage[];
	screenshot_url?: string;
	report_url?: string;
	test_count?: number;
	pass_count?: number;
	fail_count?: number;
	skip_count?: number;
	web_vitals?: WebVitals;
}
