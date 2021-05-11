import React, { FC } from 'react';
import { Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const LoadingComponent: React.FC = () => {
    const loadingIcon = <LoadingOutlined style={{ fontSize: 50 }} spin={true} />;
    console.log("suspense working");

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin tip="Loading...." indicator={loadingIcon} />
        </div>
    );
};