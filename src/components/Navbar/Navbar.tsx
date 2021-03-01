import { Button, Col, Dropdown, Menu, Row, Space } from 'antd';
import {
  HomeOutlined,
} from '@ant-design/icons';
import React from 'react';
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
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="home">
              <HomeOutlined className="home-icon" />
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
