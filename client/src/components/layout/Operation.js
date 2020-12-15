import React from 'react';
import BuyStock from './BuyStock';
import SellStock from './SellStock';
import OperationNav from './OperationNav';
import { Switch, Route } from "react-router-dom";


const Operation = props => {
    const { url, path } = props;

    return (
        <div className='operations-container'>
            <OperationNav url={url} />
            <Switch>
                <Route exact path={`${path}/sell`} component={SellStock} />
                <Route exact path={`${path}`} component={BuyStock} />
            </Switch>
        </div>
    )
}

export default Operation;
