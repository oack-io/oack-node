export interface ConsoleMessage {
	type: string;
	text: string;
	url: string;
	line: number;
	column: number;
}

export interface StepResult {
	action: string;
	name?: string;
	status: string;
	duration_ms: number;
	error?: string;
	screenshot_url?: string;
}

export interface BrowserProbe {
	id: string;
	checker_id?: string;
	checker_public_ip?: string;
	status: number;
	error: string;
	total_ms: number;
	dom_content_loaded_ms: number;
	load_event_ms: number;
	dom_interactive_ms: number;
	lcp_ms: number;
	fcp_ms: number;
	cls: number;
	ttfb_ms: number;
	resource_count: number;
	resource_error_count: number;
	resource_total_bytes: number;
	resource_status_1xx?: number;
	resource_status_2xx?: number;
	resource_status_3xx?: number;
	resource_status_4xx?: number;
	resource_status_5xx?: number;
	har_url?: string;
	console_error_count: number;
	console_warning_count: number;
	console_messages?: ConsoleMessage[];
	screenshot_url?: string;
	user_agent?: string;
	step_results?: StepResult[];
	checked_at: string;
}

export interface BrowserProbeList {
	items: BrowserProbe[];
}

export interface BrowserProbeListOptions {
	from?: string;
	to?: string;
	limit?: number;
}

export interface BrowserProbeAggBucket {
	timestamp: string;
	probe_count: number;
	error_count: number;
	total_ms: number;
	lcp_ms: number;
	fcp_ms: number;
	cls: number;
	ttfb_ms: number;
	resource_count: number;
	resource_error_count: number;
}

export interface BrowserProbeAggregation {
	buckets: BrowserProbeAggBucket[];
}
