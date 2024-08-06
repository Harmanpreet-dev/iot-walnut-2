import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useSelector } from "react-redux";

import TwoFactAuth from "../../components/TwoFactAuth/TwoFactAuth";

const validate = (values) => {
  const errors = {};

  if (!values.categoryName) {
    errors.categoryName = "Category name is required";
  } else if (!/^[a-zA-Z0-9\s]+$/.test(values.categoryName)) {
    errors.categoryName = "Invalid category name format";
  }

  return errors;
};

const CategoryAddModal = ({ getCategory }) => {
  const state = useSelector((state) => state.auth);
  const [formValues, setFormValues] = useState();

  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validate,
    onSubmit: (values, formikBag) => {
      verifyUser(values);
    },
  });

  const handleFormSubmit = (values) => {
    const timestamp = new Date().toISOString(); // Capture current timestamp in ISO format

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/categories`,
        {
          categoryName: values.categoryName,
          name: state.name,
          img: state.image,
          timestamp, // Send timestamp to the server
        },
        {
          headers: {
            Authorization: state.jwt,
          },
        }
      )
      .then((res) => {
        getCategory();
        document.getElementById("my_modal_1").close();
        // formikBag.resetForm(); // Reset form values
        // Handle success actions
      })
      .catch((err) => {
        console.error("Category addition error:", err);
        // Handle error actions
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

  const handle2FA = (response) => {
    if (response === true) {
      handleFormSubmit(formValues);
    }
  };
  return (
    <>
      <TwoFactAuth handle2FA={handle2FA} />
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-base-200 max-w-[40rem] h-96">
          <form method="dialog">
            <button className="btn text-[20px] btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex items-center justify-center flex-col h-full">
            <div className="mt-3 w-3/4">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="text-[#B6B8BB] dark:white text-[17px] font-[500] landing-[19px]">
                      Enter Category Name
                    </span>
                  </label>
                  <div className="form-control flex flex-row items-center rounded-[15px] h-12 bg-base-100 px-3 shadow">
                    <input
                      type="text"
                      className="input w-full focus:border-none focus:outline-none input-sm focus:outline-offset-none"
                      name="categoryName"
                      onChange={formik.handleChange}
                      value={formik.values.categoryName}
                    />
                  </div>
                  <span className="h-[2px] mt-2 text-rose-600 text-[12px]">
                    {formik.errors.categoryName ? (
                      <div>{formik.errors.categoryName}</div>
                    ) : null}
                  </span>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="btn text-white gap-2 btn-neutral btn-block rounded text-[17px] font-[500] landing-[19px]"
                  >
                    Submit
                  </button>
                  <TwoFactAuth />
                </div>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CategoryAddModal;
