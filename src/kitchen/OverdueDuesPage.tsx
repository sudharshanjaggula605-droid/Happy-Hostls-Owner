import React, { useState } from 'react';
import { AlertTriangle, Send, CreditCard, Phone, Calendar, Search, History, X, Printer } from 'lucide-react';

interface OverdueResidentItem {
  id: string;
  name: string;
  roomNumber: string;
  phone: string;
  amountDue: number;
  totalAmount?: number;
  amountPaid?: number;
  month: string;
  dueDate: string;
  daysOverdue: number;
  lastReminderSent: string;
}

interface OverdueDuesPageProps {
  onBack?: () => void;
  onOpenHistory?: () => void;
  onNavigateToCollectFee?: (resident: { id: string; name: string; roomNumber: string; amount?: number }) => void;
  showToast?: (msg: string) => void;
}

export const OverdueDuesPage: React.FC<OverdueDuesPageProps> = ({
  onOpenHistory,
  showToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const [overdueItems, setOverdueItems] = useState<OverdueResidentItem[]>([
    { id: 'od-1', name: 'Vikram Patel', roomNumber: '204', phone: '+91 98765 11223', amountDue: 8500, totalAmount: 8500, amountPaid: 0, month: 'July 2026', dueDate: '05 Jul 2026', daysOverdue: 28, lastReminderSent: '25 Jul 2026' },
    { id: 'od-2', name: 'Rohan Sharma', roomNumber: '102', phone: '+91 98765 22334', amountDue: 7200, totalAmount: 7200, amountPaid: 0, month: 'July 2026', dueDate: '10 Jul 2026', daysOverdue: 23, lastReminderSent: '26 Jul 2026' },
    { id: 'od-3', name: 'Anish Giri', roomNumber: '305', phone: '+91 98765 33445', amountDue: 6500, totalAmount: 6500, amountPaid: 0, month: 'July 2026', dueDate: '15 Jul 2026', daysOverdue: 18, lastReminderSent: '27 Jul 2026' },
    { id: 'od-4', name: 'Siddharth Rao', roomNumber: '101', phone: '+91 98765 44556', amountDue: 6500, totalAmount: 6500, amountPaid: 0, month: 'July 2026', dueDate: '20 Jul 2026', daysOverdue: 13, lastReminderSent: '28 Jul 2026' },
    { id: 'od-5', name: 'Pooja Hegde', roomNumber: '208', phone: '+91 98765 55667', amountDue: 9000, totalAmount: 9000, amountPaid: 0, month: 'July 2026', dueDate: '20 Jul 2026', daysOverdue: 13, lastReminderSent: '28 Jul 2026' },
    { id: 'od-6', name: 'Tarun Kumar', roomNumber: '110', phone: '+91 98765 66778', amountDue: 5800, totalAmount: 5800, amountPaid: 0, month: 'July 2026', dueDate: '25 Jul 2026', daysOverdue: 8, lastReminderSent: '30 Jul 2026' },
  ]);

  // Fee Management Collect Modal State
  const [isCollectModalOpen, setIsCollectModalOpen] = useState<boolean>(false);
  const [selectedCollectItem, setSelectedCollectItem] = useState<OverdueResidentItem | null>(null);
  const [collectPayAmount, setCollectPayAmount] = useState<string>('');
  const [collectPayMethod, setCollectPayMethod] = useState<string>('UPI / GPay');

  // Digital Receipt State
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

  const filteredItems = overdueItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalOverdue = overdueItems.reduce((acc, i) => acc + i.amountDue, 0);

  const handleSendReminder = (name: string) => {
    if (showToast) showToast(`Payment reminder SMS & WhatsApp sent to ${name}!`);
  };

  const handleOpenCollectModal = (item: OverdueResidentItem) => {
    setSelectedCollectItem(item);
    setCollectPayAmount(item.amountDue.toString());
    setCollectPayMethod('UPI / GPay');
    setIsCollectModalOpen(true);
  };

  const handleProcessFeePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCollectItem) return;

    const payAmt = parseFloat(collectPayAmount);
    if (isNaN(payAmt) || payAmt <= 0) {
      if (showToast) showToast('Please enter a valid payment amount.');
      return;
    }

    if (payAmt > selectedCollectItem.amountDue) {
      if (showToast) showToast(`Entered amount exceeds due amount ₹${selectedCollectItem.amountDue.toLocaleString('en-IN')}`);
      return;
    }

    const newAmountPaid = (selectedCollectItem.amountPaid || 0) + payAmt;
    const newDues = Math.max(0, selectedCollectItem.amountDue - payAmt);
    const newStatus = newDues === 0 ? 'Paid' : 'Partial';
    const newReceiptNo = `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const todayStr = new Date().toISOString().split('T')[0];

    // Update overdue list in state
    setOverdueItems(prev =>
      prev
        .map(item => {
          if (item.id === selectedCollectItem.id) {
            return {
              ...item,
              amountPaid: newAmountPaid,
              amountDue: newDues
            };
          }
          return item;
        })
        .filter(item => item.amountDue > 0)
    );

    if (showToast) {
      showToast(`Collected ₹${payAmt.toLocaleString('en-IN')} from ${selectedCollectItem.name}! Status: ${newStatus}`);
    }

    // Auto trigger digital receipt preview
    setReceiptData({
      studentName: selectedCollectItem.name,
      roomNumber: selectedCollectItem.roomNumber,
      monthName: selectedCollectItem.month,
      date: todayStr,
      amountPaid: payAmt,
      totalAmount: selectedCollectItem.totalAmount || selectedCollectItem.amountDue,
      dues: newDues,
      paymentMethod: collectPayMethod,
      receiptNo: newReceiptNo
    });

    setIsCollectModalOpen(false);
    setSelectedCollectItem(null);
    setCollectPayAmount('');
  };

  return (
    <div className="odp-page-container">
      {/* HEADER BAR WITH SEARCHBAR & HISTORY ICON */}
      <div className="odp-header-bar">
        <div className="odp-search-wrap">
          <Search size={18} className="odp-search-icon" />
          <input
            type="text"
            className="odp-search-input"
            placeholder="Search by name or room no..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="odp-search-clear" onClick={() => setSearchQuery('')}>
              <X size={14} />
            </button>
          )}
        </div>
        {onOpenHistory && (
          <button
            className="odp-history-circle-btn"
            onClick={onOpenHistory}
            title="Payment History"
          >
            <History size={18} />
          </button>
        )}
      </div>

      {/* OVERDUE HERO SUMMARY CARD */}
      <div className="odp-hero-card">
        <div className="odp-hero-left">
          <div className="odp-hero-lbl">Total Overdue Amount</div>
          <div className="odp-hero-val">₹{totalOverdue.toLocaleString('en-IN')}</div>
          <div className="odp-hero-sub">{overdueItems.length} Residents Pending Payment</div>
        </div>
        <div className="odp-hero-icon-box">
          <AlertTriangle size={30} color="#dc2626" />
        </div>
      </div>

      {/* OVERDUE LIST TITLE */}
      <div className="odp-section-title">OVERDUE RESIDENTS LIST</div>

      {/* LIST OF OVERDUE RESIDENTS */}
      <div className="odp-list">
        {filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: '#64748b', fontSize: '14px' }}>
            {overdueItems.length === 0 ? 'All resident dues have been collected!' : `No overdue residents found matching "${searchQuery}".`}
          </div>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} className="odp-card">
              <div className="odp-card-top">
                <div className="odp-user-info">
                  <div className="odp-user-name">
                    {item.name}
                    <span className="odp-room-badge">Room {item.roomNumber}</span>
                  </div>
                </div>
                <div className="odp-amount-box">
                  <div className="odp-amount">₹{item.amountDue.toLocaleString('en-IN')}</div>
                  <div className="odp-overdue-days">{item.daysOverdue} days overdue</div>
                </div>
              </div>

              <div className="odp-details-grid">
                <div className="odp-detail-item">
                  <Calendar size={13} color="#64748b" />
                  <span>Month: {item.month}</span>
                </div>
                <div className="odp-detail-item">
                  <Phone size={13} color="#64748b" />
                  <span>{item.phone}</span>
                </div>
              </div>

              <div className="odp-actions-row">
                <button 
                  className="odp-btn-remind" 
                  onClick={() => handleSendReminder(item.name)}
                >
                  <Send size={15} /> Send Reminder
                </button>
                <button 
                  className="odp-btn-collect" 
                  onClick={() => handleOpenCollectModal(item)}
                >
                  <CreditCard size={15} /> Collect Fee
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL: COLLECT FEE (FEE MANAGEMENT FLOW - IN PLACE MODAL)                */}
      {/* ========================================================================= */}
      {isCollectModalOpen && selectedCollectItem && (
        <div className="ref-modal-overlay" style={{ zIndex: 1200 }} onClick={() => setIsCollectModalOpen(false)}>
          <div className="ref-modal-card" onClick={e => e.stopPropagation()}>
            <div className="ref-modal-header">
              <div>
                <h3 className="ref-modal-title">Collect Fee Payment</h3>
              </div>
              <button className="ref-close-btn" onClick={() => setIsCollectModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleProcessFeePayment} className="ref-modal-body">
              {/* SELECTED RESIDENT DISPLAY */}
              <div className="ref-form-group">
                <div className="ref-selected-user-card">
                  <div className="ref-selected-user-info">
                    <span className="ref-selected-user-name">{selectedCollectItem.name}</span>
                    <span className="ref-selected-user-room">Room {selectedCollectItem.roomNumber}</span>
                  </div>
                </div>
              </div>

              {/* SELECTED RESIDENT FINANCIAL SUMMARY */}
              <div className="ref-pay-summary-box">
                <div className="ref-pay-row">
                  <span>Total Monthly Fee:</span>
                  <span className="font-bold">₹{(selectedCollectItem.totalAmount || selectedCollectItem.amountDue).toLocaleString('en-IN')}</span>
                </div>
                <div className="ref-pay-row">
                  <span>Already Paid:</span>
                  <span className="font-bold text-emerald-600">₹{(selectedCollectItem.amountPaid || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="ref-pay-row highlight">
                  <span>Pending Due Amount:</span>
                  <span className="font-bold text-amber-600">₹{selectedCollectItem.amountDue.toLocaleString('en-IN')}</span>
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
                    max={selectedCollectItem.amountDue}
                    min={1}
                    required
                  />
                </div>

                {/* BALANCE AMOUNT & STATUS CARD */}
                {(() => {
                  const entered = parseFloat(collectPayAmount) || 0;
                  const targetDue = selectedCollectItem.amountDue;
                  const remaining = Math.max(0, targetDue - entered);
                  const statusLabel = remaining === 0 ? 'Cleared' : entered > 0 ? 'Partial' : 'Pending';
                  const isCleared = statusLabel === 'Cleared';
                  const isPartial = statusLabel === 'Partial';
                  
                  return (
                    <div className={`ref-balance-status-card ${isCleared ? 'is-cleared' : isPartial ? 'is-partial' : 'is-pending'}`}>
                      <div className="ref-balance-stat-item">
                        <span className="ref-stat-label">Balance Amount</span>
                        <span className="ref-stat-val">₹{remaining.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="ref-balance-stat-item" style={{ textAlign: 'right' }}>
                        <span className="ref-stat-label">Status</span>
                        <span className={`ref-status-chip ${isCleared ? 'chip-cleared' : isPartial ? 'chip-partial' : 'chip-pending'}`}>
                          {statusLabel}
                        </span>
                      </div>
                    </div>
                  );
                })()}

                <div className="ref-quick-pay-btns mt-2">
                  <button
                    type="button"
                    className="ref-quick-btn"
                    onClick={() => setCollectPayAmount(selectedCollectItem.amountDue.toString())}
                  >
                    Full Dues (₹{selectedCollectItem.amountDue.toLocaleString('en-IN')})
                  </button>
                  {selectedCollectItem.amountDue > 2000 && (
                    <button
                      type="button"
                      className="ref-quick-btn"
                      onClick={() => setCollectPayAmount((selectedCollectItem.amountDue / 2).toString())}
                    >
                      50% (₹{(selectedCollectItem.amountDue / 2).toLocaleString('en-IN')})
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
                  Collect
                </button>
              </div>
            </form>
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
                <div className="ref-receipt-brand">HAPPY HOSTELS PRO</div>
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
    </div>
  );
};

