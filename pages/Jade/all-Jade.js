import React from "react";
import UserIcon from "@/components/public/user-icon";
import Carousel from "@/components/public/carousel";
import FormCheckbox from "@/components/public/form-checkbox";
import FormOption from "@/components/public/form-option";
import FormInput from "@/components/public/form-input";
import PasswordInput from "@/components/public/PasswordInput";

import PlayButton from "@/components/public/play-button";
import PlayButtonS from "@/components/public/play-button-s";
import Mp3Uploader from "@/components/public/mp3-uploader";
import FormInputM from "@/components/member/form-input";
import Button from "@/components/public/buttons";
import ButtonToggleM from "@/components/member/button-show";
import InfoNav from "@/components/member/info-nav";
import MemIcons from "@/components/member/mem-icons";

// import styles from "../styles/Home.module.css";

export default function Home() {
  const goToHome = () => {
    window.location.href = "http://localhost:3000";
  };
  return (
    <>
      <div>
        <h1>All Components on One Page</h1>
        <hr />
        <br />
        <h2>MemIcons</h2>
        <h4>三種尺寸：16, 24, 48</h4>
        <MemIcons /> {/* 預設 icon-mail, 中尺寸 */}
        <MemIcons iconName="icon-mail" />
        <MemIcons iconName="icon-user" size="small" /> {/* 小尺寸 */}
        <MemIcons iconName="icon-user" size="medium" /> {/* 中尺寸 */}
        <MemIcons iconName="icon-user" size="large" /> {/* 大尺寸 */}
        <MemIcons iconName="icon-phone" /> {/* 預設中尺寸 */}
        <br />
        <br />
        <hr />
        <InfoNav />
        <br />
        <hr />
        <br />
        <br />
        <h2>ButtonToggleM</h2>
        <span>size="small"</span>
        <ButtonToggleM size="small" />
        <br />
        <span>size="medium"</span>
        <ButtonToggleM size="medium" />
        <br />
        <span>size="large"</span>
        <ButtonToggleM size="large" />
        <br />
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
        <hr />
        <Mp3Uploader />
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
        <span> FormInput size="small"</span>
        <FormInput size="small" />
        <br />
        <br />
        <span> FormInput size="medium"</span>
        <FormInput size="medium" />
        <br />
        <br />
        <span> FormInput size="large"</span>
        <FormInput size="large" />
        <br />
        <br />
        <hr />
        <h2>Form Input M</h2>
        <h5>size="small w120</h5>
        <FormInputM size="small" />
        <br />
        <h5>size="medium w200</h5>
        <FormInputM size="medium" />
        <br />
        <h5>size="large w300</h5>
        <FormInputM size="large" />
        <br />
        <br />
        <hr />
        <h2>Password Input</h2>
        <span>Default</span>
        <PasswordInput />
        <br />
        <span>size="small"</span>
        <PasswordInput size="small" />
        <br />
        <span>size="medium"</span>
        <PasswordInput size="medium" />
        <br />
        <span>size="large"</span>
        <PasswordInput size="large"/>
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
        <FormInputM />
        {/*
        <br />
        <br />
        <hr />
        <h2>user icon</h2> */}
        <UserIcon />
        {/* <button className={styles.backToHomeButton} onClick={goToHome}>
          回到首頁
        </button> */}
      </div>
    </>
  );
}
