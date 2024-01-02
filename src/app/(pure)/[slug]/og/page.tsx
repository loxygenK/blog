import { PostAPIResponse, postAPIUrl } from "~/app/api/post/[slug]/path";
import { getPosts, retrievePost } from "~/feat/article/usecase/articles";
import { OGImage } from "~/feat/article/views/og/image";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Post({ params: { slug } }: Props) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const url = `http://localhost:3000/${postAPIUrl(slug)}`;
  console.info({ url });

  const post: PostAPIResponse = await fetch(url, { headers }).then((res) =>
    res.json(),
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#77ff77",
      }}
    >
      <div style={{ border: "4px solid red" }}>
        <OGImage post={post} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts(10);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
