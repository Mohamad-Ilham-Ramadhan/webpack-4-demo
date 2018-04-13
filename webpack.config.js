const webpack = require("webpack");
const merge = require("webpack-merge");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const glob = require("glob");

const parts = require("./webpack.parts");

const PATHS = {
	app: path.join(__dirname, "src"),

	build: path.join(__dirname, "dist"),
}

const commonConfig = merge([
	// {	
	// 	plugins: [
	// 		new HtmlWebpackPlugin({
	// 			title: "Belajar Webpack 4",
	// 		}),
	// 		// Disable code splitting
	// 		// new webpack.optimize.LimitChunkCountPlugin({
	// 		// 	maxChunks: 1
	// 		// })
	// 	],
	// 	// output: { // buggy
	// 	// 	chunkFilename: "chunk.[name].js"
	// 	// }
	// },
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
	{
		performance: {
			hints: "warning", // "error" or false are valide too
			maxEntrypointSize: 50000, // in bytes, default 250K
			maxAssetSize: 450000, // in bytes
		}
	},
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
			},
			// Extracting a manifest 
			runtimeChunk: {
				name: "manifest"
			},
			// minimize: false,
		},
		recordsPath: path.join(__dirname, "records.json"),
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
	// parts.generateSourceMaps({
	// 	type: "cheap-module-eval-source-map"
	// })
]); 

module.exports = mode => {
	// if ( mode === 'production') {
	// 	return merge(commonConfig, productionConfig, { mode } );
	// } 

	// return merge( commonConfig, developmentConfig, { mode } );

	// Multiple pages: 

	// As HtmlWebpackPlugin picks up all chunks by default, you have to adjust it to pick up only the chunks that are related to each page: by declaring chuncks
	const pages = [
		parts.page({
			title: "Webpack demo",
			entry: {
				app: PATHS.app,
			},
			// To work on local server
			output: {
				publicPath: ''
			},
			chunks: ['app', 'manifest', 'vendor'],
		}),
		parts.page({
			title: "Another demo",
			path: "another",
			entry: {
				another: path.join(PATHS.app, "another.js"),
			},
			// To work on local server
			output: {
				publicPath: '../'
			},
			chunks: ['another', 'manifest', 'vendor'],
		}),
	];
	const config = mode === "production" ? productionConfig : developmentConfig;

	// Multi Compiler mode: buat bedain output biar bisa dimuat di local server `localhost` karena ada masalah di path, kalo udah di deploy kayanya gak usah bedain output deh.
	
	return pages.map( page => 
		merge( commonConfig, config, page, { mode })
	);
	
	// Dropping the multi-compiler mode
	// Cons: Given the configuration isn't in the multi-compiler form anymore, processing can be slower.
	
	// return merge([ commonConfig, config, { mode }].concat(pages) );
}
