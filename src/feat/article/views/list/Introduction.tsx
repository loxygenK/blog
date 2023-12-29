import { FC } from "react";

import Image from "next/image";
import styles from "./Introduction.module.css";

export const Introduction: FC = () => {
  return (
    <section className={styles.root}>
      <hgroup>
        <h1 aria-label="Flisan's Blog">
          <figure className={styles.imageWrapper}>
            <Image src="/logo.svg" alt="Flisan's Blog" aria-hidden fill />
          </figure>
          <span className={styles.headingText}>Flisan's Blog</span>
        </h1>
        <p className={styles.description}>
          私が学んだことや感じたこと、思ったことで、インターネットの人々に見せたいものが入っています。
        </p>
      </hgroup>
      <ul className={styles.pinnedPostSection}>
        <h2 className={styles.pinnedPostHeading}>Pinned Blog Article</h2>
        <li>Stab</li>
      </ul>
    </section>
  );
};
