import { heroui } from '@heroui/theme'
import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.tsx',
    './node_modules/@heroui/theme/dist/components/(button|spinner|chip|accordion|input|tooltip|popover|toast).js'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans Variable', 'sans-serif'],
        mono: ['Noto Sans Mono Variable', 'monospace']
      }
    }
  },
  darkMode: 'class',
  plugins: [heroui()]
} satisfies Config
