import React from "react";
import { useFormik } from "formik";
import TwoFactAuth from "../../components/TwoFactAuth/TwoFactAuth";

const validate = (values) => {
  const errors = {};

  if (!values.fname) {
    errors.fname = "Required";
  } else if (!/^[0-9a-zA-Z].*/i.test(values.fname)) {
    errors.fname = "Invalid username";
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

export default function CategoryAddModal() {
  const formik = useFormik({
    initialValues: {
      fname: "",
      email: "",
      phone: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
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
                      name="fname"
                      onChange={formik.handleChange}
                      value={formik.values.fname}
                    />
                  </div>
                  <span className="h-[2px] mt-2 text-rose-600 text-[12px]">
                    {formik.errors.fname ? (
                      <div>{formik.errors.fname}</div>
                    ) : null}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  className="btn text-white gap-2 btn-neutral btn-block rounded text-[17px] font-[500] landing-[19px]"
                  onClick={() =>
                    document.getElementById("my_modal_2").showModal()
                  }
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
  );
}
