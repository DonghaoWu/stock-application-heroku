import React, { Fragment } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Stock from './Stock';
import Operation from './Operation';

const Portfolio = ({ isAuthenticated, loading }) => {
  let { path, url } = useRouteMatch();

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      {!loading ? (
        <div className="record-container">
          <Stock />
          <Operation url={url} path={path} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Fragment>
  );
};

Portfolio.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(Portfolio);
