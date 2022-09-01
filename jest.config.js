module.exports = {  
    preset: "react-native",
    setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
    testPathIgnorePatterns: [
        "/node_modules",
        "/android",
        "/ios",
        "node_modules/(?!variables/.*)",
        "./src/__tests__/jest/"
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // setupFiles: [
    //     "./src/__tests__/jest/setup.js"
    // ],
    moduleNameMapper: {
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy"
    }
};