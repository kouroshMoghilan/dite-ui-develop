import React from 'react';
import PageTitle from '../../components/template/PageTitle';
import GridRequests from './components/GridRequests';
import { MailOutlined } from '@ant-design/icons';
import WhiteScreen from '../../components/template/WhiteScreen';


const ViewRequests: React.FC = () => {
    return (
        <>
            <PageTitle title='مشاهده درخواست ها' icon={<MailOutlined />} />
            <WhiteScreen>
                <GridRequests />
                {/* <ViewerGrid /> */}
            </WhiteScreen>
        </>
    );
};

export default ViewRequests