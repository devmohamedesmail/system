import React, { useContext, useEffect, useState, useRef } from "react";
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
import TableSearchBox from "../../components/TableSearchBox/TableSearchBox";
import * as XLSX from "xlsx";
import TableButton from "../../components/InvoicesComponents/TableButton";
import { BranchesContext } from "../../context/BranchesProvider";
import { ImportExcel } from "../../utilties/ImportExcel";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import CustomSelectOption from "../../custom/CustomSelectOption";
import { Sidebar } from "primereact/sidebar";
import { FaArrowLeftLong } from "react-icons/fa6";
import SalesTargetSection from "./SalesTargetSection";
import { useTheme } from "../../context/ThemeContext";
import { MdPerson } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import { MdList, MdTableChart } from 'react-icons/md';
import ReactDOM from 'react-dom';
import Logo from "../../components/Logo/Logo";
import { Button } from 'primereact/button';

import { TbSortAscendingNumbers } from "react-icons/tb";
import { TbSortDescendingNumbers } from "react-icons/tb";




export default function ShowInvoices() {
  const [, , methodTypes, , invoices, fetchInvoices, , , , , settingData, ,] = useContext(DataContext);
  const { branches, fetchBranches } = useContext(BranchesContext);
  const { t } = useTranslation();
  const [records, setrecords] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [notes, setNotes] = useState([]);
  const [branchName, setBranchName] = useState("");
  const [methodType, setMethodType] = useState("");
  const [visibleRight, setVisibleRight] = useState(false);
  const [users, setUsers] = useState([]);
  const { theme } = useTheme();
  const [isListView, setIsListView] = useState(true);
  const [isDescending, setIsDescending] = useState(true);



  useEffect(() => {
    setrecords(invoices);
  }, [invoices]);


  // const reorderRecords = () => {
  //   const sortedRecords = [...records].sort((a, b) => b.id - a.id); // Sort descending by id
  //   setrecords(sortedRecords);
  // };


  const reorderRecords = (descending) => {
    const sortedRecords = [...records].sort((a, b) => {
      return descending ? b.id - a.id : a.id - b.id;  // Toggle the sorting based on `isDescending`
    });
    setrecords(sortedRecords);
  };

  // Function to toggle the sorting direction
  const toggleSortDirection = () => {
    setIsDescending(!isDescending);
    reorderRecords(!isDescending); // Reorder when direction changes
  };



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
              onpress={() => {
                printInvoice(row, notes, settingData, Logo);

              }}
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

  const printInvoice = (row, notes, Logo, settingData) => {
    const printContainer = document.createElement('div');
    ReactDOM.render(<PaperInvoice data={row} notes={notes} Logo={Logo} settingData={settingData} />, printContainer);
    document.body.appendChild(printContainer);

    // Apply the print styles
    const printStyles = `
      @media print {
        body * {
          visibility: hidden;
        }
        .printable-area, .printable-area * {
          visibility: visible;
        }
        .printable-area {
          position: absolute;
          left: 0;
          top: 0;
        }
           /* Hide browser header/footer information */
      @page {
        margin: 20px;
      }

      /* Optional: hide elements with class 'no-print' during printing */
      .no-print {
        display: none !important;
      }
      }
    `;
    const styleTag = document.createElement('style');
    styleTag.innerHTML = printStyles;
    document.head.appendChild(styleTag);

    // Delay the print action by 3 seconds
    setTimeout(() => {
      window.print(); // Trigger print after 3 seconds

      // Clean up after printing is triggered
      setTimeout(() => {
        document.body.removeChild(printContainer);
        document.head.removeChild(styleTag);

        // Optional: Reload the page after cleanup (you can comment this out if not needed)
        window.location.reload();
      }, 500); // A small delay before cleanup to ensure print window opened
    }, 2000);

  };


  const handleDelete = async (record) => {
    const userConfirmed = window.confirm(`${t("alertdelete")}`);
    if (userConfirmed) {
      try {
        setLoading(true);
        await axios.delete(`${Setting.url}delete/invoice/${record.id}`);
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

  // const handleFilter = (event) => {
  //   const newData = invoices.filter((row) => {
  //     return (
  //       row.carNo.toLowerCase().includes(event.target.value.toLowerCase()) ||
  //       row.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
  //       row.carNo.toLowerCase().includes(event.target.value.toLowerCase()) ||
  //       row.sales.toLowerCase().includes(event.target.value.toLowerCase()) ||
  //       row.price.toString().includes(event.target.value)
  //     );
  //   });
  //   setrecords(newData);
  // };

  const handleFilter = (event) => {
    const filterValue = event.target.value.toLowerCase();
  
    const newData = invoices.filter((row) => {
      return (
        row.carNo?.toLowerCase().includes(filterValue) ||
        row.name?.toLowerCase().includes(filterValue) ||
        row.sales?.toLowerCase().includes(filterValue) ||
        row.price?.toString().includes(event.target.value)
      );
    });
  
    setrecords(newData);
  };

  const handleExport = () => {
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

  // Fetch the invoice notes when the component mounts
  useEffect(() => {
    const fetchInvoiceNotes = async () => {
      try {
        const response = await axios.get(`${Setting.url}show/notes`); // replace with your correct API endpoint
        setNotes(response.data.data); // assuming response.data.data is the notes array
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchInvoiceNotes();
    setrecords(invoices);
  }, [invoices]);


  useEffect(() => {
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

  const toggleView = () => {
    setIsListView(!isListView);
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
              <h3 className={`text-center p-3 ${theme === 'light' ? 'bg-light-mode text-white' : 'bg-primary text-black'}`}>
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
                className={`p-2 rounded-full mx-5 ${theme === 'light' ? 'bg-light-mode' : 'bg-primary'}`}
                onClick={() => setVisibleRight(true)}
              >
                <FaArrowLeftLong color={`${theme === 'light' ? '#ffffff' : '#000000'}`} />
              </button>
              <TableSearchBox onchange={handleFilter} />
            </div>
          </div>
        </div>








        <div>
          <div className="flex items-center justify-end mb-4">

            <div className="mx-2">
              <Button onClick={toggleSortDirection} className="bg-primary text-white px-4 py-2 rounded-md">
                {isDescending ? <TbSortAscendingNumbers /> : <TbSortDescendingNumbers />}
              </Button>
            </div>
            <label className="flex items-center cursor-pointer">

              <input type="checkbox" checked={isListView} onChange={toggleView} className="toggle-checkbox hidden" />
              <span className="toggle-label bg-gray-300 w-14 h-8 rounded-full shadow-inner flex items-center justify-center">
                {isListView ? <MdList size={24} /> : <MdTableChart size={24} />}
              </span>
              <span className={`toggle-dot absolute w-6 h-6 bg-white rounded-full shadow -top-1 -left-1 transition ${isListView ? 'translate-x-0' : 'translate-x-6'}`}></span>
            </label>
          </div>



          {records ? (
            <>
              {isListView ?
                <>
                  {records.length > 0 ? (
                    <>

                      {records.map((record) => (
                        <div key={record.id} className="bg-white rounded-md shadow p-3 my-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <div>
                              <img src="/images/icons/truck.png" width='70px' />
                            </div>
                            <div className="w-44">
                              <h3 className="font-bold text-md text-primary">{record.carNo}</h3>
                              <h3 className="font-normal text-xs">{record.carType}</h3>
                              <h3 className="font-normal text-xs">{record.carService}</h3>
                              <h3 className="font-semibold text-md text-primary">{record.price}</h3>
                              <h3 className="font-normal text-xs">{record.percent}</h3>
                            </div>
                            <div className="mx-10">
                              <h3 className="flex items-center"><MdPerson />  <span className="mx-1">{record.name}</span></h3>
                              <h3 className="flex items-center"><FaMobileAlt />  <span className="mx-1">{record.phone}</span></h3>
                              <h3 className="flex items-center"><FaAddressBook />  <span className="mx-1">{record.address}</span></h3>
                            </div>
                          </div>
                          <div className="flex items-center flex-col">
                            <div className="flex items-center">
                              <CustomActionButton
                                onpress={() => navigate("/dashboard/invoice/edit", { state: { invoice: record } })}
                                icon={<MdEdit size={20} color="green" />}
                              />
                              <CustomActionButton
                                onpress={() => handleDelete(record)}
                                icon={<MdDelete size={20} color="red" />}
                              />
                              <CustomActionButton
                                onpress={() => printInvoice(record, notes, Logo, settingData)}
                                icon={<IoIosPrint size={20} color="green" />}
                              />

                            </div>
                            <div className="my-1 flex flex-col justify-center items-center">
                              <h3 className="my-1 text-green-600" >{record.Rdate}</h3>
                              <h3 className="my-1 text-red-600">{record.Ddate}</h3>
                              <h3 className="text-primary">{record.sales}</h3>
                            </div>
                          </div>
                        </div>
                      ))}

                    </>) : (<CustomLoading />)}
                </> : <>
                  <div className="my-3 px-3 bg-white">
                    <DataTable
                      columns={columns}
                      data={records}
                      pagination
                      fixedHeader
                      selectableRows
                    />
                  </div>
                </>}

            </>) : (<CustomLoading />)}

        </div>

      </div>
    </div>
  );
}
