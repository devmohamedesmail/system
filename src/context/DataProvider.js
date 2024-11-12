import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { Setting } from "../utilties/Setting";

export const DataContext = createContext();
export default function DataProvider({ children }) {
  const [invoicesTypes, setinvoicesTypes] = useState([]);
  const [methodTypes, setmethodTypes] = useState();
  const [invoices, setInvoices] = useState([]);
  const [departments, setDepartemts] = useState();
  const [staff, setStaff] = useState();

  const fetchInvoiceTypes = async () => {
    try {
      const response = await axios.get(`${Setting.url}show/invoices/type/`,{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: false,
      });
      setinvoicesTypes(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // method types
  const fetchMethodTypes = async () => {
    try {
      const response = await axios.get(`${Setting.url}show/method/type`,{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: false,
      });
      setmethodTypes(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch invoices
  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`${Setting.url}show/invoices`,{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: false,
      });
      setInvoices(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch departments
  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${Setting.url}show/departments`,{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: false,
      });
      setDepartemts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await axios.get(`${Setting.url}show/staff`,{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: false,
      });
      setStaff(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInvoiceTypes();
    fetchMethodTypes();
    fetchInvoices();
    fetchDepartments();
    fetchStaff();
  }, []);
  return (
    <DataContext.Provider
      value={[
        invoicesTypes,
        fetchInvoiceTypes,
        methodTypes,
        fetchMethodTypes,
        invoices,
        fetchInvoices,
        departments,
        fetchDepartments,
        staff,
        fetchStaff
      ]}
    >
      {children}
    </DataContext.Provider>
  );
}
