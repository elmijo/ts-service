import { Config } from "@jest/types"
import { defaults as tsjPreset } from "ts-jest/presets"

export default {
  verbose: true,
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/"],
  coverageDirectory: ".coverage",
  coveragePathIgnorePatterns: ["/node_modules/", "/types/", "/src/.*/index.ts"],
  coverageReporters: ["json", "lcov", ["text", { skipEmpty: true }]],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  setupFiles: ["<rootDir>/jest.setup.ts"],
  collectCoverageFrom: ["./src/**/*.ts"],
  moduleFileExtensions: ["js", "json", "ts"],
  transform: {
    ...tsjPreset.transform,
  },
  transformIgnorePatterns: ["/node_modules/"],
  globals: {
    "ts-jest": {
      disableSourceMapSupport: true,
      tsconfig: "<rootDir>/tsconfig.json",
      isolatedModules: true,
    },
  },
} as Config.InitialOptions
