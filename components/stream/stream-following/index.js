import styles from "@/components/stream/stream-following/s_following.module.css";
import ViewerCount from "@/components/public/icons/viewer_count";

const FollowingStream = () => {
  return (
    <div className={styles.followingStream}>
      <img
        className={styles.followingStreamChild}
        alt=""
        src="/s_img/test.jpg"
      />
      <div className={styles.streamerName}>Jimmy55555555555555</div>
      <div className={styles.veiwerCount}>
        <ViewerCount />
        <div className={styles.div}>5000</div>
      </div>
    </div>
  );
};

export default FollowingStream;
