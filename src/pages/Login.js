import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo/Logo";
import CustomInput from "../custom/CustomInput";
import CustomButton from "../custom/CustomButton";
import SocialLoginButton from "../components/SocialLoginButton.js/SocialLoginButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Setting } from "../utilties/Setting";
import { AuthContext } from "../context/AuthProvider";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "../components/LanguageSwitch/LanguageSwitch";
import CustomLoading from "../custom/CustomLoading";
import './screenStyle.css'
import SwitchMode from "../components/SwitchMode/SwitchMode";
import { useTheme } from "../context/ThemeContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setauth } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const {theme}=useTheme()

  const handlelogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${Setting.url}login`, {
        email,
        password,
      }, {
        withCredentials: true, // Important for sending cookies with CORS requests
      });
      setauth(response.data);
      if (auth.user.role === "user") {
        navigate("/");
        setError(true);
      } else {
        navigate("/dashboard/statistics");
      }
      setLoading(false);
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
            {/* <SwitchMode /> */}
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
              type="password"
              placeholder={t("password")}
              onchange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            {error ? (
              <p className="text-red-600 font-bold">{t("notallowedlogin")}</p>
            ) : (
              <></>
            )}
          </div>
          <div className="my-10">
            {loading ? (
              <CustomLoading />
            ) : (
              <CustomButton
                title={t("login")}
                width="w-full"
                onpress={() => handlelogin()}
              />
            )}
          </div>
          <div className={`flex items-center my-3 ${i18n.language === 'ar' ? "flex-row-reverse" : ""}`}>
            <p className={`mx-2 font-bold ${theme=== 'light' ? "text-black" : "text-white"}`}>{t("noaccount")} </p>
            <Link to="/register" className={`mx-2 ${theme=== 'light' ? "text-dark-mode" : "text-primary"}`}>
              {t("register")}
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
