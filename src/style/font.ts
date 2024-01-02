const availableFonts = {
  Inter: [400, 700],
  NotoSansJP: [400, 700],
} as const;

type Font<T> = { [key in keyof typeof availableFonts]: Record<typeof availableFonts[key][number], T> }

export const fonts = {
  Inter: {
    400: "/fonts/Inter/static/Inter-Regular.ttf",
    700: "/fonts/Inter/static/Inter-Bold.ttf",
  },
  NotoSansJP: {
    400: "/fonts/Noto_Sans_JP/static/NotoSansJP-Medium.ttf",
    700: "/fonts/Noto_Sans_JP/static/NotoSansJP-Bold.ttf",
  },
} as const satisfies Font<string>;
