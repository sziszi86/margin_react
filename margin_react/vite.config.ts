import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { ProxyOptions } from "vite"; // Importáljuk a ProxyOptions típust a pontosabb konfigurációhoz

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    rollupOptions: {
      onLog(level, log, handler) {
        // Ellenőrizzük, hogy log.cause objektum-e és van-e message tulajdonsága
        if (
          log.cause &&
          typeof log.cause === "object" &&
          log.cause !== null &&
          "message" in log.cause &&
          (log.cause as { message: unknown }).message ===
            `Can't resolve original location of error.`
        ) {
          return;
        }
        handler(level, log);
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    proxy: {
      "/wp-json": {
        target: "https://palace-poker.hu/ujadmin",
        changeOrigin: true,
        secure: false, // HTTPS esetén sem ellenőrzi a tanúsítványt (fejlesztéshez)
        rewrite: (path) => path.replace(/^\/wp-json/, "/wp-json"),
        configure: (proxy, _options) => {
          // Hitelesítési sütik továbbítása
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            if (req.headers.cookie) {
              proxyReq.setHeader("Cookie", req.headers.cookie);
            }
            // Opcionális: Ha más fejlécet is továbbítani kell (pl. Authorization)
            if (req.headers.authorization) {
              proxyReq.setHeader("Authorization", req.headers.authorization);
            }
          });
          // Hibakezelés naplózása
          proxy.on("error", (err, _req, res) => {
            console.error("Proxy error:", err);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Proxy error occurred.");
          });
        },
      } as ProxyOptions, // Explicit típuskijelölés
    },
  },
});
