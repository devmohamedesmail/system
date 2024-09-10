import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Setting } from "../../utilties/Setting";
import { useTranslation } from "react-i18next";
import CustomActionButton from "../../custom/CustomActionButton";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import * as XLSX from "xlsx";
import { BranchesContext } from "../../context/BranchesProvider";
import { DataContext } from "../../context/DataProvider";
import CustomSelectOption from "../../custom/CustomSelectOption";
import TableSearchBox from "../TableSearchBox/TableSearchBox";

export default function PurchasesTable({ fetchpurchases, purchases }) {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [branchItem, setBranchITem] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departmentITem, setDepartmentITem] = useState("")
  const { branches, fetchBranches } = useContext(BranchesContext);
  const [, , , , , , departments, ,] = useContext(DataContext);
  const [records,setrecords]=useState()

  const columns = [
    {
      name: t("branch"),
      selector: (row) => row.branch.name,
      sortable: true,
    },
    {
      name: t("department"),
      selector: (row) => row.department.name,
      sortable: true,
    },
    {
      name: t("title"),
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: t("quantity"),
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: t("price"),
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: t("total"),
      selector: (row) => row.total,
      sortable: true,
    },
    {
      name: t("date"),
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: t("action"),
      cell: (row) => (
        <div className="flex items-center">
          <CustomActionButton
            icon={<MdEdit color="green" size={20} />}
            onpress={() =>
              navigate("/dashboard/edit/purchase", { state: { purchase: row } })
            }
          />
          <CustomActionButton
            icon={<FaTrash color="red" size={20} />}
            onpress={() => handledeleteitem(row)}
          />
        </div>
      ),
    },
  ];

  useEffect(()=>{
    setrecords(purchases)
  },[purchases])

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedBranch, selectedDepartment, purchases]);

  const handledeleteitem = async (row) => {
    try {
      const fonfirm = window.confirm(t("alertdelete"));
      if (fonfirm) {
        await axios.delete(`${Setting.url}delete/purchases/${row.id}`);
        fetchpurchases();
      }

    } catch (error) {
      alert(t('error'));
    }
  };

  const handleExport = () => {
    // Convert the data to a format compatible with XLSX
    const ws = XLSX.utils.json_to_sheet(purchases);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "Purchases.xlsx");
  };

  const calculateTotalPrice = () => {
    if (!purchases) return;

    const total = purchases.reduce((accumulator, item) => {
      // Check if the item matches the selected branch and department
      const matchesBranch =
        !selectedBranch || item.branch.id === parseInt(selectedBranch, 10);
      const matchesDepartment =
        !selectedDepartment ||
        item.department.id === parseInt(selectedDepartment, 10);
      // Ensure item.total is a number before accumulating
      const itemTotal = parseInt(item.total, 10);
      return (
        accumulator +
        (matchesBranch && matchesDepartment && !isNaN(itemTotal)
          ? itemTotal
          : 0)
      );
    }, 0);

    setTotalAmount(total);
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value.id);
    setBranchITem(event.target.value)

  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value.id);
    setDepartmentITem(event.target.value)
    const newData = purchases.filter((row) => {
      return (
        row.department.name.toLowerCase().includes(event.target.value.name.toLowerCase()) 
        
      );
    });
    setrecords(newData);
  };


  const handleFilter = (event) => {
    const newData = purchases.filter((row) => {
      return (
        row.title.toLowerCase().includes(event.target.value.toLowerCase()) 
        
      );
    });
    setrecords(newData);
  };


  return (
    <div className="my-3 p-2 bg-white">
    <div className="flex justify-between items-center">
    <div className="flex items-center my-5 px-4">
        <button
          className="bg-primary px-3 py-2 rounded-full text-white"
          onClick={() => handleExport()}
        >
          {t("download")}
        </button>

        <div className="flex items-center">
         <div className="mx-3">
         {branches && branches.length > 0 ? (
            <CustomSelectOption
              value={branchItem}
              options={branches}
              onchange={handleBranchChange}
              labelTitle="name"
              placeholder={t("branch")}
            />
          ) : (
            <></>
          )}
         </div>


          <div className="mx-3">
            {departments && departments.length > 0 ? (
              <CustomSelectOption
                value={departmentITem}
                options={departments}
                onchange={handleDepartmentChange}
                labelTitle="name"
                placeholder={t("department")}
              />
            ) : (
              <></>
            )}
          </div>
          <p>Total Amount: {totalAmount}</p>
        </div>
        
      </div>
     <div>
        <TableSearchBox onchange={handleFilter} />
     </div>
    </div>
      <DataTable
        columns={columns}
        data={records}
        pagination
        fixedHeader
        selectableRows
      />
    </div>
  );
}
