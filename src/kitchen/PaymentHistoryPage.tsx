import React, { useState } from 'react';
import { ChevronLeft, Search } from 'lucide-react';

interface PaymentHistoryItem {
  id: string;
  name: string;
  initials: string;
  monthAndMethod: string;
  amount: number;
  date: string;
}

interface PaymentHistoryPageProps {
  onBack: () => void;
}

export const PaymentHistoryPage: React.FC<PaymentHistoryPageProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const historyData: PaymentHistoryItem[] = [
    {
      id: 'ph-1',
      name: 'Abhishek Sharma',
      initials: 'AS',
      monthAndMethod: 'July 2026 • UPI',
      amount: 8500,
      date: '26 Jul'
    },
    {
      id: 'ph-2',
      name: 'Siddharth Patel',
      initials: 'SP',
      monthAndMethod: 'July 2026 • UPI',
      amount: 12800,
      date: '25 Jul'
    },
    {
      id: 'ph-3',
      name: 'Pranav Joshi',
      initials: 'PJ',
      monthAndMethod: 'July 2026 • Cash',
      amount: 7800,
      date: '24 Jul'
    },
    {
      id: 'ph-4',
      name: 'Divyansh Gupta',
      initials: 'DG',
      monthAndMethod: 'July 2026 • Card',
      amount: 8500,
      date: '23 Jul'
    },
    {
      id: 'ph-5',
      name: 'Rohit Verma',
      initials: 'RV',
      monthAndMethod: 'July 2026 • UPI',
      amount: 12500,
      date: '20 Jul'
    },
    {
      id: 'ph-6',
      name: 'Manish Pandey',
      initials: 'MP',
      monthAndMethod: 'July 2026 • UPI',
      amount: 14000,
      date: '18 Jul'
    },
    {
      id: 'ph-7',
      name: 'Rahul Dravid',
      initials: 'RD',
      monthAndMethod: 'June 2026 • UPI',
      amount: 11000,
      date: '15 Jun'
    }
  ];

  const filteredHistory = historyData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.monthAndMethod.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="payment-history-page-container">
      
      {/* TOP HEADER BAR (EXACT MATCH TO REFERENCE PHOTO) */}
      <div className="ph-header-bar">
        
        <h1 className="ph-header-title">Payment History</h1>
      </div>

      {/* SEARCH INPUT BAR */}
      <div className="ph-search-wrap">
        <Search size={18} className="ph-search-icon" />
        <input
          type="text"
          className="ph-search-input"
          placeholder="Search by recipient or payer..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      {/* PAYMENT HISTORY LIST CARDS */}
      <div className="ph-cards-list">
        {filteredHistory.length === 0 ? (
          <div className="ph-empty-state">
            No transactions found matching "{searchQuery}".
          </div>
        ) : (
          filteredHistory.map(item => (
            <div key={item.id} className="ph-history-card">
              
              {/* LEFT INITIALS AVATAR */}
              <div className="ph-avatar-circle">
                {item.initials}
              </div>

              {/* MIDDLE INFO COLUMN */}
              <div className="ph-info-col">
                <div className="ph-student-name">{item.name}</div>
                <div className="ph-meta-text">{item.monthAndMethod}</div>
              </div>

              {/* RIGHT AMOUNT COLUMN */}
              <div className="ph-amount-col">
                <div className="ph-amount-text">+ ₹{item.amount.toLocaleString('en-IN')}</div>
                <div className="ph-date-text">{item.date}</div>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
