/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UserData = () => {
  const { id } = useParams();
  const token = localStorage.getItem("AdminToken");
  const [user, setUser] = useState([]);

  const getUser = async () => {
    const url = `https://krish-vapes-backend.vercel.app/api/v1/admin/viewUser/${id}`;
    try {
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data.data);
      setUser(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUser();
  }, []);


  console.log(user , "All User")

  const handleApproveReject = async (status) => {
    const url = `https://krish-vapes-backend.vercel.app/api/v1/admin/approveRejectUser/${id}`;
    try {
      const { data } = await axios.put(
        url,
        {
          status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("User Approved");
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className="sectionCont">
        <div className="ud1">
          {/* <div className="ud2">
            <div className="ud3">Full Name</div>
            <div className="ud4">
              {user?.courtesyTitle} {user?.fullName}
            </div>
          </div>
          <div className="ud2">
            <div className="ud3">Email</div>
            <div className="ud4">{user?.email}</div>
          </div>
          <div className="ud2">
            <div className="ud3">DOB</div>
            <div className="ud4">{user?.dob}</div>
          </div>
          <div className="ud2">
            <div className="ud3">Mobile No.</div>
            <div className="ud4">{user?.phone}</div>
          </div>
          <div className="ud2">
            <div className="ud3">Company</div>
            <div className="ud4">{user?.company}</div>
          </div>
          <div className="ud2">
            <div className="ud3">Country</div>
            <div className="ud4">{user?.country}</div>
          </div>
          <div className="ud2">
            <div className="ud3">VAT Available</div>
            <div className="ud4">{user?.vatUsed === true ? "Yes" : "No"}</div>
          </div>
          {user?.vatUsed === true ? (
            <div className="ud2">
              <div className="ud3">VAT Number</div>
              <div className="ud4">{user?.vatNumber}</div>
            </div>
          ) : (
            ""
          )}
          <div className="ud2">
            <div className="ud3">Status</div>
            <div className="ud4">{user?.status}</div>
          </div> */}
          {/* {user?.status === "Pending" ? (
            <> */}
              <div className="ud2">
                <div className="ud3">
                  <button onClick={() => handleApproveReject("Approved")}>
                    Approve
                  </button>
                </div>
                <div className="ud4">
                  <button onClick={() => handleApproveReject("Reject")}>
                    Reject
                  </button>
                </div>
              </div>
            {/* </>
          ) : (
            ""
          )} */}
        </div>
      </section>
    </>
  );
};

export default HOC(UserData);
