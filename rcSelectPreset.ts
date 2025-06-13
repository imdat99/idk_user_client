import type { Preset, PresetOrFactory } from 'unocss';

export interface RcSelectPresetOptions {
  /**
   * Prefix for CSS classes
   * @default ''
   */
  prefix?: string;

  /**
   * Enable dark mode support
   * @default true
   */
  darkMode?: boolean;

  /**
   * Use colors from main UnoCSS config theme
   * @default true
   */
  useThemeColors?: boolean;

  /**
   * Custom color theme (will be merged with theme colors if useThemeColors is true)
   */
  colors?: {
    border?: string;
    input?: string;
    ring?: string;
    background?: string;
    foreground?: string;
    primary?: {
      DEFAULT: string;
      foreground: string;
    };
    secondary?: {
      DEFAULT: string;
      foreground: string;
    };
    muted?: {
      DEFAULT: string;
      foreground: string;
    };
    accent?: {
      DEFAULT: string;
      foreground: string;
    };
    destructive?: {
      DEFAULT: string;
      foreground: string;
    };
    card?: {
      DEFAULT: string;
      foreground: string;
    };
  };
}

const defaultColors = {
  border: 'hsl(214.3 31.8% 91.4%)',
  input: 'hsl(214.3 31.8% 91.4%)',
  ring: 'hsl(222.2 84% 4.9%)',
  background: 'hsl(0 0% 100%)',
  foreground: 'hsl(222.2 84% 4.9%)',
  primary: {
    DEFAULT: 'hsl(222.2 47.4% 11.2%)',
    foreground: 'hsl(210 40% 98%)',
  },
  secondary: {
    DEFAULT: 'hsl(210 40% 96%)',
    foreground: 'hsl(222.2 84% 4.9%)',
  },
  muted: {
    DEFAULT: 'hsl(210 40% 96%)',
    foreground: 'hsl(215.4 16.3% 46.9%)',
  },
  accent: {
    DEFAULT: 'hsl(210 40% 96%)',
    foreground: 'hsl(222.2 84% 4.9%)',
  },
  destructive: {
    DEFAULT: 'hsl(0 84.2% 60.2%)',
    foreground: 'hsl(210 40% 98%)',
  },
  card: {
    DEFAULT: 'hsl(0 0% 100%)',
    foreground: 'hsl(222.2 84% 4.9%)',
  },
};

const darkColors = {
  border: 'hsl(217.2 32.6% 17.5%)',
  input: 'hsl(217.2 32.6% 17.5%)',
  ring: 'hsl(212.7 26.8% 83.9%)',
  background: 'hsl(222.2 84% 4.9%)',
  foreground: 'hsl(210 40% 98%)',
  primary: {
    DEFAULT: 'hsl(210 40% 98%)',
    foreground: 'hsl(222.2 47.4% 11.2%)',
  },
  secondary: {
    DEFAULT: 'hsl(217.2 32.6% 17.5%)',
    foreground: 'hsl(210 40% 98%)',
  },
  muted: {
    DEFAULT: 'hsl(217.2 32.6% 17.5%)',
    foreground: 'hsl(215 20.2% 65.1%)',
  },
  accent: {
    DEFAULT: 'hsl(217.2 32.6% 17.5%)',
    foreground: 'hsl(210 40% 98%)',
  },
  destructive: {
    DEFAULT: 'hsl(0 62.8% 30.6%)',
    foreground: 'hsl(210 40% 98%)',
  },
  card: {
    DEFAULT: 'hsl(222.2 84% 4.9%)',
    foreground: 'hsl(210 40% 98%)',
  },
};

// Helper function to get color value from theme or fallback
function getColorValue(color: any, fallback: string): string {
  if (typeof color === 'string') return color;
  if (typeof color === 'object' && color.DEFAULT) return color.DEFAULT;
  return fallback;
}

function getNestedColorValue(
  color: any,
  key: string,
  fallback: string,
): string {
  if (typeof color === 'object' && color[key]) {
    return typeof color[key] === 'string'
      ? color[key]
      : color[key].DEFAULT || fallback;
  }
  return fallback;
}

export function presetRcSelect(
  options: RcSelectPresetOptions = {},
): PresetOrFactory {
  const {
    prefix = '',
    darkMode = true,
    useThemeColors = true,
    colors = {},
  } = options;

  return {
    name: '@unocss/preset-rc-select',
    configResolved(config) {
      // Access theme colors from main config
      const themeColors = (config.theme as any)?.colors || {};

      // Merge colors: theme colors -> default colors -> custom colors
      const resolvedColors = useThemeColors
        ? {
            border: getColorValue(themeColors.border, defaultColors.border),
            input: getColorValue(
              themeColors.input || themeColors.border,
              defaultColors.input,
            ),
            ring: getColorValue(
              themeColors.ring || themeColors.primary,
              defaultColors.ring,
            ),
            background: getColorValue(
              themeColors.background,
              defaultColors.background,
            ),
            foreground: getColorValue(
              themeColors.foreground,
              defaultColors.foreground,
            ),
            primary: {
              DEFAULT: getColorValue(
                themeColors.primary,
                defaultColors.primary.DEFAULT,
              ),
              foreground: getNestedColorValue(
                themeColors.primary,
                'foreground',
                defaultColors.primary.foreground,
              ),
            },
            secondary: {
              DEFAULT: getColorValue(
                themeColors.secondary,
                defaultColors.secondary.DEFAULT,
              ),
              foreground: getNestedColorValue(
                themeColors.secondary,
                'foreground',
                defaultColors.secondary.foreground,
              ),
            },
            muted: {
              DEFAULT: getColorValue(
                themeColors.muted,
                defaultColors.muted.DEFAULT,
              ),
              foreground: getNestedColorValue(
                themeColors.muted,
                'foreground',
                defaultColors.muted.foreground,
              ),
            },
            accent: {
              DEFAULT: getColorValue(
                themeColors.accent,
                defaultColors.accent.DEFAULT,
              ),
              foreground: getNestedColorValue(
                themeColors.accent,
                'foreground',
                defaultColors.accent.foreground,
              ),
            },
            destructive: {
              DEFAULT: getColorValue(
                themeColors.destructive,
                defaultColors.destructive.DEFAULT,
              ),
              foreground: getNestedColorValue(
                themeColors.destructive,
                'foreground',
                defaultColors.destructive.foreground,
              ),
            },
            card: {
              DEFAULT: getColorValue(
                themeColors.card,
                defaultColors.card.DEFAULT,
              ),
              foreground: getNestedColorValue(
                themeColors.card,
                'foreground',
                defaultColors.card.foreground,
              ),
            },
            ...colors,
          }
        : { ...defaultColors, ...colors };

      const resolvedDarkColors = useThemeColors
        ? {
            border: getColorValue(themeColors.border, darkColors.border),
            input: getColorValue(
              themeColors.input || themeColors.border,
              darkColors.input,
            ),
            ring: getColorValue(
              themeColors.ring || themeColors.primary,
              darkColors.ring,
            ),
            background: getColorValue(
              themeColors.background,
              darkColors.background,
            ),
            foreground: getColorValue(
              themeColors.foreground,
              darkColors.foreground,
            ),
            primary: {
              DEFAULT: getColorValue(
                themeColors.primary,
                darkColors.primary.DEFAULT,
              ),
              foreground: getNestedColorValue(
                themeColors.primary,
                'foreground',
                darkColors.primary.foreground,
              ),
            },
            secondary: {
              DEFAULT: getColorValue(
                themeColors.secondary,
                darkColors.secondary.DEFAULT,
              ),
              foreground: getNestedColorValue(
                themeColors.secondary,
                'foreground',
                darkColors.secondary.foreground,
              ),
            },
            muted: {
              DEFAULT: getColorValue(
                themeColors.muted,
                darkColors.muted.DEFAULT,
              ),
              foreground: getNestedColorValue(
                themeColors.muted,
                'foreground',
                darkColors.muted.foreground,
              ),
            },
            accent: {
              DEFAULT: getColorValue(
                themeColors.accent,
                darkColors.accent.DEFAULT,
              ),
              foreground: getNestedColorValue(
                themeColors.accent,
                'foreground',
                darkColors.accent.foreground,
              ),
            },
            destructive: {
              DEFAULT: getColorValue(
                themeColors.destructive,
                darkColors.destructive.DEFAULT,
              ),
              foreground: getNestedColorValue(
                themeColors.destructive,
                'foreground',
                darkColors.destructive.foreground,
              ),
            },
            card: {
              DEFAULT: getColorValue(themeColors.card, darkColors.card.DEFAULT),
              foreground: getNestedColorValue(
                themeColors.card,
                'foreground',
                darkColors.card.foreground,
              ),
            },
            ...colors,
          }
        : { ...darkColors, ...colors };

      // Add CSS to config
      if (!config.preflights) config.preflights = [];
      config.preflights.push({
        getCSS: () => `
/* RC Select ShadcnUI Preset Styles */
.${prefix}rc-select {
  display: inline-block;
  font-size: 14px;
  width: 180px;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.${prefix}rc-select-disabled,
.${prefix}rc-select-disabled input {
  cursor: not-allowed;
}

.${prefix}rc-select-disabled .${prefix}rc-select-selector {
  opacity: 0.5;
  background-color: ${resolvedColors.muted.DEFAULT};
  color: ${resolvedColors.muted.foreground};
  cursor: not-allowed;
}

.${prefix}rc-select-show-arrow.${prefix}rc-select-loading .${prefix}rc-select-arrow-icon::after {
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  border-radius: 100%;
  border: 2px solid ${resolvedColors.muted.foreground};
  border-top-color: transparent;
  border-bottom-color: transparent;
  transform: none;
  margin-top: 2px;
  animation: rcSelectLoadingIcon 0.8s infinite ease-in-out;
}

.${prefix}rc-select .${prefix}rc-select-selection-placeholder {
  opacity: 1;
  color: ${resolvedColors.muted.foreground};
  pointer-events: none;
}

.${prefix}rc-select .${prefix}rc-select-selection-search-input {
  appearance: none;
}

.${prefix}rc-select .${prefix}rc-select-selection-search-input::-webkit-search-cancel-button {
  display: none;
  appearance: none;
}

/* Single Select */
.${prefix}rc-select-single .${prefix}rc-select-selector {
  display: flex;
  position: relative;
  align-items: center;
  height: 40px;
  background-color: ${resolvedColors.background};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.${prefix}rc-select-single .${prefix}rc-select-selector .${prefix}rc-select-selection-wrap {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
}

.${prefix}rc-select-single .${prefix}rc-select-selector .${prefix}rc-select-selection-search {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
}

.${prefix}rc-select-single .${prefix}rc-select-selector .${prefix}rc-select-selection-search-input {
  width: 100%;
  height: 100%;
  background: transparent;
  color: ${resolvedColors.foreground};
}

.${prefix}rc-select-single .${prefix}rc-select-selector .${prefix}rc-select-selection-item,
.${prefix}rc-select-single .${prefix}rc-select-selector .${prefix}rc-select-selection-placeholder {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  pointer-events: none;
  font-weight: 400;
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 40px);
}

.${prefix}rc-select-single .${prefix}rc-select-selector .${prefix}rc-select-selection-item {
  color: ${resolvedColors.foreground};
}

.${prefix}rc-select-single:not(.${prefix}rc-select-customize-input) .${prefix}rc-select-selector {
  /*padding: 0 12px;*/
  border: 1px solid ${resolvedColors.border};
  border-radius: 6px;
  background-color: ${resolvedColors.background};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.${prefix}rc-select-single:not(.${prefix}rc-select-customize-input) .${prefix}rc-select-selector:hover {
  border-color: ${resolvedColors.ring};
}

.${prefix}rc-select-single:not(.${prefix}rc-select-customize-input) .${prefix}rc-select-selector .${prefix}rc-select-selection-search-input {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  color: ${resolvedColors.foreground};
  font-size: 14px;
}

/* Multiple Select */
.${prefix}rc-select-multiple .${prefix}rc-select-selector {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-height: 40px;
  padding: 4px 12px;
  border: 1px solid ${resolvedColors.border};
  border-radius: 6px;
  background-color: ${resolvedColors.background};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 4px;
}

.${prefix}rc-select-multiple .${prefix}rc-select-selector:hover {
  border-color: ${resolvedColors.ring};
}

.${prefix}rc-select-multiple .${prefix}rc-select-selector .${prefix}rc-select-selection-item {
  flex: none;
  display: inline-flex;
  align-items: center;
  background: ${resolvedColors.secondary.DEFAULT};
  color: ${resolvedColors.secondary.foreground};
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  height: 24px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.${prefix}rc-select-multiple .${prefix}rc-select-selector .${prefix}rc-select-selection-item:hover {
  background: ${resolvedColors.accent.DEFAULT};
}

.${prefix}rc-select-multiple .${prefix}rc-select-selector .${prefix}rc-select-selection-item-disabled {
  cursor: not-allowed;
  opacity: 0.5;
  background: ${resolvedColors.muted.DEFAULT};
  color: ${resolvedColors.muted.foreground};
}

.${prefix}rc-select-multiple .${prefix}rc-select-selector .${prefix}rc-select-selection-overflow {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  width: 100%;
  align-items: center;
}

.${prefix}rc-select-multiple .${prefix}rc-select-selector .${prefix}rc-select-selection-overflow-item {
  flex: none;
  max-width: 100%;
}

.${prefix}rc-select-multiple .${prefix}rc-select-selector .${prefix}rc-select-selection-search {
  position: relative;
  flex: 1;
  min-width: 60px;
  display: flex;
  align-items: center;
}

.${prefix}rc-select-multiple .${prefix}rc-select-selector .${prefix}rc-select-selection-search-input,
.${prefix}rc-select-multiple .${prefix}rc-select-selector .${prefix}rc-select-selection-search-mirror {
  padding: 0;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
}

.${prefix}rc-select-multiple .${prefix}rc-select-selector .${prefix}rc-select-selection-search-mirror {
  position: absolute;
  z-index: 999;
  white-space: nowrap;
  left: 0;
  top: 0;
  visibility: hidden;
}

.${prefix}rc-select-multiple .${prefix}rc-select-selector .${prefix}rc-select-selection-search-input {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  color: ${resolvedColors.foreground};
  min-height: 32px;
}

/* Clear and Arrow */
.${prefix}rc-select-allow-clear.${prefix}rc-select-multiple .${prefix}rc-select-selector {
  padding-right: 40px;
}

.${prefix}rc-select-allow-clear .${prefix}rc-select-clear {
  position: absolute;
  right: 32px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: ${resolvedColors.muted.foreground};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.${prefix}rc-select-allow-clear .${prefix}rc-select-clear:hover {
  color: ${resolvedColors.foreground};
}

.${prefix}rc-select-show-arrow.${prefix}rc-select-multiple .${prefix}rc-select-selector {
  padding-right: 40px;
}

.${prefix}rc-select-show-arrow .${prefix}rc-select-arrow {
  pointer-events: none;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.${prefix}rc-select-show-arrow .${prefix}rc-select-arrow-icon::after {
  content: '';
  border: 4px solid transparent;
  border-top-color: ${resolvedColors.muted.foreground};
  width: 0;
  height: 0;
  display: inline-block;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.${prefix}rc-select-open .${prefix}rc-select-arrow {
  transform: translateY(-50%) rotate(180deg);
}

/* Focus States */
.${prefix}rc-select-focused .${prefix}rc-select-selector {
  border-color: ${resolvedColors.ring} !important;
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px ${resolvedColors.ring}20;
}

/* Dropdown */
.${prefix}rc-select-dropdown {
  border: 1px solid ${resolvedColors.border};
  border-radius: 8px;
  background: ${resolvedColors.card.DEFAULT};
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  position: absolute;
  z-index: 1000;
  min-width: 120px;
  overflow: hidden;
}

.${prefix}rc-select-dropdown-hidden {
  display: none;
}

/* Options */
.${prefix}rc-select-item {
  font-size: 14px;
  line-height: 1.5;
  padding: 8px 12px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 8px;
}

.${prefix}rc-select-item-group {
  color: ${resolvedColors.muted.foreground};
  font-weight: 600;
  font-size: 12px;
  padding: 8px 12px 4px;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  cursor: default;
}

.${prefix}rc-select-item-option {
  position: relative;
  color: ${resolvedColors.foreground};
}

.${prefix}rc-select-item-option:hover {
  background: ${resolvedColors.accent.DEFAULT};
  color: ${resolvedColors.accent.foreground};
}

.${prefix}rc-select-item-option-grouped {
  padding-left: 24px;
}

.${prefix}rc-select-item-option .${prefix}rc-select-item-option-state {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.${prefix}rc-select-item-option-active {
  background: ${resolvedColors.accent.DEFAULT};
  color: ${resolvedColors.accent.foreground};
}

.${prefix}rc-select-item-option-selected {
  background: ${resolvedColors.primary.DEFAULT};
  color: ${resolvedColors.primary.foreground};
  font-weight: 500;
}

.${prefix}rc-select-item-option-selected:hover {
  background: ${resolvedColors.primary.DEFAULT}e6;
}

.${prefix}rc-select-item-option-disabled {
  color: ${resolvedColors.muted.foreground};
  cursor: not-allowed;
  opacity: 0.5;
}

.${prefix}rc-select-item-empty {
  text-align: center;
  color: ${resolvedColors.muted.foreground};
  padding: 20px 12px;
  font-style: italic;
}

/* Animations */
.${prefix}rc-select-selection__choice-zoom {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.${prefix}rc-select-selection__choice-zoom-appear {
  opacity: 0;
  transform: scale(0.8);
}

.${prefix}rc-select-selection__choice-zoom-appear.${prefix}rc-select-selection__choice-zoom-appear-active {
  opacity: 1;
  transform: scale(1);
}

.${prefix}rc-select-selection__choice-zoom-leave {
  opacity: 1;
  transform: scale(1);
}

.${prefix}rc-select-selection__choice-zoom-leave.${prefix}rc-select-selection__choice-zoom-leave-active {
  opacity: 0;
  transform: scale(0.8);
}

@keyframes rcSelectLoadingIcon {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

${
  darkMode
    ? `
/* Dark mode styles */
@media (prefers-color-scheme: dark) {
  .${prefix}rc-select-disabled .${prefix}rc-select-selector {
    background-color: ${resolvedDarkColors.muted.DEFAULT};
    color: ${resolvedDarkColors.muted.foreground};
  }

  .${prefix}rc-select .${prefix}rc-select-selection-placeholder {
    color: ${resolvedDarkColors.muted.foreground};
  }

  .${prefix}rc-select-single .${prefix}rc-select-selector {
    background-color: ${resolvedDarkColors.background};
  }

  .${prefix}rc-select-single .${prefix}rc-select-selector .${prefix}rc-select-selection-search-input {
    color: ${resolvedDarkColors.foreground};
  }

  .${prefix}rc-select-single .${prefix}rc-select-selector .${prefix}rc-select-selection-item {
    color: ${resolvedDarkColors.foreground};
  }

  .${prefix}rc-select-single:not(.${prefix}rc-select-customize-input) .${prefix}rc-select-selector {
    border-color: ${resolvedDarkColors.border};
    background-color: ${resolvedDarkColors.background};
  }

  .${prefix}rc-select-single:not(.${prefix}rc-select-customize-input) .${prefix}rc-select-selector:hover {
    border-color: ${resolvedDarkColors.ring};
  }

  .${prefix}rc-select-multiple .${prefix}rc-select-selector {
    border-color: ${resolvedDarkColors.border};
    background-color: ${resolvedDarkColors.background};
  }

  .${prefix}rc-select-multiple .${prefix}rc-select-selector:hover {
    border-color: ${resolvedDarkColors.ring};
  }

  .${prefix}rc-select-multiple .${prefix}rc-select-selector .${prefix}rc-select-selection-item {
    background: ${resolvedDarkColors.secondary.DEFAULT};
    color: ${resolvedDarkColors.secondary.foreground};
  }

  .${prefix}rc-select-multiple .${prefix}rc-select-selector .${prefix}rc-select-selection-item:hover {
    background: ${resolvedDarkColors.accent.DEFAULT};
  }

  .${prefix}rc-select-multiple .${prefix}rc-select-selector .${prefix}rc-select-selection-search-input {
    color: ${resolvedDarkColors.foreground};
  }

  .${prefix}rc-select-focused .${prefix}rc-select-selector {
    border-color: ${resolvedDarkColors.ring} !important;
    box-shadow: 0 0 0 2px ${resolvedDarkColors.ring}20;
  }

  .${prefix}rc-select-dropdown {
    border-color: ${resolvedDarkColors.border};
    background: ${resolvedDarkColors.card.DEFAULT};
  }

  .${prefix}rc-select-item-option {
    color: ${resolvedDarkColors.foreground};
  }

  .${prefix}rc-select-item-option:hover {
    background: ${resolvedDarkColors.accent.DEFAULT};
    color: ${resolvedDarkColors.accent.foreground};
  }

  .${prefix}rc-select-item-option-active {
    background: ${resolvedDarkColors.accent.DEFAULT};
    color: ${resolvedDarkColors.accent.foreground};
  }

  .${prefix}rc-select-item-option-selected {
    background: ${resolvedDarkColors.primary.DEFAULT};
    color: ${resolvedDarkColors.primary.foreground};
  }

  .${prefix}rc-select-item-group {
    color: ${resolvedDarkColors.muted.foreground};
  }

  .${prefix}rc-select-item-option-disabled {
    color: ${resolvedDarkColors.muted.foreground};
  }

  .${prefix}rc-select-item-empty {
    color: ${resolvedDarkColors.muted.foreground};
  }

  .${prefix}rc-select-allow-clear .${prefix}rc-select-clear {
    color: ${resolvedDarkColors.muted.foreground};
  }

  .${prefix}rc-select-allow-clear .${prefix}rc-select-clear:hover {
    color: ${resolvedDarkColors.foreground};
  }

  .${prefix}rc-select-show-arrow .${prefix}rc-select-arrow-icon::after {
    border-top-color: ${resolvedDarkColors.muted.foreground};
  }
}
`
    : ''
}
        `,
      });
    },
  } as Preset;
}

export default presetRcSelect;
