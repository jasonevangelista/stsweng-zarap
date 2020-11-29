module.exports = {
    collectCoverageFrom: [
        '**/*.{js,jsx}',
        '!**/node_modules/**',
        '!**/tests/**',
        '!**/coverage/**',
        '!jest.config.js'
    ],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/mocks/styleMock.js',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/mocks/fileMock.js'
    },
    setupFiles: ['<rootDir>/tests/setup.js'],
    setupFilesAfterEnv: ['<rootDir>/tests/setupAfterEnv.js'],
    testMatch: ['**/*.(test|spec).(ts|tsx|js|jsx)'],
    testPathIgnorePatterns: ['/.next/', '/node_modules/', '/coverage/'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest'
    }
};
