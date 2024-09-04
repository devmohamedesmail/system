import React from "react";
import CustomPageTitle from "../../custom/CustomPageTitle";
import { useTranslation } from "react-i18next";
import CustomInput from "../../custom/CustomInput";


export default function Setting() {
  const { t } = useTranslation();
  return (
    <div className="p-2">
       <CustomPageTitle title={t('setting')} />
       <div className="my-3 bg-white p-2 py-3">
        <CustomInput />
       </div>
    </div>
  );
}
