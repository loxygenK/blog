import Link from "next/link";
import type { FC } from "react";
import { postDetailPagePath } from "~/app/(article)/[slug]/path";

import classNames from "classnames";
import { typeColor } from "~/style/type-color";
import type { Post } from "../../type";
import { PostTagRow } from "../PostTagRow";
import { PostTypeTag } from "../PostTypeTag";
import styles from "./ListedPost.module.css";

type Props = {
  post: Post;
};

export const ListedPost: FC<Props> = ({ post }) => {
  return (
    <Link
      href={postDetailPagePath(post.slug)}
      id={post.slug}
      title={post.frontmatter.title}
      aria-labelledby={`${post.slug}-title`}
      aria-describedby={`${post.slug}-description`}
      className={styles.root}
    >
      <article className={styles.article}>
        <hgroup className={styles.title}>
          <p className={styles.mainTitle} id={`${post.slug}-title`}>
            {post.frontmatter.title}
          </p>
          <aside className={styles.subTitle}>{post.frontmatter.subTitle}</aside>
        </hgroup>
        <footer>
          <PostTagRow post={post}>
            <li className={styles.read}>↗️ Read</li>
          </PostTagRow>
        </footer>
      </article>
    </Link>
  );
};
