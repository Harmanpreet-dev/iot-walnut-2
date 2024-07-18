import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { IoEyeOutline } from "react-icons/io5";
import TwoFactAuth from "../../components/TwoFactAuth/TwoFactAuth";
import { message } from "antd";

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
  } else if (!/^\d{8,11}$/.test(values.phone)) {
    errors.phone = "Enter valid Phone Number";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    // Fixed this line
    errors.password = "*Password must be 8 characters long.";
  } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/i.test(values.password)) {
    errors.password = "*Invalid Password";
  }

  if (!values.confirmpassword) {
    errors.confirmpassword = "Required";
  } else if (values.confirmpassword.length < 8) {
    // Fixed this line
    errors.confirmpassword = "*confirmpassword must be 8 characters long.";
  } else if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/i.test(values.confirmpassword)
  ) {
    errors.confirmpassword = "*Invalid confirmpassword";
  }

  if (
    values.password &&
    values.confirmpassword &&
    values.password !== values.confirmpassword
  ) {
    errors.confirmpassword = "Passwords do not match";
  }

  if (!values.admin) {
    errors.admin = "Required";
  } else if (!/^[0-9a-zA-Z].*/i.test(values.admin)) {
    errors.admin = "Invalid";
  }

  return errors;
};

export default function UserAddModal({ getuserdetail, state, admin }) {
  const uploadRef = useRef();
  const [imageSrc, setImageSrc] = useState("./images/default.jpeg");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FaRegEyeSlash />);
  const [emailError, setEmailError] = useState("");
  const [formValues, setFormValues] = useState();
  const [authorid, setAuthorid] = useState();
  const [authorname, setAuthorname] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      image: "",
      admin: "",
    },
    validate,
    onSubmit: (values) => {
      // checkEmail(values);
      handleFormSubmit(values);
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
        if (err.response.data.error === "Email already exists") {
          setEmailError(err.response.data.error);
        }
      });
  };

  const handle2FA = (response) => {
    console.log(response);
    if (response === true) {
      handleFormSubmit(formValues);
    }
  };

  const handleUploadPhoto = () => {
    uploadRef.current.click();
  };

  const selectAdminforUser = (e) => {
    const selectedAdminId = e.target.value;
    const selectedAdmin = admin.find((k) => k.id == selectedAdminId);

    setAuthorid(selectedAdmin.id);
    setAuthorname(selectedAdmin.name);
  };

  const handleFormSubmit = (values) => {
    values.author_id = authorid;
    values.author_name = authorname;
    // setLoading(true);
    setEmailError("");

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("password", values.password);
    formData.append("author_id", values.author_id);
    formData.append("author_name", values.author_name);
    if (values.image && values.image.length > 0) {
      console.log(values.image[0]);
      formData.append("image", values.image[0]); // Assuming single file upload. For multiple, loop through the array
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/adduserdetail`, formData, {
        headers: {
          Authorization: state.jwt,
        },
      })
      .then((res) => {
        getuserdetail();
        document.getElementById("my_modal_3").close();
        messageApi.success("Admin Added Successfully");
      })
      .catch((err) => {
        if (err.response.data.error === "Email already exists") {
          setEmailError(err.response.data.error);
        }
      });
  };

  // const handleFileSelect = (event) => {
  //   if (event.target.value !== "") {
  //     const files = event.target.files;
  //     let myFiles = Array.from(files);

  //     const reader = new FileReader();

  //     reader.onload = (e) => {
  //       setImageSrc(e.target.result);
  //     };

  //     reader.readAsDataURL(files[0]);

  //     formik.setFieldValue("image", myFiles);
  //   }
  // };

  const handleFileSelect = (event) => {
    if (event.target.value !== "") {
      const files = event.target.files;
      let myFiles = Array.from(files);

      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 5 * 1024 * 1024; // 5 MB

      myFiles = myFiles.filter((file) => {
        if (!validImageTypes.includes(file.type)) {
          alert("Invalid file type. Only JPG, PNG, and GIF are allowed.");
          return false;
        }
        if (file.size > maxSize) {
          alert("File size exceeds the 5MB limit.");
          return false;
        }
        return true;
      });

      if (myFiles.length > 0) {
        const reader = new FileReader();

        reader.onload = (e) => {
          setImageSrc(e.target.result);
        };

        reader.readAsDataURL(myFiles[0]);

        formik.setFieldValue("image", myFiles);
      }
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
      {/* {contextHolder} */}

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

                <div className="form-control">
                  <label className="label">
                    <span className="text-[#B6B8BB] dark:white text-[17px] font-[500] landing-[19px]">
                      Select Admin
                    </span>
                  </label>
                  <div>
                    <select
                      className="select focus:outline-none focus:border-none w-full  form-control flex flex-row items-center rounded-[15px] h-14 bg-base-100 px-3 shadow"
                      id="admin"
                      name="admin"
                      onChange={(e) => {
                        formik.handleChange(e);
                        selectAdminforUser(e);
                      }}
                      value={formik.values.admin}
                    >
                      <option value="">Select Admin</option>
                      {admin.map((value, i) => {
                        return (
                          <option value={value.id} key={i}>
                            {value.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <span className="h-[2px] mt-2 text-rose-600 text-[12px]">
                    {formik.errors.admin ? (
                      <div>{formik.errors.admin}</div>
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
                        type="number"
                        minlength="9"
                        maxlength="10"
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

                  <div className="form-control mt-3 w-1/2 ml-4">
                    <label className="label">
                      <span className="text-[#B6B8BB] text-[17px] font-[500] landing-[19px]">
                        Confirm Password
                      </span>
                    </label>
                    <div className="form-control flex flex-row items-center rounded-[15px] h-12 bg-base-100 px-3 shadow">
                      <input
                        className="input w-full focus:border-none focus:outline-none input-sm focus:outline-offset-none"
                        name="confirmpassword"
                        type={type}
                        onChange={formik.handleChange}
                        value={formik.values.confirmpassword}
                      />
                      <span onClick={handleToggle}>{icon}</span>
                    </div>

                    <span className="h-[2px] mt-2 text-rose-600 text-[12px]">
                      {formik.errors.confirmpassword ? (
                        <div>{formik.errors.confirmpassword}</div>
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
