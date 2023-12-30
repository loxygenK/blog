import { FC, ReactNode } from "react";
import { Post } from "../type";

import classNames from "classnames";
import { typeColor } from "~/style/type-color";
import styles from "./PostTagRow.module.css";
import { PostTypeTag } from "./PostTypeTag";

type Props = {
  post: Post;
  children?: ReactNode;
};

export const PostTagRow: FC<Props> = ({ children, post }) => {
  return (
    <footer
      className={classNames(styles.footer, typeColor(post.frontmatter.type))}
    >
      <ul className={styles.tags}>
        {children}
        <PostTypeTag type={post.frontmatter.type} />
      </ul>
    </footer>
  );
};
