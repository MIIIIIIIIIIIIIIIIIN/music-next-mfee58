import PurchaseFeedback from "@/components/Liam/detail/message/add";

// 在購買成功頁面的組件中
export default function PurchaseSuccessPage() {
  const projectId=1;
  const orderId=1;

  return (
    <div>
      <h1>購買成功！</h1>
      <PurchaseFeedback 
        projectId={projectId} 
        orderId={orderId} 
      />
    </div>
  );
}