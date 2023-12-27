/** @format */

const PdfViewer = ({ data }) => {
  console.log(data);
  return (
    <div className="pdfs">
      {data?.map((i, index) => (
        <div className="box">
          <p> {i.filename} :  </p> <a></a>
        </div>
      ))}
    </div>
  );
};

export default PdfViewer;