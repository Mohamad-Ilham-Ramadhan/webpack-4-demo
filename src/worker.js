self.onmessage = ( { data: { text } } ) => {
	self.postMessage( { tuxt: text + text } );
} 

// The critical thing to note is that the worker cannot access the DOM. You can perform computation and queries in a worker, but it cannot manipulate the user interface directly.

