import React from 'react';
import Buy from './Buy';
import Sell from './Sell';
import NavbarSub from './NavbarSub';
import { Switch, Route } from "react-router-dom";


const Operation = props => {
    const { url, path } = props;

    return (
        <div className='operations-container'>
            <NavbarSub url={url} />
            <Switch>
                <Route exact path={`${path}/sell`} component={Sell} />
                <Route exact path={`${path}`} component={Buy} />
            </Switch>
        </div>
    )
}

export default Operation;
