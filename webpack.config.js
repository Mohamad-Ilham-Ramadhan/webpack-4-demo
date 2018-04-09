const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	plugins: [	
		new HtmlWebpackPlugin({
			title: 'Belajar Webpack 4',
		}),
	],
}