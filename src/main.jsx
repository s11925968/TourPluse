import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import global_en from "./translations/en/global.json";
import global_ar from "./translations/ar/global.json";

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: { global: global_en },
    ar: { global: global_ar },
  },
});
import {
    QueryClient,
    QueryClientProvider,
    } from 'react-query'
import { CompanyContextProvider } from './compount/web/context/company/Companycontext.jsx'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <CompanyContextProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <I18nextProvider i18n={i18next}>
        <App />
        </I18nextProvider>
      </QueryClientProvider>
    </CompanyContextProvider>
  </>
);
