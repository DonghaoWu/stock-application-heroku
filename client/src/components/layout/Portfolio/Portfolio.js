import React, { Fragment, useEffect } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Stock from './Stock';
import Operation from './Operation';

import { loadStockData } from '../../../actions/stock-data.action';

const Portfolio = ({ isAuthenticated, loading, loadStockData }) => {
  useEffect(() => {
    loadStockData();
  }, [loadStockData]);

  let { path, url } = useRouteMatch();

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      {!loading ? (
        <div className="subPage-container">
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

const mapDispatchToProps = (dispatch) => {
  return {
    loadStockData: () => dispatch(loadStockData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
