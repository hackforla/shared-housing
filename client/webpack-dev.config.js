const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
<<<<<<< HEAD:server/k8s/flask-service-template/client/webpack.config.js
const ExtractTextPlugin = require("extract-text-webpack-plugin");
=======
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
>>>>>>> prototype-project-structure:client/webpack-dev.config.js

module.exports = {
    entry: {
        "index": path.resolve(__dirname, "./src/index.jsx")
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].js',
        publicPath: '/static/'
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `npm.${packageName.replace('@', '')}`;
                    },
                }
            }
        },
    },
    devtool: "source-map",

    resolve: {
        modules: [
            path.resolve(__dirname, "/src"),
            path.resolve(__dirname, "node_modules/")
        ],
        extensions: [".js", ".jsx", ".css"]
    },

    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
              test: /\.(jsx?)$/,
              exclude: /node_modules/,
              use: ['babel-loader']
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader
                  },
                  'css-loader',
                  'less-loader'
                ]
              }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "../dist/dashboard.html"
        }),
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].css"
        })
    ]
};