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
  const { branches, fetchBranches } = useContext(BranchesContext)

  const hideDialog = () => {
    setVisible(false);
  };



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

        await axios.delete(`https://naqraa.net/api/delete/branch/${branch.id}`);
        fetchBranches();

      } catch (error) {
        alert(t("errorhappened"))
        console.log(error)
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

 

  return (
    <div>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {branches && branches.length > 0 ? (
          <>
            {branches.map((branch) => (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div>
                  <h2 className="text-xl font-bold mb-2 bg-primary text-white p-2 ">{branch.name}</h2>
                  <h2 className="text-sm mb-2">{branch.address}</h2>
                  <h2 className="text-sm  mb-2">{branch.phone}</h2>
                </div>
                <hr />
                <div className="flex items-center justify-between">
                  <p>{t('invoices')}</p>
                  <p>{branch.invoices.length}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p>{t('checks')}</p>
                  <p>{branch.checks.length}</p>

                </div>
                <hr />
                <div className="flex items-center mt-3">
                  <CustomActionButton
                    onpress={() => handleEdit(branch)}
                    icon={<MdEdit size={20} color="green" />}
                  />
                  <CustomActionButton
                    onpress={() => handleDelete(branch)}
                    icon={<MdDelete size={20} color="red" />}
                  />
                </div>
              </div>
            ))}
          </>
        ) : (<></>)}



      </div>
    </div>
  );
}
