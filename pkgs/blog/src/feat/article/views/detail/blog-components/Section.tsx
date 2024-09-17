import { propertiesDefinition } from "blog-processor/types";
import { z, type ZodTypeAny } from "zod";
import { reactNode, runtimeChecked } from "./types";
import { withDefinition } from "./withDef";

import { CSSProperties, useId } from "react";
import styles from "./Section.module.css";

const props = z.object({
  children: reactNode,
  type: z.string(),
  propsDef: propertiesDefinition as ZodTypeAny,
});

export const Section = withDefinition(
  runtimeChecked("Section", props, ({ children, type, propsDef }) => {
    const id = useId();

    if (!Object.keys(propsDef.caveats).includes(type)) {
      throw new Error(`The caveat "${type}" does not exist.`);
    }

    const caveat = propsDef.caveats[type];
    if (caveat.inline === undefined) {
      throw new Error(
        `The caveat "${type}" does exist, but no inline definition found.`,
      );
    }

    return (
      <section className={styles.root} aria-labelledby={`section-caveat_${id}`}>
        <h4
          className={styles.sectionTitle}
          id={`section-caveat_${id}`}
          role="none"
        >
          {caveat.inline.description}
        </h4>
        <figure
          aria-hidden
          className={styles.background}
          style={{
            ...generateBackgroundDataUri(caveat.inline.background),
          }}
        />
        {children}
        <aside className={styles.generalCaution}>
          以上の内容は客観的な正確性が担保されていない可能性があります。
        </aside>
      </section>
    );
  }),
);

function generateBackgroundDataUri(text: string): CSSProperties {
  const FONT_SIZE = 16;

  const width = (text.length * FONT_SIZE) / 1.5 + 20;
  const height = FONT_SIZE * 1.5 + 10;

  const svg =
    (
      // biome-ignore format: Formatting this piece of code will invalidate the biome-ignore comment below
      // biome-ignore lint/style/useTemplate: The resulting string is very long
      `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'>` +
      `<text dy="100%" style="fill: red; font-family: Inter, Roboto, Noto Sans JP, sans-serif;">` +
      text +
      "</text>" +
      "</svg>"
    ).replaceAll('"', "'");

  return {
    backgroundSize: `${width}px ${height}px`,
    backgroundImage: `url("data:image/svg+xml;utf8,${svg}")`,
  };
}
