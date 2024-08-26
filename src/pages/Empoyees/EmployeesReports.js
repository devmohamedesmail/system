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
    const response = await axios.get(`${Setting.url}show/reports`);
    setReports(response.data.data);
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
  return (
    <div className="p-2">
      <CustomPageTitle title={t("reports")} />
      <div className="bg-white py-3 px-2 my-3">
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

      <div>
        <DataTable
          columns={columns}
          data={reports}
          pagination
          fixedHeader
          selectableRows
        />
      </div>
    </div>
  );
}
