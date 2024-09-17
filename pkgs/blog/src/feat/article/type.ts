import type { ProcessedBlog } from "blog-processor/types";

export type Post = ProcessedBlog;

export type PostType = ProcessedBlog["frontmatter"]["type"];
