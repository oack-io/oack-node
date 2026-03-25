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
	monitor_id: string | null;
	kind: string;
	source: string;
	title: string;
	body: string;
	start_at: string;
	end_at: string | null;
	created_at: string;
}

export interface CreateChartEventParams {
	monitor_id?: string;
	kind: string;
	source: string;
	title: string;
	body?: string;
	start_at: string;
	end_at?: string;
}

export interface UpdateChartEventParams {
	kind?: string;
	source?: string;
	title?: string;
	body?: string;
	start_at?: string;
	end_at?: string;
}
