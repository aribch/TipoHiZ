const nextJest = require('next/jest')

const createJestConfig = nextJest({
   dir: './',
})

const customJestConfig = {
   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
   moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
   },
   testEnvironment: 'jsdom',
   collectCoverage: true,
   collectCoverageFrom: [
      "app/**/*.{js,ts,tsx}",
      "store/**/*.{js,ts,tsx}",
      "components/**/*.{js,ts,tsx}",
      "!**/node_modules/**",
      "!**/*.d.ts",
   ],
   coverageDirectory: "coverage",
   coverageReporters: ["text", "lcov"],
}

module.exports = createJestConfig(customJestConfig)
