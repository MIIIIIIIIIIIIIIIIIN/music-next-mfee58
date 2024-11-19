import OrderList from "@/components/Liam/order-detail";
import { TabProvider } from "@/components/Liam/detail/top/tab-Context";

const MyPage = () => {
  
  return (
    <TabProvider>
      
        <OrderList />
      
    </TabProvider>
  );
};

export default MyPage; // 正確的 export default 語法