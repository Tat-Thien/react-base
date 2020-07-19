const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const paths = {
    in: `${__dirname}/../../src/index.jsx`,
    out: {
        path: `${__dirname}/../../dist/`,
        name: 'main.jsx'
    }
};
console.log(paths)

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: paths.in,
    mode: isProd ? 'production' : 'development',
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
            loader: 'babel-loader'
            },
        },
        {
            test: /\.html$/,
            use: [
            {
                loader: 'html-loader'
            }
            ]
        }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        path: paths.out.path,
        filename: paths.out.name,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            Utilities: path.resolve(__dirname, '../../src/utils/'),
            Scenes: path.resolve(__dirname, '../../src/scenes/'),
            Components: path.resolve(__dirname, '../../src/components/')
        }
    },
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, '../../dist'),
        historyApiFallback: true
    }
};