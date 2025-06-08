import {
  defineConfig,
  presetAttributify,
  transformerCompileClass,
  transformerVariantGroup,
  presetWind4,
  // presetWind3,
} from "unocss";
// import presetWind4 from "@unocss/preset-wind4";
// import presetRcSelect from "./rcSelectPreset";
export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetAttributify(),
    presetWind4({
      preflights: { 
        reset: true, 
      } 
    }),
    // presetRcSelect({
    //   darkMode: false,
    // }),
  ],
  rules: [
    ["outline-none", { outline: "none" }],
    ["leading-none", { lineHeight: "1" }],
    [
      "animate-loadingBar",
      {
        animation: "loadingBar 1.5s linear infinite",
      },
    ],
  ],
  transformers: [
    transformerVariantGroup(),
    transformerCompileClass({
      classPrefix: "xemdi_",
    }),
  ],
  theme: {
    colors: {
      border: "hsl(214.3 31.8% 91.4%)",
      input: "hsl(214.3 31.8% 91.4%)",
      ring: "oklch(0.6276 0.2076 264.51)",
      background: "oklch(0.98 0 0)",
      foreground: "oklch(0.18 0 0)",
      primary: {
        DEFAULT: "oklch(0.6276 0.2076 264.51)",
        foreground: "hsl(210 40% 98%)",
      },
      secondary: {
        DEFAULT: "hsl(210 40% 96%)",
        foreground: "hsl(222.2 84% 4.9%)",
      },
      muted: {
        DEFAULT: "hsl(210 40% 96%)",
        foreground: "hsl(215.4 16.3% 46.9%)",
      },
      accent: {
        DEFAULT: "hsl(210 40% 96%)",
        foreground: "hsl(222.2 84% 4.9%)",
      },

      destructive: {
        DEFAULT: "hsl(0 84.2% 60.2%)",
        foreground: "hsl(210 40% 98%)",
      },
      card: {
        DEFAULT: "hsl(0 0% 100%)",
        foreground: "hsl(222.2 84% 4.9%)",
      },
    },
    radius: {
      none: "0px",
      sm: "0.125rem", // 2px
      DEFAULT: "0rem", // 4px (áp dụng cho .rounded)
      md: "0.375rem", // 6px
      lg: "0.5rem", // 8px
      xl: "0.75rem", // 12px
      "2xl": "1rem", // 16px
      "3xl": "1.5rem", // 24px
      full: "9999px",
    },
  },
  shortcuts: [
    {
      focus_inp: "outline-none ring-1 ring-primary shadow-[0_0_0_0.25rem] shadow-primary/10",
      xemdi_inp:
        "flex h-9 w-full rounded-md border border-input bg-transparent p-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:focus_inp focus-within:focus_inp disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ",
        load_ring: "w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4",
        "rc-input": "w-full focus-visible:outline-none p-0 ",
        "rc-input-out-of-range": "text-red-500",
        "rc-input-affix-wrapper": "border border-gray-300 rounded-md overflow-hidden",
        "rc-input-clear-icon": "p-0 text-xs bg-transparent border-0 cursor-pointer",
        "rc-input-clear-icon-hidden": "hidden",
        "rc-input-prefix": "px-1 flex items-center",
        "rc-input-suffix": "px-1 flex items-center",
    },
  ],
  preflights: [
    {
      getCSS: () => `
        @keyframes loadingBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `,
    },
  ],
  safelist: [
    "rc-input",
    "load_ring",
    "rc-input-out-of-range",
    "rc-input-affix-wrapper",
    "rc-input-clear-icon",
    "rc-input-clear-icon-hidden",
    "rc-input-prefix",
    "rc-input-suffix"
  ],
});
/*
.rc-input-out-of-range {
  color: red;
}
.rc-input-affix-wrapper {
  padding: 2px 8px;
  overflow: hidden;
  border: 1px solid lightgray;
  border-radius: 2px;
}
.rc-input-affix-wrapper:hover,
.rc-input-affix-wrapper:focus-within {
  border-color: #000;
}
.rc-input-affix-wrapper input {
  padding: 0;
  border: none;
  outline: none;
}
.rc-input-clear-icon {
  padding: 0;
  font-size: 12px;
  background: none;
  border: none;
}
.rc-input-clear-icon-hidden {
  display: none;
}

*/
/*
            primary: 'oklch(0.6276 0.2076 264.51)',
            secondary: 'oklch(0.6232 0.0397 257.69)',
            success: 'oklch(0.6158 0.1611 153.57)',
            destructive: 'oklch(0.6273 0.2336 22.62)', // aka danger
            warning: 'oklch(0.8366 0.1848 83.44)',
            info: 'oklch(0.7752 0.2133 215.18)',
            light: 'oklch(0.9721 0.0051 235.23)',
            dark: 'oklch(0.3093 0.0206 257.11)',
            background: 'oklch(0.98 0 0)',
            foreground: 'oklch(0.18 0 0)',
            accent: 'oklch(0.7752 0.2133 215.18)',
            muted: 'oklch(0.967 0.001 286.375)',
            'muted-foreground': 'oklch(0.552 0.016 285.938)',

            border: 'oklch(0.92 0.004 286.32)',
            input: 'oklch(0.92 0.004 286.32)',
            ring: 'oklch(0.705 0.015 286.067)',

            'primary-foreground': 'oklch(1 0 0)',
            'secondary-foreground': 'oklch(1 0 0)',
            'success-foreground': 'oklch(1 0 0)',
            'destructive-foreground': 'oklch(1 0 0)',
            'warning-foreground': 'oklch(0.1 0 0)',
            'info-foreground': 'oklch(0.1 0 0)',
            'light-foreground': 'oklch(0.1 0 0)',
            'dark-foreground': 'oklch(1 0 0)',
            'accent-foreground': 'oklch(0.1 0 0)',

*/
