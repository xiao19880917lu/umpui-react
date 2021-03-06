/**
 * @file 文件打包编译配置文件
 * @author luyongfang@baidu.com
 * */
// var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = '../node_modules';

module.exports = {
    entry: {
        demo: './resources/jsx/demo.js'
    },
    output: {
        path: 'dist/js',
        filename: '[name].bundle.js'
    },
    module: {
        noParse: [path.join(nodeModulesPath, '/react/dist/react.min')],
        loaders: [
            {
                test: /\.scss$/,
                loaders: 'style-loader!css-loader!sass-loader'
            }, {
                test: /.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot']
            }, {
                test: /\.(js|jsx)$/,
                loaders: ['babel-loader?optional=runtime'],
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                    compact: false
                }
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    sassLoader: {
       // includePaths: [path.resolve(__dirname, nodeModulesPath.'/sass-loader')]
    },
    resolve: {
        // require('file') replace require('file.js')
        extensions: ['', '.js', '.jsx', '.json']
        /*alias: { // 打包到一起,直接指向react文件，提高webpack的搜索速度，部署上线的时候指向react.min.js
            'react': path.join(nodeModulesPath, '/react/dist/react'),
            'immutable': path.join(nodeModulesPath, 'immutable/dist/immutable'),
            'react-dom':  path.join(nodeModulesPath, '/react-dom/dist/react-dom'),
            'react-bootstrap':  path.join(nodeModulesPath, '/react-bootstrap/dist/react-bootstrap'),
        }*/
    },
    plugins: [
        /*new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),//引入全局jquery
        new CommonsChunkPlugin({
            name: ['jquery', 'react'], // 公共模块提取
            minChunks: Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warning: false
            }
        })*/
    ]
    // import react导致文件变大，编译速度慢的解决方案
    /*externals: { //不打包到一起，在<script>中引入
        react: React
    },*/
};
