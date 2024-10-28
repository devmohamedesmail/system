import React, { useState, useContext } from "react";
import CustomSectionTitle from "../../custom/CustomSectionTitle";
import CustomInput from "../../custom/CustomInput";
import CustomDropDownMenu from "../../custom/CustomDropDownMenu";
import CustomModal from "../../custom/CustomModal";
import CustomLoading from "../../custom/CustomLoading";
import CustomButton from "../../custom/CustomButton";
import { BranchesContext } from "../../context/BranchesProvider";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import { DataContext } from "../../context/DataProvider";
import { useTheme } from "../../context/ThemeContext";

export default function AddDepartmentSection() {
  const [branch, setBranch] = useState(null);
  const [branchName, setBranchName] = useState();
  const { branches, } = useContext(BranchesContext);
  const [name, setName] = useState();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [branchError, setbranchError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [, , , , , , , fetchDepartments] = useContext(DataContext);
  const { theme } = useTheme();


  const handleAddDepartment = async () => {
    if (branch === null) {
      setbranchError(true)
      return
    }
    setLoading(true);
    try {

      await axios.post(`${Setting.url}add/department`, { branch, name });
      setName("");
      fetchDepartments();
      setLoading(false);
      setVisible(true);
      setPosition("top-right");
    } catch (error) {
      alert(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={`my-3 p-3 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
      <CustomSectionTitle title={t("addnewapartment")} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
        <div className=" mt-5">

          <CustomDropDownMenu
            value={branchName}
            onchange={(e) => {
              setBranch(e.value.id);
              setBranchName(e.value.name);
            }}
            options={branches}
            optionLabel="name"
            placeholder={t("selectbranch")}
          />
          {branchError ? (<p className="text-red-600">{t('required')}</p>) : (<></>)}
        </div>
        <div className="">
          <CustomInput
            placeholder={t("department")}
            value={name}
            onchange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <CustomLoading />
      ) : (
        <CustomButton title={t("add")} onpress={() => handleAddDepartment()} />
      )}

      <CustomModal
        visible={visible}
        setVisible={setVisible}
        position={position}
        setPosition={setPosition}
        content={t("departmentadded")}
      />
    </div>
  );
}
