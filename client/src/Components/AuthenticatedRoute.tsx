import React, {FC, useState} from 'react';
import { Layout, Menu} from 'antd';
import {Link, Route,Redirect} from "react-router-dom";
import HomePage from '../Pages/HomePage';
import AboutPage from '../Pages/AboutPage';
import germany from '../images/germany.png';
import us from '../images/us.png';
import {LoginOutlined,LogoutOutlined} from '@ant-design/icons';
import {  } from 'antd';


const { Header, Content, Footer } = Layout;

export const AuthenticatedRoute:FC<{isAuthenticated : boolean}> = ({isAuthenticated}) => {
  const [languageToggle,setLanguageToogle] = useState(true);
    return(
        <Layout className="layout" style={{height:"100vh"}}>
        <Header style={{height:'100px'}}>
          <div className="logo" />
          <Menu  theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item  key="1"><Link to="/home">Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/about">About</Link></Menu.Item>
                <span className="lang-auth-div">
                  <div onClick={() => setLanguageToogle(!languageToggle)}> <img src={languageToggle ? us: germany} width="40" height="25" alt="image"/></div>
                  <div onClick={() => console.log("this has to implemented")}>
                    {
                      isAuthenticated ? 
                        <LoginOutlined style={{ fontSize: '200%'}}/>
                      : <LogoutOutlined style={{ fontSize: '200%'}}/>
                    }</div>
                </span>
          </Menu>
        </Header>
        <Content style={{ padding: '20px 50px' }}>
          <div className="site-layout-content">
            <Route
                  exact
                  path="/"
                  render={() => {
                      return (
                      <Redirect to="/home" /> 
                      )
                  }}
                />
              <Route path="/home" component={HomePage} exact/>
              <Route path="/about" component={AboutPage} exact/>
              {/*<Route path="/" component={HomePage} exact/>*/}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Created by ©Skahleque 2021</Footer>
      </Layout>
    );
}