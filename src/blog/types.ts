import { z } from "zod";

export const postMetadataSchema = z
  .object({
    name: z.string().min(1),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
  })
export type PostMetadata = z.infer<typeof postMetadataSchema>;

export type Post = PostMetadata & {
  rawContent: string;
};
