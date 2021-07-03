import React from 'react';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import ResetPassword from '../components/ResetPassword';

const ResetPasswordPage = () =>
{
    return(
        <div>
            <PageHeader />
            <ResetPassword />
            <PageFooter />
        </div>
    );
}

export default ResetPasswordPage;