import React from 'react';
import { Trans } from 'react-i18next';
import CentredMessage from '../../components/CentredMessage/CentredMessage';

const Error404 = () => {
  return (
    <CentredMessage>
      <Trans>Error 404</Trans>
    </CentredMessage>
  );
};

export default Error404;
