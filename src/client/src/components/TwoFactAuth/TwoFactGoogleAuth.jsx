import React, { useState } from "react";
import { Button } from "antd";
import OtpInput from "react18-input-otp";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

export default function TwoFactGoogleAuth({ handleSubmitfinal }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const { google_secret } = useSelector((state) => state.auth);

  const handleSubmit = () => {
    axiosInstance
      .post(`/google/verify-otp`, {
        secret: google_secret,
        token: code,
      })
      .then((res) => {
        if (res.data.verified === true) {
          setError(null);
          setCode("");
          handleSubmitfinal(true);
        } else {
          setError("Invalid OTP Code");
        }
      })
      .catch((err) => {
        setError("Invalid OTP Code");
      });
  };

  const handleChange = (code) => setCode(code);

  return (
    <>
      <form method="dialog">
        <button className="btn text-[20px] btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h3 className="text-center text-[29px] font-[500] text-[#1E2328] landing-[19px] mb-3">
        User Verification
      </h3>
      <p className="py-1 text-center text-[14px] font-[500] text-[#898B8F] landing-[19px] w-80 m-auto">
        Enter the confirmation code displayed in the google autenticator app
      </p>
      <div className="modal-action flex items-center justify-center max-h-96">
        <form
          method="dialog"
          className="flex items-center justify-center flex-col"
        >
          <div className="sets mb-5">
            <OtpInput
              className="border p-1 m-1"
              value={code}
              onChange={handleChange}
              numInputs={6}
              placeholder=""
              isSuccessed={false}
              errorStyle="error"
              successStyle="success"
              separateAfter={1}
              shouldAutoFocus
            />
          </div>
          <div>
            <p className="h-[2px] text-rose-600 text-[12px]">{error}</p>
          </div>
        </form>
      </div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        <div className="flex items-center justify-center flex-col max-w-[26.5rem] m-auto">
          <Button
            className="btn bg-[#000] w-full text-[#fff] text-[17px] font-[500] rounded"
            type="primary"
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
          <span className="countdown mt-4 text-[#000] text-[16px] landing-[19px] font-[500]">
            {/* <span style={{ "--value": 0 }}></span>:
            <span style={{ "--value": 0 }}></span> */}
          </span>
        </div>
      </div>
    </>
  );
}
