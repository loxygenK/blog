"use client";

import { MDXRemote } from "next-mdx-remote";
import { FC } from "react";
import { PostData } from "~/blog/dataSource/articles";

export type MDXContentProps = {
  post: PostData;
};export const MDXContent: FC<MDXContentProps> = ({ post }) => {

  return (
    <MDXRemote compiledSource={post.content} scope={{}} frontmatter={{}} />
  );
};

