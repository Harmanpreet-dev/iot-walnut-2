import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import FleetAddModal from "./FleetAddModal";
import FleetTable from "./FleetTable";
import FleetFilter from "./FleetFilter";
import { useSelector } from "react-redux";
import { Breadcrumb } from "antd";
import axiosInstance from "../../utils/axiosInstance";

export default function ManageFleets() {
  const [fleets, setFleets] = useState([]);
  const [filteredFleets, setFilteredFleets] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const { role, id } = useSelector((state) => state.auth);

  useEffect(() => {
    if (role === "0") {
      getFleets();
    } else {
      getFeelByAdmin();
    }
    getUserCategories();
  }, []);

  useEffect(() => {
    filterItems();
  }, [searchQuery, fleets]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterItems = () => {
    if (searchQuery.trim() === "") {
      setFilteredFleets(fleets);
      setError("");
    } else {
      const results = fleets.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (results.length === 0) {
        setError("No matching data found.");
      } else {
        setError("");
      }
      setFilteredFleets(results);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const getFleets = () => {
    axiosInstance
      .get(`/fleets`)
      .then((res) => {
        setFleets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFeelByAdmin = () => {
    axiosInstance
      .get(`/fleets/${id}`)
      .then((res) => {
        setFleets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserCategories = () => {
    axiosInstance
      .get(`/fleets/users-categories`)
      .then((res) => {
        let { users, categories } = res.data;
        users?.map((x) => {
          x.status = false;
        });
        setAdmin(users);
        setCategories(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilterDataBySider = (checked, id) => {
    let byAdmin = admin;
    byAdmin?.map((x) => {
      if (x.id === id) {
        x.status = checked;
      }
    });
    setAdmin(byAdmin);
    filterBySider();
  };

  const filterBySider = () => {
    let Arr = [];
    let adminFilter = false;
    admin?.map((x) => {
      if (x.status === true) {
        adminFilter = true;
      }
    });

    if (adminFilter) {
      fleets?.map((x) => {
        admin?.map((y) => {
          if (x.admin === y.id) {
            if (y.status === true) {
              Arr.push(x);
            }
          }
        });
      });
      setFilteredFleets(Arr);
    } else {
      setFilteredFleets(fleets);
    }
    setSearchQuery("");
  };

  return (
    <div className="content-wrapper bg-base-200">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            {
              title: "Fleets",
            },
          ]}
        />
        <div className="search-adminBox flex items-center justify-between w-32rem]">
          <div
            className="filtersSet text-[17px] font-[500] flex items-center justify-center cursor-pointer"
            onClick={showDrawer}
          >
            Filter
          </div>
          <FleetFilter
            admin={admin}
            drawerOpen={open}
            drawerClose={onClose}
            handleFilterDataBySider={handleFilterDataBySider}
          />
          <div className="form-control flex flex-row items-center rounded-box border border-base-content/20 px-2 mx-4 bg-base-100">
            <CiSearch className="text-[25px] cursor-pointer" />
            <input
              className="input w-full w-40 rounded focus:outline-none focus:border-none focus:outline-offset-none"
              placeholder="Search Fleet.."
              value={searchQuery}
              onChange={handleInputChange}
            />
          </div>
          <div className="adminBtn flex">
            <div>
              {role === "0" ? (
                <>
                  <button
                    className="btn btn-neutral font-bold py-2 px-4 rounded-[10px] flex items-center justify-between text-[14px] mr-4"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Add Fleets <FaPlus className="pl-2 text-[24px]" />
                  </button>
                </>
              ) : null}
              <FleetAddModal
                getFleets={getFleets}
                admin={admin}
                category={categories}
              />
            </div>
          </div>
        </div>
      </div>

      <FleetTable
        role={role}
        error={error}
        fleets={filteredFleets}
        admin={admin}
        categories={categories}
      />
    </div>
  );
}
