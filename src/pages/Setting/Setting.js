import React, { useEffect, useState ,useRef, useContext} from "react";
import CustomPageTitle from "../../custom/CustomPageTitle";
import { useTranslation } from "react-i18next";
import CustomInput from "../../custom/CustomInput";
import CustomButton from "../../custom/CustomButton";
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import CustomSectionTitle from "../../custom/CustomSectionTitle";
import CustomLoading from "../../custom/CustomLoading";
import { Toast } from 'primereact/toast';
import { DataContext } from "../../context/DataProvider";


export default function SettingUpdate() {
  const { t } = useTranslation();
  const [setting_data, setSettingData] = useState();
  const [nameen, setNameen] = useState('');
  const [namear, setNamear] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [logo, setLogo] = useState(null);
  const [oldLogo, setOldLogo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useRef(null);
  const [
    invoicesTypes,
    fetchInvoiceTypes,
    methodTypes,
    fetchMethodTypes,
    invoices,
    fetchInvoices,
    departments,
    fetchDepartments,
    staff,
    fetchStaff,
    settingData,
    fetch_Setting_Data,
  ] = useContext(DataContext)


  const show = () => {
    toast.current.show({severity:'success', summary: 'Success', detail:t('updated'), life: 3000});
};

  // Function to handle the form submission and update settings
  const handleUpdateSetting = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("nameen", nameen);
      formData.append("namear", namear);
      formData.append("email", email);
      formData.append("website", website);
      if (logo) {
        formData.append("logo", logo); // Add the logo to FormData if it exists
      }

      const response = await axios.post(`${Setting.url}setting/update/1`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      show()
     
      setIsLoading(false);
    } catch (error) {
      alert(t('error'));
      setIsLoading(false);
      console.log(error)
    } finally {
      setIsLoading(false);
    }


  };



  useEffect(() => {
   
   if(settingData){
     setNamear(settingData.namear)
    setNameen(settingData.nameen)
    setEmail(settingData.email)
    setWebsite(settingData.website)
    setOldLogo(settingData.logo)
   }
  }, [settingData])

  return (
    <div className="p-2">
       <Toast ref={toast} />
      {settingData ? (<>
        <CustomPageTitle title={t('setting')} />
        <div className="my-3 bg-white p-2 py-3">
          <CustomSectionTitle title={t('setting')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <CustomInput placeholder={t('name_en')} value={nameen} onchange={(e) => setNameen(e.target.value)} />
            </div>
            <div>
              <CustomInput placeholder={t('name_ar')} value={namear} onchange={(e) => setNamear(e.target.value)} />
            </div>
            <div>
              <CustomInput placeholder={t('website')} value={website} onchange={(e) => setWebsite(e.target.value)} />
            </div>
            <div>
              <CustomInput placeholder={t('email')} value={email} onchange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <div>
                {logo && (
                  <div>
                    <img
                      src={`${Setting.url2}uploads/setting/${oldLogo}`}
                      alt="Current Logo"
                      style={{ maxWidth: '200px', maxHeight: '100px' }}
                    />
                  </div>
                )}
                <input
                  type="file"
                  onChange={(e) => setLogo(e.target.files[0])}
                />
              </div>
            </div>
          </div>
          <div className="mt-10">

            {isLoading ? <CustomLoading /> : <CustomButton title={t('update')} onpress={() => handleUpdateSetting()} />}
          </div>
        </div></>) : (<CustomLoading />)}
    </div>
  );
}
