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
