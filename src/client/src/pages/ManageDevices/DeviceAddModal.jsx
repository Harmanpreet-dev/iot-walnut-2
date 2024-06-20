import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const validate = (values) => {
  const errors = {};

  if (!values.imei) {
    errors.name = "Required";
  } else if (!/^[0-9a-zA-Z].*/i.test(values.imei)) {
    errors.name = "Invalid";
  }

  return errors;
};

export default function DeviceAddModal({ getDevices }) {
  const state = useSelector((state) => state.auth);
  const params = useParams();

  const formik = useFormik({
    initialValues: {
      imei: "",
    },
    validate,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const handleFormSubmit = (values) => {
    values.fleet = params.fleet;
    axios
      .post(`${process.env.REACT_APP_API_URL}/addDevice`, values, {
        headers: {
          Authorization: state.jwt,
        },
      })
      .then((res) => {
        getDevices();
        document.getElementById("my_modal_3").close();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box bg-base-200 max-w-[50rem] h-3/4">
        <form method="dialog">
          <button className="btn text-[20px] btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="flex items-center justify-center flex-col h-full">
          <div className="mt-3 w-3/4">
            <form onSubmit={formik.handleSubmit}>
              <div>
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
                      name="imei"
                      onChange={formik.handleChange}
                      value={formik.values.imei}
                    />
                  </div>
                  <span className="h-[2px] mt-2 text-rose-600 text-[12px]">
                    {formik.errors.imei ? (
                      <div>{formik.errors.imei}</div>
                    ) : null}
                  </span>
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
