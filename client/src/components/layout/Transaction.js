import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Transaction = props => {
    const { transactions, auth } = props;
    if (!auth.isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div className='record-container'>
            <p className='record-header'>TRANSACTIONS</p>
            {
                (transactions.length) ?
                    <table className='record-table'>
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
                            {
                                transactions.map((el, index) => {
                                    return (
                                        <tr key={index} style={el.action === 'BUY' ? { backgroundColor: "#F0FFFF" } : { backgroundColor: "#FFEBCD" }}>
                                            <td>{el.action}</td>
                                            <td>{el.symbol}</td>
                                            <td>{el.quantity} shares</td>
                                            <td>{el.price}</td>
                                            <td>{Math.floor(el.cost)}</td>
                                            <td>{el.date.slice(0, -5)}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    :
                    <h3>No transaction yet.</h3>
            }
        </div>
    )
}

Transaction.propTypes = {
    transactions: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    transactions: state.transactions,
    auth: state.auth
})

export default connect(mapStateToProps)(Transaction);

