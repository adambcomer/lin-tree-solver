import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      createHtmlPlugin({
        inject: {
          data: {
            PUBLIC_URL: process.env.PUBLIC_URL,
            ...env,
            MODE: mode,
          },
        },
        minify: true,
      }),
      splitVendorChunkPlugin(),
    ],
    base: 'https://adambcomer.com/lin-tree-solver/',
  }
})
