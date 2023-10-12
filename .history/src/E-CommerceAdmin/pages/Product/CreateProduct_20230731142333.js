/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import {} from 'react-bootstrap'

const CreateProduct = () => {
  return (
    <section>
      <p className="headP">Dashboard / Order</p>
      <section className="sectionCont">
        <Form>
   
          <Link to="/Orders">
            <Button variant="dark">Back</Button>
          </Link>
        </Form>
      </section>
    </section>
  );
};

export default HOC(CreateProduct);
