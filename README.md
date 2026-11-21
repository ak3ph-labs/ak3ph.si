# ak3ph.si

Source for [ak3ph.si](https://ak3ph.si): an index of the open-source tools ak3ph self-hosts, his own open-source projects, and his contributions to other projects.

- Live status: [status.ak3ph.si](https://status.ak3ph.si)
- Personal projects: [labs.ak3ph.dev](https://labs.ak3ph.dev)
- Portfolio: [ak3ph.dev](https://ak3ph.dev)

Built with Astro, served as static files by Caddy on Railway. Each entry is one MDX file in `src/content/entries/`. See `CLAUDE.md` and `docs/` for how the site works.

## Develop

```sh
npm ci
npm run dev     # http://localhost:4321
npm run build   # static output in dist/; fails on an invalid entry
npm run check   # type check
```

GitHub stats are fetched at build time. Set `GITHUB_TOKEN` (read-only, public repos) to avoid the anonymous rate limit; if the API can't be reached the stats are left out and the build still passes.

## License

Site code is MIT-licensed (see `LICENSE`). Each listed tool keeps its own license; see its entry.
