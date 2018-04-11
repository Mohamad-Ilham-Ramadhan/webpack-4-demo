const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const glob = require("glob");

const parts = require("./webpack.parts");

const PATHS = {
	app: path.join(__dirname, "src"),
}

const commonConfig = merge([
	{	
		plugins: [
			new HtmlWebpackPlugin({
				title: "Belajar Webpack 4",
			}),
		],
	},
	parts.loadLess(),
	parts.loadSass(),
]);

const productionConfig = merge([
	parts.extractCSS( { 
		use: "css-loader"
	} ),
	parts.purifyCSS( {
		paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
	} ),
]);

const developmentConfig = merge([
	parts.devServer( { 
		// Customize host/port here if needed
		host: process.env.HOST, 
		port: process.env.PORT, // for example `3030` 
	} ),
	parts.loadCSS(),
]); 

module.exports = mode => {
	if ( mode === 'production') {
		return merge(commonConfig, productionConfig, { mode } );
	} 

	return merge( commonConfig, developmentConfig, { mode } );
}
