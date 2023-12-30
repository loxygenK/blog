import { PropertiesDefinition } from "blog-processor/types";
import { FC } from "react";
import { Section } from "./Section";
import { UnfilledFC, requireFill } from "./withDef";

// Safety: TypeScript's type information will be wiped in runtime (JavaScript), and the props type check
//         will not be done in the compile time (since they're used in MDX and MDX is compiled in the runtime of
//         this application), so the type information is useful. Although this the runtime type check will
//         be done using Zod.

// biome-ignore lint/suspicious/noExplicitAny: As described above
export type DefsUnfilled = UnfilledFC<any>;

// biome-ignore lint/suspicious/noExplicitAny: As described above
export type DefsUnfilledComponents = Record<string, DefsUnfilled | FC<any>>;

// biome-ignore lint/suspicious/noExplicitAny: As described above
export type DefsFilledComponents = Record<string, FC<any>>;

export const blogComponents: DefsUnfilledComponents = {
  Section,
};

export function blogComponentsFilled(
  defs: PropertiesDefinition,
): DefsFilledComponents {
  return Object.fromEntries(
    Object.entries(blogComponents).map(([k, v]) =>
      requireFill in v ? [k, v(defs)] : [k, v],
    ),
  );
}
