export interface Probe {
	id: string;
	monitor_id: string;
	checker_id: string;
	checker_region: string;
	checker_country: string;
	status_code: number;
	response_time_ms: number;
	dns_time_ms: number;
	connect_time_ms: number;
	tls_time_ms: number;
	ttfb_ms: number;
	transfer_time_ms: number;
	error: string;
	is_up: boolean;
	created_at: string;
}

export interface ProbeList {
	probes: Probe[];
	total: number;
}

export interface ProbeListOptions {
	limit?: number;
	offset?: number;
	is_up?: boolean;
}

export interface ProbeAggBucket {
	timestamp: string;
	avg_response_ms: number;
	min_response_ms: number;
	max_response_ms: number;
	success_count: number;
	failure_count: number;
	total_count: number;
}

export interface ProbeAggregation {
	buckets: ProbeAggBucket[];
}
