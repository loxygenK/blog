import { ImageResponseOptions } from "next/server";
import { fonts } from "~/style/font";

import path from "path";
import fs from "fs/promises";

type FontConfig = Exclude<ImageResponseOptions["fonts"], undefined>[number];

let cachedFontConfig: FontConfig[] | undefined = undefined;
let cachedBgImageDataUri: string | undefined = undefined;

export async function generateBackgroundImageUrl(): Promise<string> {
  if (cachedBgImageDataUri !== undefined) {
    return cachedBgImageDataUri;
  }

  const file = await fs.readFile(
    path.join(process.cwd(), "build-asset", "ogbg.png"),
  );
  const bgData = `data:image/png;base64,${file.toString("base64")}`;

  cachedBgImageDataUri = bgData;
  return bgData;
}

export async function generateFontConfiguration(): Promise<FontConfig[]> {
  if (cachedFontConfig !== undefined) {
    return cachedFontConfig;
  }

  cachedFontConfig = await Promise.all([
    fontConfig("Inter", 400),
    fontConfig("Inter", 700),
    fontConfig("NotoSansJP", 400),
    fontConfig("NotoSansJP", 700),
  ]);

  return cachedFontConfig;
}

async function fontConfig<const F extends keyof typeof fonts>(
  font: F,
  weight: keyof (typeof fonts)[F],
): Promise<FontConfig> {
  const url = path.join(
    process.cwd(),
    "build-asset",
    fonts[font][weight] as string,
  );
  const fontData = await fs.readFile(url);

  type DefinedWeight = keyof (typeof fonts)[keyof typeof fonts];
  return {
    name: font,
    weight: weight as DefinedWeight,
    data: fontData,
  };
}
