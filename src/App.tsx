import React from 'react';
import './App.css';
import { Layout } from 'antd';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Layout className="layout">
      <Layout.Header>
        <Navbar></Navbar>
      </Layout.Header>
    </Layout>
  );
}

export default App;
