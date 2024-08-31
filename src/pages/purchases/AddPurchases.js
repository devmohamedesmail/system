import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BranchesContext } from "../../context/BranchesProvider";
import { DataContext } from "../../context/DataProvider";
import CustomDropDownMenu from "../../custom/CustomDropDownMenu";
import CustomInput from "../../custom/CustomInput";
import CustomButton from "../../custom/CustomButton";
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import { Calendar } from "primereact/calendar";
import CustomLoading from "../../custom/CustomLoading";
import CustomCalender from "../../custom/CustomCalender";



export default function AddPurchases({fetchpurchases}) {
    const { t } = useTranslation();
    const [branch, setBranch] = useState(null);
    const [department, setDepartment] = useState(null);
    const [title, setTitle] = useState();
    const [quantity, setQuantity] = useState();
    const [price, setPrice] = useState();
    const [date, setDate] = useState();
    const { branches, fetchBranches } = useContext(BranchesContext);
    const [, , , , , , departments, ,] = useContext(DataContext);
    const [branchName,setbranchName]=useState("")
    const [departmentName,setDepartmentName]=useState("")
    const[branchError,setBranchError]=useState(false)
    const[departmentError,setDepartmentError]=useState(false)
    
    const [loading, setLoading] = useState(false);

    const handleAddPurchase = async () => {
      if (branch === null) {
        setBranchError(true)
        return;
      }
      if (department === null) {
        setDepartmentError(true)
        return;
      }
      setLoading(true)
      try {
        await axios.post(`${Setting.url}add/purchases`, {
          branch,
          department,
          title,
          quantity,
          price,
          date,
        });
        setTitle("");
        setQuantity("");
        setPrice("");
        setDate("");
        fetchpurchases();
        setLoading(false);
      } catch (error) {
        alert(t('error'));
        setLoading(false);
      }finally{
        setLoading(false);
      }
    };

  
  
  return (
    <div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          <div>
            <CustomDropDownMenu
              value={branchName}
              onchange={(e) => {
                setBranch(e.value.id)
                setbranchName(e.value.name)
              }}
              options={branches}
              optionLabel="name"
              placeholder={t("selectbranch")}
            />

            {branchError ? (<p className="text-red-600">{t('required')}</p>):(<></>)}
          </div>

          <div>
            <CustomDropDownMenu
              value={departmentName}
              onchange={(e) => {
                setDepartment(e.value.id);
                setDepartmentName(e.value.name)
              }}
              options={departments}
              optionLabel="name"
              placeholder={t("department")}
            />
            {departmentError ? (<p className="text-red-600">{t('required')}</p>):(<></>)}
          </div>
          <div>
            <CustomInput
              value={title}
              placeholder={t("title")}
              onchange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <CustomInput
              value={quantity}
              placeholder={t("quantity")}
              onchange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div>
            <CustomInput
              value={price}
              placeholder={t("price")}
              onchange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="">
            <CustomCalender value={date} onchange={(e) => setDate(e.value)} placeholder={t('date')} />
          </div>
        </div>
        <div>
          {loading? (<CustomLoading />):(<CustomButton title={t("add")} onpress={() => handleAddPurchase()} />)}
        </div>
    </div>
  )
}
