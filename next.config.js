/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 添加不需要 SSR 的頁面
  unstable_runtimeJS: true,
  // 設定圖片域名
  images: {
    domains: ['localhost', 'localhost:3005'],
  }
}

module.exports = nextConfig