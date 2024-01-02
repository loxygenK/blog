import { retrievePost } from "~/feat/article/usecase/articles";
import { PostAPIResponse } from "./path";

export async function GET(
  res: Request,
  { params: { slug } }: { params: { slug: string } },
) {
  // if(res.referrer !== "http://localhost:3000") {
  //   return Response.json({ message: `not authorized (was ${res.referrer})` }, { status: 403 });
  // }

  const content = await retrievePost(slug);
  if (content === undefined) {
    return Response.json({ message: "not found" }, { status: 404 });
  }

  return Response.json({
    frontmatter: content.frontmatter,
  } satisfies PostAPIResponse);
}
