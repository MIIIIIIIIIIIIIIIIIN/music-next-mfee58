import React from "react";
import UserIcon from "@/components/Jade/user-icon";
import Carousel from "@/components/Jade/carousel";
import FormCheckbox from "@/components/Jade/form-checkbox";
import FormOption from "@/components/Jade/form-option";
import FormInput from "@/components/Jade/form-input";
import PasswordInput from "@/components/Jade/PasswordInput";
import PlayButton from "@/components/Jade/play-button";
import PlayButtonS from "@/components/Jade/play-button-s";
import Mp3Uploader from "@/components/Jade/mp3-uploader";

import styles from "../styles/Home.module.css";

export default function Home() {
  const goToHome = () => {
    window.location.href = "http://localhost:3000";
  };
  return (
    <>
      <div>
        <h1>All Components on One Page</h1>
        <hr />
        <h2>UserIcon</h2>
        <UserIcon />
        <br />
        <hr />
        <h2>Carousel</h2>
        <Carousel
          images={[
            "/image/img-Jade/001album.jpg",
            "/image/img-Jade/002album.jpg",
            "/image/img-Jade/003album.jpg",
            "/image/img-Jade/004album.jpg",
            "/image/img-Jade/005album.jpg",
          ]}
          interval={3000}
        />
        
        <br />
        <br />
        <br />
        <hr/>
        <Mp3Uploader/>
        <br />
        <hr />
        <h2>Form Checkbox</h2>
        <FormCheckbox />
        <br />
        <br />
        <br />
        <br />
        <hr />
        <h2>Form Option</h2>
        <FormOption />
        <br />
        <br />
        <br />
        <br />
        <hr />
        <h2>Form Input</h2>
        <FormInput size="small" />
        <br />
        <br />
        <FormInput size="medium" />
        <br />
        <br />
        <FormInput size="large" />
        <br />
        <br />
        <br />
        <br />
        <hr />
        <h2>Password Input</h2>
        <PasswordInput />
        <br />

        <hr />
        <h2>Play Button</h2>
        <PlayButton size="small" />
        <br />
        <br />
        <PlayButton size="medium" />
        <br />
        <br />
        <PlayButton size="large" />
        <br />
        <br />
        <br />
        <br />
        <hr />
        <h2>Play Button S</h2>
        <PlayButtonS />
        <br />
        <br />
        {/*
        <br />
        <br />
        <hr />
        <h2>user icon</h2> */}
        {/* <UserIcon /> */}
        {/* <button className={styles.backToHomeButton} onClick={goToHome}>
          回到首頁
        </button> */}
      </div>
    </>
  );
}
