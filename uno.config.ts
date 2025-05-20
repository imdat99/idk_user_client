import { defineConfig } from 'unocss'
import presetWind4 from '@unocss/preset-wind4'
export default defineConfig({
    // ...UnoCSS options
    presets: [presetWind4()],
    rules: [
        ['outline-none', { outline: 'none' }],
        ['ring-ring', { 'box-shadow': '0 0 0 2px var(--un-ring-color)' }],
    ],
    theme: {
        colors: {
            primary: 'var(--un-bg-primary)',
            secondary: 'var(--un-bg-secondary)',
            destructive: 'var(--un-bg-destructive)',
            background: 'var(--un-bg-background)',
            accent: 'var(--un-bg-accent)',
            ring: 'var(--un-ring-color)',
            input: 'var(--un-border-input)',
            'primary-foreground': 'var(--un-text-primary-foreground)',
            'secondary-foreground': 'var(--un-text-secondary-foreground)',
            'destructive-foreground': 'var(--un-text-destructive-foreground)',
            'accent-foreground': 'var(--un-text-accent-foreground)',
        },
    },
    shortcuts: {
        btn: 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        btn_default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        btn_destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        btn_outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        btn_secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        btn_ghost: 'hover:bg-accent hover:text-accent-foreground',
        btn_link: 'text-primary underline-offset-4 hover:underline',
    },
})
