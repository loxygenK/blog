import fs from "fs";
import path from "path";
import { ProcessedBlog, TagsDefinition } from "./types";
import { walk } from "./fs";
import { parseMDX } from "./markdown";
import { FailureValidationResult, validateParsedMarkdown } from "./validator";
import { FC } from "react";

export type BlogArticleRegistry = {
  articles: Record<string, ProcessedBlog>;
  timestamps: Array<[time: number, slug: string]>;
}

export async function processBlogArticles(articlePath: string, defs: TagsDefinition, components: Record<string, FC<any>>): Promise<BlogArticleRegistry> {
  const dataPath = path.join(articlePath, "articles");
  if(!fs.existsSync(dataPath)) {
    throw new Error(`The path did not found: ${dataPath}}`);
  }

  let failed = false;
  const timestamps: Array<[time: number, slug: string]> = [];
  const postDatabase: Record<string, ProcessedBlog> = {};
  for (const [path, slug] of walk(dataPath)) {
    const fileContent = fs.readFileSync(path).toString();

    const parsed = await parseMDX(fileContent, components);
    const validated = validateParsedMarkdown(path, slug, parsed, defs);

    if(!validated.ok) {
      console.error(`[!] Failed parse: ${path}\n---[start of '${slug}']`);
      console.error(validated);
      console.error("---[end of '${slug}']\n");
      failed = true;
      continue;
    }

    console.log(`  ✓ Parsed ${slug}: ${path}`);
    postDatabase[slug] = validated.blog;
    timestamps.push([validated.blog.frontmatter.date.getTime(), slug]);
  }

  if(failed) {
    throw new Error("Parse has failed. See the log for details.");
  }

  console.log(`✓ Parsed all ${Object.keys(postDatabase).length} content(s).`);
  return {
    articles: postDatabase,
    timestamps,
  };
}