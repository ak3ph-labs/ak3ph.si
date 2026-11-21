# syntax=docker/dockerfile:1

# 1. Build the static site.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# Read-only token for GitHub stats. Railway passes service variables as build
# args; it stays in this stage and never reaches the final image.
ARG GITHUB_TOKEN
RUN npm run build

# 2. Serve dist/ with Caddy.
FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
ENV PORT=8080
EXPOSE 8080
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
