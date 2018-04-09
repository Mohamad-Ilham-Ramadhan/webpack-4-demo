import component from './component';

const foo = require('./test');

console.log( foo.foo() );

document.body.appendChild(component());
