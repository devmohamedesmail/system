import React, { useContext, useState } from "react";
import CustomPageTitle from "../../custom/CustomPageTitle";
import AddDepartmentSection from "./AddDepartmentSection";
import AddEmployeeSection from "./AddEmployeeSection";
import { useTranslation } from "react-i18next";

export default function EmpoyeeSetting() {
  const { t } = useTranslation();

  return (
    <div className="p-2">
      <CustomPageTitle title={t("settingemplyess")} />
      <AddDepartmentSection />
      <AddEmployeeSection />
    </div>
  );
}
