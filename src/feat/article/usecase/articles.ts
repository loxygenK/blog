import fs from "fs";
import path from "path";
import { processBlogArticles } from "blog-processor";
import { Post } from "../type";
import { blogComponents } from "../views/detail/blog-components";

const BLOG_ARTICLE_PATH = path.join(
  process.cwd(),
  process.env.BLOG_ARTICLE_PATH ?? "",
);

export async function retrievePost(key: string): Promise<Post> {
  const tags = JSON.parse(
    fs.readFileSync(path.join(BLOG_ARTICLE_PATH, "tags.json")).toString(),
  );
  const { articles, timestamps } = await processBlogArticles(
    BLOG_ARTICLE_PATH,
    tags,
    blogComponents,
  );

  return articles[key];
}

export async function getPosts(count: number): Promise<Post[]> {
  const tags = JSON.parse(
    fs.readFileSync(path.join(BLOG_ARTICLE_PATH, "tags.json")).toString(),
  );
  const { articles, timestamps } = await processBlogArticles(
    BLOG_ARTICLE_PATH,
    tags,
    blogComponents,
  );

  const latest = timestamps
    .sort(([left, _], [right, __]) => right - left)
    .slice(0, count);

  return latest.map(([_, slug]) => articles[slug]);
}
