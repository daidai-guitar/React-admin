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

- jsonp请求原理
  - 解决GET类型的Ajax请求跨域问题
  - 本身不是Ajax请求 而是一般的GET请求
  - 浏览器端
    - 定义好接收响应数据的函数foo
      - function foo(err, data) {
          console.log('Your public IP address is' + data.ip, err)
        }
    - 动态生成<script>标签来请求后台的接口(src就是接口的url)
      - function createScriptTag(src) {
          // 创建script元素
          const script = document.createElement('script')
          // 设置类型
          script.setAttribute('type', 'text/javascript')
          // 添加属性 发送请求 加载js代码
          script.src = src
          // 动态添加到文档中
          document.body.appendChild(script)
        }
  - 服务器端
    - 接收到请求后处理请求并产生结果数据 返回函数调用(传过去的回调函数)的js代码
    - 并将结果数据作为实参传入函数调用
    - foo(err, data)
  - 浏览器端
    - 收到响应自动执行函数调用的js代码(执行提前定义好的回调函数 获得响应数据)
    - window.onload = function() {
        // 页面加载完毕之后动态创建script标签
        createScriptTag('http://example.com/ip?callback=foo')
        const result = foo(err, data)
      }

### 维持登录与自动登录
	- 使用localStorage实现数据的本地缓存
	- 或者使用store这个第三方库实现

### 注意点
	- 当使用export default默认暴露时 导入模块时名字自己取
	- 一般来说取文件名
	- componentWillMount() {}
		- 组件将要渲染前调用
		- 只调用一次

  - 三角形的布局
    - 给一个盒子的上下左右都设置相同大小的边框

	- 数组的find方法返回一个条件符合的元素

	- React事件回调函数的参数问题
		- 在定义事件回调函数时不能直接传递参数
		- 解决: 在事件回调函数外面再包一层函数 在外层函数里面调用事件回调函数

	- this.setState()
		- 一旦状态更新就会重新渲染组件
		- 函数形式
			- this.setState(updater, [callback])
			-	updater为返回stateChange的函数 (state, props) => stateChange
			-	接收的state和props保证为最新值
		- 对象形式(函数形式的简写)
			- this.setState(stateChange, [callback])
			- stateChange为对象
			- callback为回调函数(可选)	在状态更新且界面更新后调用(重新渲染之后调用)
		- this.setState()更新状态时同步还是异步?
			- 在React中相关回调中	异步	生命周期钩子/React事件监听
				- 状态更新的优先级高于定时器等异步任务
				- 在一次回调中多次更新状态的操作
					- 函数形式	render一次状态更新多次(不合并)
					- 对象形式	render一次状态更新一次(合并)
					- 函函模式	不合并
					- 对函模式	不合并
					- 函对模式	合并
			- 在其他异步回调中		同步	定时器/Promise/原生事件...... 
			- 与函数形式和对象形式无关
		- 总结
			- 在状态不依赖之前的状态时使用对象语法
			- 在状态依赖之前的状态时使用函数语法

### 动态配置菜单项
	- 将数据抽离
	- 将数据显示
	- 使用map || reduce	之一实现数据展现

### 非路由组件转换为路由组件
	- withRouter(Component)
	- 高阶组件(高阶函数) 传入一个组件返回一个新组件

### 一点less语法
  - &表示当前元素
    - .header-top {
        &::after
    - }

