import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CustomInput from "../custom/CustomInput";
import CustomButton from "../custom/CustomButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Setting } from "../utilties/Setting";
import { AuthContext } from "../context/AuthProvider";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "../components/LanguageSwitch/LanguageSwitch";
import CustomLoading from "../custom/CustomLoading";
import './screenStyle.css'
import { useTheme } from "../context/ThemeContext";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setauth } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();


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
        navigate("/dashboard/statistics");
      }
      setLoading(false);
    } catch (error) {
      setLoginError(true)
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-100 ">


      <div className="container m-auto  border-b-2 border-gray-300">
        <div className="flex justify-end py-3">
          <LanguageSwitch />
        </div>
      </div>



      <div className=" flex justify-center items-center m-auto mt-10 m-5">

        <div className='rounded-lg  p-3 bg-white w-full  md:w-3/6 lg:w-3/12  py-10'>

          <h4 className="font-bold text-center text-2xl mb-10">{t('login')}</h4>

          <div className="mb-7">
            <CustomInput
              type="text"
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
            {error ? (
              <p className="text-red-600 font-semibold">{t("notallowedlogin")}</p>
            ) : (
              <></>
            )}
          </div>


          <div>
            {loginError ? (
              <p className="text-red-600 font-semibold">{t("error")}</p>
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


          <div className={`flex items-center justify-center my-3 ${i18n.language === 'ar' ? "flex-row-reverse" : ""}`}>
            <p className='text-sm'>{t("noaccount")} </p>
            <Link to="/register" className='mx-2 text-primary'>
              {t("register")}
            </Link>
          </div>

        </div>
      </div>
      {/* <div className={`rounded-lg shadow-lg p-3 bg-white w-full md:w-3/6 lg:w-3/12 m-5 py-10  `}>

        <div className="mb-10 flex items-center">
          <LanguageSwitch />
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
            <p className="text-red-600 font-semibold">{t("notallowedlogin")}</p>
          ) : (
            <></>
          )}
        </div>
        <div>
          {loginError ? (
            <p className="text-red-600 font-semibold">{t("error")}</p>
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
          <p className={`mx-2`}>{t("noaccount")} </p>
          <Link to="/register" className={`mx-2 `}>
            {t("register")}
          </Link>
        </div>

      </div> */}
    </div>
  );
}
