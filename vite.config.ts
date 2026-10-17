import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  base: '/Saywhaaa/', // because the repo is named Saywhaaa
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: true,
  },
})
