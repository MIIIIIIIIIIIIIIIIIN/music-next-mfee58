import React from 'react'
import DetailTop from '@/components/Liam/detail/top'
import Nav from '@/components/public/nav'
import Detail from '@/components/Liam/detail/content'
import DetailNav from '@/components/Liam/detail/content/nav'
import GroupPlaneCard from '@/components/Liam/detail/content/group-plane-card'
import QuestionAccordion from '@/components/Liam/detail/question/question-item'
import Footer from '@/components/public/footer'
export default function detail() {
  return (
    <div>
      <Nav />
      <DetailTop />
      
      <DetailNav />
      <Footer />
    </div>
  )
}
