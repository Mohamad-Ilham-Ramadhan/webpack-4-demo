const path = require("path");
export default( text = 'Hello Webpack 4') => {
	const element = document.createElement('div');
	element.classList.add('hello');
	element.innerHTML = text;

	const name = document.createElement('p');
	name.innerHTML = 'Mohamad Ilham Ramadhan';
	name.classList.add('name');

	document.body.appendChild(name);

	const x = path.resolve(__dirname, 'dist/assets');
	console.log( x );

	return element;
};
