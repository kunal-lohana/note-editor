const path = require("path"),
HtmlWebpackPlugin = require("html-webpack-plugin"),
{CleanWebpackPlugin} = require('clean-webpack-plugin'),
MiniCssExtractPlugin = require('mini-css-extract-plugin'),
TerserJSPlugin = require('terser-webpack-plugin'),
OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
CopyWebpackPlugin = require('copy-webpack-plugin'),
baseConfig = require('./webpack.config'),
merge = require('webpack-merge'),

BUILD_DIR = path.resolve(__dirname, 'build/src'),
// assetsSubDirectory = 'src';
config = {
    entry: { 
        index: path.resolve(__dirname, "src", "js/index.js")
    },
    output: {
        filename :'js/[name].[hashcode].js',
        path :BUILD_DIR
    },
    
    mode : 'production',
    module: {
        rules: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: ["babel-loader"]
          },
          {
              test: /\.vue$/,
              loader: 'vue-loader'
          },
          {
              test: /\.jsx$/,
              use : 'babel-loader'
          },
          {
            test: /\.s(a|c)ss$/,
            loader: [
                MiniCssExtractPlugin.loader,
                { loader: 'css-loader', options: { sourceMap: false } },
                { loader: 'sass-loader', options: { sourceMap: false } }
            ]
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: path.resolve(__dirname, 'build/img/[name].[hash:7].[ext]')
            }
          }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['build']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
            filename: path.resolve(__dirname, "build/src", "index.html"),
            inject: true,
            hash: true,
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true
              // more options:
              // https://github.com/kangax/html-minifier#options-quick-reference
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename:'css/[id].[hash].css',
            disable : false,
            ignoreOrder: true
        })
    ],
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all'
        }
    }
};

module.exports = merge(baseConfig, config)