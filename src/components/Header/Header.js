import React, { useContext, useEffect, useState } from "react";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { Setting } from "../../utilties/Setting"
import { AuthContext } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import CustomTabButton from "../../custom/CustomTabButton";
import { RxDashboard } from "react-icons/rx";

import SubMenu from "./SubMenu";




export default function Header() {
  const { t, i18n } = useTranslation();
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('/dashboard/statistics');

  const handleTabChange = (link) => {
    setActiveTab(link);
  };




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


  useEffect(() => {
    setUser(auth)
  }, [auth])

  return (
    <div className={` mb-10 py-5 sticky bg-white top-0 shadow  z-50 `}>
      <div className={`container-fluid px-10 m-auto flex items-center justify-between ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
        <div className="relative">

          <div className="flex">

            <Link to='/dashboard/statistics' className="bg-primary flex justify-center items-center h-12 w-12 rounded-lg mx-3">
              <RxDashboard color="white" size={20} />
            </Link>

            <CustomTabButton
              link='/dashboard/jobcards/page'
              title={t('jobcards')}
              isActive={activeTab === '/dashboard/jobcards/page'}
              onTabChange={handleTabChange}
            />
            <CustomTabButton
              link='/dashboard/show/all/invoices'
              title={t('invoices')}
              isActive={activeTab === '/dashboard/show/all/invoices'}
              onTabChange={handleTabChange}
            />
            <CustomTabButton
              link='/dashboard/create/new/invoice'
              title={t('createnewinvoice')}
              isActive={activeTab === '/dashboard/create/new/invoice'}
              onTabChange={handleTabChange}
            />
            <CustomTabButton
              link='/dashboard/show/employees'
              title={t('employees')}
              isActive={activeTab === '/dashboard/show/employees'}
              onTabChange={handleTabChange}
            />

           <SubMenu />

          </div>

        </div>



        <div className={`flex items-center ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
          {/* <SwitchMode /> */}
          <LanguageSwitch />

          <div className="relative">


            <div className="flex items-center">
              {user ? (
                <p className={`${theme === 'light' ? 'text-black' : 'text-white'}`}> {auth.user.name}</p> // Assuming user has a name property
              ) : (
                <p>Please log in.</p>
              )}

              <button onClick={() => handleLogout()} className="bg-light-mode text-white p-2 rounded-md text-sm mx-2">{t('logout')}</button>
            </div>


          </div>
        </div>
      </div>

    </div>
  )
}
