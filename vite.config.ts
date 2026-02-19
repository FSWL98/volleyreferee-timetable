import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Загружаем переменные окружения в зависимости от режима (development/production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    // Явно указываем, какие переменные окружения будут доступны на клиенте
    define: {
      'import.meta.env.VITE_GOOGLE_API_KEY': JSON.stringify(env.VITE_GOOGLE_API_KEY),
      'import.meta.env.VITE_TOURNAMENT_A_SHEET_ID': JSON.stringify(env.VITE_TOURNAMENT_A_SHEET_ID),
      'import.meta.env.VITE_TOURNAMENT_B_SHEET_ID': JSON.stringify(env.VITE_TOURNAMENT_B_SHEET_ID),
      'import.meta.env.VITE_API_TIMEOUT': JSON.stringify(env.VITE_API_TIMEOUT),
      'import.meta.env.VITE_CACHE_TIME': JSON.stringify(env.VITE_CACHE_TIME),
    },
    // Оптимизация сборки
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-big-calendar'],
          },
        },
      },
    },
    // Настройки сервера для разработки
    server: {
      port: 3000,
      open: true,
    },
  };
});