const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: path.join(__dirname, "src/index.js"),
    form: path.join(__dirname, "src/form/form.js"),
    like: path.join(__dirname, "src/like/like.js"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "./src/index.html"),
      chunks: ["main"],
    }),

    new HtmlWebpackPlugin({
      filename: "form.html",
      template: path.join(__dirname, "./src/form/form.html"),
      chunks: ["form"],
    }),

    new HtmlWebpackPlugin({
      filename: "like.html",
      template: path.join(__dirname, "./src/like/like.html"),
      chunks: ["like"],
    }),
  ],
  stats: "minimal",
  devtool: "source-map",
  mode: "development",
  devServer: {
    open: false,
    contentBase: "./dist",
    inline: true,
    port: 4000,
  },
};
