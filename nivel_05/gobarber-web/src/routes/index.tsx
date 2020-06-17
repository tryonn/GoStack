import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import forgotPassword from '../pages/ForgotPassword';
import resetPassword from '../pages/ResetPassword';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgot-password" component={forgotPassword} />
        <Route path="/reset-password" component={resetPassword} />

        <Route path="/profile" component={Profile} isPrivate />
        <Route path="/dashboard" component={Dashboard} isPrivate />


    </Switch>
);


export default Routes;
