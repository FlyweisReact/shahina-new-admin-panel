/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Link, useParams } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import axios from "axios";

const Editservice = () => {
  const { id } = useParams();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [mPrice, setMPrice] = useState(0);
  const [type, setType] = useState("");
  const [multipleSize, setMultipleSize] = useState("");
  const [sizes, setSizes] = useState("");
  const [memberPrice, setMemberPrice] = useState("");
  const [multiplePrice, setMultiplePrice] = useState("");
  const [area, setArea] = useState("");
  const [session, setSession] = useState("");
  const [benfit, setBenefit] = useState("");
  const [images, setImages] = useState([]);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [beforeAfterImage, setBeforeAfterImage] = useState("");
  const [catArr, setCatArr] = useState([]);
  const [multipleArr, setMultipleArr] = useState([]);
  const [areaArr, setAreaArr] = useState([]);
  const [sessionArr, setSessionArr] = useState([]);
  const [benifitArr, setBenifitArr] = useState([]);
  const [totalTime, setTotalTime] = useState("");
  const [data, setData] = useState({});

  const multipleObj = {
    sizes,
    multiplePrice,
    memberPrice,
  };

  const multiple_adder = () => {
    setMultipleArr((prev) => [...prev, multipleObj]);
    setSizes("");
    setMultiplePrice("");
    setMemberPrice("");
  };

  const multiple_remover = (index) => {
    setMultipleArr((prev) => prev.filter((_, i) => i !== index));
  };
  // ----------------
  const area_adder = () => {
    setAreaArr((prev) => [...prev, area]);
    setArea("");
  };

  const area_remover = (index) => {
    setAreaArr((prev) => prev.filter((_, i) => i !== index));
  };
  // -------------
  const session_adder = () => {
    setSessionArr((prev) => [...prev, session]);
    setSession("");
  };

  const session_remover = (index) => {
    setSessionArr((prev) => prev.filter((_, i) => i !== index));
  };
  // ----------
  const benefit_adder = () => {
    setBenifitArr((prev) => [...prev, benfit]);
    setBenefit("");
  };

  const benefit_remover = (index) => {
    setBenifitArr((prev) => prev.filter((_, i) => i !== index));
  };
  // ----------

  const fetchNut = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.React_App_Baseurl}api/v1/admin/Category/allCategory`
      );
      setCatArr(data?.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchNut();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fd = new FormData();
  Array.from(images).forEach((img) => {
    fd.append("image", img);
  });

  const appendIfPresent = (formData, key, value) => {
    if (value) {
      formData.append(key, value);
    }
  };
  appendIfPresent(fd, "name", name);
  appendIfPresent(fd, "categoryId", categoryId);
  appendIfPresent(fd, "description", description);
  appendIfPresent(fd, "beforeAfterImage", beforeAfterImage);
  appendIfPresent(fd, "totalTime", totalTime);
  appendIfPresent(fd, "type", type);
  if (type === "offer") {
    appendIfPresent(fd, "price", price);
    appendIfPresent(fd, "discountPrice", discountPrice);
  } else {
    appendIfPresent(fd, "multipleSize", multipleSize);
    Array.from(multipleArr).forEach((i) => {
      fd.append("memberPrice", i.memberPrice);
      fd.append("multiplePrice", i.multiplePrice);
      fd.append("sizes", i.sizes);
    });
    appendIfPresent(fd, "price", price);
    appendIfPresent(fd, "mPrice", mPrice);
  }
  Array.from(areaArr).forEach((i) => {
    fd.append("area", i);
  });
  Array.from(sessionArr).forEach((i) => {
    fd.append("session", i);
  });
  Array.from(benifitArr).forEach((i) => {
    fd.append("benfit", i);
  });

  const createProduct = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const res = await axios.put(
        `${process.env.React_App_Baseurl}api/v1/Service/editService/${id}`,
        fd,
        Auth
      );
      toast.success(res.data.message);
      setSubmitLoading(false);
      getDetail();
    } catch (e) {
      const msg = e.response.data.message;
      toast.error(msg);
      setSubmitLoading(false);
    }
  };

  // Get Service Details
  const getDetail = async () => {
    try {
      const response = await axios.get(
        `${process.env.React_App_Baseurl}api/v1/Service/${id}`
      );
      setData(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDetail();
  }, [id]);

  useEffect(() => {
    if (data) {
      setCategoryId(data?.categoryId?._id);
      setType(data?.type);
      setAreaArr(data?.area ? data?.area : []);
      setDescription(data?.description);
      setMultipleSize(data?.multipleSize === true ? "true" : "false");
      setName(data?.name);
      setTotalTime(data?.totalTime);
      setSessionArr(data?.session?.length > 0 ? data?.session : []);
      setBenifitArr(data?.benfit ? data?.benfit : []);
      setPrice(data?.price);
      setMPrice(data?.mPrice);
      if (data?.sizePrice) {
        for (const item of data?.sizePrice) {
          setMultipleArr((prev) => [
            ...prev,
            {
              sizes: item.size,
              multiplePrice: item.price,
              memberPrice: item.mPrice,
            },
          ]);
        }
      }
    }
  }, [data]);

  console.log(data);

  return (
    <section>
      <section className="sectionCont">
        <p className="headP">Dashboard / Edit Service</p>

        <Form onSubmit={createProduct}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Total Time</Form.Label>
            <Form.Control
              type="text"
              value={totalTime}
              onChange={(e) => setTotalTime(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option>Selete Your Prefrence</option>
              {catArr?.map((i, index) => (
                <option key={index} value={i._id}>
                  {" "}
                  {i?.name}{" "}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Images</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => setImages(e.target.files)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Before / After Image</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => setBeforeAfterImage(e.target.files[0])}
            />
          </Form.Group>

          <Form.Group className="mb-3 quill-container">
            <Form.Label>Description</Form.Label>
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

          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
              <option>Selete Your Prefrence</option>
              <option value="Service"> Service </option>
              <option value="offer"> Offer </option>
            </Form.Select>
          </Form.Group>

          {type === "Service" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Multiple Sizes</Form.Label>
                <Form.Select
                  value={multipleSize}
                  onChange={(e) => setMultipleSize(e.target.value)}
                >
                  <option>Selete Your Prefrence</option>
                  <option value={"true"}>Activate</option>
                  <option value={"false"}> Deactivate</option>
                </Form.Select>
              </Form.Group>
              {multipleSize === "true" && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Multiple Sizes Detail</Form.Label>
                    <Form.Control
                      type="text"
                      value={sizes}
                      placeholder="Size"
                      onChange={(e) => setSizes(e.target.value)}
                      className="mb-3"
                    />

                    <Form.Control
                      type="number"
                      min={0}
                      value={multiplePrice}
                      placeholder="Price"
                      onChange={(e) => setMultiplePrice(e.target.value)}
                      className="mb-3"
                    />

                    <Form.Control
                      type="number"
                      value={memberPrice}
                      placeholder="Member Price"
                      min={0}
                      onChange={(e) => setMemberPrice(e.target.value)}
                      className="mb-3"
                    />

                    <Button variant="dark" onClick={() => multiple_adder()}>
                      Add
                    </Button>
                  </Form.Group>

                  {multipleArr?.map((i, index) => (
                    <ul
                      className="mt-2"
                      style={{
                        border: "1px solid #000",
                        paddingTop: "10px",
                        paddingBottom: "20px",
                      }}
                    >
                      <li style={{ listStyle: "disc" }} className="mt-1">
                        {i.sizes}
                      </li>
                      <li style={{ listStyle: "disc" }} className="mt-1">
                        {i.multiplePrice}
                      </li>
                      <li style={{ listStyle: "disc" }} className="mt-1">
                        {i.memberPrice}
                      </li>
                      <li className="mt-3">
                        <Button onClick={() => multiple_remover(index)}>
                          Remove This One
                        </Button>
                      </li>
                    </ul>
                  ))}
                </>
              )}

              {multipleSize === "false" && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      min={0}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Member Price</Form.Label>
                    <Form.Control
                      type="number"
                      min={0}
                      value={mPrice}
                      onChange={(e) => setMPrice(e.target.value)}
                    />
                  </Form.Group>
                </>
              )}
            </>
          )}

          {type === "offer" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Discount Price </Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  onChange={(e) => setDiscountPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
            </>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Area Detail</Form.Label>
            <Form.Control
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="mb-3"
            />
            <Button variant="dark" onClick={() => area_adder()}>
              Add
            </Button>
          </Form.Group>

          {areaArr?.map((i, index) => (
            <ul
              className="mt-2"
              style={{
                border: "1px solid #000",
                paddingTop: "10px",
                paddingBottom: "20px",
              }}
            >
              <li style={{ listStyle: "disc" }} className="mt-1">
                {i}
              </li>
              <li className="mt-3">
                <Button onClick={() => area_remover(index)}>
                  Remove This One
                </Button>
              </li>
            </ul>
          ))}

          <Form.Group className="mb-3">
            <Form.Label>Session Detail</Form.Label>
            <Form.Control
              type="text"
              value={session}
              onChange={(e) => setSession(e.target.value)}
              className="mb-3"
            />
            <Button variant="dark" onClick={() => session_adder()}>
              Add
            </Button>
          </Form.Group>

          {sessionArr?.map((i, index) => (
            <ul
              className="mt-2"
              style={{
                border: "1px solid #000",
                paddingTop: "10px",
                paddingBottom: "20px",
              }}
            >
              <li style={{ listStyle: "disc" }} className="mt-1">
                {i}
              </li>
              <li className="mt-3">
                <Button onClick={() => session_remover(index)}>
                  Remove This One
                </Button>
              </li>
            </ul>
          ))}

          <Form.Group className="mb-3">
            <Form.Label>Benefit </Form.Label>
            <Form.Control
              type="text"
              value={benfit}
              onChange={(e) => setBenefit(e.target.value)}
              className="mb-3"
            />
            <Button variant="dark" onClick={() => benefit_adder()}>
              Add
            </Button>
          </Form.Group>

          {benifitArr?.map((i, index) => (
            <ul
              className="mt-2"
              style={{
                border: "1px solid #000",
                paddingTop: "10px",
                paddingBottom: "20px",
              }}
            >
              <li style={{ listStyle: "disc" }} className="mt-1">
                {i}
              </li>
              <li className="mt-3">
                <Button onClick={() => benefit_remover(index)}>
                  Remove This One
                </Button>
              </li>
            </ul>
          ))}

          <div className="w-100 d-flex justify-content-between">
            <Button variant="success" type="submit">
              {submitLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                "Submit"
              )}
            </Button>

            <Link to="/service">
              <Button variant="dark">Back</Button>
            </Link>
          </div>
        </Form>
      </section>
    </section>
  );
};

export default HOC(Editservice);
