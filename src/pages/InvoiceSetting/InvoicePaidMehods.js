import React,{useContext, useState} from "react";
import { useTranslation } from "react-i18next";
import CustomInput from "../../custom/CustomInput";
import CustomButton from "../../custom/CustomButton";
import CustomSectionTitle from "../../custom/CustomSectionTitle";
import CustomLoading from "../../custom/CustomLoading";
import CustomModal from "../../custom/CustomModal";
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import { DataContext } from "../../context/DataProvider";

export default function InvoicePaidMehods() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [methodModalvisible, setmethodModalvisible] = useState(false);
  const [errormethod, setErrorMethod] = useState();
  const [method, setMethod] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [ invoicesTypes,
    fetchInvoiceTypes,
    methodTypes,
    fetchMethodTypes,
    invoices,
    fetchInvoices,
    departments,
    fetchDepartments,
    staff,
    fetchStaff]=useContext(DataContext)

  const handleAddmethodType = async () =>{
    // Basic validation
    if (!method.trim()) {
       setErrorMethod(`${"required"}`);
       return;
     }
 
     setErrorMethod("");
     setLoading(true);
     try {
       await axios.post(`${Setting.url}add/method/type`, { method });
       setLoading(false);
       setPosition("top-right");
       setmethodModalvisible(true);
       setMethod("")
       fetchMethodTypes();
     } catch (error) {
       alert(error);
       setLoading(false);
     } finally {
       setLoading(false);
     }
 }
  return (
    <div className="bg-white  p-3 my-3">
      <CustomSectionTitle title={t("addnewmethodtype")} />
      <div>
        <CustomInput
          placeholder={t("addnewtype")}
          value={method}
          onchange={(e) => setMethod(e.target.value)}
        />
        {errormethod && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {loading ? (
        <CustomLoading />
      ) : (
        <CustomButton title={t("add")} onpress={() => handleAddmethodType()} />
      )}

      <div className="my-3">
        {methodTypes && methodTypes.length > 0 ? (
          <div className="flex item-center">{methodTypes.map((item)=>(
            <p className="mx-2 px-3 py-2 rounded-full bg-light">{item.method}</p>
          ))}</div>
          ):(<></>)}
      </div>
      
      <CustomModal
        visible={visible}
        setVisible={setVisible}
        position={position}
        setPosition={setPosition}
        content={t("invoicetypeadded")}
      />
      <CustomModal
        visible={methodModalvisible}
        setVisible={setmethodModalvisible}
        position={position}
        setPosition={setPosition}
        content={t("invoicemethodadded")}
      />
    </div>
  );
}
