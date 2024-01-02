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

export const runtime = "edge";
export const alt = "Flisan's Blog - Post";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Post({ params: { slug } }: Props) {
  const post: PostAPIResponse = await fetch(
    `http://localhost:3000/${postAPIUrl(slug)}`,
  ).then((res) => res.json());

  return new ImageResponse(<OGImage post={post} />, {
    fonts: await generateFontConfiguration(),
  });
}
