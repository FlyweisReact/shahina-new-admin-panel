/** @format */

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
