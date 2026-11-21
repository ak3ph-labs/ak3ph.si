# Roadmap

## Milestone 0: setup
- [x] Repo docs: CLAUDE.md, docs/context.md, docs/roadmap.md
- [x] Favicon (`public/favicon.svg`)
- [x] Public repo `ak3ph-labs/ak3ph.si`
- [ ] Repo attached to the Claude project "ak3ph.si" with push access
- [x] Uptime Kuma monitor ids: Draw = 1, Labs = 2, Main site = 3 (status.ak3ph.si has no monitor of its own; it can't watch itself)

## Milestone 1: scaffold and go live
- [x] Astro project, content collection and Zod schema (see CLAUDE.md)
- [x] Base layout, header, nav, footer, design tokens (nav leaves out `how` until that page exists)
- [x] Index with the Excalidraw (`monitorId: 1`) and Uptime Kuma entries (short bodies; Excalidraw is the first entry, moved here from labs)
- [x] Dockerfile + Caddyfile (serve `dist/`, `www` → apex redirect)
- [x] Railway service in `ak3ph-selfhosted` (named `ak3ph.si`, private hostname `index`), capped at 0.5 vCPU / 512 MB, connected to `main`
- [x] Custom domains `ak3ph.si` and `www.ak3ph.si`; CNAME + TXT on Cloudflare (now proxied, SSL Full (strict), Rocket Loader and Email Obfuscation off); HTTPS valid
- [ ] Uptime Kuma monitor "Index (ak3ph.si)" added to the status page

## Milestone 2: pages and status
- [x] `/p/<slug>` with metadata sidebar
- [x] Full write-ups for Excalidraw and Uptime Kuma (public-safe; written from docs/context.md and the live service setup)
- [x] Uptime Kuma status badges per entry (index rows and entry pages)
- [x] GitHub stats at build time for `repo` and `upstream` (stars on the index, stars/forks/last push on entry pages)
- [ ] `GITHUB_TOKEN` on Railway (read-only, public repos). Until it is set the build calls the API anonymously, which shares a 60 requests/hour limit with other builds on the same IP, so stats may be left out
- [x] `/how` page: hosting pattern and add-a-tool checklist; add `how` to the nav

## Milestone 3: open source
- [ ] Seed own open-source projects (list in Inventory below)
- [ ] Seed contributions with PR links
- [ ] Optional: build-time list of merged PRs to other projects from the GitHub API
- [ ] Create Railway project `ak3ph-oss` when the first own project needs hosting

## Milestone 4: polish
- [ ] Daily GitHub Action that triggers a redeploy to refresh stats
- [ ] Sitemap, Open Graph image, meta descriptions
- [ ] Lighthouse/a11y pass
- [ ] Optional: external uptime check on status.ak3ph.si

## Inventory

**Self-hosted:** Excalidraw (draw), Uptime Kuma (status)
**Projects:** to fill
**Contributions:** to fill
**Next tools to host:** to pick
