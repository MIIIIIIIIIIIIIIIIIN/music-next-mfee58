import React, { useState, useEffect } from "react";
import styles from "./form-option.module.css";

const Dropdown = ({ type, initialValue, onChange }) => {
  const [selectedValue, setSelectedValue] = useState("");

  // 當 initialValue 改變時，更新 selectedValue
  useEffect(() => {
    setSelectedValue(initialValue || "");
  }, [initialValue]);

  const handleSelectionChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value); // 將選中的值傳遞回父元件
  };

  return (
    <div>
      <select
        className={
          type === "gender" ? styles.genderDropdown : styles.regionDropdown
        }
        value={selectedValue}
        onChange={handleSelectionChange}
      >
        {type === "gender" ? (
          <>
            <option value="">請選擇</option>
            <option value="男">男</option>
            <option value="女">女</option>
            <option value="其他">其他</option>
          </>
        ) : (
          <>
  <option value="">請選擇</option>
  <option value="台北市">台北市</option>
  <option value="新北市">新北市</option>
  <option value="基隆市">基隆市</option>
  <option value="桃園市">桃園市</option>
  <option value="新竹市">新竹市</option>
  <option value="新竹縣">新竹縣</option>
  <option value="宜蘭縣">宜蘭縣</option>
  <option value="台中市">台中市</option>
  <option value="苗栗縣">苗栗縣</option>
  <option value="彰化縣">彰化縣</option>
  <option value="南投縣">南投縣</option>
  <option value="雲林縣">雲林縣</option>
  <option value="台南市">台南市</option>
  <option value="高雄市">高雄市</option>
  <option value="嘉義市">嘉義市</option>
  <option value="嘉義縣">嘉義縣</option>
  <option value="屏東縣">屏東縣</option>
  <option value="花蓮縣">花蓮縣</option>
  <option value="台東縣">台東縣</option>
  <option value="澎湖縣">澎湖縣</option>
  <option value="金門縣">金門縣</option>
  <option value="連江縣">連江縣</option>
  <option value="其它地區">其它地區</option>
</>

        )}
      </select>
    </div>
  );
};

export default Dropdown;
