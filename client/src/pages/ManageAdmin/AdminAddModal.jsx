import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { IoEyeOutline } from "react-icons/io5";
import TwoFactAuth from "../../components/TwoFactAuth/TwoFactAuth";

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

  if (!values.password) {
    errors.password = "Required";
  } else if (values.length < 8) {
    errors.password = "*Password must be 8 characters long.";
  } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/i.test(values.password)) {
    errors.password = "*Invaild Password";
  }
  return errors;
};

export default function AdminAddModal({ getUsers, state }) {
  const uploadRef = useRef();
  const [imageSrc, setImageSrc] = useState("./images/default.jpeg");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FaRegEyeSlash />);
  const [emailError, setEmailError] = useState("");
  const [formValues, setFormValues] = useState();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      image: "",
    },
    validate,
    onSubmit: (values) => {
      checkEmail(values);
    },
  });

  const checkEmail = (values) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/checkEmail`,
        { email: values.email },
        {
          headers: {
            Authorization: state.jwt,
          },
        }
      )
      .then((res) => {
        if (res.data === true) {
          setEmailError("");
          verifyUser(values);
        }
      })
      .catch((err) => {
        if (err.response.data.error === "Email already exists") {
          setEmailError(err.response.data.error);
        }
      });
  };

  const verifyUser = (value) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/sendEmailOTP`, {
        headers: {
          Authorization: state.jwt,
        },
      })
      .then((res) => {
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

  const handleUploadPhoto = () => {
    uploadRef.current.click();
  };

  const handleFormSubmit = (values) => {
    // setLoading(true);
    setEmailError("");

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("password", values.password);
    formData.append("role", values.role);
    if (values.image && values.image.length > 0) {
      console.log(values.image[0]);
      formData.append("image", values.image[0]); // Assuming single file upload. For multiple, loop through the array
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/addAdmin`, formData, {
        headers: {
          Authorization: state.jwt,
        },
      })
      .then((res) => {
        getUsers();
        document.getElementById("my_modal_3").close();
      })
      .catch((err) => {
        if (err.response.data.error === "Email already exists") {
          setEmailError(err.response.data.error);
        }
      });
  };

  const handleFileSelect = (event) => {
    if (event.target.value !== "") {
      const files = event.target.files;
      let myFiles = Array.from(files);

      const reader = new FileReader();

      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };

      reader.readAsDataURL(files[0]);

      formik.setFieldValue("image", myFiles);
    }
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(<IoEyeOutline />);
      setType("text");
    } else {
      setIcon(<FaRegEyeSlash />);
      setType("password");
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <TwoFactAuth handle2FA={handle2FA} />
      <div className="modal-box bg-base-200 max-w-[50rem] h-full">
        <form method="dialog">
          <button className="btn text-[20px] btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="flex items-center justify-center flex-col">
          <div
            className="profile-image cursor-pointer"
            onClick={() => handleUploadPhoto()}
          >
            <img
              src={imageSrc}
              alt="profile-avtar"
              className="w-24 h-24 border border-1 border-current rounded-full object-cover"
            />
            <div className="tex-[15px] font-[700] landing-[15px] text-center mt-2">
              {" "}
              Add Photo
            </div>
          </div>

          <div className="mt-3 w-3/4">
            <form onSubmit={formik.handleSubmit}>
              <input
                style={{ display: "none" }}
                type="file"
                name="image"
                ref={uploadRef}
                className="file-input w-full max-w-xs"
                onChange={(event) => handleFileSelect(event)}
              />
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-[#B6B8BB] dark:white text-[17px] font-[500] landing-[19px]">
                      Full Name
                    </span>
                  </label>
                  <div className="form-control flex flex-row items-center rounded-[15px] h-12 bg-base-100 px-3 shadow">
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
                    <div className="form-control flex flex-row items-center rounded-[15px] h-12 bg-base-100 px-3 shadow">
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
                    <div className="form-control flex flex-row items-center rounded-[15px] h-12 bg-base-100 px-3 shadow">
                      <input
                        className="input w-full focus:border-none focus:outline-none input-sm focus:outline-offset-none"
                        id="telNo"
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

                <div className="flex items-center justify-between">
                  <div className="form-control mt-3 w-1/2 mr-4">
                    <label className="label">
                      <span className="text-[#B6B8BB] text-[17px] font-[500] landing-[19px]">
                        Set Password
                      </span>
                    </label>
                    <div className="form-control flex flex-row items-center rounded-[15px] h-12 bg-base-100 px-3 shadow">
                      <input
                        className="input w-full focus:border-none focus:outline-none input-sm focus:outline-offset-none"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                    </div>
                    <span className="h-[2px] mt-2 text-rose-600 text-[12px]">
                      {formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                      ) : null}
                    </span>
                  </div>

                  <div className="form-control mt-3 w-1/2 ml-4">
                    <label className="label">
                      <span className="text-[#B6B8BB] text-[17px] font-[500] landing-[19px]">
                        Confirm Password
                      </span>
                    </label>
                    <div className="form-control flex flex-row items-center rounded-[15px] h-12 bg-base-100 px-3 shadow">
                      <input
                        className="input w-full focus:border-none focus:outline-none input-sm focus:outline-offset-none"
                        name="password"
                        type={type}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      <span onClick={handleToggle}>{icon}</span>
                    </div>

                    <span className="h-[2px] mt-2 text-rose-600 text-[12px]">
                      {formik.errors.password ? (
                        <div>{formik.errors.password}</div>
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
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}
