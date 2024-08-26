import React, { useContext, useEffect, useState } from "react";
import CustomPageTitle from "../../custom/CustomPageTitle";
import CustomInput from "../../custom/CustomInput";
import CustomTextArea from "../../custom/CustomTextArea";
import { Calendar } from "primereact/calendar";
import { BranchesContext } from "../../context/BranchesProvider";
import { useTranslation } from "react-i18next";
import CustomButton from "../../custom/CustomButton";
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import { DataContext } from "../../context/DataProvider";
import CustomDropDownMenu from "../../custom/CustomDropDownMenu";
import CustomLoading from "../../custom/CustomLoading";
import CustomModal from "../../custom/CustomModal";
import { AuthContext } from "../../context/AuthProvider";
import CustomCalender from "../../custom/CustomCalender";
import { Link } from "react-router-dom";

export default function AddInvoice() {
  const { t, i18n } = useTranslation();
  const [branch, setBranch] = useState(null);
  const [branchName, setBranchName] = useState("");
  const [invoiceType, setInvoiceType] = useState(null);
  const { branches } = useContext(BranchesContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [carNo, setCarno] = useState("");
  const [carType, setcarType] = useState("");
  const [carService, setcarService] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [Ddate, setDdate] = useState("");
  const [Rdate, setRdate] = useState("");
  const [percent, setPercent] = useState("");
  const [paidMethod, setpaidMethod] = useState(null);
  const [invoicesTypes, fetchInvoiceTypes,methodTypes,fetchMethodTypes,invoices,fetchInvoices,departments,fetchDepartments] =
    useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [branchError, setbranchError] = useState("");
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const { auth, setauth } = useContext(AuthContext);
  const [sales, setSales] = useState(auth?.user?.name || "");

  // add invoice function
  const handleAddInvoice = async () => {
    
    if (!branch) {
      alert("Branch cannot be null. Please select a branch.");
      return; // Exit the function early
    }
    setLoading(true);
    try {
      await axios.post(`${Setting.url}add/new/invoice`, {
        branch,
        invoiceType,
        name,
        address,
        phone,
        carNo,
        carType,
        carService,
        price,
        description,
        note,
        Ddate,
        Rdate,
        paidMethod,
        percent,
        sales,
      });
      fetchInvoices()
      setLoading(false);
      setVisible(true);
      setPosition("top-right");
      setName("");
      setPhone("");
      setAddress("");
      setDescription("");
      setNote("");
      setCarno("");
      setcarType("");
      setcarService("");
      setPrice("");
      setPercent("");
      setDdate("");
      setRdate("");
    } catch (error) {
      setLoading(false);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.user?.name) {
      setSales(auth.user.name);
    }
  }, [auth]);

  return (
    <div className="p-4 ">
      <CustomPageTitle title={t("addinvoice")} />
      <div className={`my-2 flex ${i18n.language === 'ar' ? 'justify-end' :''}`}>
        <Link to='/dashboard/show/all/invoices' className="bg-primary p-2 rounded-full text-white text-xs">{t('showinvoices')}</Link></div>

      <div className="bg-white my-3 p-3">
        <h2
          className={`font-semibold  px-3 block my-3 ${
            i18n.language === "ar" ? "text-right" : ""
          } `}
        >
          {t("invoiceinfo")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
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
            {branchError ? <p>{branchError}</p> : <></>}
          </div>
          <CustomDropDownMenu
            value={invoiceType}
            onchange={(e) => setInvoiceType(e.value.type)}
            options={invoicesTypes}
            optionLabel="type"
            placeholder={t("selectinvoicetype")}
          />
        </div>
      </div>

      <div className="bg-white my-3 p-3">
        <h2
          className={`font-semibold  px-3 block my-3 ${
            i18n.language === "ar" ? "text-right" : ""
          } `}
        >
          {t("clientinfo")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInput
            placeholder={t("name")}
            value={name}
            onchange={(e) => setName(e.target.value)}
          />
          <CustomInput
            placeholder={t("address")}
            value={address}
            onchange={(e) => setAddress(e.target.value)}
          />
          <CustomInput
            placeholder={t("phone")}
            value={phone}
            onchange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div className="bg-white my-3 p-3">
        <h2
          className={`font-semibold  px-3 block my-3 ${
            i18n.language === "ar" ? "text-right" : ""
          } `}
        >
          {t("carinfo")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInput
            placeholder={t("carno")}
            value={carNo}
            onchange={(e) => setCarno(e.target.value)}
          />
          <CustomInput
            placeholder={t("cartype")}
            value={carType}
            onchange={(e) => setcarType(e.target.value)}
          />
          <CustomInput
            placeholder={t("carservice")}
            value={carService}
            onchange={(e) => setcarService(e.target.value)}
          />
          <CustomInput
            placeholder={t("price")}
            value={price}
            onchange={(e) => setPrice(e.target.value)}
          />
          <CustomTextArea
            placeholder={t("decription")}
            value={description}
            onchange={(e) => setDescription(e.target.value)}
          />
          <CustomTextArea
            placeholder={t("note")}
            value={note}
            onchange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white my-3 p-3">
        <h2
          className={`font-semibold  px-3 block my-3 ${
            i18n.language === "ar" ? "text-right" : ""
          } `}
        >
          {t("deliveryinfo")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
          <CustomCalender value={Ddate}  onchange={(e) => setDdate(e.value)} placeholder={t("ddate")} />
          
          <CustomCalender value={Rdate}  onchange={(e) => setRdate(e.value)} placeholder={t("rdate")} />

          <CustomInput
            placeholder={t("percent")}
            value={percent}
            onchange={(e) => setPercent(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white my-3 p-3">
        <h2
          className={`font-semibold  px-3 block my-3 ${
            i18n.language === "ar" ? "text-right" : ""
          } `}
        >
          {t("paidstatus")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomDropDownMenu
            value={paidMethod}
            onchange={(e) => setpaidMethod(e.value.method)}
            options={methodTypes}
            optionLabel="method"
            placeholder={t("selectinvoicetype")}
          />
        </div>
      </div>

      <div className=" my-3 p-3 bg-white">
        {loading ? (
          <CustomLoading />
        ) : (
          <CustomButton title={t("add")} onpress={() => handleAddInvoice()} />
        )}
      </div>
      <CustomModal
        visible={visible}
        setVisible={setVisible}
        position={position}
        setPosition={setPosition}
        content={t("invoiceadded")}
      />
    </div>
  );
}
