import React, {FC} from 'react';
import pageNotFound from '../images/pageNotFound.jpg';
import { Typography } from 'antd';

const { Title } = Typography;


const PageNotFoundComponent:FC = () => {
    const divStyle = {
        marginTop: '20px',
        fontFamily: 'cursive',
    };
    return (
            <div className="page-not-found">
                <img src={pageNotFound} alt="Page not found" height="850"/>
                <div style={divStyle}>
                    <Title level={2}>Sorry The Requested Page yet not available !!!! </Title>
                </div>
            </div>
    );
}

export default PageNotFoundComponent;