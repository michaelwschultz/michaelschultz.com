#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

EXAMPLE="$ROOT_DIR/.env.example"
OUTPUT="$ROOT_DIR/.env"
PRODUCTION_DATABASE_PATH="/app/data/listening.db"

if [[ ! -f "$EXAMPLE" ]]; then
	echo "Missing .env.example"
	exit 1
fi

if [[ -z "${LASTFM_API_KEY:-}" ]]; then
	echo "LASTFM_API_KEY must be set"
	exit 1
fi

while IFS= read -r line || [[ -n "$line" ]]; do
	if [[ "$line" =~ ^([A-Za-z_][A-Za-z0-9_]*)=(.*)$ ]]; then
		key="${BASH_REMATCH[1]}"
		case "$key" in
			LASTFM_API_KEY)
				printf '%s=%q\n' "$key" "$LASTFM_API_KEY"
				;;
			LASTFM_USER)
				printf '%s=%q\n' "$key" "${LASTFM_USER:-michaelschultz}"
				;;
			DATABASE_PATH)
				printf '%s=%q\n' "$key" "${DATABASE_PATH:-$PRODUCTION_DATABASE_PATH}"
				;;
			CRON_SECRET)
				printf '%s=%q\n' "$key" "${CRON_SECRET:-}"
				;;
			SYNC_CRON)
				if [[ -n "${SYNC_CRON:-}" ]]; then
					printf '%s=%q\n' "$key" "$SYNC_CRON"
				else
					echo "$line"
				fi
				;;
			*)
				echo "$line"
				;;
		esac
	else
		echo "$line"
	fi
done < "$EXAMPLE" > "$OUTPUT"

chmod 600 "$OUTPUT"
