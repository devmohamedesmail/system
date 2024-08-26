import React, { useContext, useState } from "react";
import CustomPageTitle from "../../custom/CustomPageTitle";
import CustomDropDownMenu from "../../custom/CustomDropDownMenu";
import CustomInput from "../../custom/CustomInput";
import { Calendar } from "primereact/calendar";
import { useTranslation } from "react-i18next";
import { BranchesContext } from "../../context/BranchesProvider";
import { DataContext } from "../../context/DataProvider";
import { useLocation } from "react-router-dom";
import CustomButton from "../../custom/CustomButton";
import { Setting } from "../../utilties/Setting";
import axios from "axios";
import CustomSectionTitle from "../../custom/CustomSectionTitle";
import CustomCalender from "../../custom/CustomCalender";
import CustomModal from "../../custom/CustomModal";

export default function EditPurchases() {
  const { t } = useTranslation();
  const location = useLocation();
  const purchase = location.state?.purchase;
  const [branch, setBranch] = useState(purchase.branch_id);
  const [department, setDepartment] = useState(purchase.department_id);
  const [title, setTitle] = useState(purchase.title);
  const [quantity, setQuantity] = useState(purchase.quantity);
  const [price, setPrice] = useState(purchase.price);
  const [date, setDate] = useState(purchase.date);
  const { branches,  } = useContext(BranchesContext);
  const [, , , , , , departments, ] = useContext(DataContext);
  const [branchName,setbranchName]=useState("")
  const [departmentName,setDepartmentName]=useState("")
  const[branchError,setBranchError]=useState(false)
  const[departmentError,setDepartmentError]=useState(false)
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");

  const handleupdate = async () => {
    try {
      await axios.post(`${Setting.url}update/purchases/${purchase.id}`, {
        branch,
        department,
        title,
        quantity,
        price,
        date,
      });
      setVisible(true)
      setPosition("top-right");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <CustomPageTitle title={t("editpurchase")} />
      <div className="bg-white my-3 py-10 px-2">
       
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
          </div>

          <div>
            <CustomDropDownMenu
              value={departmentName}
              onchange={(e) => {
                setDepartment(e.value.id)
                setDepartmentName(e.value.name)
              }}
              options={departments}
              optionLabel="name"
              placeholder={t("department")}
            />
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
          <CustomCalender value={date} onchange={(e) => setDate(e.value)} placeholder={t('date')} />
        </div>
        <div>
          <CustomButton title={t("update")} onpress={() => handleupdate()} />
        </div>
        <CustomModal
        visible={visible}
        setVisible={setVisible}
        position={position}
        setPosition={setPosition}
        content={t("purchasesupdated")}
      />
      </div>
    </div>
  );
}
