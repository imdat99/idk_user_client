import {
    defineConfig,
    transformerCompileClass,
    transformerVariantGroup
} from 'unocss'
import presetWind4 from '@unocss/preset-wind4'
export default defineConfig({
    // ...UnoCSS options
    presets: [presetWind4()],
    rules: [
        ['outline-none', { outline: 'none' }],
        ['leading-none', { lineHeight: '1' }],
        [
            'animate-loadingBar',
            {
                animation: 'loadingBar 1.5s linear infinite',
            },
        ],
    ],
    transformers: [
        transformerVariantGroup(),
        transformerCompileClass({
            classPrefix: 'xemdi_',
        }),
    ],
    theme: {
        colors: {
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
        },
        radius: {
            none: '0px',
            sm: '0.125rem', // 2px
            DEFAULT: '0rem', // 4px (áp dụng cho .rounded)
            md: '0.375rem', // 6px
            lg: '0.5rem', // 8px
            xl: '0.75rem', // 12px
            '2xl': '1rem', // 16px
            '3xl': '1.5rem', // 24px
            full: '9999px',
        },
    },
    shortcuts: [
        {
            xemdi_inp: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:(outline-none ring-1 ring-primary shadow-[0_0_0_0.25rem] shadow-primary/10) disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "rc-select-selection-item": "line-height-9 px-3 text-base md:text-sm",
            "rc-select-selection-search-input": "xemdi_inp",
            "rc-select-arrow": "absolute inset-y-0 right-3 flex items-center pointer-events-none",
        }
    ],
    preflights: [
        {
            getCSS: () => `
        @keyframes loadingBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes rcSelectDropdownSlideUpIn {
        0% {
            opacity: 0;
            transform-origin: 0% 0%;
            transform: scaleY(0);
        }
        100% {
            opacity: 1;
            transform-origin: 0% 0%;
            transform: scaleY(1);
        }
        }
        @keyframes rcSelectDropdownSlideUpOut {
        0% {
            opacity: 1;
            transform-origin: 0% 0%;
            transform: scaleY(1);
        }
        100% {
            opacity: 0;
            transform-origin: 0% 0%;
            transform: scaleY(0);
        }
        }
        @keyframes rcSelectDropdownSlideDownIn {
        0% {
            transform: scaleY(0);
            transform-origin: 100% 100%;
            opacity: 0;
        }
        100% {
            transform: scaleY(1);
            transform-origin: 100% 100%;
            opacity: 1;
        }
        }
        @keyframes rcSelectDropdownSlideDownOut {
        0% {
            transform: scaleY(1);
            transform-origin: 100% 100%;
            opacity: 1;
        }
        100% {
            transform: scaleY(0);
            transform-origin: 100% 100%;
            opacity: 0;
        }
        }
        @keyframes rcSelectLoadingIcon {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
        }
      `,
        },
    ],
})
