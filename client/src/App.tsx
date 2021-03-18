import React from 'react';
import './App.css';
import { Layout } from 'antd';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import LoginCallback from './pages/LoginCallback/LoginCallback';
import { LanguageConsumer, LanguageProvider } from './contexts/LanguageContext';
import Profile from './pages/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { ApolloProvider } from '@apollo/client';
import { client } from './config/apollo';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';

const App = () => {
  /**
   * About CacheRoute className="cached-route"
   * react-router-cache-route library creates one more div that wraps our route.
   * We need to make this div fill the parent, so we add some styles to it
   */
  const routerSwitch = (
    <CacheSwitch>
      <CacheRoute className="cache-route" exact path="/">
        <Home />
      </CacheRoute>
      <Route exact path="/loginCallback">
        <LoginCallback />
      </Route>
      <ProtectedRoute exact path="/profile">
        <Profile />
      </ProtectedRoute>
      <Route path="/">
        <NotFound />
      </Route>
    </CacheSwitch>
  );
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <LanguageProvider>
          <LanguageConsumer>
            {() => (
              <Router>
                <Layout className="layout">
                  <Layout.Header>
                    <Navbar></Navbar>
                  </Layout.Header>
                  <Layout.Content>{routerSwitch}</Layout.Content>
                </Layout>
              </Router>
            )}
          </LanguageConsumer>
        </LanguageProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
