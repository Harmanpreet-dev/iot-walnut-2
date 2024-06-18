import React, { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { SiTicktick } from "react-icons/si";

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "Required";
  } else if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/i.test(values.password)
  ) {
    errors.password = "Enter max 8 Characters";
  }

  return errors;
};

const ChangePassword = () => {
  // const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FaRegEyeSlash />);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [themeIcon, setThemeIcon] = useState(theme === "dark" ? "sun" : "moon");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    setThemeIcon(savedTheme === "dark" ? "sun" : "moon");
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
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setThemeIcon(newTheme === "dark" ? "sun" : "moon");
    localStorage.setItem("theme", newTheme);
    document.querySelector("html").setAttribute("data-theme", newTheme);
  };

  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box py-16 px-12">
          <h3 className="font-bold text-center text-[29px] font-[500] text-[#1E2328] landing-[19px]">
            OTP Vertification
          </h3>
          <p className="py-1 text-center text-[14px] font-[500] text-[#898B8F] landing-[19px] w-80 m-auto">
            Enter OTP sent to Mobile Number ends with 4752
          </p>
          <div className="modal-action flex items-center justify-center max-h-96">
            <form
              method="dialog"
              className="flex items-center justify-center flex-col"
            >
              <div className="sets mb-8">
                <input
                  type="text"
                  value="5"
                  className="mx-2 bg-[#F6F6F6] border border-[#EAEAEA] text-center rounded-[12px] text-[55px] font-[500]"
                  style={{ width: "50px", height: "66px" }}
                />
                <input
                  type="text"
                  value="0"
                  className="mx-2 bg-[#F6F6F6] border border-[#EAEAEA] text-center rounded-[12px] text-[55px] font-[500]"
                  style={{ width: "50px", height: "66px" }}
                />
                <input
                  type="text"
                  value="3"
                  className="mx-2 bg-[#F6F6F6] border border-[#EAEAEA] text-center rounded-[12px] text-[55px] font-[500]"
                  style={{ width: "50px", height: "66px" }}
                />
                <input
                  type="text"
                  value="1"
                  className="mx-2 bg-[#F6F6F6] border border-[#EAEAEA] text-center rounded-[12px] text-[55px] font-[500]"
                  style={{ width: "50px", height: "66px" }}
                />
                <input
                  type="text"
                  value="8"
                  className="mx-2 bg-[#F6F6F6] border border-[#EAEAEA] text-center rounded-[12px] text-[55px] font-[500]"
                  style={{ width: "50px", height: "66px" }}
                />
                <input
                  type="text"
                  value="3"
                  className="mx-2 bg-[#F6F6F6] border border-[#EAEAEA] text-center rounded-[12px] text-[55px] font-[500]"
                  style={{ width: "50px", height: "66px" }}
                />
              </div>
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-[#000] w-full text-[#fff] text-[17px] font-[500] hover:text-[#000] hover:bg-[#fff]">
                Submit
              </button>
              <span className="countdown mt-4 text-[#000] text-[16px] landing-[19px] font-[500]">
                <span style={{ "--value": 0 }}></span>:
                <span style={{ "--value": 0 }}></span>
              </span>

              <div className="mt-3">
                <h3 className="text-[#8C8C8C] ml-2 font-[500] text-[16px] landing-[19px]">
                  Didn’t Received OTP?{" "}
                  <span className="text-[#000] ml-2 font-[500] text-[16px] landing-[19px]">
                    Resend
                  </span>
                </h3>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box py-16 px-12 bg-[#30BF89]">
          <div className="text-[#fff]  text-[90px] flex items-center justify-center">
            <SiTicktick />
          </div>
          <h3 className="font-bold text-center text-[27px] font-[700] text-[#fff] landing-[27px] mt-8">
            Success
          </h3>
          <p className="py-1 text-center text-[14px] font-[500] text-[#fff] landing-[10px] w-40 m-auto">
            Password Changed Successfully
          </p>
          <div className="modal-action flex items-center justify-center max-h-96"></div>
        </div>
      </dialog>

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
                <div className="font-[500] landing-[19px] text-[29px]">
                  Change Password
                </div>
                {/*------- Form start ------*/}
                <div className="mt-10 w-full">
                  <form>
                    <div>
                      <div className="form-control mt-3">
                        <label className="label">
                          <span className="text-[#B6B8BB] dark:white text-[17px] font-[500] landing-[19px]">
                            Password
                          </span>
                        </label>
                        <div className="form-control flex flex-row items-center rounded-[15px] h-14 bg-base-100 px-3 shadow">
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
                        <span className="h-[16px] mt-3 text-[12px] text-rose-600">
                          {formik.errors.password ? (
                            <div>{formik.errors.password}</div>
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
                            name="password"
                            type="password"
                          />
                          <span onClick={handleToggle}>{icon}</span>
                        </div>
                        <span className="h-[16px] mt-3 text-[12px] text-rose-600">
                          {formik.errors.password ? (
                            <div>{formik.errors.password}</div>
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
                            name="password"
                            type="password"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        type="submit"
                        className="btn text-white gap-2 btn-neutral btn-block rounded-md mt-4 text-[17px] font-[500] landing-[19px]"
                        onClick={() =>
                          document.getElementById("my_modal_1").showModal()
                        }
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
    </>
  );
};

export default ChangePassword;
