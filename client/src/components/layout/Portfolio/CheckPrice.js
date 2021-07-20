import React from 'react';
import { connect } from 'react-redux';
import { checkPrice } from '../../../actions/check-price.action';

const CheckPrice = ({ checkPrice, checkPriceResult, symbol }) => {
  return (
    <div className="check-price-container">
      <div className="button-spinner-container">
        <div
          id="check-price-button"
          className="operation-nav-tag bg-check"
          onClick={() => checkPrice(symbol.trim().toUpperCase())}
        >
          Check price
        </div>
        <div id="checking-spinner" hidden></div>
      </div>
      {checkPriceResult.data['c'] ? (
        <div className="price-data-container">
          <div>Symbol: {checkPriceResult.symbol}</div>
          <div>CurrentPrice: {checkPriceResult.data['c']}</div>
          <div>
            Updated at: {checkPriceResult.updateTime.toLocaleTimeString()}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  checkPriceResult: state.price,
});

const mapDispatchToProps = (dispatch) => ({
  checkPrice: (symbol) => dispatch(checkPrice(symbol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckPrice);
