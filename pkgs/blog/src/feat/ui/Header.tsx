import Link from "next/link";
import { FC, Fragment } from "react";
import styles from "./Header.module.css";

type Props = {
  topics: Array<{ text: string; link: string }>;
};

export const Header: FC<Props> = ({ topics: captions }) => {
  const home = {
    text: "Flisan's Blog",
    link: "/",
  };

  return (
    <header className={styles.header}>
      <ol aria-label="ぱんくずリスト" className={styles.listWrap}>
        {[home, ...captions].map(({ text, link }, i) => {
          return (
            <Fragment key={link}>
              <Link href={link} className={styles.eachLink}>
                {i === captions.length ? (
                  <li>
                    <em className={styles.emphasized}>{text}</em>
                  </li>
                ) : (
                  <li>{text}</li>
                )}
              </Link>
              {i <= captions.length - 1 && <span aria-hidden>/</span>}
            </Fragment>
          );
        })}
      </ol>
    </header>
  );
};
