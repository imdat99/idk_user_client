import { Languages } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n, { languages } from "Translation";

const LanguageBtn = () => {
  const { t } = useTranslation("common");
  const [lang, setLang] = useState("0");
  React.useLayoutEffect(() => {
    i18n.changeLanguage(languages[Number(lang)]);
  }, [lang]);
  return (
    <div className="fixed bottom-4 left-4 flex items-center space-x-2">

      <div
        className="flex w-full rounded-lg p-2 transition bg-gray/20"
      >
        <select
          id="language-select"
          className="bg-transparent border-none focus:outline-none outline-none text-black  cursor-pointer"
          value={lang}
          onChange={(e) => {
            setLang(e.target.value);
          }}
        >
          <option value={0}>{t("app.language."+languages[0])}</option>
          <option value={1}>{t("app.language."+languages[1])}</option>
        </select>
      </div>
      {/*  */}
    </div>
  );
};

export default LanguageBtn;
