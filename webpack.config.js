/* es5 for webpack*/
"use strict";
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var IS_PRODUCTION = (process.env.NODE_ENV === "production")? true: false;
var WEBPACK_DEV_SERVER_PORT = process.env.WEBPACK_DEV_SERVER_PORT || 2992;

var entry = (IS_PRODUCTION)?
   []
   : [ 'webpack-dev-server/client?http://localhost:' + WEBPACK_DEV_SERVER_PORT, 'webpack/hot/only-dev-server' ];
var es6Loaders = (IS_PRODUCTION)?
  []
  : ["react-hot"];

var plugins = (IS_PRODUCTION)?
  [ new ExtractTextPlugin("styles.css") ] :
  [ new webpack.HotModuleReplacementPlugin() ];

module.exports = {
  entry: entry.concat(["./app/app.es6"]),
  output: {
    path: __dirname + "/build",
    publicPath: (IS_PRODUCTION)? "":"build/", /* github pages needs 'build/', local neesd '/build/' */
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.(js|jsx|es6)$/, exclude:/node_modules/, loaders: es6Loaders.concat(["babel-loader"]) },
      { test: /\.css$/, loader: (IS_PRODUCTION)?
          ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'):
          "style-loader!css-loader!postcss-loader" },
      { test: /\.(jpg|png|svg)$/, loader: "url-loader?limit=8192"},
      { test: /\.json$/, loader: "json-loader"}
    ]
  },
  postcss: [
    require('autoprefixer-core'),
    require("postcss-custom-properties")(),
    require("postcss-calc")(),
    require("postcss-bem-linter")()
  ],
  plugins: plugins,
  resolve: {
    extensions: ["", ".web.js", ".js", ".jsx", ".es6"]
  }
}