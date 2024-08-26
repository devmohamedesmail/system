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

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {t}=useTranslation()

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
      alert(t('error'));
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="rounded-md shadow-sm p-3 bg-white  w-full md:w-3/6 lg:w-3/12 m-5 py-10">
      <LanguageSwitch />
        <div className="flex justify-center">
          <Logo width={300} />
        </div>
        <div className="mb-3">
          <CustomInput
            type="text"
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

        {loading ? (
          <CustomLoading />
        ) : (
          <CustomButton
            title={t("register")}
            width="w-full"
            onpress={() => handleRegister()}
          />
        )}

        <div className={`flex items-center my-3 ${i18n.language === 'ar' ? "flex-row-reverse" :""}`}>
          <p className="text-sm">{t('haveaccount')}</p>
          <Link to="/" className="text-red-600 mx-2">
          {t("login")}
          </Link>
        </div>
        <div>
          <p className="text-center mb-3">{t('loginoptions')}</p>
          <hr />

          <div className="flex justify-evenly items-center my-5">
            <SocialLoginButton
              title={t('googlelogin')}
              image="/images/icons/google.png"
              link="#"
            />
            <SocialLoginButton
              title={t('facebooklogin')}
              image="/images/icons/facebook.png"
              link="#"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
