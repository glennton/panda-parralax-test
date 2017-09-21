import $ from "jquery";
require('./assets/css/foundation.min.css');

//require('./assets/vendor/TweenMax.min.js');
//require('./assets/vendor/ScrollToPlugin.min.js');
//Components
//require('./components/home/homeComponent.scss');
//require('./components/home/homeComponent.js');

import React from "react";
import ReactDOM from "react-dom";
import{BrowserRouter, Route} from "react-router-dom";

import Home from "./scenes/Home/";

const app = document.getElementById('app');

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={Home}>
    </Route>
  </BrowserRouter>,
app)
