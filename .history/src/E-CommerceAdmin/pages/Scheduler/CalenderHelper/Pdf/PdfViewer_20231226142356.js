/** @format */

const PdfViewer = ({data}) => {
  console.log(data)
  return (
    <div className="">
      <iframe
        src={
          "https://shahina-new-admin-panel.vercel.app/FormPdf/TCAPeelPre.pdf"
        }
      />
    </div>
  );
};

export default PdfViewer;
