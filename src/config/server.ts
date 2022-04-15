import { env, onListening } from "../tools"

interface ServerOnListeningConfig {
  (port: number, isHttps: boolean): void
}

interface ServerSslConfig {
  enable: boolean
  port: number
  key: string
  cert: string
}

export interface ServerConfig {
  ssl: ServerSslConfig
  port: number
  onListening: ServerOnListeningConfig
}

export default {
  ssl: {
    enable: env.bool("HTTPS_ENABLE"),
    port: env.int("HTTPS_PORT", 6000),
    cert: env("HTTPS_CERT"),
    key: env("HTTPS_KEY"),
  },
  port: env.int("HTTP_PORT", 5000),
  onListening,
} as ServerConfig
