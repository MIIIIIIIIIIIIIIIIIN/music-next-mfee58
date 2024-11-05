import React, { useState } from 'react';
import GroupPlaneCard from '@/components/Liam/detail/content/group-plane-card';
import ProductSelector from '@/components/Liam/select';

const MainContainer = () => {
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelect = (planData) => {
    setSelectedPlan(planData);
    setShowProductSelector(true);
  };

  if (showProductSelector) {
    return <ProductSelector selectedPlan={selectedPlan} />;
  }

  return (
    <div className="max-w-sm mx-auto">
      <GroupPlaneCard onSelect={handlePlanSelect} />
    </div>
  );
};

export default MainContainer;