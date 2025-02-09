import react from '@vitejs/plugin-react-swc'
import vike from 'vike/plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), vike()]
})
