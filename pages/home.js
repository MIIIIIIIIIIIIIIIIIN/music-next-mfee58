import React,{useState, useEffect} from 'react'
import NavDesktop from '@/components/nav/desktop'
import FooterDeskTop from '@/components/footer/desktop'
import FooterMobile from '@/components/footer/mobile'
import Commodity1 from '@/components/card/ commodity'
import Category from '@/components/card/category'
import NavMobile from '@/components/nav/mobile'


export default function home() {
  const [isMobile, setIsMobile] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // 定義處理螢幕寬度變化的函數
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    // 初次渲染時呼叫一次以設置初始狀態
    handleResize();

    // 添加 resize 事件監聽器
    window.addEventListener('resize', handleResize);

    // 移除事件監聽器以避免內存洩漏
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div>
       {isMobile ? <NavMobile /> : <NavDesktop />}
      
       {/* <Category /> */}
       {isMobile ? <FooterMobile /> : < FooterDeskTop/>}
     
       

   
    </div>

  )
}
