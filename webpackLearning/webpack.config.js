var path = require("path");
var MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 把css样式从js文件中提取到单独的css文件中
const htmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

let config = {
  mode: "none",
  // 配置需要打包的入口文件，值可以是字符串、数组、对象。
  // 1. 字符串： entry： './entry'
  // 2. 字符串： entry：[ './entry1','entry2'] (多入口)
  // 3. 对象：   entry： {alert/index': path.resolve(pagesDir, `./alert/index/page`)}
  // 多入口书写的形式应为object，因为object,的key在webpack里相当于此入口的name,
  entry: {
    main: "./src/main" //入口文件path.join(__dirname,'./src/main')
  },
  //这里配置的 output 意为打包后的文件会存储为 webpackLearning/dist/js/main.js 文件
  output: {
    // 输出文件配置，output 输出有自己的一套规则，常用的参数基本就是这三个
    // path: 表示生成文件的根目录 需要一个**绝对路径** path仅仅告诉Webpack结果存储在哪里
    path: path.resolve(__dirname, "./dist"), //存放打包后文件的输出目录,必需
    
    // publicPath 参数表示的是一个URL 路径（指向生成文件的跟目录），用于生成css/js/图片/字体文件
    // 等资源的路径以确保网页能正确地加载到这些资源.
    // “publicPath”项则被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值.
    // 例如，在localhost（即本地开发模式）里的css文件中边你可能用“./test.png”这样的url来加载图片，
    // 但是在生产模式下“test.png”文件可能会定位到CDN上并且你的Node.js服务器可能是运行在HeroKu上边的。
    // 这就意味着在生产环境你必须手动更新所有文件里的url为CDN的路径。
/*       
      开发环境：Server和图片都是在localhost（域名）下
      .image { 
      background-image: url('./test.png');
      }
      生产环境：Server部署下HeroKu但是图片在CDN上
      .image { 
       background-image: url('https://someCDN/test.png');
      } 
*/
 // publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,

    // filename 属性表示的是如何命名出来的入口文件，规则是一下三种： 
    // [name] 指代入口文件的name，也就是上面提到的entry参数的key，因此，我们可以在name里利用/，即可达到控制文件目录结构的效果。
    // [hash]，指代本次编译的一个hash版本，值得注意的是，只要是在同一次编译过程中生成的文件，这个[hash].js 
    //的值就是一样的；在缓存的层面来说，相当于一次全量的替换。
    filename: "js/[name].js" //filename 用于指定输出文件的名称
  },
   // 用来配置依赖文件的匹配，如依赖文件的别名配置、模块的查找目录、默认查找的
  // 文件后缀名
  // resolve.root 该选型用来制定模块查找的根路径，必须为**绝对路径**，值可以
  // 是路径字符串或者路径数组若是数组，则会依次查找
  resolve: {
    // 用来配置依赖文件的别名，值是一个对，该对象的键是别名，值是实际路径
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve(__dirname, "./src")
    }
  },
  module: {
    /**
     * 配置完成后可在js文件中import这些非js文件
     */
    rules: [
      {
        test: /\.css$/, //test: /\.(sa|sc|c)ss$/,  // 可以打包后缀为sass/scss/css的文件
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     // 这里可以指定一个 publicPath
          //     // 默认使用 webpackOptions.output中的publicPath
          //     // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
          //     // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
          //   }
          // },
          MiniCssExtractPlugin.loader,
          // 生产模式直接使用 `"vue-style-loader",`即可
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"] //加载器按照从尾到头的顺序使用插件
      },
      {
        // 加载 images 图像
        test: /\.(png|svg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 这里的配置和webpackOptions.output中的配置相似
      // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
      // filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
      // chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
      filename: "style/[name].css"
    }),
    //HtmlWebpackPlugin插件，可以把打包后的 CSS 或者 JS 文件引用直接注入到 HTML 模板中，这样就不用每次手动修改文件引用了
    new htmlWebpackPlugin({
      template: 'public/index.html', // 默认目录为当前工作目录 指定模板页面，将来根据这个指定的路径生成内存中的页面
      filename: "index.html",
      title: "Webpack is awsome!",
      hash: true, // 在打包好的bundle.js后加上hash串
    }),
    new VueLoaderPlugin({
      //template: "./src/App.vue"
    }), // 使用vue-loader必须引入这个插件
    new CleanWebpackPlugin({
    }) //自动清理
  ]
};

module.exports = config;
