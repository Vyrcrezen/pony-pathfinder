const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    ponySolver: "./src/pages/PonySolver.tsx",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Melody Bits",
      injext: true,
      minify: true,
      filename: "ponySolver.html",
      chunks: ["ponySolver"],
    }),
  ],
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
  },
};
