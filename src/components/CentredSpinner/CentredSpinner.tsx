import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import CentredMessage from '../CentredMessage/CentredMessage';
import './CentredSpinner.css';

const CentredSpinner = () => {
  return (
    <CentredMessage>
      <LoadingOutlined className="cenrted-spinner" spin />
    </CentredMessage>
  );
};

export default CentredSpinner;
