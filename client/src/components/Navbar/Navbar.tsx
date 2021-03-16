import { Button, Col, Divider, Drawer, Row, Space } from 'antd';
import { LoadingOutlined, MenuOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import './Navbar.css';
import { Trans } from 'react-i18next';
import LangSwitcher from '../LangSwitcher/LangSwitcher';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import NavbarMenu from '../NavbarMenu/NavbarMenu';
import { useAuth } from '../../contexts/AuthContext';
import Avatar from 'antd/lib/avatar/avatar';
import { Link } from 'react-router-dom';
import LangDisplay from '../LangDisplay/LangDisplay';

const Navbar = () => {
  const screens = useBreakpoint();
  const small = screens.xs;
  const [drawerVisible, setDrawerVisibility] = useState(false);
  const { authenticated, profile } = useAuth();

  const user = authenticated ? (
    <Link to="/profile">
      <Avatar
        className="avatar"
        src={profile?.picture}
        icon={<LoadingOutlined spin />}
      />
    </Link>
  ) : (
    <Button type="primary">
      <a href="/login">
        <Trans>Login link</Trans>
      </a>
    </Button>
  );

  const rightPane = (
    <Space>
      <LangDisplay></LangDisplay>
      <LangSwitcher></LangSwitcher>
      {user}
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
