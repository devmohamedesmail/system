import React, { useContext, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
import { useTranslation } from 'react-i18next';
import { HiMiniBars4 } from "react-icons/hi2";
import { SidebarContext } from "../../context/SideBarProvider";
import axios from "axios";
import { Setting } from "../../utilties/Setting"
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";



export default function Header() {
  const [openDropMenu, setDropMenu] = useState(false);
  const { setSidebarstatus } = useContext(SidebarContext)
  const { t, i18n } = useTranslation();
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();



  const handleToggleMenu = () => {
    if (openDropMenu) {
      setDropMenu(false)
    } else {
      setDropMenu(true)
    }
  }

  const handleToggleSidebar = () => {
    setSidebarstatus(prevStatus => !prevStatus);

  }

  const handleLogout = async () => {
    try {
       await axios.post(`${Setting.url}logout`, {}, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      navigate("/")

    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className={`bg-white flex items-center justify-between py-4 px-10 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
      <div>
        <button className="bg-light p-2 rounded-full shadow-lg" onClick={() => handleToggleSidebar()}>
          <HiMiniBars4 size={25} color="primary" className="text-primary" />
        </button>
      </div>



      <div className={`flex items-center ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
        <LanguageSwitch />

        <div className="relative">
          <button className="flex items-center" onClick={() => handleToggleMenu()}>
            <img src="/images/icons/user.png" width={30} alt="user profile" />
            <FiChevronDown />
          </button>
          <div className={`flex flex-col absolute top-10 bg-white w-28 right-3 transition-max-height ease-in-out duration-1000 overflow-hidden ${openDropMenu ? 'max-h-40' : 'max-h-0 overflow-hidden'} `}>


            <button onClick={() => handleLogout()} className="hover:bg-slate-200 pl-3 pt-3 pb-3 pr-3">{t('logout')}</button>

          </div>
        </div>
      </div>

    </div>
  )
}
