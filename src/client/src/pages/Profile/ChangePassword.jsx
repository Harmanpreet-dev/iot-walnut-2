import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Spin, notification } from "antd";

const validate = (values) => {
  const errors = {};

  if (!values.currentPassword) {
    errors.currentPassword = "Required";
  } else if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/i.test(values.currentPassword)
  ) {
    errors.currentPassword =
      "Password must be 8-32 characters long and include at least one uppercase letter, one lowercase letter, and one number.";
  }

  if (!values.newPassword) {
    errors.newPassword = "Required";
  } else if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/i.test(values.newPassword)
  ) {
    errors.newPassword =
      "Password must be 8-32 characters long and include at least one uppercase letter, one lowercase letter, and one number.";
  } else if (values.newPassword === values.currentPassword) {
    errors.newPassword =
      "New password must be different from the current password";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

const ChangePassword = () => {
  const [type, setType] = useState("password");
  const [error, setError] = useState("");
  const [icon, setIcon] = useState(<FaRegEyeSlash />);
  const [loading, setLoading] = useState(false);
  const state = useSelector((state) => state.auth);
  const [api, contextHolder] = notification.useNotification();

  const handleToggle = () => {
    if (type === "password") {
      setIcon(<IoEyeOutline />);
      setType("text");
    } else {
      setIcon(<FaRegEyeSlash />);
      setType("password");
    }
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = (values) => {
    setLoading(true);
    let new_values = {
      password: values.currentPassword,
      new_password: values.newPassword,
      id: state.jwt,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/changePassword`, new_values, {
        headers: {
          Authorization: state.jwt,
        },
      })
      .then((res) => {
        setLoading(false);

        setError("");
        openNotification("success", res.data.message);
      })
      .catch((err) => {
        setLoading(false);

        setError(err.response.data.error);
        console.log(err.response.data.error);
      });
  };
  const openNotification = (type, message) => {
    api[type]({
      message,
    });
  };

  return (
    <div className="content-wrapper bg-base-200">
      {contextHolder}
      <Spin spinning={loading} fullscreen />

      <div>
        <div className="flex items-center">
          <div aria-label="Breadcrumbs" className="breadcrumbs p-0 sm:inline">
            <ul>
              <li className="text-base-content/60 text-[18px]">
                <Link to="/manage-admin">Home</Link>
              </li>
              <li className="text-[18px]">My Profile</li>
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <div className="col-12 flex items-center justify-center">
            <div className="profile-group flex items-center justify-center flex-col min-w-[600px]">
              <div className="font-[500] landing-[19px] text-[29px]">
                Change Password
              </div>
              <div className="font-[500] landing-[19px] text-[16px] text-red-400">
                {error}
              </div>
              {/*------- Form start ------*/}
              <div className="mt-10 w-full">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <div className="form-control mt-3">
                      <label className="label">
                        <span className="text-[#B6B8BB] dark:white text-[17px] font-[500] landing-[19px]">
                          Current Password
                        </span>
                      </label>
                      <div className="form-control flex flex-row items-center rounded-[15px] h-14 bg-base-100 px-3 shadow">
                        <input
                          placeholder="Current Password"
                          className="input w-full focus:border-none focus:outline-none input-sm focus:outline-offset-none"
                          name="currentPassword"
                          type={type}
                          value={formik.values.currentPassword}
                          onChange={formik.handleChange}
                          autoComplete="current-password"
                        />
                        <span onClick={handleToggle}>{icon}</span>
                      </div>
                      <span className="h-[16px] mt-3 text-[12px] text-rose-600">
                        {formik.errors.currentPassword ? (
                          <div>{formik.errors.currentPassword}</div>
                        ) : null}
                      </span>
                    </div>

                    <div className="form-control mt-3">
                      <label className="label">
                        <span className="text-[#B6B8BB] dark:white text-[17px] font-[500] landing-[19px]">
                          New Password
                        </span>
                      </label>
                      <div className="form-control flex flex-row items-center rounded-[15px] h-14 bg-base-100 px-3 shadow">
                        <input
                          placeholder="New Password"
                          className="input w-full focus:border-none focus:outline-none input-sm focus:outline-offset-none"
                          name="newPassword"
                          type={type}
                          value={formik.values.newPassword}
                          onChange={formik.handleChange}
                          autoComplete="new-password"
                        />
                        <span onClick={handleToggle}>{icon}</span>
                      </div>
                      <span className="h-[16px] mt-3 text-[12px] text-rose-600">
                        {formik.errors.newPassword ? (
                          <div>{formik.errors.newPassword}</div>
                        ) : null}
                      </span>
                    </div>

                    <div className="form-control mt-3">
                      <label className="label">
                        <span className="text-[#B6B8BB] dark:white text-[17px] font-[500] landing-[19px]">
                          Re-enter New Password
                        </span>
                      </label>
                      <div className="form-control flex flex-row items-center rounded-[15px] h-14 bg-base-100 px-3 shadow">
                        <input
                          placeholder="Re-enter New Password"
                          className="input w-full focus:border-none focus:outline-none input-sm focus:outline-offset-none"
                          name="confirmPassword"
                          type={type}
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                          autoComplete="new-password"
                        />
                        <span onClick={handleToggle}>{icon}</span>
                      </div>
                      <span className="h-[16px] mt-3 text-[12px] text-rose-600">
                        {formik.errors.confirmPassword ? (
                          <div>{formik.errors.confirmPassword}</div>
                        ) : null}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="btn text-white gap-2 btn-neutral btn-block rounded-md mt-4 text-[17px] font-[500] landing-[19px]"
                    >
                      Submit
                    </button>
                  </div>
                </form>
                <div className="passlink text-center m-8">
                  <Link
                    to="/profile"
                    className="text-[#6B6B6B] dark:white text-[17px] font-[500] landing-[19px] "
                  >
                    Go To My Profile
                  </Link>
                </div>
              </div>
              {/*------- Form end ------*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
