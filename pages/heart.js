import Heart from "@/components/hearts";


const HeartPage = () => {
  const handleHeartClick = (isActive) => {
    console.log("Heart is now:", isActive ? "active" : "inactive");
  };

  return (
    <div>
      <Heart size={1} onClick={handleHeartClick} />
      <Heart size={2} initialActive={true} />
      <Heart size={3} />
    </div>
  );
};

export default HeartPage;
