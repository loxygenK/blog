import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        // Ref. https://netfuture.ch/2023/07/blocking-ai-crawlers-robots-txt-chatgpt/
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "FacebookBot",
          "OmgiliBot",
          "anthropic-ai",
          "cohere-ai",
        ],
        disallow: "/",
      },
    ],
  };
}
