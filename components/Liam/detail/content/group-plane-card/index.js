import PlaneCard from "./plane-card";
import styles from "./group-plane-card.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ProductSelector } from "../../../select/index";

export default function GroupPlaneCard() {
  const router = useRouter();
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plane, setPlane] = useState([]);
  const [member, setMember] = useState()

  const handlePlanSelect = (planData) => {
    setSelectedPlan(plane);
    setShowProductSelector(true);
  };
  useEffect(() => {
    const fetchPlane = async () => {
      try {
        // 發送請求
        if (!router.isReady) return;

        const { project } = router.query;

        const response = await fetch(
          `http://localhost:3005/fundraiser/plane/${project}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        // console.log('API Response:', result);

        // 確認數據存在且是陣列
        if (result.data && Array.isArray(result.data)) {
          setPlane(result.data); // 直接設置API返回的數據
        }
      } catch (error) {
        console.error("Error fetching plane data:", error);
      }
    };
    const fetchMemberData = async () => {
      try {
        const response = await fetch("http://localhost:3005/mem-data", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch member data");
        }
        const data = await response.json();
        // console.log(data);
        
        // 確保設置的值不是 undefined
        setMember(data.admin || null);
        // console.log(member);

      } catch (error) {
        console.error("Error fetching member data:", error);
        setMember(null); // 發生錯誤時設置為 null
      }
    };
    fetchPlane();
    fetchMemberData()
   
    
  }, [router.isReady]);

  if(plane.length==0){
    return  <div className={styles.emptyContainer} style={{textAlign:'center',height:'50px'}}>暫無專案</div>
  }

  if (showProductSelector) {
    return (
      <ProductSelector
        setShowProductSelector={setShowProductSelector}
        selectedPlan={selectedPlan}
        plane={plane}
      />
    );
  }


  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {/* {Array.from({ length: 3 }, (_, i) => (
          <li key={i} className={styles.item}>
            <PlaneCard onSelect={handlePlanSelect} />
          </li>
        ))} */}
        {plane.map((e, i) => {
          return (
            <li key={i} className={styles.item}>
              <PlaneCard onSelect={handlePlanSelect} e={e} member={member}/>
            </li>
          );
        })}
      </ul>
      {/* {console.log('plane in render:', plane)} */}
    </div>
  );
}
