# blog

### About disabled lint rules

This project uses all the linting rules provided by Biome, however some of the rules are being disabled with the following reason.

- **`lint/style/useNamingConvention`**<br />
  This rule requires `const`'s name convention to be `camelCase`, however React component's name must be `TitleCase`.
  I very rarely mistakes the naming convention so it is safe enough to disable this rule.

- **`lint/nursery/noDefaultExport`**<br />
  This rule prohibits using default exports, however Next.js requires default exports when exporting pages/layouts.
  I also do not prefer default exporting so it's also safe enough.
