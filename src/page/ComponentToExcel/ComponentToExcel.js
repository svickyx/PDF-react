import Excel from "exceljs";
import { useState, useEffect } from "react";
import format from "../../asset/format.xlsx";

const ComponentToExcel = ({ projectInfo, cardListForExcel }) => {
  const [workbook, setWorkbook] = useState(null);

  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  };

  useEffect(() => {
    (async () => {
      const resp = await fetch(format);
      const buf = await resp.arrayBuffer();
      const wb = new Excel.Workbook();
      await wb.xlsx.load(buf);

      setWorkbook(wb);
    })();
  }, []);
  useEffect(() => {
    if (workbook) {
      const { projectName, designer } = projectInfo;
      const worksheet = workbook.getWorksheet("施工照片");

      worksheet.getCell("A5").value = `工程名稱：${projectName}`;
      worksheet.getCell("A6").value = `監造單位：${designer}`;

      for (let i = 0; i < cardListForExcel.length; i++) {
        let { date, number, title, note } = cardListForExcel[i];
        // if (i > 2) {
        //   worksheet.getCell(`B${9 + i * 4}`)= worksheet.getCell('B9');
        //   worksheet.getCell(`B${10 + i * 4}`)= worksheet.getCell(`B10`);
        //   worksheet.getCell(`B${11 + i * 4}`)= worksheet.getCell(`B11`);
        //   worksheet.getCell(`B${12 + i * 4}`)= worksheet.getCell(`B12`);
        // }

        worksheet.getCell(`B${9 + i * 4}`).value = `拍攝時間: ${date}`;
        worksheet.getCell(`B${10 + i * 4}`).value = `契約項次： ${number}`;
        worksheet.getCell(`B${11 + i * 4}`).value = `工程項目： ${title}`;
        worksheet.getCell(`B${12 + i * 4}`).value = `說明： ${note}`;
      }

      const imageUrls = cardListForExcel.map((card) => card.image);
      const imagePromises = imageUrls.map((url) => {
        return getBase64FromUrl(url);
      });

      Promise.all(imagePromises).then((results) => {
        results.forEach((result, i) => {
          let imageId = workbook.addImage({
            base64: result,
            extension: "jpeg",
          });
          worksheet.addImage(imageId, `A${9 + i * 4}:A${12 + i * 4}`);
        });
      });
    }
  }, [projectInfo, cardListForExcel, workbook]);

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
      <button
        className="h-[30px] border-none bg-green-600 text-white py-0 px-3 rounded-lg cursor-pointer"
        onClick={download}
      >
        點擊這裡下載Excel
      </button>
    </div>
  );
};

export default ComponentToExcel;
