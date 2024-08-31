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
import { AuthContext } from "../../context/AuthProvider";
import { ImportExcel } from "../../utilties/ImportExcel";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";

export default function ShowInvoices() {
  const [, , methodTypes, , invoices, fetchInvoices, , ,] =
    useContext(DataContext);
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
  const { auth, setauth } = useContext(AuthContext);

  useEffect(() => {
    setrecords(invoices);
  }, [invoices]);

  const columns = [
    {
      name: t("name"),
      selector: (row) => row.name,
      sortable: true,
    },

    {
      name: t("carno"),
      selector: (row) => row.carNo, // Adjusted to match property name
      sortable: true,
    },
    {
      name: t("cartype"),
      selector: (row) => row.carType, // Adjusted to match property name
      sortable: true,
    },
    {
      name: t("carservice"),
      selector: (row) => row.carService, // Adjusted to match property name
      sortable: true,
    },
    {
      name: t("price"),
      selector: (row) => row.price, // Adjusted to match property name
      sortable: true,
    },
    {
      name: t("action"),
      cell: (row) => {
        // const navigate = useNavigate();

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
      return row.carNo.toLowerCase().includes(event.target.value.toLowerCase());
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
    setSelectedBranch(event.target.value);
  };

  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      console.log("Calculating total price with:");
      console.log("Selected Branch:", selectedBranch);
      console.log("Selected Method:", selectedMethod);

      let price = 0;

      invoices.forEach((invoice) => {
        const invoicePrice = parseFloat(invoice.price);

        if (isNaN(invoicePrice)) {
          console.error("Invalid price in invoice:", invoice.price);
          return;
        }

        console.log("Checking invoice:", invoice);

        if (
          (selectedBranch === null ||
            invoice.branch_id === parseInt(selectedBranch, 10)) &&
          (selectedMethod === null || invoice.paidMethod === selectedMethod)
        ) {
          price += invoicePrice;
          console.log("Adding price:", invoicePrice);
        }
      });

      console.log("Total calculated price:", price);
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
  }, []);

  return (
    <div className="m-3">
      <CustomPageTitle title="Show All Invoices" />
      <div className="">
        <div className="bg-white py-2 px-3 my-3">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <div className="flex justify-center ">
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

            <div className="flex justify-center ">
              {branches && branches.length > 0 ? (
                <CustomSelect
                  title={t("branch")}
                  value={selectedOption}
                  data={branches}
                  itemTitleKey="id"
                  itemtitle="name"
                  itemvalue="id"
                  onchange={handleBranchChange}
                />
              ) : (
                <></>
              )}
            </div>

            <div>
              {methodTypes && methodTypes.length > 0 ? (
                <>
                  <CustomSelect
                    title={t("selectpaidmethod")}
                    value={selectedOption}
                    data={methodTypes}
                    itemTitleKey="id"
                    itemtitle="method"
                    itemvalue="method"
                    onchange={handleMethodChange}
                  />
                </>
              ) : (
                <></>
              )}
            </div>

            <div>
              <h3 className="bg-light px-4 py-2 rounded-full mx-4">
                {totalPrice.toFixed(2)}
              </h3>
            </div>

            <div>
              <TableSearchBox onchange={handleFilter} />
            </div>
          </div>
        </div>

        <div className="my-3 px-3 bg-white">
        <DataTable
              columns={columns}
              data={records}
              pagination
              fixedHeader
              selectableRows
            />
        </div>
      </div>
    </div>
  );
}
