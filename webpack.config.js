let path = require('path');
let VueLoaderPlugin = require('vue-loader/lib/plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let Resources = require('./Imports.js')

let conf = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        publicPath: ''
    },
    devServer: {
        overlay: true,
        contentBase: './dist',
        stats: 'errors-only'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/img'
                    },
                  },
                ],
            },
            {
                test: /\.mp3$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/sound'
                    },
                  },
                ],
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    }
                },
                exclude: '/node_modules/'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: 'vue-style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('autoprefixer'),
                                require('cssnano')
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader'
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                ...Resources
                            ]
                        }
                    }
                ] 
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/html/index.html',
            title: 'Vue Application',
            lang: 'ru',
            description: '',
            author: 'Andrey_Bokhan',
            keywords: ''
        })
    ],
    
};

module.exports = (env, options) => {
    let production = options.mode === 'production';
    conf.devtool = production
        ? false
        : 'eval-sourcemap';
    return conf;
} 