/** @format */

import React from "react";
import HOC from "../../layout/HOC";

const CreateProduct = () => {
  return (
    <section>
      <p className="headP">Dashboard / Order</p>
      <section className="sectionCont">
        <Form>
          <img src={getImageLink(data)} alt="" className="centerImage" />
          {ValueChecker(data?.address?.alias, "Address Alias")}
          {ValueChecker(data?.address?.address, "Address")}
          {ValueChecker(data?.address?.addressComplement, "Address Compliment")}
          {ValueChecker(data?.address?.city, "City")}
          {ValueChecker(data?.address?.pincode, "Pincode")}
          {ValueChecker(data?.address?.country, "Country")}
          {ValueChecker(data?.address?.phone, "Phone Number")}
          {ValueChecker(data?.orderId, "OrderId")}
          {ValueChecker(data?.userId?.fullName, "Full Name")}
          {ValueChecker(data?.userId?.email, "Email Address")}
          {ValueChecker(data?.productId?.name, "Product Name")}
          {ValueChecker(data?.productPrice, "Product Price")}
          {ValueChecker(data?.quantity, "Quantity")}
          {ValueChecker(data?.total, "Total Price")}
          {ValueChecker(data?.orderStatus, "Order Status")}
          {ValueChecker(data?.paymentStatus, "Payment Status")}
          <Link to="/Orders">
            <Button variant="dark">Back</Button>
          </Link>
        </Form>
      </section>
    </section>
  );
};

export default HOC(CreateProduct);
