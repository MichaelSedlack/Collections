import React from 'react';
import AddCollection from '../components/AddCollection';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';

const CollectionsPage = () =>
{
    return(
        <div>
            <PageHeader />
            <AddCollection />
            <PageFooter />
        </div>
    );
}

export default CollectionsPage;