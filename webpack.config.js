/**
 * @file 文件打包编译配置文件
 * @author luyongfang@baidu.com
 * */
var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = './node_modules';

module.exports = {
    entry: {
        // lib: './index.js',
        // demo: './examples/demo.js',
        doc: './docs/doc.js'
        // lib: './index.js'
        // demo: './examples/demo.js'
        // react: ['react'],
        // jquery: ['jquery']
        // app: './indey.js',
        // demoWj: './examples/demo_wj.js',
        // demoRxt: './examples/demo_rxt.js'
        // picCroper: './examples/picCroper.js'
    },
    output: {
        path: 'dist/js',
        publicPath: '../../',
        filename: '[name].bundle.js'
    },
    module: {
        noParse: [
            path.join(nodeModulesPath, '/react/dist/react.min'),
            path.join(nodeModulesPath, '/react-dom/dist/react-dom.min'),
            path.join(nodeModulesPath, 'antd/dist/antd.min'),
            path.join(nodeModulesPath, 'react-bootstrap/dist/react-bootstrap.min'),
            path.join(nodeModulesPath, 'immutable/dist/immutable.min')],
        loaders: [
            {
                test: /\.scss$/,
                loaders: 'style-loader!css-loader!sass-loader'
            }, {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
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
            }, {
                test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
                loader: 'url?prefix=font/&limit=10000'
            }
        ]
    },
    sassLoader: {
       // includePaths: [path.resolve(__dirname, nodeModulesPath.'/sass-loader')]
    },
    resolve: {
        // require('file') replace require('file.js')
        extensions: ['', '.js', '.jsx', '.json'],
        alias: {
            // 打包到一起,直接指向react文件，提高webpack的搜索速度，部署上线的时候指向react.min.js
            // 'react': path.join(nodeModulesPath, '/react/dist/react.min'),
            // 'react-dom':  path.join(nodeModulesPath, '/react-dom/dist/react-dom')
            // 'immutable': path.join(nodeModulesPath, 'immutable/dist/immutable'),
            // 'react-bootstrap':  path.join(nodeModulesPath, '/react-bootstrap/dist/react-bootstrap'),
        }
    },
    plugins: [
        /*new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),//引入全局jquery
        new CommonsChunkPlugin({
            name: ['jquery', 'react'], // 公共模块提取
            minChunks: Infinity
        })
        new webpack.optimize.UglifyJsPlugin({
            compress: {
           //     warning: false
            }
        })*/
    ]
    // import react导致文件变大，编译速度慢的解决方案
    /*externals: { //不打包到一起，在<script>中引入
        react: React
    },*/
};
