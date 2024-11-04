import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import '../../pages/screenStyle.css'
import './style.css'
import { useTheme } from "../../context/ThemeContext";
import Footer from "../Footer/Footer";

export default function DashboardLayout() {
  const { i18n } = useTranslation();
  const { theme } = useTheme();



// style={{ backgroundColor: theme === "light" ? "#f5f5f5" : "#1f1f1f" }}


  
  return (
    <div className={`flex h-screen page-layout ${i18n.language === "en" ? "" : "flex-row-reverse"}`} style={{ backgroundImage: theme === "light" ? "none" : "url('/images/bg.jpg')" }}>
      <div className="overlay-bg" style={{ opacity: theme === "light" ?  1 : 1 , backgroundColor: theme === "light" ? "#f5f5f5" : "#1f1f1f" }}>
        <Header />
    
        <div className="container-fluid px-10">
          <main className="">
            <Outlet />
          </main>
        </div>
       <Footer />
      </div>
    </div>
  );
}
