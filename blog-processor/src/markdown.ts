import remarkGfm from "remark-gfm";
import remarkGemoji from "remark-gemoji";
import remarkMath from "remark-math";
import rehypeKaTeX from "rehype-katex";
import { serialize } from "next-mdx-remote/serialize";

export type Parsed = {
  jsxSource: string,
  frontmatter: Record<string, unknown>,
}

export async function parseMDX(content: string): Promise<Parsed> {
  // Must be executed in the server

  const serialized = await serialize(
    content,
    {
      mdxOptions: {
        remarkPlugins: [remarkMath, remarkGfm, remarkGemoji],
        // @ts-expect-error -- Version issue
        rehypePlugins: [rehypeKaTeX],
      },
      parseFrontmatter: true,
    },
  );

  console.log(serialized)

  return {
    jsxSource: serialized.compiledSource,
    frontmatter: serialized.frontmatter,
  }
}
