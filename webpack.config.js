const webpack = require("webpack");
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
			// Disable code splitting
			// new webpack.optimize.LimitChunkCountPlugin({
			// 	maxChunks: 1
			// })
		],
		// output: { // buggy
		// 	chunkFilename: "chunk.[name].js"
		// }
	},
	parts.loadJavaScript({
		include: PATHS.app
	}),
	parts.loadLess(),
	parts.loadSass(),
	parts.loadFonts({
		options: {
			name: '[name].[ext]',
			publicPath: 'assets/fonts/',
			outputPath: 'assets/fonts/',
		}
	}),
]);

const productionConfig = merge([
	parts.extractCSS( { 
		use: ["css-loader", parts.autoprefix()],
	} ),
	parts.purifyCSS( {
		paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true} )
	} ),
	parts.loadImages( {
		options: {
			limit: 1500,
			name: "[name].[ext]",
			publicPath: 'assets/images',
			outputPath: 'assets/images',
		}
	} ),
	parts.generateSourceMaps({
		type: "source-map" // the best quality of separate source-map but the most slow
	}),
	{
		optimization: {
			splitChunks: {
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendor",
						chunks: "initial"
					}
				}
			}
		}
	},
]);

const developmentConfig = merge([
	parts.devServer( { 
		// Customize host/port here if needed
		host: process.env.HOST, 
		port: process.env.PORT, // for example `3030` 
	} ),
	parts.loadCSS(),
	parts.loadImages(),
	parts.generateSourceMaps({
		type: "cheap-module-eval-source-map"
	})
]); 

module.exports = mode => {
	if ( mode === 'production') {
		return merge(commonConfig, productionConfig, { mode } );
	} 

	return merge( commonConfig, developmentConfig, { mode } );
}
