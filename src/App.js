import React from "react";
import ComponentToEdit from "./page/ComponentToEdit/ComponentToEdit";
import UpLoadExcel from "./page/ComponentToCSV/ComponentToCSV";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <UpLoadExcel />
      <ComponentToEdit />
    </div>
  );
};

export default App;
