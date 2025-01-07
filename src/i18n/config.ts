import { Language } from '@/shared/enumeration/language';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
// import eng language
import apiErrorsEn from './en/apiError.json';
import countryEn from './en/country.json';
import enumEn from './en/enum.json';
import translationEn from './en/translation.json';

// import vi language
import apiErrorsVi from './vi/apiError.json';
import countryVi from './vi/country.json';
import enumVi from './vi/enum.json';
import translationVi from './vi/translation.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const resources = {
  en: {
    translation: { ...translationEn, ...countryEn, ...enumEn, ...apiErrorsEn },
  },
  vi: {
    translation: { ...translationVi, ...countryVi, ...enumVi, ...apiErrorsVi },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: Language.en, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
