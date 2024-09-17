import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Breadcrumb, Spin, message } from "antd";
import UserAddModal from "./UserAddModel";
import UserTable from "./UserTable";
import TwoFactAuth2 from "../../components/TwoFactAuth2/TwoFactAuth2";
import UserEditModal from "./UserEditModel";
import UserFilter from "./UserFilter";
import axiosInstance from "../../utils/axiosInstance";

const Manageuser = () => {
  const [userdetail, setUserdetail] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const state = useSelector((state) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();
  const [formValues, setFormValues] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    getuserdetail();
    getAdmins();
  }, []);

  useEffect(() => {
    filterItems();
  }, [searchQuery, userdetail]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const getAdmins = () => {
    axiosInstance
      .get(`/admins`)
      .then((res) => {
        let users = res.data;
        users.map((x) => {
          x.status = false;
        });
        setAdmin(users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterItems = () => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(userdetail);
      setError("");
    } else {
      const results = userdetail.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (results.length === 0) {
        setError("No matching data found.");
      } else {
        setError("");
      }
      setFilteredUsers(results);
    }
  };

  const getuserdetail = () => {
    axiosInstance
      .get(`/users`)
      .then((res) => {
        setUserdetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const verifyUser = (value) => {
    axiosInstance
      .post(`/email/otp`, {
        email: state.email,
      })
      .then((res) => {
        console.log(res.data);
        setFormValues(value);
        document.getElementById("my_modal_2_2").showModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleDeleteUser = (id) => {
    axiosInstance
      .delete(`/users/${id}`)
      .then((res) => {
        getuserdetail();
        messageApi.success("Admin Deleted Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handle2FA2 = (response) => {
    if (response === true) {
      handleDeleteUser(formValues);
    }
  };

  const handleActive = (id) => {
    userdetail.map((x) => {
      if (x.id === id) {
        setActiveUser(x);
      }
    });
  };

  const handleFilterDataBySider = (checked, id) => {
    let byAdmin = admin;
    byAdmin.map((x) => {
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

    admin.map((x) => {
      if (x.status === true) {
        adminFilter = true;
      }
    });

    if (adminFilter) {
      userdetail.map((x) => {
        admin.map((y) => {
          if (x.author_id === y.id) {
            if (y.status === true) {
              Arr.push(x);
            }
          }
        });
      });
      setFilteredUsers(Arr);
    } else {
      setFilteredUsers(userdetail);
    }

    setSearchQuery("");
  };

  return (
    <>
      <TwoFactAuth2 handle2FA={handle2FA2} />

      <div className="content-wrapper bg-base-200">
        <div className="flex items-center justify-between">
          <Breadcrumb
            items={[
              {
                title: "Manage User",
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
            <UserFilter
              admin={admin}
              drawerOpen={open}
              drawerClose={onClose}
              handleFilterDataBySider={handleFilterDataBySider}
            />
            <div className="form-control flex flex-row items-center rounded-box border border-base-content/20 px-2 mx-4 bg-base-100">
              <CiSearch className="text-[25px]" />
              <input
                className="input w-full w-40 rounded focus:outline-none focus:border-none focus:outline-offset-none"
                placeholder="Search Fleet.."
                value={searchQuery}
                onChange={handleInputChange}
              />
            </div>
            <div className="adminBtn flex">
              <div>
                <button
                  className="btn bg-slate-950 text-slate-50 font-bold py-2 px-4 rounded-[10px] flex items-center justify-between text-[14px] hover:bg-slate-950 hover:bg-slate-950"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Add Users <FaPlus className="pl-2 text-[24px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserAddModal
          getuserdetail={getuserdetail}
          state={state}
          admin={admin}
        />
        <UserEditModal
          activeUser={activeUser}
          getUsers={getuserdetail}
          state={state}
        />
        <UserTable
          users={filteredUsers}
          handleDeleteUser={verifyUser}
          error={error}
          handleActive={handleActive}
        />
      </div>
    </>
  );
};

export default Manageuser;
