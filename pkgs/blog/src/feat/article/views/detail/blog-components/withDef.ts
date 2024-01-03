import { PropertiesDefinition } from "blog-processor/types";
import { FC, ReactNode } from "react";
import { ZodSchema, z } from "zod";

export const requireFill = Symbol();
export type UnfilledFC<T> = ((defs: PropertiesDefinition) => FC<T>) & {
  [key in typeof requireFill]: true;
};
export const reactNode = z.custom<ReactNode>();

export function withDefinition<T>(
  component: FC<T & { propsDef: PropertiesDefinition }>,
): UnfilledFC<T> {
  const hoc = (defs: PropertiesDefinition) => {
    return (props: T) => component({ ...props, propsDef: defs });
  };

  hoc[requireFill] = true as const;
  return hoc;
}
