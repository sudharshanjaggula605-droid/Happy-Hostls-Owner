import React, { useState } from 'react';
import { ChevronLeft, Search, X } from 'lucide-react';

interface StaffPayRecord {
  id: string;
  initials: string;
  name: string;
  employeeId: string;
  designation: string;
  month: string;
  paymentDate: string;
  dateLabel: string;
  amount: number;
  paymentMethod: string;
  transactionId: string;
  status: 'Paid' | 'Pending' | 'Failed';
}

interface StaffPaymentHistoryPageProps {
  onBack: () => void;
  initialStaff?: { name: string } | null;
}

export const StaffPaymentHistoryPage: React.FC<StaffPaymentHistoryPageProps> = ({
  onBack,
  initialStaff
}) => {
  const [searchQuery, setSearchQuery] = useState(initialStaff ? initialStaff.name : '');
  const [selectedRecord, setSelectedRecord] = useState<StaffPayRecord | null>(null);

  const payRecords: StaffPayRecord[] = [
<<<<<<< HEAD
    { id: 'sph-1', initials: 'SS', name: 'Sunitha Sharma', employeeId: 'EMP-001', designation: 'Hostel Manager', month: 'July 2026', paymentDate: '31 Jul 2026', dateLabel: '31 Jul', amount: 28000, paymentMethod: 'Bank Transfer (IMPS)', transactionId: 'TXN-SS-072026', status: 'Paid' },
    { id: 'sph-2', initials: 'LD', name: 'Lakshmi Devi', employeeId: 'EMP-002', designation: 'Warden', month: 'July 2026', paymentDate: '30 Jul 2026', dateLabel: '30 Jul', amount: 22000, paymentMethod: 'UPI', transactionId: 'TXN-LD-072026', status: 'Paid' },
    { id: 'sph-3', initials: 'RS', name: 'Raju Security', employeeId: 'EMP-003', designation: 'Security Guard', month: 'July 2026', paymentDate: '29 Jul 2026', dateLabel: '29 Jul', amount: 16000, paymentMethod: 'Bank Transfer', transactionId: 'TXN-RS-072026', status: 'Paid' },
    { id: 'sph-4', initials: 'SC', name: 'Saroja Cleaner', employeeId: 'EMP-004', designation: 'Housekeeping Staff', month: 'July 2026', paymentDate: '28 Jul 2026', dateLabel: '28 Jul', amount: 14000, paymentMethod: 'UPI', transactionId: 'TXN-SC-072026', status: 'Paid' },
    { id: 'sph-5', initials: 'AR', name: 'Anita Rao', employeeId: 'EMP-005', designation: 'Hostel Manager', month: 'July 2026', paymentDate: '31 Jul 2026', dateLabel: '31 Jul', amount: 27000, paymentMethod: 'Bank Transfer', transactionId: 'TXN-AR-072026', status: 'Paid' },
    { id: 'sph-6', initials: 'SW', name: 'Savithri Warden', employeeId: 'EMP-006', designation: 'Warden', month: 'July 2026', paymentDate: '30 Jul 2026', dateLabel: '30 Jul', amount: 21000, paymentMethod: 'UPI', transactionId: 'TXN-SW-072026', status: 'Paid' },
    { id: 'sph-7', initials: 'VS', name: 'Venkat Security', employeeId: 'EMP-007', designation: 'Security Guard', month: 'July 2026', paymentDate: '29 Jul 2026', dateLabel: '29 Jul', amount: 16000, paymentMethod: 'Bank Transfer', transactionId: 'TXN-VS-072026', status: 'Paid' },
    { id: 'sph-8', initials: 'PC', name: 'Parvathi Cleaner', employeeId: 'EMP-008', designation: 'Housekeeping Staff', month: 'July 2026', paymentDate: '28 Jul 2026', dateLabel: '28 Jul', amount: 14000, paymentMethod: 'UPI', transactionId: 'TXN-PC-072026', status: 'Paid' },
    { id: 'sph-9', initials: 'SK', name: 'Suresh Kumar', employeeId: 'EMP-009', designation: 'Hostel Manager', month: 'July 2026', paymentDate: '31 Jul 2026', dateLabel: '31 Jul', amount: 29000, paymentMethod: 'Bank Transfer', transactionId: 'TXN-SK-072026', status: 'Paid' },
    { id: 'sph-10', initials: 'RW', name: 'Ramesh Warden', employeeId: 'EMP-010', designation: 'Warden', month: 'July 2026', paymentDate: '30 Jul 2026', dateLabel: '30 Jul', amount: 23000, paymentMethod: 'UPI', transactionId: 'TXN-RW-072026', status: 'Paid' },
    { id: 'sph-11', initials: 'BS', name: 'Bahadur Singh', employeeId: 'EMP-011', designation: 'Security Guard', month: 'July 2026', paymentDate: '29 Jul 2026', dateLabel: '29 Jul', amount: 17000, paymentMethod: 'Bank Transfer', transactionId: 'TXN-BS-072026', status: 'Paid' },
    { id: 'sph-12', initials: 'KC', name: 'Kumar Cook', employeeId: 'EMP-012', designation: 'Head Cook', month: 'July 2026', paymentDate: '28 Jul 2026', dateLabel: '28 Jul', amount: 20000, paymentMethod: 'UPI', transactionId: 'TXN-KC-072026', status: 'Paid' },
    { id: 'sph-13', initials: 'MG', name: 'Mahesh Gupta', employeeId: 'EMP-013', designation: 'Hostel Manager', month: 'July 2026', paymentDate: '31 Jul 2026', dateLabel: '31 Jul', amount: 28000, paymentMethod: 'Bank Transfer', transactionId: 'TXN-MG-072026', status: 'Paid' },
    { id: 'sph-14', initials: 'NW', name: 'Narayana Warden', employeeId: 'EMP-014', designation: 'Night Warden', month: 'July 2026', paymentDate: '30 Jul 2026', dateLabel: '30 Jul', amount: 22000, paymentMethod: 'UPI', transactionId: 'TXN-NW-072026', status: 'Paid' },
    { id: 'sph-15', initials: 'SS', name: 'Shiva Security', employeeId: 'EMP-015', designation: 'Security Guard', month: 'July 2026', paymentDate: '29 Jul 2026', dateLabel: '29 Jul', amount: 16000, paymentMethod: 'Bank Transfer', transactionId: 'TXN-SS-072026', status: 'Paid' },
    { id: 'sph-16', initials: 'KE', name: 'Krishna Electrician', employeeId: 'EMP-016', designation: 'Electrician & Maintenance', month: 'July 2026', paymentDate: '28 Jul 2026', dateLabel: '28 Jul', amount: 18000, paymentMethod: 'UPI', transactionId: 'TXN-KE-072026', status: 'Paid' }
=======
    {
      id: 'sph-1',
      initials: 'RK',
      name: 'Ramesh Kumar',
      employeeId: 'EMP-001',
      designation: 'Warden',
      month: 'July',
      paymentDate: '31 Jul 2026',
      dateLabel: '31 Jul',
      amount: 17308,
      paymentMethod: 'UPI',
      transactionId: 'TXN-RK-072026',
      status: 'Paid'
    },
    {
      id: 'sph-1a',
      initials: 'RK',
      name: 'Ramesh Kumar',
      employeeId: 'EMP-001',
      designation: 'Warden',
      month: 'June 2026',
      paymentDate: '30 Jun 2026',
      dateLabel: '30 Jun',
      amount: 18000,
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN-RK-062026',
      status: 'Paid'
    },
    {
      id: 'sph-1b',
      initials: 'RK',
      name: 'Ramesh Kumar',
      employeeId: 'EMP-001',
      designation: 'Warden',
      month: 'May 2026',
      paymentDate: '31 May 2026',
      dateLabel: '31 May',
      amount: 18000,
      paymentMethod: 'UPI',
      transactionId: 'TXN-RK-052026',
      status: 'Paid'
    },
    {
      id: 'sph-1c',
      initials: 'RK',
      name: 'Ramesh Kumar',
      employeeId: 'EMP-001',
      designation: 'Warden',
      month: 'April 2026',
      paymentDate: '30 Apr 2026',
      dateLabel: '30 Apr',
      amount: 18000,
      paymentMethod: 'UPI',
      transactionId: 'TXN-RK-042026',
      status: 'Paid'
    },
    {
      id: 'sph-2',
      initials: 'SD',
      name: 'Sita Devi',
      employeeId: 'EMP-002',
      designation: 'Cook/Cleaner',
      month: 'July 2026',
      paymentDate: '25 Jul 2026',
      dateLabel: '25 Jul',
      amount: 14000,
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN-SD-072026',
      status: 'Paid'
    },
    {
      id: 'sph-2a',
      initials: 'SD',
      name: 'Sita Devi',
      employeeId: 'EMP-002',
      designation: 'Cook/Cleaner',
      month: 'June 2026',
      paymentDate: '30 Jun 2026',
      dateLabel: '30 Jun',
      amount: 14000,
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN-SD-062026',
      status: 'Paid'
    },
    {
      id: 'sph-2b',
      initials: 'SD',
      name: 'Sita Devi',
      employeeId: 'EMP-002',
      designation: 'Cook/Cleaner',
      month: 'May 2026',
      paymentDate: '31 May 2026',
      dateLabel: '31 May',
      amount: 14000,
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN-SD-052026',
      status: 'Paid'
    },
    {
      id: 'sph-3',
      initials: 'RR',
      name: 'Raju Ram',
      employeeId: 'EMP-003',
      designation: 'Maintenance',
      month: 'July 2026',
      paymentDate: '24 Jul 2026',
      dateLabel: '24 Jul',
      amount: 10000,
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN-RR-072026',
      status: 'Paid'
    },
    {
      id: 'sph-4',
      initials: 'BS',
      name: 'Bahadur Singh',
      employeeId: 'EMP-004',
      designation: 'Security',
      month: 'June 2026',
      paymentDate: '30 Jun 2026',
      dateLabel: '30 Jun',
      amount: 12000,
      paymentMethod: 'Cash',
      transactionId: 'TXN-BS-062026',
      status: 'Paid'
    },
    {
      id: 'sph-5',
      initials: 'SC',
      name: 'Suresh Cook',
      employeeId: 'EMP-005',
      designation: 'Head Chef',
      month: 'June 2026',
      paymentDate: '28 Jun 2026',
      dateLabel: '28 Jun',
      amount: 15000,
      paymentMethod: 'UPI',
      transactionId: 'TXN-SC-062026',
      status: 'Paid'
    },
    {
      id: 'sph-6',
      initials: 'BS',
      name: 'Bahadur Singh',
      employeeId: 'EMP-004',
      designation: 'Security',
      month: 'May 2026',
      paymentDate: '31 May 2026',
      dateLabel: '31 May',
      amount: 12000,
      paymentMethod: 'Cash',
      transactionId: 'TXN-BS-052026',
      status: 'Paid'
    },
    {
      id: 'sph-7',
      initials: 'SC',
      name: 'Suresh Cook',
      employeeId: 'EMP-005',
      designation: 'Head Chef',
      month: 'May 2026',
      paymentDate: '31 May 2026',
      dateLabel: '31 May',
      amount: 15000,
      paymentMethod: 'UPI',
      transactionId: 'TXN-SC-052026',
      status: 'Paid'
    }
>>>>>>> e7f9e7202adfec5ab28bbed18f20b2ab8c7698e7
  ];

  const filteredRecords = payRecords.filter(r => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return r.name.toLowerCase().includes(q) || r.employeeId.toLowerCase().includes(q) || r.designation.toLowerCase().includes(q);
  });

  return (
    <div className="sph-page-container">

      {/* HEADER BAR (EXACT MATCH TO REFERENCE PHOTO) */}
      <div className="sph-header-bar">

        <h1 className="sph-header-title">Staff Payment History</h1>
      </div>

      {/* SEARCH BAR (MATCHING REFERENCE PHOTO) */}
      <div className="sph-search-wrapper">
        <Search size={16} className="sph-search-icon" />
        <input
          type="text"
          className="sph-search-input"
          placeholder="Search by recipient..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="sph-clear-btn" onClick={() => setSearchQuery('')}>
            <X size={14} />
          </button>
        )}
      </div>

      {/* PAYMENT RECORDS LIST (1:1 MATCH TO REFERENCE PHOTO) */}
      <div className="sph-records-list">
        {filteredRecords.length === 0 ? (
          <div className="sph-empty-state">No payment records found.</div>
        ) : filteredRecords.map(record => (
          <div
            key={record.id}
            className="sph-record-card"
            onClick={() => setSelectedRecord(record)}
          >
            {/* LEFT: AVATAR + STAFF NAME + MONTH & METHOD */}
            <div className="sph-card-left">
              <div className="sph-avatar-circle">{record.initials}</div>
              <div className="sph-card-text">
                <div className="sph-card-name">{record.name}</div>
                <div className="sph-card-sub">{record.month} • {record.paymentMethod}</div>
              </div>
            </div>

            {/* RIGHT: AMOUNT + DATE */}
            <div className="sph-card-right">
              <div className="sph-card-amount">
                <span className="sph-card-dash">-</span>
                <span className="sph-card-amtval">₹{record.amount.toLocaleString('en-IN')}</span>
              </div>
              <div className="sph-card-date">{record.dateLabel}</div>
            </div>
          </div>
        ))}
      </div>

      {/* PAYMENT DETAILS MODAL */}
      {selectedRecord && (
        <div className="ref-modal-overlay" onClick={() => setSelectedRecord(null)}>
          <div className="ref-modal-card" onClick={e => e.stopPropagation()} style={{ padding: 0, overflow: 'hidden', background: '#f8fafc' }}>
            <div className="ref-modal-header" style={{ background: 'white' }}>
              <div>
                <h3 className="ref-modal-title">Payment Details</h3>
              </div>
              <button className="ref-close-btn" onClick={() => setSelectedRecord(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="sph-detail-card" style={{ boxShadow: 'none', margin: 0, borderRadius: 0, border: 'none', background: 'transparent' }}>
              {/* Avatar & Name */}
              <div className="sph-detail-top">
                <div className="sph-avatar-lg">{selectedRecord.initials}</div>
                <div>
                  <h2 className="sph-detail-name">{selectedRecord.name}</h2>
                  <p className="sph-detail-subtext">{selectedRecord.designation} • {selectedRecord.employeeId}</p>
                </div>
              </div>

              <div className="sph-detail-divider" />

              {/* Details Rows */}
              <div className="sph-detail-rows">
                <div className="sph-detail-row">
                  <span className="sph-detail-label">Salary Month</span>
                  <span className="sph-detail-value">{selectedRecord.month}</span>
                </div>
                <div className="sph-detail-row">
                  <span className="sph-detail-label">Payment Date</span>
                  <span className="sph-detail-value">{selectedRecord.paymentDate}</span>
                </div>
                <div className="sph-detail-row">
                  <span className="sph-detail-label">Payment Amount</span>
                  <span className="sph-detail-value-amber">₹{selectedRecord.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="sph-detail-row">
                  <span className="sph-detail-label">Payment Method</span>
                  <span className="sph-detail-value">{selectedRecord.paymentMethod}</span>
                </div>
                {selectedRecord.paymentMethod !== 'Cash' && selectedRecord.paymentMethod !== 'Cheque' && selectedRecord.paymentMethod !== 'Cash Payment' && (
                  <div className="sph-detail-row">
                    <span className="sph-detail-label">Transaction ID</span>
                    <span className="sph-detail-value">{selectedRecord.transactionId}</span>
                  </div>
                )}
                <div className="sph-detail-row">
                  <span className="sph-detail-label">Status</span>
                  <span className={`sph-status-badge ${selectedRecord.status.toLowerCase()}`}>{selectedRecord.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
