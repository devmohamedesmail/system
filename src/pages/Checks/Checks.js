import React, { useContext, useEffect, useState } from "react";
import CustomPageTitle from "../../custom/CustomPageTitle";
import { useTranslation } from "react-i18next";
import CustomSectionTitle from "../../custom/CustomSectionTitle";
import CustomDropDownMenu from "../../custom/CustomDropDownMenu";
import CustomInput from "../../custom/CustomInput";
import CustomButton from "../../custom/CustomButton";
import { BranchesContext } from "../../context/BranchesProvider";
import { Calendar } from "primereact/calendar";
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import DataTable from "react-data-table-component";
import CustomActionButton from "../../custom/CustomActionButton";
import { MdDelete } from "react-icons/md";
import CustomCalender from "../../custom/CustomCalender";
import CustomTableButton from "../../custom/CustomTableButton";
import CustomTableButtonUpload from "../../custom/CustomTableButtonUpload";
import { ImportExcel } from "../../utilties/ImportExcel";
import { ExportExcel } from "../../utilties/ExportExcel";
import CustomLoading from "../../custom/CustomLoading";
import { useTheme } from "../../context/ThemeContext";

export default function Checks() {
  const { t } = useTranslation();
  const [branch, setBranch] = useState(null);
  const [issuer, setIssuer] = useState("");
  const [amount, setAmount] = useState("");
  const [statement, setStatment] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [credit, setCredit] = useState("");
  const { branches } = useContext(BranchesContext);
  const [checks, setChecks] = useState();
  const [branchName, setBranchName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const {theme}=useTheme();

  const handleAddCheck = async () => {
    setLoading(true);
    try {
      await axios.post(`${Setting.url}add/check`, {
        branch,
        issuer,
        amount,
        statement,
        number,
        date,
        credit,
      });
      setLoading(false);
      fetchCheck();
    } catch (error) {
      setLoading(false);
    }finally{
      setLoading(false);
    }
  };

  const fetchCheck = async () => {
    try {
      const response = await axios.get(`${Setting.url}show/check`);
    setChecks(response.data.data);
    } catch (error) {
      alert(t('error'));
    }
  };

  useEffect(() => {
    fetchCheck();
  }, []);

  const columns = [
    {
      name: t("branch"),
      selector: (row) => row.branch.name,
      sortable: true,
    },
    {
      name: t("issuer"),
      selector: (row) => row.issuer,
      sortable: true,
    },
    {
      name: t("amount"),
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: t("statement"),
      selector: (row) => row.statement,
      sortable: true,
    },
    {
      name: t("number"),
      selector: (row) => row.number,
      sortable: true,
    },
    {
      name: t("date"),
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: t("credit"),
      selector: (row) => row.credit,
      sortable: true,
    },
    {
      name: t("action"),
      cell: (row) => (
        <div>
          <CustomActionButton
            onpress={() => deletecheck(row)}
            icon={<MdDelete color="red" size={20} />}
          />
        </div>
      ),
    },
  ];

  const deletecheck = async (row) => {
    await axios.delete(`${Setting.url}delete/check/${row.id}`);
    fetchCheck();
  };

  const handleUplaodFile = async () => {
    if (file) {
      const endpoint = "import/checks";
      await ImportExcel(endpoint, file);
    } else {
      alert(`${t("pleaseselect")}`);
    }
  };

  const handleExportChecks = () => {
    ExportExcel(checks, "checks.xlsx");
  };

  return (
    <div className="p-2">
      <CustomPageTitle title={t("checks")} />
      <div className={`my-3 p-3 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
        <CustomSectionTitle title={t("addcheck")} />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          <div className="mt-5">
            <CustomDropDownMenu
              value={branchName}
              optionLabel="name"
              options={branches}
              placeholder={t("branch")}
              onchange={(e) => {
                setBranch(e.value.id);
                setBranchName(e.value.name);
              }}
            />
          </div>
          <div>
            <CustomInput
              value={issuer}
              placeholder={t("issuer")}
              onchange={(e) => setIssuer(e.target.value)}
            />
          </div>

          <div>
            <CustomInput
              value={amount}
              placeholder={t("amount")}
              onchange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <CustomInput
              value={statement}
              placeholder={t("statement")}
              onchange={(e) => setStatment(e.target.value)}
            />
          </div>

          <div>
            <CustomInput
              value={number}
              placeholder={t("number")}
              onchange={(e) => setNumber(e.target.value)}
            />
          </div>

          <div>
            <CustomInput
              value={credit}
              placeholder={t("credit")}
              onchange={(e) => setCredit(e.target.value)}
            />
          </div>

          <div className="mt-5">
            <CustomCalender
              value={date}
              onchange={(e) => setDate(e.value)}
              placeholder={t("date")}
            />
          </div>
        </div>
        <div> 
            {loading ? (<CustomLoading />):(<CustomButton title={t("add")} onpress={() => handleAddCheck()} />) }
        </div>
      </div>
      <div className="my-3 bg-white p-2">
        <div className="flex items-center">
          <CustomTableButton
            title={t("download")}
            onclick={() => handleExportChecks()}
          />
          <div className="flex items-center border rounded-full">
            <label htmlFor="excel" className="text-xs pl-2">
              {t("selectexcel")}
              <input
                id="excel"
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <CustomTableButtonUpload
              title={t("upload")}
              onclick={() => handleUplaodFile()}
            />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={checks}
          pagination
          selectableRows
          fixedHeader
        />
      </div>
    </div>
  );
}
