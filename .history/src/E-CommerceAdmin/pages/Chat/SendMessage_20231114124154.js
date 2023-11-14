/** @format */

const SendMessage = ({ document }) => {
  console.log('Documnet' , document)
  return (
    <div className="chat-box">
      {document?.reply?.map((i ,index) => (
        <div>
      ))}
    </div>
  );
};
export default SendMessage;
