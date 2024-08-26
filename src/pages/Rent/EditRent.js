import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import CustomPageTitle from "../../custom/CustomPageTitle";
import CustomSectionTitle from "../../custom/CustomSectionTitle";
import { useTranslation } from "react-i18next";
import { BranchesContext } from "../../context/BranchesProvider";
import CustomInput from "../../custom/CustomInput";
import CustomButton from "../../custom/CustomButton";
import { Calendar } from "primereact/calendar";
import CustomDropDownMenu from "../../custom/CustomDropDownMenu";
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import CustomCalender from "../../custom/CustomCalender";

export default function EditRent() {
  const location = useLocation();
  const rent = location.state?.rent;
  const { t } = useTranslation();
  const [branch, setBranch] = useState(rent.branch_id);
  const { branches } = useContext(BranchesContext);
  const [bills, setBills] = useState(rent.bills);
  const [amount, setAmount] = useState(rent.amount);
  const [month, setMonth] = useState(rent.month);
  const[branchName,setBranchName]=useState();
  
  const handleUpdateRent = async () =>{
    await axios.post(`${Setting.url}update/rent/${rent.id}`,{
        branch,bills,amount,month
    })
  }
  return (
    <div>
      <CustomPageTitle title={t("editrent")} />
      <div className="my-3 p-2 bg-white">
        <CustomSectionTitle title={t("editrent")} />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          <div>
            <CustomDropDownMenu
              value={branchName}
              optionLabel="name"
              options={branches}
              placeholder={t('branch')}
              onchange={(e) => 
              {
                setBranch(e.value.id)
                setBranchName(e.value.name)
              }
              }
            />
          </div>
          <div>
            <CustomInput
              value={bills}
              placeholder={t("bills")}
              onchange={(e) => setBills(e.target.value)}
            />
          </div>
          <div>
            <CustomInput
              value={amount}
              placeholder={t("amount")}
              onchange={(e) => setAmount(e.target.value)}
            />
          </div>
         
          <CustomCalender value={month} onchange={(e) => setMonth(e.value)} placeholder={t('date')} />
        </div>
       
        <div>
          <CustomButton title={t("update")} onpress={() => handleUpdateRent()} />
        </div>
      </div>
    </div>
  );
}
