import { sentryVitePlugin } from "@sentry/vite-plugin"
import { defineConfig } from "vite"
import desktopPlugin from "./vite"

const sentry =
  process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_ORG && process.env.SENTRY_PROJECT
    ? sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        telemetry: false,
        release: {
          name: process.env.SENTRY_RELEASE ?? process.env.VITE_SENTRY_RELEASE,
        },
        sourcemaps: {
          assets: "./dist/**",
          filesToDeleteAfterUpload: "./dist/**/*.map",
        },
      })
    : false

export default defineConfig({
  plugins: [desktopPlugin, sentry] as any,
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    port: 3000,
    proxy: {
      "/agent": "http://127.0.0.1:4096",
      "/api": "http://127.0.0.1:4096",
      "/auth": "http://127.0.0.1:4096",
      "/command": "http://127.0.0.1:4096",
      "/config": "http://127.0.0.1:4096",
      "/event": "http://127.0.0.1:4096",
      "/experimental": "http://127.0.0.1:4096",
      "/file": "http://127.0.0.1:4096",
      "/find": "http://127.0.0.1:4096",
      "/formatter": "http://127.0.0.1:4096",
      "/global": "http://127.0.0.1:4096",
      "/instance": "http://127.0.0.1:4096",
      "/log": "http://127.0.0.1:4096",
      "/lsp": "http://127.0.0.1:4096",
      "/mcp": "http://127.0.0.1:4096",
      "/path": "http://127.0.0.1:4096",
      "/permission": "http://127.0.0.1:4096",
      "/project": "http://127.0.0.1:4096",
      "/provider": "http://127.0.0.1:4096",
      "/pty": "http://127.0.0.1:4096",
      "/question": "http://127.0.0.1:4096",
      "/session": "http://127.0.0.1:4096",
      "/skill": "http://127.0.0.1:4096",
      "/sync": "http://127.0.0.1:4096",
      "/tui": "http://127.0.0.1:4096",
      "/vcs": "http://127.0.0.1:4096",
      "/workspace": "http://127.0.0.1:4096",
    },
  },
  build: {
    target: "esnext",
    sourcemap: true,
  },
})
