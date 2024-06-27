import React, { useState } from "react";
import { Button } from "antd";
import OtpInput from "react18-input-otp";
import axios from "axios";
import { useSelector } from "react-redux";

export default function TwoFactEmailAuth2({ next }) {
  const [code, setCode] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState(123456);
  const [error, setError] = useState(null);
  const state = useSelector((state) => state.auth);

  const handleSubmit = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/verifyEmailOTP`,
        {
          email: state.email,
          otp: code,
        },
        {
          headers: {
            Authorization: state.jwt,
          },
        }
      )
      .then((res) => {
        setError(null);
        setCode("");
        next();
      })
      .catch((err) => {
        setError("Invalid OTP Code");
      });
  };

  const handleChange = (code) => setCode(code);

  return (
    <>
      <h3 className="text-center text-[29px] font-[500] text-[#1E2328] landing-[19px] mb-3">
        Email Verification
      </h3>
      <p className="py-1 text-center text-[14px] font-[500] text-[#898B8F] landing-[19px] w-80 m-auto">
        Enter verification code sent to {state.email}
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
              id="myInput"
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
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
          <span className="countdown mt-4 text-base-content/70  text-[16px] landing-[19px] font-[500]">
            {/* <span style={{ "--value": 0 }}></span>:
            <span style={{ "--value": 0 }}></span> */}
          </span>

          {/* <div className="mt-3">
            <h3 className="text-base-content/70  ml-2 font-[500] text-[16px] landing-[19px]">
              Didn’t Received OTP?{" "}
              <span className="text-base-content ml-2 font-[500] text-[16px] landing-[19px]">
                Resend
              </span>
            </h3>
          </div> */}
        </div>
      </div>
    </>
  );
}
