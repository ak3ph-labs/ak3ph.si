# Roadmap

## Milestone 0: setup
- [x] Repo docs: CLAUDE.md, docs/context.md, docs/roadmap.md
- [x] Favicon (`public/favicon.svg`)
- [x] Public repo `ak3ph-labs/ak3ph.si`
- [ ] Repo attached to the Claude project "ak3ph.si" with push access
- [x] Uptime Kuma monitor ids: Draw = 1, Labs = 2, Main site = 3 (status.ak3ph.si has no monitor of its own; it can't watch itself)

## Milestone 1: scaffold and go live
- [ ] Astro project, content collection and Zod schema (see CLAUDE.md)
- [ ] Base layout, header, nav, footer, design tokens
- [ ] Index with the Excalidraw (`monitorId: 1`) and Uptime Kuma entries (short bodies; Excalidraw is the first entry, moved here from labs)
- [ ] Dockerfile + Caddyfile (serve `dist/`, `www` → apex redirect)
- [ ] Railway service `index` in `ak3ph-selfhosted`, capped at 0.5 vCPU / 512 MB, connected to `main`
- [ ] Custom domains `ak3ph.si` and `www.ak3ph.si`; CNAME + TXT on Cloudflare (grey cloud); HTTPS valid
- [ ] Uptime Kuma monitor "Index (ak3ph.si)" added to the status page

## Milestone 2: pages and status
- [ ] `/p/<slug>` with metadata sidebar
- [ ] Full write-ups for Excalidraw and Uptime Kuma (public-safe, adapted from the self-hosting log)
- [ ] Uptime Kuma status badges per entry
- [ ] GitHub stats at build time for `repo` and `upstream`; `GITHUB_TOKEN` on Railway
- [ ] `/how` page: hosting pattern and add-a-tool checklist

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
