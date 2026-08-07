import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Receipt,
  Send,
  History,
  Calendar,
  ChevronRight,
  X,
  Printer,
  CreditCard,
  Clock,
  PlusCircle,
  User,
  Phone,
  ArrowRight,
  DollarSign
} from 'lucide-react';
import type { FeeTransaction, PaymentStatus, FeeHistoryItem, MonthRentRecord } from '../types';

interface FeesManagementPageProps {
  feeTransactions: FeeTransaction[];
  setFeeTransactions: React.Dispatch<React.SetStateAction<FeeTransaction[]>>;
  showToast?: (message: string) => void;
  onSelectFeeForVerification?: (fee: FeeTransaction) => void;
  onOpenPaymentHistory?: () => void;
  onOpenDuePayments?: () => void;
  onNavigateToCollectFee?: (resident: { id: string; name: string; roomNumber: string; amount?: number }) => void;
  onOpenStaffManagement?: () => void;
  onOpenExpenses?: () => void;
}

export const FeesManagementPage: React.FC<FeesManagementPageProps> = ({
  feeTransactions,
  setFeeTransactions,
  showToast,
  onOpenPaymentHistory,
  onOpenDuePayments
}) => {
  // Main Search State
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Collect Fee Modal State
  const [isCollectModalOpen, setIsCollectModalOpen] = useState<boolean>(false);
  const [collectUserSearch, setCollectUserSearch] = useState<string>('');
  const [selectedCollectResident, setSelectedCollectResident] = useState<FeeTransaction | null>(null);
  const [collectPayAmount, setCollectPayAmount] = useState<string>('');
  const [collectPayMethod, setCollectPayMethod] = useState<string>('UPI / GPay');

  // User Monthly Rent Details Popup State
  const [activeUserPopup, setActiveUserPopup] = useState<FeeTransaction | null>(null);
  
  // Ref for auto-scrolling directly to current month
  const currentMonthRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeUserPopup && currentMonthRef.current) {
      const timer = setTimeout(() => {
        currentMonthRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [activeUserPopup]);
  
  // Month Detail Drawer inside User Popup
  const [activeMonthItem, setActiveMonthItem] = useState<{
    resident: FeeTransaction;
    month: MonthRentRecord;
  } | null>(null);

  // Digital Receipt Modal State
  const [receiptData, setReceiptData] = useState<{
    studentName: string;
    roomNumber: string;
    monthName: string;
    date: string;
    amountPaid: number;
    totalAmount: number;
    dues: number;
    paymentMethod: string;
    receiptNo: string;
  } | null>(null);

  // History / Analytics Modal State
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState<boolean>(false);

  // Filtered transactions for main user list (Search by name, room no, or contact number)
  const filteredFees = feeTransactions.filter(fee => {
    const query = searchQuery.toLowerCase();
    const matchesName = fee.studentName.toLowerCase().includes(query);
    const matchesRoom = fee.roomNumber.toLowerCase().includes(query);
    const matchesPhone = fee.phone ? fee.phone.toLowerCase().includes(query) : false;
    return matchesName || matchesRoom || matchesPhone;
  });

  // Filtered residents for Collect Fee Modal Search (Name or Contact Number)
  const collectSearchResults = feeTransactions.filter(fee => {
    if (!collectUserSearch.trim()) return true;
    const query = collectUserSearch.toLowerCase();
    const matchesName = fee.studentName.toLowerCase().includes(query);
    const matchesPhone = fee.phone ? fee.phone.toLowerCase().includes(query) : false;
    const matchesRoom = fee.roomNumber.toLowerCase().includes(query);
    return matchesName || matchesPhone || matchesRoom;
  });

  // Financial Stats Calculations
  const totalCollection = feeTransactions.reduce((acc, f) => acc + (f.amountPaid || 0), 0);
  const totalDues = feeTransactions.reduce((acc, f) => acc + (f.dues || 0), 0);
  const pendingCount = feeTransactions.filter(f => f.status === 'Pending' || f.status === 'Partial' || f.status === 'Overdue').length;

  // Handler to Record Fee Payment
  const handleProcessFeePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCollectResident) {
      if (showToast) showToast('Please select a resident user first.');
      return;
    }

    const payAmt = parseFloat(collectPayAmount);
    if (isNaN(payAmt) || payAmt <= 0) {
      if (showToast) showToast('Please enter a valid payment amount.');
      return;
    }

    const currentDues = selectedCollectResident.dues;
    if (payAmt > currentDues && currentDues > 0) {
      if (showToast) showToast(`Entered amount exceeds due amount ₹${currentDues.toLocaleString('en-IN')}`);
      return;
    }

    const newAmountPaid = selectedCollectResident.amountPaid + payAmt;
    const newDues = Math.max(0, selectedCollectResident.amount - newAmountPaid);
    const newStatus: PaymentStatus = newDues === 0 ? 'Paid' : 'Partial';

    const newReceiptNo = `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const todayStr = new Date().toISOString().split('T')[0];

    const newHistoryItem: FeeHistoryItem = {
      id: `h-${Date.now()}`,
      date: todayStr,
      amountPaid: payAmt,
      paymentMethod: collectPayMethod,
      receiptNo: newReceiptNo
    };

    setFeeTransactions(prev =>
      prev.map(item => {
        if (item.id === selectedCollectResident.id) {
          const updatedHistory = item.history ? [newHistoryItem, ...item.history] : [newHistoryItem];
          
          // Update monthly records if present
          const updatedMonthlyRecords = item.monthlyRecords?.map(m => {
            if (m.isCurrentMonth || m.monthName === item.month) {
              const mPaid = m.amountPaid + payAmt;
              const mDues = Math.max(0, m.amount - mPaid);
              return {
                ...m,
                amountPaid: mPaid,
                dues: mDues,
                status: (mDues === 0 ? 'Paid' : 'Partial') as PaymentStatus,
                lastPaymentDate: todayStr,
                history: m.history ? [newHistoryItem, ...m.history] : [newHistoryItem]
              };
            }
            return m;
          });

          return {
            ...item,
            amountPaid: newAmountPaid,
            dues: newDues,
            status: newStatus,
            paymentMethod: collectPayMethod,
            lastPaymentDate: todayStr,
            history: updatedHistory,
            monthlyRecords: updatedMonthlyRecords
          };
        }
        return item;
      })
    );

    if (showToast) {
      showToast(`Collected ₹${payAmt.toLocaleString('en-IN')} from ${selectedCollectResident.studentName}! Status: ${newStatus}`);
    }

    // Auto trigger receipt preview
    setReceiptData({
      studentName: selectedCollectResident.studentName,
      roomNumber: selectedCollectResident.roomNumber,
      monthName: selectedCollectResident.month,
      date: todayStr,
      amountPaid: payAmt,
      totalAmount: selectedCollectResident.amount,
      dues: newDues,
      paymentMethod: collectPayMethod,
      receiptNo: newReceiptNo
    });

    // Reset modals
    setIsCollectModalOpen(false);
    setSelectedCollectResident(null);
    setCollectPayAmount('');
    setActiveUserPopup(null);
    setActiveMonthItem(null);
  };

  // Helper to open Collect Modal pre-filled for a specific resident
  const openCollectForResident = (resident: FeeTransaction, defaultAmount?: number) => {
    setActiveUserPopup(null);
    setActiveMonthItem(null);
    setSelectedCollectResident(resident);
    setCollectPayAmount(defaultAmount ? defaultAmount.toString() : resident.dues.toString());
    setIsCollectModalOpen(true);
  };

  return (
    <div className="ref-fees-container">
      
      {/* 1. TOP HEADER WITH PAYMENTS TITLE, DATE BELOW, AND COLLECT BUTTON PARALLEL */}
      <div className="ref-fees-header-row">
        <div>
          <h1 className="ref-fees-title">Payments</h1>
          {/* DATE BELOW THE PAYMENTS HEADING */}
          <div className="ref-date-below-heading">
            <Calendar size={13} style={{ color: '#2563eb' }} />
            <span>July 2026 • Current Billing Month</span>
          </div>
        </div>

        {/* PARALLEL COLLECT FEE BUTTON */}
        <button
          className="ref-collect-header-btn"
          onClick={() => {
            setSelectedCollectResident(null);
            setCollectUserSearch('');
            setCollectPayAmount('');
            setIsCollectModalOpen(true);
          }}
        >
          <PlusCircle size={17} />
          <span>Collect Fee</span>
        </button>
      </div>

      {/* 2. TWO FINANCIAL SUMMARY CARDS (REVENUE & DUE) */}
      <div className="ref-summary-cards-grid">
        {/* CARD 1: LIGHT BLUE - TOTAL REVENUE */}
        <div className="ref-summary-card card-pastel-blue">
          <div className="ref-card-label">TOTAL REVENUE</div>
          <div className="ref-card-value">
            ₹{(totalCollection > 0 ? totalCollection : 37600).toLocaleString('en-IN')}
          </div>
          <div className="ref-card-badge badge-green">
            <TrendingUp size={15} />
            <span>+12% vs last mo</span>
          </div>
        </div>

        {/* CARD 2: LIGHT YELLOW - TOTAL DUE */}
        <div
          className="ref-summary-card card-pastel-yellow"
          onClick={() => {
            if (onOpenDuePayments) onOpenDuePayments();
          }}
          style={{ cursor: 'pointer' }}
        >
          <div className="ref-card-label">TOTAL DUE</div>
          <div className="ref-card-value">
            ₹{(totalDues > 0 ? totalDues : 112800).toLocaleString('en-IN')}
          </div>
          <div className="ref-card-badge badge-amber">
            <span className="ref-badge-icon">!</span>
            <span>{pendingCount} pending</span>
          </div>
        </div>
      </div>

      {/* 3. SEARCH BAR MOVED HERE (WHERE FILTERS WERE LOCATED) */}
      <div className="ref-search-bar-wrap">
        <Search size={18} style={{ color: '#94a3b8' }} />
        <input
          type="text"
          placeholder="Search by name, room no, or contact number..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="ref-search-input"
        />
        {searchQuery && (
          <button className="ref-clear-search-btn" onClick={() => setSearchQuery('')}>
            <X size={14} />
          </button>
        )}
      </div>

      {/* 4. SECTION HEADER WITH HISTORY BUTTON INSTEAD OF "7 RECORDS" */}
      <div className="ref-section-header">
        <h2 className="ref-section-title">ALL RESIDENTS FEE DIRECTORY</h2>
        {/* HISTORY BUTTON PLACED HERE */}
        <button
          className="ref-section-history-btn"
          onClick={() => {
            if (onOpenPaymentHistory) onOpenPaymentHistory();
            else setIsAnalyticsOpen(true);
          }}
        >
          <History size={15} />
          <span>Payment History</span>
        </button>
      </div>

      {/* 5. ALL USERS LIST RENDERING */}
      <div className="ref-payment-cards-list">
        {filteredFees.length === 0 ? (
          <div className="ref-empty-state">
            <AlertCircle size={32} style={{ color: '#94a3b8', margin: '0 auto 8px' }} />
            <p style={{ fontWeight: 600, color: '#475569' }}>No residents match your search query.</p>
          </div>
        ) : (
          filteredFees.map(fee => (
            <div
              key={fee.id}
              className="ref-payment-card-ref-style"
              onClick={() => setActiveUserPopup(fee)}
            >
              {/* TOP LINE: STUDENT NAME + ROOM BADGE + CHEVRON RIGHT */}
              <div className="ref-card-main-line">
                <div className="ref-student-title-group">
                  <span className="ref-student-name-bold">{fee.studentName}</span>
                  <span className="ref-room-pill-badge">Room {fee.roomNumber}</span>
                </div>
                <div className="ref-chevron-icon-wrap">
                  <ChevronRight size={20} style={{ color: '#334155' }} />
                </div>
              </div>

              {/* SECOND LINE: LAST PAYMENT ON DATE */}
              <div className="ref-uploaded-text flex items-center justify-between">
                <span>Last payment on: <strong style={{ color: '#1e293b' }}>{fee.lastPaymentDate || fee.uploadedDate || '26 Jul 2026'}</strong></span>
                <span className={`ref-mini-status-tag tag-${fee.status.toLowerCase()}`}>
                  {fee.status === 'Paid' ? 'Cleared' : fee.status === 'Partial' ? `Due ₹${fee.dues.toLocaleString('en-IN')}` : `Pending ₹${fee.dues.toLocaleString('en-IN')}`}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL: COLLECT FEE (WITH USER SELECTION & REMAINING AMOUNT CALCULATOR)   */}
      {/* ========================================================================= */}
      {isCollectModalOpen && (
        <div className="ref-modal-overlay" style={{ zIndex: 1200 }} onClick={() => setIsCollectModalOpen(false)}>
          <div className="ref-modal-card" onClick={e => e.stopPropagation()}>
            <div className="ref-modal-header">
              <div>
                <h3 className="ref-modal-title">Collect Fee Payment</h3>
                <p className="ref-modal-subtitle">Select user & record payment details</p>
              </div>
              <button className="ref-close-btn" onClick={() => setIsCollectModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleProcessFeePayment} className="ref-modal-body">
              {/* USER SELECTION SEARCH FIELD */}
              <div className="ref-form-group">
                <label className="ref-form-label">
                  <User size={14} style={{ display: 'inline', marginRight: 4 }} />
                  Select Resident User (Search Name or Contact No)
                </label>
                <div className="ref-input-with-icon" style={{ position: 'relative' }}>
                  <Search size={16} className="ref-input-icon" />
                  <input
                    type="text"
                    placeholder="Type name or phone number..."
                    value={selectedCollectResident ? `${selectedCollectResident.studentName} (Room ${selectedCollectResident.roomNumber})` : collectUserSearch}
                    onChange={e => {
                      setSelectedCollectResident(null);
                      setCollectUserSearch(e.target.value);
                    }}
                    className="ref-form-input"
                    style={{ paddingLeft: '36px' }}
                  />
                  {selectedCollectResident && (
                    <button
                      type="button"
                      className="ref-clear-search-btn"
                      style={{ position: 'absolute', right: '10px' }}
                      onClick={() => {
                        setSelectedCollectResident(null);
                        setCollectUserSearch('');
                        setCollectPayAmount('');
                      }}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* USER DROPDOWN SUGGESTIONS (IF NOT SELECTED YET) */}
                {!selectedCollectResident && (
                  <div className="ref-user-suggestions-box">
                    {collectSearchResults.length === 0 ? (
                      <div className="ref-no-user-text">No matching resident found.</div>
                    ) : (
                      collectSearchResults.map(res => (
                        <div
                          key={res.id}
                          className="ref-user-suggestion-item"
                          onClick={() => {
                            setSelectedCollectResident(res);
                            setCollectPayAmount(res.dues > 0 ? res.dues.toString() : res.amount.toString());
                          }}
                        >
                          <div>
                            <div className="font-bold text-slate-800">{res.studentName}</div>
                            <div className="text-xs text-slate-500">
                              Room {res.roomNumber} • <Phone size={11} style={{ display: 'inline' }} /> {res.phone}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              Dues: ₹{res.dues.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* SELECTED RESIDENT FINANCIAL SUMMARY */}
              {selectedCollectResident && (
                <>
                  <div className="ref-pay-summary-box">
                    <div className="ref-pay-row">
                      <span>Total Monthly Fee:</span>
                      <span className="font-bold">₹{selectedCollectResident.amount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="ref-pay-row">
                      <span>Already Paid:</span>
                      <span className="font-bold text-emerald-600">₹{selectedCollectResident.amountPaid.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="ref-pay-row highlight">
                      <span>Pending Due Amount:</span>
                      <span className="font-bold text-amber-600">₹{selectedCollectResident.dues.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* INPUT FIELD FOR ENTERING AMOUNT */}
                  <div className="ref-form-group">
                    <label className="ref-form-label">Payment Amount (₹)</label>
                    <div className="ref-input-with-icon">
                      <span className="ref-currency-prefix">₹</span>
                      <input
                        type="number"
                        value={collectPayAmount}
                        onChange={e => setCollectPayAmount(e.target.value)}
                        placeholder="Enter amount to pay"
                        className="ref-form-input"
                        max={selectedCollectResident.dues > 0 ? selectedCollectResident.dues : selectedCollectResident.amount}
                        min={1}
                        required
                      />
                    </div>

                    {/* DYNAMIC REMAINING AMOUNT CALCULATION BOX */}
                    {(() => {
                      const entered = parseFloat(collectPayAmount) || 0;
                      const targetDue = selectedCollectResident.dues > 0 ? selectedCollectResident.dues : selectedCollectResident.amount;
                      const remaining = Math.max(0, targetDue - entered);
                      
                      return (
                        <div className="ref-remaining-calc-callout">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold text-slate-600">Calculated Remaining Balance:</span>
                            <span className={`text-sm font-extrabold ${remaining > 0 ? 'text-amber-700' : 'text-emerald-700'}`}>
                              ₹{remaining.toLocaleString('en-IN')}
                            </span>
                          </div>
                          {remaining > 0 ? (
                            <p className="text-[11px] text-amber-600 mt-0.5">
                              * Payment amount is less than total due. Status will be set to <strong>Partial</strong>.
                            </p>
                          ) : entered > 0 ? (
                            <p className="text-[11px] text-emerald-600 mt-0.5">
                              * Full payment covered! Account will be marked as <strong>Cleared</strong>.
                            </p>
                          ) : null}
                        </div>
                      );
                    })()}

                    <div className="ref-quick-pay-btns mt-2">
                      <button
                        type="button"
                        className="ref-quick-btn"
                        onClick={() => setCollectPayAmount(selectedCollectResident.dues.toString())}
                      >
                        Full Dues (₹{selectedCollectResident.dues.toLocaleString('en-IN')})
                      </button>
                      {selectedCollectResident.dues > 2000 && (
                        <button
                          type="button"
                          className="ref-quick-btn"
                          onClick={() => setCollectPayAmount((selectedCollectResident.dues / 2).toString())}
                        >
                          50% (₹{(selectedCollectResident.dues / 2).toLocaleString('en-IN')})
                        </button>
                      )}
                    </div>
                  </div>

                  {/* PAYMENT MODE SELECTOR */}
                  <div className="ref-form-group">
                    <label className="ref-form-label">Payment Mode</label>
                    <div className="ref-payment-methods-grid">
                      {(['UPI / GPay', 'Cash', 'NetBanking', 'Credit Card'] as const).map(mode => (
                        <button
                          key={mode}
                          type="button"
                          className={`ref-mode-btn ${collectPayMethod === mode ? 'active' : ''}`}
                          onClick={() => setCollectPayMethod(mode)}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="ref-modal-actions">
                    <button
                      type="button"
                      className="ref-btn-cancel"
                      onClick={() => setIsCollectModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="ref-btn-submit">
                      Confirm & Collect Fee
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: USER MONTHLY RENT DETAILS POPUP (MAIN USER CLICK)                 */}
      {/* ========================================================================= */}
      {activeUserPopup && (
        <div className="ref-modal-overlay" onClick={() => setActiveUserPopup(null)}>
          <div className="ref-modal-card" onClick={e => e.stopPropagation()}>
            <div className="ref-modal-header">
              <div>
                <h3 className="ref-modal-title">{activeUserPopup.studentName}</h3>
                <p className="ref-modal-subtitle">
                  Room {activeUserPopup.roomNumber} • <Phone size={11} style={{ display: 'inline' }} /> {activeUserPopup.phone}
                </p>
              </div>
              <button className="ref-close-btn" onClick={() => setActiveUserPopup(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="ref-modal-body">
              <div className="flex justify-between items-center mb-2 px-0.5">
                <div className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500 whitespace-nowrap">
                  Annual Statement 2026
                </div>
                <div className="text-[9.5px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 whitespace-nowrap">
                  Jan - Dec 2026
                </div>
              </div>

              {/* 12 MONTHS COMPACT CARDS LIST */}
              <div className="ref-month-records-list compact-year-list">
                {(() => {
                  const monthConfig = [
                    { name: 'January 2026', range: '01-01-2026 to 31-01-2026', status: 'Paid', dues: 0, paid: activeUserPopup.amount },
                    { name: 'February 2026', range: '01-02-2026 to 28-02-2026', status: 'Paid', dues: 0, paid: activeUserPopup.amount },
                    { name: 'March 2026', range: '01-03-2026 to 31-03-2026', status: 'Paid', dues: 0, paid: activeUserPopup.amount },
                    { name: 'April 2026', range: '01-04-2026 to 30-04-2026', status: 'Paid', dues: 0, paid: activeUserPopup.amount },
                    { name: 'May 2026', range: '01-05-2026 to 31-05-2026', status: 'Paid', dues: 0, paid: activeUserPopup.amount },
                    { name: 'June 2026', range: '01-06-2026 to 30-06-2026', status: 'Paid', dues: 0, paid: activeUserPopup.amount },
                    { name: 'July 2026', range: '01-07-2026 to 31-07-2026', isCurrent: true, status: activeUserPopup.status, dues: activeUserPopup.dues, paid: activeUserPopup.amountPaid },
                    { name: 'August 2026', range: '01-08-2026 to 31-08-2026', isFuture: true, status: 'Upcoming', dues: activeUserPopup.amount, paid: 0 },
                    { name: 'September 2026', range: '01-09-2026 to 30-09-2026', isFuture: true, status: 'Upcoming', dues: activeUserPopup.amount, paid: 0 },
                    { name: 'October 2026', range: '01-10-2026 to 31-10-2026', isFuture: true, status: 'Upcoming', dues: activeUserPopup.amount, paid: 0 },
                    { name: 'November 2026', range: '01-11-2026 to 30-11-2026', isFuture: true, status: 'Upcoming', dues: activeUserPopup.amount, paid: 0 },
                    { name: 'December 2026', range: '01-12-2026 to 31-12-2026', isFuture: true, status: 'Upcoming', dues: activeUserPopup.amount, paid: 0 },
                  ];

                  const fullRecords: MonthRentRecord[] = activeUserPopup.monthlyRecords && activeUserPopup.monthlyRecords.length >= 12
                    ? activeUserPopup.monthlyRecords
                    : monthConfig.map((m, idx) => ({
                        id: `yr-m-${idx}`,
                        monthName: m.name,
                        isCurrentMonth: m.isCurrent || false,
                        dateRange: m.range,
                        amount: activeUserPopup.amount,
                        amountPaid: m.paid,
                        dues: m.dues,
                        status: (m.isFuture ? 'Pending' : m.status) as PaymentStatus,
                        lastPaymentDate: m.isCurrent ? activeUserPopup.lastPaymentDate : (m.status === 'Paid' ? `28 ${m.name.slice(0, 3)} 2026` : undefined),
                        history: m.status === 'Paid' ? [{ id: `h-${idx}`, date: `2026-0${idx+1}-28`, amountPaid: activeUserPopup.amount, paymentMethod: 'UPI / Cash', receiptNo: `REC-2026-0${idx+1}01` }] : []
                      }));

                  return fullRecords.map(mRecord => {
                    const isCurrent = mRecord.isCurrentMonth || mRecord.monthName === 'July 2026';
                    const isUpcoming = mRecord.monthName.includes('August') || mRecord.monthName.includes('September') || mRecord.monthName.includes('October') || mRecord.monthName.includes('November') || mRecord.monthName.includes('December');

                    return (
                      <div
                        key={mRecord.id}
                        ref={isCurrent ? currentMonthRef : undefined}
                        className={`ref-compact-month-row ${isCurrent ? 'is-current-month' : isUpcoming ? 'is-upcoming-month' : 'is-other-month'}`}
                        onClick={() => {
                          if (mRecord.status === 'Paid') {
                            setReceiptData({
                              studentName: activeUserPopup.studentName,
                              roomNumber: activeUserPopup.roomNumber,
                              monthName: mRecord.monthName,
                              date: mRecord.lastPaymentDate || '28 Jul 2026',
                              amountPaid: mRecord.amountPaid || mRecord.amount,
                              totalAmount: mRecord.amount,
                              dues: 0,
                              paymentMethod: mRecord.history?.[0]?.paymentMethod || 'UPI / Cash',
                              receiptNo: mRecord.history?.[0]?.receiptNo || 'REC-2026-0781'
                            });
                          } else if (!isUpcoming) {
                            setActiveMonthItem({
                              resident: activeUserPopup,
                              month: mRecord
                            });
                          } else {
                            openCollectForResident(activeUserPopup, mRecord.amount);
                          }
                        }}
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <div className={`ref-compact-month-name ${isCurrent ? 'current-active-text' : isUpcoming ? 'text-slate-400 font-normal' : 'other-gray-text'}`}>
                              {mRecord.monthName}
                            </div>
                            {isCurrent && <span className="ref-current-badge">Current</span>}
                          </div>
                          <div className="ref-compact-daterange text-[10px] font-medium text-slate-500 whitespace-nowrap">
                            {mRecord.dateRange}
                          </div>
                        </div>

                        <div>
                          {mRecord.status === 'Paid' && (
                            <span className="ref-status-pill status-paid-green">
                              Cleared ✓
                            </span>
                          )}
                          {mRecord.status === 'Partial' && (
                            <span className="ref-status-pill status-partial-yellow">
                              Remaining: ₹{mRecord.dues.toLocaleString('en-IN')}
                            </span>
                          )}
                          {(mRecord.status === 'Pending' || mRecord.status === 'Overdue') && !isUpcoming && (
                            <span className="ref-status-pill status-pending-red">
                              Pending: ₹{mRecord.dues.toLocaleString('en-IN')}
                            </span>
                          )}
                          {isUpcoming && (
                            <span className="ref-status-pill status-upcoming-gray">
                              Upcoming
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            <div className="ref-modal-actions">
              <button className="ref-btn-cancel" onClick={() => setActiveUserPopup(null)}>
                Close Statement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: MONTH ITEM ACTION DRAWER (FOR PARTIAL / PENDING MONTHS)          */}
      {/* ========================================================================= */}
      {activeMonthItem && (
        <div className="ref-modal-overlay" onClick={() => setActiveMonthItem(null)}>
          <div className="ref-modal-card" onClick={e => e.stopPropagation()}>
            <div className="ref-modal-header">
              <div>
                <h3 className="ref-modal-title">{activeMonthItem.resident.studentName}</h3>
                <p className="ref-modal-subtitle">
                  {activeMonthItem.month.monthName} Details • Room {activeMonthItem.resident.roomNumber}
                </p>
              </div>
              <button className="ref-close-btn" onClick={() => setActiveMonthItem(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="ref-modal-body">
              <div className="ref-pay-summary-box">
                <div className="ref-pay-row">
                  <span>Billing Period:</span>
                  <span className="font-semibold">{activeMonthItem.month.dateRange}</span>
                </div>
                <div className="ref-pay-row">
                  <span>Total Monthly Rent:</span>
                  <span className="font-bold">₹{activeMonthItem.month.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="ref-pay-row">
                  <span>Amount Paid So Far:</span>
                  <span className="font-bold text-emerald-600">₹{activeMonthItem.month.amountPaid.toLocaleString('en-IN')}</span>
                </div>
                <div className="ref-pay-row highlight">
                  <span>Remaining Due Amount:</span>
                  <span className="font-bold text-amber-600">₹{activeMonthItem.month.dues.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* PAST PAYMENT RECEIPT IF PARTIALLY PAID */}
              {activeMonthItem.month.status === 'Partial' && activeMonthItem.month.history && activeMonthItem.month.history.length > 0 && (
                <div className="ref-past-receipt-box">
                  <div className="text-xs font-bold text-slate-700 mb-1">Past Partial Payment Receipt</div>
                  <div className="text-xs text-slate-600 flex justify-between">
                    <span>Receipt No: <strong>{activeMonthItem.month.history[0].receiptNo}</strong></span>
                    <span>Paid: <strong>₹{activeMonthItem.month.history[0].amountPaid.toLocaleString('en-IN')}</strong></span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Date: {activeMonthItem.month.history[0].date} via {activeMonthItem.month.history[0].paymentMethod}
                  </div>
                </div>
              )}

              {/* COLLECT BUTTON */}
              <div className="mt-4">
                <button
                  className="ref-btn-submit w-full"
                  onClick={() => {
                    const res = activeMonthItem.resident;
                    const dueAmt = activeMonthItem.month.dues;
                    setActiveMonthItem(null);
                    openCollectForResident(res, dueAmt);
                  }}
                >
                  <CreditCard size={16} /> Collect Remaining Fee (₹{activeMonthItem.month.dues.toLocaleString('en-IN')})
                </button>
              </div>
            </div>

            <div className="ref-modal-actions">
              <button className="ref-btn-cancel" onClick={() => setActiveMonthItem(null)}>
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: DIGITAL RECEIPT GENERATOR & PRINT OPTION                          */}
      {/* ========================================================================= */}
      {receiptData && (
        <div className="ref-modal-overlay" style={{ zIndex: 1300 }} onClick={() => setReceiptData(null)}>
          <div className="ref-modal-card receipt-card" onClick={e => e.stopPropagation()}>
            <div className="ref-receipt-header">
              <div>
                <div className="ref-receipt-brand">🏡 HAPPY HOSTELS PRO</div>
                <div className="ref-receipt-sub">Fee Payment Receipt</div>
              </div>
              <button className="ref-close-btn" onClick={() => setReceiptData(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="ref-receipt-body">
              <div className="ref-receipt-stamp">PAID / CLEARED</div>
              
              <div className="ref-receipt-grid">
                <div>
                  <span className="ref-receipt-label">Student Name</span>
                  <div className="ref-receipt-val">{receiptData.studentName}</div>
                </div>
                <div>
                  <span className="ref-receipt-label">Room Number</span>
                  <div className="ref-receipt-val">Room {receiptData.roomNumber}</div>
                </div>
                <div>
                  <span className="ref-receipt-label">Fee Period</span>
                  <div className="ref-receipt-val">{receiptData.monthName}</div>
                </div>
                <div>
                  <span className="ref-receipt-label">Date</span>
                  <div className="ref-receipt-val">{receiptData.date}</div>
                </div>
                <div>
                  <span className="ref-receipt-label">Payment Method</span>
                  <div className="ref-receipt-val">{receiptData.paymentMethod}</div>
                </div>
                <div>
                  <span className="ref-receipt-label">Receipt Number</span>
                  <div className="ref-receipt-val font-mono">{receiptData.receiptNo}</div>
                </div>
              </div>

              <div className="ref-receipt-table">
                <div className="ref-rt-row ref-rt-head">
                  <span>Description</span>
                  <span className="text-right">Amount</span>
                </div>
                <div className="ref-rt-row">
                  <span>Hostel Monthly Rent</span>
                  <span className="text-right">₹{receiptData.totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="ref-rt-row">
                  <span>Amount Paid</span>
                  <span className="text-right text-emerald-600 font-bold">₹{receiptData.amountPaid.toLocaleString('en-IN')}</span>
                </div>
                <div className="ref-rt-row ref-rt-total">
                  <span>Remaining Dues</span>
                  <span className="text-right text-amber-600 font-bold">₹{receiptData.dues.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="ref-receipt-footer">
                Thank you for your payment! This is a system-generated digital receipt.
              </div>
            </div>

            <div className="ref-modal-actions">
              <button className="ref-btn-cancel" onClick={() => setReceiptData(null)}>
                Close
              </button>
              <button className="ref-btn-submit" onClick={() => window.print()}>
                <Printer size={15} /> Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PAYMENT HISTORY DRAWER (WHEN HISTORY BUTTON IS CLICKED)           */}
      {/* ========================================================================= */}
      {isAnalyticsOpen && (
        <div className="ref-modal-overlay" onClick={() => setIsAnalyticsOpen(false)}>
          <div className="ref-modal-card" onClick={e => e.stopPropagation()}>
            <div className="ref-modal-header">
              <div>
                <h3 className="ref-modal-title">Payment History & Log</h3>
                <p className="ref-modal-subtitle">Recent transaction logs for all residents</p>
              </div>
              <button className="ref-close-btn" onClick={() => setIsAnalyticsOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="ref-modal-body">
              <div className="ref-history-timeline">
                {feeTransactions.flatMap(f => (f.history || []).map(h => ({ ...h, studentName: f.studentName, roomNumber: f.roomNumber }))).length > 0 ? (
                  feeTransactions.flatMap(f => (f.history || []).map(h => ({ ...h, studentName: f.studentName, roomNumber: f.roomNumber })))
                    .map(item => (
                      <div key={item.id} className="ref-history-item">
                        <div className="ref-hist-icon">
                          <CheckCircle size={16} style={{ color: '#10b981' }} />
                        </div>
                        <div className="ref-hist-content">
                          <div className="ref-hist-top">
                            <span className="ref-hist-amount">₹{item.amountPaid.toLocaleString('en-IN')}</span>
                            <span className="ref-hist-receipt">{item.receiptNo}</span>
                          </div>
                          <div className="ref-hist-sub">
                            {item.studentName} (Room {item.roomNumber}) • {item.date} via {item.paymentMethod}
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="ref-empty-history">
                    <Clock size={24} style={{ color: '#94a3b8', margin: '0 auto 6px' }} />
                    <p style={{ fontSize: '13px', color: '#64748b' }}>No prior payment history recorded yet.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="ref-modal-actions">
              <button className="ref-btn-submit" onClick={() => setIsAnalyticsOpen(false)}>
                Close History Log
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
