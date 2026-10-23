import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Middleware to serve static HTML from /porto-2.0 cleanly in dev server
const servePorto2Plugin = () => ({
  name: 'serve-porto-2',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url.split('?')[0]
      if (url === '/porto-2.0' || url === '/porto-2.0/') {
        const filePath = path.resolve(__dirname, 'public/porto-2.0/index.html')
        if (fs.existsSync(filePath)) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end(fs.readFileSync(filePath))
        }
      }
      if (url === '/porto-2.0/briefs' || url === '/porto-2.0/briefs/' || url === '/porto-2.0/briefs.html') {
        const filePath = path.resolve(__dirname, 'public/porto-2.0/briefs/index.html')
        if (fs.existsSync(filePath)) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end(fs.readFileSync(filePath))
        }
      }
      if (url === '/porto-2.0/brief-detail' || url === '/porto-2.0/brief-detail/' || url.startsWith('/porto-2.0/brief-detail?')) {
        const filePath = path.resolve(__dirname, 'public/porto-2.0/brief-detail/index.html')
        if (fs.existsSync(filePath)) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end(fs.readFileSync(filePath))
        }
      }
      next()
    })
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), servePorto2Plugin()],
})
