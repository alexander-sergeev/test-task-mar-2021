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
import Profile from './pages/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { ApolloProvider } from '@apollo/client';
import { client } from './config/apollo';

const App = () => {
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
                  <Layout.Content>
                    <Switch>
                      <Route exact path="/">
                        <Home />
                      </Route>
                      <Route exact path="/loginCallback">
                        <LoginCallback />
                      </Route>
                      <ProtectedRoute exact path="/profile">
                        <Profile />
                      </ProtectedRoute>
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
    </ApolloProvider>
  );
};

export default App;
