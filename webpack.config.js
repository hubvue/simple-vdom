const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
module.exports ={
    devServer: {
        open: true,
        hot: true,
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./index.html",
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
}