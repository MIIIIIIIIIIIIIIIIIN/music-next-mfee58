import React, { useRef, useState, useEffect } from 'react'
import { FiSearch } from "react-icons/fi";
import { CiBellOn } from "react-icons/ci";
import { ProfileIcons } from "../ProfileIcons";
import Mall from './checklist/mall';
import Fundraising from './checklist/fundraising';
import Forum from './checklist/forum';

export default function Nav() {
  const [display, setDislay] = useState(false)
  const items = useRef(null)
  const input = useRef(null)


  const [displayMall, setDisplayMall] = useState(false);
  const [displayFundraising, setDisplayFundraising] = useState(false);
  const [displayForum, setDisplayForum] = useState(false);

  const [activeIndex, setActiveIndex] = useState(null);


  useEffect(()=>{
    
  },[])


  return (
    <>
      <div className='container'>
        <div className="logo">
          <img src="/logo.svg" />
        </div>
        <ul ref={items} className='nav'>
          <li className='item'
            onClick={(e) => {
              setDisplayMall(!displayMall);
              if(displayFundraising){
                setDisplayFundraising(false);
              }
              if(displayForum){
                setDisplayForum(false)
              }
              setActiveIndex(0);  // 設置當前索引為 1
            }}
            style={{ backgroundColor: activeIndex === 0 ? '#14ff00' : '#fff' }}
            
          // onMouseLeave={(e) => {
          //     setDisplayMall(false);  // 隱藏 Mall
          //     e.currentTarget.style.backgroundColor = '#fff';  // 還原背景顏色
          // }}
          >
            <div className="top">
            </div>
            <div className="bottom">
              <p>商城</p>
            </div>
          </li>
          {displayMall && <Mall  />}
          <li className='item'
            onClick={(e) => {
              setDisplayFundraising(!displayFundraising);
              if(displayMall){
                setDisplayMall(false)
              }
              if(displayForum){
                setDisplayFundraising(false)
              }
              setActiveIndex(1);
            }}
            style={{ backgroundColor: activeIndex === 1 ? '#14ff00' : '#fff' }}
            >
            <div className="top">

            </div>
            <div className="bottom">
              <p>募資</p>
            </div>
          </li>
          {displayFundraising && <Fundraising />}
          <li className='item'
            onClick={(e) => {
              setDisplayForum(!displayForum);
              if(displayMall){
                setDisplayMall(false)
              }
              if(displayFundraising){
                setDisplayFundraising(false);
              }
              setActiveIndex(2);
            }}
            style={{ backgroundColor: activeIndex === 2 ? '#14ff00' : '#fff' }}
          >
            <div className="top">

            </div>
            <div className="bottom">
              <p>論壇</p>
            </div>
          </li>
          {displayForum && <Forum />}
          <li className='item'>
            <div className="top">

            </div>
            <div className="bottom">
              <p>直播</p>
            </div>
          </li>
        </ul>
        <div className='search'>
          <input type='text' ref={input} />
          <span className='right' onClick={() => {
            setDislay(!display)
            if (!display) {
              // items.current.style.display='none';
              input.current.style.flexGrow = '1';
              setTimeout(() => {
                input.current.style.width = '300px';
                input.current.style.padding = '5px 5px';
              }, 100)

            } else if (display) {
              input.current.style.padding = '5px 0px';
              input.current.style.width = '0px';
              // items.current.style.display='block'
            }

          }}><FiSearch /></span>
        </div>


        <div className="icons-container">
          <ProfileIcons property1="XS" /> {/* 小尺寸圖示 */}
          <div className='icon'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M9 17V18C9 18.394 9.0776 18.7841 9.22836 19.1481C9.37913 19.512 9.6001 19.8427 9.87868 20.1213C10.1573 20.3999 10.488 20.6209 10.8519 20.7716C11.2159 20.9224 11.606 21 12 21C12.394 21 12.7841 20.9224 13.1481 20.7716C13.512 20.6209 13.8427 20.3999 14.1213 20.1213C14.3999 19.8427 14.6209 19.512 14.7716 19.1481C14.9224 18.7841 15 18.394 15 18V17M18 9C18 12 20 17 20 17H4C4 17 6 13 6 9C6 5.732 8.732 3 12 3C15.268 3 18 5.732 18 9Z" stroke="#686868" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div className='icon'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M15.9999 8H17.1596C18.1998 8 19.0663 8.79732 19.1527 9.83391L19.8194 17.8339C19.9165 18.9999 18.9964 20 17.8263 20H6.17348C5.0034 20 4.08322 18.9999 4.18039 17.8339L4.84705 9.83391C4.93344 8.79732 5.79997 8 6.84014 8H7.99988M15.9999 8H7.99988M15.9999 8L15.9999 7C15.9999 5.93913 15.5784 4.92172 14.8283 4.17157C14.0782 3.42143 13.0607 3 11.9999 3C10.939 3 9.9216 3.42143 9.17145 4.17157C8.42131 4.92172 7.99988 5.93913 7.99988 7L7.99988 8M15.9999 8L15.9999 12M7.99988 8L7.99988 12" stroke="#686868" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>


      </div>
      <style jsx>
        {`
                  

                    .container{
                        height:120.5px;
                        width:80vw;
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        margin:auto;
                        {/* overflow:hidden; */}
                        {/* border-bottom:1px solid #333; */}
                        
                    }

                   .logo{
                        width:60px;
                        height:60px;
                   } 
                   .logo:hover{
                        background-color:black;
                   }
                   .nav{
                    position:relative
                   }
                   .item{
                    border:1px solid #111;
                    display:inline-block;
                    position:relative;
                    margin-right:10px;
                   }
                   .item:hover .bottom{
                    background-color:#14ff00;
                    cursor:pointer;
                   
                   }
               
                  
                   .top{
                    border-bottom:1px solid #111;
                    padding:5px;
                    display:flex;
                   }

                   .item:hover .top{
                    background-color:#111;
                   }
                   .top img{
                    height:20px;
                    display:inline-block;
                   }
                   .top .line{

                   }
                   .left-icon{
                    margin:13px 13px;
                    height:1px;
                    background-color:black
                   }
                   .bottom{
                    padding:10px 20px;
                   }

                   .search{
                    display:flex;
                    border:1px solid #333;

                   }
                   .search input{
                    transition:2s;
                    background-color:#FFE100;
                    border:0px solid #333;
                    padding:5px 0;
                    width:0
                   }
                   .search .right:hover{
                    border-left:1px solid #333
                    
                   }
                  
                   .search .right{
                    padding:0 5px;
                    cursor:pointer;
                    display:flex;
                    justify-content: center;
                    align-items: center;
                   }


                   .icons-container{
                    display:flex;
                    width:15%;
                    justify-content: space-between;
                    align-items: center;

                   }
                   .icons-container .icon {
                    width:30px;
                    height:30px;
                    {/* background-color:black; */}
                    
                   }

                   .Mall{
                    position:absolute
                  }
                  .display{
                    display:none
                  }
                `}
      </style>
    </>
  )
}
