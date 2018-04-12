const path = require("path");
import svgImg from './react-1.svg';

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

export const unusedOther1 = () => {
	const element = document.createElement('div');
	element.className = 'unused-other-1';
	element.innerHTML = 'Mohamad Ilham Ramadhan';

	return element;
}; 

export const svg = () => {
	const element = document.createElement('img');
	element.src = svgImg;
	element.style.width = "200px";
	element.style.height = "200px";

	return element;
};

export const loader = () => {
	const element = document.createElement('div');
	element.innerHTML = 'Loading...';
	element.className = 'fa fa-spinner';

	return element;
}
