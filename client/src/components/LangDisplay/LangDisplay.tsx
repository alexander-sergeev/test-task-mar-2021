import { Tag } from 'antd';
import React from 'react';
import { useLang } from '../../contexts/LanguageContext';

const LangDisplay = () => {
  const { language } = useLang();

  return <Tag>{language}</Tag>;
};

export default LangDisplay;
