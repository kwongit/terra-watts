const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/contentful-integration.ts", // Update entry point to TypeScript file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Match TypeScript files
        exclude: /node_modules/,
        use: {
          loader: "ts-loader", // Use ts-loader to transpile TypeScript files
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], // Add .ts extension to resolve TypeScript files
  },
  plugins: [new Dotenv()],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
  mode: "development",
};
