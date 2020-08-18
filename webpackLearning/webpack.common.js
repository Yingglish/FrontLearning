var path = require("path");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

let config = {
  mode: "none",
  entry: {
    main: "./src/main" //入口文件path.join(__dirname,'./src/main')
  },
  //这里配置的 output 意为打包后的文件会存储为 webpackLearning/dist/main.js 文件
  output: {
    path: path.resolve(__dirname, "dist"), //存放打包后文件的输出目录,必需
    filename: "js/[name].js" //filename 用于指定输出文件的名称
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve(__dirname, "src")
    }
  },
  module: {
    /**
     * 配置完成后可在js文件中import这些非js文件
     */
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "style-loader",
          "css-loader"
        ]
      },
      {
        // 加载 images 图像
        test: /\.(png|svg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style/[name].css"
    }),
    new htmlWebpackPlugin({
      // template:'index.html', // 指定模板页面，将来根据这个指定的路径生成内存中的页面
      filename: "index.html",
      title: "Webpack is awesome!"
    }),
    // new CleanWebpackPlugin(),
  ]
};

module.exports = config;
