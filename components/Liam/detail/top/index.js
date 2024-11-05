import React, { useState } from "react";
import styles from "./detail-top.module.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { CiChat1 } from "react-icons/ci";
import Heart from "@/components/public/hearts";
import ChatModal from "../ContactIcon";

export default function DetailTop() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <img src="/01.jpg" alt="" />
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.imgCross}>
            <img src="/02.jpg" alt="" />
          </div>
          <div className={styles.bar}>
            <div className={styles.barInfo}></div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.rightConttainer}>
            <div className={styles.target}>
              <h5 className={styles.targetTitle}>目標</h5>
              <h5 className={styles.targetMount}>$4255425</h5>
            </div>
            <div className={styles.targetPresent}>
              <span>
                <FaArrowRightLong />
              </span>
              <h6 className={styles.targetPresentMount}>$839839889</h6>
            </div>
            <div className={styles.target}>
              <h5 className={styles.targetTitle}>贊助人次</h5>
            </div>
            <div className={styles.targetPresent}>
              <span>
                <FaArrowRightLong />
              </span>
              <h6 className={styles.targetPresentMount}>200人</h6>
            </div>
            <div className={styles.target}>
              <h5 className={styles.targetTitle}>募資倒數</h5>
            </div>
            <div className={styles.targetPresent}>
              <span>
                <FaArrowRightLong />
              </span>
              <h6 className={styles.targetPresentMount}>14天</h6>
            </div>
            <div className={styles.rightBottom}>
              
              <ChatModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={() => console.log("表單提交")}
              />
              <Heart />
              <button>贊助專案</button>
              <button>分享</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
