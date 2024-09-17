import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import CategoryTable from "./CategoryTable";
import CategoryAddModal from "./CategoryAddModal";
import { Breadcrumb, Spin } from "antd";
import axiosInstance from "../../utils/axiosInstance";

export default function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const state = useSelector((state) => state.auth);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    axiosInstance
      .get(`/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="content-wrapper bg-base-200">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            {
              title: "Categories",
            },
          ]}
        />
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
  );
}
