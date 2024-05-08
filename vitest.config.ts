import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ["node_modules"],
    include: ["**/*.test.ts"],
    globalSetup: ["setupVitest.ts"],
  },
})

