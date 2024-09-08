import React, { useState } from "react";
import CustomPageTitle from "../../custom/CustomPageTitle";
import { useTranslation } from "react-i18next";
import CustomInput from "../../custom/CustomInput";
import CustomButton from "../../custom/CustomButton";
import axios from "axios";
import { Setting } from "../../utilties/Setting";


export default function SettingUpdate() {
  const { t } = useTranslation();
  const[nameen,setNameen]= useState('');
  const[namear,setNamear]= useState('');
  const[email, setEmail]= useState('');
  const[website, setWebsite]= useState('');


  const handleUpdateSetting = async () => {
    try {
      const response = await axios.post(`${Setting.url}setting/update/1`, {
        nameen,
        namear,
        email,
        website
      });
      if (response.data.success) {
        alert(t('update_success'));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(t('error'));
    }
  }

  return (
    <div className="p-2">
       <CustomPageTitle title={t('setting')} />
       <div className="my-3 bg-white p-2 py-3">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
             <CustomInput value={nameen} onchange={(e)=>setNameen(e.target.value)} />
          </div>
          <div>
             <CustomInput value={namear} onchange={(e)=>setNamear(e.target.value)} />
          </div>
          <div>
             <CustomInput value={email} onchange={(e)=>setEmail(e.target.value)} />
          </div>
          <div>
             <CustomInput value={website} onchange={(e)=>setWebsite(e.target.value)} />
          </div>
         </div>
         <div>
          <CustomButton title={t('add')} onpress={()=>handleUpdateSetting()} />
         </div>
       </div>
    </div>
  );
}
