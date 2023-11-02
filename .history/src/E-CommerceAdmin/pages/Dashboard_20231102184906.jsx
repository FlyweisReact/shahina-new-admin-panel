/** @format */

import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import HOC from "../layout/HOC";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Baseurl } from "../../Baseurl";

const Dashboard = () => {
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [galleryCount, setGalleryCount] = useState(0);
  const [newsCount, setNewsCount] = useState(0);

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}api/v1/Product/all/paginateProductSearch`
      );
      setProductCount(data.data.total);
    } catch {}
  };

  const fetchService = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}api/v1/Service/all/paginateServiceSearch`
      );
      setServiceCount(data.data.total);
    } catch {}
  };

  const fetchGallary = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/Gallary/getGallary`);
      setGalleryCount(data.data?.length);
    } catch {}
  };

  const fetchNews = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/News/getNews`);
      console.log(data.data?.length);
    } catch {}
  };

  useEffect(() => {
    fetchProduct();
    fetchService();
    fetchGallary();
    fetchNews();
  }, []);

  const card = [
    {
      progress: "bg-green-400",
      title: "All Product",
      number: productCount,
      icon: (
        <i className="fa-solid fa-cart-shopping text-2xl text-[#3c335d]"></i>
      ),
      bg: "#3c335d",
      link: "/Product",
    },
    {
      progress: "bg-green-400",
      title: "All Service",
      number: serviceCount,
      icon: (
        <i className="fa-solid fa-cart-shopping text-2xl text-[#3c335d]"></i>
      ),
      bg: "#3c335d",
      link: "/Product",
    },
    {
      progress: "bg-green-400",
      title: "All Gallery",
      number: galleryCount,
      icon: (
        <i className="fa-solid fa-cart-shopping text-2xl text-[#3c335d]"></i>
      ),
      bg: "#3c335d",
      link: "/Product",
    },
  ];
  return (
    <>
      <section className="grid md:grid-cols-4 grid-cols-2 gap-y-6 gap-x-4">
        {card.map((card, index) => {
          return (
            <div
              className="px-5 py-8 bg-slate-200 space-y-2 shadow-xl flex flex-col  rounded-md cardDiv"
              key={index}
              style={{
                backgroundColor: `${card.bg}`,
                textTransform: "uppercase",
              }}
              onClick={() => navigate(`${card.link}`)}
            >
              <div className="grid  justify-between grid-cols-4">
                <div className="flex flex-col col-span-3 space-y-1">
                  <span
                    className="tracking-widest text-gray-900"
                    style={{ color: "#fff" }}
                  >
                    {card.title}
                  </span>
                  <span
                    className="tracking-wider text-gray-700 text-xl md:text-2xl font-semibold"
                    style={{ color: "#fff" }}
                  >
                    {card.number}
                  </span>
                </div>
                <div className="flex rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white justify-center items-center iCOn">
                  {card.icon}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default HOC(Dashboard);
