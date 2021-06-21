import React, {FC} from 'react';
import LoginComponent from '../Components/LoginComponent';
import { Layout } from 'antd';
import loginBackground from '../images/loginBackground.jpg';
const { Header, Footer, Sider, Content } = Layout;

const loginDiv = {};
interface propTypes{
    setUpUserToken(token : string): void;
}

const LoginPage:FC<propTypes> = ({setUpUserToken}) => {
    return(
            <Layout style={{height: '100%', width:'100%',backgroundColor:'#001529'}}>
                <Content style={{position:'relative',left:'30%',top:'30%',maxHeight:'35%',backgroundColor:'#ffa366', width:'40%',paddingTop:'100px',borderRadius:'5px'}}>
                        <LoginComponent setUpUserToken={setUpUserToken}/>
                </Content>
            </Layout>
    );
}

export default  LoginPage;


