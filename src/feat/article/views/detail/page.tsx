import { FC } from "react";
import { BodyLayout } from "~/feat/ui/BodyLayout";
import { Header } from "~/feat/ui/Header";
import { Post } from "../../type";
import { MDXContent } from "./MDXContent";
import { PostMetadata } from "./PostMetadata";

import styles from "./page.module.css";

type Props = {
  post: Post;
};

export const PostDetailPage: FC<Props> = ({ post }) => {
  return (
    <BodyLayout
      className=""
      header={
        <Header topics={[{ text: post.frontmatter.title, link: "./" }]} />
      }
    >
      <article className={styles.article}>
        <PostMetadata post={post} />
        <MDXContent post={post} />
      </article>
    </BodyLayout>
  );
};
