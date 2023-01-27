module.exports = {
    preset: 'ts-jest',
    coverageReporters: ['html', 'lcov', 'text'],
    coverageDirectory: '<rootDir>/coverage',
    transform: {
      '^.+\\.ts': ['ts-jest', {
        tsconfig: 'tsconfig.json',
      }],
    },
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    testMatch: ['**/__tests__/*.test.ts']
  }