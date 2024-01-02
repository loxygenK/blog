function fallbacks(...args: Array<false | string | undefined>) {
  const found = args.find((arg) => arg !== undefined && arg !== false);

  if (found) {
    return found;
  }

  throw new Error("No valid candidate was found.");
}

export const baseUrl = fallbacks(
  // VERCEL_URL does not include scheme
  process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
  process.env.NEXT_PUBLIC_VERCEL_URL &&
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  process.env.BASE_URL,
);
