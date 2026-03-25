export interface CFLogEntry {
	id: string;
	probe_id: string;
	monitor_id: string;
	correlation_id: string;
	raw_log: unknown;
	created_at: string;
}
