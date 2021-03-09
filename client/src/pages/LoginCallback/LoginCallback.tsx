import React, { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import CentredMessage from '../../components/CentredMessage/CentredMessage';

const LoginCallback = () => {
  const [done, setDone] = useState<boolean>(false);
  const { exchangeCode } = useAuth();

  useEffect(() => {
    (async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      if (code == null) {
        setDone(true);
        return;
      }
      try {
        await exchangeCode(code);
      } finally {
        setDone(true);
      }
    })();
  }, [exchangeCode]);

  if (done) {
    return <Redirect to="/" />;
  }

  return (
    <CentredMessage>
      <Trans>Processing auth...</Trans>
    </CentredMessage>
  );
};

export default LoginCallback;
