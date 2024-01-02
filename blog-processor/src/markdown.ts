import remarkGfm from "remark-gfm";
import remarkGemoji from "remark-gemoji";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import rehypeKaTeX from "rehype-katex";
import rehypeToc from "@jsdevtools/rehype-toc";
import { compileMDX } from "next-mdx-remote/rsc";
import { FC, ReactNode } from "react";
import { fromMarkdown } from "mdast-util-from-markdown";
import { visit } from "unist-util-visit";
import { toString as treeToString } from "mdast-util-to-string";
import { Heading } from "./types";

export type Parsed = {
  element: ReactNode,
  frontmatter: Record<string, unknown>,
  headings: Array<Heading>,
}

export async function parseMDX(content: string, components: Record<string, FC<any>>): Promise<Parsed> {
  // Must be executed in the server

  const articleContent = content.split("---")[2];
  if(articleContent === undefined) {
    throw new Error("This article might not contain the headline.");
  }

  const headings = generateHeadingTree(articleContent);

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
    headings,
  }
}

function generateHeadingTree(content: string): Array<Heading> {
  let lastHeadingObject: Heading | undefined = undefined;
  const headings: Array<Heading> = [];

  visit(fromMarkdown(content), "heading", (heading) => {
    const headingObject: Heading = {
      depth: heading.depth,
      content: treeToString(heading.children),
      children: [],
      parent: undefined,
    };

    // This is the first time we see the heading
    if(lastHeadingObject === undefined) {
      headings.push(headingObject);
      lastHeadingObject = headingObject;
      return;
    }

    // The last heading was bigger than the current heading,
    // so adding the current heading to the children list of the last heading
    if(lastHeadingObject.depth < heading.depth) {
      headingObject.parent = lastHeadingObject;
      lastHeadingObject.children.push(headingObject);

      lastHeadingObject = headingObject;
      return;
    }

    // The current heading was bigger in this place, so we are finding new parent
    let counter = 0;
    let newParent: Heading | undefined = lastHeadingObject.parent;
    while(newParent !== undefined) {
      if(counter++ > 1000) {
        throw new Error("Infinite loop!");
      }

      if(newParent.depth < headingObject.depth) {
        break;
      }

      newParent = newParent.parent;
    }

    headingObject.parent = newParent;
    (newParent?.children ?? headings).push(headingObject);

    lastHeadingObject = headingObject;
  });

  return headings;
}
