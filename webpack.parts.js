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