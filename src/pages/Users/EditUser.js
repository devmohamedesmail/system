import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomPageTitle from "../../custom/CustomPageTitle";
import { useTranslation } from "react-i18next";
import CustomDropDownMenu from "../../custom/CustomDropDownMenu";
import { BranchesContext } from "../../context/BranchesProvider";
import CustomButton from "../../custom/CustomButton";
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import CustomModal from "../../custom/CustomModal";
export default function EditUser() {
  const location = useLocation();
  const user = location.state?.user;
  const { t } = useTranslation();
  const { branches, fetchBranches } = useContext(BranchesContext);
  const [branchName, setBranchName] = useState();
  const [role, setRole] = useState();
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const roles = [
    {
      id: 1,
      role: "admin",
      title: "Admin",
    },
    {
      id: 1,
      role: "sales",
      title: "Sales",
    },
    {
      id: 1,
      role: "manager",
      title: "Manager",
    },
    {
      id: 1,
      role: "accountant",
      title: "Accountant",
    },
  ];

  const handleUpdateUser = async () => {
    try {
      await axios.post(`${Setting.url}update/user/${user.id}`, {
        branch: branchName,
        role: role,
      });
      setVisible(true)
      setPosition("top-right")
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="p-2">
      <CustomPageTitle title={t("edituser")} />
      <div className="bg-white my-3 p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <CustomDropDownMenu
              value={branchName}
              onchange={(e) => {
                setBranchName(e.value.name);
              }}
              options={branches}
              optionLabel="name"
              placeholder={t("selectbranch")}
            />
          </div>

          <div>
            <CustomDropDownMenu
              value={role}
              onchange={(e) => {
                setRole(e.value.role);
              }}
              options={roles}
              optionLabel="title"
              placeholder={t("selectrole")}
            />
          </div>
        </div>
        <div className="my-5">
          <CustomButton
            title={t("update")}
            onpress={() => handleUpdateUser()}
          />
        </div>

        <CustomModal
          visible={visible}
          setVisible={setVisible}
          position={position}
          setPosition={setPosition}
          content={t("userupdated")}
        />
      </div>
    </div>
  );
}
