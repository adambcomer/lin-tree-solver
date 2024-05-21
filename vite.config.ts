import { UserConfig } from 'vite'
import vike from 'vike/plugin'
import react from '@vitejs/plugin-react-swc'
import { cjsInterop } from 'vite-plugin-cjs-interop'

export default {
  plugins: [
    vike({ prerender: true }),
    react(),
    cjsInterop({
      dependencies: [
        '@mui/base/**',
        '@mui/material/**',
        '@mui/icons-material/**',
        '@mui/utils/**'
      ]
    })
  ],
  resolve: {
    alias: {
      src: '/src'
    }
  }
} as UserConfig
