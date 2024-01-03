import { FC } from "react";
import { BodyLayout } from "~/feat/ui/BodyLayout";
import { Header } from "~/feat/ui/Header";
import { Post } from "../../type";
import { MDXContent } from "./MDXContent";
import { PostMetadataHeader } from "./PostMetadataHeader";

import classNames from "classnames";
import { typeColor } from "~/style/type-color";
import { PostMetadataSidebar } from "./PostMetadataSidebar";
import { PostToc } from "./PostToc";
import styles from "./page.module.css";

type Props = {
  post: Post;
};

export const PostDetailPage: FC<Props> = ({ post }) => {
  return (
    <BodyLayout
      className={styles.root}
      header={
        <Header topics={[{ text: post.frontmatter.title, link: "./" }]} />
      }
      noHorizontalPadding
    >
      <article
        className={classNames(styles.article, typeColor(post.frontmatter.type))}
      >
        <PostMetadataHeader className={styles.header} post={post} />
        <PostMetadataSidebar className={styles.sidebar} post={post} />
        <hr className={styles.hr} />
        <PostToc
          className={styles.toc}
          headings={post.headings}
          maximumDepth={3}
          detailed
        />
        <MDXContent className={styles.content} post={post} />
      </article>
    </BodyLayout>
  );
};
