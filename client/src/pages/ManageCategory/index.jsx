import React from "react";
import { FaPlus } from "react-icons/fa";
import CategoryTable from "./CategoryTable";
import CategoryAddModal from "./CategoryAddModal";

export default function ManageCategory() {
  return (
    <>
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
                <CategoryAddModal />
              </div>
            </div>
          </div>
        </div>

        <CategoryTable />
      </div>
    </>
  );
}
