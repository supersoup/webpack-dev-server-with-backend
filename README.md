# webpack-dev-server 和其它 backend 服务器配合工作

我们开发的时候经常需要从 backend 服务器上获取 api，这个服务器需要打包编译部署等阶段。我们可不可以不用那些复杂的操作，就像单独使用 `webpack-dev-server` 那样进行开发阶段的调试呢？

这里我提供两种方法：

## 方法一

从 backend 进入，把 devServer 作为静态文件提供者，而 api 则从自身获取。

需要注意的是，要让 publicPath 和 html 中的 `<script>` 标签设置为同一带有主机名和端口号对应的路径。

我的 devServer 端口是 8080，backend 端口是 9999. 我需要把 `output.publickPath` 设置为 `'http://localhost:8080/app/dist-webpack/'`，并且在入口 html 中，把标签写成 `<script src="http://localhost:8080/app/dist-webpack/0.bundle.js"></script>`。

打开两个命令行窗口。分别运行：

```
node server.js
```

```
npm run dev1
```

然后访问 `localhost:9999`


## 方法二

从 devServer 进入，从自身获取静态资源，并设置 proxy 把 api 转发到 backend 获取 response。

这个官方文档写得太简略，按照它的配置并不能成功。于是我到 github 上的 (示例)[https://github.com/webpack/webpack-dev-server/blob/master/examples/proxy-advanced/webpack.config.js] 查看，把 `devServer.proxy` 配置成:

```javascript
{
	'/api': {
		target: 'http://localhost:9999/',
		changeOrigin: true,
		pathRewrite: {
			"^/api": ""
		}
	}
}
```

这样，我发出一个 AJAX 请求 `/api/test/proxy`， proxy 就会帮我转发一个 `/test/proxy` 到我的 9999 端口的服务器上获取数据。

打开两个命令行窗口。分别运行：

```
node server.js
```


```
npm run dev2
```

然后，访问 `localhost:8080/index2.html`
