require("dotenv").config({
    path: ".env.test"
})

module.exports = {
    transform: {
        "^.+\\.ts$": "ts-jest",
    },
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: "test\.ts$"
};