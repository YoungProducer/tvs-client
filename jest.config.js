module.exports = {
  preset: 'ts-jest',

  testEnvironment: 'node',

  setupFiles: ['<rootDir>/configs/enzyme.config.ts'],

  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],

  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },

  globals: {
    "ts-jest": {
      "tsConfig": "<rootDir>/tsconfig.json",
      diagnostics: true,
    }
  },

  testURL: 'http://localhost',

  snapshotSerializers: ["enzyme-to-json/serializer"],

  verbose: true,

  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/files.ts',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^store(.*)$': '<rootDir>/src/store$1',
  }
};