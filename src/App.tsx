import React, { useState } from 'react';
import Header from './components/Header';
import ExpensePage from './pages/ExpensePage';
import IncomePage from './pages/IncomePage';
import { FinanceProvider } from './contexts/FinanceContext';
import { promisify } from 'util'; // isso só deve ser usado em código backend


function App() {
  const [activeTab, setActiveTab] = useState('expenses');

  return (
    <FinanceProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1">
          {activeTab === 'expenses' ? <ExpensePage /> : <IncomePage />}
        </main>
      </div>
    </FinanceProvider>
  );
}

export default App;