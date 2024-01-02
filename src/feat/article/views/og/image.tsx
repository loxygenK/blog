import { CSSProperties, FC } from "react";
import { typeColorHex } from "~/style/type-color";
import { Post } from "../../type";

import { ImageResponseOptions } from "next/server";
import { fonts } from "~/style/font";

type Props = {
  post: Pick<Post, "frontmatter">;
};

export const OGImage: FC<Props> = ({ post }) => {
  return (
    <figure
      style={{ ...styles.root, color: typeColorHex[post.frontmatter.type] }}
      aria-hidden
    >
      <p style={styles.title}>{post.frontmatter.title}</p>
      <p style={styles.subTitle}>{post.frontmatter.subTitle}</p>
    </figure>
  );
};

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
  const url = new URL(`http://localhost:3000${fonts[font][weight]}`);

  const fontData = await fetch(url).then((res) => res.arrayBuffer());

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
    backgroundImage: "url('http://localhost:3000/ogbg.png')",
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
