const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
            mimetype: 'image/jpg',
            limit: 1 * 1024,
        },
    },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
        patterns: [
            { from: 'server.js', to: './' }
        ]
    }),

    new HtmlWebpackPlugin({
      title: "Pony Game",
      injext: true,
      minify: true,
      filename: "ponySolver.html",
      chunks: ["ponySolver"],
      publicPath: "./"
    }),
  ],
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
  },
};
