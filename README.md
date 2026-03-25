[![npm version](https://img.shields.io/npm/v/oack-node)](https://www.npmjs.com/package/oack-node)
[![CI](https://github.com/oackio/oack-node/actions/workflows/ci.yml/badge.svg)](https://github.com/oackio/oack-node/actions/workflows/ci.yml)
[![Node.js](https://img.shields.io/node/v/oack-node)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MPL-2.0](https://img.shields.io/badge/License-MPL--2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)

[![npm version](https://img.shields.io/npm/v/oack-node.svg)](https://www.npmjs.com/package/oack-node)
[![CI](https://img.shields.io/github/actions/workflow/status/oackio/oack-node/ci.yml?branch=main&label=CI)](https://github.com/oackio/oack-node/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/node/v/oack-node.svg)](https://nodejs.org/)
[![License: MPL-2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
[![npm downloads](https://img.shields.io/npm/dm/oack-node.svg)](https://www.npmjs.com/package/oack-node)

# oack-node

Official Node.js client for the [Oack](https://oack.io) monitoring API.

## Installation

```bash
npm install oack-node
```

## Quick Start

```typescript
import { Oack } from "oack-node";

const client = new Oack({ apiKey: "sk-..." });

const teams = await client.teams.list();
for (const team of teams) {
  console.log(team.id, team.name);
}
```

## Configuration

```typescript
const client = new Oack({
  apiKey: "sk-...",
  baseUrl: "https://api.oack.io", // default
  timeout: 30_000,                 // ms, default
  maxRetries: 2,                   // default
});

// Dynamic token (e.g. refreshable JWT)
const client = new Oack({
  apiKey: () => getCurrentJwt(),
});
```

## Error Handling

```typescript
import { Oack, NotFoundError, RateLimitError, APIError } from "oack-node";

try {
  const monitor = await client.monitors.get(teamId, monitorId);
} catch (err) {
  if (err instanceof NotFoundError) {
    console.log("Monitor not found");
  } else if (err instanceof RateLimitError) {
    console.log(`Retry after ${err.retryAfter}s`);
  } else if (err instanceof APIError) {
    console.log(`API error ${err.statusCode}: ${err.message}`);
  }
}
```

## Resources

| Resource | Access | Key Methods |
|----------|--------|-------------|
| Accounts | `client.accounts` | `create`, `list`, `get`, `update`, `delete`, `restore`, `transfer` |
| Teams | `client.teams` | `create`, `list`, `get`, `update`, `delete`, `listMembers`, `addMember` |
| Monitors | `client.monitors` | `create`, `list`, `get`, `update`, `delete`, `pause`, `unpause`, `duplicate`, `move` |
| Probes | `client.probes` | `list`, `get`, `getDetails`, `downloadPcap`, `aggregate` |
| Alert Channels | `client.alertChannels` | `create`, `list`, `get`, `update`, `delete`, `test` |
| Metrics | `client.metrics` | `getMonitorMetrics`, `getExpiration`, `listTimeline`, chart events |
| Geo | `client.geo` | `listCheckers`, `listRegions` |

## Types

All types are exported and provide full TypeScript inference:

```typescript
import type { Monitor, Team, Probe, CreateMonitorParams } from "oack-node";
```
