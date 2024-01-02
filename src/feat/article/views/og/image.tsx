import { CSSProperties, FC } from "react";
import { typeColorHex } from "~/style/type-color";
import { Post } from "../../type";

import { ImageResponseOptions } from "next/server";
import { fonts } from "~/style/font";

import path from "path";
import fs, { FileHandle } from "fs/promises";

type Props = {
  background: string;
  post: Pick<Post, "frontmatter">;
};

export const OGImage: FC<Props> = ({ background, post }) => {
  return (
    <figure
      style={{
        ...styles.root,
        color: typeColorHex[post.frontmatter.type],
        background: `url(${background})`,
        backgroundSize: "1200px 630px",
      }}
      aria-hidden
    >
      <p style={styles.title}>{post.frontmatter.title}</p>
      <p style={styles.subTitle}>{post.frontmatter.subTitle}</p>
    </figure>
  );
};

export async function generateBackgroundImageUrl(): Promise<string> {
  const file = await fs.readFile(
    path.join(process.cwd(), "build-asset", "ogbg.png"),
  );
  const bgData = `data:image/png;base64,${file.toString("base64")}`;

  return bgData;
}

type FontConfig = Exclude<ImageResponseOptions["fonts"], undefined>[number];

export async function generateFontConfiguration(): Promise<FontConfig[]> {
  return await Promise.all([
    fontConfig("Inter", 400),
    fontConfig("Inter", 700),
    fontConfig("NotoSansJP", 400),
    fontConfig("NotoSansJP", 700),
  ]);
}

async function fontConfig<const F extends keyof typeof fonts>(
  font: F,
  weight: keyof (typeof fonts)[F],
): Promise<FontConfig> {
  const url = path.join(
    process.cwd(),
    "build-asset",
    fonts[font][weight] as string,
  );
  const fontData = await fs.readFile(url);

  type DefinedWeight = keyof (typeof fonts)[keyof typeof fonts];
  return {
    name: font,
    weight: weight as DefinedWeight,
    data: fontData,
  };
}

// Apparently CSS cannot be used in OG image generation.
const styles = {
  root: {
    width: "1200px",
    height: "630px",
    padding: "100px 100px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  title: {
    margin: 0,
    fontFamily: "Inter, NotoSansJP",
    lineHeight: "100%",
    letterSpacing: "-3px",
    fontSize: "64px",
    fontWeight: 700,
  },
  subTitle: {
    margin: 0,
    fontFamily: "Inter",
    fontSize: "40px",
    lineHeight: "100%",
    letterSpacing: "-1px",
    fontWeight: 400,
  },
} satisfies Record<string, CSSProperties>;
