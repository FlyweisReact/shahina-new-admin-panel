/** @format */

const PdfViewer = ({data}) => {
  console.log(data)
  return (
    <div className="pdfs">
      <iframe
        src={
          "https://shahina-new-admin-panel.vercel.app/FormPdf/TCAPeelPre.pdf"
        }
      />
      <iframe
        src={
          "https://shahina-new-admin-panel.vercel.app/FormPdf/TCAPeelPre.pdf"
        }
      />
      <iframe
        src={
          "https://shahina-new-admin-panel.vercel.app/FormPdf/TCAPeelPre.pdf"
        }
      />
    </div>
  );
};

export default PdfViewer;
