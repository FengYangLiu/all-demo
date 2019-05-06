# webpack4简单demo

v4.30

## 起步

主要是搭建基础架子，添加需要的依赖与基础讲解

## 资源管理

对css/image/font/xml 的处理

## 管理输出

1. 通过动态的更改hash生成对应的bundle文件，修改配置等
2. 如果新增入口或者添加入口会出现老文件没有更新入口，使用`HtmlWebpackPlugin`解决问题
3. 由于每次生成文件，dist会有很多不相关的文件见,这时候就可以使用`clean-webpack-plugin`清理
4. webpack 通过 manifest，可以追踪所有模块到输出 bundle 之间的映射

## 开发环境

1. `webpack.config.js` 中添加 `mode`:'development' 来作为开发环境的标识
2. 在开发环境中使用`source map`来追踪错误，在配置中配置`devtool: 'inline-source-map'`
3. `webpack --watch` 模式在有依赖更改的时候会进行跟着变化，但是要刷新浏览器
4. `webpack-dev-server` 可以解决不用刷新浏览器
5. `webpack-dev-middleware`是一个封装器(wrapper)，它可以把 webpack 处理过的文件发送到一个 server。 webpack-dev-server 在内部使用了它，然而它也可以作为一个单独的 package 来使用，以便根据需求进行更多自定义设置。

## 模块热替换

1. 模块热替换(hot module replacement 或 HMR)是 webpack 提供的最有用的功能之一。它允许在运行时更新所有类型的模块，而无需完全刷新
2. HMR 不适用于生产环境，这意味着它应当用于开发环境。
3. `webpack`内置了 热替换插件`HotModuleReplacementPlugin`
4. 可以在nodejs的API中使用热替换
5. 热替换事件绑定后热更新后还是老的事件，热替换容易让人失误，但是有很多插件支持热替换

## tree shaking

这部分主要是删除多余的代码和在生产环境中压缩代码，其主要有几点

1. 使用 ES2015 模块语法（即 import 和 export）。
2. 确保没有 compiler 将 ES2015 模块语法转换为 CommonJS 模块
3. 在项目 package.json 文件中，添加一个 "sideEffects" 属性。
4. 通过将 mode 选项设置为 production，启用 minification(代码压缩) 和 tree shaking。

## 生产环境

生产环境与开发环境的需求不一致，有极大的区别，可以通过`webpack-merge`来区分编写后合并

1. 区分生产和开发环境通过`webpack-merge`来编写公共与区分两者
2. 在`npm script` 区分使用配置和设置环境mode，早期使用`process.env.NODE_ENV`，webpack4内部通过mode来处理实际一样
3. webpack4 生产环境默认会压缩
4. 生产环境与开发环境的source map 不一样
5. 最小css和压缩一样
6. 可以通过cli来代替