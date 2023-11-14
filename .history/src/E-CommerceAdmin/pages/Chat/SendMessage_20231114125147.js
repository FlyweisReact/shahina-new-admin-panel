/** @format */

const SendMessage = ({ document }) => {
  console.log("Documnet", document);
  return (
    <div className="chat-box">
      {document?.reply?.map((i, index) => (
        <div className="" key={`document${index}`}>
          <div className="img-container">
            <img
              src={
                i.type === "sender"
                  ? document?.user?.avatar
                  : document?.reciver?.avatar
              }
              alt=""
            />
            <span>
              {i.type === "sender"
                ? document?.user?.name
                : document?.reciver?.name}
            </span>
          </div>
          <p className="text"> {i.text} </p>
        </div>
      ))}
    </div>
  );
};
export default SendMessage;