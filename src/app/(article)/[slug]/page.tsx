import { retrievePost } from "~/blog/usecase/articles";
import { MDXContent } from "./mdx";

type Props = {
  params: {
    slug: string
  }
};

export default async function Post({ params: { slug }}: Props) {
  const blogContent = await retrievePost(slug);

  return (
    <main>
      <code>{slug}</code>
      <hr />
      {
        blogContent === undefined
          ? <span>No such post found!</span>
          : <MDXContent post={blogContent} />
      }
    </main>
  );
}


