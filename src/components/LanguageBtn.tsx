import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n, { languages } from "Translation";

const LanguageBtn = () => {
  const { t } = useTranslation("common");
  const [lang, setLang] = useState(false);
  React.useLayoutEffect(() => {
    i18n.changeLanguage(languages[Number(lang)]);
  }, [lang]);
  return (
    <div>
      <button
        onClick={() => {
          setLang((prev) => !prev);
        }}
      >
        {t("app.language")}: {i18n.language}
      </button>
    </div>
  );
};

export default LanguageBtn;
