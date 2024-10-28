import React, { useEffect, useState } from "react";
import CustomPageTitle from "../../custom/CustomPageTitle";
import { useTranslation } from "react-i18next";
import CustomSectionTitle from "../../custom/CustomSectionTitle";
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import CustomDropDownMenu from "../../custom/CustomDropDownMenu";
import CustomTextArea from "../../custom/CustomTextArea";
import CustomButton from "../../custom/CustomButton";
import CustomModal from "../../custom/CustomModal";
import DataTable from "react-data-table-component";
import CustomActionButton from "../../custom/CustomActionButton";
import { MdDelete } from "react-icons/md";
import CustomCalender from "../../custom/CustomCalender";
import CustomLoading from "../../custom/CustomLoading";
import TableSearchBox from "../../components/TableSearchBox/TableSearchBox";
import { useTheme } from "../../context/ThemeContext";

export default function EmployeesReports() {
  const { t } = useTranslation();
  const [staffData, setStaffData] = useState();
  const [staff, setStaff] = useState(null);
  const [report, setReport] = useState(null);
  const [staffError, setStaffError] = useState(false);
  const [staffName, setStaffName] = useState();
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState();
  const [date, setDate] = useState();
  const [records, setrecords] = useState();
  const { theme } = useTheme();

  const columns = [
    {
      name: t("name"),
      selector: (row) => row.staff.name,
      sortable: true,
    },
    {
      name: t("reportdetails"),
      selector: (row) => row.report,
      sortable: true,
    },
    {
      name: t("date"),
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: t("action"),
      cell: (row) => (
        <div>
          <CustomActionButton
            icon={<MdDelete color="red" size={20} />}
            onpress={() => handleDeleteReport(row)}
          />
        </div>
      ),
    },
  ];

  // ------------------- functions ------------------
  const fetchStaff = async () => {
    const response = await axios.get(`${Setting.url}show/staff`);
    setStaffData(response.data.data);
  };

  const handleAddReport = async () => {
    if (staff === null) {
      setStaffError(true);
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${Setting.url}add/report`, {
        staff,
        report,
        date,
      });

      setLoading(false);
      setVisible(true);
      fetchStaffReports();
      setStaff(null);
      setReport("");
      setDate("");
      setStaffName("");
    } catch (error) {
      alert(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchStaffReports = async () => {
   try {
    const response = await axios.get(`${Setting.url}show/reports`);
    setReports(response.data.data);
    setrecords(response.data.data);
   } catch (error) {
    console.log(error);
   }
  };

  const handleDeleteReport = async (row) => {
    try {
      const confirm = window.confirm(`${t("alertdelete")}`);
      if (confirm) {
        await axios.delete(`${Setting.url}delete/report/${row.id}`);
        fetchStaffReports();
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchStaff();
    fetchStaffReports();
  }, []);


  const handleFilter = (event) => {
    if (!event.target) return;

    const searchTerm = event.target.value || "";

    const filterData = (reports || []).filter((item) => {
      return item.staff.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setrecords(filterData);
  };




  return (
    <div className="">
      <CustomPageTitle title={t("reports")} />
      <div className={`my-3 p-3 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
        <CustomSectionTitle title={t("addreports")} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <CustomDropDownMenu
              value={staffName}
              onchange={(e) => {
                setStaff(e.value.id);
                setStaffName(e.value.name);
              }}
              options={staffData}
              optionLabel="name"
              placeholder={t("selectstaff")}
            />
            {staffError ? (
              <p className="text-red-600 text-sm">{t("required")}</p>
            ) : (
              <></>
            )}
          </div>
          <div>
            <CustomTextArea
              value={report}
              onchange={(e) => setReport(e.target.value)}
              placeholder={t("report")}
            />
          </div>
          <div>
            <CustomCalender
              value={date}
              onchange={(e) => setDate(e.target.value)}
              placeholder={t("selectDate")}
            />
          </div>
        </div>

        <div className="my-4">
         
          {loading?(<CustomLoading />):( <CustomButton title={t("add")} onpress={handleAddReport} />)}
        </div>

        <CustomModal
          visible={visible}
          setVisible={setVisible}
          position={position}
          setPosition={setPosition}
          content={t("reportadded")}
        />
      </div>

      <div className="bg-white p-2">
        <div className="flex justify-end">
           <TableSearchBox onchange={handleFilter} />
        </div>
        <DataTable
          columns={columns}
          data={records}
          pagination
          fixedHeader
          selectableRows
        />
      </div>
    </div>
  );
}
