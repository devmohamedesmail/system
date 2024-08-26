import React, { useContext, useState } from "react";
import CustomPageTitle from "../../custom/CustomPageTitle";
import { useTranslation } from "react-i18next";
import CustomInput from "../../custom/CustomInput";
import CustomButton from "../../custom/CustomButton";
import { axios } from "../../utilties/imports";
import BranchTable from "../../components/BranchesComponents/BranchTable";
import { BranchesContext } from "../../context/BranchesProvider";
import { Setting } from "../../utilties/Setting";
import CustomSectionTitle from "../../custom/CustomSectionTitle";
import CustomLoading from "../../custom/CustomLoading";
import CustomModal from "../../custom/CustomModal";

export default function Branches() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { t, i18n } = useTranslation();
  const { branches, fetchBranches } = useContext(BranchesContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");

  const handleAddBranch = async () => {
    if (!name.trim()) {
      setError(`${"required"}`);
      return;
    }

    setError("");
    setLoading(true);

    try {
      await axios.post(`${Setting.url}add/new/branch`, {
        name,
        address,
        phone,
      });
      show("top-right");
      setName("");
      setAddress("");
      setPhone("");
      fetchBranches();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // modal function
  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  return (
    <div>
      <CustomPageTitle title={t("branches")} />
      <div className="bg-white p-3 my-3 ">
        <CustomSectionTitle title={t("addnewbranch")} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <CustomInput
              placeholder={t("name")}
              value={name}
              onchange={(e) => setName(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <div>
            <CustomInput
              placeholder={t("address")}
              value={address}
              onchange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div>
            {" "}
            <CustomInput
              placeholder={t("phone")}
              value={phone}
              onchange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="my-4">
          {loading ? (
            <CustomLoading />
          ) : (
            <CustomButton
              title={t("add")}
              onpress={() => handleAddBranch()}
              width="w-full md:w-1/4"
            />
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
      <div className="bg-white p-3 my-3 ">
        <CustomSectionTitle title={t("allbranches")} />
        <BranchTable branches={branches} fetchBranches={fetchBranches} />
      </div>

      <div></div>
    </div>
  );
}
