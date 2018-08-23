const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        popup: './popup/index.js',
        background: './background/index.js',
        'contentScripts/index': './contentScripts/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src')],
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                ),
                use: {
                    loader: 'babel-loader?cacheDirectory=true'
                }
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.scss/,
                use: ['vue-style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.styl(us)?$/,
                use: ['vue-style-loader', 'css-loader', 'stylus-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '~': path.resolve(__dirname, 'node_modules'),
            vue$: 'vue/dist/vue.runtime.esm.js'
        },
        extensions: ['.js']
    },
    plugins: [
        new VueLoaderPlugin(),
        //set global variables
        new webpack.ProvidePlugin({
            "window.jQuery": "jquery",
            "$": "jquery",
            "jQuery": "jquery"
        }),
        new CleanWebpackPlugin(['./dist/', './dist-zip/']),
        new CopyWebpackPlugin([
            {from: 'assets', to: 'assets'},
            {from: 'manifest.json', to: 'manifest.json', flatten: true}
        ])
    ]
}

