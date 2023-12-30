import remarkGfm from "remark-gfm";
import remarkGemoji from "remark-gemoji";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import rehypeKaTeX from "rehype-katex";
import { compileMDX } from "next-mdx-remote/rsc";
import { FC, ReactNode } from "react";

export type Parsed = {
  element: ReactNode,
  frontmatter: Record<string, unknown>,
}

export async function parseMDX(content: string, components: Record<string, FC<any>>): Promise<Parsed> {
  // Must be executed in the server

  const serialized = await compileMDX({
    source: content,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkMath, remarkGfm, remarkGemoji],
        // @ts-expect-error -- Version issue on VFile
        rehypePlugins: [rehypeKaTeX, rehypeHighlight],
      },
      parseFrontmatter: true,
    },
  });

  return {
    element: serialized.content,
    frontmatter: serialized.frontmatter,
  }
}
