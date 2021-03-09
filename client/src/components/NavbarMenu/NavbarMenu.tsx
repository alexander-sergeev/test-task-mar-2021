import { Menu, MenuProps } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trans } from 'react-i18next';

const NavbarMenu = (props: MenuProps) => {
  const location = useLocation();
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[location.pathname]}
      {...props}
    >
      <Menu.Item key="/">
        <Link to="/">
          <HomeOutlined
            style={{ color: 'currentColor' }}
            className="home-icon"
          />
          <Trans>Home link</Trans>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default NavbarMenu;
