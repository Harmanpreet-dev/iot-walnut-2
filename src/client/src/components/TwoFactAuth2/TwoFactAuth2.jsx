import React, { useState } from "react";
import { Steps, theme } from "antd";
import TwoFactEmailAuth2 from "./TwoFactEmailAuth2";
import TwoFactGoogleAuth2 from "./TwoFactGoogleAuth2";
import { SiTicktick } from "react-icons/si";

export default function TwoFactAuth2({ handle2FA }) {
  const [current, setCurrent] = useState(0);
  const { token } = theme.useToken();

  const next = () => {
    setCurrent(current + 1);
  };

  const handleSubmitfinal = (value) => {
    handle2FA(value);
    setCurrent(0);
    document.getElementById("my_modal_2_2").close();
    document.getElementById("my_modal_adminSuccess").showModal();
    setTimeout(() => {
      document.getElementById("my_modal_adminSuccess").close();
    }, 1000);
  };

  const steps = [
    {
      title: "",
      content: <TwoFactEmailAuth2 next={next} />,
    },
    {
      title: "",
      content: <TwoFactGoogleAuth2 handleSubmitfinal={handleSubmitfinal} />,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    lineHeight: "20px",
    textAlign: "center",
    color: token.colorTextTertiary,
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
  };

  return (
    <dialog id="my_modal_2_2" className="modal ">
      <div className="modal-box max-w-[34rem]">
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
      </div>
      <dialog id="my_modal_adminSuccess" className="modal">
        <div className="modal-box py-16 px-12 bg-[#30BF89] max-w-[40rem] h-[30rem] flex flex-col items-center justify-center">
          <div className="text-[#fff]  text-[90px] flex items-center justify-center">
            <SiTicktick />
          </div>
          <h3 className="font-bold text-center text-[27px] font-[700] text-[#fff] landing-[27px] mt-5">
            Success
          </h3>
        </div>
      </dialog>
    </dialog>
  );
}
