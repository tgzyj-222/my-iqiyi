const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    mode: "development",
    entry: "./src/script/main1.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [{
                test: require.resolve('jquery'),
                use: [{
                        loader: 'expose-loader',
                        options: '$'
                    },
                    {
                        loader: 'expose-loader',
                        options: 'jQuery'
                    }
                ]
            },
            { //加载css
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            { //配置图片文件的包
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '爱奇艺',
            filename: "index1.html",
            template: "./src/index1.html",
            chunks: ["index1", "vendor"],
            minify: {
                removeComment: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            titel: "详情页",
            filename: "details.html",
            template: "./src/details.html",
            chunks: ["details", "vendor"],
            minify: {
                removeComment: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            titel: "登陆",
            filename: "login.html",
            template: "./src/login.html",
            chunks: ["login", "vendor"],
            minify: {
                removeComment: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            titel: "注册",
            filename: "registry.html",
            template: "./src/registry.html",
            chunks: ["registry", "vendor"],
            minify: {
                removeComment: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            titel: "购物车",
            filename: "cartlist.html",
            template: "./src/cartlist.html",
            chunks: ["cartlist", "vendor"],
            minify: {
                removeComment: true,
                collapseWhitespace: true
            }
        }),
        new CleanWebpackPlugin()
    ]
}