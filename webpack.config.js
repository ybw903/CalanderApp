const path = require('path');

module.exports = {
    entry: ['@babel/polyfill','./src/client/js/index.js', './src/client/sass/main.scss'],
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src/client/js')
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
                    "css-loader",
                    "sass-loader"
                ],
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'source-map',
    mode: 'development'
}