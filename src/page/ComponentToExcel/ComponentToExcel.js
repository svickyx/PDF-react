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
      const cell9Style = worksheet.getCell(`B9`).style;
      const cell10Style = worksheet.getCell(`B10`).style;
      const cell11Style = worksheet.getCell(`B11`).style;
      const cell12Style = worksheet.getCell(`B12`).style;
      const cell9Height = worksheet.getCell(`B9`)._row.height;
      const cell10Height = worksheet.getCell(`B10`)._row.height;
      const cell11Height = worksheet.getCell(`B11`)._row.height;
      const cell12Height = worksheet.getCell(`B12`)._row.height;
      const imageCellStyle = worksheet.getCell(`A9:A12`).style;
      const imageCellHeight =
        cell9Height + cell10Height + cell11Height + cell12Height;
      for (let i = 0; i < cardListForExcel.length; i++) {
        const worksheet = workbook.getWorksheet("施工照片");
        let { date, number, title, note } = cardListForExcel[i];
        worksheet.getCell(`A${9 + i * 4}:A${12 + i * 4}`).style = {
          ...imageCellStyle,
        };
        worksheet.getCell(`A${9 + i * 4}:A${12 + i * 4}`)._row.height =
          imageCellHeight;
        worksheet.getCell(`B${9 + i * 4}`).style = { ...cell9Style };
        worksheet.getCell(`B${9 + i * 4}`).value = `拍攝時間: ${date}`;
        worksheet.getCell(`B${9 + i * 4}`)._row.height = cell9Height;

        //
        worksheet.getCell(`B${10 + i * 4}`).style = { ...cell10Style };
        worksheet.getCell(`B${10 + i * 4}`).value = `契約項次： ${number}`;
        worksheet.getCell(`B${10 + i * 4}`)._row.height = cell10Height;

        //
        worksheet.getCell(`B${11 + i * 4}`).style = { ...cell11Style };
        worksheet.getCell(`B${11 + i * 4}`).value = `工程項目： ${title}`;
        worksheet.getCell(`B${11 + i * 4}`)._row.height = cell11Height;

        //
        worksheet.getCell(`B${12 + i * 4}`).style = { ...cell12Style };
        worksheet.getCell(`B${12 + i * 4}`).value = `說明： ${note}`;
        worksheet.getCell(`B${12 + i * 4}`)._row.height = cell12Height;
      }

      const imageUrls = cardListForExcel.map((card) => card.image);
      const imagePromises = imageUrls.map((url) => {
        if (!url) {
          return null;
        }
        return getBase64FromUrl(url);
      });

      Promise.all(imagePromises).then((results) => {
        results.forEach((result, i) => {
          if (result) {
            let imageId = workbook.addImage({
              base64: result,
              extension: "jpeg",
            });
            worksheet.addImage(imageId, `A${9 + i * 4}:A${12 + i * 4}`);
          }
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
