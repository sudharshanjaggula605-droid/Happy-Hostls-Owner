import React, { useState } from 'react';
import { AlertTriangle, Send, CreditCard, Phone, Calendar, Search, History, X, Check } from 'lucide-react';

interface DueResidentItem {
  id: string;
  name: string;
  roomNumber: string;
  phone: string;
  amountDue: number;
  month: string;
  dueDate: string;
  daysOverdue: number;
  lastReminderSent: string;
}

interface DuePaymentsPageProps {
  onBack?: () => void;
  onOpenHistory?: () => void;
  onCollectPayment?: (id: string, amount: number) => void;
  onNavigateToCollectFee?: (resident: { id: string; name: string; roomNumber: string; amount?: number }) => void;
  showToast?: (msg: string) => void;
}

export const DuePaymentsPage: React.FC<DuePaymentsPageProps> = ({
  onOpenHistory,
  onCollectPayment,
  onNavigateToCollectFee,
  showToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollectItem, setSelectedCollectItem] = useState<DueResidentItem | null>(null);
  const [payAmount, setPayAmount] = useState<string>('');
  const [payMode, setPayMode] = useState<'UPI' | 'Cash' | 'Card'>('UPI');

  const dueResidents: DueResidentItem[] = [
    { id: 'dr-1', name: 'Vikram Patel', roomNumber: '204', phone: '+91 98765 11223', amountDue: 8500, month: 'July 2026', dueDate: '05 Jul 2026', daysOverdue: 28, lastReminderSent: '25 Jul 2026' },
    { id: 'dr-2', name: 'Rohan Sharma', roomNumber: '102', phone: '+91 98765 22334', amountDue: 7200, month: 'July 2026', dueDate: '10 Jul 2026', daysOverdue: 23, lastReminderSent: '26 Jul 2026' },
    { id: 'dr-3', name: 'Anish Giri', roomNumber: '305', phone: '+91 98765 33445', amountDue: 6500, month: 'July 2026', dueDate: '15 Jul 2026', daysOverdue: 18, lastReminderSent: '27 Jul 2026' },
    { id: 'dr-4', name: 'Siddharth Rao', roomNumber: '101', phone: '+91 98765 44556', amountDue: 6500, month: 'July 2026', dueDate: '20 Jul 2026', daysOverdue: 13, lastReminderSent: '28 Jul 2026' },
    { id: 'dr-5', name: 'Pooja Hegde', roomNumber: '208', phone: '+91 98765 55667', amountDue: 9000, month: 'July 2026', dueDate: '20 Jul 2026', daysOverdue: 13, lastReminderSent: '28 Jul 2026' },
    { id: 'dr-6', name: 'Tarun Kumar', roomNumber: '110', phone: '+91 98765 66778', amountDue: 5800, month: 'July 2026', dueDate: '25 Jul 2026', daysOverdue: 8, lastReminderSent: '30 Jul 2026' },
  ];

  const filteredResidents = dueResidents.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalAmount = dueResidents.reduce((acc, r) => acc + r.amountDue, 0);

  const handleSendReminder = (name: string) => {
    if (showToast) showToast(`Payment reminder SMS & WhatsApp sent to ${name}!`);
  };

  const handleOpenCollect = (item: DueResidentItem) => {
    if (onNavigateToCollectFee) {
      onNavigateToCollectFee({ id: item.id, name: item.name, roomNumber: item.roomNumber, amount: item.amountDue });
    } else {
      setSelectedCollectItem(item);
      setPayAmount(item.amountDue.toString());
    }
  };

  const handleConfirmCollect = () => {
    if (!selectedCollectItem) return;
    const amountNum = parseFloat(payAmount) || selectedCollectItem.amountDue;
    if (onCollectPayment) {
      onCollectPayment(selectedCollectItem.id, amountNum);
    }
    if (showToast) showToast(`Collected ₹${amountNum.toLocaleString('en-IN')} from ${selectedCollectItem.name}!`);
    setSelectedCollectItem(null);
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
          <button className="odp-history-circle-btn" onClick={onOpenHistory} title="Payment History">
            <History size={18} />
          </button>
        )}
      </div>

      {/* OVERDUE HERO SUMMARY CARD (IMAGE 1 EXACT MATCH) */}
      <div className="odp-hero-card">
        <div className="odp-hero-left">
          <div className="odp-hero-lbl">Total Overdue Amount</div>
          <div className="odp-hero-val">₹{totalAmount.toLocaleString('en-IN')}</div>
          <div className="odp-hero-sub">{dueResidents.length} Residents Pending Payment</div>
        </div>
        <div className="odp-hero-icon-box">
          <AlertTriangle size={30} color="#dc2626" />
        </div>
      </div>

      {/* OVERDUE LIST TITLE */}
      <div className="odp-section-title">
        OVERDUE RESIDENTS LIST
      </div>

      {/* LIST OF OVERDUE RESIDENTS */}
      <div className="odp-list">
        {filteredResidents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: '#64748b', fontSize: '14px' }}>
            No overdue residents found matching "{searchQuery}".
          </div>
        ) : (
          filteredResidents.map(item => (
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
                  onClick={() => handleOpenCollect(item)}
                >
                  <CreditCard size={15} /> Collect Fee
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* COLLECT PAYMENT MODAL */}
      {selectedCollectItem && (
        <div className="receipt-modal-overlay" onClick={() => setSelectedCollectItem(null)}>
          <div className="receipt-modal-card" onClick={e => e.stopPropagation()}>
            <div className="receipt-modal-top">
              <div>
                <h3 className="receipt-modal-title">Collect Fee Payment</h3>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>
                  {selectedCollectItem.name} • Room {selectedCollectItem.roomNumber}
                </p>
              </div>
              <button className="receipt-close-btn" onClick={() => setSelectedCollectItem(null)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Payment Amount (₹)</label>
              <input
                type="number"
                className="odp-search-input"
                style={{ paddingLeft: '14px' }}
                value={payAmount}
                onChange={e => setPayAmount(e.target.value)}
              />

              <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', marginTop: '6px' }}>Payment Method</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['UPI', 'Cash', 'Card'] as const).map(mode => (
                  <button
                    key={mode}
                    type="button"
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '12px',
                      border: payMode === mode ? '2px solid #2563eb' : '1px solid #cbd5e1',
                      background: payMode === mode ? '#eff6ff' : '#ffffff',
                      color: payMode === mode ? '#2563eb' : '#475569',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                    onClick={() => setPayMode(mode)}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="receipt-actions-footer">
              <button className="odp-btn-remind" onClick={() => setSelectedCollectItem(null)}>
                Cancel
              </button>
              <button className="odp-btn-collect" onClick={handleConfirmCollect}>
                <Check size={16} /> Confirm Collection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
