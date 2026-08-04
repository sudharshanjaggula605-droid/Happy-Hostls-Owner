import React, { useState } from 'react';
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
  PieChart,
  X,
  Printer,
  CreditCard,
  Clock,
  FileSpreadsheet
} from 'lucide-react';
import type { FeeTransaction, PaymentStatus, FeeHistoryItem } from '../types';

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
  onSelectFeeForVerification,
  onOpenPaymentHistory,
  onOpenDuePayments,
  onNavigateToCollectFee,
  onOpenStaffManagement,
  onOpenExpenses
}) => {
  // Filters & State
  const [selectedMonth, setSelectedMonth] = useState<string>('July 2026');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeStatusFilter, setActiveStatusFilter] = useState<'All' | PaymentStatus>('All');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Modals & Action Sheets
  const [selectedFeeForPay, setSelectedFeeForPay] = useState<FeeTransaction | null>(null);
  const [customPayAmount, setCustomPayAmount] = useState<string>('');
  const [selectedPayMethod, setSelectedPayMethod] = useState<string>('UPI / GPay');

  const [selectedFeeForReceipt, setSelectedFeeForReceipt] = useState<FeeTransaction | null>(null);
  const [selectedFeeForHistory, setSelectedFeeForHistory] = useState<FeeTransaction | null>(null);
  const [activeDetailFee, setActiveDetailFee] = useState<FeeTransaction | null>(null);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState<boolean>(false);

  // Filtered transactions
  const filteredFees = feeTransactions.filter(fee => {
    const matchesSearch =
      fee.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fee.roomNumber.includes(searchQuery);
    const matchesMonth = selectedMonth === 'All' || fee.month === selectedMonth;
    const matchesStatus =
      activeStatusFilter === 'All' || fee.status === activeStatusFilter;
    return matchesSearch && matchesMonth && matchesStatus;
  });

  // Financial Stats Calculations
  const totalCollection = feeTransactions.reduce((acc, f) => acc + (f.amountPaid || 0), 0);
  const totalDues = feeTransactions.reduce((acc, f) => acc + (f.dues || 0), 0);
  const pendingCount = feeTransactions.filter(f => f.status === 'Pending' || f.status === 'Partial' || f.status === 'Overdue').length;
  const paidCount = feeTransactions.filter(f => f.status === 'Paid').length;
  const totalExpenses = 45000;

  // Handlers
  const handleSendReminder = (studentName: string, phone: string) => {
    if (showToast) {
      showToast(`Payment reminder sent via WhatsApp & SMS to ${studentName} (${phone})!`);
    }
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFeeForPay) return;

    const amountToPay = parseFloat(customPayAmount);
    if (isNaN(amountToPay) || amountToPay <= 0) {
      if (showToast) showToast('Please enter a valid payment amount.');
      return;
    }

    if (amountToPay > selectedFeeForPay.dues) {
      if (showToast) showToast(`Payment amount cannot exceed remaining due ₹${selectedFeeForPay.dues.toLocaleString('en-IN')}`);
      return;
    }

    const newAmountPaid = selectedFeeForPay.amountPaid + amountToPay;
    const newDues = selectedFeeForPay.amount - newAmountPaid;
    const newStatus: PaymentStatus = newDues === 0 ? 'Paid' : 'Partial';

    const newHistoryItem: FeeHistoryItem = {
      id: `h-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      amountPaid: amountToPay,
      paymentMethod: selectedPayMethod,
      receiptNo: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setFeeTransactions(prev =>
      prev.map(item => {
        if (item.id === selectedFeeForPay.id) {
          const updatedHistory = item.history ? [newHistoryItem, ...item.history] : [newHistoryItem];
          return {
            ...item,
            amountPaid: newAmountPaid,
            dues: newDues,
            status: newStatus,
            paymentMethod: selectedPayMethod,
            history: updatedHistory
          };
        }
        return item;
      })
    );

    if (showToast) {
      showToast(
        `Recorded ₹${amountToPay.toLocaleString('en-IN')} payment for ${selectedFeeForPay.studentName}! Status: ${newStatus}`
      );
    }
    setSelectedFeeForPay(null);
    setCustomPayAmount('');
    setActiveDetailFee(null);
  };

  const handleExportReport = () => {
    const csvContent =
      'Student Name,Room,Month,Total Amount,Paid Amount,Dues,Status\n' +
      feeTransactions
        .map(
          f =>
            `"${f.studentName}","${f.roomNumber}","${f.month}",${f.amount},${f.amountPaid},${f.dues},"${f.status}"`
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Fee_Report_${selectedMonth.replace(' ', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (showToast) showToast('Exported fee summary report CSV successfully!');
  };

  return (
    <div className="ref-fees-container">
      
      {/* TOP HEADER MATCHING REFERENCE IMAGE */}
      <div className="ref-fees-header">
        <div>
          <h1 className="ref-fees-title">Payments</h1>
        </div>

        <div className="ref-header-actions">
          {/* Month Selector */}
          <div className="ref-month-selector-wrap">
            <Calendar size={14} style={{ color: '#64748b' }} />
            <select
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="ref-month-select"
            >
              <option value="July 2026">July 2026</option>
              <option value="June 2026">June 2026</option>
              <option value="May 2026">May 2026</option>
              <option value="All">All Months</option>
            </select>
          </div>

          <button
            className={`ref-icon-btn ${isSearchOpen ? 'active' : ''}`}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            title="Search Student"
          >
            <Search size={18} />
          </button>

          <button
            className="ref-icon-btn"
            onClick={() => {
              if (onOpenPaymentHistory) onOpenPaymentHistory();
              else setIsAnalyticsOpen(true);
            }}
            title="Monthly Analytics"
          >
            <PieChart size={18} />
          </button>

          <button
            className="ref-icon-btn"
            onClick={handleExportReport}
            title="Export Report"
          >
            <FileSpreadsheet size={18} />
          </button>

          <button
            className="ref-icon-btn"
            onClick={() => {
              if (onOpenPaymentHistory) onOpenPaymentHistory();
              else setIsAnalyticsOpen(true);
            }}
            title="Activity History"
          >
            <History size={18} />
          </button>
        </div>
      </div>

      {/* SEARCH BAR (TOGGLE / FILTER) */}
      {(isSearchOpen || searchQuery) && (
        <div className="ref-search-bar-wrap">
          <Search size={18} style={{ color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search by student name or room number..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="ref-search-input"
            autoFocus
          />
          {searchQuery && (
            <button className="ref-clear-search-btn" onClick={() => setSearchQuery('')}>
              <X size={14} />
            </button>
          )}
        </div>
      )}

      {/* FOUR FINANCIAL SUMMARY CARDS - EXACT 1:1 MATCH TO REFERENCE PHOTO */}
      <div className="ref-summary-cards-grid">
        
        {/* CARD 1: LIGHT BLUE - TOTAL REVENUE */}
        <div className="ref-summary-card card-pastel-blue">
          <div className="ref-card-label">TOTAL REVENUE</div>
          <div className="ref-card-value">
            ₹{(totalCollection > 0 ? totalCollection : 37600).toLocaleString('en-IN')}
          </div>
          <div className="ref-card-badge badge-green">
            <TrendingUp size={15} />
            <span>+12%</span>
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

        {/* CARD 3: LIGHT PURPLE - EXPENSES */}
        <div
          className="ref-summary-card card-pastel-purple"
          onClick={() => { if (onOpenExpenses) onOpenExpenses(); }}
          style={{ cursor: 'pointer' }}
        >
          <div className="ref-card-label">EXPENSES</div>
          <div className="ref-card-value">₹53,708</div>
          <div className="ref-card-badge badge-purple">
            <Receipt size={15} />
            <span>6 bills</span>
          </div>
        </div>

        {/* CARD 4: LIGHT CYAN - STAFF MANAGEMENT */}
        <div
          className="ref-summary-card card-pastel-cyan"
          onClick={() => {
            if (onOpenStaffManagement) onOpenStaffManagement();
          }}
          style={{ cursor: 'pointer' }}
        >
          <div className="ref-card-label">STAFF MANAGEMENT</div>
          <div className="ref-card-value">4 Staff</div>
          <div className="ref-card-badge badge-cyan">
            <CreditCard size={15} />
            <span>1 unpaid</span>
          </div>
        </div>

      </div>

      {/* FILTER PILLS BAR */}
      <div className="ref-filter-row">
        <span className="ref-filter-label">Filter:</span>
        {(['All', 'Pending', 'Partial', 'Overdue', 'Paid'] as const).map(status => (
          <button
            key={status}
            className={`ref-filter-pill ${activeStatusFilter === status ? 'active' : ''}`}
            onClick={() => setActiveStatusFilter(status)}
          >
            {status}
            {status === 'Pending' && pendingCount > 0 && (
              <span className="ref-pill-count">{pendingCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* SECTION TITLE: PENDING FEE PAYMENTS */}
      <div className="ref-section-header">
        <h2 className="ref-section-title">PENDING FEE PAYMENTS</h2>
        <span className="ref-results-count">{filteredFees.length} Records</span>
      </div>

      {/* LIST OF MODERN ROUNDED PAYMENT CARDS (EXACT MINIMALIST MATCH TO REFERENCE IMAGE) */}
      <div className="ref-payment-cards-list">
        {filteredFees.length === 0 ? (
          <div className="ref-empty-state">
            <AlertCircle size={32} style={{ color: '#94a3b8', margin: '0 auto 8px' }} />
            <p style={{ fontWeight: 600, color: '#475569' }}>No payment records match your search or filter.</p>
          </div>
        ) : (
          filteredFees.map(fee => (
            <div
              key={fee.id}
              className="ref-payment-card-ref-style"
              onClick={() => {
                if (onSelectFeeForVerification) {
                  onSelectFeeForVerification(fee);
                } else {
                  setActiveDetailFee(fee);
                }
              }}
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

              {/* SECOND LINE: UPLOADED TIMESTAMP */}
              <div className="ref-uploaded-text">
                Uploaded: {fee.uploadedDate || `${fee.date}`}
              </div>

            </div>
          ))
        )}
      </div>

      {/* ------------------- MODAL: DETAIL & QUICK ACTIONS ------------------- */}
      {activeDetailFee && (
        <div className="ref-modal-overlay" onClick={() => setActiveDetailFee(null)}>
          <div className="ref-modal-card" onClick={e => e.stopPropagation()}>
            <div className="ref-modal-header">
              <div>
                <h3 className="ref-modal-title">{activeDetailFee.studentName}</h3>
                <p className="ref-modal-subtitle">Room {activeDetailFee.roomNumber} • {activeDetailFee.month}</p>
              </div>
              <button className="ref-close-btn" onClick={() => setActiveDetailFee(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="ref-modal-body">
              <div className="ref-pay-summary-box">
                <div className="ref-pay-row">
                  <span>Monthly Rent:</span>
                  <span className="font-bold">₹{activeDetailFee.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="ref-pay-row">
                  <span>Paid Amount:</span>
                  <span className="font-bold text-emerald-600">₹{activeDetailFee.amountPaid.toLocaleString('en-IN')}</span>
                </div>
                <div className="ref-pay-row highlight">
                  <span>Remaining Due:</span>
                  <span className="font-bold text-amber-600">₹{activeDetailFee.dues.toLocaleString('en-IN')}</span>
                </div>
                <div className="ref-pay-row">
                  <span>Payment Status:</span>
                  <span className={`ref-status-badge badge-${activeDetailFee.status.toLowerCase()}`}>
                    {activeDetailFee.status}
                  </span>
                </div>
              </div>

              <div className="ref-modal-actions-grid">
                {activeDetailFee.status !== 'Paid' && (
                  <button
                    className="ref-btn-submit"
                    onClick={() => {
                      const feeToCollect = activeDetailFee;
                      setActiveDetailFee(null);
                      if (onNavigateToCollectFee) {
                        onNavigateToCollectFee({
                          id: feeToCollect.id,
                          name: feeToCollect.studentName,
                          roomNumber: feeToCollect.roomNumber,
                          amount: feeToCollect.dues || feeToCollect.amount
                        });
                      } else {
                        setSelectedFeeForPay(feeToCollect);
                        setCustomPayAmount(feeToCollect.dues.toString());
                      }
                    }}
                  >
                    <CreditCard size={15} /> Collect Fee
                  </button>
                )}

                {activeDetailFee.status !== 'Paid' && (
                  <button
                    className="ref-btn-cancel"
                    onClick={() => handleSendReminder(activeDetailFee.studentName, activeDetailFee.phone)}
                  >
                    <Send size={14} /> Send Reminder
                  </button>
                )}

                <button
                  className="ref-btn-cancel"
                  onClick={() => setSelectedFeeForReceipt(activeDetailFee)}
                >
                  <Receipt size={14} /> View Receipt
                </button>

                <button
                  className="ref-btn-cancel"
                  onClick={() => setSelectedFeeForHistory(activeDetailFee)}
                >
                  <History size={14} /> View History
                </button>
              </div>
            </div>

            <div className="ref-modal-actions">
              <button className="ref-btn-cancel" onClick={() => setActiveDetailFee(null)}>
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------- MODAL: RECORD PAYMENT ------------------- */}
      {selectedFeeForPay && (
        <div className="ref-modal-overlay" onClick={() => setSelectedFeeForPay(null)}>
          <div className="ref-modal-card" onClick={e => e.stopPropagation()}>
            <div className="ref-modal-header">
              <div>
                <h3 className="ref-modal-title">Record Fee Payment</h3>
                <p className="ref-modal-subtitle">{selectedFeeForPay.studentName} • Room {selectedFeeForPay.roomNumber}</p>
              </div>
              <button className="ref-close-btn" onClick={() => setSelectedFeeForPay(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleProcessPayment} className="ref-modal-body">
              
              <div className="ref-pay-summary-box">
                <div className="ref-pay-row">
                  <span>Total Fee Amount:</span>
                  <span className="font-bold">₹{selectedFeeForPay.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="ref-pay-row">
                  <span>Already Paid:</span>
                  <span className="font-bold text-emerald-600">₹{selectedFeeForPay.amountPaid.toLocaleString('en-IN')}</span>
                </div>
                <div className="ref-pay-row highlight">
                  <span>Outstanding Remaining Dues:</span>
                  <span className="font-bold text-amber-600">₹{selectedFeeForPay.dues.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="ref-form-group">
                <label className="ref-form-label">Payment Amount (₹)</label>
                <div className="ref-input-with-icon">
                  <span className="ref-currency-prefix">₹</span>
                  <input
                    type="number"
                    value={customPayAmount}
                    onChange={e => setCustomPayAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="ref-form-input"
                    max={selectedFeeForPay.dues}
                    min={1}
                    required
                  />
                </div>
                <div className="ref-quick-pay-btns">
                  <button
                    type="button"
                    className="ref-quick-btn"
                    onClick={() => setCustomPayAmount(selectedFeeForPay.dues.toString())}
                  >
                    Pay Full Dues (₹{selectedFeeForPay.dues.toLocaleString('en-IN')})
                  </button>
                  {selectedFeeForPay.dues > 2000 && (
                    <button
                      type="button"
                      className="ref-quick-btn"
                      onClick={() => setCustomPayAmount((selectedFeeForPay.dues / 2).toString())}
                    >
                      Pay 50% (₹{(selectedFeeForPay.dues / 2).toLocaleString('en-IN')})
                    </button>
                  )}
                </div>
              </div>

              <div className="ref-form-group">
                <label className="ref-form-label">Payment Mode</label>
                <div className="ref-payment-methods-grid">
                  {(['UPI / GPay', 'Cash', 'NetBanking', 'Credit Card'] as const).map(mode => (
                    <button
                      key={mode}
                      type="button"
                      className={`ref-mode-btn ${selectedPayMethod === mode ? 'active' : ''}`}
                      onClick={() => setSelectedPayMethod(mode)}
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
                  onClick={() => setSelectedFeeForPay(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="ref-btn-submit">
                  Confirm Payment
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ------------------- MODAL: DIGITAL RECEIPT GENERATOR ------------------- */}
      {selectedFeeForReceipt && (
        <div className="ref-modal-overlay" onClick={() => setSelectedFeeForReceipt(null)}>
          <div className="ref-modal-card receipt-card" onClick={e => e.stopPropagation()}>
            <div className="ref-receipt-header">
              <div>
                <div className="ref-receipt-brand">🏡 HOSTEL OWNER PRO</div>
                <div className="ref-receipt-sub">Fee Payment Receipt & Statement</div>
              </div>
              <button className="ref-close-btn" onClick={() => setSelectedFeeForReceipt(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="ref-receipt-body">
              <div className="ref-receipt-stamp">PAID / VERIFIED</div>
              
              <div className="ref-receipt-grid">
                <div>
                  <span className="ref-receipt-label">Student Name</span>
                  <div className="ref-receipt-val">{selectedFeeForReceipt.studentName}</div>
                </div>
                <div>
                  <span className="ref-receipt-label">Room Number</span>
                  <div className="ref-receipt-val">Room {selectedFeeForReceipt.roomNumber}</div>
                </div>
                <div>
                  <span className="ref-receipt-label">Fee Month</span>
                  <div className="ref-receipt-val">{selectedFeeForReceipt.month}</div>
                </div>
                <div>
                  <span className="ref-receipt-label">Date & Time</span>
                  <div className="ref-receipt-val">{selectedFeeForReceipt.uploadedDate || selectedFeeForReceipt.date}</div>
                </div>
                <div>
                  <span className="ref-receipt-label">Payment Method</span>
                  <div className="ref-receipt-val">{selectedFeeForReceipt.paymentMethod || 'UPI / Cash'}</div>
                </div>
                <div>
                  <span className="ref-receipt-label">Receipt Number</span>
                  <div className="ref-receipt-val font-mono">REC-2026-{selectedFeeForReceipt.id.replace('ft-', '')}</div>
                </div>
              </div>

              <div className="ref-receipt-table">
                <div className="ref-rt-row ref-rt-head">
                  <span>Description</span>
                  <span className="text-right">Amount</span>
                </div>
                <div className="ref-rt-row">
                  <span>Hostel Monthly Accommodation Fee</span>
                  <span className="text-right">₹{selectedFeeForReceipt.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="ref-rt-row">
                  <span>Total Amount Paid</span>
                  <span className="text-right text-emerald-600 font-bold">₹{selectedFeeForReceipt.amountPaid.toLocaleString('en-IN')}</span>
                </div>
                <div className="ref-rt-row ref-rt-total">
                  <span>Remaining Dues</span>
                  <span className="text-right text-amber-600 font-bold">₹{selectedFeeForReceipt.dues.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="ref-receipt-footer">
                Thank you for your payment! This is a system-generated digital receipt.
              </div>
            </div>

            <div className="ref-modal-actions">
              <button
                className="ref-btn-cancel"
                onClick={() => setSelectedFeeForReceipt(null)}
              >
                Close
              </button>
              <button
                className="ref-btn-submit"
                onClick={() => window.print()}
              >
                <Printer size={15} /> Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------- MODAL: PAYMENT HISTORY DRAWER ------------------- */}
      {selectedFeeForHistory && (
        <div className="ref-modal-overlay" onClick={() => setSelectedFeeForHistory(null)}>
          <div className="ref-modal-card" onClick={e => e.stopPropagation()}>
            <div className="ref-modal-header">
              <div>
                <h3 className="ref-modal-title">Payment History</h3>
                <p className="ref-modal-subtitle">{selectedFeeForHistory.studentName} (Room {selectedFeeForHistory.roomNumber})</p>
              </div>
              <button className="ref-close-btn" onClick={() => setSelectedFeeForHistory(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="ref-modal-body">
              <div className="ref-history-timeline">
                {selectedFeeForHistory.history && selectedFeeForHistory.history.length > 0 ? (
                  selectedFeeForHistory.history.map(item => (
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
                          {item.date} • via {item.paymentMethod}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="ref-empty-history">
                    <Clock size={24} style={{ color: '#94a3b8', margin: '0 auto 6px' }} />
                    <p style={{ fontSize: '13px', color: '#64748b' }}>No prior payment history recorded for this month yet.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="ref-modal-actions">
              <button
                className="ref-btn-submit"
                onClick={() => setSelectedFeeForHistory(null)}
              >
                Close History
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------- MODAL: MONTHLY ANALYTICS DRAWER ------------------- */}
      {isAnalyticsOpen && (
        <div className="ref-modal-overlay" onClick={() => setIsAnalyticsOpen(false)}>
          <div className="ref-modal-card" onClick={e => e.stopPropagation()}>
            <div className="ref-modal-header">
              <div>
                <h3 className="ref-modal-title">Monthly Fee Analytics</h3>
                <p className="ref-modal-subtitle">Performance breakdown for {selectedMonth}</p>
              </div>
              <button className="ref-close-btn" onClick={() => setIsAnalyticsOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="ref-modal-body">
              
              <div className="ref-analytics-box">
                <div className="ref-anal-label">Collection Rate</div>
                <div className="ref-anal-progress-bar">
                  <div
                    className="ref-anal-progress-fill"
                    style={{ width: `${Math.round((totalCollection / (totalCollection + totalDues || 1)) * 100)}%` }}
                  />
                </div>
                <div className="ref-anal-stats-row">
                  <span>Collected: ₹{totalCollection.toLocaleString('en-IN')}</span>
                  <span>Target: ₹{(totalCollection + totalDues).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="ref-anal-breakdown-grid">
                <div className="ref-anal-card">
                  <span className="ref-anal-card-num text-emerald-600">{paidCount}</span>
                  <span className="ref-anal-card-lbl">Fully Paid Students</span>
                </div>
                <div className="ref-anal-card">
                  <span className="ref-anal-card-num text-amber-600">{pendingCount}</span>
                  <span className="ref-anal-card-lbl">Pending / Partial Dues</span>
                </div>
                <div className="ref-anal-card">
                  <span className="ref-anal-card-num text-purple-600">₹{totalExpenses.toLocaleString('en-IN')}</span>
                  <span className="ref-anal-card-lbl">Monthly Expenses</span>
                </div>
                <div className="ref-anal-card">
                  <span className="ref-anal-card-num text-cyan-600">₹{(totalCollection - totalExpenses).toLocaleString('en-IN')}</span>
                  <span className="ref-anal-card-lbl">Net Profit Margin</span>
                </div>
              </div>

            </div>

            <div className="ref-modal-actions">
              <button
                className="ref-btn-submit"
                onClick={() => setIsAnalyticsOpen(false)}
              >
                Close Analytics
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
