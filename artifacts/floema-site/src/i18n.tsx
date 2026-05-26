/* @refresh reset */
/**
 * i18n — Gasosa Auto Agro
 *
 * Língua oficial do site: Português (PT)
 * Línguas suportadas: PT (padrão) | EN | ES
 *
 * A língua padrão é sempre PT. Alterações de língua são feitas
 * pelo utilizador através do LangDropdown no header.
 */
import { createContext, useContext, useState } from "react";
import { translations, type Lang } from "./translations";

/** Língua oficial/padrão do site */
const DEFAULT_LANG: Lang = "PT";

type I18nContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof translations)[Lang];
};

const I18nContext = createContext<I18nContextType>({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: translations[DEFAULT_LANG],
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLang() {
  return useContext(I18nContext);
}
