/** @format */

const PdfViewer = ({ data }) => {
  return (
    <div className="pdfs">
      {data?.map((i, index) => (
        <div className="box" key={`pdf${index}`}>
          <p> {i.filename} : </p>
          <a href={i.content} target="_blank" rel="">
            Open
          </a>
        </div>
      ))}
    </div>
  );
};

export default PdfViewer;
