import { Button, Col, Menu, Row, Space } from 'antd';
import {
  HomeOutlined,
} from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Trans } from 'react-i18next';
import LangSwitcher from '../LangSwitcher/LangSwitcher';

const Navbar = () => {
  return (
    <Row>
      <Col span={6}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[window.location.pathname]}>
          <Menu.Item key="/">
            <Link to="/">
              <HomeOutlined className="home-icon" />
              <Trans>Home link</Trans>
            </Link>
          </Menu.Item>
        </Menu>
      </Col>
      <Col span={18} className="right-pane">
        <Space>
          <LangSwitcher></LangSwitcher>
          <Button type="primary"><Trans>Login link</Trans></Button>
        </Space>
      </Col>
    </Row>
  );
}

export default Navbar;
