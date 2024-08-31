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

export default function PurchasesTable({ fetchpurchases,purchases }) {
  
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const { branches, fetchBranches } = useContext(BranchesContext);
  const [, , , , , , departments, ,] = useContext(DataContext);

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


  useEffect(() => {
    calculateTotalPrice();
  }, [selectedBranch, selectedDepartment, purchases]);

  const handledeleteitem = async (row) => {
    try {
      const fonfirm = window.confirm(t("alertdelete"));
      if(fonfirm){
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
    setSelectedBranch(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  // const branchess = [...new Set(purchases.map(p => p.branch))];
  // const departmentss = [...new Set(purchases.map(p => p.department))];

  return (
    <div className="my-3 p-2 bg-white">
      <div className="flex items-center">
        <button
          className="bg-primary px-3 py-2 rounded-full text-white"
          onClick={() => handleExport()}
        >
          {t("download")}
        </button>

        <div className="flex items-center">
          {branches && branches.length > 0 ? (
            <select
              className="bg-primary px-10 py-2 rounded-full text-white mx-3"
              value={selectedBranch}
              onChange={handleBranchChange}
            >
              <option value="">{t("branch")}</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          ) : (
            <></>
          )}

          {departments && departments.length > 0 ? (
            <select
              className="bg-primary px-10 py-2 rounded-full text-white mx-3"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
            >
              <option value="">All</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          ) : (
            <></>
          )}
          <p>Total Amount: {totalAmount}</p>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={purchases}
        pagination
        fixedHeader
        selectableRows
      />
    </div>
  );
}
