import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import OperationNav from './OperationNav';
import TradeAction from './TradeAction';

import { handleSell, handleBuy } from '../../../actions/trade.action';

const Operation = (props) => {
  const { url, path, user } = props;

  return (
    <div className="portfolio-sub-contianer">
      <p className="data-sub-header cash-header">
        CASH ($ {Math.floor(user.balance)} )
      </p>

      <OperationNav url={url} />
      <Switch>
        <Route exact path={`${path}/sell`}>
          <TradeAction handleSubmit={handleSell} act="SELL" />
        </Route>
        <Route exact path={`${path}`}>
          <TradeAction handleSubmit={handleBuy} act="BUY" />
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(Operation);
