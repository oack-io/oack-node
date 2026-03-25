import { BaseClient, type OackOptions } from "./client.js";
import { Accounts } from "./resources/accounts.js";
import { AlertChannels } from "./resources/alert-channels.js";
import { CFLogs } from "./resources/cf-logs.js";
import { Comments } from "./resources/comments.js";
import { ExternalLinks } from "./resources/external-links.js";
import { Geo } from "./resources/geo.js";
import { Integrations } from "./resources/integrations.js";
import { Metrics } from "./resources/metrics.js";
import { Monitors } from "./resources/monitors.js";
import { Notifications } from "./resources/notifications.js";
import { Probes } from "./resources/probes.js";
import { Shares } from "./resources/shares.js";
import { StatusPages } from "./resources/status-pages.js";
import { Teams } from "./resources/teams.js";
import { Traces } from "./resources/traces.js";
import { UserResource } from "./resources/user.js";
import { Watchdogs } from "./resources/watchdogs.js";

export class Oack {
	readonly accounts: Accounts;
	readonly teams: Teams;
	readonly monitors: Monitors;
	readonly probes: Probes;
	readonly alertChannels: AlertChannels;
	readonly metrics: Metrics;
	readonly geo: Geo;
	readonly statusPages: StatusPages;
	readonly watchdogs: Watchdogs;
	readonly comments: Comments;
	readonly externalLinks: ExternalLinks;
	readonly integrations: Integrations;
	readonly notifications: Notifications;
	readonly shares: Shares;
	readonly traces: Traces;
	readonly user: UserResource;
	readonly cfLogs: CFLogs;

	constructor(options: OackOptions) {
		const client = new BaseClient(options);
		this.accounts = new Accounts(client);
		this.teams = new Teams(client);
		this.monitors = new Monitors(client);
		this.probes = new Probes(client);
		this.alertChannels = new AlertChannels(client);
		this.metrics = new Metrics(client);
		this.geo = new Geo(client);
		this.statusPages = new StatusPages(client);
		this.watchdogs = new Watchdogs(client);
		this.comments = new Comments(client);
		this.externalLinks = new ExternalLinks(client);
		this.integrations = new Integrations(client);
		this.notifications = new Notifications(client);
		this.shares = new Shares(client);
		this.traces = new Traces(client);
		this.user = new UserResource(client);
		this.cfLogs = new CFLogs(client);
	}
}

// Re-export auth
export { deviceFlowAuthenticate } from "./auth.js";
export type { DeviceFlowOptions } from "./auth.js";

// Re-export errors
export {
	OackError,
	APIError,
	AuthenticationError,
	ForbiddenError,
	NotFoundError,
	ConflictError,
	RateLimitError,
} from "./errors.js";

// Re-export types
export type { OackOptions } from "./client.js";
export type { Account, AccountMember, AccountInvite, Subscription } from "./types/accounts.js";
export type {
	Team,
	TeamMember,
	TeamInvite,
	AcceptInviteResult,
	TeamAPIKey,
	CreateTeamAPIKeyParams,
	CreateTeamAPIKeyResult,
} from "./types/teams.js";
export type { Monitor, CreateMonitorParams } from "./types/monitors.js";
export type { Probe, ProbeList, ProbeListOptions, ProbeAggBucket, ProbeAggregation } from "./types/probes.js";
export type { AlertChannel, CreateAlertChannelParams, AlertEvent } from "./types/alert-channels.js";
export type {
	WindowMetrics,
	MonitorMetrics,
	ExpirationSSL,
	ExpirationDomain,
	Expiration,
	TimelineEvent,
	ChartEvent,
	CreateChartEventParams,
	UpdateChartEventParams,
} from "./types/metrics.js";
export type { Checker, GeoCountry, GeoRegion } from "./types/geo.js";
export type {
	StatusPage,
	CreateStatusPageParams,
	UpdateStatusPageParams,
	ComponentGroup,
	CreateComponentGroupParams,
	UpdateComponentGroupParams,
	Component,
	CreateComponentParams,
	UpdateComponentParams,
	Incident,
	CreateIncidentParams,
	UpdateIncidentParams,
	IncidentUpdate,
	PostIncidentUpdateParams,
	IncidentWithUpdates,
	Maintenance,
	CreateMaintenanceParams,
	UpdateMaintenanceParams,
	MaintenanceUpdate,
	PostMaintenanceUpdateParams,
	MaintenanceWithUpdates,
	Subscriber,
	IncidentTemplate,
	CreateIncidentTemplateParams,
	UpdateIncidentTemplateParams,
	Watchdog,
	CreateWatchdogParams,
	UpdateWatchdogParams,
} from "./types/status-pages.js";
export type { Comment, CreateCommentParams, CommentEdit } from "./types/comments.js";
export type {
	ExternalLink,
	CreateExternalLinkParams,
	UpdateExternalLinkParams,
	CreateExternalLinkResult,
} from "./types/external-links.js";
export type {
	PDIntegration,
	CreatePDIntegrationParams,
	UpdatePDIntegrationParams,
	CFIntegration,
	CreateCFIntegrationParams,
	UpdateCFIntegrationParams,
} from "./types/integrations.js";
export type { NotificationDefaults, MonitorNotifications } from "./types/notifications.js";
export type { Share, CreateShareParams } from "./types/shares.js";
export type { Trace, TraceHop, TraceList } from "./types/traces.js";
export type {
	User,
	Preferences,
	UpdatePreferencesParams,
	PushDevice,
	TelegramLink,
	TelegramLinkStatus,
	NotificationPreferences,
	QuietHours,
	UpdateNotificationPreferencesParams,
} from "./types/user.js";
export type { CFLogEntry } from "./types/cf-logs.js";
