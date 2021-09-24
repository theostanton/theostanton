require("dotenv").config()

module.exports = {
    transform: {
        "^.+\\.ts$": "ts-jest",
    },
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: "test\.ts$"
};