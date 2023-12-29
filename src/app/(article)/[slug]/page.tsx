import { retrievePost } from "~/feat/article/usecase/articles";
import { PostDetailPage } from "~/feat/article/views/detail/page";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Post({ params: { slug } }: Props) {
  const post = await retrievePost(slug);

  return <PostDetailPage post={post} />;
}
