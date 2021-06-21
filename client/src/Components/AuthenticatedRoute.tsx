import React, {FC, useState} from 'react';
import { Layout, Menu} from 'antd';
import {Link, Route,Redirect, Switch} from "react-router-dom";
import HomePage from '../Pages/HomePage';
import AboutPage from '../Pages/AboutPage';
import ErrorPage from '../Pages/ErrorPage';
import germany from '../images/germany.png';
import us from '../images/us.png';
import {LoginOutlined,LogoutOutlined} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/config';


const { Header, Content, Footer } = Layout;

export const AuthenticatedRoute:FC<{userToken : string,setUserToken(token: string):void}> = ({userToken,setUserToken}) => {
    const { t } = useTranslation();
    const langOptions = {
      us: 'us',
      de: 'de'
    };
    const [currLanguage,setcurrLanguage] = useState(langOptions.us);
    const onLanguageChange = () => {
        const changedLang = changeLangTo(currLanguage);
        setcurrLanguage(changedLang);
        i18n.changeLanguage(changedLang);
  }

  const changeLangTo = (currLanguage: string) => (currLanguage === langOptions.us? langOptions.de: langOptions.us);

  const userLoggingHandle = () => {
    console.log("logout");
    if(userToken){
      sessionStorage.setItem('token','');
      setUserToken('');
    }
  }
    return(
        <Layout className="layout" style={{height:"100vh"}}>
            <Header style={{height:'100px'}}>
                <Menu  theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item  key="1"><Link to="/home">{t('home')}</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/about">{t('about')}</Link></Menu.Item>
                        <span className="lang-auth-div">
                            <div onClick={() => onLanguageChange()}> 
                              <img src={currLanguage === langOptions.us ? us: germany} width="40" height="25" alt="image"/>
                            </div>
                            <div onClick={() => userLoggingHandle()}>
                              {
                                userToken != '' ? 
                                  <LoginOutlined style={{ fontSize: '200%'}}/>
                                : <LogoutOutlined style={{ fontSize: '200%'}}/>
                              }
                            </div>
                        </span>
                </Menu>
            </Header>
            <Content style={{ padding: '20px 50px' }}>
                <div className="site-layout-content">
                  <Switch>
                      <Route path="/home" component={HomePage} exact/>
                      <Route path="/about" component={AboutPage} exact/>
                      <Route path="/" component={HomePage} exact/> 
                      <Route path="*" component={ErrorPage}/> 
                  </Switch>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Created by ©Skahleque 2021</Footer>
        </Layout>
    );
}