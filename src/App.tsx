import React from 'react';
import './App.css';
import { Layout } from 'antd';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import LoginCallback from './pages/LoginCallback/LoginCallback';
import { LanguageConsumer, LanguageProvider } from './contexts/LanguageContext';

const App = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <LanguageConsumer>
          {() => (
            <Router>
              <Layout className="layout">
                <Layout.Header>
                  <Navbar></Navbar>
                </Layout.Header>
                <Layout.Content>
                  <Switch>
                    <Route exact path="/">
                      <Home />
                    </Route>
                    <Route exact path="/loginCallback">
                      <LoginCallback />
                    </Route>
                    <Route path="/">
                      <NotFound />
                    </Route>
                  </Switch>
                </Layout.Content>
              </Layout>
            </Router>
          )}
        </LanguageConsumer>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;
