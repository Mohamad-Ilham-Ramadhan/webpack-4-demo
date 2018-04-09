const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	plugins: [	
		new HtmlWebpackPlugin({
			title: 'Belajar Webpack 4',
		}),
	],

	devServer: {
		contentBase: path.join(__dirname, "meledog"),
		// Display only errors to reduce the amount of output.
		stats: 'errors-only',

		// Parse host and port from env to allow customization.
		// 
		// If you use Docker, Vargant or Cloud9, set host: options.host || "0.0.0.0" 

		// 0.0.0.0 is availabel to all network devices 
		// unlike default localhost. 
		host: process.env.HOST, // Default to 'localhost'
		port: process.env.PORT, // Default to 8080
		open: true, // Open the page in browser 
		overlay: true,
	},
}