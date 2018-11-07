const glob = require("glob");
const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const generateHTMLPlugins = () =>
  glob.sync("./src/**/*.html").map(
    dir =>
      new HTMLWebpackPlugin({
        filename: path.basename(dir), // Output
        template: dir // Input
      })
  );

module.exports = {
  node: {
    fs: "empty"
  },
  entry: ["./src/js/app.js", "./src/style/main.scss"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      },
      {
        test: /\.(sass|scss)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.html$/,
        loader: "raw-loader"
      }
    ]
  },
  plugins: [
    ...generateHTMLPlugins(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inlineSource: ".(js|css)$" // embed all javascript and css inline
    }),
    new HtmlWebpackInlineSourcePlugin()
  ],
  stats: {
    colors: true
  },
  devtool: "source-map"
};
