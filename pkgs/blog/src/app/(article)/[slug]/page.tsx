import { Metadata } from "next";
import { baseUrl } from "~/config";
import { getPosts, retrievePost } from "~/feat/article/usecase/articles";
import { PostDetailPage } from "~/feat/article/views/detail/page";

type Props = {
  params: {
    slug: string;
  };
};

// retrievePost might be discovered as external data and marks OG gen as SSR-needed.
// However the article data doesn't change after building so setting this.
// I think I messed up with the architecture around here, I have to think about this.
// export const dynamic = "---";
// export const revalidate = "---";

export default async function Post({ params: { slug } }: Props) {
  const post = await retrievePost(slug);

  return <PostDetailPage post={post} />;
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const post = await retrievePost(slug);

  return {
    title: `${post.frontmatter.title} | Flisan's Blog`,
    description: post.frontmatter.subTitle,
    openGraph: {
      title: `${post.frontmatter.title} | Flisan's Blog`,
      description: post.frontmatter.subTitle,
      images: `/${slug}/og.png`,
      releaseDate: post.frontmatter.date.toISOString(),
      modifiedTime: post.frontmatter.date.toISOString(),
    },
    metadataBase: new URL(baseUrl),
  };
}

export async function generateStaticParams() {
  const posts = await getPosts(10);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
