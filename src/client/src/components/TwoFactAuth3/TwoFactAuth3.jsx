import React, { useState } from "react";
import { Steps, theme } from "antd";
import { SiTicktick } from "react-icons/si";
import TwoFactEmailAuth3 from "./TwoFactEmailAuth3";
import TwoFactGoogleAuth3 from "./TwoFactGoogleAuth3";

export default function TwoFactAuth3({ handle2FA }) {
  const [current, setCurrent] = useState(0);
  const { token } = theme.useToken();

  const next = () => {
    setCurrent(current + 1);
  };

  const handleSubmitfinal = (value) => {
    handle2FA(value);
    setCurrent(0);
    document.getElementById("my_modal_2_3").close();
    document.getElementById("my_modal_adminSuccess").showModal();
    setTimeout(() => {
      document.getElementById("my_modal_adminSuccess").close();
    }, 1000);
  };

  const steps = [
    {
      title: "",
      content: <TwoFactEmailAuth3 next={next} />,
    },
    {
      title: "",
      content: <TwoFactGoogleAuth3 handleSubmitfinal={handleSubmitfinal} />,
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
    <dialog id="my_modal_2_3" className="modal ">
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
