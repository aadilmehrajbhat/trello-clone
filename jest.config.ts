const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', 'jest-extended/all'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/tests/__mocks__/svg.js',
    '^~/hooks(.*)$': '<rootDir>/src/hooks$1',
    '^~/assets(.*)$': '<rootDir>/src/assets$1',
    '^~/components(.*)$': '<rootDir>/src/components$1',
    '^~/tests(.*)$': '<rootDir>/src/tests$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
  resetMocks: false,
};

module.exports = customJestConfig;
