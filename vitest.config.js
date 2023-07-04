import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    include: ['./**/*.spec.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    watchExclude: [
      '.*\\/node_modules\\/.*',
      '.*\\/.dist\\/.*',
      '.*\\/.idea\\/.*'
    ],
    coverage: {
      include: ['src/**/*.ts'],
      exclude: [
        'src/main.tsx',
        'src/**/*.d.ts',
        'src/**/*.spec.ts',
        'src/**/*.module.ts'
      ],
      provider: 'istanbul',
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  plugins: [tsconfigPaths()]
})
