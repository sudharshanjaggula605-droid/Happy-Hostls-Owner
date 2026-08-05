import React from 'react';
import { ChevronLeft, TrendingUp } from 'lucide-react';

interface RevenueAnalyticsPageProps {
  onBack: () => void;
}

export const RevenueAnalyticsPage: React.FC<RevenueAnalyticsPageProps> = ({ onBack }) => {
  const totalCollected = 145000;
  const expectedTotal = 190000;
  const collectionPct = Math.round((totalCollected / expectedTotal) * 100);
  const totalExpenses = 53708;
  const netProfit = totalCollected - totalExpenses;

  const categoryBreakdown = [
    { category: 'Room Rent', amount: 120000, percentage: 83, color: '#2563eb' },
    { category: 'Security Deposit', amount: 15000, percentage: 10, color: '#7c3aed' },
    { category: 'Food & Mess Charges', amount: 10000, percentage: 7, color: '#059669' },
  ];

  const channelBreakdown = [
    { method: 'UPI / GPay', amount: 85000, count: 12, pct: 59 },
    { method: 'Bank Transfer (NEFT)', amount: 45000, count: 6, pct: 31 },
    { method: 'Cash', amount: 15000, count: 3, pct: 10 },
  ];

  return (
    <div className="rap-page-container">
      {/* HEADER */}
      <div className="rap-header-bar">
        
        <h1 className="rap-header-title">Revenue & Analytics</h1>
      </div>

      {/* HERO STAT CARD */}
      <div className="rap-hero-card">
        <div className="rap-hero-top">
          <div>
            <div className="rap-hero-lbl">July 2026 Collection Rate</div>
            <div className="rap-hero-val">₹{totalCollected.toLocaleString('en-IN')}</div>
            <div className="rap-hero-sub">Out of ₹{expectedTotal.toLocaleString('en-IN')} expected</div>
          </div>
          <div className="rap-hero-badge">
            <TrendingUp size={16} />
            <span>{collectionPct}% Paid</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="rap-progress-track">
          <div className="rap-progress-fill" style={{ width: `${collectionPct}%` }} />
        </div>

        {/* Financial Summary */}
        <div className="rap-financial-row">
          <div className="rap-fin-box green">
            <div className="rap-fin-lbl">Collected Income</div>
            <div className="rap-fin-val">₹{totalCollected.toLocaleString('en-IN')}</div>
          </div>
          <div className="rap-fin-box red">
            <div className="rap-fin-lbl">Total Expenses</div>
            <div className="rap-fin-val">₹{totalExpenses.toLocaleString('en-IN')}</div>
          </div>
          <div className="rap-fin-box blue">
            <div className="rap-fin-lbl">Net Profit</div>
            <div className="rap-fin-val">₹{netProfit.toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>

      {/* CATEGORY BREAKDOWN */}
      <div className="rap-section-title">INCOME BY CATEGORY</div>
      <div className="rap-categories-card">
        {categoryBreakdown.map(item => (
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
        {channelBreakdown.map(ch => (
          <div key={ch.method} className="rap-channel-card">
            <div className="rap-ch-name">{ch.method}</div>
            <div className="rap-ch-amt">₹{ch.amount.toLocaleString('en-IN')}</div>
            <div className="rap-ch-sub">{ch.count} transactions ({ch.pct}%)</div>
          </div>
        ))}
      </div>
    </div>
  );
};
