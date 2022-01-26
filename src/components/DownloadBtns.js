import { PDFDownloadLink } from "@react-pdf/renderer";
import ComponentToExcel from "../page/ComponentToExcel/ComponentToExcel";
import ComponentToPrint from "../page/ComponentToPrint/ComponentToPrint";

const DownloadBtns = ({ projectInfo, cardListForPdf, cardListForExcel }) => {
  return (
    <div className="flex justify-center items-center">
      <PDFDownloadLink
        document={
          <ComponentToPrint
            projectInfo={projectInfo}
            cardListForPdf={cardListForPdf}
          />
        }
        fileName="image.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            "加載中......"
          ) : (
            <button className="h-[30px] border-none bg-green-600 text-white py-0 px-3 rounded-lg cursor-pointer mr-2">
              點擊這裡下載PDF
            </button>
          )
        }
      </PDFDownloadLink>
      <ComponentToExcel
        projectInfo={projectInfo}
        cardListForExcel={cardListForExcel}
      />
    </div>
  );
};

export default DownloadBtns;
