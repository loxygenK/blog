import { CSSProperties, FC } from "react";
import { typeColorHex } from "~/style/type-color";
import { Post } from "../../type";

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
