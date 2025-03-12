import React from "react";
import Layout from "./components/Layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Layout />
    </>
  );
};

export default App;
