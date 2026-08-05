import React, { useState } from 'react';
import { Search, X, CheckCircle, Printer, Share2, Receipt } from 'lucide-react';

export interface PaymentHistoryItem {
  id: string;
  name: string;
  roomNumber: string;
  phone: string;
  initials: string;
  month: string;
  paymentMethod: string;
  amount: number;
  date: string;
  time: string;
  receiptNo: string;
  transactionId: string;
  collectedBy: string;
  rentAmount: number;
  maintenanceAmount: number;
}

interface PaymentHistoryPageProps {
  onBack?: () => void;
  showToast?: (msg: string) => void;
}

export const PaymentHistoryPage: React.FC<PaymentHistoryPageProps> = ({ showToast }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<PaymentHistoryItem | null>(null);

  const historyData: PaymentHistoryItem[] = [
    {
      id: 'ph-1',
      name: 'Abhishek Sharma',
      roomNumber: '105',
      phone: '+91 98765 43210',
      initials: 'AS',
      month: 'July 2026',
      paymentMethod: 'UPI (GPay)',
      amount: 8500,
      date: '26 Jul 2026',
      time: '04:30 PM',
      receiptNo: 'REC-2026-0781',
      transactionId: 'TXN-9827391823',
      collectedBy: 'Sudharshan (Admin)',
      rentAmount: 7500,
      maintenanceAmount: 1000
    },
    {
      id: 'ph-2',
      name: 'Vikram Patel',
      roomNumber: '204',
      phone: '+91 98765 11223',
      initials: 'VP',
      month: 'July 2026',
      paymentMethod: 'UPI (PhonePe)',
      amount: 8500,
      date: '26 Jul 2026',
      time: '02:15 PM',
      receiptNo: 'REC-2026-0780',
      transactionId: 'TXN-9827391800',
      collectedBy: 'Sudharshan (Admin)',
      rentAmount: 7500,
      maintenanceAmount: 1000
    },
    {
      id: 'ph-3',
      name: 'Siddharth Patel',
      roomNumber: '301',
      phone: '+91 98765 43211',
      initials: 'SP',
      month: 'July 2026',
      paymentMethod: 'UPI (Paytm)',
      amount: 12800,
      date: '25 Jul 2026',
      time: '11:45 AM',
      receiptNo: 'REC-2026-0775',
      transactionId: 'TXN-9827391755',
      collectedBy: 'Staff Member',
      rentAmount: 11500,
      maintenanceAmount: 1300
    },
    {
      id: 'ph-4',
      name: 'Pranav Joshi',
      roomNumber: '202',
      phone: '+91 98765 43214',
      initials: 'PJ',
      month: 'July 2026',
      paymentMethod: 'Cash',
      amount: 7800,
      date: '24 Jul 2026',
      time: '06:10 PM',
      receiptNo: 'REC-2026-0762',
      transactionId: 'CASH-REF-20260724',
      collectedBy: 'Sudharshan (Admin)',
      rentAmount: 7000,
      maintenanceAmount: 800
    },
    {
      id: 'ph-5',
      name: 'Divyansh Gupta',
      roomNumber: '108',
      phone: '+91 98765 43215',
      initials: 'DG',
      month: 'July 2026',
      paymentMethod: 'Credit Card',
      amount: 8500,
      date: '23 Jul 2026',
      time: '03:20 PM',
      receiptNo: 'REC-2026-0750',
      transactionId: 'CARD-TXN-881923',
      collectedBy: 'Sudharshan (Admin)',
      rentAmount: 7500,
      maintenanceAmount: 1000
    },
    {
      id: 'ph-6',
      name: 'Rohit Verma',
      roomNumber: '105',
      phone: '+91 98765 43210',
      initials: 'RV',
      month: 'July 2026',
      paymentMethod: 'UPI (GPay)',
      amount: 12500,
      date: '20 Jul 2026',
      time: '09:00 AM',
      receiptNo: 'REC-2026-0720',
      transactionId: 'TXN-9827391200',
      collectedBy: 'Sudharshan (Admin)',
      rentAmount: 11000,
      maintenanceAmount: 1500
    },
    {
      id: 'ph-7',
      name: 'Manish Pandey',
      roomNumber: '208',
      phone: '+91 98765 43212',
      initials: 'MP',
      month: 'July 2026',
      paymentMethod: 'UPI (GPay)',
      amount: 14000,
      date: '18 Jul 2026',
      time: '05:40 PM',
      receiptNo: 'REC-2026-0718',
      transactionId: 'TXN-9827391180',
      collectedBy: 'Sudharshan (Admin)',
      rentAmount: 12500,
      maintenanceAmount: 1500
    },
    {
      id: 'ph-8',
      name: 'Rahul Dravid',
      roomNumber: '103',
      phone: '+91 98765 43213',
      initials: 'RD',
      month: 'June 2026',
      paymentMethod: 'UPI (PhonePe)',
      amount: 11000,
      date: '15 Jun 2026',
      time: '01:15 PM',
      receiptNo: 'REC-2026-0615',
      transactionId: 'TXN-9827390615',
      collectedBy: 'Sudharshan (Admin)',
      rentAmount: 10000,
      maintenanceAmount: 1000
    }
  ];

  const filteredHistory = historyData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.month.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePrintReceipt = (receiptNo: string) => {
    if (showToast) showToast(`Receipt ${receiptNo} downloaded as PDF!`);
  };

  const handleShareReceipt = (name: string, receiptNo: string) => {
    if (showToast) showToast(`Receipt ${receiptNo} sent via WhatsApp to ${name}!`);
  };

  return (
    <div className="payment-history-page-container">
      {/* TOP HEADER BAR (NO BACK BUTTON) */}
      <div className="ph-header-bar">
        <h1 className="ph-header-title">Payment History</h1>
      </div>

      {/* SEARCH INPUT BAR */}
      <div className="ph-search-wrap">
        <Search size={18} className="ph-search-icon" />
        <input
          type="text"
          className="ph-search-input"
          placeholder="Search by name, room no. or method..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="ph-search-clear" onClick={() => setSearchQuery('')}>
            <X size={14} />
          </button>
        )}
      </div>

      {/* PAYMENT HISTORY LIST CARDS */}
      <div className="ph-cards-list">
        {filteredHistory.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: '#64748b', fontSize: '14px' }}>
            No payment history found matching "{searchQuery}".
          </div>
        ) : (
          filteredHistory.map(item => (
            <div
              key={item.id}
              className="ph-history-card"
              onClick={() => setSelectedPayment(item)}
            >
              {/* LEFT INITIALS AVATAR */}
              <div className="ph-avatar-circle">
                {item.initials}
              </div>

              {/* MIDDLE INFO COLUMN */}
              <div className="ph-info-col">
                <div className="ph-student-name">
                  {item.name}
                  <span className="odp-room-badge">Room {item.roomNumber}</span>
                </div>
                <div className="ph-meta-text">
                  {item.month} • {item.paymentMethod}
                </div>
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

      {/* FEE COLLECTION DETAILS MODAL (OPENED WHEN CLICKING A PERSON) */}
      {selectedPayment && (
        <div className="receipt-modal-overlay" onClick={() => setSelectedPayment(null)}>
          <div className="receipt-modal-card" onClick={e => e.stopPropagation()}>
            {/* MODAL HEADER */}
            <div className="receipt-modal-top">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Receipt size={20} color="#16a34a" />
                <h3 className="receipt-modal-title">Fee Collection Details</h3>
              </div>
              <button className="receipt-close-btn" onClick={() => setSelectedPayment(null)}>
                <X size={18} />
              </button>
            </div>

            {/* HERO COLLECTED AMOUNT BOX */}
            <div className="receipt-hero-amount-box">
              <div className="receipt-hero-lbl">Total Amount Collected</div>
              <div className="receipt-hero-val">₹{selectedPayment.amount.toLocaleString('en-IN')}</div>
              <div className="receipt-hero-status">
                <CheckCircle size={13} color="#15803d" /> Verified & Paid
              </div>
            </div>

            {/* RESIDENT & TRANSACTION INFO GRID */}
            <div className="receipt-info-grid">
              <div className="receipt-info-item">
                <span className="receipt-info-label">Resident Name</span>
                <span className="receipt-info-val">{selectedPayment.name}</span>
              </div>
              <div className="receipt-info-item">
                <span className="receipt-info-label">Room & Bed</span>
                <span className="receipt-info-val">Room {selectedPayment.roomNumber}</span>
              </div>
              <div className="receipt-info-item">
                <span className="receipt-info-label">Receipt No.</span>
                <span className="receipt-info-val">{selectedPayment.receiptNo}</span>
              </div>
              <div className="receipt-info-item">
                <span className="receipt-info-label">Fee Period</span>
                <span className="receipt-info-val">{selectedPayment.month}</span>
              </div>
              <div className="receipt-info-item">
                <span className="receipt-info-label">Payment Method</span>
                <span className="receipt-info-val">{selectedPayment.paymentMethod}</span>
              </div>
              <div className="receipt-info-item">
                <span className="receipt-info-label">Date & Time</span>
                <span className="receipt-info-val">{selectedPayment.date}, {selectedPayment.time}</span>
              </div>
              <div className="receipt-info-item" style={{ gridColumn: 'span 2' }}>
                <span className="receipt-info-label">Transaction Ref ID</span>
                <span className="receipt-info-val" style={{ fontFamily: 'monospace', color: '#2563eb' }}>
                  {selectedPayment.transactionId}
                </span>
              </div>
            </div>

            {/* ITEMIZED BREAKDOWN CARD */}
            <div className="receipt-breakdown-card">
              <div className="receipt-breakdown-title">Itemized Collection Breakdown</div>
              <div className="receipt-breakdown-row">
                <span>Monthly Room Rent</span>
                <span>₹{selectedPayment.rentAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="receipt-breakdown-row">
                <span>Maintenance & Water Charges</span>
                <span>₹{selectedPayment.maintenanceAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="receipt-breakdown-row total">
                <span>Total Amount Paid</span>
                <span>₹{selectedPayment.amount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* COLLECTED BY FOOTER INFO */}
            <div style={{ fontSize: '11.5px', color: '#64748b', textAlign: 'center' }}>
              Collected by: <strong>{selectedPayment.collectedBy}</strong>
            </div>

            {/* ACTION BUTTONS */}
            <div className="receipt-actions-footer">
              <button
                className="receipt-btn-print"
                onClick={() => handlePrintReceipt(selectedPayment.receiptNo)}
              >
                <Printer size={15} /> Download Receipt
              </button>
              <button
                className="receipt-btn-share"
                onClick={() => handleShareReceipt(selectedPayment.name, selectedPayment.receiptNo)}
              >
                <Share2 size={15} /> Share Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
