export interface Monitor {
	id: string;
	team_id: string;
	name: string;
	url: string;
	status: string;
	timeout_ms: number;
	check_interval_ms: number;
	http_method: string;
	http_version: string;
	headers: Record<string, string>;
	follow_redirects: boolean;
	allowed_status_codes: string[];
	failure_threshold: number;
	latency_threshold_ms: number;
	ssl_expiry_enabled: boolean;
	ssl_expiry_thresholds: number[];
	domain_expiry_enabled: boolean;
	domain_expiry_thresholds: number[];
	uptime_threshold_good: number;
	uptime_threshold_degraded: number;
	uptime_threshold_critical: number;
	checker_region: string;
	checker_country: string;
	resolve_override_ip: string;
	health_status: string;
	health_down_reason: string;
	consecutive_failures: number;
	consecutive_successes: number;
	health_changed_at: string | null;
	is_debug_enabled: boolean;
	debug_expires_at: string | null;
	checker_id: string;
	cf_zone_integration_id: string;
	created_by: string;
	created_at: string;
	updated_at: string;
	aggregate_failure_mode?: string;
	aggregate_failure_count?: number;
	locations?: MonitorLocation[];
	type: string;
	browser_config?: BrowserConfig;
}

export interface BrowserConfig {
	screenshot_enabled: boolean;
	screenshot_full_page: boolean;
	console_error_threshold: number;
	resource_error_threshold: number;
	user_agent: string;
	viewport_width: number;
	viewport_height: number;
	wait_until: string;
	extra_wait_ms: number;
	mode?: string;
	steps?: BrowserStep[];
	script?: string;
	script_env?: ScriptEnvVar[];
	suite_url?: string;
	deps_url?: string;
	deps_hash?: string;
	pw_project?: string;
	pw_grep?: string;
	pw_tag?: string;
	suite_git_sha?: string;
	suite_git_branch?: string;
	suite_git_origin?: string;
	suite_deploy_host?: string;
	suite_uploaded_at?: string;
	suite_deployed_by_id?: string;
	suite_deployed_by?: string;
	suite_deployed_by_img?: string;
	suite_deploy_cmd?: string;
}

export interface BrowserStep {
	action: string;
	selector?: string;
	value?: string;
	url?: string;
	attribute?: string;
	variable_name?: string;
	name?: string;
	timeout_ms?: number;
	wait_ms?: number;
}

export interface ScriptEnvVar {
	key: string;
	value: string;
	secret: boolean;
}

export interface MonitorLocation {
	id: string;
	label: string;
	checker_region?: string;
	checker_id?: string;
	assigned_checker_id?: string;
	health_status: string;
	health_down_reason: string;
	health_changed_at?: string;
}

export interface LocationParams {
	checker_id?: string;
	checker_region?: string;
	label?: string;
}

export interface CreateMonitorParams {
	name: string;
	url: string;
	check_interval_ms?: number;
	timeout_ms?: number;
	http_method?: string;
	http_version?: string;
	headers?: Record<string, string>;
	follow_redirects?: boolean;
	allowed_status_codes?: string[];
	failure_threshold?: number;
	latency_threshold_ms?: number;
	ssl_expiry_enabled?: boolean;
	ssl_expiry_thresholds?: number[];
	domain_expiry_enabled?: boolean;
	domain_expiry_thresholds?: number[];
	uptime_threshold_good?: number;
	uptime_threshold_degraded?: number;
	uptime_threshold_critical?: number;
	checker_region?: string;
	checker_country?: string;
	resolve_override_ip?: string;
	status?: string;
	locations?: LocationParams[];
	aggregate_failure_mode?: string;
	aggregate_failure_count?: number;
	type?: string;
	browser_config?: BrowserConfig;
}
