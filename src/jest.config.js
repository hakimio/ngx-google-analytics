module.exports = {
    transform: {
        '^.+\\.ts$': ['ts-jest', {
            diagnostics: false
        }]
    },
    modulePathIgnorePatterns: [
        "<rootDir>/projects/"
    ],
    moduleNameMapper: {
        'ngx-google-analytics': "<rootDir>/dist/ngx-google-analytics/fesm2022/ngx-google-analytics-4.mjs",
    },
    verbose: true
};
