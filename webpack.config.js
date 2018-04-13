const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const glob = require("glob");

const parts = require("./webpack.parts");

const PATHS = {
	app: path.join(__dirname, "src"),

	build: path.join(__dirname, "dist"),
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
	parts.clean(PATHS.build),
	parts.minifyJavaScript(),
	parts.minifyCSS({
		options: {
			discardComments: {
				removeAll: true,
			},
			// Run cssnano in safe mode to avoid potentially unsafe transformation
			safe: true,
		}
	}),
	parts.extractCSS( { 
		use: ["css-loader", parts.autoprefix()],
	} ),
	parts.purifyCSS( {
		paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true} )
	} ),
	{
		output: {
			chunkFilename: "[name].[chunkhash:4].js",
			filename: "[name].[chunkhash:4].js",
		}
	},
	parts.loadImages( {
		options: {
			limit: 1500,
			name: "[name].[hash:4].[ext]",
			publicPath: 'assets/images',
			outputPath: 'assets/images',
		}
	} ),
	// uglifyjs override this (.js file only)
	parts.generateSourceMaps({
		type: "source-map" // the best quality of separate source-map but the most slow
	}),
	{
		// Bundle Splitting: splitting the main and the vendor dependencies
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
	parts.attachRevision(),
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
