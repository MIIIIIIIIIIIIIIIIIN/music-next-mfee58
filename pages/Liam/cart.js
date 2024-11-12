// React/Next.js 組件
import { useRouter } from 'next/router';

const CartPage = () => {
    const router = useRouter();

    const handlePayment = () => {
        // 示例商品數據
        const products = [
            {
                productName: "噴火龍ex",
                quantity: 5,
                price: 2000
            },
            {
                productName: "超夢ex",
                quantity: 6,
                price: 3000
            }
        ];

        // 將商品數據轉換為 URL 參數
        const productsParam = encodeURIComponent(JSON.stringify(products));
        
        // 方法 1: 直接使用 window.location
        // window.location.href = `http://localhost:3001//payment?products=${productsParam}`;

        // 或方法 2: 使用 Next.js Router
        router.push({
            pathname: 'http://localhost:3001/payment',
            query: { products: productsParam }
        });
    };

    return (
        <div>
            {/* 購物車界面 */}
            <button onClick={handlePayment}>結帳</button>
        </div>
    );
};

export default CartPage;