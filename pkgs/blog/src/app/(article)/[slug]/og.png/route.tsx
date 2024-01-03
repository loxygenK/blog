import { ImageResponse } from "next/og";

import { getPosts, retrievePost } from "~/feat/article/usecase/articles";
import { OGImage } from "~/feat/article/views/og/image";
import {
  generateBackgroundImageUrl,
  generateFontConfiguration,
} from "~/feat/article/views/og/staticAsset";

type Props = {
  params: {
    slug: string;
  };
};

export async function GET(req: Request, { params: { slug } }: Props) {
  const post = await retrievePost(slug);

  const bgData = await generateBackgroundImageUrl();

  return new ImageResponse(<OGImage background={bgData} post={post} />, {
    fonts: await generateFontConfiguration(),
  });
}

export async function generateStaticParams() {
  const posts = await getPosts(10);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
