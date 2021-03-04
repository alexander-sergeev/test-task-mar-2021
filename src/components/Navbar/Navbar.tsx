import { Button, Col, Divider, Drawer, Menu, Row, Space } from 'antd';
import { HomeOutlined, MenuOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { Trans } from 'react-i18next';
import LangSwitcher from '../LangSwitcher/LangSwitcher';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const Navbar = () => {
  const location = useLocation();
  const screens = useBreakpoint();
  const small = screens.xs;
  const [drawerVisible, setDrawerVisibility] = useState(false);

  const menu = (
    <Menu
      theme="dark"
      mode={small ? 'inline' : 'horizontal'}
      selectedKeys={[location.pathname]}
    >
      <Menu.Item key="/">
        <Link to="/">
          <HomeOutlined className="home-icon" />
          <Trans>Home link</Trans>
        </Link>
      </Menu.Item>
    </Menu>
  );
  const rightPane = (
    <Space>
      <LangSwitcher></LangSwitcher>
      <Button type="primary">
        <a href="/login">
          <Trans>Login link</Trans>
        </a>
      </Button>
    </Space>
  );
  if (small) {
    return (
      <>
        <Button onClick={() => setDrawerVisibility(true)} type="primary">
          <MenuOutlined />
        </Button>
        <Drawer
          placement="left"
          visible={drawerVisible}
          onClose={() => setDrawerVisibility(false)}
        >
          <Space direction="vertical">
            {menu}
            <Divider />
            {rightPane}
          </Space>
        </Drawer>
      </>
    );
  }
  return (
    <Row>
      <Col span={16}>{menu}</Col>
      <Col span={8} className="right-pane">
        {rightPane}
      </Col>
    </Row>
  );
};

export default Navbar;
