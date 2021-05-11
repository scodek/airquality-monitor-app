import React, {FC} from 'react';
import { Layout, Menu} from 'antd';
import {Link, Route,Redirect} from "react-router-dom";
import HomePage from '../Pages/HomePage';
import AboutPage from '../Pages/AboutPage';


const { Header, Content, Footer } = Layout;

export const AuthenticatedRoute:FC = () => {
    return(
        <Layout className="layout" style={{height:"100vh"}}>
        <Header style={{height:'100px'}}>
          <div className="logo" />
          <Menu style={{marginTop:'36px',height:'20px'}} theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item  key="1"><Link to="/home">Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/about">About</Link></Menu.Item>
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