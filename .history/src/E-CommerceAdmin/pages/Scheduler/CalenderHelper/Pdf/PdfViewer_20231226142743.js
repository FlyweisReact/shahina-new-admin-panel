/** @format */

const PdfViewer = ({ data }) => {
  console.log(data);
  return (
    <div className="pdfs">
      {data?.length > 0 && data?.map((i, index) => <iframe src={i} />)}
    </div>
  );
};

export default PdfViewer;