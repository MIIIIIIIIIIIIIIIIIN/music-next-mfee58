import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Kv from "@/components/Liam/Fundraising-list/kv";
import Nav from "@/components/public/nav";
import NewCard from "@/components/Liam/Fundraising-list/new/card";
import ListNewCard from "@/components/Liam/Fundraising-list/new";
import FundraisingTitle from "@/components/Liam/Fundraising-list/title";
import Footer from "@/components/public/footer";
import ImageRecommendCarousel from "@/components/Liam/Fundraising-list/new/recommend";
import ImageCarousel from "@/components/Liam/Fundraising-list/new/index";
import WaterfallLayout from "@/components/Liam/Fundraising-list/water-layout";
import Chat from "@/components/Liam/chat/chat";
// import ContractAgreement from '@/components/Liam/add-project/ContractAgreement'

import ContractForm from "@/components/Liam/add-project/ContractForm";
import ProjectForm from "@/components/Liam/add-project/ProjectForm";
import Modal from "@/components/Liam/add-project/modal";

import { useAuth } from "@/Context/auth-context"; // 使用 useAuth
import axios from "axios";

export default function FundraisingList() {
  const router = useRouter();
  const { auth } = useAuth(); // 獲取 auth 內容

  const [display, setDisplay] = useState(true); // 控制表單顯示
  const [showModal, setShowModal] = useState(false); // 控制 Modal 顯示
  const [member, setMember] = useState(0);

  const images = [
    { url: "/George/products-images-250px/products-(1).jpg", alt: "Image 1" },
    { url: "/George/products-images-250px/products-(2).jpg", alt: "Image 1" },
    { url: "/George/products-images-250px/products-(3).jpg", alt: "Image 1" },
    { url: "/George/products-images-250px/products-(4).jpg", alt: "Image 1" },
    { url: "/George/products-images-250px/products-(5).jpg", alt: "Image 1" },
    { url: "/George/products-images-250px/products-(6).jpg", alt: "Image 1" },
    // ... 更多圖片
  ];
  useEffect(() => {
    const fetchData = async () => {
      if (!auth.id) return;

      try {
        const response = await axios.get(`http://localhost:3005/member/mem-data/by-id/${auth.id}`, {
          withCredentials: true,
        });
        const data = response.data;

        if (data.success) {
          const memberData = data.memberData;
          setMember(memberData);

        } else {
          console.warn("未獲取到有效的會員資料");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } 
    };
    fetchData();
  }, [router.isReady]);

  return (
    <div className="container">
      <Nav setShowModal={setShowModal} />
      <Kv />
      <div>
        {/* 開啟表單按鈕 */}
        <button
          onClick={() => {
            if (!member ) {
              alert('請先登入會員才能進行贊助！');
              window.location='http://localhost:3000/member/login'
              return;
            }
            setShowModal(true);
          }}
        >
          提案募資專輯!!!
        </button>

        {/* Modal 顯示邏輯 */}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            {display ? (
              <ContractForm setDisplay={setDisplay} />
            ) : (
              <ProjectForm setShowModal={setShowModal} member={member} />
            )}
          </Modal>
        )}
      </div>
      {/* <ContractAgreement /> */}
      <FundraisingTitle text="!!(最新募資)" />
      <ImageCarousel images={images} />
      <FundraisingTitle text="<<(推薦募資)" />
      <ImageRecommendCarousel images={images} />
      <WaterfallLayout />
      <Footer />
      <Chat />
      <style jsx>
        {`
          .container {
            position: relative;
          }
          button {
            letter-spacing: 5px;
            font-size: 30px;
            display: block;
            right: 20px;
            bottom: 200px;
            height: 80px;
            width: 80%;
            cursor: pointer;
            margin: auto;
            margin-bottom: 50px;

            mask-image: url("/video/Exclude.png");
            -webkit-mask-size: 100% 100%;
            mask-repeat: no-repeat; /* 防止遮罩重複 */
            -webkit-mask-repeat: no-repeat;
            border: 0;
          }
          button:hover {
            background: rgb(0, 255, 72);
          }
          @media (max-width: 640px) {
            
          }
        `}
      </style>
    </div>
  );
}
