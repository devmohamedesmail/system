import React, { useContext, useEffect, useState } from "react";
import CustomPageTitle from "../../custom/CustomPageTitle";
import CustomSectionTitle from "../../custom/CustomSectionTitle";
import { useTranslation } from "react-i18next";
import CustomDropDownMenu from "../../custom/CustomDropDownMenu";
import { BranchesContext } from "../../context/BranchesProvider";
import CustomInput from "../../custom/CustomInput";
import { Calendar } from "primereact/calendar";
import CustomButton from "../../custom/CustomButton";
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import DataTable from "react-data-table-component";
import CustomActionButton from "../../custom/CustomActionButton";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CustomCalender from "../../custom/CustomCalender";
import CustomLoading from "../../custom/CustomLoading";
import { useTheme } from "../../context/ThemeContext";

export default function Rent() {
  const { t } = useTranslation();
  const [branch, setBranch] = useState(null);
  const { branches } = useContext(BranchesContext);
  const [bills, setBills] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [rents, setRents] = useState();
  const [loading, setLoading] = useState(false);
  const[branchName,setBranchName]=useState("")
  const {theme}=useTheme();
  const navigate = useNavigate();

  const handleAddRent = async () => {
    setLoading(true);
    try {
      await axios.post(`${Setting.url}add/rent`, {
        branch,
        bills,
        amount,
        month,
      });
      setLoading(false);
      fetchRent();
    } catch (error) {
      setLoading(false);
      alert(t('error'));
    }finally{
      setLoading(false);
    }
  };

  const fetchRent = async () => {
   
    try {
      const response = await axios.get(`${Setting.url}show/rent`);
      setRents(response.data.data);
    } catch (error) {
      alert(t('error'));
    }
  };

  useEffect(() => {
    fetchRent();
  }, []);

  const columns = [
    {
      name: t("branch"),
      selector: (row) => row.branch.name,
      sortable: true,
    },
    {
      name: t("bills"),
      selector: (row) => row.bills,
      sortable: true,
    },
    {
      name: t("bills"),
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: t("bills"),
      selector: (row) => row.month,
      sortable: true,
    },
    {
      name: t("action"),
      cell: (row) => {
        return (
          <div className="flex items-center">
            <CustomActionButton
              icon={<MdDelete color="red" size={20} />}
              onpress={() => handleDeleteITem(row)}
            />
            <CustomActionButton
              icon={<MdEdit color="green" size={20} />}
              onpress={() =>
                navigate("/dashboard/edit/rent", { state: { rent: row } })
              }
            />
          </div>
        );
      },
    },
  ];

  const handleDeleteITem = async (row) => {
    const confirm = window.confirm(`${t("alertdelete")}`);
    if (confirm) {
      await axios.delete(`${Setting.url}delete/rent/${row.id}`);
    }
    fetchRent();
  };

  return (
    <div className="p-2">
     <div className="container m-auto">
     <CustomPageTitle title={t("rent")} />
      <div className={`my-3 p-3 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
        <CustomSectionTitle title={t("addrent")} />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          <div className="mt-5">
            <CustomDropDownMenu
              value={branchName}
              optionLabel="name"
              options={branches}
              placeholder={t('branch')}
              onchange={(e) => {
                setBranch(e.value.id)
                setBranchName(e.value.name)
              }}
            />
          </div>
          <div>
            <CustomInput
              value={bills}
              placeholder={t("bills")}
              onchange={(e) => setBills(e.target.value)}
            />
          </div>
          <div>
            <CustomInput
              value={amount}
              placeholder={t("amount")}
              onchange={(e) => setAmount(e.target.value)}
            />
          </div>
        
          <div className="mt-5">
              <CustomCalender value={month} onchange={(e) => setMonth(e.value)} placeholder={t('date')} />
          </div>
        </div>
        <div>
          {loading? (<CustomLoading />):(<CustomButton title={t("add")} onpress={() => handleAddRent()} />)}
        
        </div>
      </div>
      <div className="bg-white my-3 p-2">
        <DataTable columns={columns} data={rents} pagination selectableRows />
      </div>
     </div>
    </div>
  );
}
