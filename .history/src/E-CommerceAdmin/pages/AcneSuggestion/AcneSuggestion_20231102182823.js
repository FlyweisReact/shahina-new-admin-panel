/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert, Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import SpinnerComp from "../Component/SpinnerComp";
import { Baseurl } from "../../../Baseurl";

const AcneSuggestion = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/AcneQuizSuggession`);
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}api/v1/admin/AcneQuizSuggession/deleteAcneQuizSuggession/${id}`,
        Auth
      );
      toast.success(data.message);
      fetchData();
    } catch (e) {
      const msg = e.response.data.message;
      toast.error(msg);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");
    const [productId, setProductId] = useState("");
    const [result, setResult] = useState([]);
    const [products, setProducts] = useState([]);
    const [type, setType] = useState("");
    const [frequentlyBuyProductId, setFrequentlyProductId] = useState("");
    const [ bundeled , setBundeled ] = useState([])

    const payload = { answer1, answer2, answer3, answer4, productId };

    const getQuiz = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}api/v1/AcneQuiz`);
        setResult(data?.data);
      } catch {}
    };

    const getBundeledProduct = async () => {
      try{
        const { data } = await axios.get(`https://shahina-backend.vercel.app/api/v1/FrequentlyBuyProduct`)
        setBundeled(data.data)
      }catch{}
    }

    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          `${Baseurl}api/v1/Product/all/paginateProductSearch`
        );
        setProducts(data.data.docs);
      } catch {}
    };

    useEffect(() => {
      if (props.show) {
        getQuiz();
        getProduct();
        getBundeledProduct()
      }
    }, [props]);

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${Baseurl}api/v1/AcneQuizSuggession/addAcneQuizSuggession`,
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

    const putHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(
          `${Baseurl}api/v1/AcneQuizSuggession/updateAcneQuiz/${id}`,
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
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            {edit ? "Edit" : "Create New"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? putHandler : postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Answer 1</Form.Label>
              <Form.Select onChange={(e) => setAnswer1(e.target.value)}>
                <option>Select Your Prefrence</option>
                <option value={result?.[0]?.option1}>
                  {" "}
                  {result?.[0]?.option1}{" "}
                </option>
                <option value={result?.[0]?.option2}>
                  {" "}
                  {result?.[0]?.option2}{" "}
                </option>
                <option value={result?.[0]?.option3}>
                  {" "}
                  {result?.[0]?.option3}{" "}
                </option>
                <option value={result?.[0]?.option4}>
                  {" "}
                  {result?.[0]?.option4}{" "}
                </option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Answer 2</Form.Label>
              <Form.Select onChange={(e) => setAnswer2(e.target.value)}>
                <option>Select Your Prefrence</option>
                <option value={result?.[1]?.option1}>
                  {" "}
                  {result?.[1]?.option1}{" "}
                </option>
                <option value={result?.[1]?.option2}>
                  {" "}
                  {result?.[1]?.option2}{" "}
                </option>
                <option value={result?.[1]?.option3}>
                  {" "}
                  {result?.[1]?.option3}{" "}
                </option>
                <option value={result?.[1]?.option4}>
                  {" "}
                  {result?.[1]?.option4}{" "}
                </option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Answer 3</Form.Label>
              <Form.Select onChange={(e) => setAnswer3(e.target.value)}>
                <option>Select Your Prefrence</option>
                <option value={result?.[2]?.option1}>
                  {" "}
                  {result?.[2]?.option1}{" "}
                </option>
                <option value={result?.[2]?.option2}>
                  {" "}
                  {result?.[2]?.option2}{" "}
                </option>
                <option value={result?.[2]?.option3}>
                  {" "}
                  {result?.[2]?.option3}{" "}
                </option>
                <option value={result?.[2]?.option4}>
                  {" "}
                  {result?.[2]?.option4}{" "}
                </option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Answer 4</Form.Label>
              <Form.Select onChange={(e) => setAnswer4(e.target.value)}>
                <option>Select Your Prefrence</option>
                <option value={result?.[3]?.option1}>
                  {" "}
                  {result?.[3]?.option1}{" "}
                </option>
                <option value={result?.[3]?.option2}>
                  {" "}
                  {result?.[3]?.option2}{" "}
                </option>
                <option value={result?.[3]?.option3}>
                  {" "}
                  {result?.[3]?.option3}{" "}
                </option>
                <option value={result?.[3]?.option4}>
                  {" "}
                  {result?.[3]?.option4}{" "}
                </option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <input
                type="radio"
                id="html"
                name="fav_language"
                value="HTML"
                style={{ marginRight: "10px" }}
                onClick={() => setType("Bundeled")}
              />
              <label for="html" style={{ marginRight: "10px" }}>
                Bundled Product
              </label>
              <input
                type="radio"
                id="css"
                name="fav_language"
                value="CSS"
                style={{ marginRight: "10px" }}
                onClick={() => setType("Single")}
              />
              <label for="css">Single Product</label>
            </Form.Group>

            {type === "Single" && (
              <Form.Group className="mb-3">
                <Form.Label>Product</Form.Label>
                <Form.Select onChange={(e) => setProductId(e.target.value)}>
                  <option>Select Your Prefrence</option>
                  {products?.map((i, index) => (
                    <option value={i._id} key={index}>
                      {" "}
                      {i.name}{" "}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

            {type === "Bundeled" && (
              <Form.Group className="mb-3">
                <Form.Label>Bundled Product</Form.Label>
                <Form.Select onChange={(e) => setProductId(e.target.value)}>
                  <option>Select Your Prefrence</option>
                  {products?.map((i, index) => (
                    <option value={i._id} key={index}>
                      {" "}
                      {i.name}{" "}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

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
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            Acne Quiz Suggestion
          </span>
          <div className="d-flex gap-1">
            <button
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
              onClick={() => {
                setEdit(false);
                setModalShow(true);
              }}
            >
              Create New
            </button>
          </div>
        </div>

        {data?.length === 0 || !data ? (
          <SpinnerComp />
        ) : (
          <>
            <div className="overFlowCont">
              {data?.docs?.length === 0 || !data ? (
                <Alert>No Product Found</Alert>
              ) : (
                <Table>
                  <thead>
                    <tr>
                      <th>Sno.</th>
                      <th>Answer 1</th>
                      <th>Answer 2</th>
                      <th>Answer 3</th>
                      <th>Answer 4</th>
                      <th>Product</th>

                      <th>Created At </th>
                      <th> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td> #{index + 1} </td>
                        <td> {i.answer1} </td>
                        <td> {i.answer2} </td>
                        <td> {i.answer3} </td>
                        <td> {i.answer4} </td>
                        <td> {i.productId} </td>
                        <td> {i.createdAt?.slice(0, 10)} </td>
                        <td>
                          <span className="flexCont">
                            <i
                              className="fa-solid fa-pen-to-square"
                              onClick={() => {
                                setId(i._id);
                                setEdit(true);
                                setModalShow(true);
                              }}
                            />

                            <i
                              className="fa-sharp fa-solid fa-trash"
                              onClick={() => deleteHandler(i._id)}
                            ></i>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default HOC(AcneSuggestion);
