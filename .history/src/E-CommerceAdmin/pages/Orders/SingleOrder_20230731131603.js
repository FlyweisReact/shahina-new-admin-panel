/** @format */

import React from "react";
import { useParams } from "react-router-dom";
import HOC from "../../layout/HOC";

const SingleOrder = () => {

    const { id } = useParams()

    const getOrder = async () => {
        
    }

  return (
    <section>
    <p className="headP">Dashboard / Order</p>
    <section className="sectionCont">
    
    </section>
  </section>
  );
};

export default HOC(SingleOrder);
