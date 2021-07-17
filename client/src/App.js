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
import Portfolio from './components/layout/Portfolio';

//check the localStorage.token every time when refresh or open
import { checkTokenAndLoadUser } from './actions/auth.action';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ checkTokenAndLoadUser }) => {
  //componentDidMount
  useEffect(() => {
    checkTokenAndLoadUser();
  }, [checkTokenAndLoadUser]);

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
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/transaction" component={Transaction} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

App.propTypes = {
  checkTokenAndLoadUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  checkTokenAndLoadUser: () => dispatch(checkTokenAndLoadUser()),
});

export default connect(null, mapDispatchToProps)(App);
