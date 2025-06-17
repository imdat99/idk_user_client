import { languages } from 'Translation';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import "rc-select/assets/index.css";
const LanguageBtn = () => {
  const { t, i18n } = useTranslation('common');
  const [lang, setLang] = useState(i18n.language);
  React.useLayoutEffect(() => {
    console.log('LanguageBtn useLayoutEffect', lang, i18n.language);
    i18n.changeLanguage(lang);
  }, [lang]);
  return (
    <>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="cursor-pointer focus:outline-none"
      >
        {languages.map((label, index) => (
          <option key={index} value={label}>
            {t('app.language.' + label)} ({label.toUpperCase()})
          </option>
        ))}
      </select>
    </>
  );
};

export default LanguageBtn;
