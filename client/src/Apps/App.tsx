import React, {useState} from 'react';
import { BrowserRouter, Switch} from 'react-router-dom';
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
