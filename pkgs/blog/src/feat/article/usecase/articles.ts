import path from "node:path";
import { processBlogArticles } from "blog-processor";
import { retrievePropertyDefinition } from "blog-processor";
import type { PropertiesDefinition } from "blog-processor/types";
import type { Post } from "../type";
import { blogComponentsFilled } from "../views/detail/blog-components";

const BLOG_ARTICLE_PATH = path.join(
  process.cwd(),
  process.env.BLOG_ARTICLE_PATH ?? "",
);

export async function retrievePost(key: string): Promise<Post> {
  const defs = getDefinition();
  const { articles, timestamps } = await processBlogArticles(
    BLOG_ARTICLE_PATH,
    defs,
    blogComponentsFilled(defs),
  );

  return articles[key];
}

export async function getPosts(count: number): Promise<Post[]> {
  const defs = getDefinition();
  const { articles, timestamps } = await processBlogArticles(
    BLOG_ARTICLE_PATH,
    defs,
    blogComponentsFilled(defs),
  );

  const latest = timestamps
    .sort(([left, _], [right, __]) => right - left)
    .slice(0, count);

  return latest.map(([_, slug]) => articles[slug]);
}

export function getDefinition(): PropertiesDefinition {
  return retrievePropertyDefinition(path.join(BLOG_ARTICLE_PATH, "tags.json"));
}
