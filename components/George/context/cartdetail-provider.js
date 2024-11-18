import { createContext, useState, useContext, useEffect } from "react";
import { QuantityProvider, useQuantity } from "./quantity-provider";
import { useTab } from "@/components/Liam/detail/top/tab-Context";
import axios from "axios";
import useFetchDB from "../hooks/usefetchDB";

const CartContext = createContext();

export const CartProvider = ({ children, mdBox, albumDetail, albumImages }) => {
  const { quantity } = useQuantity();
  const { planCartItems, plane } = useTab();
  const [addToCart, setAddToCart] = useState({
    price: parseInt(albumDetail?.p_albums_price) || 0,
    singer: albumDetail?.p_albums_artist || "",
    quantity: quantity || 0,
    description: albumDetail?.p_albums_description || "",
    pic: albumImages?.images?.[0]?.p_productsimg_filename,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [toOrder, setToOrder] = useState([]);
  const { listData } = useFetchDB();
  const [dataBox, setDataBox] = useState([]);


  // 選取專輯
  const handleSelectItem = (id) => {
    setSelectedItems((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id];

      // 立即更新 toOrder
      const selectForOrder = cartItems.filter((v) =>
        updated.includes(v.p_albums_id)
      );
      setToOrder(selectForOrder);

      return updated; // 確保 `selectedItems` 正確更新
    });
  };

  //一鍵全選
  const selectAllItems = (All) => {
    if (All) {
      const allIds = cartItems.map((item) => {
        return item.p_albums_id;
      });
      setSelectedItems(allIds);
    } else {
      setSelectedItems([]);
    }
  };

  // 總金額計算
  const calculateTotalAmount = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.p_albums_id))
      .reduce(
        (total, item) => total + item.p_cart_price * item.p_cart_quantity,
        0
      );
  };

  // 新增 & 修改數量(傳後端)
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

  

  // 新增數量(前端)
  const handleIncrement = (id) => {
    setDataBox((prevDataBox) =>
      prevDataBox.map((item) => {
        if (item.p_albums_id === id || item.f_plan_id === id) {
          return { ...item, p_cart_quantity: item.p_cart_quantity + 1 };
        }
        return item;
      })
    );
  
    // 發送 API 更新資料庫
    const updatedItem = dataBox.find(
      (item) => item.p_albums_id === id || item.f_plan_id === id
    );

    if (updatedItem) {
      updateCartQuantityInDB(id, updatedItem.p_cart_quantity + 1);
    }
  };

  //減少數量(前端)
  const handleDecrement = (id) => {
    // 發送 API 更新資料庫
    const updatedItem = cartItems.find((v) => v.p_albums_id === id);
    if (updatedItem.p_cart_quantity <= 1) {
      // const confirmDelete = window.confirm("您確定要刪除此商品嗎？");
      // if(confirmDelete){
      setCartItems((items) => items.filter((v) => v.p_albums_id !== id));
      // deleteItemFromDB(id);
      // }
      return;
    }

    setCartItems((pre) =>
      pre.map((v) =>
        v.p_albums_id === id && v.p_cart_quantity > 1
          ? { ...v, p_cart_quantity: v.p_cart_quantity - 1 }
          : v
      )
    );

    updateCartQuantityInDB(id, updatedItem.p_cart_quantity - 1);
  };

  // 刪除
  const deleteItemFromDB = async (deid) => {
    console.log("刪除商品的 ID: ", deid);
    try {
      const response = await axios.delete(
        `http://localhost:3005/api/deleteFromCart/${deid}`
      );
      console.log("商品已從資料庫刪除: ", response.data);
    } catch (error) {
      console.error("刪除商品失敗", error);
    }
  };

  // 確認刪除
  const handleDeleteClick = (id) => {
    const thisQ = cartItems.find((v) => v.p_albums_id === id);
    if (!thisQ) return;
    console.log("有東西咪: ", thisQ);

    if (thisQ.p_cart_quantity <= 1) {
      setShowConfirm(true);
      setItemToDelete(id);
    } else {
      handleDecrement(id);
    }
  };

  const confirmDelete = () => {
    if (itemToDelete !== null) {
      handleDecrement(itemToDelete);
      deleteItemFromDB(itemToDelete);
      setShowConfirm(false);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false); // 關閉確認框
  };

  //詳細內容頁 一次加入購物車
  const handleAddtoCart = () => {
    console.log("快樂大集合1: ", albumDetail);
    console.log("快樂大集合2: ", planCartItems);
    if (albumDetail !== undefined) {
      const cartDataArray = planCartItems.map((item) => {
        return {
          f_plan_id: item.f_plan_id,
          albumId: null,
          userId: 1,
          pic: item.f_plan_picture,
          quantity: item.p_cart_quantity,
          price: parseInt(item.p_plan_amount),
        };
      });
      axios
        .post("http://localhost:3005/api/addToCart", cartDataArray)
        .then((response) => {
          console.log("Item added to cart", response.data);
        })
        .catch((error) => {
          console.error("Error adding item to cart", error);
        });
    } else {
      // 準備要傳送的資料
      const cartData = {
        f_plan_id: null,
        albumId: albumDetail?.p_albums_id,
        userId: 1,
        pic: albumImages?.images?.[0]?.p_productsimg_filename,
        quantity: quantity,
        price: parseInt(albumDetail?.p_albums_price),
      };
      console.log("要送出去ㄌ: ", cartData);
      // 發送 POST 請求將資料儲存到購物車
      axios
        .post("http://localhost:3005/api/addToCart", cartData)
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

  // 準備order
  useEffect(() => {
    if (selectedItems) {
      const selectForOrder = cartItems.filter((v) =>
        selectedItems.includes(v.p_albums_id)
      );
      setToOrder(selectForOrder);
    }
  }, [selectedItems, cartItems]);

  // 資料寫進cartItems from mdBox
  useEffect(() => {
    if (mdBox && mdBox.length > 0) {
      setCartItems(mdBox);
    }
  }, [mdBox]);

  // 合併募資、商城購物車
  useEffect(() => {
    if (listData && planCartItems && plane && cartItems) {
      // 首先過濾相符的商品
      const container = listData.rows
        .filter((item) =>
          cartItems.some((v) => v.p_albums_id === item.p_albums_id)
        )
        .map((item) => {
          // 找到對應的購物車項目
          const cartItem = cartItems.find(
            (v) => v.p_albums_id === item.p_albums_id
          );
          // 回傳合併後的物件，包含 p_cart_img_filename
          return {
            ...item,
            p_cart_img_filename: cartItem?.p_cart_img_filename,
            p_cart_quantity: cartItem?.p_cart_quantity,
            p_cart_price: cartItem?.p_cart_price,
          };
        });
      console.log("商品容器:", container);

      // 過濾相符的方案
      const planContainer = plane
        .filter((item) =>
          cartItems.some((cartItem) => cartItem.f_plan_id === item.f_plan_id)
        )
        .map((item) => {
          // 找到對應的購物車項目
          const cartItem = cartItems.find(
            (v) => v.f_plan_id === item.f_plan_id
          );
          // 回傳合併後的物件，包含 p_cart_img_filename
          return {
            ...item,
            p_cart_img_filename: cartItem?.p_cart_img_filename,
            p_cart_quantity: cartItem?.p_cart_quantity,
            p_cart_price: cartItem?.p_cart_price,
          };
        });
      console.log("方案容器:", planContainer);

      // 合併兩個容器
      const mergedContainer = [...container, ...planContainer];

      // 設定狀態
      setDataBox(mergedContainer);

      console.log("合併後的資料:", mergedContainer);
    }
  }, [listData, planCartItems, plane, cartItems]);



  useEffect(() => {
    console.log("給訂單: ", listData);
    console.log("plane: ", plane);
  }, [listData, plane]);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        setAddToCart,
        handleAddtoCart,
        showAlert,
        handleIncrement,
        handleDecrement,
        cartItems,
        setCartItems,
        selectedItems,
        handleSelectItem,
        calculateTotalAmount,
        selectAllItems,
        showConfirm,
        confirmDelete,
        cancelDelete,
        handleDeleteClick,
        toOrder,
        dataBox,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartDetail = () => useContext(CartContext);
