import React from 'react';
import TabBars from './components/TabBars';
import PageTitle from '../../components/template/PageTitle';
import { PlusCircleOutlined } from '@ant-design/icons';
import WhiteScreen from '../../components/template/WhiteScreen';

const AddEvent: React.FC = () => {
    return (
        <div className='center-page'>
            <PageTitle title='افزودن رویداد' icon={<PlusCircleOutlined />} />
            <WhiteScreen>
                <TabBars />
            </WhiteScreen>
        </div>
    );
};

export default AddEvent;
