import React from 'react'
import MemberPassword from '@/components/member/mem-password' // 假設真正要渲染的組件名稱是 MemberPassword

export default function MemberPasswordPage() {
  return (
    <MemberPassword />  // 使用 MemberPassword 組件，而不是遞歸調用 MemberPasswordPage
  )
}
