/**
 * Created by Administrator on 2016/11/5 0005.
 */
module.exports = {
	// configuration
	context: './',
	entry: "./app/entry/main.js",
	output: {
		path: "./app/dist-webpack",
		publicPath: '/app/dist-webpack/',

		filename: "[id].bundle.js",
		chunkFilename: '[id].bundle.js'
	},
	resolve: {
		alias: {
			'inner': './inner'
		}
	},
	devtool: '#inline-source-map',
	devServer: {
		inline: true,

		/*
		 * 和其他 backend 共同工作的方法二：从 devServer 进入，从自身获取静态资源，并设置 proxy 把 api 转发到 backend 获取 response。
		 * 官方网站的示例并不能有效。可以参考 github 上的示例：https://github.com/webpack/webpack-dev-server/blob/master/examples/proxy-advanced/webpack.config.js
		 * */
		proxy: {
			'/api': {
				target: 'http://localhost:9999/',
				changeOrigin: true,
				pathRewrite: {
					"^/api": "/api"
				}
			}
		}
	}
};
