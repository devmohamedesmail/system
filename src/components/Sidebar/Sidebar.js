import React, { useContext, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import "./style.css";
import SidebarNavItem from "./SidebarNavItem";
import SidebarDropdownItem from "./SidebarDropdownItem";
import { useTranslation } from "react-i18next";
import { SidebarContext } from "../../context/SideBarProvider";
import { FaCodeBranch } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import { FaShoppingBasket } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FaWarehouse } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { AuthContext } from "../../context/AuthProvider";
import { LiaCarSideSolid } from "react-icons/lia";
import { IoChevronDownOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";


export default function Sidebar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const { sidebarstatus } = useContext(SidebarContext);
  const { auth } = useContext(AuthContext);

  const { t } = useTranslation();

  const handleDropdownToggle = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <div
      className={`flex top-0 bottom-0  flex-col w-64 rounded-tr-lg rounded-br-lg  min-h-full text-white transition-max-width duration-300 bg-white ${
        sidebarstatus ? "max-w-xs" : "max-w-0 overflow-hidden"
      } `}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/images/icons/logo.png"
            className="select-none"
            width={50}
            alt="logo"
          />
          <h5 className="text-black select-none font-bold">Al akhtaboot</h5>
        </div>
      </div>

      <nav>
        <ul>
          <SidebarNavItem
            icon={<MdDashboard color="black" size={20} />}
            title={t('dashboard')}
            link="home"
          />

          {/* branches */}
          <SidebarNavItem
            icon={<FaCodeBranch color="black" size={20} />}
            title={t("branches")}
            link="branches"
          />
          {/* invoice Setting */}
          <SidebarNavItem
            icon={<VscSettings color="black" size={20} />}
            title={t("invoiceSetting")}
            link="invoice/setting"
          />


          <li>
            <button
              className="w-full text-left py-2 px-4 my-1 items-center focus:outline-none flex justify-between  transition-colors duration-1000 ease-in-out hover:bg-primary"
              onClick={() => handleDropdownToggle("invoices")}
            >
              <div className="flex items-center">
                <LiaFileInvoiceSolid color="black" size={20} />
                <span className="text-black ml-3 text-sm">{t("invoices")}</span>
              </div>
              <IoChevronDownOutline color="black" size={20} />
            </button>

            <ul
              className={`${
                openDropdown === "invoices"
                  ? "h-fit transition-height ease-in-out duration-1000 bg-slate-200"
                  : "max-h-0 transition-height overflow-hidden ease-in-out duration-1000"
              }`}
            >
              <SidebarDropdownItem
                icon={<GoDotFill color="black" /> }
                link="create/new/invoice"
                title={t("createnewinvoice")}
              />
              <SidebarDropdownItem
                icon={<GoDotFill color="black" /> }
                link="show/all/invoices"
                title={t("showinvoices")}
              />
            </ul>
          </li>

          <li>
            <button
              className="w-full text-left py-2 px-4 my-1 items-center focus:outline-none flex justify-between  transition-colors duration-1000 ease-in-out hover:bg-primary"
              onClick={() => handleDropdownToggle("cars")}
            >
              <div className="flex items-center">
                <LiaCarSideSolid color="black" size={20} />
                <span className="text-black ml-3 text-sm">{t("cars")}</span>
              </div>
              <IoChevronDownOutline color="black" size={20} />
            </button>

            <ul
              className={`${
                openDropdown === "cars"
                  ? "h-fit transition-height ease-in-out duration-1000 bg-slate-200"
                  : "max-h-0 transition-height overflow-hidden ease-in-out duration-1000"
              }`}
            >
              <SidebarDropdownItem
                icon={<GoDotFill color="black" /> }
                link="invoices/problems"
                title={t("problems")}
              />
              <SidebarDropdownItem
                icon={<GoDotFill color="black" />}
                link="car/stages"
                title={t("stages")}
              />
              <SidebarDropdownItem
                icon={<GoDotFill color="black" /> }
                link="cars/page"
                title={t("mycars")}
              />

              
            </ul>
          </li>

          <li>
            <button
              className="w-full text-left py-2 px-4 my-1 items-center focus:outline-none flex justify-between  transition-colors duration-1000 ease-in-out hover:bg-primary"
              onClick={() => handleDropdownToggle("employees")}
            >
              <div className="flex items-center">
                <FaUsersBetweenLines color="black" size={20} />
                <span className="text-black ml-3 text-sm">{t("employees")}</span>
              </div>
              <IoChevronDownOutline color="black" size={20} />
            </button>

            <ul
              className={`${
                openDropdown === "employees"
                  ? "h-fit transition-height ease-in-out duration-1000 bg-slate-200"
                  : "max-h-0 transition-height overflow-hidden ease-in-out duration-1000"
              }`}
            >
              <SidebarDropdownItem
                icon={<GoDotFill color="black" /> }
                link="employees/setting"
                title={t("setting")}
              />
              <SidebarDropdownItem
                icon={<GoDotFill color="black" /> }
                link="show/employees"
                title={t("employees")}
              />
              <SidebarDropdownItem
                icon={<GoDotFill color="black" /> }
                link="reports/employees"
                title={t("employeesreports")}
              />
            </ul>
          </li>


          <SidebarNavItem
            icon={<FaShoppingBasket color="black" size={20} />}
            title={t("purchases")}
            link="purchases/page"
          />

          <SidebarNavItem
            icon={<FaWarehouse color="black" size={20} />}
            title={t("rent")}
            link="rent/page"
          />

          <SidebarNavItem
            icon={<FaMoneyCheckAlt color="black" size={20} />}
            title={t("checks")}
            link="checks/page"
          />
          {auth ? (
            <>
              {auth.user.role === "admin" ? (
                <SidebarNavItem
                  icon={<FaUsers color="black" size={25} />}
                  title={t("users")}
                  link="users/page"
                />
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}

          {/* <SidebarNavItem
            icon={<IoSettings color="black" size={20} />}
            title={t("setting")}
            link="setting/page"
          /> */}
        </ul>
      </nav>
    </div>
  );
}
