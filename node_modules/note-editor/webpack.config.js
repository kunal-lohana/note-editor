const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoader = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const assetsSubDirectory = 'build';

module.exports = {
    entry: { 
        index: path.resolve(__dirname, "src", "js/index.js") 
    },
    output: {
        filename :'[name].[hashcode].js',
        path :path.resolve(__dirname ,'build'),
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.scss'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, "src"),
        }
    },
    plugins: [
        new VueLoader.VueLoaderPlugin(),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['build']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ]
};