import PlaneCard from "./plane-card";
import styles from './group-plane-card.module.css'
import { useState } from 'react';
import {ProductSelector} from '../../../select/index'

export default function GroupPlaneCard() {
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelect = (planData) => {
    setSelectedPlan(planData);
    setShowProductSelector(true);
  };

  if (showProductSelector) {
    return <ProductSelector setShowProductSelector={setShowProductSelector} selectedPlan={selectedPlan} />;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {Array.from({ length: 3 }, (_, i) => (
          <li key={i} className={styles.item}>
            <PlaneCard onSelect={handlePlanSelect} />
          </li>
        ))}
      </ul>
    </div>
  );
}