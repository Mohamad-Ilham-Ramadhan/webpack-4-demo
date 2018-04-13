const PurifyCSSPlugin = require("purifycss-webpack");
const autoprefixer = require("autoprefixer");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");

const HtmlWebpackPlugin = require("html-webpack-plugin");

// For Multiple Page:
exports.page = ({
	path = "",
	template = require.resolve(
		"html-webpack-plugin/default_index.ejs"
	),
	title,
	entry,
	output,
	chunks,
} = {}) => ({
	entry,
	output,
	plugins: [
		new HtmlWebpackPlugin({
			chunks,
			filename: `${path && path + "/"}index.html`,
			template,
			title,
		}),
	],
});

exports.minifyCSS = ( { options } ) => ({
	plugins: [
		new OptimizeCSSAssetsPlugin({
			cssProcessor: cssnano,
			cssProcessorOptions: options,
			canPrint: false,
		})
	]
});

exports.minifyJavaScript = () => ({
	optimization: {
		minimizer: [new UglifyWebpackPlugin({sourceMap: true})]
	}
});

exports.attachRevision = () => ({
	plugins: [
		new webpack.BannerPlugin({
			banner: new GitRevisionPlugin().version(),
		})
	],
})

exports.generateSourceMaps = ( { type } ) => ({
	devtool: type
})

// To Clean the build directory between buildssss.
exports.clean = path => ({
	plugins: [new CleanWebpackPlugin( [path] )],
})

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
		// filename: "[name].[contentHash:4].css", // error bug,
		filename: "[name].[md5:contenthash:hex:4].css", // Bekerja dengan baik!!
		// filename: "[name].css", 
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

exports.loadJavaScript = ( { include, exclude } = {} ) => ({
	module: {
		rules: [
			{
				test: /\.js$/,
				include,
				exclude,
				use: "babel-loader"
			}
		]
	}
})

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
					options
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


