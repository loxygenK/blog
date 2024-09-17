import type { ReactNode } from "react";
import { string, z } from "zod";

export const caveat = z.string().min(1).brand("caveat");
export type Caveat = z.infer<typeof caveat>;

export const tag = z.string().min(1).brand("tag");
export type Tag = z.infer<typeof tag>;

export const frontMatter = z.object({
  title: z.string().min(1),
  subTitle: z.string().min(1),
  caveats: z.array(caveat).default([]),
  tags: z.array(tag).default([]),
  date: z.coerce.date(),
  type: z
    .string()
    .transform((x) => x.toLowerCase())
    .pipe(
      z.union([
        z.literal("coding"),
        z.literal("programming"),
        z.literal("til"),
        z.literal("mylife"),
        z.literal("mycareer"),
        z.literal("release"),
        z.literal("other"),
      ]),
    ),
  published: z
    .union([
      z.literal("hidden"),
      z.literal("not-listed"),
      z.literal("true"),
      z.coerce.date(),
    ])
    .default("true"),
});
export type FrontMatter = z.infer<typeof frontMatter>;

export type Heading = {
  depth: number;
  content: string;
  children: Array<Heading>;
  linkId: string;
  parent: Heading | undefined;
};

export type ProcessedBlog = {
  slug: string;
  mdxContent: ReactNode;
  frontmatter: FrontMatter;
  headings: Array<Heading>;
};

export const caveatDef = z.object({
  emoji: z.string(),
  header: z
    .object({
      description: z.string(),
      label: z.string(),
    })
    .optional(),
  inline: z
    .object({
      description: z.string(),
      background: z.string(),
    })
    .optional(),
});

export type CaveatDef = z.infer<typeof caveatDef>;

export const tagsDef = z.object({
  emoji: z.string(),
  name: z.string(),
});

export type TagsDef = z.infer<typeof tagsDef>;

export const propertiesDefinition = z.object({
  caveats: z.record(z.string(), caveatDef),
  tag: z.record(z.string(), tagsDef),
});

export type PropertiesDefinition = z.infer<typeof propertiesDefinition>;
