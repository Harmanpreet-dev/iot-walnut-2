import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import AdminTable from "./AdminTable";
import AdminAddModal from "./AdminAddModal";
import TwoFactAuth from "../../components/TwoFactAuth/TwoFactAuth";

export default function ManageAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const state = useSelector((state) => state.auth);
  const [formValues, setFormValues] = useState();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getAdmins`, {
        headers: {
          Authorization: state.jwt,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteAdmin = (id) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/deleteAdmin`,
        { id },
        {
          headers: {
            Authorization: state.jwt,
          },
        }
      )
      .then((res) => {
        console.log(res);
        getUsers();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const verifyUser = (value) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/sendEmailOTP`,
        {
          email: state.email,
        },
        {
          headers: {
            Authorization: state.jwt,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setFormValues(value);
        document.getElementById("my_modal_2").showModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handle2FA = (response) => {
  //   if (response === true) {
  //     handleDeleteAdmin(formValues);
  //   }
  // };

  return (
    <>
      {/* <TwoFactAuth handle2FA={handle2FA} /> */}
      <Spin spinning={loading} fullscreen />
      <div className="content-wrapper bg-base-200">
        <div className="flex items-center justify-between">
          <div aria-label="Breadcrumbs" className="breadcrumbs p-0">
            <ul>
              <li className="text-[18px]">Manage Admin</li>
            </ul>
          </div>
          <div className="search-adminBox flex items-center justify-between w-96">
            <div className="searchBtn text-[22px] cursor-pointer">
              <CiSearch />{" "}
            </div>
            <div className="dropMenu">
              <select className="select select-bordered w-full max-w-xs rounded-[10px] focus:outline-none">
                <option disabled selected>
                  View By Category
                </option>
                <option>Han Solo</option>
                <option>Greedo</option>
              </select>
            </div>
            <div className="adminBtn">
              <button
                className="btn btn-neutral font-bold py-2 px-4 rounded-[10px] flex items-center justify-between text-[14px]"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Add Admin <FaPlus className="pl-1 text-[18px]" />
              </button>
            </div>
          </div>
        </div>
        <AdminAddModal getUsers={getUsers} state={state} />

        <AdminTable users={users} handleDeleteAdmin={verifyUser} />
      </div>
    </>
  );
}
