import { Button, Dropdown, Menu } from 'antd';
import React from 'react';
import { Trans } from 'react-i18next';
import { useLang } from '../../contexts/LanguageContext';
import { LANGUAGES } from '../../config/i18n';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';

const LangSwitcher = () => {
  const { changeLang } = useLang();

  const onLangClick: MenuClickEventHandler = (event) =>
    changeLang(event.key.toString(), true);

  const langMenu = (
    <Menu onClick={onLangClick}>
      {LANGUAGES.map(({ name, code }) => (
        <Menu.Item key={code}>{name}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={langMenu} placement="bottomCenter" arrow>
      <Button>
        <Trans>Change language</Trans>
      </Button>
    </Dropdown>
  );
};

export default LangSwitcher;
