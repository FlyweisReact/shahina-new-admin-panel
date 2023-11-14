/** @format */

const SendMessage = ({
  document,
  setNewMessage,
  newMessage,
  handleOnSubmit,
}) => {
  return (
    document && (
      <div className="chat-box">
        <div className="ttt">
        {document?.reply?.length > 0 ?  : <span></span>}
          
        </div>

        <form onSubmit={handleOnSubmit}>
          <div className="send_button">
            <input
              type="text"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
            <button type="submit">Send </button>
          </div>
        </form>
      </div>
    )
  );
};
export default SendMessage;
