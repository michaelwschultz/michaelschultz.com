#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

export WEB_IMAGE="${WEB_IMAGE:-ghcr.io/michaelwschultz/michaelschultz.com:latest}"

if [[ -n "${GHCR_TOKEN:-}" && -n "${GHCR_USERNAME:-}" ]]; then
	echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USERNAME" --password-stdin
fi

docker compose pull web
docker compose up -d --no-build
