import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import CustomInput from "../../custom/CustomInput";
import CustomSectionTitle from "../../custom/CustomSectionTitle";
import CustomButton from "../../custom/CustomButton";
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import CustomDropDownMenu from "../../custom/CustomDropDownMenu";
import { DataContext } from "../../context/DataProvider";
import CustomLoading from "../../custom/CustomLoading";
import CustomModal from "../../custom/CustomModal";
import CustomTextArea from "../../custom/CustomTextArea";

export default function AddEmployeeSection() {
  const { t } = useTranslation();
  const [name, setName] = useState();
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState("center");
  const [, , , , , , departments] = useContext(DataContext);
  const [staffModel, setStaffModel] = useState(false);
  const [department, setDepartemt] = useState(null);
  const [departmentName, setDepartemtName] = useState();
  const [salary, setSalary] = useState();
  const [discount, setDiscount] = useState();
  const [advance, setAdvance] = useState();
  const [comments,setComments]=useState();
  const [errorDepartment,setErrorDepartment]=useState(false);

  const handleAddStaff = async () => {
    if(department === null){
        setErrorDepartment(true);
        return;
    }
    setLoading(true);
    try {
      await axios.post(`${Setting.url}add/new/staff`, {
        department,
        name,
        salary,
        discount,
        advance,
        comments
      });

      setLoading(false);
      setStaffModel(true);
      setName("");
      setSalary("");
      setDiscount("");
      setAdvance("");
      setComments("");
      setPosition("top-right");
      
    } catch (error) {
      alert(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white p-4">
      <CustomSectionTitle title={t("addnewstaff")} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <CustomDropDownMenu
            value={departmentName}
            onchange={(e) => {
              setDepartemt(e.value.id);
              setDepartemtName(e.value.name);
            }}
            options={departments}
            optionLabel="name"
            placeholder={t("department")}
          />
          {errorDepartment?(<p className="text-red-600">{t('required')}</p>):(<></>)}
        </div>

        <div>
          <CustomInput
            placeholder={t("name")}
            value={name}
            onchange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <CustomInput
            placeholder={t("salary")}
            value={salary}
            onchange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div>
          <CustomInput
            placeholder={t("discount")}
            value={discount}
            onchange={(e) => setDiscount(e.target.value)}
          />
        </div>
        <div>
          <CustomInput
            placeholder={t("advance")}
            value={advance}
            onchange={(e) => setAdvance(e.target.value)}
          />
        </div>
        <div>
          <CustomTextArea value={comments} placeholder={t('comments')} onchange={(e)=>setComments(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <CustomLoading />
      ) : (
        <CustomButton title={t("add")} onpress={() => handleAddStaff()} />
      )}

      <CustomModal
        visible={staffModel}
        setVisible={setStaffModel}
        position={position}
        setPosition={setPosition}
        content={t("staffadded")}
      />
    </div>
  );
}
