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
