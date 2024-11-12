import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo/Logo";
import CustomInput from "../custom/CustomInput";
import CustomButton from "../custom/CustomButton";
import SocialLoginButton from "../components/SocialLoginButton.js/SocialLoginButton";
import axios from "axios";
import { Setting } from "../utilties/Setting";
import CustomLoading from "../custom/CustomLoading";
import LanguageSwitch from "../components/LanguageSwitch/LanguageSwitch";
import { useTranslation } from "react-i18next";
import i18n from "../translation/i18n";
import { useTheme } from "../context/ThemeContext";
import SwitchMode from "../components/SwitchMode/SwitchMode";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation()
  const {theme} =useTheme();

  const handleRegister = async () => {
    try {
      setLoading(true);
      await axios.post(`${Setting.url}register`, {
        name,
        email,
        password,
      }, {
        withCredentials: true, // Important for sending cookies with CORS requests
      });

      setLoading(false);
      navigate("/");
    } catch (error) {
      alert(t('error'));
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center login-page">
      <div className="overlay-bg w-full h-full flex justify-center items-center">
        <div className={`rounded-lg shadow-sm p-3  w-full md:w-3/6 lg:w-3/12 m-5 py-10 login-container  ${theme === 'light' ? 'bg-white' : 'bg-black'} `}>

          <div className="mb-10 flex items-center">
            <LanguageSwitch />
          </div>

          <div className="mb-3">
            <CustomInput
              type="email"
              placeholder={t("email")}
              onchange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <CustomInput
              type="text"
              placeholder={t("name")}
              onchange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <CustomInput
              type="password"
              placeholder={t("password")}
              onchange={(e) => setPassword(e.target.value)}
            />
          </div>

         <div className="my-10">
         {loading ? (
            <CustomLoading />
          ) : (
            <CustomButton
              title={t("register")}
              width="w-full"
              onpress={() => handleRegister()}
            />
          )}
         </div>


          

          <div className={`flex items-center my-3 ${i18n.language === 'ar' ? "flex-row-reverse" : ""}`}>
            <p className={`mx-2 font-bold ${theme=== 'light' ? "text-black" : "text-white"}`}>{t('haveaccount')}</p>
            <Link to="/" className={`mx-2 ${theme=== 'light' ? "text-dark-mode" : "text-primary"}`}>
              {t("login")}
            </Link>
          </div>
         
        </div>
      </div>
    </div>
  );
}
