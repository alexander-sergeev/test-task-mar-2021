import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Row, Typography } from 'antd';
import React from 'react';
import { Trans } from 'react-i18next';
import CentredSpinner from '../../components/CentredSpinner/CentredSpinner';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
  const { profile, logout } = useAuth();
  if (profile == null) {
    return <CentredSpinner />;
  }
  return (
    // https://github.com/ant-design/ant-design/issues/10144
    <div style={{ overflow: 'hidden' }}>
      <Row justify="center" style={{ padding: '24px' }} gutter={64}>
        <Col xs="24" md="6">
          <Avatar shape="square" size={96} src={profile.picture} />
        </Col>
        <Col xs="24" md="12">
          <Typography.Title level={2}>{profile.name}</Typography.Title>
          <Typography.Paragraph>
            <Trans>User's language</Trans>: {profile.locale}
          </Typography.Paragraph>
          <Button type="primary" onClick={() => logout()}>
            <LogoutOutlined /> <Trans>Logout</Trans>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
