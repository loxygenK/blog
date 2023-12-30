import fs from "fs";
import path from "path";
import {
  ProcessedBlog,
  PropertiesDefinition,
  propertiesDefinition,
} from "./types";
import { walk } from "./fs";
import { parseMDX } from "./markdown";
import { validateParsedMarkdown } from "./validator";
import { FC } from "react";

import { Mutex } from "async-mutex";

export type BlogArticleRegistry = {
  articles: Record<string, ProcessedBlog>;
  timestamps: Array<[time: number, slug: string]>;
};

let parsedRegistry: BlogArticleRegistry | undefined = undefined;

const mutex = new Mutex();

export async function processBlogArticles(
  articlePath: string,
  defs: PropertiesDefinition,
  // biome-ignore lint/suspicious/noExplicitAny: Props type check in compilation time is impossible
components: Record<string, FC<any>>
): Promise<BlogArticleRegistry> {
  const key = Math.floor(Math.random() * 100000);

  function log(mark: string, payload: string) {
    // biome-ignore lint/suspicious/noConsoleLog: This is for the compilation log
    console.log(`${mark.padEnd(4, " ")} [${key}] ${payload}`);
  }

  if (parsedRegistry) {
    log("  ✓", " Using the cache (no mutex used)");
    return parsedRegistry;
  }

  log("|", "Waiting the mutex unlocks");

  return await mutex.runExclusive(async () => {
    log("*", "Mutex acquired!");
    if (parsedRegistry) {
      log("  ✓", " Using the cache");
      return parsedRegistry;
    }

    const dataPath = path.join(articlePath, "articles");
    if (!fs.existsSync(dataPath)) {
      throw new Error(`The path did not found: ${dataPath}}`);
    }

    let failed = false;
    const timestamps: Array<[time: number, slug: string]> = [];
    const postDatabase: Record<string, ProcessedBlog> = {};
    for (const [path, slug] of walk(dataPath)) {
      const fileContent = fs.readFileSync(path).toString();

      const parsed = await parseMDX(fileContent, components);
      const validated = validateParsedMarkdown(path, slug, parsed, defs);

      if (!validated.ok) {
        console.error(`[!] Failed parse: ${path}\n---[start of '${slug}']`);
        console.error(validated);
        console.error("---[end of '${slug}']\n");
        failed = true;
        continue;
      }

      log("  ✓", `Parsed ${slug}: ${path}`);
      postDatabase[slug] = validated.blog;
      timestamps.push([validated.blog.frontmatter.date.getTime(), slug]);
    }

    if (failed) {
      throw new Error("Parse has failed. See the log for details.");
    }

    log("  @", `Parsed all ${Object.keys(postDatabase).length} content(s).`);
    parsedRegistry = {
      articles: postDatabase,
      timestamps,
    };

    return parsedRegistry;
  });
}

export function retrievePropertyDefinition(path: string): PropertiesDefinition {
  const tags = JSON.parse(fs.readFileSync(path).toString());

  return propertiesDefinition.parse(tags);
}
