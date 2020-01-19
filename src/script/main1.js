import "jquery";
// import "../stylesheets/index.css";
// import "../stylesheets/details.css"
import "../stylesheets/index.css";
import "../stylesheets/details.css";
import "../stylesheets/login.css";
import "../stylesheets/registry.css";
import "../stylesheets/cart.css";
// import img from '../images/'




import {
    Index
} from './index1';


import {
    Details
} from './details';

import {
    Login
} from './login';

import {
    Registry
} from './registry';

import {
    Cartlist
} from './cartlist';



new Index().init();
new Details().init();
new Login().init();
new Registry().init();
new Cartlist().init();


// let tab = document.querySelector('#tab');
// let scale = document.querySelector('#scale');
// if (tab) {
//     new Tabs().init();
//     new Lunbo().init();
// } else {
//     new Scale().init();
// }