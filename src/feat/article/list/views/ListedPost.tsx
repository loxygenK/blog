import Link from "next/link";
import { FC } from "react";
import { postDetailPagePath } from "~/app/(article)/[slug]/path";
import { Post } from "~/blog/types";

import classNames from "classnames";
import { PostTypeTag } from "../../PostTypeTag";
import styles from "./ListedPost.module.css";

type Props = {
  post: Post;
};

export const ListedPost: FC<Props> = ({ post: { slug, frontmatter } }) => {
  return (
    <Link
      href={postDetailPagePath(slug)}
      id={slug}
      title={frontmatter.title}
      aria-labelledby={`${slug}-title`}
      aria-describedby={`${slug}-description`}
      className={styles.root}
    >
      <article className={styles.article}>
        <hgroup className={styles.title}>
          <p className={styles.mainTitle} id={`${slug}-title`}>
            {frontmatter.title}
          </p>
          <aside className={styles.subTitle}>{frontmatter.subTitle}</aside>
        </hgroup>
        <footer className={classNames(styles.footer, styles[frontmatter.type])}>
          <ul className={styles.tags}>
            <li className={classNames(styles.read, styles[frontmatter.type])}>
              ↗️ Read
            </li>
            <PostTypeTag type={frontmatter.type} />
          </ul>
        </footer>
      </article>
    </Link>
  );
};
