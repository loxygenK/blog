import { getPosts } from "~/feat/article/usecase/articles";
import { ArticleListingPage } from "~/feat/article/views/list/page";

export default async function Home() {
  const blogs = await getPosts(5);

  return <ArticleListingPage postMetadata={blogs} />;
}
