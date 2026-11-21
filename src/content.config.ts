import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** `owner/repo` on GitHub. */
const ghRepo = z
  .string()
  .regex(/^[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/, 'must be "owner/repo"');

const entries = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/entries' }),
  schema: z
    .strictObject({
      title: z.string().min(1),
      summary: z
        .string()
        .min(1)
        .max(160)
        .refine((s) => !s.includes('\n'), 'summary must be one line'),
      kind: z.enum(['self-hosted', 'project', 'contribution']),
      status: z.enum(['live', 'active', 'maintained', 'paused', 'archived', 'planned']),
      category: z.string().min(1).max(24),
      url: z.url({ protocol: /^https$/ }).optional(),
      repo: ghRepo
        .refine((r) => r.startsWith('ak3ph-labs/'), 'repo must be in ak3ph-labs')
        .optional(),
      upstream: ghRepo.optional(),
      license: z.string().min(1).optional(),
      source: z.string().min(1).optional(),
      hosting: z.string().min(1).optional(),
      data: z.string().min(1).optional(),
      access: z.enum(['open', 'login', 'public page + login']).optional(),
      monitorId: z.number().int().positive().optional(),
      prs: z.array(z.url({ protocol: /^https$/ })).optional(),
      tags: z.array(z.string().min(1)).default([]),
      added: z.coerce.date(),
      updated: z.coerce.date().optional(),
    })
    .superRefine((e, ctx) => {
      const need = (field: keyof typeof e, why: string) => {
        if (e[field] === undefined) {
          ctx.addIssue({ code: 'custom', path: [field], message: `${field} is required for ${why}` });
        }
      };
      if (e.kind === 'self-hosted') {
        need('url', 'self-hosted entries');
        need('upstream', 'self-hosted entries');
        need('license', 'self-hosted entries');
        need('source', 'self-hosted entries');
      }
      if (e.kind === 'contribution') {
        need('upstream', 'contributions');
        if (!e.prs?.length) {
          ctx.addIssue({ code: 'custom', path: ['prs'], message: 'contributions need at least one PR URL' });
        }
      }
      if (e.updated && e.updated < e.added) {
        ctx.addIssue({ code: 'custom', path: ['updated'], message: 'updated is before added' });
      }
    }),
});

export const collections = { entries };
