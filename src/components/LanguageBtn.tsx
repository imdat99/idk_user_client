import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n, { languages } from "Translation";
// import "rc-select/assets/index.css";
const LanguageBtn = () => {
  const { t } = useTranslation("common");
  const [lang, setLang] = useState("0");
  React.useLayoutEffect(() => {
    i18n.changeLanguage(languages[Number(lang)]);
  }, [lang]);
  return (
    <>
    <select value={lang} onChange={(e) => setLang(e.target.value)} className="cursor-pointer focus:outline-none">
      {languages.map((label, index) => (
        <option key={index} value={index}>
          {t("app.language." + label)} ({label.toUpperCase()})
        </option>
      ))}
    </select>
    </>
    // <div className="fixed top-4 rounded-md bg-white p-2 right-4 flex items-center space-x-2 max-w-[120px] shadow-md z-50">
    //   <RcSelect
    //     className="cursor-pointer"
    //     placeholder={t("app.language.select")}
    //     suffixIcon={<ChevronDown className="h-4 w-4 opacity-50" />}
    //     removeIcon={<X className="h-3.5 w-3.5 opacity-60 hover:opacity-100" />}
    //     dropdownMatchSelectWidth={false}
    //     options={languages.map((label, index) => ({
    //       value: index.toString(),
    //       label: (
    //         <div className="flex items-center space-x-2">
    //           <img
    //             className="w-6 h-6"
    //             src={`/assets/images/${label}_flag.svg`}
    //             alt={lang}
    //           />
    //           <span className="ml-2">{label.toUpperCase()}</span>
    //         </div>
    //       ),
    //     }))}
    //     optionRender={(option) => {
    //       const lang = languages[Number(option.value)];
    //       return (
    //         <div className="flex items-center space-x-2">
    //           <img
    //             className="w-6 h-6"
    //             src={`/assets/images/${lang}_flag.svg`}
    //             alt={lang}
    //           />
    //           <span className="ml-2">{t("app.language." + lang)} ({lang.toUpperCase()})</span>
    //         </div>
    //       );
    //     }}
    //     value={lang}
    //     onChange={setLang}
    //   />
    // </div>
  );
};

export default LanguageBtn;
