import fs from "fs";
import path from "path";

export function* walk(
  dirPath: string,
): Generator<[fullPath: string, slug: string], undefined> {
  const contents = fs.readdirSync(dirPath);

  for (const content of contents) {
    const fullPath = path.join(dirPath, content);
    const stat = fs.statSync(fullPath);

    if (stat.isFile()) {
      yield [fullPath, path.basename(content, path.extname(content))];
    } else if (stat.isDirectory()) {
      yield* walk(fullPath);
    } else {
      console.info(
        `Ignored because this wasn't neither of file nor directory: ${fullPath}`,
      );
    }
  }
}
