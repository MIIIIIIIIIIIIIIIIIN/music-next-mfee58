import { createContext, useContext, useState } from 'react';

const TabContext = createContext();

export function TabProvider({ children }) {
  const [activeTab, setActiveTab] = useState('content');

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTab 必須在 TabProvider 內使用');
  }
  return context;
}