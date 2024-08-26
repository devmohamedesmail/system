import React, { useEffect, useState } from "react";
import CustomPageTitle from "../../custom/CustomPageTitle";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import DataTable from "react-data-table-component";
import CustomTableButton from "../../custom/CustomTableButton";
import { ExportExcel } from "../../utilties/ExportExcel";
import TableSearchBox from "../../components/TableSearchBox/TableSearchBox";

export default function Problems() {
  const { t } = useTranslation();
  const [problemsData,setProblemsData]=useState();
  const [records,setrecords]=useState(problemsData)


  const fetchProblems = async () =>{
    const response = await axios.get(`${Setting.url}show/problems`)
    setProblemsData(response.data.data)
  }
  useEffect(()=>{
    fetchProblems()
  },[])

  const columns = [
    {
      name: t("step"),
      selector: (row) => row.step,
      sortable:true
    },
    {
      name: t("problem"),
      selector: (row) => row.problem,
      sortable:true
    },
    {
      name: t("reason"),
      selector: (row) => row.reason,
      sortable:true
    },
    {
      name: t("solution"),
      selector: (row) => row.solution,
      sortable:true
    },
    {
      name: t("worker"),
      selector: (row) => row.worker,
      sortable:true
    },
    {
      name: t("carno"),
      selector: (row) => row.carNo,
      sortable:true
    },
    {
      name: t("sales"),
      selector: (row) => row.sales,
      sortable:true
    },
  ];


  const handleExportProblems = () =>{
    ExportExcel(problemsData,'problems.xlsx')
  }


  const handleFilter = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const newData = problemsData.filter((row) => {
      return (
        row.carNo.toLowerCase().includes(searchValue) ||
        row.worker.toLowerCase().includes(searchValue)
      );
    });
    setrecords(newData);
  };

useEffect(()=>{
  setrecords(problemsData)
},[problemsData])

  return (
    <div className="p-2">
      <CustomPageTitle title={t("problems")} />
      <div className="bg-white p-3 my-3">
        <div>
          <CustomTableButton title={t('download')} onclick={()=>handleExportProblems()} />
            <TableSearchBox onchange={handleFilter} />
        </div>
        <DataTable columns={columns} data={records} pagination fixedHeader />
      </div>
    </div>
  );
}
