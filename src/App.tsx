import React, { useState } from 'react';
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
import LanguageContext, { LANGUAGE_INITIAL_STATE } from './contexts/LanguageContext';
import i18n from './i18n';

const App = () => {
  const [state, setState] = useState(LANGUAGE_INITIAL_STATE);

  const changeLang = (lang: string) => {
    setState({
      ...state,
      language: lang
    });
    i18n.changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        ...state,
        changeLang,
      }}>
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
    </LanguageContext.Provider>
  );
}


export default App;
