const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const StyleLoader = require('style-loader');
const CSSLoader = require('css-loader');
const SassLoader = require('sass-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');
const FileLoader = require('file-loader');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            // {
            //     test: /\.scss$/,
            //     use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            // },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '/images/[name].[ext]'
                }
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new GenerateSW()
    ]
}
