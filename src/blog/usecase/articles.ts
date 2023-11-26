export {};

// import { PostKey, getPostsList, retrievePostData } from "~/blog/resources/articles";
// import { Post, postMetadataSchema } from "../types";
// import { serialize } from "next-mdx-remote/serialize";
// 
// export async function retrievePost(key: PostSlug): Promise<Post> {
//   const postData = await retrievePostData(key);
//   const { frontmatter } = await serialize(postData.rawContent, { parseFrontmatter: true });
// 
//   const parsedFrontmatter = postMetadataSchema.safeParse(frontmatter);
//   if(!parsedFrontmatter.success) {
//     throw new Error("Frontmatter is not in the right schema", parsedFrontmatter.error);
//   }
// 
//   return {
//     name: parsedFrontmatter.data.name,
//     tags: parsedFrontmatter.data.tags,
//     date: parsedFrontmatter.data.date,
//     rawContent: postData.rawContent,
//   }
// }

