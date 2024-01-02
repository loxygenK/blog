import { Heading } from "blog-processor/types";
import classNames from "classnames";
import { FC } from "react";

import Link from "next/link";
import styles from "./PostToc.module.css";

type Props = {
  className?: string;
  headings: Array<Heading>;
  maximumDepth: number;
  detailed?: boolean;
};

export const PostToc: FC<Props> = ({
  className,
  headings,
  maximumDepth,
  detailed = false,
}) => {
  return (
    <nav
      className={classNames(className, styles.nav, detailed && styles.detailed)}
    >
      {detailed && <p className={styles.tocLabel}>Table of contents</p>}
      <PostTocList headings={headings} maximumDepth={maximumDepth} />
    </nav>
  );
};

const PostTocList: FC<Omit<Props, "navClassName">> = ({
  headings,
  maximumDepth,
}) => {
  const filteredHeading = headings.filter(({ depth }) => depth <= maximumDepth);

  return (
    <ol className={styles.list}>
      {filteredHeading.map((heading) => {
        return (
          <li
            className={classNames(
              heading.depth === 1 && styles.topLevel,
              styles.elementWrapper,
            )}
          >
            <Link
              href={`#${heading.linkId}`}
              className={classNames(heading.depth === 1, styles.element)}
            >
              {heading.content}
            </Link>
            {heading.children.length > 0 && (
              <PostTocList
                headings={heading.children}
                maximumDepth={maximumDepth}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
};
