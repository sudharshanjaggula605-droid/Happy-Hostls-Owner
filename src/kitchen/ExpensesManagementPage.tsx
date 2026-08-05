
import React, { useState, useRef } from 'react';
import { 
  ChevronLeft, 
  Search, 
  X, 
  History, 
  ChevronRight, 
  Plus, 
  Utensils, 
  Receipt, 
  CreditCard, 
  Calendar, 
  Store, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Share2, 
  Download, 
  ArrowRight,
  TrendingDown,
  Sparkles,
  ArrowLeft,
  Check
} from 'lucide-react';
import type { KitchenExpense } from '../types';

/* ─────────────────────────────────────────────────────────────────────────── */
/*  DATA TYPES                                                                */
/* ─────────────────────────────────────────────────────────────────────────── */
export interface ExpenseItem {
  id: string;
  emoji: string;
  title: string;
  amount: number;
  category: 'kitchen' | 'bills' | 'staff' | 'maintenance';
  vendor: string;
  paymentMethod: 'UPI' | 'Cash' | 'Bank Transfer' | 'Card' | string;
  date: string;
  dateLabel: string;
  remarks: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}


export interface ExpensesManagementPageProps {
  onBack: () => void;
  onNavigateToKitchen?: () => void;
  expenses?: ExpenseItem[];
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  INITIAL MOCK EXPENSE DATA                                                  */
/* ─────────────────────────────────────────────────────────────────────────── */
const INITIAL_EXPENSES: ExpenseItem[] = [
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
  
  // MAINTENANCE & STAFF
  { id: 'm1',  emoji: '🔧',  title: 'Plumbing & Repairs',  amount: 1200,  category: 'maintenance', vendor: 'Local Plumber',   paymentMethod: 'Cash',         date: '2026-07-26', dateLabel: '26 Jul', remarks: 'Bathroom pipe fix 2nd floor',     status: 'Paid' },
  { id: 's1',  emoji: '👥',  title: 'Cook & Helper Wage',  amount: 18000, category: 'staff',   vendor: 'Ramesh (Chief Cook)', paymentMethod: 'Bank Transfer', date: '2026-07-05', dateLabel: '05 Jul', remarks: 'July monthly salary',              status: 'Paid' },
  { id: 'b6',  emoji: '🗒️',  title: 'Generator Diesel',    amount: 3200,  category: 'bills',   vendor: 'Fuel Station',        paymentMethod: 'Cash',         date: '2026-07-27', dateLabel: '27 Jul', remarks: 'Power backup fuel refill',         status: 'Paid' },
];

/* ─────────────────────────────────────────────────────────────────────────── */
/*  CATEGORY METADATA CONFIG                                                   */
/* ─────────────────────────────────────────────────────────────────────────── */

const CATEGORY_CONFIG = {
  kitchen: {
    label: 'Kitchen Bills',
    icon: '🍳',
    color: '#ea580c',
    bgColor: '#fff7ed',
    borderColor: '#ffedd5',
    progressColor: '#f97316',
    desc: 'LPG Gas, Grains, Vegetables, Dairy & Meat'
  },
  bills: {
    label: 'Recharge & Bills',
    icon: '⚡',
    color: '#0284c7',
    bgColor: '#f0f9ff',
    borderColor: '#e0f2fe',
    progressColor: '#38bdf8',
    desc: 'Electricity, Water, WiFi, DTH & Building Rent'
  },
  staff: {
    label: 'Staff Salary',
    icon: '👥',
    color: '#7c3aed',
    bgColor: '#f5f3ff',
    borderColor: '#ede9fe',
    progressColor: '#a78bfa',
    desc: 'Cook, Housekeeping & Security wages'
  },
  maintenance: {
    label: 'Maintenance',
    icon: '🔧',
    color: '#059669',
    bgColor: '#ecfdf5',
    borderColor: '#d1fae5',
    progressColor: '#34d399',
    desc: 'Plumbing, Electrical, RO Water & Appliance fix'
  }
};

export const ExpensesManagementPage: React.FC<ExpensesManagementPageProps> = ({ 
  onBack, 
  onNavigateToKitchen,
  expenses = INITIAL_EXPENSES 
}) => {
  // Main State
  const [expensesList, setExpensesList]   = useState<ExpenseItem[]>(expenses);
  const [searchQuery, setSearchQuery]     = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<'all' | 'kitchen' | 'bills' | 'staff' | 'maintenance'>('all');
  const [selectedItem, setSelectedItem]   = useState<ExpenseItem | null>(null);
  const [showHistory, setShowHistory]     = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage]   = useState<string | null>(null);

  // Ref for auto-scrolling to history section
  const historySectionRef = useRef<HTMLDivElement>(null);

  // Multi-Step Form Wizard State
  const [formStep, setFormStep]           = useState<1 | 2 | 3>(1);
  const [formCategory, setFormCategory]   = useState<'kitchen' | 'bills' | 'staff' | 'maintenance'>('kitchen');
  const [formTitle, setFormTitle]         = useState('');
  const [formAmount, setFormAmount]       = useState('');
  const [formVendor, setFormVendor]       = useState('');
  const [formPaymentMethod, setFormPaymentMethod] = useState('UPI');
  const [formDate, setFormDate]           = useState('2026-08-05');
  const [formRemarks, setFormRemarks]     = useState('');
  const [formStatus, setFormStatus]       = useState<'Paid' | 'Pending'>('Paid');
  const [formEmoji, setFormEmoji]         = useState('🛒');

  // Trigger Toast Notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Open Modal & Reset Wizard
  const handleOpenAddModal = () => {
    setFormStep(1);
    setIsAddModalOpen(true);
  };

  // Auto pick emoji based on category
  const handleCategorySelectInForm = (cat: 'kitchen' | 'bills' | 'staff' | 'maintenance') => {
    setFormCategory(cat);
    if (cat === 'kitchen') setFormEmoji('🛒');
    else if (cat === 'bills') setFormEmoji('⚡');
    else if (cat === 'staff') setFormEmoji('👥');
    else setFormEmoji('🔧');
  };

  // Category Card Click -> Filter & Auto-Scroll Down
  const handleCategoryCardClick = (catKey: 'kitchen' | 'bills' | 'staff' | 'maintenance') => {
    setSelectedCategoryFilter(selectedCategoryFilter === catKey ? 'all' : catKey);
    setShowHistory(true);
    setTimeout(() => {
      historySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Step Validation Handlers
  const handleGoNextStep1 = () => {
    if (!formTitle.trim()) {
      alert('Please enter an expense title / item name.');
      return;
    }
    setFormStep(2);
  };

  const handleGoNextStep2 = () => {
    const amt = parseFloat(formAmount);
    if (isNaN(amt) || amt <= 0) {
      alert('Please enter a valid expense amount.');
      return;
    }
    setFormStep(3);
  };

  // Final Submit Expense
  const handleAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Please enter an expense title / item name.');
      setFormStep(1);
      return;
    }
    const amt = parseFloat(formAmount);
    if (isNaN(amt) || amt <= 0) {
      alert('Please enter a valid expense amount.');
      setFormStep(2);
      return;
    }

    const dateObj = new Date(formDate);
    const dateLabel = isNaN(dateObj.getTime()) ? 'Today' : dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

    const newExp: ExpenseItem = {
      id: `exp_${Date.now()}`,
      emoji: formEmoji || '🧾',
      title: formTitle.trim(),
      amount: amt,
      category: formCategory,
      vendor: formVendor.trim() || 'Direct Expense',
      paymentMethod: formPaymentMethod,
      date: formDate,
      dateLabel,
      remarks: formRemarks.trim() || 'Logged via Mobile App',
      status: formStatus
    };

    setExpensesList(prev => [newExp, ...prev]);
    setIsAddModalOpen(false);
    triggerToast(`Added expense ₹${amt.toLocaleString('en-IN')} for "${formTitle}"`);

    // Reset Form
    setFormStep(1);
    setFormTitle('');
    setFormAmount('');
    setFormVendor('');
    setFormRemarks('');
  };

  // Calculate totals
  const totalAmount = expensesList.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPaid = expensesList.filter(e => e.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0);
  const totalPending = expensesList.filter(e => e.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0);

  const getCategoryTotal = (cat: 'kitchen' | 'bills' | 'staff' | 'maintenance') => {
    return expensesList.filter(e => e.category === cat).reduce((acc, curr) => acc + curr.amount, 0);
  };

  const getCategoryCount = (cat: 'kitchen' | 'bills' | 'staff' | 'maintenance') => {
    return expensesList.filter(e => e.category === cat).length;
  };

  // Filtered List for History or View
  const filteredList = expensesList.filter(e => {
    const matchesCategory = selectedCategoryFilter === 'all' || e.category === selectedCategoryFilter;
    const matchesSearch = !searchQuery || 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      e.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.remarks.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="emp-page-wrap">
      
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="emp-toast-floating">
          <CheckCircle2 size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* STICKY TOP HEADER (NO BACK ARROW, NO SUBTITLE TEXT BELOW EXPENSES) */}
      <div className="emp-app-header">
        <div className="emp-header-left">
          <div className="emp-header-title-box">
            <h1 className="emp-header-title">Expenses</h1>
          </div>
        </div>

        <div className="emp-header-right">
          <button 
            type="button" 
            className="emp-add-btn-primary" 
            onClick={handleOpenAddModal}
            title="Add New Expense"
          >
            <Plus size={15} />
            <span>Add</span>
          </button>

          <button 
            type="button" 
            className={`emp-history-icon-btn ${showHistory ? 'active' : ''}`}
            onClick={() => {
              setShowHistory(prev => !prev);
              if (!showHistory) {
                setTimeout(() => {
                  historySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }
            }}
            title="View Transaction History"
          >
            <History size={18} color={showHistory ? '#2563eb' : '#334155'} />
          </button>
        </div>
      </div>

      <div className="emp-body-container">

        {/* OVERALL SPENT METRIC SUMMARY CARD */}
        <div className="emp-summary-card">
          <div className="emp-sum-card-header">
            <div>
              <div className="emp-sum-label">TOTAL SPENT THIS MONTH (JULY 2026)</div>
              <div className="emp-sum-amount">₹{totalAmount.toLocaleString('en-IN')}</div>
            </div>
            <div className="emp-sum-badge">
              <TrendingDown size={13} /> {expensesList.length} Items
            </div>
          </div>
          <div className="emp-sum-card-divider" />
          <div className="emp-sum-row">
            <div className="emp-sum-item">
              <span className="emp-sum-item-lbl">Paid Out</span>
              <span className="emp-sum-item-val paid">₹{totalPaid.toLocaleString('en-IN')}</span>
            </div>
            <div className="emp-sum-item">
              <span className="emp-sum-item-lbl">Pending / Unpaid</span>
              <span className="emp-sum-item-val pending">₹{totalPending.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* EXPENSE CATEGORY CARDS (WITH SPENT AMOUNT & ITEM COUNT) */}
        <div className="emp-section-heading">
          <span>EXPENSE TYPE BREAKDOWN</span>
          <span className="emp-sec-sub">Click a category card to view its history</span>
        </div>

        <div className="emp-category-cards-grid">
          {(Object.keys(CATEGORY_CONFIG) as Array<keyof typeof CATEGORY_CONFIG>).map((catKey) => {
            const cfg = CATEGORY_CONFIG[catKey];
            const spent = getCategoryTotal(catKey);
            const count = getCategoryCount(catKey);
            const percent = totalAmount > 0 ? Math.round((spent / totalAmount) * 100) : 0;

            return (
              <div 
                key={catKey} 
                className={`emp-cat-card ${selectedCategoryFilter === catKey ? 'active' : ''}`}
                style={{ backgroundColor: cfg.bgColor, borderColor: cfg.borderColor }}
                onClick={() => handleCategoryCardClick(catKey)}
              >
                <div className="emp-cat-card-top">
                  <span className="emp-cat-emoji">{cfg.icon}</span>
                  <span className="emp-cat-count-badge" style={{ color: cfg.color }}>{count} items</span>
                </div>
                <div className="emp-cat-name">{cfg.label}</div>
                <div className="emp-cat-spent" style={{ color: cfg.color }}>
                  ₹{spent.toLocaleString('en-IN')}
                </div>

                {/* PROGRESS BAR */}
                <div className="emp-cat-progress-bg">
                  <div 
                    className="emp-cat-progress-fill" 
                    style={{ width: `${percent}%`, background: cfg.progressColor }} 
                  />
                </div>

                <div className="emp-cat-footer">
                  <span>{percent}% of total</span>
                  <ChevronRight size={14} color={cfg.color} />
                </div>
              </div>
            );
          })}
        </div>

        {/* EXPENSE ITEMS GRID OR HISTORY LIST WITH SCROLL REF */}
        <div className="emp-section-heading" ref={historySectionRef} style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <span>{showHistory ? 'EXPENSE HISTORY & SEARCH' : 'KITCHEN & OPERATIONAL EXPENSES'}</span>
            {selectedCategoryFilter !== 'all' && (
              <button 
                type="button" 
                className="emp-clear-cat-filter"
                onClick={() => setSelectedCategoryFilter('all')}
              >
                Show All Categories
              </button>
            )}
          </div>
        </div>

        {/* SEARCH BAR (SHOWN IN HISTORY OR FILTER MODE) */}
        <div className="emp-search-container">
          <Search size={16} className="emp-search-icon" />
          <input
            type="text"
            className="emp-search-input"
            placeholder="Search by expense title, vendor, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button type="button" className="emp-search-clear" onClick={() => setSearchQuery('')}>
              <X size={14} />
            </button>
          )}
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div className="emp-filter-pills-row">
          <button 
            type="button"
            className={`emp-pill ${selectedCategoryFilter === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategoryFilter('all')}
          >
            All ({expensesList.length})
          </button>
          <button 
            type="button"
            className={`emp-pill ${selectedCategoryFilter === 'kitchen' ? 'active' : ''}`}
            onClick={() => handleCategoryCardClick('kitchen')}
          >
            🍳 Kitchen ({getCategoryCount('kitchen')})
          </button>
          <button 
            type="button"
            className={`emp-pill ${selectedCategoryFilter === 'bills' ? 'active' : ''}`}
            onClick={() => handleCategoryCardClick('bills')}
          >
            ⚡ Bills & Rent ({getCategoryCount('bills')})
          </button>
          <button 
            type="button"
            className={`emp-pill ${selectedCategoryFilter === 'staff' ? 'active' : ''}`}
            onClick={() => handleCategoryCardClick('staff')}
          >
            👥 Staff ({getCategoryCount('staff')})
          </button>
          <button 
            type="button"
            className={`emp-pill ${selectedCategoryFilter === 'maintenance' ? 'active' : ''}`}
            onClick={() => handleCategoryCardClick('maintenance')}
          >
            🔧 Maintenance ({getCategoryCount('maintenance')})
          </button>
        </div>

        {/* RENDER EXPENSE CARDS LIST */}
        {filteredList.length === 0 ? (
          <div className="emp-empty-state">
            <Receipt size={32} color="#94a3b8" />
            <div>No expense records found.</div>
            <p>Try searching for a different item or click "+ Add" to log a new record.</p>
          </div>
        ) : (
          <div className="emp-items-grid">
            {filteredList.map((exp) => (
              <div 
                key={exp.id} 
                className="emp-item-card"
                onClick={() => setSelectedItem(exp)}
              >
                <div className="emp-icard-left">
                  <div className="emp-icard-emoji-box">
                    {exp.emoji}
                  </div>
                  <div className="emp-icard-info">
                    <div className="emp-icard-title">{exp.title}</div>
                    <div className="emp-icard-sub">
                      <span className="vendor-text">{exp.vendor}</span>
                      <span className="dot">•</span>
                      <span>{exp.dateLabel}</span>
                    </div>
                  </div>
                </div>

                <div className="emp-icard-right">
                  <div className="emp-icard-amount">
                    ₹{exp.amount.toLocaleString('en-IN')}
                  </div>
                  <div className={`emp-icard-status ${exp.status.toLowerCase()}`}>
                    {exp.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* FAB (FLOATING ADD EXPENSE BUTTON) FOR MOBILE */}
      <button 
        type="button" 
        className="emp-fab-btn"
        onClick={handleOpenAddModal}
        title="Add Expense"
      >
        <Plus size={24} color="#ffffff" />
      </button>

      {/* ─────────────────────────────────────────────────────────────────────────── */}
      {/*  MODAL 1: MULTI-STEP WIZARD ADD EXPENSE SHEET                               */}
      {/* ─────────────────────────────────────────────────────────────────────────── */}
      {isAddModalOpen && (
        <div className="emp-modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="emp-modal-sheet" onClick={(e) => e.stopPropagation()}>
            
            {/* MOBILE DRAG HANDLE */}
            <div className="emp-sheet-drag-handle" />

            {/* SHEET HEADER & STEP WIZARD BAR */}
            <div className="emp-sheet-header">
              <div>
                <div className="emp-wizard-badge">Step {formStep} of 3</div>
                <h3 className="emp-sheet-title">
                  {formStep === 1 && 'Select Category & Item'}
                  {formStep === 2 && 'Amount & Payment Details'}
                  {formStep === 3 && 'Vendor & Review'}
                </h3>
              </div>
              <button type="button" className="emp-sheet-close-btn" onClick={() => setIsAddModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* WIZARD STEP PROGRESS BAR */}
            <div className="emp-wizard-progress-track">
              <div 
                className="emp-wizard-progress-bar" 
                style={{ width: formStep === 1 ? '33%' : formStep === 2 ? '66%' : '100%' }} 
              />
            </div>

            <form onSubmit={handleAddExpenseSubmit} className="emp-sheet-form">
              
              {/* ── STEP 1: CATEGORY & TITLE ── */}
              {formStep === 1 && (
                <div className="emp-wizard-step-content">
                  
                  <div className="emp-form-group">
                    <label className="emp-form-label">Expense Category *</label>
                    <div className="emp-form-cat-grid">
                      <button
                        type="button"
                        className={`emp-cat-select-btn ${formCategory === 'kitchen' ? 'active' : ''}`}
                        onClick={() => handleCategorySelectInForm('kitchen')}
                      >
                        <span>🍳</span> Kitchen Bills
                      </button>
                      <button
                        type="button"
                        className={`emp-cat-select-btn ${formCategory === 'bills' ? 'active' : ''}`}
                        onClick={() => handleCategorySelectInForm('bills')}
                      >
                        <span>⚡</span> Power & Bills
                      </button>
                      <button
                        type="button"
                        className={`emp-cat-select-btn ${formCategory === 'staff' ? 'active' : ''}`}
                        onClick={() => handleCategorySelectInForm('staff')}
                      >
                        <span>👥</span> Staff Salary
                      </button>
                      <button
                        type="button"
                        className={`emp-cat-select-btn ${formCategory === 'maintenance' ? 'active' : ''}`}
                        onClick={() => handleCategorySelectInForm('maintenance')}
                      >
                        <span>🔧</span> Maintenance
                      </button>
                    </div>
                  </div>

                  <div className="emp-form-group" style={{ marginTop: '12px' }}>
                    <label className="emp-form-label">Expense Title / Item Name *</label>
                    <input 
                      type="text"
                      className="emp-form-input"
                      placeholder="e.g. Vegetables stock, Gas Cylinder, Electricity Bill"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>

                  <button 
                    type="button" 
                    className="emp-sheet-submit-btn"
                    style={{ marginTop: '16px' }}
                    onClick={handleGoNextStep1}
                  >
                    <span>Next: Amount & Payment →</span>
                  </button>

                </div>
              )}

              {/* ── STEP 2: AMOUNT & PAYMENT DETAILS ── */}
              {formStep === 2 && (
                <div className="emp-wizard-step-content">
                  
                  <div className="emp-form-group">
                    <label className="emp-form-label">Amount Spent (₹) *</label>
                    <input 
                      type="number"
                      className="emp-form-input"
                      placeholder="e.g. 2400"
                      value={formAmount}
                      onChange={(e) => setFormAmount(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="emp-form-group" style={{ marginTop: '12px' }}>
                    <label className="emp-form-label">Expense Date</label>
                    <input 
                      type="date"
                      className="emp-form-input"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                    />
                  </div>

                  <div className="emp-form-group" style={{ marginTop: '12px' }}>
                    <label className="emp-form-label">Payment Method</label>
                    <select 
                      className="emp-form-select"
                      value={formPaymentMethod}
                      onChange={(e) => setFormPaymentMethod(e.target.value)}
                    >
                      <option value="UPI">UPI / GPay / PhonePe</option>
                      <option value="Cash">Cash</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Card">Credit / Debit Card</option>
                    </select>
                  </div>

                  <div className="emp-form-group" style={{ marginTop: '12px' }}>
                    <label className="emp-form-label">Payment Status</label>
                    <div className="emp-status-pill-group">
                      <button
                        type="button"
                        className={`emp-status-pill-btn paid ${formStatus === 'Paid' ? 'active' : ''}`}
                        onClick={() => setFormStatus('Paid')}
                      >
                        Paid
                      </button>
                      <button
                        type="button"
                        className={`emp-status-pill-btn pending ${formStatus === 'Pending' ? 'active' : ''}`}
                        onClick={() => setFormStatus('Pending')}
                      >
                        Pending
                      </button>
                    </div>
                  </div>

                  <div className="emp-wizard-actions-row">
                    <button 
                      type="button" 
                      className="emp-wizard-back-btn"
                      onClick={() => setFormStep(1)}
                    >
                      <ArrowLeft size={15} />
                      <span>Back</span>
                    </button>
                    <button 
                      type="button" 
                      className="emp-sheet-submit-btn flex-1"
                      onClick={handleGoNextStep2}
                    >
                      <span>Next: Vendor & Review →</span>
                    </button>
                  </div>

                </div>
              )}

              {/* ── STEP 3: VENDOR, NOTES & REVIEW ── */}
              {formStep === 3 && (
                <div className="emp-wizard-step-content">
                  
                  <div className="emp-form-group">
                    <label className="emp-form-label">Vendor / Store Name (Optional)</label>
                    <input 
                      type="text"
                      className="emp-form-input"
                      placeholder="e.g. Sabzi Mandi, HP Gas Agency"
                      value={formVendor}
                      onChange={(e) => setFormVendor(e.target.value)}
                      autoFocus
                    />
                  </div>

                  <div className="emp-form-group" style={{ marginTop: '12px' }}>
                    <label className="emp-form-label">Remarks / Notes (Optional)</label>
                    <textarea 
                      className="emp-form-textarea"
                      rows={2}
                      placeholder="Additional notes..."
                      value={formRemarks}
                      onChange={(e) => setFormRemarks(e.target.value)}
                    />
                  </div>

                  {/* MINI SUMMARY PREVIEW CARD */}
                  <div className="emp-wizard-summary-preview">
                    <div className="emp-wsp-header">PREVIEW EXPENSE RECORD</div>
                    <div className="emp-wsp-row">
                      <span>Item Title:</span>
                      <strong>{formEmoji} {formTitle || 'Expense'}</strong>
                    </div>
                    <div className="emp-wsp-row">
                      <span>Category:</span>
                      <strong>{CATEGORY_CONFIG[formCategory]?.label}</strong>
                    </div>
                    <div className="emp-wsp-row">
                      <span>Total Amount:</span>
                      <strong className="amount">₹{parseFloat(formAmount || '0').toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="emp-wsp-row">
                      <span>Mode & Status:</span>
                      <span>{formPaymentMethod} • <span className={`status-${formStatus.toLowerCase()}`}>{formStatus}</span></span>
                    </div>
                  </div>

                  <div className="emp-wizard-actions-row">
                    <button 
                      type="button" 
                      className="emp-wizard-back-btn"
                      onClick={() => setFormStep(2)}
                    >
                      <ArrowLeft size={15} />
                      <span>Back</span>
                    </button>

                    <button type="submit" className="emp-sheet-submit-btn flex-1">
                      <span>Save Expense Record ✓</span>
                    </button>
                  </div>

                </div>
              )}

            </form>

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────── */}
      {/*  MODAL 2: EXPENSE DETAIL VIEW / RECEIPT SHEET                              */}
      {/* ─────────────────────────────────────────────────────────────────────────── */}
      {selectedItem && (
        <div className="emp-modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="emp-receipt-modal" onClick={(e) => e.stopPropagation()}>
            
            {/* MOBILE DRAG HANDLE */}
            <div className="emp-sheet-drag-handle" />

            <div className="emp-receipt-top">
              <button type="button" className="emp-sheet-close-btn" onClick={() => setSelectedItem(null)}>
                <X size={18} />
              </button>
              
              <div className="emp-receipt-emoji-badge">
                {selectedItem.emoji}
              </div>

              <div className="emp-receipt-title">{selectedItem.title}</div>
              <div className="emp-receipt-cat-tag">
                {CATEGORY_CONFIG[selectedItem.category]?.label || 'General Expense'}
              </div>

              <div className="emp-receipt-amount-box">
                <span className="emp-ramt-currency">₹</span>
                <span className="emp-ramt-val">{selectedItem.amount.toLocaleString('en-IN')}</span>
              </div>

              <div className={`emp-receipt-status-badge ${selectedItem.status.toLowerCase()}`}>
                {selectedItem.status === 'Paid' ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
                <span>{selectedItem.status}</span>
              </div>
            </div>

            <div className="emp-receipt-divider" />

            <div className="emp-receipt-grid">
              <div className="emp-rg-row">
                <span className="emp-rg-lbl">Vendor / Supplier</span>
                <span className="emp-rg-val">{selectedItem.vendor}</span>
              </div>
              <div className="emp-rg-row">
                <span className="emp-rg-lbl">Date of Expense</span>
                <span className="emp-rg-val">{selectedItem.date === '-' ? 'Not set' : selectedItem.date}</span>
              </div>
              <div className="emp-rg-row">
                <span className="emp-rg-lbl">Payment Mode</span>
                <span className="emp-rg-val badge-mode">{selectedItem.paymentMethod}</span>
              </div>
              <div className="emp-rg-row">
                <span className="emp-rg-lbl">Logged By</span>
                <span className="emp-rg-val">Vijaya (Hostel Admin)</span>
              </div>
              <div className="emp-rg-row">
                <span className="emp-rg-lbl">Remarks / Notes</span>
                <span className="emp-rg-val">{selectedItem.remarks || 'None'}</span>
              </div>
            </div>

            <div className="emp-receipt-actions">
              <button 
                type="button" 
                className="emp-receipt-act-btn secondary"
                onClick={() => triggerToast(`Receipt downloaded for ${selectedItem.title}`)}
              >
                <Download size={14} />
                <span>Download Receipt</span>
              </button>

              <button 
                type="button" 
                className="emp-receipt-act-btn primary"
                onClick={() => triggerToast(`Receipt shared via WhatsApp`)}
              >
                <Share2 size={14} />
                <span>Share</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
