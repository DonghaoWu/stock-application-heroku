import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Transaction from './components/layout/Transaction';
import Portfolio from './components/layout/Portfolio/Portfolio';
import Admin from './components/layout/Admin/Admin';
import ErrorBoundary from './components/layout/ErrorBoundary/ErrorBoundary';

//check the localStorage.token every time when refresh or open
import { loadUser } from './actions/auth.action';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ loadUser }) => {
  //componentDidMount
  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
  }, [loadUser]);

  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <div className="alert-container">
          <Alert />
        </div>
        <section className="container">
          <Switch>
            <Route path="/portfolio" component={Portfolio} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/transaction" component={Transaction} />
            <Route path="/" component={ErrorBoundary} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

App.propTypes = {
  loadUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(loadUser()),
});

export default connect(null, mapDispatchToProps)(App);
