module.exports = {
    transform: {
        '^.+\\.ts$': ['ts-jest', {
            diagnostics: false
        }]
    },
    modulePathIgnorePatterns: [
        "<rootDir>/dist/"
    ],
    verbose: true
};
