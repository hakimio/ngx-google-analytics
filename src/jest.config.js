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
        '@hakimio/ngx-google-analytics': "<rootDir>/dist/ngx-google-analytics/fesm2022/hakimio-ngx-google-analytics.mjs",
    },
    verbose: true
};
