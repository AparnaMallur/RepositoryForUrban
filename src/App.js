import React,{Component,Suspense,lazy} from 'react';

import { connect } from "react-redux";
import { Route, Router, BrowserRouter, Switch,Redirect,useHistory,withRouter,Link } from 'react-router-dom';


/*import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/js/bootstrap.min.js";*/

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';

/*import "./assets/css/bootstrap.min.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/custom.css";
import "./App.css";*/

import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

const Aboutus =lazy(() =>import ('./components/Aboutus'));
const career2 =lazy(() =>import ('./components/career2'));
const career4 =lazy(() =>import ('./components/career4'));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
    };

    /*history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });*/
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  render() {
    const { currentUser } = this.state;

    return (
      <BrowserRouter>
        <Suspense fallback={<div></div>}>
          <Switch>
		  {/*<Route exact path="/" component={Index} />*/}
            <Route exact path="/" component={Aboutus} />
			<Route exact path="/aboutus" component={Aboutus} />
      {/*<Route exact path="/careertwo/:Dept/:location" component={career2} />*/}
      <Route exact path="/careertwo/:Dept?/:location?" component={career2} />
      <Route exact path="/jobDetails/:jobid" component={career4} />
      :pathParam1?/:pathParam2?
              </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);