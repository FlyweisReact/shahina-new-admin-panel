/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Banner = () => {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        "https://shahina-backend.vercel.app/api/v1/Banner/getAllBanner"
      );
      setData(data?.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const handleDelete = async (ide) => {
    const url = `https://shahina-backend.vercel.app/api/v1/Gallary/${ide}`;
    try {
      const { data } = await axios.delete(url, Auth);
      toast.success(data.message);
      fetchHandler();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <section>
        <section className="sectionCont">
          <div className="pb-4   w-full flex justify-between items-center">
            <span
              className="tracking-widest text-slate-900 font-semibold uppercase"
              style={{ fontSize: "1.5rem" }}
            >
              All Banners ({data?.length})
            </span>
            <div className="d-flex gap-2">
              <Link to="/create-home-banner">
                <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider">
                  HomePage Banner
                </button>
              </Link>
              <Link to="/create-home-banner">
                <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider">
                  Partner Banner
                </button>
              </Link>
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
                      <th>Title</th>
                      <th>Type</th>
                      <th>Created At</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td>{i.title} </td>
                        <td>{i.type} </td>
                        <td>{i.createdAt?.slice(0, 10)} </td>
                        <td>
                          <span className="flexCont">
                            <i
                              className="fa-solid fa-trash"
                              onClick={() => handleDelete(i._id)}
                            />
                            <Link to={`/banner/${i._id}`}>
                              <i className="fa-solid fa-eye" />
                            </Link>
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

export default HOC(Banner);
