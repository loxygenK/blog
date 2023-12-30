import { FC } from "react";
import { BodyLayout } from "~/feat/ui/BodyLayout";
import { Header } from "~/feat/ui/Header";
import { Post } from "../../type";
import { MDXContent } from "./MDXContent";
import { PostMetadataHeader } from "./PostMetadataHeader";

import { PostMetadataSidebar } from "./PostMetadataSidebar";
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
      <article className={styles.article}>
        <PostMetadataHeader className={styles.header} post={post} />
        <PostMetadataSidebar className={styles.sidebar} post={post} />
        <MDXContent className={styles.content} post={post} />
      </article>
    </BodyLayout>
  );
};
