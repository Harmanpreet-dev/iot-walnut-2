import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import FleetAddModal from "./FleetAddModal";
import FleetTable from "./FleetTable";
import FleetFilter from "./FleetFilter";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ManageFleets() {
  const [fleets, setFleets] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [category, setCategory] = useState([]);

  const [open, setOpen] = useState(false);

  const state = useSelector((state) => state.auth);

  useEffect(() => {
    getFleets();
    getUserCategory();
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const getFleets = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getFleets`, {
        headers: {
          Authorization: state.jwt,
        },
      })
      .then((res) => {
        setFleets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserCategory = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getUserCategory`, {
        headers: {
          Authorization: state.jwt,
        },
      })
      .then((res) => {
        setAdmin(res.data.users);
        setCategory(res.data.category);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="content-wrapper bg-base-200 h-screen">
        <div className="flex items-center justify-between">
          <div aria-label="Breadcrumbs" className="breadcrumbs p-0">
            <ul>
              <li className="text-[18px]">Fleets</li>
            </ul>
          </div>
          <div className="search-adminBox flex items-center justify-between w-32rem]">
            <div
              className="filtersSet text-[17px] font-[500] flex items-center justify-center cursor-pointer"
              onClick={showDrawer}
            >
              Filter{" "}
            </div>
            <FleetFilter drawerOpen={open} drawerClose={onClose} />
            <div className="form-control flex flex-row items-center rounded-box border border-base-content/20 px-2 mx-4 bg-base-100">
              <CiSearch className="text-[25px]" />
              <input
                className="input w-full w-40 rounded"
                placeholder="Search Fleet.."
              />
            </div>
            <div className="adminBtn flex">
              <div>
                <button
                  className="btn btn-neutral font-bold py-2 px-4 rounded-[10px] flex items-center justify-between text-[14px] mr-4"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Add Fleets <FaPlus className="pl-2 text-[24px]" />
                </button>
                <FleetAddModal
                  getFleets={getFleets}
                  admin={admin}
                  category={category}
                />
              </div>
            </div>
          </div>
        </div>

        <FleetTable fleets={fleets} admin={admin} category={category} />
      </div>
    </>
  );
}
