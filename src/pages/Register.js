import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../custom/CustomInput";
import CustomButton from "../custom/CustomButton";
import axios from "axios";
import { Setting } from "../utilties/Setting";
import CustomLoading from "../custom/CustomLoading";
import LanguageSwitch from "../components/LanguageSwitch/LanguageSwitch";
import { useTranslation } from "react-i18next";
import i18n from "../translation/i18n";
import { useTheme } from "../context/ThemeContext";


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation()
  const { theme } = useTheme();
  const [loginError, setLoginError] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      await axios.post(`${Setting.url}register`, {
        name,
        email,
        password,
      });

      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setLoginError(true);
    } finally {
      setLoading(false);
      setLoginError(false);
    }
  };
  return (
    <div className="h-screen bg-gray-100 ">

      <div className="container m-auto  border-b-2 border-gray-300">
        <div className="flex justify-end py-3">
          <LanguageSwitch />
        </div>
      </div>




      <div className="flex justify-center items-center m-auto mt-10 m-5r">
        <div className='rounded-lg shadow-sm p-3 bg-white w-full md:w-3/6 lg:w-3/12 m-5 py-10 login-container'>

          <h4 className="font-bold text-center text-2xl mb-10">{t('register')}</h4>

          <div className="mb-7">
            <CustomInput
              type="text"
              placeholder={t("name")}
              onchange={(e) => setName(e.target.value)}
            />
          </div>



          <div className="mb-7">
            <CustomInput
              type="email"
              placeholder={t("email")}
              onchange={(e) => setEmail(e.target.value)}
            />
          </div>





          <div className="mb-7">
            <CustomInput
              type="password"
              placeholder={t("password")}
              onchange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            {loginError ? (
              <p className="text-red-600 font-bold">{t("error")}</p>
            ) : (
              <></>
            )}
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




          <div className={`flex items-center justify-center my-3 ${i18n.language === 'ar' ? "flex-row-reverse" : ""}`}>
            <p >{t('haveaccount')}</p>
            <Link to="/" className='mx-2 text-primary'>
              {t("login")}
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
