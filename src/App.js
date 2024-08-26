import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import AddInvoice from "./pages/Invoices/AddInvoice";
import ShowInvoices from "./pages/Invoices/ShowInvoices";
import SideBarProvider from "./context/SideBarProvider";
import Branches from "./pages/Branches/Branches";
import BranchesProvider from "./context/BranchesProvider";
import AuthProvider from "./context/AuthProvider";
import InvoiceSetting from "./pages/InvoiceSetting/InvoiceSetting";
import DataProvider from "./context/DataProvider";
import EditInvoice from "./pages/Invoices/EditInvoice";
import EmpoyeeSetting from "./pages/Empoyees/EmpoyeeSetting";
import Employees from "./pages/Empoyees/Employees";
import EditEmployee from "./pages/Empoyees/EditEmployee";
import EmployeesReports from "./pages/Empoyees/EmployeesReports";
import Purchases from "./pages/purchases/Purchases";
import EditPurchases from "./pages/purchases/EditPurchases";
import Rent from "./pages/Rent/Rent";
import EditRent from "./pages/Rent/EditRent";
import Checks from "./pages/Checks/Checks";
import { useTranslation } from "react-i18next";
import Users from "./pages/Users/Users";
import Problems from "./pages/Invoices/Problems";
import ProtectedRoute from "./Security/ProtectedRoute";
import EditUser from "./pages/Users/EditUser";
import Cars from "./pages/Cars/Cars";
import Setting from "./pages/Setting/Setting";
import CarsStage from "./pages/Cars/CarsStage";

function App() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const fontClass = currentLanguage === 'ar' ? 'arabic-font' : '';

  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <BranchesProvider>
            <SideBarProvider>
              <div className={fontClass}>
                <Routes>
                  
                  <Route index path="/" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route path="home" element={<Home />} />
                    <Route path="create/new/invoice" element={<AddInvoice />} />
                    <Route
                      path="show/all/invoices"
                      element={<ShowInvoices />}
                    />
                    <Route path="invoices/problems" element={<Problems/>} />
                    {/* branches */}
                    <Route path="branches" element={<Branches />} />
                    {/* invoice setting */}
                    <Route
                      path="invoice/setting"
                      element={<InvoiceSetting />}
                    />
                    {/* invoices */}
                    <Route path="invoice/edit" element={<EditInvoice />} />
                    {/* employees */}
                    <Route
                      path="employees/setting"
                      element={<EmpoyeeSetting />}
                    />
                    <Route path="show/employees" element={<Employees />} />
                    <Route path="edit/employee" element={<EditEmployee />} />
                    <Route
                      path="reports/employees"
                      element={<EmployeesReports />}
                    />
                    {/* purchases */}
                    <Route path="purchases/page" element={<Purchases />} />
                    <Route path="edit/purchase" element={<EditPurchases />} />
                    {/* Rent */}
                    <Route path="rent/page" element={<Rent />} />
                    <Route path="edit/rent" element={<EditRent />} />
                    {/* checks pages */}
                    <Route path="checks/page" element={<Checks />} />
                    {/* users */}
                    <Route path="users/page" element={<Users />} />
                    <Route path="edit/user" element={<EditUser />} />
                    {/* cars */}
                    <Route path="cars/page" element={<Cars />} />
                    <Route path="car/stages" element={<CarsStage />} />
                    {/* Setting page */}
                    <Route path="setting/page" element={<Setting />} />
                  </Route>
                </Routes>
              </div>
            </SideBarProvider>
          </BranchesProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
