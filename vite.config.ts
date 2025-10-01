import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      treeshake: {
        preset: 'recommended',
        manualPureFunctions: ['console.log', 'console.info', 'console.debug'],
      },
      output: {
        manualChunks(id) {
          // Core vendors
          if (id.includes('react-dom')) return 'react-dom';
          if (id.includes('react') && !id.includes('react-dom')) return 'react';
          if (id.includes('react-router')) return 'router';
          
          // UI libraries
          if (id.includes('@radix-ui')) return 'radix-ui';
          if (id.includes('framer-motion')) return 'animation';
          
          // Data & forms
          if (id.includes('@tanstack/react-query')) return 'query';
          if (id.includes('react-hook-form') || id.includes('@hookform')) return 'forms';
          
          // Utils
          if (id.includes('lucide-react')) return 'icons';
          if (id.includes('zod')) return 'validation';
          if (id.includes('tailwind-merge') || id.includes('clsx') || id.includes('class-variance-authority')) return 'styles';
          
          // Feature-specific chunks
          if (id.includes('src/features/cotiza')) return 'cotiza';
          if (id.includes('src/features/facturacion')) return 'facturacion';
          if (id.includes('src/components/auth')) return 'auth';
        },
        // Optimize chunk names
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId : '';
          if (facadeModuleId.includes('node_modules')) {
            return 'vendor/[name].[hash].js';
          }
          return 'chunks/[name].[hash].js';
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          if (/\.(woff2?|ttf|eot)$/.test(name)) {
            return 'fonts/[name].[hash][extname]';
          }
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(name)) {
            return 'images/[name].[hash][extname]';
          }
          if (/\.css$/.test(name)) {
            return 'styles/[name].[hash][extname]';
          }
          return 'assets/[name].[hash][extname]';
        },
      },
    },
    // Optimize CSS
    cssCodeSplit: true,
    cssMinify: true,
  },
  server: {
    port: 5173,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
    ],
  },
})