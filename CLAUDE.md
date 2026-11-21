# ak3ph.si — CLAUDE.md

Read this first. Together with `docs/context.md` and `docs/roadmap.md` it is the source of truth for this repo. Keep all three up to date when something changes.

## What this is

The index site at the root of **ak3ph.si**. It lists and documents everything open source that Yash (ak3ph) runs or puts out:

- **Self-hosted tools**: other people's open-source software that runs on a `<name>.ak3ph.si` subdomain, either from the official image or from a fork in `ak3ph-labs` (e.g. Excalidraw at draw.ak3ph.si, Uptime Kuma at status.ak3ph.si).
- **Open-source projects**: Yash's own tools, scripts and projects that are published as open source.
- **Contributions**: work merged into other people's open-source projects.

Sibling sites (do not change them from this repo):

| Site | Role |
|---|---|
| ak3ph.dev | Professional CV/portfolio |
| labs.ak3ph.dev | Personal projects, experiments, configs, ideas (repo `ak3ph-labs/labs`) |
| ak3ph.si | This site: open source and self-hosted |
| status.ak3ph.si | Uptime Kuma public status page |

## Stack

- **Astro** (latest stable; labs is on v7.x, so match its patterns) with content collections and MDX, validated by a **Zod** schema. An invalid entry must fail the build.
- **Static output** into `dist/`, served by **Caddy** on **Railway**. No server code, minimal client JS.
- **Hosting:** Railway project `ak3ph-selfhosted`, service `ak3ph.si` (private hostname `index`), environment `production`, capped at 0.5 vCPU / 512 MB. Every push to `main` deploys.
- **Domain:** `ak3ph.si` (apex) and `www.ak3ph.si` on the service; `www` redirects to the apex in the Caddyfile. DNS on Cloudflare, records **proxied** (orange cloud) with SSL/TLS mode **Full (strict)**. **Rocket Loader** and **Email Obfuscation** are off: both rewrite the HTML and inject scripts, which the site neither needs nor allows in its CSP.
- **Dockerfile:** multi-stage (Node build, then `caddy:2-alpine`). If you use `--mount=type=cache`, Railway requires `id=s/<service id>-<path>`.
- **GitHub stats** at build time via `GITHUB_TOKEN` (Railway variable, read-only, public repos; the Dockerfile takes it as a build `ARG` in the build stage only, so it never reaches the final image). Without a token the build calls the API anonymously. If the API fails, omit the stats and keep the build passing.
- **Live status** from Uptime Kuma badges (`https://status.ak3ph.si/api/badge/<monitorId>/status`), loaded as images so the site stays static.

## Content model

One MDX file per entry in `src/content/entries/<slug>.mdx`.

| Field | Notes |
|---|---|
| `title`, `summary` | Required. Summary is one line. |
| `kind` | `self-hosted` · `project` · `contribution` |
| `status` | `live` · `active` · `maintained` · `paused` · `archived` · `planned` |
| `category` | Short label: whiteboard, monitoring, cli, library… |
| `url` | Live URL, usually `https://<name>.ak3ph.si` |
| `repo` | `ak3ph-labs/<name>`: Yash's repo or fork |
| `upstream` | `owner/repo` of the original project (forks, self-hosted, contributions). Must match `owner/repo`. |
| `license` | SPDX id, e.g. `MIT`, `AGPL-3.0` |
| `source` | What runs: image tag (`louislam/uptime-kuma:2`) or fork + branch |
| `hosting` | Public-safe one-liner, e.g. `Railway · Docker (nginx)` |
| `data` | Where data lives: `none (browser only)`, `volume (SQLite)` |
| `access` | `open` · `login` · `public page + login` |
| `monitorId` | Uptime Kuma monitor id, turns on the status badge |
| `prs` | For contributions: list of PR URLs |
| `tags`, `added`, `updated` | Tags and dates |
| body | MDX write-up: what and why, what changed (forks), how it runs, issues and fixes, known limits |

## Pages

- `/`: three sections (Self-hosted, Projects, Contributions), each a dense list: status badge, title, URL, one-line summary, upstream/license.
- `/p/<slug>`: write-up plus a metadata sidebar.
- `/how`: the shared hosting pattern and the add-a-tool checklist, public-safe version.
- `/404`: not-found page.
- Nav: `index · how · status ↗ · labs ↗ · ak3ph.dev ↗ · github ↗`

## Design

A sibling of ak3ph.dev and labs: same dark base and typography, its own accent, and a "service directory" feel: monospace metadata, compact rows, subdomains shown like hostnames.

- Tokens: bg `#0B0D10`, surface `#12151A`, border `#1F242C`, text `#E6E8EB`, muted `#8B93A1`. If ak3ph.dev uses different base tokens, match ak3ph.dev.
- **Accent: violet `#A78BFA`** (hover `#C4B5FD`). Green, amber and red are reserved for status (up `#4ADE80`, pending `#FBBF24`, down `#F87171`, maintenance `#60A5FA`) so the accent never looks like a status.
- Fonts: system sans for prose, `ui-monospace` stack for metadata. No third-party font or analytics requests.
- Header: `~/ak3ph.si` in monospace, as on labs.
- External links open in a new tab with visually hidden "(opens in new tab)"; internal links stay in the same tab.
- Accessible: contrast AA, focus rings in the accent, badges have alt text.
- Favicon: `public/favicon.svg` (three stacked server bars, top light in the accent).

## Public repo hygiene

This repo is public. Publish what a reader needs and nothing more.

- **OK:** tool name, URL, upstream, license, image or fork, a one-line hosting description, what was changed, issues and fixes, known limits.
- **Never:** secrets or variable values, Railway project/service/volume ids, chat or bot ids, admin emails, internal cost figures, anything about BNS, GDG or client projects.

## Conventions

- Branch → PR → Yash reviews (especially public write-ups) → merge to `main` → Railway deploys → check the live page.
- Commits follow Conventional Commits: `feat(entries): add <name>`, `fix(layout): …`, `docs: …`.
- No AI mentions and no `Co-Authored-By` lines in commits or PR descriptions. That includes "Generated by Claude Code" footers and "Requested by … project thread" lines: never add them to commits, PR bodies or PR comments.
- Commit identity: `ak3ph <99131431+ak3ph@users.noreply.github.com>` (set in `.claude/settings.json` `env`). Never commit with another identity or a personal email.
- Keep `docs/roadmap.md` updated as milestones finish.
