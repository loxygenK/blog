import type { FC, ReactNode } from "react";
import styles from "./BodyLayout.module.css";

import classNames from "classnames";

type Props = {
  header: ReactNode;
  children: ReactNode;
  className: string;
  noHorizontalPadding?: boolean;
};

export const BodyLayout: FC<Props> = ({
  header,
  children,
  className,
  noHorizontalPadding = false,
}) => {
  return (
    <body className={styles.body}>
      {header}
      <main
        className={classNames(
          styles.main,
          noHorizontalPadding && styles.noHorizontalPadding,
          className,
        )}
      >
        {children}
      </main>
    </body>
  );
};
