import { Button, Dropdown, Menu } from 'antd';
import React from 'react';
import { Trans } from 'react-i18next';
import { useLang } from '../../contexts/LanguageContext';
import { LANGUAGES } from '../../i18n';

const LangSwitcher = () => {
  const { changeLang } = useLang();

  const langMenu = (
    <Menu>
      {LANGUAGES.map(({ name, code }) => (
        <Menu.Item onClick={() => changeLang(code)} key={code}>
          {name}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={langMenu} placement="bottomRight" arrow>
      <Button>
        <Trans>Change language</Trans>
      </Button>
    </Dropdown>
  );
};

export default LangSwitcher;
