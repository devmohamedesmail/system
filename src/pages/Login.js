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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setauth } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t ,i18n} = useTranslation();

  const handlelogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${Setting.url}login`, {
        email,
        password,
      });
      setauth(response.data);
      if (auth.user.role === "user") {
        navigate("/");
        setError(true);
      } else {
        navigate("/dashboard/home");
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
    <div className="h-screen flex justify-center items-center">
      <div className="rounded-lg shadow-sm p-3 bg-white w-full md:w-3/6 lg:w-3/12 m-5 py-10">
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
        <div className="my-2">
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
        <div className={`flex items-center my-3 ${i18n.language === 'ar' ? "flex-row-reverse" :""}`}>
          <p className="text-sm">{t("noaccount")} </p>
          <Link to="/register" className="text-red-600 mx-2">
            {t("register")}
          </Link>
        </div>
        <div>
          <p className="text-center mb-3">{t("loginoptions")}</p>
          <hr />

          <div className="flex justify-evenly items-center my-5">
            <SocialLoginButton
              title={t("googlelogin")}
              image="/images/icons/google.png"
              link="#"
            />
            <SocialLoginButton
              title={t("facebooklogin")}
              image="/images/icons/facebook.png"
              link="#"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
