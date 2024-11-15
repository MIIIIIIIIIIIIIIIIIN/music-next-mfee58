import { createContext, useState, useContext, useEffect } from "react";
import { QuantityProvider, useQuantity } from "./quantity-provider";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children, mdBox, albumDetail, albumImages }) => {
  const { quantity } = useQuantity();
  const [addToCart, setAddToCart] = useState({
    price: parseInt(albumDetail?.p_albums_price) || 0,
    singer: albumDetail?.p_albums_artist || "",
    quantity: quantity || 0,
    description: albumDetail?.p_albums_description || "",
    pic: albumImages?.images?.[0]?.p_productsimg_filename,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (mdBox && mdBox.length > 0) {
      setCartItems(mdBox);
    }
  }, [mdBox]);

  const updateCartQuantityInDB = async (id, quantity) => {
    const item = cartItems.find((v) => v.p_albums_id === id);
    if (!item) return;
    try {
      const response = await axios.post("http://localhost:3005/api/addToCart", {
        commodity_id: item.p_commodity_id,
        albumId: item.p_albums_id,
        userId: item.user_id,
        pic: item.p_cart_img_filename,
        quantity: quantity - item.p_cart_quantity, // 確保傳遞的差異數，後端的判斷需要的是差異數不是最終數
        price: item.p_cart_price,
      });
      console.log("更新資料庫成功: ", response.data);
    } catch (error) {
      console.error("更新資料庫失敗", error);
    }
  };

  const handleIncrement = (id) => {
    setCartItems((pre) =>
      pre.map((v) =>
        v.p_albums_id === id
          ? { ...v, p_cart_quantity: v.p_cart_quantity + 1 }
          : v
      )
    );
    // 發送 API 更新資料庫
    const updatedItem = cartItems.find((v) => v.p_albums_id === id);
    updateCartQuantityInDB(id, updatedItem.p_cart_quantity + 1);
  };

  const handleDecrement = (id) => {
    setCartItems((pre) =>
      pre.map((v) =>
        v.p_albums_id === id && v.p_cart_quantity > 1
          ? { ...v, p_cart_quantity: v.p_cart_quantity - 1 }
          : v
      )
    );
    // 發送 API 更新資料庫
    const updatedItem = cartItems.find((v) => v.p_albums_id === id);
    if (updatedItem.p_cart_quantity > 1) {
      updateCartQuantityInDB(id, updatedItem.p_cart_quantity - 1);
    }
  };

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
    setTimeout(() => setShowAlert(false), 2500); 
  };

  return (
    <CartContext.Provider
      value={{ addToCart, setAddToCart, handleAddtoCart, showAlert, handleIncrement, handleDecrement, cartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartDetail = () => useContext(CartContext);
