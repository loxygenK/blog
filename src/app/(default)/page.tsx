import { getPosts } from '~/blog/usecase/articles'
import styles from './page.module.css'
import Link from 'next/link';

export default async function Home() {
  const blogs = await getPosts(5);

  return (
    <main className={styles.main}>
      {
        blogs.map((blog) => (
          <li key={blog.slug}>
            <em>{blog.frontmatter.name}</em> - <code>{blog.slug}</code> [{blog.frontmatter.date.toISOString()}]<br />
            <Link href={`/${blog.slug}`}>→ Go to the article page</Link>
          </li>
        ))
      }
    </main>
  )
}
