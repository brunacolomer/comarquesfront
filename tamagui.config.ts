import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";
import { createFont } from "tamagui";

const headingFont = createFont({
  family: "InterBold",
  size: {
    1: 16,
    2: 20,
    3: 24,
    4: 28,
    5: 32,
  },
  lineHeight: {
    1: 22,
    2: 26,
    3: 32,
    4: 36,
    5: 40,
  },
  weight: {
    4: "700",
  },
  letterSpacing: {
    4: 0,
  },
});

const bodyFont = createFont({
  family: "Inter",
  size: {
    1: 14,
    2: 16,
    3: 18,
  },
  lineHeight: {
    1: 20,
    2: 24,
    3: 28,
  },
  weight: {
    4: "400",
  },
  letterSpacing: {
    4: 0,
  },
});

export const config = createTamagui({
  ...defaultConfig,

  themeClassNameOnRoot: true,
  fonts: {
    ...defaultConfig.fonts,
    body: {
      ...defaultConfig.fonts.body,
      family: "Inter",
      size: {
        1: 10,
        2: 12,
        3: 14,
        4: 16,
        5: 20,
        6: 24,
      },
      lineHeight: {
        1: 20,
        2: 24,
        3: 28,
      },
      weight: {
        4: "300",
      },
      letterSpacing: {
        4: 0,
      },
    },
    light: {
      ...defaultConfig.fonts.body,
      family: "Inter",
      size: {
        1: 10,
        2: 16,
        3: 18,
        4: 32,
      },
      lineHeight: {
        1: 20,
        2: 24,
        3: 28,
      },
      weight: {
        4: "800",
      },
      letterSpacing: {
        4: 0,
      },
    },
  },
  settings: {
    ...defaultConfig.settings,
    defaultFont: "body",
    defaultFontSize: 1,
  },

  tokens: {
    ...defaultConfig.tokens,

    color: {
      primary: "#c67d45",
      primaryDark: "#955e34",
      primaryDarker: "#452c18",
      neutralLight: "#fdfcfc",
      neutral: "#fbfaf9",
      neutralDark: "#f9f7f5",
      secondary: "#fbbf24",
      accent: "#8b5cf6",
    },

    space: {
      0: 0,
      1: 4,
      2: 8,
      3: 12,
      4: 16,
      5: 20,
      6: 24,
      7: 32,
      8: 40,
      9: 48,
      true: 16,
    },
    size: {
      0: 0,
      1: 16,
      2: 24,
      3: 32,
      4: 40,
      5: 48,
      6: 64,
      true: 40,
    },
    radius: {
      0: 0,
      1: 4,
      2: 8,
      3: 12,
      4: 16,
      true: 9,
    },
    zIndex: {
      0: 0,
      1: 10,
      2: 100,
      3: 1000,
      true: 0,
    },
  },

  themes: {
    ...defaultConfig.themes,
    light: {
      ...defaultConfig.themes.light,
      primary: "#c67d45", // taronja marronós
      primaryDark: "#955e34",
      primaryDarker: "#452c18",
      neutralLight: "#fdfcfc",
      neutral: "#fbfaf9",
      neutralDark: "#f9f7f5",

      secondary: "#fbbf24", // groc suau
      accent: "#8b5cf6", // lila modern
      background: "#ffffff",
      backgroundHover: "#f9fafb",
      backgroundPress: "#f3f4f6",
      color: "#111111",
      colorHover: "#1f2937",
      borderColor: "#e5e7eb",
    },

    dark: {
      ...defaultConfig.themes.dark,
      primary: "#ec4899",
      secondary: "#facc15", // groc daurat
      accent: "#c084fc", // lila clar
      background: "white", // gris molt fosc
      backgroundHover: "#1f2937",
      backgroundPress: "#374151",
      color: "#ffffff",
      colorHover: "#e5e7eb",
      borderColor: "#4b5563",
    },
  },
});
export default config;

export type Conf = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
