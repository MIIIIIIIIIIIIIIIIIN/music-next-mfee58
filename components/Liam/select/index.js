import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, ShoppingCart, ArrowLeft } from "lucide-react";
import styles from "./product-selector.module.css";

// Constants
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

// Component
export const ProductSelector = ({ selectedPlan }) => {
  // State
  const [albumInfo] = useState(INITIAL_ALBUM_INFO);
  const [products, setProducts] = useState([]);
  const [faqs] = useState(INITIAL_FAQS);
  const [showCart, setShowCart] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showFaqs, setShowFaqs] = useState(false);

  // Effects
  useEffect(() => {
    if (selectedPlan) {
      initializeProducts(selectedPlan);
    }
  }, [selectedPlan]);

  // Handlers
  const initializeProducts = (plan) => {
    setProducts((prev) => {
      const hasPromotion = prev.some((p) => p.type === "優惠方案");
      if (!hasPromotion) {
        const promotionProduct = {
          id: 1,
          ...plan,
          imageUrl: "/01.jpg",
        };
        const addOnProduct = {
          id: 2,
          type: "加購方案",
          name: "黃金一年會員資格請訂閱",
          price: 1300,
          imageUrl: "/01.jpg",
        };
        return [promotionProduct, addOnProduct];
      }
      return prev;
    });

    setQuantities({
      1: 1, // 優惠方案初始數量
      2: 0, // 加購方案初始數量
    });
  };

  const handleQuantityChange = (productId, change) => {
    setQuantities((prev) => {
      const newQuantity = Math.max(0, (prev[productId] || 0) + change);
      return { ...prev, [productId]: newQuantity };
    });
  };

  const calculateTotal = () => {
    return products.reduce(
      (total, product) => total + product.price * (quantities[product.id] || 0),
      0
    );
  };

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  // Derived state
  const cartItems = products
    .filter((product) => quantities[product.id] > 0)
    .map((product) => ({
      ...product,
      quantity: quantities[product.id],
    }));

  const hasItems = products.some((product) => quantities[product.id] > 0);

  // Render methods
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
            <div className={styles.productName}>{product.name}</div>
            <div className={styles.priceText}>
              ${product.price.toLocaleString()}
            </div>
          </div>
          <div className={styles.priceSection}>
            <div className={styles.quantityControls}>
              <button
                onClick={() => handleQuantityChange(product.id, -1)}
                className={styles.quantityButton}
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

  // Cart View
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
                <button className={styles.checkoutButton}>前往結帳</button>
              </div>
            </>
          ) : (
            <div className={styles.emptyText}>購物車是空的</div>
          )}
        </div>
      </div>
    );
  }

  // Main View
  return (
    <div className={styles.wrapper}>
      <div className={styles.albumHeader}>
        <div className={styles.albumTitle}>
          <button>返回</button>
          <span>{albumInfo.title}</span>
          <span className={styles.albumSubtitle}>{albumInfo.subtitle}</span>
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
                onClick={() => setShowCart(true)}
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
