import GitHubSlugger from "github-slugger";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toString as treeToString } from "mdast-util-to-string";
import { compileMDX } from "next-mdx-remote/rsc";
import { FC, ReactElement, ReactNode } from "react";
import rehypeHighlight from "rehype-highlight";
import rehypeKaTeX from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";
import { Heading } from "./types";

export type Parsed = {
  element: ReactElement;
  frontmatter: Record<string, unknown>;
  headings: Array<Heading>;
};

export async function parseMDX(
  content: string,
  components: Record<string, FC<unknown>>,
): Promise<Parsed> {
  // Must be executed in the server

  const [_empty, _frontmatter, ...articleContents] = content.split("---");
  const articleContent = articleContents.join("-----");

  if (articleContent === undefined) {
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
        rehypePlugins: [rehypeKaTeX, rehypeHighlight, rehypeSlug],
      },
      parseFrontmatter: true,
    },
  });

  return {
    element: serialized.content,
    frontmatter: serialized.frontmatter,
    headings,
  };
}

function generateHeadingTree(content: string): Array<Heading> {
  let lastHeadingObject: Heading | undefined = undefined;
  const headings: Array<Heading> = [];

  const slugger = new GitHubSlugger();

  visit(fromMarkdown(content), "heading", (heading) => {
    const content = treeToString(heading.children);

    const headingObject: Heading = {
      depth: heading.depth,
      content,
      children: [],
      linkId: slugger.slug(content),
      parent: undefined,
    };

    // This is the first time we see the heading
    if (lastHeadingObject === undefined) {
      headings.push(headingObject);
      lastHeadingObject = headingObject;
      return;
    }

    // The last heading was bigger than the current heading,
    // so adding the current heading to the children list of the last heading
    if (lastHeadingObject.depth < heading.depth) {
      headingObject.parent = lastHeadingObject;
      lastHeadingObject.children.push(headingObject);

      lastHeadingObject = headingObject;
      return;
    }

    // The current heading was bigger in this place, so we are finding new parent
    let counter = 0;
    let newParent: Heading | undefined = lastHeadingObject.parent;
    while (newParent !== undefined) {
      if (counter++ > 1000) {
        throw new Error("Infinite loop!");
      }

      if (newParent.depth < headingObject.depth) {
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
