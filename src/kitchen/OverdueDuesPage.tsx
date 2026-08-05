import React, { useState } from 'react';
import { AlertTriangle, Send, CreditCard, Phone, Calendar, Search, History, X } from 'lucide-react';

interface OverdueResidentItem {
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

interface OverdueDuesPageProps {
  onBack?: () => void;
  onOpenHistory?: () => void;
  onNavigateToCollectFee?: (resident: { id: string; name: string; roomNumber: string; amount?: number }) => void;
  showToast?: (msg: string) => void;
}

export const OverdueDuesPage: React.FC<OverdueDuesPageProps> = ({
  onOpenHistory,
  onNavigateToCollectFee,
  showToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const overdueItems: OverdueResidentItem[] = [
    { id: 'od-1', name: 'Vikram Patel', roomNumber: '204', phone: '+91 98765 11223', amountDue: 8500, month: 'July 2026', dueDate: '05 Jul 2026', daysOverdue: 28, lastReminderSent: '25 Jul 2026' },
    { id: 'od-2', name: 'Rohan Sharma', roomNumber: '102', phone: '+91 98765 22334', amountDue: 7200, month: 'July 2026', dueDate: '10 Jul 2026', daysOverdue: 23, lastReminderSent: '26 Jul 2026' },
    { id: 'od-3', name: 'Anish Giri', roomNumber: '305', phone: '+91 98765 33445', amountDue: 6500, month: 'July 2026', dueDate: '15 Jul 2026', daysOverdue: 18, lastReminderSent: '27 Jul 2026' },
    { id: 'od-4', name: 'Siddharth Rao', roomNumber: '101', phone: '+91 98765 44556', amountDue: 6500, month: 'July 2026', dueDate: '20 Jul 2026', daysOverdue: 13, lastReminderSent: '28 Jul 2026' },
    { id: 'od-5', name: 'Pooja Hegde', roomNumber: '208', phone: '+91 98765 55667', amountDue: 9000, month: 'July 2026', dueDate: '20 Jul 2026', daysOverdue: 13, lastReminderSent: '28 Jul 2026' },
    { id: 'od-6', name: 'Tarun Kumar', roomNumber: '110', phone: '+91 98765 66778', amountDue: 5800, month: 'July 2026', dueDate: '25 Jul 2026', daysOverdue: 8, lastReminderSent: '30 Jul 2026' },
  ];

  const filteredItems = overdueItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalOverdue = overdueItems.reduce((acc, i) => acc + i.amountDue, 0);

  const handleSendReminder = (name: string) => {
    if (showToast) showToast(`Payment reminder SMS & WhatsApp sent to ${name}!`);
  };

  return (
    <div className="odp-page-container">
      {/* HEADER BAR (NO BACK BUTTON) */}
      <div className="odp-header-bar">
        <h1 className="odp-header-title">Overdue Dues</h1>
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

      {/* SEARCH INPUT BAR */}
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

      {/* OVERDUE HERO SUMMARY CARD (IMAGE 1 EXACT DESIGN) */}
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
            No overdue residents found matching "{searchQuery}".
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
                  onClick={() => {
                    if (onNavigateToCollectFee) {
                      onNavigateToCollectFee({ id: item.id, name: item.name, roomNumber: item.roomNumber, amount: item.amountDue });
                    }
                  }}
                >
                  <CreditCard size={15} /> Collect Fee
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
