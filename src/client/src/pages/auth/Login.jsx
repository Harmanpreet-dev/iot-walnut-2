import React, { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { LuKeyRound } from "react-icons/lu";
import { FaRegEnvelope } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import axios from "axios";
import { notification } from "antd";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../../redux/actions/AuthActions";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/i.test(values.password)
  ) {
    errors.password = "Enter max 8 Characters";
  }

  return errors;
};

const Login = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FaRegEyeSlash />);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const dipatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    if (state.auth.islogin !== false) {
      navigate("/manage-admin");
    }
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.querySelector("html").setAttribute("data-theme", savedTheme);
  }, []);

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
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = (values) => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/loginUser`, values)
      .then((res) => {
        let user = res.data;
        if (user.data.length !== 0) {
          openNotification("success", "Login Successful");
          dipatch(
            LOGIN({
              name: user.data.name,
              email: user.data.email,
              role: user.data.role,
              image: user.data.image,
              phone: user.data.phone,
              jwt: user.token,
              status: true,
              google_secret:
                user.data.google_secret === null
                  ? ""
                  : JSON.parse(user.data.google_secret).base32,
            })
          );
          navigate("/manage-admin");
        } else {
          openNotification("error", "Invalid Username or Password");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        openNotification("error", "Invalid Username or Password");
      });
  };

  const openNotification = (type, message) => {
    api[type]({
      message,
    });
  };

  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.querySelector("html").setAttribute("data-theme", newTheme);
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={loading} fullscreen />
      <div className="loginMain">
        <div className="grid h-screen grid-cols-12">
          {/*------- Logo Side start --------*/}
          <div className="relative hidden bg-[#292929] dark:bg-[#14181c] lg:col-span-7 lg:block xl:col-span-8 2xl:col-span-8">
            <div className="absolute inset-0 flex items-center justify-center flex-col ">
              <div className="headingText mb-5">
                <h2 className="text-white text-[40px] font-bold">
                  Walnut Medical
                </h2>
                <h6 className="text-white text-[24px] font-medium text-center leading-6">
                  Tagline Goes Here
                </h6>
              </div>
              <img
                src="/images/Maskgroup.png"
                alt="Login"
                style={{ width: "50%" }}
              />
            </div>
          </div>
          {/*------- Logo Side end --------*/}

          {/*------- Form Side start --------*/}
          <div className="col-span-12  lg:col-span-5 xl:col-span-4 2xl:col-span-4">
            <div className="flex flex-col items-stretch p-8 lg:p-16 ">
              <div className="flex items-center justify-between">
                <div className="inline">
                  <img
                    alt="darkLogo"
                    loading="lazy"
                    width="72px"
                    height="20px"
                    decoding="async"
                    className="hidden dark:inline"
                    color="color:transparent"
                    srcSet="/images/WM-Logo.png 1x , /images/WM-Logo.png 2x"
                    src="/images/WM-Logo.png"
                  />
                  <img
                    alt="darkLogo"
                    loading="lazy"
                    width="72px"
                    height="20px"
                    decoding="async"
                    className="inline dark:hidden"
                    color="color:transparent"
                    srcSet="/images/WM-Logo.png 1x , /images/WM-Logo.png 2x"
                    src="/images/WM-Logo.png"
                  />
                </div>

                <label className="swap swap-rotate border rounded-[50%] p-2">
                  <input
                    type="checkbox"
                    className="theme-controller"
                    checked={theme === "dark"}
                    onChange={handleTheme}
                  />
                  {/* sun icon */}
                  <svg
                    className="swap-off fill-current w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  {/* moon icon */}
                  <svg
                    className="swap-on fill-current w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </div>

              <h3 className="mt-10 text-center text-[24px] leading-10 font-semibold lg:mt-23 light:text-black dark:text-#ffffff">
                Login
              </h3>
              <h3 className="mt-2 text-center text-sm text-base-content/70">
                Seamless Access, Secure Connection: Your Gateway to a
                Personalized Experience.
              </h3>

              {/*------- Form start ------*/}
              <div className="mt-10">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text light:text-[#1E2328] dark:white text-[16px]">
                          Email Address
                        </span>
                      </label>
                      <div className="form-control flex flex-row items-center rounded border border-base-content/20 px-3">
                        <FaRegEnvelope />
                        <input
                          placeholder="Email Address"
                          className="input w-full focus:border-none focus:outline-none input-sm focus:outline-offset-none py-2"
                          name="email"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                        />
                      </div>
                      <span className="h-[20px] mt-3 text-[12px] text-rose-600">
                        {formik.errors.email ? (
                          <div>{formik.errors.email}</div>
                        ) : null}
                      </span>
                    </div>
                    <div className="form-control mt-3">
                      <label className="label">
                        <span className="label-text light:text-[#1E2328] dark:white text-[16px]">
                          Password
                        </span>
                      </label>
                      <div className="form-control flex flex-row items-center rounded border border-base-content/20 px-3">
                        <LuKeyRound />
                        <input
                          placeholder="Password"
                          className="input w-full focus:border-none focus:outline-none input-sm focus:outline-offset-none"
                          name="password"
                          type={type}
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          autoComplete="current-password"
                        />
                        <span onClick={handleToggle}>{icon}</span>
                      </div>
                      <span className="h-[20px] mt-3 text-[12px] text-rose-600">
                        {formik.errors.password ? (
                          <div>{formik.errors.password}</div>
                        ) : null}
                      </span>
                    </div>

                    <div className="mt-10 flex items-center gap-3">
                      <input
                        id="agreement"
                        type="checkbox"
                        className="w-4 h-4 text-black-600 bg-black-100 border-gray-300 rounded focus:ring-black-500 dark:focus:ring-black-600 dark:ring-offset-black-800 focus:ring-2 dark:bg-black-700 dark:border-gray-600"
                        name="agreement"
                        required="true"
                      />
                      <label
                        htmlFor="agreement"
                        className="light:text-[#292929] dark:white"
                      >
                        I agree with{" "}
                        <span className="cursor-pointer underline">
                          <a
                            target="_blank"
                            href="https://www.walnutmedical.in/about"
                          >
                            terms and conditions
                          </a>
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="btn text-white gap-2 bg-[#292929] btn-block rounded hover:bg-black text-[15px]"
                    >
                      <TbLogout /> Login
                    </button>
                  </div>
                </form>
              </div>
              {/*------- Form end ------*/}
            </div>
          </div>
          {/*------- Form Side end --------*/}
        </div>
      </div>
    </>
  );
};

export default Login;
