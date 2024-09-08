import React, { useEffect, useState } from "react";
import CustomPageTitle from "../../custom/CustomPageTitle";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import DataTable from "react-data-table-component";
import CustomActionButton from "../../custom/CustomActionButton";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import CustomModal from "../../custom/CustomModal";
import { useNavigate } from "react-router-dom";
import TableSearchBox from "../../components/TableSearchBox/TableSearchBox";
import * as XLSX from "xlsx";
import { ExportExcel } from "../../utilties/ExportExcel";
import TableButton from "../../components/InvoicesComponents/TableButton";
import CustomTableButton from "../../custom/CustomTableButton";
import CustomTableButtonUpload from "../../custom/CustomTableButtonUpload";
import { ImportExcel } from "../../utilties/ImportExcel";
import CustomLoading from "../../custom/CustomLoading";

export default function Employees() {
  const { t } = useTranslation();
  const [staff, setStaff] = useState();
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const navigate = useNavigate();
  const [records, setrecords] = useState();
  const [file, setFile] = useState(null);

  const columns = [
    {
      name: t("name"),
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: t("salary"),
      selector: (row) => row.salary,
      sortable: true,
    },
    {
      name: t("discount"),
      selector: (row) => row.discount,
      sortable: true,
    },
    {
      name: t("discount"),
      selector: (row) => row.advance,
      sortable: true,
    },
    {
      name: t("action"),
      cell: (row) => (
        <div className="flex items-center">
          <CustomActionButton
            onpress={() =>
              navigate("/dashboard/edit/employee", { state: { employee: row } })
            }
            icon={<MdEdit size={20} color="green" />}
          />
          <CustomActionButton
            onpress={() => handleDeleteStaff(row)}
            icon={<MdDelete size={20} color="red" />}
          />
        </div>
      ),
    },
  ];

  const fetchStaff = async () => {
    try {
      const response = await axios.get(`${Setting.url}show/staff`);
      setStaff(response.data.data);
      setrecords(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteStaff = async (row) => {
    const confirm = window.confirm(`${t("alertdelete")}`);
    if (confirm) {
      await axios.delete(`${Setting.url}delete/staff/${row.id}`);
      fetchStaff();
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleFilter = (event) => {
    if (!event.target) return;

    const searchTerm = event.target.value || "";

    const filterData = (staff || []).filter((item) => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setrecords(filterData);
  };

  const handleExportExcel = () => {
    ExportExcel(staff, "staff.xlsx");
  };

  const handleUplaodFile = async () => {
    const endpoint = "import/staff";
    if (file) {
      await ImportExcel(endpoint, file);
    } else {
      alert(`${t("pleaseselect")}`);
    }
  };
  return (
    <div className="p-2">
      <CustomPageTitle title={t("employees")} />
      <div className="my-2 bg-white p-2">
        <div className="flex item-center justify-between px-5 my-5">
          <div className="flex items-center">
            <CustomTableButton
              title={t("downlaod")}
              onclick={() => handleExportExcel()}
            />

            <div className="flex items-center  border-2 rounded-full p-1">
              <label htmlFor="excel" className="text-xs">
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

          <TableSearchBox onchange={handleFilter} />
        </div>

        {staff ? (
          <DataTable
            columns={columns}
            data={records}
            pagination
            selectableRows
            fixedHeader
          />
        ) : (
          <CustomLoading />
        )}
      </div>
      <CustomModal
        visible={visible}
        setVisible={setVisible}
        position={position}
        setPosition={setPosition}
        content={t("branchadded")}
      />
    </div>
  );
}
