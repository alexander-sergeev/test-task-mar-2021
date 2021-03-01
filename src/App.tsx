import React from 'react';
import './App.css';
import { Layout } from 'antd';
import Navbar from './components/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
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
            <Route path="/">
              <NotFound />
            </Route>
          </Switch>
        </Layout.Content>
      </Layout>
    </Router>
  );
}


export default App;
