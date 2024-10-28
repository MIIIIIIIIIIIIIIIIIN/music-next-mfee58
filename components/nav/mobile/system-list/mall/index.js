export default function MallList() {
  return (
    <>
      <div className="container display">
        <div className="triangle"></div>
        <ul>
          <li className="item">
            <a href="#">
            <div className="info">
              <p>Pop</p>
            </div>
            </a>
          </li>
          <li className="item">
            <a href="#">
            <div className="info">
              <p>Rock</p>
            </div>
            </a>
          </li>
          <li className="item">
            <a href="#">
            <div className="info">
              <p>Blue</p>
            </div>
            </a>
          </li>
          <li className="item">
            <a href="#">
            <div className="info">
              <p>Soul</p>
            </div>
            </a>
          </li>
        </ul>
      </div>
      <style jsx>
        {`
        li a{
          display:block;
          padding:5px
        }
        `}
      </style>
    </>
  );
}
