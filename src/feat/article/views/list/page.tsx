import { FC } from "react";
import { Post } from "~/feat/article/type";
import { ListedPost } from "./ListedPost";

import { BodyLayout } from "~/feat/ui/BodyLayout";
import { Header } from "~/feat/ui/Header";
import { Introduction } from "./Introduction";
import styles from "./page.module.css";

type Props = {
  postMetadata: Array<Post>;
};

export const ArticleListingPage: FC<Props> = ({ postMetadata }) => {
  return (
    <BodyLayout className={styles.root} header={<Header topics={[]} />}>
      <Introduction />
      <nav className={styles.postList} aria-label="ブログ記事の一覧">
        {postMetadata.map((data) => (
          <ListedPost post={data} key={data.slug} />
        ))}
      </nav>
    </BodyLayout>
  );
};
