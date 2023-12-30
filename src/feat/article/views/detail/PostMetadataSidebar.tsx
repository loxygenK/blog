import classNames from "classnames";
import { FC } from "react";
import { Post } from "../../type";
import { PostTypeTag } from "../PostTypeTag";

import { typeColor } from "~/style/type-color";
import styles from "./PostMetadataSidebar.module.css";

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
    </aside>
  );
};
