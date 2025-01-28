import React from 'react'
import { useTranslation } from 'react-i18next';



export default function LanguageSwitch() {
  const { i18n } = useTranslation();


  // Define the languages
  const languages = {
    en: 'English',
    ar: 'عربي',
  };

  // Get the current language and the opposite language
  const currentLanguage = i18n.language;
  const oppositeLanguage = currentLanguage === 'en' ? 'ar' : 'en';


  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (


    <div>
      <button className={`mx-5 py-3 px-7  text-sm hover:cursor-pointer rounded-md bg-primary text-white } `} onClick={() => changeLanguage(oppositeLanguage)}>
        {languages[oppositeLanguage]}
      </button>
    </div>


  )
}
