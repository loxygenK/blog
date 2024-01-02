import { ImageResponse } from "next/og";

import { PostAPIResponse, postAPIUrl } from "~/app/api/post/[slug]/path";
import { retrievePost } from "~/feat/article/usecase/articles";
import {
  OGImage,
  generateFontConfiguration,
} from "~/feat/article/views/og/image";
import styles from "./opengraph-image.module.css";

type Props = {
  params: {
    slug: string;
  };
};

export const runtime = "nodejs";
export const alt = "Flisan's Blog - Post";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Post({ params: { slug } }: Props) {
  const post = await retrievePost(slug);

  return new ImageResponse(<OGImage post={post} />, {
    fonts: await generateFontConfiguration(),
  });
}
