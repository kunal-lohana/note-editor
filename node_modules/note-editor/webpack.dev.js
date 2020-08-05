const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require('./webpack.config');
const merge = require('webpack-merge');

const config = {
    entry: { 
        index: path.resolve(__dirname, "src", "js/index.js") 
    },
    output: {
        filename:'[name].[hashcode].js',
        path: path.resolve(__dirname, 'static'),
    },
    devtool : 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'src'), // contentBase: false, // since we use CopyWebpackPlugin.
        hot : true,
        compress: true,
        host: 'localhost',
        port: 8083,
        open: true,
        overlay: true
    },
    mode : 'development',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.jsx$/,
                use : 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                  
                    'vue-style-loader',// Creates `style` nodes from JS strings
                    'css-loader',// Translates CSS into CommonJS
                    'sass-loader'// Compiles Sass to CSS
                  ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  
                  'vue-style-loader',// Creates `style` nodes from JS strings
                  'css-loader',// Translates CSS into CommonJS
                  'sass-loader'// Compiles Sass to CSS
                ],
            },
            {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: path.resolve(__dirname, 'src/img/[name].[hash:7].[ext]')
            }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
            filename: 'index.html',
            inject: true,
        })
    ]
};

module.exports = merge(baseConfig, config)