import { z } from "zod";

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
  type: z.string().transform((x) => x.toLowerCase()).pipe(z.union([
    z.literal("coding"),
    z.literal("programming"),
    z.literal("til"),
    z.literal("mylife"),
    z.literal("mycareer"),
    z.literal("release"),
    z.literal("other"),
  ])),
  published: z.union([
    z.literal("hidden"),
    z.literal("not-listed"),
    z.literal("true"),
    z.coerce.date(),
  ]).default("true")
})
export type FrontMatter = z.infer<typeof frontMatter>;

export type ProcessedBlog = {
  slug: string;
  mdxContent: string;
  frontmatter: FrontMatter;
}

export type CaveatDef = {
  emoji: string;
  header?: {
    description: string;
    label: string;
  },
  inline?: {
    description: string;
    background: string;
  }
};

export type TechDef = {
  emoji: string;
  name: string;
};

export type TagsDefinition = {
  caveats: Record<string, CaveatDef>,
  tag: Record<string, TechDef>,
}
