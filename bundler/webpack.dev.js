const  merge  = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

module.exports = merge(common, {
    mode: 'development',
    stats: 'errors-warnings',
    infrastructureLogging:
    {
        level: 'warn',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '../static'),
        },
        hot: false,
        open: true
    },
})

