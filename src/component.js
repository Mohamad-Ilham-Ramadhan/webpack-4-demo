export default( text = 'Hello Webpack 4') => {
	const element = document.createElement('div');

	element.innerHTML = text;

	return element;
};