module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  roots: ['./src'],
  reporters: ['default'],
  coveragePathIgnorePatterns: ['node_modules', 'tests/setups'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  testTimeout: 60000,
};
