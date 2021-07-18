import React from 'react';
import { Switch, Route } from 'react-router-dom';

import OperationNav from './OperationNav';
import TradeAction from './TradeAction';

import {handleSell, handleBuy} from '../../actions/trade.action'

const Operation = (props) => {
  const { url, path } = props;

  return (
    <div className="operations-container">
      <OperationNav url={url} />
      <Switch>
        <Route exact path={`${path}/sell`}>
          <TradeAction handleSubmit={handleSell} act='SELL'/>
        </Route>
        <Route exact path={`${path}`}>
          <TradeAction handleSubmit={handleBuy} act='BUY'/>
        </Route>
      </Switch>
    </div>
  );
};

export default Operation;
