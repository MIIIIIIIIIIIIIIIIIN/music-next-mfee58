import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Filter } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./waterfall.module.css";

// 常數定義
const MUSIC_CATEGORIES = [
  { id: "all", name: "全部" },
  { id: "Rock", name: "Rock" },
  { id: "Pop", name: "Pop" },
  { id: "Blue", name: "Blue" },
  { id: "Soul", name: "Soul" },
];

const PRICE_RANGES = [
  { id: "all", label: "全部", min: 0, max: Infinity },
  { id: "under-500", label: "50000 以下", min: 0, max: 500 },
  { id: "50001-100000", label: "50001-100000", min: 501, max: 1000 },
  { id: "above-100000", label: "100000 以上", min: 1001, max: Infinity },
];

const TIME_RANGES = [
  { id: "all", label: "全部" },
  { id: "latest", label: "由新到舊" },
  { id: "oldest", label: "由舊到新" },
];

// 日期格式化
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const WaterfallLayout = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    category: "all",
    price: "all",
    time: "all",
  });
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [plane, setPlane] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // 資料獲取
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3005/fundraiser/list");
        const data = await response.json();
        if (data.rows) {
          setItems(data.rows);
          setFilteredItems(data.rows);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchPlane = async () => {
      try {
        // 發送請求
        if (!router.isReady) return;

        const { project } = router.query;

        const response = await fetch(
          `http://localhost:3005/fundraiser/plane/${project}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        if (result.data && Array.isArray(result.data)) {
          setPlane(result.data);
        }
      } catch (error) {
        console.error("Error fetching plane data:", error);
      }
    };
    fetchPlane();
    fetchData();
  }, []);

  // 篩選邏輯
  useEffect(() => {
    let result = [...items];

    // 類別篩選
    if (filters.category !== "all") {
      result = result.filter((item) => item.f_tag === filters.category);
    }

    // 價格篩選
    if (filters.price !== "all") {
      const priceRange = PRICE_RANGES.find(
        (range) => range.id === filters.price
      );
      if (priceRange) {
        result = result.filter(
          (item) =>
            item.f_project_amount >= priceRange.min &&
            item.f_project_amount <= priceRange.max
        );
      }
    }

    // 時間排序
    if (filters.time !== "all") {
      result.sort((a, b) => {
        const timeA = new Date(a.f_project_current).getTime();
        const timeB = new Date(b.f_project_current).getTime();
        return filters.time === "latest" ? timeB - timeA : timeA - timeB;
      });
    }

    setFilteredItems(result);
  }, [filters, items]);

  // 重置篩選
  const resetFilters = () => {
    setFilters({
      category: "all",
      price: "all",
      time: "all",
    });
    setCurrentPage(1); // 重置頁碼
  };

  const totalPeople = plane.reduce(
    (sum, element) => sum + Number(element.f_plan_people),
    0
  );

  const totalMoney = plane.reduce(
    (sum, element) =>
      sum + Number(element.f_plan_people) * Number(element.f_plan_amount),
    0
  );

  const progressPercentage = items
    ? Math.min((totalMoney / items.f_project_amount) * 100, 100)
    : 0;

  // 分頁邏輯
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 篩選面板
  const FilterPanel = () => (
    <div className={styles.filterPanel}>
      {/* 音樂類別篩選 */}
      <div className={styles.filterGroup}>
        <h3>音樂類別</h3>
        <div className={styles.filterButtonsContainer}>
          {/* <button 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${styles.filterButton} ${styles.prevButton} ${currentPage === 1 ? styles.disabled : ''}`}
          >
            <ChevronLeft size={16} />
          </button> */}
          {MUSIC_CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={`${styles.filterButton} ${
                filters.category === category.id ? styles.active : ""
              }`}
              onClick={() => {
                setFilters((prev) => ({ ...prev, category: category.id }));
                setCurrentPage(1); // 更新頁碼為第一頁
              }}
            >
              {category.name}
            </button>
          ))}
          {/* <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${styles.filterButton} ${styles.nextButton} ${
              currentPage === totalPages ? styles.disabled : ""
            }`}
          >
            <ChevronRight size={16} />
          </button> */}
        </div>
      </div>

      {/* 價格範圍篩選 */}
      <div className={styles.filterGroup}>
        <h3>價格範圍</h3>
        <div className={styles.filterButtonsContainer}>
          {/* <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${styles.filterButton} ${styles.prevButton} ${
              currentPage === 1 ? styles.disabled : ""
            }`}
          >
            <ChevronLeft size={16} />
          </button> */}
          {PRICE_RANGES.map((range) => (
            <button
              key={range.id}
              className={`${styles.filterButton} ${
                filters.price === range.id ? styles.active : ""
              }`}
              onClick={() => {
                setFilters((prev) => ({ ...prev, price: range.id }));
                setCurrentPage(1); // 更新頁碼為第一頁
              }}
            >
              {range.label}
            </button>
          ))}
          {/* <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${styles.filterButton} ${styles.nextButton} ${
              currentPage === totalPages ? styles.disabled : ""
            }`}
          >
            <ChevronRight size={16} />
          </button> */}
        </div>
      </div>

      {/* 時間排序 */}
      <div className={styles.filterGroup}>
        <h3>上架時間</h3>
        <div className={styles.filterButtonsContainer}>
          {/* <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${styles.filterButton} ${styles.prevButton} ${
              currentPage === 1 ? styles.disabled : ""
            }`}
          >
            <ChevronLeft size={16} />
          </button> */}
          {TIME_RANGES.map((range) => (
            <button
              key={range.id}
              className={`${styles.filterButton} ${
                filters.time === range.id ? styles.active : ""
              }`}
              onClick={() => {
                setFilters((prev) => ({ ...prev, time: range.id }));
                setCurrentPage(1); // 更新頁碼為第一頁
              }}
            >
              {range.label}
            </button>
          ))}
          {/* <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${styles.filterButton} ${styles.nextButton} ${
              currentPage === totalPages ? styles.disabled : ""
            }`}
          >
            <ChevronRight size={16} />
          </button> */}
        </div>
      </div>
    </div>
  );

  // 載入中狀態
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* 篩選控制區 */}
      <div className={styles.filterControl}>
        <button
          className={styles.filterToggle}
          onClick={() => setShowFilter(!showFilter)}
        >
          <Filter size={20} />
          篩選條件
          {Object.values(filters).some((value) => value !== "all") && (
            <span className={styles.filterBadge} />
          )}
        </button>

        {/* 已選擇的篩選條件 */}
        {Object.values(filters).some((value) => value !== "all") && (
          <div className={styles.activeFilters}>
            {filters.category !== "all" && (
              <span className={styles.filterTag}>
                {
                  MUSIC_CATEGORIES.find((cat) => cat.id === filters.category)
                    ?.name
                }
              </span>
            )}
            {filters.price !== "all" && (
              <span className={styles.filterTag}>
                {
                  PRICE_RANGES.find((range) => range.id === filters.price)
                    ?.label
                }
              </span>
            )}
            {filters.time !== "all" && (
              <span className={styles.filterTag}>
                {TIME_RANGES.find((range) => range.id === filters.time)?.label}
              </span>
            )}
            <button className={styles.clearFilters} onClick={resetFilters}>
              清除全部
            </button>
          </div>
        )}
      </div>

      {/* 篩選面板 */}
      {showFilter && <FilterPanel />}

      {/* 商品列表 */}
      <div className={styles.waterfallContainer}>
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div key={item.f_project_id} className={styles.waterfallItem}>
              <div className={styles.itemImageContainer}>
                <img
                  src={item.f_project_picture}
                  alt={item.f_project_name}
                  className={styles.itemImage}
                  loading="lazy"
                />
              </div>
              <div className={styles.itemInfo}>
                <span className={styles.itemCategory}>{item.f_tag}</span>
                <h3 className={styles.itemTitle}>{item.f_project_name}</h3>
                <p className={styles.itemPrice}>${totalMoney}</p>
                <span className={styles.itemDate}>
                  {formatDate(item.f_project_current)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            <p>沒有符合條件的商品</p>
            <button className={styles.resetButton} onClick={resetFilters}>
              重置篩選條件
            </button>
          </div>
        )}
      </div>

      {filteredItems.length > itemsPerPage && (
        <div className={styles.pagination}>
            <button 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${styles.filterButton} ${styles.prevButton} ${currentPage === 1 ? styles.disabled : ''}`}
          >
            <ChevronLeft size={16} />
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`${styles.pageButton} ${
                currentPage === index + 1 ? styles.activePage : ""
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${styles.filterButton} ${styles.nextButton} ${
              currentPage === totalPages ? styles.disabled : ""
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default WaterfallLayout;
