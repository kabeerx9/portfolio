import type { Config } from 'tailwindcss';

const tone = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        fg: tone('fg'),
        muted: tone('muted'),
        faint: tone('faint'),
        line: tone('line'),
        tile: tone('tile'),
        live: tone('live'),
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
};
export default config;
