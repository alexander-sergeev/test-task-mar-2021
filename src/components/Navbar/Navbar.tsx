import { Button, Col, Dropdown, Menu, Row, Space } from 'antd';
import {
  HomeOutlined,
} from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const langMenu = (
  <Menu>
    <Menu.Item>
      English
    </Menu.Item>
  </Menu>
);

function Navbar() {
  return (
    <>
      <Row>
        <Col span={6}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[window.location.pathname]}> 
            <Menu.Item key="/">
              <Link to="/">
                <HomeOutlined className="home-icon" />
                Home
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={18} className="right-pane">
          <Space>
            <Dropdown overlay={langMenu} placement="bottomRight" arrow>
              <Button>Lang</Button>
            </Dropdown>
            <Button type="primary">Login</Button>
          </Space>
        </Col>
      </Row>
    </>
  );
}

export default Navbar;
