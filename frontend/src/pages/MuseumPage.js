import React from 'react';
import Museum from '../components/Museum';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';


const MuseumPage = () =>
{
    return(
        <div>
            <PageHeader />
            <Museum />
            <PageFooter />
        </div>
    );
};

export default MuseumPage;
