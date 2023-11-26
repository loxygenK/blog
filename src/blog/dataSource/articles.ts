import path from "path";
import fs from "fs";
import { walk } from "./fsUtil";
import { parseMDX } from "../resources/markdown";

const BLOG_ARTICLE_PATH = path.join(process.cwd(), process.env.BLOG_ARTICLE_PATH ?? "");

export type PostFSData = {
  mtime: number,
  data: PostData,
}

export type PostData = {
  slug: string,
  content: string;
  title: string,
}

let postDatabase: Record<string, PostFSData> | undefined = undefined;

async function readAllPostData() {
  if(postDatabase === undefined) {
    postDatabase = {};
  }

  console.log("*** Reading all post data. ***");
  console.log(`  Using path: ${BLOG_ARTICLE_PATH}`)

  const dataPath = path.join(BLOG_ARTICLE_PATH, "articles");
  if(!fs.existsSync(dataPath)) {
    throw new Error(`The path did not found: ${dataPath}}`);
  }

  for (const [path, slug] of walk(dataPath)) {
    const fileStat = fs.statSync(path);
    const fileContent = fs.readFileSync(path).toString();

    if(process.env.NODE_ENV !== "production") {
      if(slug in postDatabase && fileStat.mtimeMs <= postDatabase[slug].mtime) {
        console.log(`  ==> ${slug} was not parsed because apparently the file is not changed`);
        continue;
      }
    }

    const parsed = (await parseMDX(fileContent));
    postDatabase[slug] = {
      mtime: fileStat.mtimeMs,
      data: {
        slug,
        content: parsed.jsxSource,
        title: parsed.frontmatter.title,
      }
    };
  }

  console.log(`✓ Parsed all ${Object.keys(postDatabase).length} content(s).`);
  return postDatabase;
}

async function ensureDb(wantedSlug?: string): Promise<Record<string, PostFSData>> {
  return await readAllPostData();
}

export async function getPostsList(): Promise<Array<string>> {
  const db = await ensureDb();

  return Object.keys(db);
}

export async function retrievePostData(key: string): Promise<PostData | undefined> {
  const db = await ensureDb(key);

  return db[key]?.data;
}
