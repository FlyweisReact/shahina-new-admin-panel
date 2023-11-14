/** @format */

const SendMessage = ({ document, setNewMessage }) => {
  return (
    <div className="chat-box">
      {document?.reply?.map((i, index) => (
        <div
          className={i.type === "sender" ? "left" : "right"}
          key={`document${index}`}
        >
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
              <span style={{ textDecoration: "underline" }}>
                {" "}
                {i.type === "sender"
                  ? document?.user?.name
                  : document?.reciver?.name}
              </span>
              <span className="date"> ( {i.date} )</span>
            </span>
          </div>
          <p className="text"> {i.text} </p>
        </div>
      ))}

      <div className="send_button">
        <input type="text" />
        <button>Submit</button>
      </div>
    </div>
  );
};
export default SendMessage;
