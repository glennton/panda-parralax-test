import $ from "jquery";
require('./assets/css/foundation.min.css');

//require('./assets/vendor/TweenMax.min.js');
//require('./assets/vendor/ScrollToPlugin.min.js');
//Components
//require('./components/home/homeComponent.scss');
//require('./components/home/homeComponent.js');

import React from "react";
import ReactDOM from "react-dom";
import{BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Home from "./scenes/Home/";
import Bebe from "./scenes/Work/Bebe";

const app = document.getElementById('app');

ReactDOM.render(
  <Router>
    <Switch>
    <Route path="/" exact component={Home}></Route>
    <Route path="bebe" component={Bebe}></Route>
    </Switch>

  </Router>,
app)
