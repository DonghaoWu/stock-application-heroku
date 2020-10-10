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
import { loadUser } from './actions/auth';
// import setAuthToken from './utils/setAuthToken';

import './App.css';

// if (localStorage.token) {
//   console.log('loacl token??')
//   setAuthToken(localStorage.token);
// }

const App = ({ loadUser }) => {
  //componentDidMount
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <div className='alert-container'>
            <Alert />
          </div>
          <Switch>
            <Route path='/portfolio' component={Portfolio} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/transaction' component={Transaction} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  )
};

App.propTypes = {
  loadUser: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(loadUser())
})

export default connect(null, mapDispatchToProps)(App);
