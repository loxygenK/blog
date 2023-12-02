import { Parsed } from "./markdown";
import { ProcessedBlog, TagsDefinition, frontMatter } from "./types";

export type ValidationResult = SuccessfulValidationResult | FailureValidationResult;
export type SuccessfulValidationResult = { ok: true, path: string, blog: ProcessedBlog };
export type FailureValidationResult = | { ok: false, path: string, error: any };

export function validateParsedMarkdown(path: string, slug: string, markdown: Parsed, defs: TagsDefinition): ValidationResult {
  const parsedFrontMatter = frontMatter.safeParse(markdown.frontmatter);
  if(!parsedFrontMatter.success) {
    return { ok: false, path, error: parsedFrontMatter.error }
  };

  const availableCaveats = Object.keys(defs.caveats);
  const availableTechs = Object.keys(defs.techs);

  const unknownCaveats = parsedFrontMatter.data.caveats.filter((caveat) => !availableCaveats.includes(caveat));
  const unknownTechs = parsedFrontMatter.data.techs.filter((caveat) => !availableTechs.includes(caveat));

  if(unknownCaveats.length > 0) {
    return { ok: false, path, error: new Error(`The caveat was not included in the definition: ${unknownCaveats.join(", ")}`) }
  }
  if(unknownTechs.length > 0) {
    return { ok: false, path, error: new Error(`The techs was not included in the definition: ${unknownTechs.join(", ")}`) }
  }

  return {
    ok: true,
    path,
    blog: {
      slug,
      mdxContent: markdown.jsxSource,
      frontmatter: parsedFrontMatter.data,
    }
  }
}