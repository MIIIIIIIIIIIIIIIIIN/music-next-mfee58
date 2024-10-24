// pages/tab.js
import React from "react";
import Tab from "@/components/tabs";

const TabPage = () => {
  const handleTabClick = (tabName) => {
    console.log(`${tabName} tab clicked`);
    alert("Tab clicked!")
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          fontFamily: "var(--primary-500-font-family)",
          fontSize: "var(--primary-500-font-size)",
          marginBottom: "20px",
        }}
      >
        Music Genres
      </h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <Tab text="POP" onClick={() => handleTabClick("POP")} />
        <Tab text="ROCK" onClick={() => handleTabClick("ROCK")} />
        <Tab text="BLUES" onClick={() => handleTabClick("BLUES")} />
        <Tab text="SOUL" onClick={() => handleTabClick("SOUL")} />
      </div>
    </div>
  );
};

export default TabPage;
