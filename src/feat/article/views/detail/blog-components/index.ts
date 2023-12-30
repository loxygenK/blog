import { PropertiesDefinition } from "blog-processor/types";
import { Section } from "./Section";
import { FC } from "react";
import { UnfilledFC, requireFill } from "./withDef";

export type DefsUnfilled = UnfilledFC<any>;
export type DefsUnfilledComponents = Record<string, DefsUnfilled | FC<any>>;
export type DefsFilledComponents = Record<string, FC<any>>;

export const blogComponents: DefsUnfilledComponents = {
  Section,
};

export function blogComponentsFilled(defs: PropertiesDefinition): DefsFilledComponents {
  return Object.fromEntries(
    Object.entries(blogComponents).map(([k, v]) =>
      requireFill in v ? [k, v(defs)] : [k, v]
    )
  );
}

