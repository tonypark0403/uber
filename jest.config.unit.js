process.env.NODE_ENV = 'test';

module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json',
    },
  },
  testRegex: '__tests__/skip_Unit/.*.(test|spec)\\.[jt]s?$',
  cacheDirectory: '.jest/cache',
};
