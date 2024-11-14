import { createContext, useState, useContext } from "react";
import { QuantityProvider, useQuantity } from "./quantity-provider";

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

  return (
    <CartContext.Provider value={{ addToCart, setAddToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartDetail = () => useContext(CartContext);
