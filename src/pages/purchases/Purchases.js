import React, { useContext, useState, useEffect } from "react";
import CustomPageTitle from "../../custom/CustomPageTitle";
import { useTranslation } from "react-i18next";
import CustomSectionTitle from "../../custom/CustomSectionTitle";
import PurchasesTable from "../../components/purchasesComponents/PurchasesTable";
import AddPurchases from "./AddPurchases";
import axios from "axios";
import { Setting } from "../../utilties/Setting";

export default function Purchases() {
  const { t } = useTranslation();
  const [purchases, setPurchases] = useState();

  const fetchpurchases = async () => {
    try {
      const response = await axios.get(`${Setting.url}show/purchases`);
      setPurchases(response.data.data);
    } catch (error) {}
  };


  useEffect(()=>{
    fetchpurchases();
  },[])

  return (
    <div className="p-2">
      <CustomPageTitle title={t("purchases")} />
      <div className="bg-white my-3 p-2">
        <CustomSectionTitle title={t("addpurchases")} />

        <AddPurchases fetchpurchases={fetchpurchases} />
      </div>

      <div>
        <div className="my-3 p-2">
          <PurchasesTable fetchpurchases={fetchpurchases} purchases={purchases} />
        </div>
      </div>
    </div>
  );
}
