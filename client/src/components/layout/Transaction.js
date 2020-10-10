import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

const Transaction = props => {
    const { transactions } = props;
    return (
        <div className='transaction_container'>
            <div className='transaction_content'>
                <p className='tran_header'>TRANSACTIONS</p>
                {
                    (transactions.length) ?
                        <table className='tran_table'>
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

