import React from 'react';
import { Trans } from 'react-i18next';
import CentredMessage from '../../components/CentredMessage/CentredMessage';

function Home() {
  return (
    <CentredMessage>
      <Trans>Error 404</Trans>
    </CentredMessage>
  );
}


export default Home;
