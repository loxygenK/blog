import { Post } from "~/feat/article/type";

export const postAPIUrl = (slug: string) => `/api/post/${slug}`;
export type PostAPIResponse = Pick<Post, "frontmatter">;
