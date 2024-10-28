import React from 'react'
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';


export default function LanguageSwitch() {
  const { i18n } = useTranslation();
  const {theme} = useTheme();



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
      <button className={`mx-5 p-2  text-sm hover:cursor-pointer rounded-md ${theme === 'light' ? 'bg-light-mode text-white' : 'bg-primary text-black'} } `} onClick={() => changeLanguage(oppositeLanguage)}>
        {languages[oppositeLanguage]}
      </button>
    </div>


  )
}
