import React, { useContext, useEffect, useState } from "react";
import CustomSectionTitle from "../../custom/CustomSectionTitle";
import { useTranslation } from "react-i18next";
import CustomInput from "../../custom/CustomInput";
import CustomButton from "../../custom/CustomButton";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import CustomModal from "../../custom/CustomModal";
import { Dropdown } from "primereact/dropdown";
import { DataContext } from "../../context/DataProvider";
import CustomLoading from "../../custom/CustomLoading";
import { useTheme } from "../../context/ThemeContext";

export default function AddProblem({ invoice }) {
  const { t } = useTranslation();

  const [step, setStep] = useState();
  const [problem, setProblem] = useState();
  const [reason, setReason] = useState();
  const [solution, setSolution] = useState();
  const [worker, setWorker] = useState();
  const { auth, setauth } = useContext(AuthContext);
  const [sales, setSales] = useState();
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [, , , , , , , , staff, fetchStaff] = useContext(DataContext);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const {theme}=useTheme();

  useEffect(() => {
    if (auth && auth.user) {
      setSales(auth.user.name);
    }
  }, [auth]);
  const handleAddProblem = async () => {
    setLoading(true);
    try {
      await axios.post(`${Setting.url}add/problem/${invoice.id}`, {
        step,
        problem,
        reason,
        solution,
        worker,
        sales,
      });
      setVisible(true);
      setPosition("top-right");
      setStep("");
      setProblem("");
      setReason("");
      setReason("");
      setWorker("");
      setLoading(false);
    } catch (error) {
      alert(t('error'));
    }finally{
      setLoading(false)
    }
  };

  const selectedCountryTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          {/* <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} /> */}
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        {/* <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} /> */}
        <div>{option.name}</div>
      </div>
    );
  };

  return (
    <div className={`my-3 p-3 ${theme==='light'? 'bg-white':'bg-black'}`}>
      <CustomSectionTitle title={t("addproblem")} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <CustomInput
            value={step}
            placeholder={t("step")}
            onchange={(e) => setStep(e.target.value)}
          />
        </div>
        <div>
          <CustomInput
            value={problem}
            placeholder={t("problem")}
            onchange={(e) => setProblem(e.target.value)}
          />
        </div>
        <div>
          <CustomInput
            value={reason}
            placeholder={t("reason")}
            onchange={(e) => setReason(e.target.value)}
          />
        </div>
        <div>
          <CustomInput
            value={solution}
            placeholder={t("solution")}
            onchange={(e) => setSolution(e.target.value)}
          />
        </div>

        <div
          className={`border ${
            isFocused ? "border-primary" : "border-black"
          } rounded`}
        >
          <Dropdown
            value={worker}
            onChange={(e) => setWorker(e.value.name)}
            options={staff}
            optionLabel="name"
            placeholder={worker ? worker : t("selectstaff")}
            filter
            valueTemplate={selectedCountryTemplate}
            itemTemplate={countryOptionTemplate}
            className={`w-full md:w-14rem focus:shadow-none shadow-none border-slate-200 ${
              isFocused
                ? "border-primary "
                : "focus:border-gray-300 shadow-slate-200 "
            } rounded`}
            onFocus={() => setIsFocused(true)} // Set focus state to true
            onBlur={() => setIsFocused(false)}
          />
        </div>
      </div>
      <div className="my-5">
        
          {loading ? (<CustomLoading />) :(<CustomButton title={t("add")} onpress={() => handleAddProblem()} />)}
      </div>
      <CustomModal
        visible={visible}
        setVisible={setVisible}
        position={position}
        setPosition={setPosition}
        content={t("problemadded")}
      />
    </div>
  );
}
