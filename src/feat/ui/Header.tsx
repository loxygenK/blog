import Link from "next/link";
import { FC, Fragment } from "react";
import styles from "./Header.module.css";

type Props = {
  topics: Array<{ text: string; link: string; emphasized: boolean }>;
};

export const Header: FC<Props> = ({ topics: captions }) => {
  return (
    <header className={styles.header}>
      <ol aria-label="ぱんくずリスト" className={styles.listWrap}>
        <li>Flisan's Blog</li>
        {captions.map(({ text, link, emphasized }, i) => {
          return (
            <Fragment key={link}>
              <span aria-hidden>/</span>
              <Link href={link} className={styles.eachLink}>
                {emphasized ? (
                  <li>
                    <em className={styles.emphasized}>{text}</em>
                  </li>
                ) : (
                  <li>{text}</li>
                )}
              </Link>
            </Fragment>
          );
        })}
      </ol>
    </header>
  );
};
