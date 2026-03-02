# Persistence Strategy: Local-First Storage

## Decision
Switch from Supabase (Cloud) to `localStorage` (Browser-based) for data persistence.

## Rationale
1.  **Network Independence**: Bypasses ISP-level blocks (e.g., Supabase being blocked in certain regions).
2.  **Privacy**: Data never leaves the user's machine, fulfilling the "human-centric" and "private" nature of the Decision Companion.
3.  **Zero Configuration**: No API keys, database schemas, or DDoS protection (like Cloudflare/DDoS-Guard) required.
4.  **Performance**: Near-instant read/write operations with no network latency.

## Implementation Details
- **API**: Web Storage API (`window.localStorage`).
- **Format**: JSON-serialized array of decision objects.
- **Key**: `dcs_history`.

## Trade-offs
- **Device Tethering**: Decisions made on one device won't be visible on another.
- **Cache Risks**: If a user clears their browser "Site Data," the history will be wiped.
- **Syncing**: No multi-user collaboration (not required for this project).
