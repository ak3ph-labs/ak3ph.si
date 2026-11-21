# Context

## Goal

ak3ph.si is where everything open source from ak3ph lives in one place: the tools Yash self-hosts, his own open-source projects, and his contributions to other projects. The root domain is the index; each hosted tool gets its own subdomain.

## Why a separate site

- ak3ph.dev is the CV. labs.ak3ph.dev is the personal workbench (experiments, configs, ideas).
- Open-source and self-hosted work has a different audience and different details: upstream credit, license, what is running, how it is hosted, whether it is up. Keeping it on its own domain stops it mixing with personal projects.

## Background

- **Domain:** ak3ph.si, registered at Spaceship, DNS on Cloudflare. Before this site, only `draw.` and `status.` were in use; the apex was empty.
- **Railway:** Pro plan, workspace `ak3ph`.
  - `ak3ph-selfhosted`: self-hosted tools and this index site.
  - `ak3ph-oss` (later): Yash's own open-source projects that need hosting, so their cost stays separate.
- **Pattern for every hosted tool:** one Railway service, one `<function>.ak3ph.si` subdomain (named by function, not product), a resource cap, a volume for any data, CNAME and TXT records on Cloudflare with the proxy off, and a monitor in Uptime Kuma.
- **Forks** live in the `ak3ph-labs` GitHub org and keep the upstream LICENSE and credit.

## Currently hosted

| Tool | URL | Source | Notes |
|---|---|---|---|
| Excalidraw | draw.ak3ph.si | Fork `ak3ph-labs/excalidraw` (MIT) | Monitor id 1. Previously listed on labs, now lives here. Rebranded, Excalidraw+ promos removed. Collaboration and share links still use Excalidraw's public servers. |
| Uptime Kuma | status.ak3ph.si | `louislam/uptime-kuma:2` (MIT) | Public status page "ak3ph status"; monitors draw, labs and ak3ph.dev every 60 s. |

## Audience

Developers and recruiters browsing Yash's open-source work, and anyone using the hosted tools who wants to know what they are and who runs them.

## Out of scope

- Changes to ak3ph.dev or labs.ak3ph.dev.
- Admin features or a backend. The site is static.
