export default function MemberList() {
  return (
    <>
      <div className="container display">
        <div className="triangle"></div>
        <ul>
          <li className="item">
            <a href="/Jade/member-center">
            <div className="info">
              <p>基本資料</p>
            </div>
            </a>
          </li>
          <li className="item">
            <a href="#">
            <div className="info">
              <p>帳號設定</p>
            </div>
            </a>
          </li>
          <li className="item">
            <a href="#">
            <div className="info">
              <p>變更密碼</p>
            </div>
            </a>
          </li>
          {/* <li className="item">
            <a href="#">
            <div className="info">
              <p>訂單查詢</p>
            </div>
            </a>
          </li> */}
          <li className="item">
            <a href="#">
            <div className="info">
              <p>收藏名單</p>
            </div>
            </a>
          </li>
          {/* <li className="item">
            <a href="#">
            <div className="info">
              <p>帳號刪除</p>
            </div>
            </a>
          </li> */}
        </ul>
      </div>
      <style jsx>
        {`
        li{
          background-color:#333;
          border-bottom: .5px solid #fff

        }
        li a{
          display:block;
          padding:5px;
          color:#fff;
          border-bottom:#fff
        }
        `}
      </style>
    </>
  );
}
