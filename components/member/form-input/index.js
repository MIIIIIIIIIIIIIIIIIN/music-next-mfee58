import React from "react";
import styles from "./form-inputM.module.css";

const FormInputM = ({ size = "medium" }) => {
  const sizeClass = size === "small" ? styles.small : size === "large" ? styles.large : styles.medium;

  return <input type="text" className={`${styles.input} ${sizeClass}`} />;
};

export default FormInputM;
