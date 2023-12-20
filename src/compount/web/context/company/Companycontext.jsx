import {jwtDecode} from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let CompanyContext = createContext();

export function CompanyContextProvider({ children }) {
  const [company, setCompanycontext] = useState(null);

  const saveCurrentCompany = () => {
    const token = localStorage.getItem("companyToken");
    const decode = jwtDecode(token);
    setCompanycontext(decode);
  };

  useEffect(() => {
    if (localStorage.getItem("companyToken")) {
      saveCurrentCompany();
    }
  }, []);

  return (
    <CompanyContext.Provider value={{ company, setCompanycontext }}>
      {children}
    </CompanyContext.Provider>
  );
}
