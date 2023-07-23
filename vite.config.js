import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { createHtmlPlugin } from 'vite-plugin-html'
import process from 'process'

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
            MODE: mode
          }
        },
        minify: true
      }),
      splitVendorChunkPlugin()
    ]
  }
})
