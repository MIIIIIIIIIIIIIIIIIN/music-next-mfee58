import styles from './title.module.css';


const Title = () => {
  	return (
    		<div className={styles.frameParent}>
      			<div className={styles.frameGroup}>
        				<div className={styles.wrapper}>
          					<div className={styles.div}>1</div>
        				</div>
        				<div className={styles.div1}>
          					<span>{`最新消息 `}</span>
          					<span className={styles.span}>{`->`}</span>
          					<span>{` `}</span>
        				</div>
        				<div className={styles.new}>!! (new)</div>
      			</div>
    		</div>);
};

export default Title;
