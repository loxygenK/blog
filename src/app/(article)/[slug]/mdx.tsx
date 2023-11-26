"use client";

import { MDXRemote } from "next-mdx-remote";
import { FC } from "react";
import { Post } from "~/blog/types";

export type MDXContentProps = {
  post: Post;
};
export const MDXContent: FC<MDXContentProps> = ({ post }) => {
  return (
    <MDXRemote compiledSource={post.mdxContent} scope={{}} frontmatter={{}} />
  );
};

