/** @format */

import React from "react";
import HOC from "../../layout/HOC";

const SingleOrder = () => {
  return (
    <section>
    <p className="headP">Dashboard / Order</p>

    <div
      className="pb-4 sticky top-0  w-full flex justify-between items-center"
      style={{ width: "98%", marginLeft: "2%" }}
    >
      <span
        className="tracking-widest text-slate-900 font-semibold uppercase"
        style={{ fontSize: "1.5rem" }}
      >
        All Order's (Total : {total})
      </span>
    </div>
    <section className="sectionCont">
    
    </section>
  </section>
  );
};

export default HOC(SingleOrder);
