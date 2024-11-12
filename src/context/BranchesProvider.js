import React, { createContext, useState, useEffect } from "react";
import { Setting } from "../utilties/Setting";
import axios from "axios";

export const BranchesContext = createContext();
function BranchesProvider({ children }) {
  const [branches, setBranches] = useState();

  const fetchBranches = async () => {
    try {
      const response = await axios.get(`${Setting.url}show/branches/`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: false,
      });
      setBranches(response.data.data);
      console.log("fsdf");
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <BranchesContext.Provider value={{ branches, fetchBranches }}>
      {children}
    </BranchesContext.Provider>
  );
}

export default BranchesProvider;
