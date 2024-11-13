import React, { useContext, useState } from "react";
import CustomPageTitle from "../../custom/CustomPageTitle";
import { useTranslation } from "react-i18next";
import CustomSectionTitle from "../../custom/CustomSectionTitle";
import CustomInput from "../../custom/CustomInput";
import CustomButton from "../../custom/CustomButton";
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import CustomLoading from "../../custom/CustomLoading";
import CustomModal from "../../custom/CustomModal";
import InvoiceNotes from "./InvoiceNotes";
import InvoicePaidMehods from "./InvoicePaidMehods";
import { DataContext } from "../../context/DataProvider";

export default function InvoiceSetting() {
  const { t } = useTranslation();
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
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
  ] = useContext(DataContext);

  const handleAddInvoiceType = async () => {
    // Basic validation
    if (!type.trim()) {
      setError(`${"required"}`);
      return;
    }

    setError("");
    setLoading(true);
    try {
      await axios.post(`${Setting.url}add/invoice/type`, { type });
      setLoading(false);
      show("top-right");
      setType("");
      fetchInvoiceTypes();
    } catch (error) {
      alert(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  return (
    <div className="p-2">
      <CustomPageTitle title={t("invoiceSetting")} />
      <div className="bg-white  p-3 my-3">
        <CustomSectionTitle title={t("addnewtype")} />
        <div className="grid grid-cols-1 my-10">
          <div>
            <CustomInput
              placeholder={t("addnewtype")}
              value={type}
              onchange={(e) => setType(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>

        {loading ? (
          <CustomLoading />
        ) : (
          <CustomButton
            title={t("add")}
            onpress={() => handleAddInvoiceType()}
          />
        )}
        <div  className="my-3">

          {invoicesTypes && invoicesTypes.length > 0 ? (
            <div className="flex items-center">
              {invoicesTypes.map((item)=>(
                <p className="px-3 py-2 rounded-full bg-primary text-white mx-2">{item.type}</p>
              ))}
            </div>
            ):(<></>)}
        </div>

        <CustomModal
          visible={visible}
          setVisible={setVisible}
          position={position}
          setPosition={setPosition}
          content={t("invoicetypeadded")}
        />
      </div>

      <InvoicePaidMehods />
      <InvoiceNotes />
    </div>
  );
}
