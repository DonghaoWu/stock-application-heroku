import React from 'react';
import Buy from './Buy';
import Sell from './Sell';
import NavbarSub from './NavbarSub';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


const Operation = props => {
    const { url, path } = props;
    return (
        <Router>
            <div className='portfolio_container'>
                <NavbarSub url={url} />
                <Switch>
                    <Route exact path={`${path}/sell`} component={Sell} />
                    <Route exact path={`${path}`} component={Buy} />
                </Switch>
            </div>
        </Router >
    )
}

export default Operation;
