/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  // The test environment that will be used for testing
  testEnvironment: "jsdom",
  // Code that should be repeated for all tests
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
};
