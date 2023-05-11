const { merge } = require('webpack-merge');
//@ts-ignore
const wpCommon = require('./webpack.common.js');

module.exports = merge(wpCommon, {
    mode: 'production'
});