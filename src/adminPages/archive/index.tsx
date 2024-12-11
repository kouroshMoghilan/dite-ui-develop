import React from 'react';
import PageTitle from '../../components/template/PageTitle';
import GridArchive from './components/GridArchive';
import { FolderOpenOutlined } from '@ant-design/icons';
import WhiteScreen from '../../components/template/WhiteScreen';


const Archive: React.FC = () => {
    return (
        <>
            <PageTitle title='آرشیو' icon={<FolderOpenOutlined />} />
            <WhiteScreen>
                <GridArchive />
                {/* <ViewerGrid /> */}
            </WhiteScreen>
        </>
    );
};

export default Archive