#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

export WEB_IMAGE="${WEB_IMAGE:-ghcr.io/michaelwschultz/michaelschultz.com:latest}"

# Cap dockerd during pull/up (layer extract runs in the daemon, not the compose CLI).
# On a 1-vCPU host, 80% keeps headroom for SSH/system. On N vCPUs use N×80% (e.g. 160%).
DEPLOY_DOCKER_CPU_QUOTA="${DEPLOY_DOCKER_CPU_QUOTA:-80%}"
docker_cpu_limited=0
docker_config_dir=""

reset_docker_cpu_quota() {
	if [[ "$docker_cpu_limited" -eq 1 ]]; then
		systemctl set-property docker.service --reset-property=CPUQuota 2>/dev/null \
			|| sudo -n systemctl set-property docker.service --reset-property=CPUQuota 2>/dev/null \
			|| true
		docker_cpu_limited=0
	fi
}

limit_docker_cpu_quota() {
	if [[ -z "$DEPLOY_DOCKER_CPU_QUOTA" ]]; then
		return 0
	fi
	if systemctl set-property docker.service "CPUQuota=${DEPLOY_DOCKER_CPU_QUOTA}" 2>/dev/null \
		|| sudo -n systemctl set-property docker.service "CPUQuota=${DEPLOY_DOCKER_CPU_QUOTA}" 2>/dev/null; then
		docker_cpu_limited=1
		echo "→ Docker daemon CPU capped at ${DEPLOY_DOCKER_CPU_QUOTA} for deploy"
	fi
}

cleanup_deploy() {
	reset_docker_cpu_quota
	if [[ -n "$docker_config_dir" ]]; then
		rm -rf "$docker_config_dir"
		docker_config_dir=""
		unset DOCKER_CONFIG
	fi
}

trap cleanup_deploy EXIT

if [[ -n "${GHCR_TOKEN:-}" && -n "${GHCR_USERNAME:-}" ]]; then
	docker_config_dir="$(mktemp -d)"
	export DOCKER_CONFIG="$docker_config_dir"
	# Ephemeral config: token is not left in ~/.docker/config.json after deploy.
	echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USERNAME" --password-stdin >/dev/null 2>&1
fi

limit_docker_cpu_quota

echo "→ Pulling ${WEB_IMAGE}"
docker compose pull --quiet web
image_id="$(docker image inspect "$WEB_IMAGE" --format '{{.Id}}')"
echo "✓ Image ready (${image_id})"

docker compose up -d --no-build
container_id="$(docker compose ps -q web)"
echo "✓ web running (${container_id})"

cleanup_deploy
trap - EXIT
