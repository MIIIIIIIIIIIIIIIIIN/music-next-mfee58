import React,{useState, useEffect} from 'react'
import FooterDeskTop from './desktop';
import FooterMobile from './mobile';

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // 定義處理螢幕寬度變化的函數
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    // 初次渲染時呼叫一次以設置初始狀態
    handleResize();

    // 添加 resize 事件監聽器
  })
  return (
    <div>
      {isMobile ? <FooterMobile /> : <FooterDeskTop />}
    </div>
  )
}
