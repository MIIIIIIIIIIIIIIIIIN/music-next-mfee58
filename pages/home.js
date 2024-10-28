import React,{useState, useEffect} from 'react'
import NavDesktop from '@/components/nav/desktop'
import FooterDeskTop from '@/components/footer/desktop'
import FooterMobile from '@/components/footer/mobile'
import Commodity1 from '@/components/card/ commodity'
import Category from '@/components/card/category'
import NavMobile from '@/components/nav/mobile'
import Carousel from '@/components/public/Carousel'
import Daily from '@/components/home/daily'


export default function home() {
  const [isMobile, setIsMobile] = useState(false);
  const images = [ "/01.jpg", "/02.jpg",
    "/03.jpg", ];
    
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
    <p></p>

    // 移除事件監聽器以避免內存洩漏
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div>
       {isMobile ? <NavMobile /> : <NavDesktop />}

       <Carousel images={images} interval={2000} />
      
       <Commodity1 />
       <Daily /> 

       {isMobile ? <FooterMobile /> : < FooterDeskTop/>}
     
       

   
    </div>

  )
}
