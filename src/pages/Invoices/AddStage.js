import React, { useState, useContext } from "react";
import CustomSectionTitle from "../../custom/CustomSectionTitle";
import { useTranslation } from "react-i18next";
import CustomInput from "../../custom/CustomInput";
import { DataContext } from "../../context/DataProvider";
import { Dropdown } from "primereact/dropdown";
import CustomCalender from "../../custom/CustomCalender";
import CustomButton from "../../custom/CustomButton";
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import CustomLoading from "../../custom/CustomLoading";

export default function AddStage({ invoice }) {
  const { t } = useTranslation();
  const [name, setName] = useState();
  const [worker, setWorker] = useState();
  const [, , , , , , , , staff, fetchStaff] = useContext(DataContext);
  const [isFocused, setIsFocused] = useState(false);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [loading,setLoading]=useState(false)

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

  const handleAddStage = async () => {
   setLoading(true)
    try {
        await axios.post(`${Setting.url}add/stage/${invoice.id}`,{
            name,worker,start,end
        })
        setLoading(false)
    } catch (error) {
        alert(error)
        setLoading(false)
    }finally{
        setLoading(false)
    }
  };
  return (
    <div className="my-3 bg-white p-2">
      <CustomSectionTitle title={t("addstage")} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          {" "}
          <CustomInput
            value={name}
            onchange={(e) => setName(e.target.value)}
            placeholder={t("stagename")}
          />
        </div>
        <div>
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

        <div>
          <CustomCalender
            value={start}
            placeholder={t("startdate")}
            onchange={(e) => setStart(e.target.value)}
          />
        </div>
        <div>
          <CustomCalender
            value={end}
            placeholder={t("enddate")}
            onchange={(e) => setEnd(e.target.value)}
          />
        </div>
      </div>
      <div className="my-3">
       
        {loading? (<CustomLoading />) : ( <CustomButton title={t("add")} onpress={() => handleAddStage()} />)}
      </div>

    </div>
  );
}
