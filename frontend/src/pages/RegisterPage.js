import React from 'react';
import Register from '../components/Register';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';

const RegisterPage = () =>
{
    return(
        <div>
            <PageHeader />
            <Register />
            <PageFooter />
        </div>
    );
}

export default RegisterPage;