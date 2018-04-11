import "purecss";

import "./main.css";
import "./main.scss";
import "./main.less";

import component, { name } from './component';
import commonConfig from './merge';

const foo = require('./test');

console.log( foo.foo() );
console.log( commonConfig );

document.body.appendChild(component());
document.body.appendChild(name());

