/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";

const Frequently = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.React_App_Baseurl}api/v1/FrequentlyBuyProduct`
      );
      const res = data?.data;
      if (Array.isArray(res)) {
        setData(res);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const handleDelete = async (ide) => {
    const url = `${process.env.React_App_Baseurl}api/v1/admin/FrequentlyBuyProduct/deleteFrequentlyBuyProduct/${ide}`;
    try {
      const { data } = await axios.delete(url, Auth);
      toast.success(data.message);
      fetchHandler();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [price, setPrice] = useState(0);
    const [products, setProducts] = useState([]);
    const [arr, setArr] = useState([]);
    

    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.React_App_Baseurl}api/v1/Product/all/paginateProductSearch`
        );
        const data = res?.data?.data?.docs;
        setArr(data);
      } catch {}
    };

    useEffect(() => {
      if (props.show) {
        fetchProducts();
      }
    }, [props]);

    console.log(arr)

    const payload = { price, products };

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${process.env.React_App_Baseurl}api/v1/FrequentlyBuyProduct/addFrequentlyBuyProduct`,
          payload,
          Auth
        );
        toast.success(data.message);
        props.onHide();
        fetchHandler();
      } catch (e) {
        console.log(e);
      }
    };

    const handleChange = (e) => {
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setProducts(selectedOptions);
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
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                min={0}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product</Form.Label>
              <Form.Select
                multiple
                onChange={(e) => handleChange(e)}
                style={{ height: "300px" }}
              >
                <option>Select Your Prefrence</option>
                {arr?.map((i, index) => (
                  <option key={`Product ${index}`} value={i._id}>
                    {" "}
                    {i.name}{" "}
                  </option>
                ))}
              </Form.Select>

              <Select
                isMulti
                options={arr?.map((i) => ({
                  value: i._id,
                  label: i.name,
                }))}
                placeholder="Select products"
                value={nutritionId}
              onChange={(e) => setNutritionId(e)}
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

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section>
        <section className="sectionCont">
          <div className="pb-4   w-full flex justify-between items-center">
            <span
              className="tracking-widest text-slate-900 font-semibold uppercase"
              style={{ fontSize: "1.5rem" }}
            >
              Bundled Products ({data?.length})
            </span>
            <div className="d-flex gap-2 flex-wrap">
              <button
                className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider"
                onClick={() => setModalShow(true)}
              >
                Create New
              </button>
            </div>
          </div>

          {data?.length === 0 || !data ? (
            <Alert>Banner Not Found</Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Created At</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td>
                          {i.products?.map((item) => (
                            <ul style={{ listStyle: "disc" }} key={item?._id}>
                              <li> {item?.name} </li>
                            </ul>
                          ))}{" "}
                        </td>
                        <td>{i.price} </td>
                        <td>{i.createdAt?.slice(0, 10)} </td>
                        <td>
                          <span className="flexCont">
                            <i
                              className="fa-solid fa-trash"
                              onClick={() => handleDelete(i._id)}
                            />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(Frequently);
