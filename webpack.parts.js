exports.devServer = ( { host, port } = {} ) => ({
	devServer: {
		stats: 'errors-only',
		host, // Default to `localhost`
		port, // Default to 8080
		open: true,
		overlay: true 
	}
})