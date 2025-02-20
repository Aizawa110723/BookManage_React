import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,  // オリジンを変更する
        secure: false, // ローカル開発環境ではfalseに設定
      },
    },
  },
});
