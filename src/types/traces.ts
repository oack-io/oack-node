export interface TraceHop {
	hop: number;
	ip: string;
	hostname: string;
	rtt_min_us: number;
	rtt_avg_us: number;
	rtt_max_us: number;
	loss_pct: number;
	asn: number;
	asn_org: string;
	country: string;
	latitude: number;
	longitude: number;
}

export interface Trace {
	id: string;
	monitor_id: string;
	checker_id: string;
	target_host: string;
	method: string;
	hop_count: number;
	completed: boolean;
	total_ms: number;
	error?: string;
	traced_at: string;
	hops: TraceHop[];
}

export interface TraceList {
	traces: Trace[];
}
