import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


const Portfolio = props => {
    const { transactions } = props;
    return (
        <div>
            {
                (transactions.length) === 0 ?
                    null
                    :
                    <ul>
                        {
                            transactions.map((el, index) => {
                                return (
                                    <li key={index}>
                                        {el.action}{el.name}{el.quantity}{el.price}{el.date}
                                    </li>
                                    )
                                })
                            }
                    </ul>
            }
        </div>
                    )
                }
                
Portfolio.propTypes = {
                            transactions: PropTypes.object.isRequired,
                    }
                    
const mapStateToProps = state => ({
                            transactions: state.transactions
                    })
                    
                    export default connect(mapStateToProps)(Portfolio);
