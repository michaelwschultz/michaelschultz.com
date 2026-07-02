#!/usr/bin/env bash
set -euo pipefail

export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

CACHE_DIR="${BUILD_CACHE_DIR:-/var/lib/michaelschultzcom-build-cache}"
IMAGE_NAME="${COMPOSE_IMAGE_NAME:-michaelschultzcom-web}"

mkdir -p "$CACHE_DIR"

docker buildx build \
	--cache-from "type=local,src=$CACHE_DIR" \
	--cache-to "type=local,dest=$CACHE_DIR,mode=max" \
	--load \
	-t "$IMAGE_NAME" \
	-f Dockerfile \
	.

docker compose up -d
