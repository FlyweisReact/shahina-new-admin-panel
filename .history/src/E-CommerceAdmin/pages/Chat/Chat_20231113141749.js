/** @format */

import React, { useEffect } from "react";
import HOC from "../../layout/HOC";


const Chat = () => {

  const [data, setData] = useState([]);

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default HOC(Chat);
