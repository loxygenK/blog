import { FC, ReactNode } from "react";
import styles from "./BodyLayout.module.css";

import classNames from "classnames";

type Props = {
  header: ReactNode;
  children: ReactNode;
  className: string;
};

export const BodyLayout: FC<Props> = ({ header, children, className }) => {
  return (
    <body className={styles.body}>
      {header}
      <main className={classNames(styles.main, className)}>{children}</main>
    </body>
  );
};
