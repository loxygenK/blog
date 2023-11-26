import { processBlogArticles } from "blog-processor";
import { Post } from "../types";
import fs from "fs";
import path from "path";

const BLOG_ARTICLE_PATH = path.join(process.cwd(), process.env.BLOG_ARTICLE_PATH ?? "");

export async function retrievePost(key: string): Promise<Post> {
  const tags = JSON.parse(fs.readFileSync(path.join(BLOG_ARTICLE_PATH, "tags.json")).toString());
  const database = await processBlogArticles(BLOG_ARTICLE_PATH, tags);;

  return database[key];
}

