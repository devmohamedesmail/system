import React, { useContext, useEffect, useState } from "react";
import CustomPageTitle from "../../custom/CustomPageTitle";
import { DataContext } from "../../context/DataProvider";
import DataTable from "react-data-table-component";
import { useTranslation } from "react-i18next";
import CustomActionButton from "../../custom/CustomActionButton";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosPrint } from "react-icons/io";
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import CustomLoading from "../../custom/CustomLoading";
import { Link, useNavigate } from "react-router-dom";
import PaperInvoice from "./PaperInvoice";
import ReactDOMServer from "react-dom/server";
import TableSearchBox from "../../components/TableSearchBox/TableSearchBox";
import * as XLSX from "xlsx";
import TableButton from "../../components/InvoicesComponents/TableButton";
import CustomSelect from "../../custom/CustomSelect";
import { BranchesContext } from "../../context/BranchesProvider";
import { ImportExcel } from "../../utilties/ImportExcel";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import CustomSelectOption from "../../custom/CustomSelectOption";
import { Sidebar } from "primereact/sidebar";
import { FaArrowLeftLong } from "react-icons/fa6";
import SalesTargetSection from "./SalesTargetSection";
import { useTheme } from "../../context/ThemeContext";

export default function ShowInvoices() {
  const [
    invoicesTypes,
    fetchInvoiceTypes,
    methodTypes,
    fetchMethodTypes,
    invoices,
    fetchInvoices,
    departments,
    fetchDepartments,
    staff,
    fetchStaff,
  ] = useContext(DataContext);
  const { branches, fetchBranches } = useContext(BranchesContext);
  const { t } = useTranslation();
  const [records, setrecords] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [file, setFile] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [notes, setNotes] = useState();
  const [branchName, setBranchName] = useState("");
  const [methodType, setMethodType] = useState("");
  const [visibleRight, setVisibleRight] = useState(false);
  const [users, setUsers] = useState([]);
  const {theme}=useTheme();

  useEffect(() => {
    setrecords(invoices);
  }, [invoices]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: t("name"),
      selector: (row) => row.name,
      sortable: true,
    },

    {
      name: t("carno"),
      selector: (row) => row.carNo,
      sortable: true,
    },
    {
      name: t("price"),
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: t("action"),
      cell: (row) => {
        const handleEdit = () => {
          navigate("/dashboard/invoice/edit", { state: { invoice: row } });
        };

        return (
          <div className="flex items-center">
            <CustomActionButton
              onpress={handleEdit}
              icon={<MdEdit size={20} color="green" />}
            />
            {loading ? (
              <CustomLoading />
            ) : (
              <CustomActionButton
                onpress={() => handleDelete(row)}
                icon={<MdDelete size={20} color="red" />}
              />
            )}
            <CustomActionButton
              onpress={() => printInvoice(row)}
              icon={<IoIosPrint size={20} color="green" />}
            />
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const printInvoice = (data) => {
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Print Invoice</title>");
    // Add Tailwind CSS via CDN
    printWindow.document.write(
      '<link href="https://cdn.jsdelivr.net/npm/tailwindcss@^2.0/dist/tailwind.min.css" rel="stylesheet">'
    );
    printWindow.document.write("</head><body >");
    printWindow.document.write(
      `<div id="printable-area">${ReactDOMServer.renderToStaticMarkup(
        <PaperInvoice data={data} notes={notes} />
      )}</div>`
    );
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handleDelete = async (row) => {
    const userConfirmed = window.confirm(`${t("alertdelete")}`);
    if (userConfirmed) {
      try {
        setLoading(true);
        await axios.delete(`${Setting.url}delete/invoice/${row.id}`);
        fetchInvoices();
        setLoading(false);
      } catch (error) {
        alert(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFilter = (event) => {
    const newData = invoices.filter((row) => {
      return (
        row.carNo.toLowerCase().includes(event.target.value.toLowerCase()) ||
        row.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        row.carNo.toLowerCase().includes(event.target.value.toLowerCase()) ||
        row.price.toString().includes(event.target.value)
      );
    });
    setrecords(newData);
  };

  const handleExport = () => {
    // Convert the data to a format compatible with XLSX
    const ws = XLSX.utils.json_to_sheet(invoices);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Generate the Excel file and trigger download
    XLSX.writeFile(wb, "data.xlsx");
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onUpload = async () => {
    const endpoint = "import-invoices";
    if (file) {
      await ImportExcel(endpoint, file);
    } else {
      alert(`${t("pleaseselect")}`);
    }
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value.id);
    setBranchName(event.target.value.name);
  };

  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value.method);
    setMethodType(event.target.value.method);
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      let price = 0;
      invoices.forEach((invoice) => {
        const invoicePrice = parseFloat(invoice.price);

        if (isNaN(invoicePrice)) {
          console.error("Invalid price in invoice:", invoice.price);
          return;
        }
        if (
          (selectedBranch === null ||
            invoice.branch_id === parseInt(selectedBranch, 10)) &&
          (selectedMethod === null || invoice.paidMethod === selectedMethod)
        ) {
          price += invoicePrice;
          // console.log("Adding price:", invoicePrice);
        }
      });
      return price;
    };

    const newTotalPrice = calculateTotalPrice();
    setTotalPrice(newTotalPrice);
  }, [invoices, selectedBranch, selectedMethod]);

  const fetchInvoiceNotes = async () => {
    try {
      const response = await axios.get(`${Setting.url}show/notes`);
      setNotes(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchInvoiceNotes();
    fetchusers();
  }, []);

  const fetchusers = async () => {
    try {
      const response = await axios.get(`${Setting.url}show/users`);
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-3">
      <CustomPageTitle title={t('showinvoices')} />

      <div className="card flex justify-content-center">
        <Sidebar
          visible={visibleRight}
          position="right"
          onHide={() => setVisibleRight(false)}
        >
          <div>
            <div className="my-2">
              {branches && branches.length > 0 ? (
                <CustomSelectOption
                  value={branchName}
                  options={branches}
                  onchange={handleBranchChange}
                  labelTitle="name"
                  placeholder={t("branch")}
                />
              ) : (
                <> </>
              )}
            </div>

            <div className="my-2">
              {methodTypes && methodTypes.length > 0 ? (
                <CustomSelectOption
                  value={methodType}
                  onchange={handleMethodChange}
                  options={methodTypes}
                  labelTitle="method"
                  placeholder={t("selectpaidmethod")}
                />
              ) : (
                <></>
              )}
            </div>

            <div className="my-2">
              <h3 className={`text-center p-3 ${theme === 'light' ? 'bg-light-mode text-white':'bg-primary text-black'}`}>
                {totalPrice.toFixed(2)}
              </h3>
            </div>

            <hr className="h-2 w-100" />
            <SalesTargetSection users={users} />
          </div>
        </Sidebar>
      </div>

      <div className="">
        <div className="bg-white py-2 px-3 my-3">
          <div className="flex item-center justify-between">
            <div className="flex item-center">
              <div className="flex justify-center mx-3">
            
                <TableButton title={t("download")} onclick={handleExport} />


              </div>
              <div className="flex justify-center ">
                <div className="flex items-center border rounded-full w-fit">
                  <label htmlFor="excel" className="mx-3 hover:cursor-pointer">
                    <PiMicrosoftExcelLogoFill color="green" />
                    <input
                      id="excel"
                      type="file"
                      className="hidden"
                      onChange={onFileChange}
                    />
                  </label>

                  <TableButton title={t("Upload")} onclick={onUpload} />
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <button
                className={`p-2 rounded-full mx-5 ${theme === 'light' ? 'bg-light-mode':'bg-primary'}`}
                onClick={() => setVisibleRight(true)}
              >
                <FaArrowLeftLong color={`${theme === 'light' ? '#ffffff':'#000000'}`} />
              </button>
              <TableSearchBox onchange={handleFilter} />
            </div>
          </div>
        </div>

        {records ? (
          <div className="my-3 px-3 bg-white">
            <DataTable
              columns={columns}
              data={records}
              pagination
              fixedHeader
              selectableRows
            />
          </div>
        ) : (
          <CustomLoading />
        )}
      </div>
    </div>
  );
}
