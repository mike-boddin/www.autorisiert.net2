const CopyWebpackPlugin = require('copy-webpack-plugin')

var path = require('path');

module.exports = {
    entry: './src/js/index.js',
    plugins: [
      new CopyWebpackPlugin([{from: "src/index.html", to: path.resolve(__dirname, 'dist')}])
  ] ,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};