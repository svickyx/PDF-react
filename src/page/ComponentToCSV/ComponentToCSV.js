import Excel from "exceljs";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import demo from "../../asset/demo.xlsx";

const UpLoadExcel = () => {
  const [workbook, setWorkbook] = useState(null);
  useEffect(() => {
    (async () => {
      const resp = await fetch(demo);
      const buf = await resp.arrayBuffer();
      const wb = new Excel.Workbook();
      await wb.xlsx.load(buf);
      setWorkbook(wb);
    })();
  }, []);

  async function download() {
    const buffer = await workbook.xlsx.writeBuffer();
    const content = new Blob([buffer]);
    const encodedUri = window.URL.createObjectURL(content);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "xxx.xlsx");
    link.click();
  }
  return (
    <div>
      <button onClick={download}>download</button>
      {/* <input type="file" onChange={handleFile} /> */}
    </div>
  );
};

export default UpLoadExcel;
