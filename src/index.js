import "react";
import "react-dom";

import "font-awesome/css/font-awesome.css";
import "purecss";
import "./main.css";
import "./other.css";
import "./other1.css";
import "./main.scss";
import "./main.less";

import component, { name, unusedOther1, svg, loader } from './component';
import commonConfig from './merge';

const foo = require('./test');

console.log( foo.foo() );
console.log( commonConfig );

document.body.appendChild(component());
document.body.appendChild(name());
document.body.appendChild(unusedOther1());
document.body.appendChild(svg());
document.body.appendChild(loader());

