import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const downloadPDF = (printRef) => {
  if (!printRef.current) {
    alert("Invoice not ready");
    return;
  }

  const element = printRef.current;

  html2pdf().from(element).save("invoice.pdf");
};

export default downloadPDF;


