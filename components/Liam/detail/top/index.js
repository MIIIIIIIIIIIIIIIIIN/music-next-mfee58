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
  const [plane, setPlane] = useState([]);

  // LINE 分享功能
  const shareToLine = () => {
    if (!projectData) return;

    const shareText = `${projectData.f_project_name}\n${projectData.f_project_description || ''}`;
    
    // 根據設備類型使用不同的分享方式
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // 移動設備：直接開啟 LINE APP
      window.location.href = `line://msg/text/${encodeURIComponent(shareText)}`;
    } else {
      // 桌面設備：開啟 LINE 網頁版分享
      window.open(`https://line.me/R/share?text=${encodeURIComponent(shareText)}`, '_blank');
    }
  };

  useEffect(() => {
    setIsLoading(false);

    const fetchProjectData = async () => {
      try {
        if (!router.isReady) return;
        
        const { project } = router.query;
        // console.log('Project ID:', project);

        const response = await fetch(`http://localhost:3005/fundraiser/list/${project}`);
        const data = await response.json();
        
        if (data.rows && data.rows.length > 0) {
          setProjectData(data.rows[0]);
          // targetAmount(projectData.f_project_amount)
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    const fetchPlane = async () => {
      try {
        if (!router.isReady) return;
          
        const { project } = router.query;
          
        const response = await fetch(`http://localhost:3005/fundraiser/plane/${project}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        
        const result = await response.json();

        if (result.data && Array.isArray(result.data)) {
          setPlane(result.data);
        }
        
      } catch (error) {
        console.error("Error fetching plane data:", error);
      }
    };

    fetchProjectData();
    fetchPlane()
    
  }, [router.isReady]);

  const scrollToSection = (sectionId, offset = 0) => {
    // const element = document.getElementById(sectionId);
    // if (element) {
      // const elementPosition = element.getBoundingClientRect().top;
      // const offsetPosition = elementPosition + window.pageYOffset - offset;
  
      window.scrollTo({
        top: 1000,
        behavior: 'smooth'
      });
    
  };
  
  const totalPeople = plane.reduce((sum, element) => 
    sum + Number(element.f_plan_people), 0);

  const totalMoney = plane.reduce((sum, element) => 
    sum + (Number(element.f_plan_people) * Number(element.f_plan_amount)), 0);

  const progressPercentage = projectData 
    ? Math.min((totalMoney / projectData.f_project_amount) * 100, 100)
    : 0;

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
              <h6 className={styles.targetPresentMount}>{`${totalMoney}`}</h6>
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
              <button onClick={() => scrollToSection('planSection', 80)}>贊助專案</button>
              <button onClick={shareToLine} className={styles.lineShareButton}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className={styles.lineIcon}>
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.28-.63.63-.63.349 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645s6.59-3.876 9.001-6.639C22.835 15.09 24 12.862 24 10.314"/>
                </svg>
                分享
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}