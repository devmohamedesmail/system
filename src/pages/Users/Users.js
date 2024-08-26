import React, { useEffect, useState, useRef, useContext } from "react";
import CustomPageTitle from "../../custom/CustomPageTitle";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import DataTable from "react-data-table-component";
import CustomButton from "../../custom/CustomButton";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { GrUserAdmin } from "react-icons/gr";
import { RiAdminLine } from "react-icons/ri";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { BranchesContext } from "../../context/BranchesProvider";
import CustomActionButton from "../../custom/CustomActionButton";
import { MdDeleteSweep } from "react-icons/md";
import CustomTableButton from "../../custom/CustomTableButton";
import { ExportExcel } from "../../utilties/ExportExcel";
import { Link, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import CustomTableButtonUpload from "../../custom/CustomTableButtonUpload";
import { ImportExcel } from "../../utilties/ImportExcel";

export default function Users() {
  const { t } = useTranslation();
  const [users, setUsers] = useState();
  const menuLeft = useRef(null);
  const menuRight = useRef(null);
  const toast = useRef(null);
  const { branches, fetchBranches } = useContext(BranchesContext);
  const navigate = useNavigate();
  const [file,setFile]=useState(null)

  // handleDeleteUser
  const handleDeleteUser = async (row) => {
    try {
      const confirm = window.confirm(`${t("alertdelete")}`);
      if (confirm) {
        await axios.delete(`${Setting.url}delete/user/${row.id}`);
        fetchusers();
      }
    } catch (error) {
      alert(error);
    }
  };

  const columns = [
    {
      name: t("name"),
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: t("email"),
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: t("role"),
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: t("branch"),
      selector: (row) => row.branch,
      sortable: true,
    },
    {
      name: t("Password"),
      selector: (row) => row.password,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <div>
            <CustomActionButton
              icon={<MdEdit color="green" size={20} />}
              onpress={() =>
                navigate("/dashboard/edit/user", { state: { user: row } })
              }
            />
          </div>

          <div>
            <CustomActionButton
              icon={<MdDeleteSweep color="red" size={20} />}
              onpress={() => handleDeleteUser(row)}
            />
          </div>
        </>
      ),
    },
  ];

  const fetchusers = async () => {
    const response = await axios.get(`${Setting.url}show/users`);
    setUsers(response.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    fetchusers();
  }, []);

  const handleExportExcel = () => {
    ExportExcel(users, "user.xlsx");
  };

  const handleImportExcel = async() =>{
     if (file) {
      const endpoint = 'import/users'
      await ImportExcel(endpoint,file)
     } else {
      alert('alertselect')
     }
  }

  return (
    <div className="p-2">
      <CustomPageTitle title={t("users")} />

      <div className="bg-white my-3 p-2">
        <div className="flex items-center">
          <CustomTableButton
            title={t("download")}
            onclick={() => handleExportExcel()}
          />
          <div className="border flex items-center rounded-full px-2">
            <label htmlFor="excel" className="text-xs">
              {t('selectexcel')}
              <input id="excel" className="hidden" type="file" onChange={(e)=>setFile(e.target.files[0])} />
            </label>
             <CustomTableButtonUpload title={t('upload')} onclick={()=>handleImportExcel()}  />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={users}
          pagination
          fixedHeader
          selectableRows
        />
      </div>
    </div>
  );
}
