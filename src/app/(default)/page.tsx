import { getPosts } from "~/blog/usecase/articles";
import { ArticleListingPage } from "~/feat/article/list/views/page";

export default async function Home() {
  const blogs = await getPosts(5);

  return <ArticleListingPage postMetadata={blogs} />;
}
