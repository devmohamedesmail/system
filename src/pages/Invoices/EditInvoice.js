import { useLocation } from "react-router-dom";
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
import AddProblem from "./AddProblem";
import AddStage from "./AddStage";
import CustomSectionTitle from "../../custom/CustomSectionTitle";
import { useTheme } from "../../context/ThemeContext";
import CustomSelectOption from "../../custom/CustomSelectOption";

export default function EditInvoice() {
  const location = useLocation();
  const invoice = location.state?.invoice;
  const { t, i18n } = useTranslation();
  const [branch, setBranch] = useState(invoice.branch_id);
  const [branchName, setBranchName] = useState();
  const [invoiceType, setInvoiceType] = useState(invoice.invoiceType);
  const { branches } = useContext(BranchesContext);
  const [name, setName] = useState(invoice.name);
  const [address, setAddress] = useState(invoice.address);
  const [phone, setPhone] = useState(invoice.phone);
  const [carNo, setCarno] = useState(invoice.carNo);
  const [carType, setcarType] = useState(invoice.carType);
  const [carService, setcarService] = useState(invoice.carService);
  const [price, setPrice] = useState(invoice.price);
  const [description, setDescription] = useState(invoice.description);
  const [note, setNote] = useState(invoice.note);
  const [Ddate, setDdate] = useState(invoice.Ddate);
  const [Rdate, setRdate] = useState(invoice.Rdate);
  const [percent, setPercent] = useState(invoice.percent);
  const [paidMethod, setpaidMethod] = useState(invoice.paidMethod);
  const [users, setUsers] = useState([]);
  const [trn_no,settrn_no]=useState(invoice.trn_no)
  const { theme } = useTheme();
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
  const [loading, setLoading] = useState(false);
  const [branchError, setbranchError] = useState("");
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [salesStaff, setsalesStaff] = useState();
  const [sales, setSales] = useState(null);

  const handleEditInvoice = async () => {
    // Validation check for branch
    if (!branch) {
      alert("Branch cannot be null. Please select a branch.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${Setting.url}update/invoice/${invoice.id}`, {
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
        trn_no
      });


      
      fetchInvoices();
      setLoading(false);
      setVisible(true);
      setPosition("top-right");
    } catch (error) {
      setLoading(false);
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchusers();
  }, []);

  const fetchusers = async () => {
    try {
      const response = await axios.get(`${Setting.url}show/users`);
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };



  const filterSalesStaff = () => {
    if (users) {
      const result = users.filter((item) => item.role === "sales");
      setsalesStaff(result);

    } else {
      console.log("No staff data available");
    }
  };


  useEffect(() => {
    filterSalesStaff()

  }, [users])



  const handleChangeSales = (event) => {
    setSales(event.target.value.name);

  };


  return (
    <div className="p-4 ">
      <CustomPageTitle title={t("editinvoice")} />

      <div className={`my-3 p-3 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
        <h2 className="font-bold text-center">{invoice.invoiceNumber}</h2>
        <CustomSectionTitle title={t("invoiceinfo")} />
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

      <div className={`my-3 p-3 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
        <CustomSectionTitle title={t("clientinfo")} />
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
          <CustomInput
            placeholder={t("TRN no")}
            value={trn_no}
            onchange={(e) => settrn_no(e.target.value)}
          />
        </div>
      </div>

      <div className={`my-3 p-3 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>

        <CustomSectionTitle title={t("carinfo")} />

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

      <div className={`my-3 p-3 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>

        <CustomSectionTitle title={t("deliveryinfo")} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-2 p-2">
            <Calendar
              value={Ddate}
              onChange={(e) => setDdate(e.value)}
              placeholder={t("ddate")}
            />
          </div>
          <div className="border-2 p-2">
            <Calendar
              value={Rdate}
              onChange={(e) => setRdate(e.value)}
              placeholder={t("ddate")}
            />
          </div>

          <CustomInput
            placeholder={t("percent")}
            value={percent}
            onchange={(e) => setPercent(e.target.value)}
          />
        </div>
      </div>

      <div className={`my-3 p-3 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>

        <CustomSectionTitle title={t("paidstatus")} />

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

      <div className="my-3 py-2 bg-white px-2">
      <CustomSectionTitle title={t("sales")} />
      <div className="grid grid-cols-1">
          <div className="">
            <p>{invoice.sales}</p>
            {salesStaff && salesStaff.length > 0 ? (
              <CustomSelectOption
                value={sales}
                onchange={handleChangeSales}
                options={salesStaff}
                labelTitle="name"
                placeholder={t("selectstaff")}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <div className=" my-3 p-3">
        {loading ? (
          <CustomLoading />
        ) : (
          <CustomButton
            title={t("update")}
            onpress={() => handleEditInvoice()}
          />
        )}
      </div>

      {/* <AddProblem invoice={invoice} />
      <AddStage invoice={invoice} /> */}
      <CustomModal
        visible={visible}
        setVisible={setVisible}
        position={position}
        setPosition={setPosition}
        content={t("invoiceupdated")}
      />
    </div>
  );
}
