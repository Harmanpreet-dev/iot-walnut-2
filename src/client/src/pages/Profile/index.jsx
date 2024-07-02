import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { UPDATE_PROFILE } from "../../redux/actions/AuthActions";
import TwoFactAuth from "../../components/TwoFactAuth/TwoFactAuth";
import { Spin } from "antd";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  } else if (!/^[0-9a-zA-Z].*/i.test(values.name)) {
    errors.name = "Invalid username";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phone) {
    errors.phone = "Required";
  } else if (
    !/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/i.test(
      values.phone
    )
  ) {
    errors.phone = "Enter max 8 Characters";
  }

  return errors;
};

export default function Profile() {
  const state = useSelector((state) => state.auth);
  const [emailError, setEmailError] = useState("");
  const [formValues, setFormValues] = useState();
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: state.name,
      email: state.email,
      phone: state.phone,
    },
    validate,
    onSubmit: (values) => {
      verifyUser(values);
    },
  });

  const verifyUser = (value) => {
    setLoading(true);
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
        setLoading(false);

        console.log(res.data);
        setFormValues(value);
        document.getElementById("my_modal_2").showModal();
      })
      .catch((err) => {
        if (err.response.data.error === "Email already exists") {
          setEmailError(err.response.data.error);
        }
      });
  };

  const handle2FA = (response) => {
    if (response === true) {
      handleFormSubmit(formValues);
    }
  };

  const handleFormSubmit = (values) => {
    setEmailError("");

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("token", state.jwt);

    axios
      .post(`${process.env.REACT_APP_API_URL}/updateProfile`, formData, {
        headers: {
          Authorization: state.jwt,
        },
      })
      .then((res) => {
        dispatch(UPDATE_PROFILE(res.data));
      })
      .catch((err) => {
        if (err.response.data.error === "Email already exists") {
          setEmailError(err.response.data.error);
        }
      });
  };

  return (
    <div>
      <Spin spinning={loading} fullscreen />

      <TwoFactAuth handle2FA={handle2FA} />
      <div className="content-wrapper bg-base-200">
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
                <div className="profile-image">
                  <img
                    src={`${process.env.REACT_APP_PROFILE_URL}/profile/${state.image}`}
                    alt="profile-avtar"
                    className="w-32 h-32 border border-1 border-current rounded-full"
                  />
                </div>

                <div className="mt-10 w-full">
                  <form onSubmit={formik.handleSubmit}>
                    <div>
                      <div className="form-control">
                        <label className="label">
                          <span className="text-[#B6B8BB] dark:white text-[17px] font-[500] landing-[19px]">
                            Full Name
                          </span>
                        </label>
                        <div className="form-control flex flex-row items-center rounded-[15px] h-14 bg-base-100 px-3 shadow">
                          <input
                            type="text"
                            className="input w-full focus:border-none focus:outline-none input-sm focus:outline-offset-none"
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                          />
                        </div>
                        <span className="h-[2px] mt-2 text-rose-600 text-[12px]">
                          {formik.errors.name ? (
                            <div>{formik.errors.name}</div>
                          ) : null}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="form-control mt-3 w-1/2 mr-4">
                          <label className="label">
                            <span className="text-[#B6B8BB] text-[17px] font-[500] landing-[19px]">
                              Email
                            </span>
                          </label>
                          <div className="form-control flex flex-row items-center rounded-[15px] h-14 bg-base-100 px-3 shadow">
                            <input
                              className="input w-full focus:border-none focus:outline-none input-sm focus:outline-offset-none"
                              name="email"
                              type="email"
                              onChange={formik.handleChange}
                              value={formik.values.email}
                            />
                          </div>
                          <span className="h-[2px] mt-2 text-rose-600 text-[12px]">
                            {formik.errors.email ? (
                              <div>{formik.errors.email}</div>
                            ) : null}
                            {emailError !== "" ? <div>{emailError}</div> : null}
                          </span>
                        </div>

                        <div className="form-control mt-3 w-1/2 ml-4">
                          <label className="label">
                            <span className="text-[#B6B8BB] text-[17px] font-[500] landing-[19px]">
                              Phone
                            </span>
                          </label>
                          <div className="form-control flex flex-row items-center rounded-[15px] h-14 bg-base-100 px-3 shadow">
                            <input
                              className="input w-full focus:border-none focus:outline-none input-sm focus:outline-offset-none"
                              id="phone"
                              name="phone"
                              type="tel"
                              size="20"
                              minlength="9"
                              maxlength="14"
                              onChange={formik.handleChange}
                              value={formik.values.phone}
                            />
                          </div>

                          <span className="h-[2px] mt-3 text-rose-600 text-[12px]">
                            {formik.errors.phone ? (
                              <div>{formik.errors.phone}</div>
                            ) : null}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        type="submit"
                        className="btn text-white gap-2 btn-neutral btn-block rounded text-[17px] font-[500] landing-[19px]"
                      >
                        Edit
                      </button>
                    </div>
                  </form>
                  <div className="passlink text-center m-8">
                    <Link
                      to="/change-password"
                      className="text-[#6B6B6B] dark:white text-[17px] font-[500] landing-[19px] "
                    >
                      Change Password
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
