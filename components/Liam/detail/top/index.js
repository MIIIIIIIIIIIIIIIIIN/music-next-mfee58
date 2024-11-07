import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

import styles from "./detail-top.module.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { CiChat1 } from "react-icons/ci";
import Heart from "@/components/public/hearts";
import ChatModal from "../ContactIcon";
import { Plane } from "lucide-react";


export default function DetailTop({}) {


  const router = useRouter();
  const [projectData, setProjectData] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetAmount, setTargetAmount] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(56000);
  const [name, setName] = useState("");
  const [people, setPeople] = useState(0);
  const [plane, setPlane] = useState([])



  const progressPercentage = Math.min(
    (currentAmount / targetAmount) * 100,
    100
  );
  useEffect(() => {
    // 定義獲取數據的函數
    
      setIsLoading(false);


 

      const fetchProjectData = async () => {
        try {
          if (!router.isReady) return;
          
          const { project } = router.query;
          console.log('Project ID:', project);
  
          const response = await fetch(`http://localhost:3005/fundraiser/list/${project}`);
          const data = await response.json();
          // console.log('API Response:', data);
          
          if (data.rows && data.rows.length > 0) {
            setProjectData(data.rows[0]);
          }
          setIsLoading(false);
        } catch (error) {
          console.error("Error:", error);
          setIsLoading(false);
        }
      };
  
     
      const fetchPlane = async () => {
        try {
          // 發送請求
          if (!router.isReady) return;
            
            const { project } = router.query;
            
          const response = await fetch(`http://localhost:3005/fundraiser/plane/${project}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          
          const result = await response.json();
  
          // 確認數據存在且是陣列
          if (result.data && Array.isArray(result.data)) {
            setPlane(result.data); // 直接設置API返回的數據
  // console.log(plane);
  
          }
          
        } catch (error) {
          console.error("Error fetching plane data:", error);
        }
      };
   

    // 調用函數
    fetchProjectData();
    fetchPlane()
    
  }, [router.isReady]); // 空依賴數組表示只在組件掛載時執行一次
  
  const totalPeople = plane.reduce((sum, element) => 
    sum + Number(element.f_plan_people), 0);

  const totalMoney = plane.reduce((sum, element) => 
    sum + (Number(element.f_plan_people) * Number(element.f_plan_amount	)), 0);


  // 如果還在載入或沒有數據，顯示載入中
  if (isLoading || !projectData) {
    return <div>Loading...</div>;
  }



  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <img src="/01.jpg" alt="" />
      </div>
      <h1 className={styles.name}>{projectData.f_project_name}</h1>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.imgCross}>
            <img src={projectData.f_project_picture} alt="" />
          </div>
          <div className={styles.bar}>
            <div
              className={`${styles.barInfo} ${isLoading ? '' : styles.animate}`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.rightConttainer}>
            <div className={styles.target}>
              <h5 className={styles.targetTitle}>目標</h5>
              <h5 className={styles.targetMount}>{`${projectData.f_project_amount}`}</h5>
            </div>
            <div className={styles.targetPresent}>
              <span>
                <FaArrowRightLong />
              </span>
              <h6
                className={styles.targetPresentMount}
              >{`${totalMoney}`}</h6>
            </div>
            <div className={styles.target}>
              <h5 className={styles.targetTitle}>贊助人次</h5>
            </div>
            <div className={styles.targetPresent}>
              <span>
                <FaArrowRightLong />
              </span>
              <h6 className={styles.targetPresentMount}>{totalPeople}</h6>
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
