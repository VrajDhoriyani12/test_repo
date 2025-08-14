"use client"
import "./globals.scss";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "@/shared/redux/store";
import { Initialload } from "@/shared/layouts-components/contextapi";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-input-2/lib/style.css'

const RootLayout = ({ children }: any) => {

  const [pageloading, setpageloading] = useState(false)

  return (
    <Provider store={store}>
      <Initialload.Provider value={{ pageloading, setpageloading }}>
        {children}
        <ToastContainer />
      </Initialload.Provider>
    </Provider>
  );
}
export default RootLayout;