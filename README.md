This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


### 异步编程
-> 是什麽？
	- 一种编程方式

-> 为什么?
	- 单线程每次只能接受一个请求
	- 当一个任务未执行完之前不能执行另外的任务容易造成程序堵塞
	- 使用异步编程能解决主线程被堵塞的问题
	- 程序执行的效率也会更高

-> 怎么样?
	- 子线程独立于主线程
	- 但是一旦开启子线程就会与主线程失去同步
	- 因此需要使用回调函数来提醒当子线程任务执行完之后与主线程同步

	- 异步Ajax的原理
		- 异步向服务端请求数据
		- 但是页面不刷新
		- 得到数据后直接显示

### Antd
-> 实现按需打包
	- antd
	- babel-plugin-import
	- react-app-rewired
	- less less-loader(5.0.0)
	
	- 添加配置文件并修改package.json里的配置
		- config-overrides.js
		- 这样当执行命令时就会去加载这个配置文件

		"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  	}

		const { override, fixBabelImports, addLessLoader } = require('customize-cra');

		module.exports = override(
			// 针对antd实现按需打包: 根据import来打包(使用babel-plugin-import)
			fixBabelImports('import', {
				libraryName: 'antd',
				libraryDirectory: 'es',
				style: true,  // 自动打包相关的样式
			}),

			// 自定义主题颜色
			addLessLoader({
				javascriptEnabled: true,
				modifyVars: { '@primary-color': '#1DA57A' },
			}),
		)

-> 表单数据获取
	- formRef = React.createRef()	(Antd v4)
	- <Form ref={this.formRef} />
	- this.formRef.current这个对象里有获取数据的所有方法

### 高阶函数与高阶组件
- 高阶函数
	- 一种特殊的函数
	- 接收函数为参数/返回值为函数

- 高阶组件
	- 本质上是一个函数
	- 接收一个组件(被包装组件)为参数返回一个新的组件(包装后的组件)
	- 可以对组件进行扩展
	- 高阶组件也是高阶函数 接收组件函数为参数 返回一个新的组件函数

- 配置对象
	- 属性名特定的一种对象

### ajax
- 接口请求函数
	- 定义接口请求函数的好处是当发送请求时不需要每次都指定url、param、type
	- 值需要指定请求参数就行

### 维持登录与自动登录
	- 使用localStorage实现数据的本地缓存
	- 或者使用store这个第三方库实现

## 注意点
	- 当使用export default默认暴露时 导入模块时名字自己取
	- 一般来说取文件名

## 动态配置菜单项
	- 将数据抽离
	- 将数据显示
	- 使用map || reduce	之一实现数据展现