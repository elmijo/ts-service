import { parseBool } from "./helpers"

interface EnvHelper {
  (name: string, def?: string | null): string | null
  int: (name: string, def?: number | null) => number | null
  float: (name: string, def?: number | null) => number | null
  bool: (name: string) => boolean
}

const env: EnvHelper = (name: string, def: string | null = null) =>
  process.env[name] || def

env.int = (name: string, def: number | null = null): number | null =>
  parseInt(process.env[name] || "", 10) || def

env.float = (name: string, def: number | null = null): number | null =>
  parseFloat(process.env[name] || "") || def

env.bool = (name: string): boolean => parseBool(process.env[name])

export default env
