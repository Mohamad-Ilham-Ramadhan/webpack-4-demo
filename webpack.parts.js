const PurifyCSSPlugin = require("purifycss-webpack");
const autoprefixer = require("autoprefixer");

exports.autoprefix = () => ({
	loader: "postcss-loader",
	options: {
		plugins: [autoprefixer],
	}
})

exports.purifyCSS = ( { paths } ) => ({
	plugins: [new PurifyCSSPlugin( { paths } )],
})

const ExtractTextPlugin = require("extract-text-webpack-plugin");

exports.extractCSS = ( { include, exclude, use } ) => {
	// Output extracted css to a file
	const plugin = new ExtractTextPlugin({
		// `allChunks` is needed to extract from extracted chunks as well.
		allChunks: true,
		filename: "[name].css",
	});

	return {
		module: {
			rules: [
				{
					test: /\.css$/,
					include,
					exclude,

					use: plugin.extract({
						use,
						fallback: "style-loader"
					})
				},
				{
					test: /\.scss$/,
					use: plugin.extract({
						use: [
							{
								loader: 'css-loader',
								options: {
									importLoaders: 1
								}
							},
							{
								loader: "postcss-loader",
								options: {
									plugins: [autoprefixer],
								}
							},
							'sass-loader',
						],
						fallback: 'style-loader'
					})
				},
				{
					test: /\.less$/,
					use: plugin.extract({
						use: ['css-loader', 
							{
								loader: "postcss-loader",
								options: {
									plugins: [autoprefixer],
								}
							}, 'less-loader'],
						fallback: 'style-loader'
					})
				}
			]
		},
		plugins: [plugin],
	}
};


exports.devServer = ( { host, port } = {} ) => ({
	devServer: {
		stats: 'errors-only',
		host, // Default to `localhost`
		port, // Default to 8080
		open: true,
		overlay: true 
	}
});

exports.loadCSS = ( { include, exclude } = {} ) => ({
	module: {
		rules: [
			{
				test: /\.css$/,
				include,
				exclude,

				use: ['style-loader', 'css-loader'],
			},
		],
	},
});

exports.loadLess = ( { include, exclude } = {} ) => ({
	module: {
		rules: [
			{
				test: /\.less$/,
				include,
				exclude,

				use: ['style-loader', 'css-loader', 'less-loader']
			}
		]
	}
});

exports.loadSass = ( { include, exclude } = {} ) => ({
	module: {
		rules: [
			{
				test: /\.scss$/,
				include,
				exclude,

				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					'sass-loader',
				]
			}
		]
	}
});

exports.loadImages = ( { include, exclude, options } = {} ) => ({
	module: {
		rules: [
			{
				test: /\.(png|jpg|jpeg)$/,
				use: {
					loader: 'url-loader',
					options
				}
			},
			{
				test: /\.svg$/,
				use: {
					loader: 'file-loader',
					options : {
						name: "[name].[ext]",
						publicPath: 'assets/images',
						outputPath: 'assets/images',
					}
				}
			}
		]
	}
});

exports.loadFonts = ( { include, exclude, options } = {} ) => ({
	module: {
		rules: [
			{
				// Capture eot, tff, woff, and woff2
				test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
				options,
			}
		]
	}
});