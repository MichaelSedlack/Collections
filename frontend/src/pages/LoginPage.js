import React from 'react';
import Login from '../components/Login';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';


const LoginPage = () =>
{
    return(
        <div>
            <PageHeader />
            <Login />
            <PageFooter />
        </div>
    );
};

export default LoginPage;
