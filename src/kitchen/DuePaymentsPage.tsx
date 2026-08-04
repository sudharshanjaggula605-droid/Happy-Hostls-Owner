import React, { useState } from 'react';
import { ChevronLeft, Search, AlertTriangle, History, X, Check } from 'lucide-react';

interface DueResidentItem {
  id: string;
  name: string;
  roomNumber: string;
  statusText: string;
  isLate: boolean;
  monthPeriod: string;
  amountDue: number;
}

interface DuePaymentsPageProps {
  onBack: () => void;
  onOpenHistory?: () => void;
  onCollectPayment?: (id: string, amount: number) => void;
  onNavigateToCollectFee?: (resident: { id: string; name: string; roomNumber: string; amount?: number }) => void;
}

export const DuePaymentsPage: React.FC<DuePaymentsPageProps> = ({
  onBack,
  onOpenHistory,
  onCollectPayment,
  onNavigateToCollectFee
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollectItem, setSelectedCollectItem] = useState<DueResidentItem | null>(null);
  const [payAmount, setPayAmount] = useState<string>('');
  const [payMode, setPayMode] = useState<'UPI' | 'Cash' | 'Card'>('UPI');

  const dueResidents: DueResidentItem[] = [
    {
      id: 'dr-1',
      name: 'Rohit Verma',
      roomNumber: '105',
      statusText: 'Overdue (Due)',
      isLate: false,
      monthPeriod: 'July 2026',
      amountDue: 8500
    },
    {
      id: 'dr-2',
      name: 'Vikram Singh',
      roomNumber: '204',
      statusText: 'Overdue (Late)',
      isLate: true,
      monthPeriod: 'July 2026',
      amountDue: 9000
    },
    {
      id: 'dr-3',
      name: 'Karan Malhotra',
      roomNumber: '302',
      statusText: 'Overdue (Due)',
      isLate: false,
      monthPeriod: 'July 2026',
      amountDue: 6000
    },
    {
      id: 'dr-4',
      name: 'Manish Pandey',
      roomNumber: '208',
      statusText: 'Overdue (Due)',
      isLate: false,
      monthPeriod: 'July 2026',
      amountDue: 8800
    },
    {
      id: 'dr-5',
      name: 'Aditya Sen',
      roomNumber: '109',
      statusText: 'Overdue (Due)',
      isLate: false,
      monthPeriod: 'July 2026',
      amountDue: 6000
    },
    {
      id: 'dr-6',
      name: 'Priya Sharma',
      roomNumber: '102',
      statusText: 'Overdue (Late)',
      isLate: true,
      monthPeriod: 'July 2026',
      amountDue: 12000
    }
  ];

  const filteredResidents = dueResidents.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    setSelectedCollectItem(null);
  };

  return (
    <div className="due-payments-page-container">
      
      {/* TOP HEADER BAR (EXACT MATCH TO REFERENCE PHOTO) */}
      <div className="dp-header-bar">
        <button className="dp-back-btn" onClick={onBack}>
          <ChevronLeft size={20} className="text-blue-600" />
          <span className="dp-back-text">Back</span>
        </button>
        <h1 className="dp-header-title">Due Payments</h1>
        <button className="dp-history-circle-btn" onClick={onOpenHistory} title="Payment History">
          <History size={18} />
        </button>
      </div>

      {/* SEARCH INPUT BAR */}
      <div className="dp-search-wrap">
        <Search size={18} className="dp-search-icon" />
        <input
          type="text"
          className="dp-search-input"
          placeholder="Search by name or room..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      {/* RED OUTSTANDING SUMMARY BANNER (EXACT REFERENCE MATCH) */}
      <div className="dp-alert-banner">
        <div className="dp-alert-icon-wrap">
          <AlertTriangle size={28} className="dp-alert-icon" />
        </div>
        <div className="dp-alert-content">
          <div className="dp-alert-title">13 Outstanding Payments</div>
          <div className="dp-alert-sub">Cumulative Unpaid Amount:</div>
          <div className="dp-alert-amount">₹1,12,800</div>
        </div>
      </div>

      {/* SECTION TITLE */}
      <div className="dp-section-header">
        RESIDENTS WITH OUTSTANDING BALANCE
      </div>

      {/* RESIDENTS OUTSTANDING LIST */}
      <div className="dp-cards-list">
        {filteredResidents.length === 0 ? (
          <div className="dp-empty-state">
            No residents found matching "{searchQuery}".
          </div>
        ) : (
          filteredResidents.map(item => (
            <div key={item.id} className="dp-resident-card">
              
              {/* LEFT INFO COLUMN */}
              <div className="dp-info-col">
                <div className="dp-student-title">
                  {item.name} <span className="dp-room-text">(Room {item.roomNumber})</span>
                </div>
                <div className={`dp-status-text ${item.isLate ? 'late' : 'due'}`}>
                  Status: {item.statusText}
                </div>
                <div className="dp-period-text">
                  Month period: {item.monthPeriod}
                </div>
              </div>

              {/* RIGHT AMOUNT & COLLECT ACTION */}
              <div className="dp-action-col">
                <div className={`dp-amount-text ${item.isLate ? 'late' : 'due'}`}>
                  ₹{item.amountDue}
                </div>
                <button
                  className="dp-collect-btn"
                  onClick={() => handleOpenCollect(item)}
                >
                  Collect
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* COLLECT PAYMENT MODAL */}
      {selectedCollectItem && (
        <div className="ref-modal-overlay" onClick={() => setSelectedCollectItem(null)}>
          <div className="ref-modal-card" onClick={e => e.stopPropagation()}>
            <div className="ref-modal-header">
              <div>
                <h3 className="ref-modal-title">Collect Fee Payment</h3>
                <p className="ref-modal-subtitle">{selectedCollectItem.name} • Room {selectedCollectItem.roomNumber}</p>
              </div>
              <button className="ref-close-btn" onClick={() => setSelectedCollectItem(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="ref-modal-body">
              <label className="ref-field-label">Payment Amount (₹)</label>
              <input
                type="number"
                className="ref-text-input"
                value={payAmount}
                onChange={e => setPayAmount(e.target.value)}
              />

              <label className="ref-field-label" style={{ marginTop: '12px' }}>Payment Method</label>
              <div className="ref-method-tabs">
                {(['UPI', 'Cash', 'Card'] as const).map(mode => (
                  <button
                    key={mode}
                    type="button"
                    className={`ref-method-btn ${payMode === mode ? 'active' : ''}`}
                    onClick={() => setPayMode(mode)}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="ref-modal-actions">
              <button className="ref-btn-cancel" onClick={() => setSelectedCollectItem(null)}>
                Cancel
              </button>
              <button className="ref-btn-submit" onClick={handleConfirmCollect}>
                <Check size={16} /> Confirm Collection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
