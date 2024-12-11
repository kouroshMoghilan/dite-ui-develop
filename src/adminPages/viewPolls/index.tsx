import React from 'react';
import PageTitle from '../../components/template/PageTitle';
import { LikeFilled } from '@ant-design/icons';
import ViewInformation from './components/ViewInformation';


const ViewPolls: React.FC = () => {
    return (
        <>
            <PageTitle title='مشاهده نظرسنجی' className='mb-6' icon={<LikeFilled />} />
            <ViewInformation />
        </>
    );
};

export default ViewPolls