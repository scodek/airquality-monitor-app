import React, {useState} from 'react';
import { BrowserRouter, Switch} from 'react-router-dom';
import {AuthenticatedRoute} from '../Components/AuthenticatedRoute';
import './App.css';
import LoginPage from '../Pages/LoginPage';
import useNetworkToken from '../Components/customHooks/useNetworkToken'
function App() {

  const {userToken, setUserToken} = useNetworkToken();
  const setUpUserToken = (token: string) => {
    setUserToken(token);
  }

if(!userToken){
  
  return <LoginPage setUpUserToken={setUpUserToken}/>;
}

  return (
      <BrowserRouter>
         
              <AuthenticatedRoute userToken={userToken} setUserToken={setUserToken}/> 
    
      </BrowserRouter>
  );
}

export default App;
