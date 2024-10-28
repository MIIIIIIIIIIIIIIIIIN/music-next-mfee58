import React from 'react'
import Button from '@/components/public/buttons'
import Heart from '@/components/hearts'
import WhiteWBtns from '@/components/public/white_wbtns'

export default function Commodity1() {
  return (
    <>
      <div className='container'>
        <div className='left'>
          <ul>
            <li>
              <a href='#'>
                <div className='crossImg'>
                  <img />
                </div>
                <div className='bottom'>
                  <h3 >
                    xxxxx
                  </h3>
                  <p>
                    xxxxxxxxxxxxxxxxxxxxxxxx
                  </p>
                </div>
              </a>
            </li>
            <li>
              <a href='#'>
                <div className='crossImg'>
                  <img />
                </div>
                <div className='bottom'>
                  <h3 >
                    xxxxx
                  </h3>
                  <p>
                    xxxxxxxxxxxxxxxxxxxxxxxx
                  </p>
                </div>
              </a>
            </li>
            <li>
              <a href='#'>
                <div className='crossImg'>
                  <img />
                </div>
                <div className='bottom'>
                  <h3 >
                    xxxxx
                  </h3>
                  <p>
                    xxxxxxxxxxxxxxxxxxxxxxxx
                  </p>
                </div>
              </a>
            </li>
            <li>
              <a href='#'>
                <div className='crossImg'>
                  <img />
                </div>
                <div className='bottom'>
                  <h3 >
                    xxxxx
                  </h3>
                  <p>
                    xxxxxxxxxxxxxxxxxxxxxxxx
                  </p>
                </div>
              </a>
            </li>
            <li>
              <a href='#'>
                <div className='crossImg'>
                  <img />
                </div>
                <div className='bottom'>
                  <h3 >
                    xxxxx
                  </h3>
                  <p>
                    xxxxxxxxxxxxxxxxxxxxxxxx
                  </p>
                </div>
              </a>
            </li>
            <li>
              <a href='#'>
                <div className='crossImg'>
                  <img />
                </div>
                <div className='bottom'>
                  <h3 >
                    xxxxx
                  </h3>
                  <p>
                    xxxxxxxxxxxxxxxxxxxxxxxx
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div className='right'>
          <div className='img'>
            <div className='bg'>
              <img />
            </div>
            <ul className='sm'>
              <li>
                <img></img>
              </li>
              <li>
                <img></img>
              </li>
              <li>
                <img></img>
              </li>
            </ul>
            <WhiteWBtns type={3} style={{}}>前往專輯</WhiteWBtns>
            <div className='margin'></div>
            <WhiteWBtns type={3} >我的最愛</WhiteWBtns>
          </div>
        </div>

      </div>


      <style jsx>
        {`
        a{
          text-decoration:none;
          color:#333
        }
        .container{
          width:80%;
          display:flex;
          margin:auto;
          
        }
        .left{
          flex-grow:1;
        }
        .right{
          width:40%
        }
        .left ul{
          
          margin:auto;
          display:flex;
          flex-wrap:wrap;
          justify-content:center;
          list-style:none;
        }
        .left li{
          border:1px solid #ccc;
          width:20%;
          margin:0 30px;
          margin-bottom:30px
          
        }
        .left  .bottom{
          padding:10px;
          {/* width:100%; */}
        }
        .left .bottom h3{
          margin:0;
        }
        .left .bottom p{
          margin:0;
          word-wrap:break-word;;

        }

        .crossImg{
          width:100%;
        }
       
        .left  img{
            width:100%;
            height:150px;
            background-color:#ccc;
          }
          .bg img{
          width:100%;
          height:250px;
          background-color:#ccc;
        } 
          .right .img ul{
            padding:0;
            margin:10px 0;
            width:100%;
            display:flex;
            gap: 10px;
            list-style:none;
            justify-content:space-between;
          }
          .right li {
            flex-grow:1;
            
          }
          .right .sm img{
            width:100%;
            height:70px;
            background-color:#ccc;
          }
          .margin{
            margin:10px 0;
          }
        `}
      </style>
    </ >
  )
}
