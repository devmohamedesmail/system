import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomPageTitle from "../../custom/CustomPageTitle";
import { useTranslation } from "react-i18next";
import CustomSectionTitle from "../../custom/CustomSectionTitle";
import CustomDropDownMenu from "../../custom/CustomDropDownMenu";
import CustomInput from "../../custom/CustomInput";
import CustomLoading from "../../custom/CustomLoading";
import CustomButton from "../../custom/CustomButton";
import { DataContext } from "../../context/DataProvider";
import CustomTextArea from "../../custom/CustomTextArea";
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import CustomModal from "../../custom/CustomModal";

export default function EditEmployee() {
  const location = useLocation();
  const employee = location.state?.employee;
  const [department, setDepartemt] = useState(employee.department_id);
  const [name, setName] = useState(employee.name);
  const [salary, setSalary] = useState(employee.salary);
  const [discount, setDiscount] = useState(employee.discount);
  const [advance, setAdvance] = useState(employee.advance);
  const [comments, setComments] = useState(employee.comments);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [, , , , , , departments, ] = useContext(DataContext);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [departmentName,setDepartmentName]=useState();

  const handleUpdateEmployee = async () => {
    await axios.post(`${Setting.url}update/staff/${employee.id}`, {
      department,
      name,
      salary,
      discount,
      advance,
      comments,
    });
    setLoading(false);
    setVisible(true);
    setPosition("top-right");
  };
  return (
    <div>
      <CustomPageTitle title={t("editemployee")} />

      <div className="bg-white p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <CustomDropDownMenu
              value={departmentName}
              onchange={(e) => {
                setDepartemt(e.value.id);
                setDepartmentName(e.value.name)
              }}
              options={departments}
              optionLabel="name"
              placeholder={department}
            />
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
            <CustomTextArea
              value={comments}
              onchange={(e) => setComments(e.target.value)}
              placeholder={t("comments")}
            />
          </div>
        </div>

        {loading ? (
          <CustomLoading />
        ) : (
          <CustomButton
            title={t("update")}
            onpress={() => handleUpdateEmployee()}
          />
        )}
      </div>
      <CustomModal
        visible={visible}
        setVisible={setVisible}
        position={position}
        setPosition={setPosition}
        content={t("employeeupdated")}
      />
    </div>
  );
}
