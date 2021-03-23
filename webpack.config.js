const path = require('path');

module.exports = {
    entry: ['@babel/polyfill','./src/index.js'],
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: /node_modules/,
                use : {
                    loader: 'babel-loader',
                    options: {
                        presets :['@babel/preset-env'],
                        plugins :['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.scss$/,
                use : [
                    "style-loader",
                    "css-loaser",
                    "sass-loader"
                ],
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'source-map',
    mode: 'development'
}