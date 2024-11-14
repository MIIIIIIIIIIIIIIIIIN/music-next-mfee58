import { createContext, useState, useContext } from "react";
import { QuantityProvider, useQuantity } from "./quantity-provider";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children, albumDetail, albumImages }) => {
  const { quantity } = useQuantity();
  const [addToCart, setAddToCart] = useState({
    price: parseInt(albumDetail?.p_albums_price) || 0,
    singer: albumDetail?.p_albums_artist || "",
    quantity: quantity || 0,
    description: albumDetail?.p_albums_description || "",
    pic: albumImages?.images?.[0]?.p_productsimg_filename,
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleAddtoCart = () => {
    if (albumDetail) {
      // 準備要傳送的資料
      const cartData = {
        commodityid: null,
        albumId: albumDetail?.p_albums_id || null,
        userId: 1,
        pic: albumImages?.images?.[0]?.p_productsimg_filename,
        quantity: quantity,
        price: parseInt(albumDetail?.p_albums_price),
      };

      // 發送 POST 請求將資料儲存到購物車
      axios
      .post("http://localhost:3005/api/addToCar", cartData)
      .then((response) => {
        console.log("Item added to cart", response.data);
      })
        .catch((error) => {
          console.error("Error adding item to cart", error);
        });
    }
    setShowAlert(true); 
    console.log("showAlert set to true"); 
    setTimeout(() => setShowAlert(false), 1000); 
  };

  return (
    <CartContext.Provider
      value={{ addToCart, setAddToCart, handleAddtoCart, showAlert }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartDetail = () => useContext(CartContext);
