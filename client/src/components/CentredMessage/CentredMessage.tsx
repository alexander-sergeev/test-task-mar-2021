import React from 'react';
import './CentredMessage.css';

export type CentredMessageProps = {
  children: React.ReactNode;
};

const CentredMessage = (props: CentredMessageProps) => {
  return <div className="centred-message-wrapper">{props.children}</div>;
};

export default CentredMessage;
