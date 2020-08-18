# 加载非 js 文件
webpack 最出色的功能之一就是，除了 JavaScript，还可以通过 loader 引入任何其他类型的文件

## 加载CSS文件
- 第一步： 安装 css 和 style 模块解析的依赖 style-loader 和 css-loader
```bash
npm install --save-dev style-loader css-loader
```
- 第二步： 添加 css 解析的 loader
```js
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```
1. `css-loader`： 辅助解析 js 中的 `import './main.css'`
2. `style-loader`: 把 js 中引入的 css 内容 注入到 html 标签中，并添加 style 标签.依赖 `css-loader`
> 你可以在依赖于此样式的 js 文件中 导入样式文件，比如：import './style.css'。现在，当该 js 模块运行时，含有 CSS 字符串的`<style>`标签，将被插入到 html 文件的 `<head>`中
- 第三步： 编写 css 文件和修改 js 文件

在 src 目录中添加 style.css文件
```
 webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- style.css
    |- index.js
  |- /node_modules
```
src/style.css
```css
.hello {
  color: red;
}
```
修改 js 文件
```js
  import _ from 'lodash';
+ import './style.css';

  function createDomElement() {
    let dom = document.createElement('div');
    dom.innerHTML = _.join(['aicoder', '.com', ' wow'], '');
+   dom.className = 'hello';
    return dom;
  }

  document.body.appendChild(createDomElement());
```
## CSS压缩
压缩 css 插件：`optimize-css-assets-webpack-plugin`

安装
```
npm i -D optimize-css-assets-webpack-plugin
```
```js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [autoprefixer({ browsers: ['> 0.15% in CN'] })]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name][hash].css',
      chunkFilename: '[id][hash].css'
    })
  ],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  }
};
```
## 加载图片与图片优化
在 css 文件或者 sass 文件中添加如下代码
```css
$red: #900;
$size: 20px;

.box {
  height: 30px*2;
  font-size: $size;
  transform: translate3d( 0, 0, 0 );
+ background: url('../static/1.jpeg')
}
```
运行打包发现如下错误
```bash
ERROR in ./src/static/1.jpeg 1:0
Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type.
```
解决方案：`file-loader`处理文件的导入
```bash
npm install --save-dev file-loader
```
webpack.config.js
```js
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```
此时运行打包，发现 dist 目录多了一个图片文件，另外报错不再出现

那更进一步，图片如何进行优化呢？

`image-webpack-loader`可以帮助我们对图片进行压缩和优化
```bash
npm install image-webpack-loader --save-dev
```
```js
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
          use: [
            'file-loader',
+           {
+             loader: 'image-webpack-loader',
+             options: {
+               mozjpeg: {
+                 progressive: true,
+                 quality: 65
+               },
+               optipng: {
+                 enabled: false,
+               },
+               pngquant: {
+                 quality: '65-90',
+                 speed: 4
+               },
+               gifsicle: {
+                 interlaced: false,
+               },
+               webp: {
+                 quality: 75
+               }
+             }
+           },
          ]
        }
      ]
    }
  };
```
### 更进一步处理图片成 base64
`url-loader`功能类似于 `file-loader`，可以把 url 地址对应的文件，打包成 `base64` 的 `DataURL`，提高访问的效率

安装
```
npm install --save-dev url-loader
```
webpack.config.js
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif|jpeg|ico|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader', // 根据图片大小，把图片优化成base64
            options: {
              limit: 10000
            }
          },
          {
            loader: 'image-webpack-loader', // 先进行图片优化
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  }
};
```
## 字体的处理（同图片）
由于 css 中可能引用到自定义的字体，处理也是跟图片一致
```js
const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
+       {
+         test: /\.(woff|woff2|eot|ttf|otf)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```
