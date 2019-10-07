const base = require('./jest.config')
module.exports = Object.assign({}, base, {
  reporters: ["default","jest-junit"],
  collectCoverage: true,
  collectCoverageFrom: ["lib/**/*.{ts,tsx}", "!**/node_modules/**"],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov']
})