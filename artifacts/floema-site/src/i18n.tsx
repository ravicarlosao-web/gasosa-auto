import { createContext, useContext, useState } from "react";
import { translations, type Lang } from "./translations";

type I18nContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof translations)[Lang];
};

const I18nContext = createContext<I18nContextType>({
  lang: "PT",
  setLang: () => {},
  t: translations.PT,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("PT");
  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLang() {
  return useContext(I18nContext);
}
