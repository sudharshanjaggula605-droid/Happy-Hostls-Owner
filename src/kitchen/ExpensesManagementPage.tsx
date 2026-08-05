import React, { useState } from 'react';
import { Search, X, History, ChevronRight } from 'lucide-react';
import type { KitchenExpense } from '../types';

/* ─────────────────────────────────────────────────────────────────────────── */
/*  DATA TYPES                                                                */
/* ─────────────────────────────────────────────────────────────────────────── */
interface ExpenseItem {
  id: string;
  emoji: string;
  title: string;
  amount: number;
  category: 'kitchen' | 'bills';
  vendor: string;
  paymentMethod: string;
  date: string;
  dateLabel: string;
  remarks: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

interface ExpensesManagementPageProps {
  onBack?: () => void;
  expenses?: KitchenExpense[];
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  DEFAULT EXPENSE DATA                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */
const DEFAULT_ALL_EXPENSES: ExpenseItem[] = [
  // KITCHEN BILLS
  { id: 'k1',  emoji: '🛢️',  title: 'LPG / Gas Cylinder', amount: 2400,  category: 'kitchen', vendor: 'HP Gas Agency',       paymentMethod: 'UPI',          date: '2026-07-28', dateLabel: '28 Jul', remarks: 'Monthly gas refill × 2 cylinders', status: 'Paid' },
  { id: 'k2',  emoji: '🥚',  title: 'Eggs',                amount: 1200,  category: 'kitchen', vendor: 'Poultry Farm Direct', paymentMethod: 'Cash',         date: '2026-07-25', dateLabel: '25 Jul', remarks: '100 eggs farm fresh',             status: 'Paid' },
  { id: 'k3',  emoji: '🍗',  title: 'Chicken / Mutton',    amount: 3500,  category: 'kitchen', vendor: 'Local Meat Shop',     paymentMethod: 'Cash',         date: '2026-07-22', dateLabel: '22 Jul', remarks: '5 kg chicken weekly',             status: 'Paid' },
  { id: 'k4',  emoji: '🐟',  title: 'Fish',                amount: 2000,  category: 'kitchen', vendor: 'Fish Market',         paymentMethod: 'Cash',         date: '2026-07-20', dateLabel: '20 Jul', remarks: '3 kg fresh fish',                 status: 'Paid' },
  { id: 'k5',  emoji: '🥬',  title: 'Vegetables',          amount: 1500,  category: 'kitchen', vendor: 'Sabzi Mandi',         paymentMethod: 'Cash',         date: '2026-07-18', dateLabel: '18 Jul', remarks: 'Weekly vegetable stock',           status: 'Paid' },
  { id: 'k6',  emoji: '🍎',  title: 'Fruits',              amount: 800,   category: 'kitchen', vendor: 'Fruit Stall',         paymentMethod: 'Cash',         date: '2026-07-16', dateLabel: '16 Jul', remarks: 'Seasonal fruits',                  status: 'Paid' },
  { id: 'k7',  emoji: '🛒',  title: 'Grocery / Grains',    amount: 8000,  category: 'kitchen', vendor: 'Anaj Bhandar',        paymentMethod: 'Bank Transfer', date: '2026-07-14', dateLabel: '14 Jul', remarks: '120 kg wheat flour + pulses',     status: 'Paid' },
  { id: 'k8',  emoji: '🍚',  title: 'Rice',                amount: 2500,  category: 'kitchen', vendor: 'Anaj Bhandar',        paymentMethod: 'Bank Transfer', date: '2026-07-12', dateLabel: '12 Jul', remarks: '50 kg basmati rice',              status: 'Paid' },
  { id: 'k9',  emoji: '🫒',  title: 'Oil / Spices',        amount: 1800,  category: 'kitchen', vendor: 'Kirana Store',        paymentMethod: 'Cash',         date: '2026-07-10', dateLabel: '10 Jul', remarks: 'Cooking oil and masala pack',      status: 'Paid' },
  { id: 'k10', emoji: '🥛',  title: 'Milk / Dairy',        amount: 3000,  category: 'kitchen', vendor: 'Mother Dairy',        paymentMethod: 'UPI',          date: '2026-07-08', dateLabel: '08 Jul', remarks: 'Weekly milk procurement',          status: 'Paid' },
  // RECHARGE & BILLS
  { id: 'b1',  emoji: '⚡',  title: 'Electricity Bill',    amount: 8500,  category: 'bills',   vendor: 'State Electricity Board', paymentMethod: 'UPI',      date: '2026-07-31', dateLabel: '31 Jul', remarks: 'Monthly EB bill',                 status: 'Paid' },
  { id: 'b2',  emoji: '💧',  title: 'Water Bill',          amount: 1000,  category: 'bills',   vendor: 'Municipal Corp.',     paymentMethod: 'UPI',          date: '2026-07-30', dateLabel: '30 Jul', remarks: 'Monthly water charges',            status: 'Paid' },
  { id: 'b3',  emoji: '📺',  title: 'Cable / DTH',         amount: 600,   category: 'bills',   vendor: 'Tata Play',           paymentMethod: 'UPI',          date: '2026-07-29', dateLabel: '29 Jul', remarks: 'Monthly DTH recharge',             status: 'Paid' },
  { id: 'b4',  emoji: '📶',  title: 'Internet / WiFi',     amount: 1500,  category: 'bills',   vendor: 'Airtel Fiber',        paymentMethod: 'Bank Transfer', date: '2026-07-28', dateLabel: '28 Jul', remarks: 'Monthly broadband plan',           status: 'Paid' },
  { id: 'b5',  emoji: '🏠',  title: 'Rent / Property',     amount: 25000, category: 'bills',   vendor: 'Property Owner',      paymentMethod: 'Bank Transfer', date: '2026-07-01', dateLabel: '01 Jul', remarks: 'Monthly building rent',            status: 'Paid' },
  { id: 'b6',  emoji: '🗒️',  title: 'Maintenance',         amount: 0,     category: 'bills',   vendor: 'Pending',             paymentMethod: '-',            date: '-',          dateLabel: '-',      remarks: 'Pending repair estimate',          status: 'Pending' },
];

/* ─────────────────────────────────────────────────────────────────────────── */
/*  COMPONENT                                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */
export const ExpensesManagementPage: React.FC<ExpensesManagementPageProps> = ({ expenses = [] }) => {
  const [searchQuery, setSearchQuery]   = useState('');
  const [selectedItem, setSelectedItem] = useState<ExpenseItem | null>(null);
  const [showHistory, setShowHistory]   = useState(false);

  // Map dynamic expenses logged from Pantry item additions & stock updates into Kitchen Bills items
  const dynamicPantryExpenses: ExpenseItem[] = expenses.map((exp, idx) => {
    const descLower = exp.description.toLowerCase();
    const catLower = (exp.category || '').toLowerCase();
    let emoji = '📦';
    if (descLower.includes('milk') || catLower.includes('dairy')) emoji = '🥛';
    else if (descLower.includes('egg')) emoji = '🥚';
    else if (descLower.includes('chicken') || descLower.includes('meat')) emoji = '🍗';
    else if (descLower.includes('rice') || descLower.includes('flour') || descLower.includes('grain')) emoji = '🌾';
    else if (descLower.includes('veg') || descLower.includes('fruit')) emoji = '🥬';
    else if (descLower.includes('oil') || descLower.includes('spice')) emoji = '🫒';

    return {
      id: exp.id || `dyn_pantry_${idx}`,
      emoji,
      title: exp.description,
      amount: exp.amount,
      category: 'kitchen' as const,
      vendor: exp.vendor || 'Pantry Vendor',
      paymentMethod: 'Auto Sync',
      date: exp.date || 'Today',
      dateLabel: exp.date ? exp.date.split('-').slice(1).join('/') : 'Today',
      remarks: `Automatically added from Pantry Module`,
      status: exp.status || 'Paid'
    };
  });

  const combinedKitchenExpenses = [...dynamicPantryExpenses, ...DEFAULT_ALL_EXPENSES.filter(e => e.category === 'kitchen')];
  const billsExpenses = DEFAULT_ALL_EXPENSES.filter(e => e.category === 'bills');
  const allExpensesList = [...dynamicPantryExpenses, ...DEFAULT_ALL_EXPENSES];



  /* ── filtered list (for history view) ── */
  const filtered = allExpensesList.filter(e => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return e.title.toLowerCase().includes(q) || e.vendor.toLowerCase().includes(q);
  });

  /* ────────────────────────── DETAIL VIEW ───────────────────────────────── */
  if (selectedItem) {
    return (
      <div className="emp-page">
        <div className="emp-header">
          <h1 className="emp-title">Expense Details</h1>
        </div>

        <div className="emp-detail-card">
          <div className="emp-detail-top">
            <div className="emp-detail-emoji">{selectedItem.emoji}</div>
            <div>
              <div className="emp-detail-name">{selectedItem.title}</div>
              <div className="emp-detail-cat">
                {selectedItem.category === 'kitchen' ? 'Kitchen Bills' : 'Recharge & Bills'}
              </div>
            </div>
          </div>
          <div className="emp-detail-divider" />
          <div className="emp-detail-rows">
            <div className="emp-detail-row"><span className="emp-det-label">Amount</span><span className="emp-det-val-red">₹{selectedItem.amount.toLocaleString('en-IN')}</span></div>
            <div className="emp-detail-row"><span className="emp-det-label">Date</span><span className="emp-det-val">{selectedItem.date === '-' ? 'Not set' : selectedItem.date}</span></div>
            <div className="emp-detail-row"><span className="emp-det-label">Vendor</span><span className="emp-det-val">{selectedItem.vendor}</span></div>
            <div className="emp-detail-row"><span className="emp-det-label">Payment Method</span><span className="emp-det-val">{selectedItem.paymentMethod}</span></div>
            <div className="emp-detail-row"><span className="emp-det-label">Remarks</span><span className="emp-det-val">{selectedItem.remarks}</span></div>
            <div className="emp-detail-row">
              <span className="emp-det-label">Status</span>
              <span className={`emp-status-badge ${selectedItem.status.toLowerCase()}`}>{selectedItem.status}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ──────────────────────────── HISTORY VIEW ────────────────────────────── */
  if (showHistory) {
    return (
      <div className="emp-page">
        <div className="emp-header">
          <h1 className="emp-title">Expense History</h1>
        </div>

        <div className="emp-search-wrap">
          <Search size={15} className="emp-search-icon" />
          <input
            className="emp-search-input"
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="emp-clear-btn" onClick={() => setSearchQuery('')}>
              <X size={13} />
            </button>
          )}
        </div>

        <div className="emp-history-list">
          {filtered.map(exp => (
            <div key={exp.id} className="emp-history-card" onClick={() => setSelectedItem(exp)}>
              <div className="emp-hcard-left">
                <div className="emp-hcard-emoji">{exp.emoji}</div>
                <div>
                  <div className="emp-hcard-title">{exp.title}</div>
                  <div className="emp-hcard-sub">{exp.dateLabel !== '-' ? exp.dateLabel : 'Pending'} • {exp.paymentMethod}</div>
                </div>
              </div>
              <div className="emp-hcard-right">
                <div className="emp-hcard-amount">
                  {exp.amount > 0 ? `₹${exp.amount.toLocaleString('en-IN')}` : '₹0'}
                </div>
                <ChevronRight size={14} color="#94a3b8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ──────────────────────────── GRID MAIN VIEW ──────────────────────────── */
  return (
    <div className="emp-page">

      {/* HEADER */}
      <div className="emp-header">
        <h1 className="emp-title">Expenses</h1>
        <button className="emp-history-icon-btn" onClick={() => setShowHistory(true)}>
          <History size={20} color="#334155" />
        </button>
      </div>

      {/* KITCHEN BILLS SECTION */}
      <div className="emp-section-title">KITCHEN BILLS</div>
      <div className="emp-grid">
        {combinedKitchenExpenses.map(exp => (
          <div key={exp.id} className="emp-grid-cell" onClick={() => setSelectedItem(exp)}>
            <div className="emp-grid-icon-box">{exp.emoji}</div>
            <div className="emp-grid-title">{exp.title}</div>
            <div className="emp-grid-amount">₹{exp.amount.toLocaleString('en-IN')}</div>
          </div>
        ))}
      </div>

      {/* RECHARGE & BILLS SECTION */}
      <div className="emp-section-title" style={{ marginTop: 24 }}>RECHARGE & BILLS</div>
      <div className="emp-grid">
        {billsExpenses.map(exp => (
          <div key={exp.id} className="emp-grid-cell" onClick={() => setSelectedItem(exp)}>
            <div className="emp-grid-icon-box">{exp.emoji}</div>
            <div className="emp-grid-title">{exp.title}</div>
            <div className="emp-grid-amount">
              {exp.amount > 0 ? `₹${exp.amount.toLocaleString('en-IN')}` : '₹0'}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
