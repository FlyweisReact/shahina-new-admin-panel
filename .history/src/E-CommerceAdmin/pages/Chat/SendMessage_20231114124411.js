/** @format */

const SendMessage = ({ document }) => {
  console.log("Documnet", document);
  return (
    <div className="chat-box">
      {document?.reply?.map((i, index) => (
        <div className="" key={`document${index}`}>
        <div>
          <p> {i.text} </p>
        </div>
      ))}
    </div>
  );
};
export default SendMessage;