import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, 'env')
  return {
    plugins: [
      react(),
      createHtmlPlugin({
        inject: { data: { ...env, MODE: mode } },
        minify: true,
      }),
      splitVendorChunkPlugin(),
    ],
  }
})
