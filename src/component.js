import Worker from "worker-loader!./worker";

export default () => {
	const element = document.createElement("h1");
	const worker = new Worker();
	const state = { text: "foo" };

	worker.addEventListener("message", ( { data: { tuxt } } ) => {
		state.text = tuxt;

		console.log( tuxt );
		element.innerHTML = tuxt;
	});

	element.innerHTML = state.text;
	element.onclick = () => worker.postMessage( { text: state.text } );

	return element; 
}

const path = require("path");
import svgImg from './react-1.svg';

export const lazy = ( text = 'Hello Webpack 4') => {
	const element = document.createElement('div');
	element.className = "pure-button";
	element.innerHTML = text;

	element.onclick = () => 
		import('./lazy')
			.then( lazy => {
				element.textContent = lazy.default;
			})
			.catch(err => {
				console.error( err );
			})

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
