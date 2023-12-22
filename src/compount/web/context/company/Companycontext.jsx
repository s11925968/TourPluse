import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';

export let CompanyContext = createContext();

export function CompanyContextProvider({ children }) {
  const [company, setCompanycontext] = useState(null);

  const saveCurrentCompany = () => {
    const token = localStorage.getItem('companyToken');
    if (token) {
      const decode = jwtDecode(token);
      setCompanycontext(decode);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('companyToken');
    if (storedToken) {
      saveCurrentCompany();
    } else {
      // Token is not available, set company to null
      setCompanycontext(null);
    }
  }, []);

  useEffect(() => {
    // If company is still undefined, fetch it again
    if (company === undefined || company === null) {
      saveCurrentCompany();
    }
  }, [company]);


  return (
    <CompanyContext.Provider value={{ company, setCompanycontext }}>
      {children}
    </CompanyContext.Provider>
  );
}
