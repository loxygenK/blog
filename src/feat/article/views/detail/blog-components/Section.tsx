import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Section: FC<Props> = ({ children }) => {
  return <section>{children}</section>;
};
