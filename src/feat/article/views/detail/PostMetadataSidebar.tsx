import classNames from "classnames";
import { FC } from "react";
import { Post } from "../../type";
import { PostTypeTag } from "../PostTypeTag";

import { typeColor } from "~/style/type-color";
import styles from "./PostMetadataSidebar.module.css";
import { PostToc } from "./PostToc";

type Props = {
  className: string;
  post: Post;
};

export const PostMetadataSidebar: FC<Props> = ({ className, post }) => {
  return (
    <aside
      className={classNames(
        styles.root,
        typeColor(post.frontmatter.type),
        className,
      )}
    >
      <h1 className={styles.title}>{post.frontmatter.title}</h1>
      <PostTypeTag type={post.frontmatter.type} outlined />
      {post.headings.length > 0 && (
        <>
          <hr className={styles.hr} />
          <PostToc headings={post.headings} maximumDepth={2} />
        </>
      )}
    </aside>
  );
};
