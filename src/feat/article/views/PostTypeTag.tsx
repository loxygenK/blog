import classNames from "classnames";
import Image from "next/image";
import { FC } from "react";
import twemoji from "twemoji";
import styles from "./PostTypeTag.module.css";
import { PostType } from "../type";

type Props = {
  type: PostType;
};

const emoji: Record<PostType, { icon: string; caption: string }> = {
  coding: { icon: "📝", caption: "Coding" },
  programming: { icon: "🧑‍💻", caption: "Programming / Philosophy" },
  til: { icon: "🔖", caption: "Today I Learned" },
  mylife: { icon: "✨", caption: "My Life" },
  mycareer: { icon: "🧑‍💼", caption: "My Career" },
  release: { icon: "🚀", caption: "Release" },
  other: { icon: "🗃️", caption: "Other" },
};

export const PostTypeTag: FC<Props> = ({ type }) => {
  return (
    <li className={classNames(styles.root, styles[type])}>
      <Image
        alt={`${emoji[type].icon}- Icon for ${emoji[type].caption}`}
        src={emojiToTwemojiURL(type)}
        aria-hidden
        width={16}
        height={16}
      />
      <span className={styles.caption}>{emoji[type].caption}</span>
    </li>
  );
};

function emojiToTwemojiURL(type: PostType) {
  const codePoint = twemoji.convert.toCodePoint(emoji[type].icon);
  return `https://twemoji.maxcdn.com/v/latest/72x72/${codePoint}.png`;
}
