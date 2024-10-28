import React from "react";
import WhiteWBtns from "@/components/public/white_wbtns";
import BlackWBtns from "@/components/black_wbtns";

const WbtnPage = () => {
  const handleClick = () => {
    alert("Wide Buttons clicked!");
  };

  return (
    <div>
      <WhiteWBtns type="1" onClick={handleClick}>
        送出
      </WhiteWBtns>
      <BlackWBtns type="2" onClick={handleClick}>
        送出
      </BlackWBtns>
    </div>
  );
};

export default WbtnPage;
