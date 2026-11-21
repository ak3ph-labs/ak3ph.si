import { getCollection, type CollectionEntry } from 'astro:content';

export type Entry = CollectionEntry<'entries'>;
export type Kind = Entry['data']['kind'];

export const sections: { kind: Kind; id: string; title: string; blurb: string }[] = [
  {
    kind: 'self-hosted',
    id: 'self-hosted',
    title: 'Self-hosted',
    blurb: 'Open-source software from other people, running on an ak3ph.si subdomain.',
  },
  {
    kind: 'project',
    id: 'projects',
    title: 'Projects',
    blurb: 'Tools, scripts and projects of my own, published as open source.',
  },
  {
    kind: 'contribution',
    id: 'contributions',
    title: 'Contributions',
    blurb: 'Work merged into other open-source projects.',
  },
];

const statusOrder: Entry['data']['status'][] = [
  'live',
  'active',
  'maintained',
  'planned',
  'paused',
  'archived',
];

export async function entriesByKind(): Promise<Record<Kind, Entry[]>> {
  const all = await getCollection('entries');
  const grouped: Record<Kind, Entry[]> = { 'self-hosted': [], project: [], contribution: [] };
  for (const e of all) grouped[e.data.kind].push(e);
  for (const list of Object.values(grouped)) {
    list.sort(
      (a, b) =>
        statusOrder.indexOf(a.data.status) - statusOrder.indexOf(b.data.status) ||
        a.data.title.localeCompare(b.data.title),
    );
  }
  return grouped;
}

/** `https://draw.ak3ph.si/` -> `draw.ak3ph.si` */
export function hostname(url: string): string {
  const u = new URL(url);
  return (u.host + u.pathname).replace(/\/$/, '');
}
