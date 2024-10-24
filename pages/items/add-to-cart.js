import { AddToCartBar } from "@/components/public/addtocart-bar/add-to-cart";

export default function AddToCart() {
  return (
    <>
      <h1>Please scroll down the screen ↓</h1>
      <AddToCartBar />
      <div className="container"></div>
      <div className="container"></div>

      <style jsx>{`
        .container{
          width: 1500px;
          height: 100vh;
          margin: auto;
          background: Cornsilk;
        }
        h1{
          text-align: center;
        }
        `}</style>
    </>
  );
}
