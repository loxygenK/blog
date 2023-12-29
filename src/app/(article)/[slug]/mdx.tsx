"use client";

import { MDXRemote } from "next-mdx-remote";
import { FC } from "react";
import { Post } from "~/feat/article/type";

export type MDXContentProps = {
  post: Post;
};
export const MDXContent: FC<MDXContentProps> = ({ post }) => {
  return (
    <MDXRemote compiledSource={post.mdxContent} scope={{}} frontmatter={{}} />
  );
};
