import * as React from 'react';
import {
    Typography,
} from '@material-ui/core';

import { Switch, Route, NavLink, BrowserRouter } from 'react-router-dom';
import { SectionContainer } from '../components/common';
import { TenantForm, PreviousDemo, Results } from '../components/Demo';

export const DemoMenu = () => {
    return (
        <div>
            <Typography component="h1" variant="h4" align="center">
                Demo Menu
            </Typography>
        </div>
    );
}

export const DemoPage = () => {
    return (
        <SectionContainer>
            <BrowserRouter>
                <div>
                    <ul>
                        <NavLink to='/demo/previous-demo'>Previous Demo</NavLink>
                    </ul>
                </div>
                <main>
                    <Switch>
                        <Route exact path='/demo' component={DemoMenu} />
                        <Route exact path='/demo/previous-demo' component={PreviousDemo} />
                    </Switch>
                    <TenantForm />
                    <Results />
                </main>
            </BrowserRouter>
        </SectionContainer>
    );
};

export default DemoPage;
