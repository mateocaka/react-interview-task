export default {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['file:///C:/Users/User/Desktop/mateocaka/src/setupTests.js'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/fileMock.js',
    },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['@babel/preset-env', '@babel/preset-react'] }],
    },
    transformIgnorePatterns: [
        '/node_modules/(?!uuid)/',
    ],
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    extensionsToTreatAsEsm: ['.jsx', '.ts', '.tsx'],
};
