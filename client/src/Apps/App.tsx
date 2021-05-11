import React, {useState} from 'react';
import { BrowserRouter, Route, Switch,Redirect} from 'react-router-dom';
import {LoginPage} from '../Pages/LoginPage';
import {AuthenticatedRoute} from '../Components/AuthenticatedRoute';
import './App.css';

function App() {
const [isAuthenticated,setIsAuthenticated] = useState<boolean>(true);

  return (
    
    <BrowserRouter>
      <Switch>
          <AuthenticatedRoute isAuthenticated={isAuthenticated}/> 
      </Switch>
   </BrowserRouter>
   
  );
}

export default App;
