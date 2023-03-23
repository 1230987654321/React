# React 后台管理系统

本项目是使用 [Create React App](https://github.com/facebook/create-react-app) 来创建的.

## 项目目录

public 静态资源\
src 应用程序的源代码\
 /assets 项目资源文件，比如，图片 等\
 /components 通用组件\
 /pages 页面\
 /store mobx 状态仓库\
 /utils 工具，比如，token、axios 的封装等\
 App.js 根组件\
 index.css 全局样式\
 index.js 项目入口\
craco.config.js Create React App 配置文件

## 前置准备(安装依赖)

### npm install

安装基础依赖

## 如果缺失,请对照下面自行引入

### npm install sass --save-dev

使用 scss 预处理器

### npm install react-router-dom

配置基础路由

### npm install antd

antd 组件库

### npm install --save-dev @craco/craco

使用 craco 配置别名路径,可以使用 npm run eject 来释放配置

## 可用脚本

在项目目录中，可以运行：

### `npm start`

以开发模式运行应用程序。
打开 [http://localhost:3000](http://localhost:3000) 在浏览器中查看。

### `npm test`

在交互式监视模式下启动测试运行程序。

### `npm run build`

将生产应用程序生成到生成文件夹。

### `npm run eject`

**注意：这是一个单向操作。一旦弹出，就无法返回！**

如果您对构建工具和配置选项不满意，您可以随时弹出。此命令将从项目中删除单个生成依赖项。
