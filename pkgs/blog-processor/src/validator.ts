import { Parsed } from "./markdown";
import { ProcessedBlog, PropertiesDefinition, frontMatter } from "./types";

export type ValidationResult =
  | SuccessfulValidationResult
  | FailureValidationResult;
export type SuccessfulValidationResult = {
  ok: true;
  path: string;
  blog: ProcessedBlog;
};
export type FailureValidationResult = {
  ok: false;
  path: string;
  error: unknown;
};

export function validateParsedMarkdown(
  path: string,
  slug: string,
  markdown: Parsed,
  defs: PropertiesDefinition,
): ValidationResult {
  const parsedFrontMatter = frontMatter.safeParse(markdown.frontmatter);
  if (!parsedFrontMatter.success) {
    return { ok: false, path, error: parsedFrontMatter.error };
  }

  const availableCaveats = Object.keys(defs.caveats);
  const availableTags = Object.keys(defs.tag);

  const unknownCaveats = parsedFrontMatter.data.caveats.filter(
    (caveat) => !availableCaveats.includes(caveat),
  );
  const unknownTechs = parsedFrontMatter.data.tags.filter(
    (tag) => !availableTags.includes(tag),
  );

  if (unknownCaveats.length > 0) {
    return {
      ok: false,
      path,
      error: new Error(
        `The caveat was not included in the definition: ${unknownCaveats.join(
          ", ",
        )}`,
      ),
    };
  }
  if (unknownTechs.length > 0) {
    return {
      ok: false,
      path,
      error: new Error(
        `The techs was not included in the definition: ${unknownTechs.join(
          ", ",
        )}`,
      ),
    };
  }

  return {
    ok: true,
    path,
    blog: {
      slug,
      mdxContent: markdown.element,
      frontmatter: parsedFrontMatter.data,
      headings: markdown.headings,
    },
  };
}
