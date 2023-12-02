import { z } from "zod";

export const caveat = z.string().min(1).brand("caveat");
export type Caveat = z.infer<typeof caveat>;

export const tech = z.string().min(1).brand("tech");
export type Techs = z.infer<typeof tech>;

export const frontMatter = z.object({
  name: z.string().min(1),
  shortDescription: z.string().min(1),
  caveats: z.array(caveat).default([]),
  techs: z.array(tech).default([]),
  date: z.coerce.date(),
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
  techs: Record<string, TechDef>,
}
