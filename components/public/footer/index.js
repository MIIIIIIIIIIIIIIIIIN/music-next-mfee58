import React from 'react'

export default function index() {
  return (
    <>
      <div className='wrap'>
        <ul className='container'>

          <li className='category'>
            <p>探索商品分類</p>
            <ul className='info'>
              <li className='infoItem'>所有商品分類</li>
              <li className='infoItem'>設計誌</li>
              <li className='infoItem'>跨國合併結帳專區</li>
              <li className='infoItem'>找靈感</li>
            </ul>
          </li>
          <li className='category'>
            <p>販售</p>
            <ul className='info'>
              <li className='infoItem'>問與答</li>
              <li className='infoItem'>我想在-芭樂派-上販售</li>
            </ul>
          </li>
          <li className='category'>
            <p>幫助</p>
            <ul className='info'>
              <li className='infoItem'>大宗採購</li>
              <li className='infoItem'>訊息公告</li>
              <li className='infoItem'>服務條款</li>
            </ul>
          </li>
          <li className='category'>
            <p>認識芭樂派</p>
            <ul className='info'>
              <li className='infoItem'>關於我們</li>
              <li className='infoItem'>媒體報導</li>
              <li className='infoItem'>全新</li>
              <li className='infoItem'>ESG-永續發展</li>
            </ul>
          </li>
        
         
        </ul>
      </div>
      <style jsx>
        {`
          .wrap{
            background-color:black;
            color:#14FF00;
            margin-top:10px;
            
          }
          ul{
            list-style:none;
            padding:0
          }

          .container{
            width:80vw;
            display:flex;
            margin:auto;
            justify-content:center;;
            padding:10px 0;
            font-size:12px;
          }
          .category{
            margin-right:60px;
          }
          .category p{
            text-decoration: underline;
            text-underline-offset: 5px;
            font-size:16px;
            color:#fff;
            margin:0;
            margin-bottom:5px;

          }
      `}
      </style>
    </>

  )
}
