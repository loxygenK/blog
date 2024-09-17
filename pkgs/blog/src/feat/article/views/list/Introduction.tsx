import type { FC } from "react";

import Image from "next/image";
import styles from "./Introduction.module.css";

export const Introduction: FC = () => {
  return (
    <section className={styles.root}>
      <hgroup className={styles.title}>
        <h1 aria-label="Flisan's Blog" className={styles.title}>
          <figure className={styles.imageWrapper}>
            <Image
              src="/logo.svg"
              alt="Flisan's Blog"
              aria-hidden
              fill
              priority
            />
          </figure>
          <span className={styles.headingText}>Flisan's Blog</span>
        </h1>
        <p className={styles.description}>
          私が学んだことや感じたこと、思ったことで、インターネットの人々に見せたいものが入っています。
        </p>
      </hgroup>
    </section>
  );
};
