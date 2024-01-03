import { PostType } from "~/feat/article/type";

import styles from "./type-color.module.css";

export function typeColor(type: PostType): string {
  return styles[type];
}

export const f4nThemeColor = {
  white: "white",
  primary: "#ED2A87",
  textPrimary: "#ca0b67",
  themeGreen: "#2AED8F",
  themeSky: "#2AA7ED",
  themeBlue: "#2A60ED",
  themeLightPink: "#FF47B5",
  themePurple: "#9747FF",
  themeGray: "#888888",
} as const;

export const typeColorHex: Record<PostType, string> = {
  coding: f4nThemeColor.primary,
  programming: f4nThemeColor.themeSky,
  til: f4nThemeColor.themeBlue,
  mylife: f4nThemeColor.themeLightPink,
  mycareer: f4nThemeColor.themePurple,
  release: f4nThemeColor.themeGreen,
  other: f4nThemeColor.themeGray,
};
