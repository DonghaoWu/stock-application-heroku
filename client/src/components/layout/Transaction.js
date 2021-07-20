import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { loadTransaction } from '../../actions/transaction.action';

const Transaction = ({ transactions, isAuthenticated, loadTransaction }) => {
  useEffect(() => {
    loadTransaction();
  }, [loadTransaction]);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="subpage-container">
      <p className="subpage-header">TRANSACTIONS</p>
      <div className="main-table-container">
        {transactions.length ? (
          <table className="main-table">
            <thead>
              <tr>
                <th>Action</th>
                <th>Symbol</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Cost</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((el, index) => {
                return (
                  <tr
                    key={index}
                    style={
                      el.action === 'BUY'
                        ? { backgroundColor: '#F0FFFF' }
                        : { backgroundColor: '#FFEBCD' }
                    }
                  >
                    <td>{el.action}</td>
                    <td>{el.symbol}</td>
                    <td>{el.quantity} shares</td>
                    <td>{el.price}</td>
                    <td>{el.cost.toFixed(2)}</td>
                    <td>{el.date.slice(0, -5)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h3>No transaction yet.</h3>
        )}
      </div>
    </div>
  );
};

Transaction.propTypes = {
  transactions: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  transactions: state.transactions,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadTransaction: () => dispatch(loadTransaction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
