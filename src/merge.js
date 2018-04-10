// Just trying to understand webpack-merge does. 
const merge = require('webpack-merge');

const a = {
	entry: ['./main.js'],
	module: {
		loaders: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			}
		],
	}
};

const b = {
	entry: ['./other.js'],
	module: {
		loaders: [
			{
				test: /\.js$/,
				use: ['babel']
			}
		]
	}
};

const c = merge( a,b);


const devServer = {
	devServer: {
		stats: 'errors-only',
		open: true,
		overlay: true 
	}
};

const loadCSS = {
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	}
};

const loadLess = {
	module: {
		rules: [
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			}
		]
	}
}

const loadSass = {
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					'sass-loader'
				]
			}
		]
	}
}

const commonConfig = merge(
	{	
		plugins: [
			'new HtmlWebpackPlugin'
		],
	},
	devServer,
	loadCSS,
	loadLess,
	loadSass
);


export default commonConfig;