import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header'
import styled from 'styled-components'
import Sidebar from './components/Sidebar'

import './App.css';
import Chat from './components/Chat';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login';
import Spinner from 'react-spinkit';

function App() {
  const [user, loading] = useAuthState(auth)

  if(loading) {
    return(
      <AppLoading>
        <AppLoadingContent>
          <img src="https://cdn.brandfolder.io/5H442O3W/at/pl546j-7le8zk-btwjnu/Slack_RGB.png" alt="" />
          <Spinner 
            name="ball-spin-fade-loader"
            color="purple"
            fadeIn="none"
          />
        </AppLoadingContent>
      </AppLoading>
    )
  }

  return (
    <div className="app">
      <Router>
        {
          !user ? (<Login />)
          : (
            <>
              <Header />
              <AppBody>
                <Sidebar />
                <Switch>
                  <Route path="/" exact>
                    {/** CHat */}
                    <Chat />
                  </Route>
                </Switch>
              </AppBody>
            </>
          )
        }
        
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContent = styled.div `

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
  text-align: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 20px;
  }
`;