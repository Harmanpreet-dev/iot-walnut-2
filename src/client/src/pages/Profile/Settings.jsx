import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Settings() {
  const [googleSecret, setGoogleSecret] = useState();
  const [googleQr, setGoogleQr] = useState();
  const state = useSelector((state) => state.auth);
  useEffect(() => {
    getData();
  });

  const getData = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/getSingleAdmin`,
        { email: state.email },
        {
          headers: {
            Authorization: state.jwt,
          },
        }
      )
      .then((res) => {
        setGoogleQr(res.data.totp_qr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGenerateTOTP = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/generateGoogleOTP`,
        { email: state.email },
        {
          headers: {
            Authorization: state.jwt,
          },
        }
      )
      .then((res) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="p-4">
        <button
          className="btn btn-neutral"
          onClick={() => handleGenerateTOTP()}
        >
          Generate Google Authenticator QR
        </button>
        <div className="p-4">
          <div className="my-4">
            <h5>Google Auth QR Code</h5>
          </div>
          {getData !== null ? <img src={googleQr} /> : <></>}
        </div>
      </div>
    </div>
  );
}
