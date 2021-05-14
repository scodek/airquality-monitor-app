import React, {FC} from 'react';
import {LoginComponent} from '../Components/LoginComponent';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

/*This functionality is future extension*/

const loginDiv = {};

export const LoginPage:FC = () => {
console.log("this is loaded");
    return(
            <Layout style={{height: '100%', width:'100%'}}>
                <Content style={{position:'relative',left:'30%',top:'30%',maxHeight:'30%',backgroundColor:'#6d7fcc', width:'40%',paddingTop:'100px'}}>
                        <LoginComponent/>
                </Content>
            </Layout>
    );
}


