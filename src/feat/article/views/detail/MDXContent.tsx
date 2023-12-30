import { FC } from "react";
import { Post } from "~/feat/article/type";

import classNames from "classnames";
import { typeColor } from "~/style/type-color";
import styles from "./MDXContent.module.css";

export type MDXContentProps = {
  className: string;
  post: Post;
};
export const MDXContent: FC<MDXContentProps> = ({ className, post }) => {
  return (
    <main
      className={classNames(
        styles.post,
        typeColor(post.frontmatter.type),
        className,
      )}
    >
      {post.mdxContent}
    </main>
  );
};
