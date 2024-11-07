import PlaneCard from "./plane-card";
import styles from './group-plane-card.module.css'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {ProductSelector} from '../../../select/index'

export default function GroupPlaneCard() {
  const router = useRouter();
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plane, setPlane] = useState([])

  const handlePlanSelect = (planData) => {
    setSelectedPlan(planData);
    setShowProductSelector(true);
  };
  useEffect(()=>{
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
        // console.log('API Response:', result);

        // 確認數據存在且是陣列
        if (result.data && Array.isArray(result.data)) {
          setPlane(result.data); // 直接設置API返回的數據

        }
        
      } catch (error) {
        console.error("Error fetching plane data:", error);
      }
    };
    fetchPlane()
  },[router.isReady])

  if (showProductSelector) {
    return <ProductSelector setShowProductSelector={setShowProductSelector} selectedPlan={selectedPlan} />;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {/* {Array.from({ length: 3 }, (_, i) => (
          <li key={i} className={styles.item}>
            <PlaneCard onSelect={handlePlanSelect} />
          </li>
        ))} */}
        {plane.map((e,i)=>{
            return(
              <li key={i} className={styles.item}>
            <PlaneCard onSelect={handlePlanSelect} e={e}/>
          </li>
            )
        })}
      </ul>
      {/* {console.log('plane in render:', plane)} */}
    </div>
    
  );
}