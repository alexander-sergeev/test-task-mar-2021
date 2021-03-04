import { Button, Col, Divider, Drawer, Row, Space } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import './Navbar.css';
import { Trans } from 'react-i18next';
import LangSwitcher from '../LangSwitcher/LangSwitcher';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import NavbarMenu from '../NavbarMenu/NavbarMenu';

const Navbar = () => {
  const screens = useBreakpoint();
  const small = screens.xs;
  const [drawerVisible, setDrawerVisibility] = useState(false);

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
            <NavbarMenu mode="inline" theme="light" />
            <Divider />
            {rightPane}
          </Space>
        </Drawer>
      </>
    );
  }
  return (
    <Row>
      <Col span={16}>
        <NavbarMenu />
      </Col>
      <Col span={8} className="right-pane">
        {rightPane}
      </Col>
    </Row>
  );
};

export default Navbar;
