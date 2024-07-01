import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import CategoryTable from "./CategoryTable";
import CategoryAddModal from "./CategoryAddModal";
import { Spin } from "antd";

export default function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const state = useSelector((state) => state.auth);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/getCategories`, {
        headers: {
          Authorization: state.jwt,
        },
      })
      .then((res) => {
        setLoading(false);

        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Spin spinning={loading} fullscreen />
      <div className="content-wrapper bg-base-200 h-screen">
        <div className="flex items-center justify-between">
          <div aria-label="Breadcrumbs" className="breadcrumbs p-0">
            <ul>
              <li className="text-[18px]">Categories</li>
            </ul>
          </div>
          <div className="search-adminBox flex items-center justify-between">
            <div className="adminBtn flex">
              <div>
                <button
                  className="btn btn-neutral font-bold py-2 px-4 rounded-[10px] flex items-center justify-between text-[14px] mr-4"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  Add Category <FaPlus className="pl-1 text-[18px]" />
                </button>
                <CategoryAddModal getCategory={getCategory} state={state} />
              </div>
            </div>
          </div>
        </div>

        <CategoryTable categories={categories} />
      </div>
    </>
  );
}
