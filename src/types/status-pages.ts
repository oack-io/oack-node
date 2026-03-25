export interface StatusPage {
	id: string;
	account_id: string;
	name: string;
	slug: string;
	description: string;
	custom_domain: string | null;
	has_password: boolean;
	allow_iframe: boolean;
	show_historical_uptime: boolean;
	branding_logo_url: string | null;
	branding_favicon_url: string | null;
	branding_primary_color: string | null;
	created_by: string;
	created_at: string;
	updated_at: string;
}

export interface CreateStatusPageParams {
	name: string;
	slug: string;
	description?: string;
	custom_domain?: string;
	password?: string;
	allow_iframe?: boolean;
	show_historical_uptime?: boolean;
	branding_logo_url?: string;
	branding_favicon_url?: string;
	branding_primary_color?: string;
}

export interface UpdateStatusPageParams {
	name?: string;
	description?: string;
	custom_domain?: string;
	password?: string;
	allow_iframe?: boolean;
	show_historical_uptime?: boolean;
	branding_logo_url?: string;
	branding_favicon_url?: string;
	branding_primary_color?: string;
}

export interface ComponentGroup {
	id: string;
	status_page_id: string;
	name: string;
	description: string;
	position: number;
	collapsed: boolean;
	created_at: string;
	updated_at: string;
}

export interface CreateComponentGroupParams {
	name: string;
	description?: string;
	position: number;
	collapsed?: boolean;
}

export interface UpdateComponentGroupParams {
	name?: string;
	description?: string;
	position?: number;
	collapsed?: boolean;
}

export interface Component {
	id: string;
	status_page_id: string;
	group_id: string;
	name: string;
	description: string;
	status: string;
	display_uptime: boolean;
	position: number;
	created_at: string;
	updated_at: string;
}

export interface CreateComponentParams {
	name: string;
	description?: string;
	group_id?: string;
	display_uptime?: boolean;
	position?: number;
}

export interface UpdateComponentParams {
	name?: string;
	description?: string;
	group_id?: string;
	status?: string;
	display_uptime?: boolean;
	position?: number;
}

export interface Incident {
	id: string;
	status_page_id: string;
	name: string;
	status: string;
	severity: string;
	message: string;
	notify_subscribers: boolean;
	reminder_interval_minutes: number | null;
	component_ids: string[];
	created_by: string;
	resolved_at: string | null;
	created_at: string;
	updated_at: string;
}

export interface CreateIncidentParams {
	name: string;
	severity: string;
	message: string;
	component_ids?: string[];
	notify_subscribers?: boolean;
	reminder_interval_minutes?: number;
}

export interface UpdateIncidentParams {
	name?: string;
	status?: string;
	severity?: string;
	message?: string;
}

export interface IncidentUpdate {
	id: string;
	incident_id: string;
	status: string;
	message: string;
	notify_subscribers: boolean;
	created_by: string;
	created_at: string;
}

export interface PostIncidentUpdateParams {
	status: string;
	message: string;
	notify_subscribers?: boolean;
}

export interface IncidentWithUpdates extends Incident {
	updates: IncidentUpdate[];
}

export interface Maintenance {
	id: string;
	status_page_id: string;
	name: string;
	message: string;
	status: string;
	scheduled_start: string;
	scheduled_duration_minutes: number;
	scheduled_end: string;
	auto_status_change: boolean;
	notify_subscribers: boolean;
	component_ids: string[];
	created_by: string;
	completed_at: string | null;
	created_at: string;
	updated_at: string;
}

export interface CreateMaintenanceParams {
	name: string;
	message: string;
	scheduled_start: string;
	scheduled_duration_minutes: number;
	auto_status_change?: boolean;
	notify_subscribers?: boolean;
	component_ids?: string[];
}

export interface UpdateMaintenanceParams {
	name?: string;
	message?: string;
	status?: string;
	scheduled_start?: string;
	scheduled_duration_minutes?: number;
	auto_status_change?: boolean;
	notify_subscribers?: boolean;
}

export interface MaintenanceUpdate {
	id: string;
	maintenance_id: string;
	status: string;
	message: string;
	notify_subscribers: boolean;
	created_by: string;
	created_at: string;
}

export interface PostMaintenanceUpdateParams {
	status: string;
	message: string;
	notify_subscribers?: boolean;
}

export interface MaintenanceWithUpdates extends Maintenance {
	updates: MaintenanceUpdate[];
}

export interface Subscriber {
	id: string;
	status_page_id: string;
	email?: string | null;
	email_verified: boolean;
	user_id?: string | null;
	scope: string;
	channel_ids?: string[];
	created_at: string;
	confirmed_at?: string | null;
}

export interface IncidentTemplate {
	id: string;
	status_page_id: string;
	name: string;
	severity: string;
	title: string;
	message: string;
	component_ids: string[];
	notify_subscribers: boolean;
	created_by: string;
	created_at: string;
	updated_at: string;
}

export interface CreateIncidentTemplateParams {
	name: string;
	severity: string;
	title: string;
	message: string;
	component_ids?: string[];
	notify_subscribers?: boolean;
}

export interface UpdateIncidentTemplateParams {
	name?: string;
	severity?: string;
	title?: string;
	message?: string;
	component_ids?: string[];
	notify_subscribers?: boolean;
}

export interface Watchdog {
	id: string;
	component_id: string;
	monitor_id: string;
	severity: string;
	auto_create: boolean;
	auto_resolve: boolean;
	notify_subscribers: boolean;
	template_id: string;
	created_by: string;
	created_at: string;
}

export interface CreateWatchdogParams {
	monitor_id: string;
	severity: string;
	auto_create?: boolean;
	auto_resolve?: boolean;
	notify_subscribers?: boolean;
	template_id?: string;
}

export interface UpdateWatchdogParams {
	severity?: string;
	auto_create?: boolean;
	auto_resolve?: boolean;
	notify_subscribers?: boolean;
	template_id?: string;
}
