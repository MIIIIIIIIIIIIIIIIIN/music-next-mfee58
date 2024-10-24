import React from "react";
import Button from "@/components/buttons"; 



const ButtonPage = () => {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div>
      <Button type="1" onClick={handleClick}>
        Button 1
      </Button>
      <Button type="2" onClick={handleClick}>
        Button 2
      </Button>
      <Button type="3" onClick={handleClick}>
        Button 3
      </Button>
      <Button type="4" onClick={handleClick}>
        Button 4
      </Button>
    </div>
  );
};

export default ButtonPage;
