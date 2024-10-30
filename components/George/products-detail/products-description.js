import React from "react";
import style from "./products-description.module.css";

export default function ProductsDescription() {
  return (
    <>
      <div className={style.containDescription}>
        {/* 左邊圖 */}
        <div className={style.imgBox}>
          <div className={style.topImageBox}>
            <img
              src="/George/products-images-350px/products-(98).jpg"
              alt=""
              className={style.topImage}
            />
          </div>
          <div className={style.bottomImagesBox}>
            <img
              src="/George/products-images-350px/products-(102).jpg"
              alt=""
              className={style.bottomImages}
            />
            <img
              src="/George/products-images-350px/products-(101).jpg"
              alt=""
              className={style.bottomImages}
            />
          </div>
        </div>
        {/* 右邊詳述 */}
        <div className={style.desBox}>
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum impedit
            consequatur officiis cumque amet quo quia? Velit cupiditate aperiam
            laborum labore in itaque obcaecati vero, corporis, nihil inventore
            magni hic?
          </p>
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum impedit
            consequatur officiis cumque amet quo quia? Velit cupiditate aperiam
            laborum labore in itaque obcaecati vero, corporis, nihil inventore
            magni hic?
          </p>
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum impedit
            consequatur officiis cumque amet quo quia? Velit cupiditate aperiam
            laborum labore in itaque obcaecati vero, corporis, nihil inventore
            magni hic?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum impedit
            consequatur officiis cumque amet quo quia? Velit cupiditate aperiam
            laborum labore in itaque obcaecati vero, corporis, nihil inventore
            magni hic?
          </p>
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum impedit
            consequatur officiis cumque amet quo quia? Velit cupiditate aperiam
            laborum labore in itaque obcaecati vero, corporis, nihil inventore
            magni hic?            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum impedit
            consequatur officiis cumque amet quo quia? Velit cupiditate aperiam
            laborum labore in itaque obcaecati vero, corporis, nihil inventore
            magni hic?            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum impedit
            consequatur officiis cumque amet quo quia? Velit cupiditate aperiam
            laborum labore in itaque obcaecati vero, corporis, nihil inventore
            magni hic?
          </p>
        </div>
      </div>
    </>
  );
}
