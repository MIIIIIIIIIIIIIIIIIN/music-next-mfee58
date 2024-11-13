import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DetailTop from '@/components/Liam/detail/top';
import Nav from '@/components/public/nav';
import DetailNav from '@/components/Liam/detail/content/nav';
import Footer from '@/components/public/footer';
import Chat from '@/components/Liam/chat/chat';
import AudioPlayer from '@/components/Liam/music';
import { TabProvider } from '@/components/Liam/detail/top/tab-Context';


export default function ProjectDetail() {
  return (
    <TabProvider>
      
      <div>
        <Nav />
        <DetailTop />
        <AudioPlayer />
        <DetailNav />
        <Footer />
        <Chat />
      </div>
    </TabProvider>
  );
}