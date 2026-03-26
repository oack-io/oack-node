export interface WindowMetrics {
	uptime: number;
	avg_response_ms: number;
	p95_response_ms: number;
	total_probes: number;
	success_probes: number;
	failure_probes: number;
}

export interface MonitorMetrics {
	last_24h: WindowMetrics;
	last_7d: WindowMetrics;
	last_30d: WindowMetrics;
}

export interface ExpirationSSL {
	expires_at: string | null;
	issuer: string;
	subject: string;
	days_left: number | null;
	status: string;
	checked_at: string | null;
}

export interface ExpirationDomain {
	expires_at: string | null;
	registrar: string;
	days_left: number | null;
	status: string;
	checked_at: string | null;
}

export interface Expiration {
	ssl: ExpirationSSL | null;
	domain: ExpirationDomain | null;
}

export interface TimelineEvent {
	id: string;
	monitor_id: string;
	type: string;
	message: string;
	created_at: string;
}

export interface ChartEvent {
	id: string;
	team_id: string;
	monitor_id: string;
	source: string;
	kind: string;
	title: string;
	description: string;
	url: string;
	severity: string;
	external_id: string;
	started_at: string;
	ended_at: string | null;
	metadata: Record<string, unknown>;
	created_by: string;
	created_at: string;
	updated_at: string;
}

export interface CreateChartEventParams {
	monitor_id?: string;
	kind: string;
	title: string;
	description?: string;
	url?: string;
	severity?: string;
	started_at: string;
	ended_at?: string;
	metadata?: Record<string, unknown>;
}

export interface UpdateChartEventParams {
	monitor_id?: string;
	kind?: string;
	title?: string;
	description?: string;
	url?: string;
	severity?: string;
	started_at?: string;
	ended_at?: string;
	metadata?: Record<string, unknown>;
}

export interface ChartEventListOptions {
	from: string;
	to: string;
	monitor_id?: string;
	kind?: string;
	source?: string;
}

export interface IngestChartEventParams {
	kind: string;
	title: string;
	url?: string;
	started_at?: string;
	ended_at?: string;
	monitor_id?: string;
	severity?: string;
	metadata?: Record<string, unknown>;
}
