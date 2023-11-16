/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert, Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Baseurl } from "../../../Baseurl";

const Cart = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [serviceShow, setServiceShow] = useState(false);
  const [giftShow, setGiftShow] = useState(false);
  const [adOnShow, setAdOnShow] = useState(false);
  const [frequentShow, setFrequentShow] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.React_App_Baseurl}api/v1/admin/getCart/${id}`,
        Auth
      );
      setData(data.cart);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Product Modal
  function MyVerticallyCenteredModal(props) {
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState("");

    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.React_App_Baseurl}api/v1/Product/all/paginateProductSearch`
        );
        const data = res.data.data?.docs;
        setProducts(data);
      } catch {}
    };

    useEffect(() => {
      if (props.show) {
        getProducts();
      }
    }, [props]);

    const payload = {
      quantity,
      userId: id,
    };

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${process.env.React_App_Baseurl}api/v1/admin/addtoCart/product/${productId}`,
          payload,
          Auth
        );
        toast.success(data.message);
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Products</Form.Label>
              <Form.Select
                required
                onChange={(e) => setProductId(e.target.value)}
              >
                <option>Select Your Prefrence</option>
                {products?.map((i, index) => (
                  <option key={index} value={i._id}>
                    {" "}
                    {i.name}{" "}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                required
                type="number"
                min={0}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  // Service Modal
  function ServiceModal(props) {
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.React_App_Baseurl}api/v1/Service/all/paginateServiceSearch`
        );
        const data = res.data.data?.docs;
        setProducts(data);
      } catch {}
    };

    useEffect(() => {
      if (props.show) {
        getProducts();
      }
    }, [props]);

    const payload = {
      quantity,
      userId: id,
      date,
      time,
    };

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${process.env.React_App_Baseurl}api/v1/admin/addtoCart/service/${productId}`,
          payload,
          Auth
        );
        toast.success(data.message);
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Service</Form.Label>
              <Form.Select
                required
                onChange={(e) => setProductId(e.target.value)}
              >
                <option>Select Your Prefrence</option>
                {products?.map((i, index) => (
                  <option key={index} value={i._id}>
                    {" "}
                    {i.name}{" "}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                required
                type="number"
                min={0}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                required
                type="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                required
                type="time"
                onChange={(e) => setTime(e.target.value)}
              />
            </Form.Group>

            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  // Gift Modal
  function GiftModal(props) {
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [email, setEmail] = useState("");

    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.React_App_Baseurl}api/v1/admin/GiftCards/allgiftCard`
        );
        const data = res.data.data;

        setProducts(data);
      } catch {}
    };

    useEffect(() => {
      if (props.show) {
        getProducts();
      }
    }, [props]);

    const payload = {
      quantity,
      userId: id,
      email,
    };

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${process.env.React_App_Baseurl}api/v1/admin/addtoCart/gift/${productId}`,
          payload,
          Auth
        );
        toast.success(data.message);
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Gift Card</Form.Label>
              <Form.Select
                required
                onChange={(e) => setProductId(e.target.value)}
              >
                <option>Select Your Prefrence</option>
                {products?.[0]?.priceArray.map((i, index) => (
                  <option key={index} value={i._id}>
                    {i.price}{" "}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                required
                type="number"
                min={0}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  // Ad ON Service Modal
  function AdOnModal(props) {
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState("");

    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.React_App_Baseurl}api/v1/admin/AddOnServices/allAddOnServices`
        );
        const data = res.data.data;

        setProducts(data);
      } catch {}
    };

    useEffect(() => {
      if (props.show) {
        getProducts();
      }
    }, [props]);

    const payload = {
      quantity,
      userId: id,
    };

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${process.env.React_App_Baseurl}api/v1/admin/addtoCart/addOnservices/${productId}`,
          payload,
          Auth
        );
        toast.success(data.message);
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Service</Form.Label>
              <Form.Select
                required
                onChange={(e) => setProductId(e.target.value)}
              >
                <option>Select Your Prefrence</option>
                {products?.map((i, index) => (
                  <option key={index} value={i._id}>
                    {" "}
                    {i.name}{" "}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                required
                type="number"
                min={0}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  // Frequently Bought Modal
  function FrequentlyModal(props) {
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState("");

    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.React_App_Baseurl}api/v1/FrequentlyBuyProduct`
        );
        const data = res.data.data;
        setProducts(data);
      } catch {}
    };

    useEffect(() => {
      if (props.show) {
        getProducts();
      }
    }, [props]);

    const payload = {
      quantity,
      userId: id,
    };

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${process.env.React_App_Baseurl}api/v1/admin/addtoCart/frequentlyBuyProduct/${productId}`,
          payload,
          Auth
        );
        toast.success(data.message);
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Select Bought Product</Form.Label>
              <Form.Select
                required
                onChange={(e) => setProductId(e.target.value)}
              >
                <option>Select Your Prefrence</option>
                {products?.map((i, index) => (
                  <option key={index} value={i._id}>
                    {" "}
                    {i.price}{" "}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                required
                type="number"
                min={0}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const deleteGift = async (payload) => {
    try {
      const { res } = await axios.delete(
        `${process.env.React_App_Baseurl}api/admin/cart/delete/gift/${payload}/${id}`,
        Auth
      );
      toast.success(res.msg);
      fetchData();
    } catch {}
  };

  const deleteProduct = async (payload) => {
    try {
      const { res } = await axios.delete(
        `${process.env.React_App_Baseurl}api/admin/cart/delete/product/${payload}/${id}`,
        Auth
      );
      toast.success("Removed");
      fetchData();
    } catch {}
  };

  const deleteService = async (payload) => {
    try {
      const { res } = await axios.delete(
        `${process.env.React_App_Baseurl}api/admin/cart/delete/service/${payload}/${id}`,
        Auth
      );
      toast.success("Removed");
      fetchData();
    } catch {}
  };

  const deleteFBP = async (payload) => {
    try {
      const { res } = await axios.delete(
        `${process.env.React_App_Baseurl}api/admin/cart/delete/frequentlyBuyProduct/${payload}/${id}`,
        Auth
      );
      toast.success("Removed");
      fetchData();
    } catch {}
  };

  const deleteAdOn = async (payload) => {
    try {
      const { res } = await axios.delete(
        `${process.env.React_App_Baseurl}api/admin/cart/delete/addOnservices/${payload}/${id}`,
        Auth
      );
      toast.success("Removed");
      fetchData();
    } catch {}
  };

  const checkoutHandler = async () => {
    try {
      const response = await axios.post(
        `${process.env.React_App_Baseurl}api/v1/admin/checkout/${id}`,
        {},
        Auth
      );
      if (response.data?.data?.orderId) {
        successOrder(response.data?.data?.orderId);
      }
    } catch {}
  };

  const successOrder = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.React_App_Baseurl}api/v1/admin/successOrder/${id}`,
        Auth
      );
      toast.success("Order Created");
      fetchData();
    } catch {}
  };

  const cancelOrder = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.React_App_Baseurl}api/v1/admin/cancelOrder/${id}`,
        Auth
      );
      toast.success("Error !");
      fetchData();
    } catch {}
  };

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <ServiceModal show={serviceShow} onHide={() => setServiceShow(false)} />
      <GiftModal show={giftShow} onHide={() => setGiftShow(false)} />
      <AdOnModal show={adOnShow} onHide={() => setAdOnShow(false)} />
      <FrequentlyModal
        show={frequentShow}
        onHide={() => setFrequentShow(false)}
      />

      <section className="sectionCont">
        <p className="headP">Dashboard / User Cart</p>

        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            User Cart
          </span>
          <div className="d-flex gap-2">
            <button
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider"
              onClick={() => setServiceShow(true)}
            >
              Add Service
            </button>
          </div>
        </div>

        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          ></span>
          <div className="d-flex gap-2">
            <button
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider"
              onClick={() => checkoutHandler()}
            >
              Checkout
            </button>
          </div>
        </div>

        <div className="overFlowCont">
          {data?.length === 0 || !data ? (
            <Alert>No Data Found</Alert>
          ) : (
            <>
              
              <Table>
                <thead>
                  <tr>
                    <th>Sno.</th>
                    <th>Service Name</th>
                    <th>Quantity</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.services?.map((i, index) => (
                    <tr key={index}>
                      <td> #{index + 1} </td>
                      <td> {i.serviceId?.name} </td>
                      <td> {i.quantity} </td>
                      <td>
                        <span className="flexCont">
                          <i
                            className="fa-solid fa-eye"
                            onClick={() =>
                              navigate(`/service/${i.serviceId?._id}`)
                            }
                          ></i>
                          <i
                            className="fa-sharp fa-solid fa-trash"
                            onClick={() => deleteService(i.serviceId?._id)}
                          ></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* <p className="headP mt-5">Gift Card</p>
              <Table>
                <thead>
                  <tr>
                    <th>Sno.</th>
                    <th> Gift Card </th>
                    <th>Quantity</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.gifts?.map((i, index) => (
                    <tr key={index}>
                      <td> #{index + 1} </td>
                      <td> {i.giftId?.giftId?.name} </td>
                      <td> {i.quantity} </td>

                      <td>
                        <span className="flexCont">
                          <i
                            className="fa-sharp fa-solid fa-trash"
                            onClick={() => deleteGift(i?.giftId?._id)}
                          ></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table> */}

              {/* <p className="headP mt-5">Frequently Bought Product</p>
              <Table>
                <thead>
                  <tr>
                    <th>Sno.</th>
                    <th> Product </th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.frequentlyBuyProductSchema?.map((i, index) => (
                    <tr key={index}>
                      <td> #{index + 1} </td>
                      <td>
                        {i.frequentlyBuyProductId?.products?.map(
                          (item, index) => (
                            <ul
                              key={`pr ${index}`}
                              style={{ listStyle: "disc" }}
                            >
                              <li> {item?.name}</li>
                            </ul>
                          )
                        )}
                      </td>
                      <td> {i.quantity} </td>
                      <td> ${i.frequentlyBuyProductId?.price} </td>

                      <td>
                        <span className="flexCont">
                          <i
                            className="fa-sharp fa-solid fa-trash"
                            onClick={() =>
                              deleteFBP(i?.frequentlyBuyProductId?._id)
                            }
                          ></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table> */}

              {/* <p className="headP mt-5">Ad On Service</p>
              <Table>
                <thead>
                  <tr>
                    <th>Sno.</th>
                    <th> Service Name </th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.AddOnservicesSchema?.map((i, index) => (
                    <tr key={index}>
                      <td> #{index + 1} </td>
                      <td>{i.addOnservicesId?.name}</td>
                      <td> {i.quantity} </td>
                      <td> ${i.total} </td>
                      <td>
                        <span className="flexCont">
                          <i
                            className="fa-sharp fa-solid fa-trash"
                            onClick={() => deleteAdOn(i?.addOnservicesId?._id)}
                          ></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table> */}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default HOC(Cart);
