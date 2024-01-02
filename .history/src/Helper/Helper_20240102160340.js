/** @format */
import ReactQuill from "react-quill";
import Form from "react-bootstrap/Form";

export const TableImage = (img) => {
  return img && <img src={img} alt="" className="Table_image" />;
};

export const Mail = (mail) => {
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${mail}`;
  window.location.href = gmailUrl;
};

/** @format */

export const Call = (number) => {
  window.location.href = `tel:${number}`;
};

export const SendSms = (number) => {
  const smsUrl = `sms:${number}`;
  window.location.href = smsUrl;
};

export const Editor_desciption = ({ setDescription, description, label }) => {
  return (
    <Form.Group className="mb-3 quill-container">
      <Form.Label> {label} </Form.Label>
      <ReactQuill
        value={description}
        onChange={(value) => setDescription(value)}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link"],
          ],
        }}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
        ]}
      />
    </Form.Group>
  );
};

export const View_description = ({ description }) => {
  return <div dangerouslySetInnerHTML={{ __html: description }} />;
};
