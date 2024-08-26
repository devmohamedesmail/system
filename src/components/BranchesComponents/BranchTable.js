import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { t } from "i18next";
import { Dialog } from "primereact/dialog";
import CustomInput from "../../custom/CustomInput";
import CustomButton from "../../custom/CustomButton";
import { Setting } from "../../utilties/Setting";
import DataTable from "react-data-table-component";
import { MdEdit } from "react-icons/md";
import CustomActionButton from "../../custom/CustomActionButton";
import { BranchesContext } from "../../context/BranchesProvider";

export default function BranchTable() {
  const [visible, setVisible] = useState(false);
  const [branchItem, setBranchItem] = useState(null);
  const {branches , fetchBranches}= useContext(BranchesContext)

  const hideDialog = () => {
    setVisible(false);
  };


  console.log("branches")
  // Handle edit action
  const handleEdit = (branch) => {
    setVisible(true);
    setBranchItem(branch);
  };

  // Handle delete action
  const handleDelete = async (branch) => {
    const userConfirmed = window.confirm(`${t("alertdelete")}`);
    if (userConfirmed) {
      try {
        await axios.delete(`${Setting.url}delete/branch/${branch.id}`);
        fetchBranches();
      } catch (error) {
        alert(error);
      }
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleUpdateBranch = async (id) => {
    await axios.post(`${Setting.url}update/branch/${id}`, {
      name: branchItem.name,
      address: branchItem.address,
      phone: branchItem.phone,
    });
    fetchBranches();
    setVisible(false);
  };

  // datatables
  const columns = [
    {
      name: t("name"),
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: t("address"),
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: t("phone"),
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: t("action"),
      cell: (row) => (
        <div className="flex items-center">
          <CustomActionButton
            onpress={() => handleEdit(row)}
            icon={<MdEdit size={20} color="green" />}
          />
          <CustomActionButton
            onpress={() => handleDelete(row)}
            icon={<MdDelete size={20} color="red" />}
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={branches}
        selectableRows
        fixedHeader
        pagination
      />

      <Dialog
        header={t("editbranch")}
        visible={visible}
        onHide={hideDialog}
        breakpoints={{ "960px": "95vw", "640px": "95vw", "3200px": "50vw" }}
      >
        <CustomInput
          placeholder={t("name")}
          value={branchItem?.name || ""}
          onchange={(e) =>
            setBranchItem({ ...branchItem, name: e.target.value })
          }
        />
        <CustomInput
          placeholder={t("address")}
          value={branchItem?.address || ""}
          onchange={(e) =>
            setBranchItem({ ...branchItem, address: e.target.value })
          }
        />
        <CustomInput
          placeholder={t("phone")}
          value={branchItem?.phone || ""}
          onchange={(e) =>
            setBranchItem({ ...branchItem, phone: e.target.value })
          }
        />
        <CustomButton
          title={t("update")}
          onpress={() => handleUpdateBranch(branchItem.id)}
        />
      </Dialog>
    </div>
  );
}
