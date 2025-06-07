// src/themes/themes.ts
import { createThemeBuilder } from "@tamagui/theme-builder";

const themesBuilder = createThemeBuilder()
  .addPalettes({
    light: ["#ffffff", "#f0f0f0", "#d0d0d0", "#a0a0a0", "#202020"],
    dark: ["#202020", "#303030", "#505050", "#707070", "#ffffff"],
  })
  .addTemplates({
    base: {
      background: 0,
      color: -0,
    },
    soft: {
      background: 1,
      color: -1,
    },
  })
  .addThemes({
    light: {
      template: "base",
      palette: "light",
    },
    dark: {
      template: "base",
      palette: "dark",
    },
  })
  .addChildThemes({
    soft: {
      template: "soft",
    },
  });

export const themes = themesBuilder.build();
