/** @format */

const PdfViewer = ({ data }) => {
  return (
    <div className="pdfs">
      {data?.length > 0 &&
        data?.map((i, index) => <iframe src={i} key={`pdf${index}`} />)}
    </div>
  );
};

export default PdfViewer;
