const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');

module.exports = {
    entry: './src/js/index.js',
    plugins: [
        new CopyWebpackPlugin([{from: "src/index.html", to: path.resolve(__dirname, 'dist')}])
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            }
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};