import "./main.css";
import "./other.css";
import "./main.less";
import "./main.scss";

import component from './component';
import commonConfig from './merge';

const foo = require('./test');

console.log( foo.foo() );
console.log( commonConfig );

document.body.appendChild(component());
