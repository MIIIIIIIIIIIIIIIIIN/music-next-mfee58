import React from 'react';
import styles from './mem-blog.module.css'; // 引入相應的 CSS 模組
import Nav from '@/components/public/nav';
import UserIcon from '@/components/public/user-icon';
import BlogNav from '../blog-nav';


const MemBlog = () => {
  return (
    <>
    <div className={styles["wrapper"]}>
      <Nav className={styles["nav"]} />

      <div className={styles["container"]}>
        <div className={styles["leftContent"]}>
          {/* <InfoNav /> */}
      <BlogNav />


        </div>
        <div className={styles["rightContent"]}>
      <UserIcon />
      <UserIcon />
      <UserIcon />
      <UserIcon />
      <UserIcon />
      <UserIcon />
      <UserIcon />
        </div>
      </div>

      <div className={styles["footer"]}>Footer</div>
    </div>
  </>
  );
};

export default MemBlog;
