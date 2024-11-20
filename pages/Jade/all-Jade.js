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
import InfoNav from "@/components/member/info-nav-liam";
import MemIcons from "@/components/member/mem-icons";

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
        <span>size=&quot;small&quot;</span>
        <ButtonToggleM size="small" />
        <br />
        <span>size=&quot;medium&quot;</span>
        <ButtonToggleM size="medium" />
        <br />
        <span>size=&quot;large&quot;</span>
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
        <h2>Mp3Uplloader</h2>
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
        <span> FormInput size=&quot;small&quot;</span>
        <FormInput size="small" />
        <br />
        <br />
        <span> FormInput size=&quot;medium&quot;</span>
        <FormInput size="medium" />
        <br />
        <br />
        <span> FormInput size=&quot;large&quot;</span>
        <FormInput size="large" />
        <br />
        <br />
        <hr />
        <h2>Form Input M</h2>
        <h5>size=&quot;small w120&quot;</h5>
        <FormInputM size="small" />
        <br />
        <h5>size=&quot;medium w200&quot;</h5>
        <FormInputM size="medium" />
        <br />
        <h5>size=&quot;large w300&quot;</h5>
        <FormInputM size="large" />
        <br />
        <br />
        <hr />
        <h2>Password Input</h2>
        <span>Default</span>
        <PasswordInput />
        <br />
        <span>size=&quot;small&quot;</span>
        <PasswordInput size="small" />
        <br />
        <span>size=&quot;medium&quot;</span>
        <PasswordInput size="medium" />
        <br />
        <span>size=&quot;large&quot;</span>
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
        <UserIcon />
      </div>
    </>
  );
}