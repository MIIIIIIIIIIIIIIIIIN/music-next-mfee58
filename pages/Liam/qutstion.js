import Nav from '@/components/public/nav';
import DetailTop from '@/components/Liam/detail/top'

import Footer from '@/components/public/footer'

import QuestionAccordion from "@/components/Liam/detail/question/question-item"



// const faqData = [
//     {
//       id: 1,
//       date: '2023/06/21 11:32',
//       question: '如何於官網購物呢？還是沒看到功能？？',
//       answer: '目前官網尚未開放購物功能，請密切關注我們的更新通知。',
//       highlight: true
//     },
//     {
//       id: 2,
//       date: '2023/06/21 11:45',
//       question: '如果不想綁外送,是選擇自取嗎？？',
//       answer: '是的，您可以選擇到店自取的方式。'
//     },
//     {
//       id: 3,
//       date: '2023/06/21 11:47',
//       question: '請問可付現方式會怎樣？？',
//       answer: '我們接受現金、信用卡和行動支付等方式。'
//     }
//   ];
  

export default function Qutstion() {
    return (
        <>
        <Nav />
         <DetailTop />

            <QuestionAccordion faqData={faqData}/>

         <Footer />
         </>
    )
    }