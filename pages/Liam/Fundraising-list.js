import React from 'react'
import Kv from '@/components/Liam/Fundraising-list/kv'
import Nav from '@/components/public/nav'
import NewCard from '@/components/Liam/Fundraising-list/new/card'
import ListNewCard from '@/components/Liam/Fundraising-list/new'
import FundraisingTitle from '@/components/Liam/Fundraising-list/title'
import Footer from '@/components/public/footer'

export default function FundraisingList() {
  return (
    <div>
      <Nav />
      <Kv />
      <FundraisingTitle text='(最新募資)'/>
    <ListNewCard />
    <FundraisingTitle text='(推薦募資)'/>
    <ListNewCard />
    <Footer />
    </div>
  )
}
