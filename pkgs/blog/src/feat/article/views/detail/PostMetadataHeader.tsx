import { FC } from "react";
import { Post } from "../../type";

import classNames from "classnames";
import Image from "next/image";
import { typeColor } from "~/style/type-color";
import { PostTagRow } from "../PostTagRow";
import styles from "./PostMetadataHeader.module.css";

type Props = {
  className: string;
  post: Post;
};

export const PostMetadataHeader: FC<Props> = ({ className, post }) => {
  return (
    <header
      className={classNames(
        styles.root,
        typeColor(post.frontmatter.type),
        className,
      )}
    >
      <Image
        src="/post-title-bg.svg"
        alt=""
        aria-hidden
        width={299}
        height={143}
        className={styles.bg}
      />
      <section className={styles.titleSection}>
        <hgroup className={styles.title}>
          <h1 className={styles.mainTitle}>{post.frontmatter.title}</h1>
          <p className={styles.subTitle}>{post.frontmatter.subTitle}</p>
        </hgroup>
        <PostTagRow post={post} />
      </section>
    </header>
  );
};
