import React, { useState } from 'react';
import { Calendar, ChevronDown, CheckCircle2, X, TrendingUp } from 'lucide-react';

export interface MonthRevenueData {
  id: string;
  label: string;
  year: number;
  monthName: string;
  totalCollected: number;
  expectedTotal: number;
  collectionPct: number;
  totalExpenses: number;
  netProfit: number;
  categoryBreakdown: { category: string; amount: number; percentage: number; color: string }[];
  channelBreakdown: { method: string; amount: number; count: number; pct: number }[];
}

const monthlyAnalyticsList: MonthRevenueData[] = [
  {
    id: 'aug-2026',
    label: 'August 2026',
    year: 2026,
    monthName: 'August',
    totalCollected: 168000,
    expectedTotal: 210000,
    collectionPct: 80,
    totalExpenses: 58400,
    netProfit: 109600,
    categoryBreakdown: [
      { category: 'Room Rent', amount: 140000, percentage: 83, color: '#2563eb' },
      { category: 'Security Deposit', amount: 18000, percentage: 11, color: '#7c3aed' },
      { category: 'Food & Mess Charges', amount: 10000, percentage: 6, color: '#059669' },
    ],
    channelBreakdown: [
      { method: 'UPI / GPay', amount: 98000, count: 14, pct: 58 },
      { method: 'Bank Transfer (NEFT)', amount: 52000, count: 7, pct: 31 },
      { method: 'Cash', amount: 18000, count: 4, pct: 11 },
    ]
  },
  {
    id: 'jul-2026',
    label: 'July 2026',
    year: 2026,
    monthName: 'July',
    totalCollected: 145000,
    expectedTotal: 190000,
    collectionPct: 76,
    totalExpenses: 53708,
    netProfit: 91292,
    categoryBreakdown: [
      { category: 'Room Rent', amount: 120000, percentage: 83, color: '#2563eb' },
      { category: 'Security Deposit', amount: 15000, percentage: 10, color: '#7c3aed' },
      { category: 'Food & Mess Charges', amount: 10000, percentage: 7, color: '#059669' },
    ],
    channelBreakdown: [
      { method: 'UPI / GPay', amount: 85000, count: 12, pct: 59 },
      { method: 'Bank Transfer (NEFT)', amount: 45000, count: 6, pct: 31 },
      { method: 'Cash', amount: 15000, count: 3, pct: 10 },
    ]
  },
  {
    id: 'jun-2026',
    label: 'June 2026',
    year: 2026,
    monthName: 'June',
    totalCollected: 182000,
    expectedTotal: 195000,
    collectionPct: 93,
    totalExpenses: 49200,
    netProfit: 132800,
    categoryBreakdown: [
      { category: 'Room Rent', amount: 150000, percentage: 82, color: '#2563eb' },
      { category: 'Security Deposit', amount: 20000, percentage: 11, color: '#7c3aed' },
      { category: 'Food & Mess Charges', amount: 12000, percentage: 7, color: '#059669' },
    ],
    channelBreakdown: [
      { method: 'UPI / GPay', amount: 110000, count: 16, pct: 60 },
      { method: 'Bank Transfer (NEFT)', amount: 54000, count: 8, pct: 30 },
      { method: 'Cash', amount: 18000, count: 4, pct: 10 },
    ]
  },
  {
    id: 'may-2026',
    label: 'May 2026',
    year: 2026,
    monthName: 'May',
    totalCollected: 158500,
    expectedTotal: 185000,
    collectionPct: 86,
    totalExpenses: 51000,
    netProfit: 107500,
    categoryBreakdown: [
      { category: 'Room Rent', amount: 132000, percentage: 83, color: '#2563eb' },
      { category: 'Security Deposit', amount: 16500, percentage: 10, color: '#7c3aed' },
      { category: 'Food & Mess Charges', amount: 10000, percentage: 7, color: '#059669' },
    ],
    channelBreakdown: [
      { method: 'UPI / GPay', amount: 95000, count: 14, pct: 60 },
      { method: 'Bank Transfer (NEFT)', amount: 48500, count: 7, pct: 31 },
      { method: 'Cash', amount: 15000, count: 3, pct: 9 },
    ]
  },
  {
    id: 'apr-2026',
    label: 'April 2026',
    year: 2026,
    monthName: 'April',
    totalCollected: 172000,
    expectedTotal: 190000,
    collectionPct: 91,
    totalExpenses: 47800,
    netProfit: 124200,
    categoryBreakdown: [
      { category: 'Room Rent', amount: 144000, percentage: 84, color: '#2563eb' },
      { category: 'Security Deposit', amount: 17000, percentage: 10, color: '#7c3aed' },
      { category: 'Food & Mess Charges', amount: 11000, percentage: 6, color: '#059669' },
    ],
    channelBreakdown: [
      { method: 'UPI / GPay', amount: 105000, count: 15, pct: 61 },
      { method: 'Bank Transfer (NEFT)', amount: 50000, count: 7, pct: 29 },
      { method: 'Cash', amount: 17000, count: 3, pct: 10 },
    ]
  },
  {
    id: 'mar-2026',
    label: 'March 2026',
    year: 2026,
    monthName: 'March',
    totalCollected: 140000,
    expectedTotal: 180000,
    collectionPct: 78,
    totalExpenses: 45600,
    netProfit: 94400,
    categoryBreakdown: [
      { category: 'Room Rent', amount: 118000, percentage: 84, color: '#2563eb' },
      { category: 'Security Deposit', amount: 13000, percentage: 9, color: '#7c3aed' },
      { category: 'Food & Mess Charges', amount: 9000, percentage: 7, color: '#059669' },
    ],
    channelBreakdown: [
      { method: 'UPI / GPay', amount: 84000, count: 12, pct: 60 },
      { method: 'Bank Transfer (NEFT)', amount: 42000, count: 6, pct: 30 },
      { method: 'Cash', amount: 14000, count: 3, pct: 10 },
    ]
  },
  {
    id: 'feb-2026',
    label: 'February 2026',
    year: 2026,
    monthName: 'February',
    totalCollected: 165000,
    expectedTotal: 185000,
    collectionPct: 89,
    totalExpenses: 46000,
    netProfit: 119000,
    categoryBreakdown: [
      { category: 'Room Rent', amount: 138000, percentage: 84, color: '#2563eb' },
      { category: 'Security Deposit', amount: 16000, percentage: 10, color: '#7c3aed' },
      { category: 'Food & Mess Charges', amount: 11000, percentage: 6, color: '#059669' },
    ],
    channelBreakdown: [
      { method: 'UPI / GPay', amount: 99000, count: 14, pct: 60 },
      { method: 'Bank Transfer (NEFT)', amount: 49500, count: 7, pct: 30 },
      { method: 'Cash', amount: 16500, count: 3, pct: 10 },
    ]
  },
  {
    id: 'jan-2026',
    label: 'January 2026',
    year: 2026,
    monthName: 'January',
    totalCollected: 150000,
    expectedTotal: 180000,
    collectionPct: 83,
    totalExpenses: 44000,
    netProfit: 106000,
    categoryBreakdown: [
      { category: 'Room Rent', amount: 125000, percentage: 83, color: '#2563eb' },
      { category: 'Security Deposit', amount: 15000, percentage: 10, color: '#7c3aed' },
      { category: 'Food & Mess Charges', amount: 10000, percentage: 7, color: '#059669' },
    ],
    channelBreakdown: [
      { method: 'UPI / GPay', amount: 90000, count: 13, pct: 60 },
      { method: 'Bank Transfer (NEFT)', amount: 45000, count: 6, pct: 30 },
      { method: 'Cash', amount: 15000, count: 3, pct: 10 },
    ]
  }
];

interface RevenueAnalyticsPageProps {
  onBack?: () => void;
}

export const RevenueAnalyticsPage: React.FC<RevenueAnalyticsPageProps> = () => {
  const [selectedMonth, setSelectedMonth] = useState<MonthRevenueData>(monthlyAnalyticsList[1]); // Default July 2026
  const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);

  return (
    <div className="rap-page-container">
      {/* HEADER WITH MONTHLY SELECTOR BUTTON */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', gap: '8px', flexWrap: 'nowrap' }}>
        <h1 className="rap-header-title" style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: 0, whiteSpace: 'nowrap' }}>
          Revenue &amp; Analytics
        </h1>
        
        <button 
          type="button" 
          className="rap-month-selector-btn"
          style={{ padding: '6px 10px', fontSize: '12px', whiteSpace: 'nowrap', flexShrink: 0 }}
          onClick={() => setIsMonthModalOpen(true)}
        >
          <Calendar size={14} />
          <span>{selectedMonth.label}</span>
          <ChevronDown size={13} />
        </button>
      </div>

      {/* HERO STAT CARD FOR SELECTED MONTH */}
      <div className="rap-hero-card">
        <div className="rap-hero-top">
          <div>
            <div className="rap-hero-lbl">{selectedMonth.label} Collection Rate</div>
            <div className="rap-hero-val">₹{selectedMonth.totalCollected.toLocaleString('en-IN')}</div>
            <div className="rap-hero-sub">Out of ₹{selectedMonth.expectedTotal.toLocaleString('en-IN')} expected</div>
          </div>
          <div className="rap-hero-badge">
            <TrendingUp size={16} />
            <span>{selectedMonth.collectionPct}% Paid</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="rap-progress-track">
          <div className="rap-progress-fill" style={{ width: `${selectedMonth.collectionPct}%` }} />
        </div>

        {/* Financial Summary */}
        <div className="rap-financial-row">
          <div className="rap-fin-box green">
            <div className="rap-fin-lbl">Collected Income</div>
            <div className="rap-fin-val">₹{selectedMonth.totalCollected.toLocaleString('en-IN')}</div>
          </div>
          <div className="rap-fin-box red">
            <div className="rap-fin-lbl">Total Expenses</div>
            <div className="rap-fin-val">₹{selectedMonth.totalExpenses.toLocaleString('en-IN')}</div>
          </div>
          <div className="rap-fin-box blue">
            <div className="rap-fin-lbl">Net Profit</div>
            <div className="rap-fin-val">₹{selectedMonth.netProfit.toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>

      {/* CATEGORY BREAKDOWN */}
      <div className="rap-section-title">INCOME BY CATEGORY</div>
      <div className="rap-categories-card">
        {selectedMonth.categoryBreakdown.map(item => (
          <div key={item.category} className="rap-cat-item">
            <div className="rap-cat-top">
              <span className="rap-cat-name">{item.category}</span>
              <span className="rap-cat-amt">₹{item.amount.toLocaleString('en-IN')} ({item.percentage}%)</span>
            </div>
            <div className="rap-cat-bar-bg">
              <div className="rap-cat-bar-fill" style={{ width: `${item.percentage}%`, background: item.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* CHANNEL BREAKDOWN */}
      <div className="rap-section-title" style={{ marginTop: 20 }}>COLLECTION CHANNELS</div>
      <div className="rap-channels-grid">
        {selectedMonth.channelBreakdown.map(ch => (
          <div key={ch.method} className="rap-channel-card">
            <div className="rap-ch-name">{ch.method}</div>
            <div className="rap-ch-amt">₹{ch.amount.toLocaleString('en-IN')}</div>
            <div className="rap-ch-sub">{ch.count} transactions ({ch.pct}%)</div>
          </div>
        ))}
      </div>

      {/* MONTH SELECTION POPUP MODAL */}
      {isMonthModalOpen && (
        <div className="wizard-modal-backdrop" onClick={() => setIsMonthModalOpen(false)}>
          <div className="booking-view-modal-card" style={{ maxWidth: '420px', borderRadius: '20px' }} onClick={(e) => e.stopPropagation()}>
            
            {/* MODAL HEADER */}
            <div className="view-modal-header">
              <div className="view-modal-title-wrap">
                <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calendar size={18} />
                </div>
                <h3 className="view-modal-title">Select Monthly Analytics</h3>
              </div>
              <button 
                type="button" 
                className="wizard-close-btn"
                onClick={() => setIsMonthModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="view-modal-body" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Select Month to View Financial Breakdown:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {monthlyAnalyticsList.map(m => {
                  const isSelected = m.id === selectedMonth.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setSelectedMonth(m);
                        setIsMonthModalOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        borderRadius: '12px',
                        background: isSelected ? '#eff6ff' : '#f8fafc',
                        border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        textAlign: 'left'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: isSelected ? '#1d4ed8' : '#0f172a' }}>
                          {m.label}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                          Collected: <strong style={{ color: '#059669' }}>₹{m.totalCollected.toLocaleString('en-IN')}</strong> • Net: <strong>₹{m.netProfit.toLocaleString('en-IN')}</strong>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          background: isSelected ? '#dbeafe' : '#f1f5f9',
                          color: isSelected ? '#1d4ed8' : '#475569',
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '10px'
                        }}>
                          {m.collectionPct}% Paid
                        </span>
                        {isSelected && <CheckCircle2 size={18} color="#2563eb" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="view-modal-footer">
              <button 
                type="button" 
                style={{
                  width: '100%',
                  padding: '11px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#475569',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
                onClick={() => setIsMonthModalOpen(false)}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
