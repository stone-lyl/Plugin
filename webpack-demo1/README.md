### 目录

[关于此文](#关于此文)

[在学习webpack之前，我们先去了解它的作用](#在学习webpack之前我们先去了解它的作用)

[它与其他其他前端工具（gulp，grunt）有什么差别呢](#它与其他其他前端工具gulpgrunt有什么差别呢)

[安装](#安装)

[webpack.config.js 配置结果](#webpackconfigjs-配置结果)

[webpack 开始简单配置](#webpack-开始简单配置)

[文件结构](#文件结构)

[demo地址](#demo地址)

[参考连接](#参考连接)

----

### 关于此文
本文是笔者初学webpack后的一个简单总结和重新思考的过程。文章中加入了更多的认识和理解，关于配置就比较简陋了。希望能帮助到大家，有误的地方也请多多指正 (^^ゞ 。最后，祝大家元旦快乐ヾ(≧▽≦*)o

### 在学习webpack之前，我们先去了解它的作用
1.  如webpack官网所示，它分析你的项目结构将其打包成适合浏览器加载的模块。但值得注意的是，webpack并不会在浏览器内加载解释器，所以它属于一个预编译模块的方案。
![图片.png-27.6kB][1]
2.  在打包前我们也需要做一些转换。这些转换主要在`loader`中进行（列如将`scss`转换成`css`）。同时，在webpack中有各种各样的功能，例如：模块热加载，这就需要`plugin`了。也因为这两个部分，webpack 变得丰富而复杂了。

### 它与其他其他前端工具（gulp，grunt）有什么差别呢
**`gulp/grunt`**: 他们是一个中能优化前端流程的工具，他们也可以转换 **`scss`**,`less`，实现自动刷新页面的功能。
**`webpack`**: 它则属于一个预编译模块方案（模块打包工具），我们现在的前端代码开始分模块进行构建，则会用到`import  "./a.js";` 、`require ("a.js");`   等方法。但是浏览器是不认识这样的方法。这事，`webpack` 就出现了，它采用预编译的方式，在代码加载到页面前，把这些模块引用的方式转换成浏览器可以识别的js代码。

### 安装
**创建package.json**

    npm init

**安装webpack依赖**：
```
// 安装到项目目录
npm i -D webpack
```

### webpack.config.js 配置结果

```
// __dirname 是node.js一个全局变量，指向当前执行的脚本所在文件目录。
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'app/main.js'), // 唯一入口文件
    output: {
        path: path.resolve(__dirname, 'build'), // 打包后文件存放的位置
        filename: 'js/[name].js', // 打包后输出文件的文件名
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),  // 服务器所加载的页面目录
        inline: true,
        port: 2333,
        hot: true,
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true, // 指定启用css modules
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')],  // 为css在不同浏览器中添加前缀
                            browser: ['last 5 versions']        // 浏览器最新的五个版本。
                        }
                    },
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true, // 指定启用css modules
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')],  // 为css在不同浏览器中添加前缀
                            browser: ['last 5 versions']        // 浏览器最新的五个版本。
                        }
                    },
                    { loader: 'less-loader' },
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: '/app',
                exclude: /node_modules/,
                query: { presets: ['latest'] }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),      // 被编译的HTML文件路径 
            filename: path.resolve(__dirname, 'build/index.html'),  // 编译后的HTML文件存放路径
            inject: 'body',      // 编译后的js被插入HTML的body中。
            title: 'webpack is great!', //可以通过模板引入HTML文件中。
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
};

```

上面是我们常见的webpack文件，这里我们先通过 entry, output, loader(上面代码中的module模块), plugins对webpack进行讲解。

**entry**: 入口文件，告诉webpack文件入口在哪里。可用三种方式表示，字符串，数组，对象。 

```
entry: path.resolve(__dirname, '/app/main.js'), // 唯一入口文件
```

**output**: 只能有一个配置文件。需要两个基本的配置： a filename, path
```
output: {
        path: path.resolve(__dirname, 'build'), // 打包后文件存放的位置
        filename: 'js/[name]-[chunkhash].js', // 打包后输出文件的文件名
}
```
chunkhash:不同模块文件，生成不同的打包文件，具有独特的标志，在修改a.js文件后，只对a.js进行重新打包。 除了chunkhash以外， 一般出口文件为：'bunld.js', '[name].js]', '[name]-[hash].js'。
![图片.png-27.6kB][2]

**publicPath**
在打包后的js标签中添加前缀。
```
 output: {
        path:　path.resolve(__dirname, 'build'),
        filename: 'js/[name]-[chunkhash].js',   // 为每一个生成的js,带上hash
        publicPath: 'http://cdn.com/'   // 在打包后的js标签中添加前缀。
    }
```
效果：
![图片.png-47.5kB][3]

使用上述的cdn或者hash的方式: 生成模式下更新内嵌css,html文件里url值。

**loader**： 资源转换器。（所有的资源都是模块，例如less通过loader可转换成css）。 test:正则。 loader:编译方法。
**plugin**： 做loader无法做到的功能，以对象形式引入。例如模块热加载。

### webpack 开始简单配置
我们这里写一个简单的demo。
> 只讲解webpack中loader, plugin 中一两个常用的配置，方便大家理解配置的意义。

我们的目录结构：
![图片.png-13.6kB][4]

index.html:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>webpack demo1</title>
</head>
<body>
    <div id="app">
        hello, webpack !
    </div>
</body>
</html>
```

main.js:

```
const app = document.getElementById('app');
app.innerText = "change app text!";
```

webpack.config.js

```
// __dirname 是node.js一个全局变量，指向当前执行的脚本所在文件目录。
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'app/main.js'), // 唯一入口文件
    output: {
        path: path.resolve(__dirname, 'build'), // 打包后文件存放的位置
        filename: 'js/[name]-[chunkhash].js', // 打包后输出文件的文件名
    },
    module: {
    },
    plugins: [
    ],
};
```

我们可以看到，我们并没有在index.html 中插入js。所以打开index.html效果如下：

![图片.png-1.8kB][5]

现在我要达到js可以自动插入html的效果。

####在webpack中配置html文件
**安装插件**： `npm install -D html-webpack-plugin`

**htmlWebpackPlugin的相关配置**

```
plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),      // 被编译的HTML文件路径 
            filename: path.resolve(__dirname, 'build/index.html'),  // 编译后的HTML文件存放路径
            inject: 'body',      // 编译后的js被插入HTML的body中。
            title: 'webpack is great!' //可以通过模板引入HTML文件中。
        }),
    ],
```

然后我们运行webpack，我们需要在控制台输入：

```
webpack --config webpack.config.js --progress --colors
```

在运行webpack.config.js，（--progress）显示它的打包模块的进度：..%。
如果报错 无法识别webpack 请全局安装webpack。
运行后我们控制台表现为：
![图片.png-28kB][6]

1.  asset: 打包生成的文件 
    size:文件大小 
    Chunks:打包的分块 
    Chunk Names:打包的块名称。

2.  打包成功的各个模块。
    然后我们发现 build 文件夹新增了几个文件。

    ![图片.png-5.2kB][7]

我们打开其中index.html 会发现js已经被插入其中了。

![图片.png-8.1kB][8]

点击build中的index.html 我们会发现页面已经发生了改变。

![图片.png-0.7kB][9]

我们文件插入成功了！

最后，在`package.json`中配置运行方式。

![图片.png-7.3kB][10]

以后我们只需要在控制台输入：`npm run webpack`即可。

#### css/less/sass 的处理
安装: `npm i -D style-loader css-loader postcss-loader autoprefixer`
作用：  
        css-loader: 处理css文件中的url()等
        style-loader:将css样式插入html。
        postcss-loader: 灰常的强大，一个后处理器，有很多插件 如：autoprefixer 为一些css属性在不同浏览器上的引用，加上对应的前缀。

1. 以下面的代码为例，loader的执行顺序为`postcss-loader css-loader style-loader ` ，loader顺序和他们执行的功能是有关的，如果打乱可能会报错。

```
    module: {
        loaders: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true, // 指定启用css modules
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')],  // 为css在不同浏览器中添加前缀。
                            browser: ['last 5 versions']        // 浏览器最新的五个版本。
                        }
                    },
                ]
            },
        ]
    }
```
2. 

```
 loader: 'style-loader!css-loader!postcss-loader'
loaders: ['style-loader', 'css-loader',  'postcss-loader']  // 数组处理从右到左。
}
```
webpack3.0以后推荐使用第一种方式，我们在main.js 文件中引入的 css: `import "./style.css"`。
现在我们看执行后的效果。
![image_1c2eprhag15hmvu7umla5c1qh09.png-38.2kB][11]
css样式被插入html中了！U•ェ•*U

如果我们使用的是less 或者 sass只需要添加如下操作。
1. 

    npm i -D less-loader less
    npm i -D sass-loader sass

2.  webpack.config.js中：

```
修改 test:
test: /\.less$/,
在use后面添加一个对应的loader 即可。
{   loader: 'less-loader'   },
```
3.  最后记得修改对应的文件后缀。

#### 使用babel-loader 转换ES
我们修改main.js

```
import "./style.less";
const app = document.getElementById('app');
app.innerText = "change app text!";
let changeText = () => {
    return 'function change text!!###!';
}
app.innerText = changeText();
```
同时我们也发现了，每次运行`npm run webpack` 都会打包出新的带有hash的main.js。
可以配置`clean-webpack-plugin` 来清除，但这里我们简单的修改：

```
    output: {
        path: path.resolve(__dirname, 'build'), // 打包后文件存放的位置
        filename: 'js/[name].js', // 打包后输出文件的文件名
    },
```
babel转换：
1.  `npm install -D babel-loader babel-core babel-preset-latest`
2.  

```
 loaders: [
            {
                test: /\.js$/,      // 正则匹配loader对象
                loader:'babel-loader',  
                include: '/src',    // 使用babel-loader 转换的目录
                exclude: /node_modules/,  //排除的目录
                query: { presets: ['latest'] }  //使用的版本控制。
            }
        ]
```

然后打开build中的index文件：

![图片.png-9.8kB][12]

#### 自动刷新+ 模块热加载
1. 安装： `npm i -D webpack-dev-server`，webpack-dev-server是一个小型的Node.js Express服务器。
2. 我们在output 后面添加一项。

```
 devServer: {
        contentBase: path.resolve(__dirname, 'build'),  // 服务器所加载的页面目录
        inline: true,   
        port: 2333,
        hot: true,  //这需要配合Hot Module Replacement实现模块热加载。
    },
```
3.  在plugins中添加一个配置项，热模块替换(Hot Module Replacement)只替换更新的部分,而不是页面重载。
它是webapck 自带的内容，所以不需要安装：`new webpack.HotModuleReplacementPlugin()`

4.  最后我们需要在scripts中添加配置项：　
![图片.png-8.7kB][13]

然后我们在控制台输入　npm run server 时，就可以在本地起一个服务了，效果如下：
![图片.png-6.4kB][14]

如果不想每次启服务的时候打开页面可以修改scripts为：
`"server": "webpack-dev-server --config webpack.config.js"`

### 文件结构
**目录结构**：

![图片.png-18.4kB][15]

**package.json**:

```
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "webpack": "webpack --config webpack.config.js --progress --colors",
    "server": "webpack-dev-server --open"
  },
  "devDependencies": {
    "autoprefixer": "^7.2.3",
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-latest": "^6.24.1",
    "css-loader": "^0.28.7",
    "html-webpack-plugin": "^2.30.1",
    "less": "^2.7.3",
    "less-loader": "^4.0.5",
    "postcss-loader": "^2.0.9",
    "style-loader": "^0.19.1",
    "webpack": "^3.10.0",
    "webpack-dev-server": "^2.9.7"
  },
```
**webpack.config.js**:
[webpack.config.js 配置结果](#webpackconfigjs-配置结果).

### demo地址
点击跳转： <a href="https://github.com/stone-lyl/Plugin/tree/master/webpack-demo1"> webpack-demo1 </a>

### 参考连接
https://webpack.js.org
https://www.zhihu.com/question/37020798/answer/71621266
https://www.imooc.com/learn/802

  [1]: http://static.zybuluo.com/Jacqueline/mq0pcu936kdshjhmkhgn4dci/%E5%9B%BE%E7%89%87.png
  [2]: http://static.zybuluo.com/Jacqueline/cwnn4w8alnvb7qetib1j5ern/%E5%9B%BE%E7%89%87.png
  [3]: http://static.zybuluo.com/Jacqueline/o8v2hrbimrq3exitavpfjo8c/%E5%9B%BE%E7%89%87.png
  [4]: http://static.zybuluo.com/Jacqueline/5zgbku7ba3xqzcu3e1w7nnvs/%E5%9B%BE%E7%89%87.png
  [5]: http://static.zybuluo.com/Jacqueline/l6tygnft7cu9pc8a6d9as0io/%E5%9B%BE%E7%89%87.png
  [6]: http://static.zybuluo.com/Jacqueline/1pxaqq2ezh1me89eb7a4sgb3/%E5%9B%BE%E7%89%87.png
  [7]: http://static.zybuluo.com/Jacqueline/q9r2o8c9rw1ltka0mde4wnd5/%E5%9B%BE%E7%89%87.png
  [8]: http://static.zybuluo.com/Jacqueline/9ikgp6taikjadumc4l7vlyr3/%E5%9B%BE%E7%89%87.png
  [9]: http://static.zybuluo.com/Jacqueline/3xctc14hr2w2m42c62pr703h/%E5%9B%BE%E7%89%87.png
  [10]: http://static.zybuluo.com/Jacqueline/zutjuojbdqzza2huei980dfk/%E5%9B%BE%E7%89%87.png
  [11]: http://static.zybuluo.com/Jacqueline/pmdptaxoh5h1dqcbij111hjp/image_1c2eprhag15hmvu7umla5c1qh09.png
  [12]: http://static.zybuluo.com/Jacqueline/aq6r276tahhe8x42hzhh1uge/%E5%9B%BE%E7%89%87.png
  [13]: http://static.zybuluo.com/Jacqueline/yyl3hsazhavdhjq6c94m7jwa/%E5%9B%BE%E7%89%87.png
  [14]: http://static.zybuluo.com/Jacqueline/e5zc14tyqi3xyu9dxe08s64u/%E5%9B%BE%E7%89%87.png
  [15]: http://static.zybuluo.com/Jacqueline/7tgtukal7pxb0310u9lu24i2/%E5%9B%BE%E7%89%87.png
