import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, Plugin } from 'vite';
import geminiHandler from './api/gemini.ts';
import healthHandler from './api/health.ts';

function vercelApiDevPlugin(): Plugin {
  return {
    name: 'vercel-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();
        
        // Ensure status and json response helpers exist on connect ServerResponse
        const response = res as any;
        if (!response.status) {
          response.status = function (code: number) {
            this.statusCode = code;
            return this;
          };
        }
        if (!response.json) {
          response.json = function (data: any) {
            this.setHeader('Content-Type', 'application/json');
            this.end(JSON.stringify(data));
            return this;
          };
        }

        if (req.url.startsWith('/api/health')) {
          healthHandler(req, res);
          return;
        }

        if (req.url.startsWith('/api/gemini')) {
          if (req.method === 'POST') {
            let bodyStr = '';
            req.on('data', (chunk) => {
              bodyStr += chunk;
            });
            req.on('end', async () => {
              try {
                (req as any).body = bodyStr ? JSON.parse(bodyStr) : {};
              } catch {
                (req as any).body = {};
              }
              await geminiHandler(req, res);
            });
            return;
          }
          geminiHandler(req, res);
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), vercelApiDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
