import styles from './new-card-item.module.css'
const NewsCardItem = ({ date, title, description, image }) => {
  return (
    
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.date}>{date}</div>
        <div className={styles.imageContainer}>
          <img src={image} alt={title} className={styles.image} />
        </div>
        <div className={styles.textContent}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsCardItem;
