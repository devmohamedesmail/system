import React, { useContext, useState, useEffect } from "react";
import CustomPageTitle from "../../custom/CustomPageTitle";
import { useTranslation } from "react-i18next";
import CustomSectionTitle from "../../custom/CustomSectionTitle";
import PurchasesTable from "../../components/purchasesComponents/PurchasesTable";
import AddPurchases from "./AddPurchases";

export default function Purchases() {
  const { t } = useTranslation();

  return (
    <div className="p-2">
      <CustomPageTitle title={t("purchases")} />
      <div className="bg-white my-3 p-2">
        <CustomSectionTitle title={t("addpurchases")} />

        <AddPurchases />
      </div>

      <div>
        <div className="my-3 p-2">
          <PurchasesTable />
        </div>
      </div>
    </div>
  );
}
