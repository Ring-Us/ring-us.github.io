import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';
export default defineConfig({
  base: '/ring-us-frontend',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      includeAssets: [
        'favicon.ico',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png',
      ],
      manifest: {
        name: '링어스',
        short_name: '링어스',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#485EEE',
        icons: [
          {
            src: 'icons/favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon',
          },
          {
            src: 'icons/icon-192x192.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: 'icons/icon-512x512.png',
            type: 'image/png',
            sizes: '512x512',
          },
          {
            src: 'icons/icon-512x512.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  server: {
    port: 5178, // 포트 5178로 변경 -> 임시로 서버 연결위해 사용
    strictPort: true, // 사용 중이면 오류 발생 (다른 포트로 변경되지 않음)
    host: true, // 네트워크에서도 접근 가능하도록 설정 (선택 사항)
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        sw: './sw.js',
      },
    },
  },
});
