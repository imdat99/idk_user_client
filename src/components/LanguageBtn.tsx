import RcSelect from "rc-select";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n, { languages } from "Translation";
import { ChevronDown, X, Loader2 } from "lucide-react";
// import "rc-select/assets/index.css";
const LanguageBtn = () => {
  const { t } = useTranslation("common");
  const [lang, setLang] = useState("0");
  React.useLayoutEffect(() => {
    i18n.changeLanguage(languages[Number(lang)]);
  }, [lang]);
  return (
    <div className="fixed bottom-4 left-4 flex items-center space-x-2">
      {/* <div
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
      </div> */}
      {/*  */}
      <RcSelect
        className="w-full"
        placeholder={t("app.language.select")}
        showSearch
        // prefixCls="xemdi"
        // prefix={<Languages />}
        mode="tags"
        suffixIcon={<ChevronDown className="h-4 w-4 opacity-50" />}
        removeIcon={<X className="h-3.5 w-3.5 opacity-60 hover:opacity-100" />}
        dropdownMatchSelectWidth={false}
        options={languages.map((lang, index) => ({
          value: index.toString(),
          label: t("app.language." + lang),
        }))}
        value={lang}
        onChange={setLang}
      />
    </div>
  );
};

export default LanguageBtn;
