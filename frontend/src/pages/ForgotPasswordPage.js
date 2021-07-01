import React from 'react';
import ForgotPassword from '../components/ForgotPassword';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';


const ForgotPasswordPage = () =>
{
    return(
        <div>
            <PageHeader />
            <ForgotPassword />
            <PageFooter />
        </div>
    );
};

export default ForgotPasswordPage;