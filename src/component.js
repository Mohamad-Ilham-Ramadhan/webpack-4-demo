const path = require("path");

export default( text = 'Hello Webpack 4') => {
	const element = document.createElement('div');
	element.className = "pure-button";
	element.innerHTML = text;

	return element;
};

export const name = () => {
	const element = document.createElement('div');
	element.className = 'name';
	element.innerHTML = 'Mohamad Ilham Ramadhan';

	return element;
};
