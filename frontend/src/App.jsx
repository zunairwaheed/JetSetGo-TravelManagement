import React from "react";
import Layout from "./components/Layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toast,{Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />
      <Toaster position="top-right"/>
      <Layout />
    </>
  );
};

export default App;
