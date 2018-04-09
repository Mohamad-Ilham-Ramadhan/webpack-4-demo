const path = require("path");
export default( text = 'Hello Webpack 4') => {
	const element = document.createElement('div');

	element.innerHTML = text;

	const x = path.resolve(__dirname);
	console.log( __dirname );

	return element;
};
