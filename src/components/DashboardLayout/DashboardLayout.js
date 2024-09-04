import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function DashboardLayout() {
  const { i18n } = useTranslation();
  return (
    <div
      className={`flex h-screen ${
        i18n.language === "en" ? "" : "flex-row-reverse"
      }`}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto transition-all ease-in-out duration-1000">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
