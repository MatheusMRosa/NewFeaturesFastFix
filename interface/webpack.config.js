const webpack = require('webpack');
module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
   
    devServer: {
        port: 3000,
        contentBase: './public'
    },
    devtool: 'source-map',
    resolve: {
        extensions: [".js", ".json", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react', 'stage-2']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpeg|jpg|)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    }
};