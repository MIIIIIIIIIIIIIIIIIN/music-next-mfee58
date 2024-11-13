import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { ChevronDown, ChevronUp, ShoppingCart, ArrowLeft } from "lucide-react";
import styles from "./product-selector.module.css";

const INITIAL_ALBUM_INFO = {
  title: "[音樂創作 x 夢研]",
  subtitle: "unlized",
};

const INITIAL_FAQS = [
  {
    id: 1,
    question: "如何購買會員資格？",
    answer: "選擇您想要的方案，點選加入購物車後進行結帳即可完成購買。",
  },
  {
    id: 2,
    question: "會員權益何時生效？",
    answer: "付款完成後立即生效，系統會自動開通您的會員權限。",
  },
  {
    id: 3,
    question: "可以更換或退費嗎？",
    answer: "會員資格一經購買成功後，除系統故障外，恕不接受更換或退費。",
  },
];

export const ProductSelector = ({ selectedPlan, setShowProductSelector, plane }) => {
  const router = useRouter();
  const [albumInfo] = useState(INITIAL_ALBUM_INFO);
  const [products, setProducts] = useState([]);
  const [faqs] = useState(INITIAL_FAQS);
  const [showCart, setShowCart] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showFaqs, setShowFaqs] = useState(false);

  // 初始化商品資料
  useEffect(() => {
    if (plane && plane.length > 0) {
      const productList = plane.map(plan => ({
        id: plan.f_plan_id,
        type: "優惠方案",
        name: plan.f_plan_title,
        price: plan.f_plan_amount,
        imageUrl: plan.f_plan_picture || "/01.jpg",
        description: plan.f_plan_content,
        people: plan.f_plan_people
      }));

      productList.push({
        id: 'addon-1',
        type: "加購方案",
        name: "黃金一年會員資格請訂閱",
        price: 1300,
        imageUrl: "/01.jpg",
      });

      setProducts(productList);

      // 初始化商品數量
      const initialQuantities = {};
      productList.forEach(product => {
        initialQuantities[product.id] = product.id === selectedPlan?.f_plan_id ? 1 : 0;
      });
      setQuantities(initialQuantities);
    }
  }, [plane, selectedPlan]);

  // 處理數量改變
  const handleQuantityChange = (productId, change) => {
    setQuantities(prev => {
      const currentQuantity = prev[productId] || 0;
      const newQuantity = Math.max(0, currentQuantity + change);
      console.log(`商品 ${productId} 數量更新:`, newQuantity);
      return { ...prev, [productId]: newQuantity };
    });
  };

  // 計算總金額
  const calculateTotal = () => {
    return products.reduce(
      (total, product) => total + product.price * (quantities[product.id] || 0),
      0
    );
  };

  // FAQ 相關功能
  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const renderFaqs = () => (
    <div className={styles.faqSection}>
      <button
        onClick={() => setShowFaqs(!showFaqs)}
        className={styles.faqToggle}
      >
        <span>常見問題</span>
        {showFaqs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {showFaqs && (
        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <div key={faq.id} className={styles.faqItem}>
              <button
                onClick={() => toggleFaq(faq.id)}
                className={styles.faqQuestion}
              >
                <span>{faq.question}</span>
                {expandedFaq === faq.id ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
              {expandedFaq === faq.id && (
                <div className={styles.faqAnswer}>{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // 購物車項目處理
  const cartItems = products
    .filter((product) => quantities[product.id] > 0)
    .map((product) => ({
      ...product,
      quantity: quantities[product.id],
    }));

  const hasItems = cartItems.length > 0;

  // 處理加入購物車
  const handleCartButtonClick = () => {
    console.log("當前購物車商品:", cartItems.map(item => ({
      商品名稱: item.name,
      數量: item.quantity,
      價格: item.price,
      總價: item.price * item.quantity
    })));
    setShowCart(true);
  };

  // 處理結帳
  const handlePayment = () => {
    const paymentProducts = cartItems.map(item => ({
      productName: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    console.log("結帳商品資訊:", paymentProducts);
    
    const productsParam = encodeURIComponent(JSON.stringify(paymentProducts));
    
    router.push({
      pathname: 'http://localhost:3001/payment',
      query: { products: productsParam }
    });
  };

  // 渲染商品項目
  const renderProductItem = (product) => (
    <div key={product.id} className={styles.productItem}>
      <div className={styles.productContent}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className={styles.productImage}
        />
        <div className={styles.productDetails}>
          <div>
            <div className={styles.productType}>{product.type}</div>
            <div className={styles.productName}>{product.name}</div>
            {product.description && (
              <div className={styles.productDescription}>{product.description}</div>
            )}
            <div className={styles.priceText}>
              ${product.price.toLocaleString()}
            </div>
            {product.people !== undefined && (
              <div className={styles.peopleCount}>已有 {product.people} 人贊助</div>
            )}
          </div>
          <div className={styles.priceSection}>
            <div className={styles.quantityControls}>
              <button
                onClick={() => handleQuantityChange(product.id, -1)}
                className={styles.quantityButton}
                disabled={quantities[product.id] <= 0}
              >
                -
              </button>
              <span className={styles.quantityText}>
                {quantities[product.id] || 0}
              </span>
              <button
                onClick={() => handleQuantityChange(product.id, 1)}
                className={styles.quantityButton}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 購物車視圖
  if (showCart) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.cartHeader}>
          <button
            onClick={() => setShowCart(false)}
            className={styles.backButton}
          >
            <ArrowLeft size={20} />
            返回
          </button>
          <h1 className={styles.cartTitle}>購物車</h1>
        </div>

        <div className={styles.summary}>
          {cartItems.length > 0 ? (
            <>
              <div className={styles.itemList}>
                {cartItems.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className={styles.productImage}
                    />
                    <div className={styles.productDetails}>
                      <div className={styles.typeText}>{item.type}</div>
                      <div className={styles.productName}>{item.name}</div>
                      <div className={styles.priceText}>
                        ${item.price.toLocaleString()} x {item.quantity}
                      </div>
                    </div>
                    <div className={styles.priceText}>
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.divider}>
                <div className={styles.totalRow}>
                  <span>總計</span>
                  <span>${calculateTotal().toLocaleString()}</span>
                </div>
                <button onClick={handlePayment} className={styles.checkoutButton}>
                  前往結帳
                </button>
              </div>
            </>
          ) : (
            <div className={styles.emptyText}>購物車是空的</div>
          )}
        </div>
      </div>
    );
  }

  // 主視圖
  return (
    <div className={styles.wrapper}>
      <div className={styles.albumHeader}>
        <div className={styles.albumTitle}>
          <button 
            className={styles.back}
            onClick={() => setShowProductSelector(false)}
          >
            <ArrowLeft size={20} />返回
          </button>
          <h5 className={styles.title}>
            {albumInfo.title}
            <span className={styles.albumSubtitle}>{albumInfo.subtitle}</span>
          </h5>
        </div>
      </div>

      <div className={styles.productLayout}>
        <div className={styles.leftSection}>
          <div className={styles.sectionTitle}>優惠方案</div>
          <div className={styles.productsGrid}>
            {products
              .filter((product) => product.type === "優惠方案")
              .map(renderProductItem)}
          </div>

          <div className={styles.sectionTitle}>加購方案</div>
          <div className={styles.productsGrid}>
            {products
              .filter((product) => product.type === "加購方案")
              .map(renderProductItem)}
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.summary}>
            <div className={styles.summaryTitle}>訂單摘要</div>
            <div className={styles.itemList}>
              {hasItems ? (
                products.map(
                  (product) =>
                    quantities[product.id] > 0 && (
                      <div key={product.id} className={styles.summaryItem}>
                        <span>{product.name}</span>
                        <span>x {quantities[product.id]}</span>
                      </div>
                    )
                )
              ) : (
                <div className={styles.emptyText}>尚未選擇商品</div>
              )}
            </div>

            <div className={styles.divider}>
              <div className={styles.totalRow}>
                <span>總計</span>
                <span>${calculateTotal().toLocaleString()}</span>
              </div>
            </div>

            {renderFaqs()}

            <div className={styles.divider}>
              <button
                className={styles.cartButton}
                onClick={handleCartButtonClick}
                disabled={!hasItems}
              >
                <ShoppingCart size={20} />
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSelector;