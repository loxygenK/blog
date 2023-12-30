import { PostType } from "~/feat/article/type";

import styles from "./type-color.module.css";

export function typeColor(type: PostType): string {
  return styles[type];
}
