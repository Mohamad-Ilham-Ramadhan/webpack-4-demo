import "react";
import "react-dom";

import "font-awesome/css/font-awesome.css";
import "purecss";
import "./main.css";
import "./other.css";
import "./other1.css";
import "./main.scss";
import "./main.less";

import { bake } from "./shake";

import component, { name, unusedOther1, svg, loader, lazy } from './component';
import commonConfig from './merge';

bake();
bake();
// bake();

console.log( commonConfig );

let person = 'mohamad ilham ramadhan';
console.log( person );

document.body.appendChild(component());
document.body.appendChild(lazy());
document.body.appendChild(name());
document.body.appendChild(unusedOther1());
document.body.appendChild(svg());
document.body.appendChild(loader());

