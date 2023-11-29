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
import {
    QueryClient,
    QueryClientProvider,
    } from 'react-query'
    const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
    <QueryClientProvider client={queryClient}>
    <ToastContainer />
    <App />
    </QueryClientProvider>
    
    </>
    
)
