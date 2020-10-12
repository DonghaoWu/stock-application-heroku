import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

const Transaction = props => {
    const { transactions } = props;
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
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    transactions.map((el, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{el.action}</td>
                                                <td>{el.name}</td>
                                                <td>{el.quantity} shares</td>
                                                <td>{el.price}</td>
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
    transactions: state.transactions
})

export default connect(mapStateToProps)(Transaction);

