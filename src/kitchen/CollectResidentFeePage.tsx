import React, { useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';

interface ResidentOption {
  id: string;
  name: string;
  roomNumber: string;
  roomType: string;
  dueAmount: number;
  statusLabel: string;
}

interface CollectResidentFeePageProps {
  initialResident?: {
    id: string;
    name: string;
    roomNumber: string;
    amount?: number;
  } | null;
  onBack: () => void;
  onSubmitReceipt: (studentId: string, amount: number, paymentMode: string, period: string) => void;
}

export const CollectResidentFeePage: React.FC<CollectResidentFeePageProps> = ({
  initialResident,
  onBack,
  onSubmitReceipt
}) => {
  const residentsList: ResidentOption[] = [
    {
      id: 'res-105',
      name: 'Rohit Verma',
      roomNumber: '105',
      roomType: 'Room 105 (Non-AC, Single)',
      dueAmount: 8500,
      statusLabel: 'Rohit Verma (Room 105) - Due'
    },
    {
      id: 'res-204',
      name: 'Vikram Singh',
      roomNumber: '204',
      roomType: 'Room 204 (AC, Sharing)',
      dueAmount: 9000,
      statusLabel: 'Vikram Singh (Room 204) - Late'
    },
    {
      id: 'res-302',
      name: 'Karan Malhotra',
      roomNumber: '302',
      roomType: 'Room 302 (Non-AC, Single)',
      dueAmount: 6000,
      statusLabel: 'Karan Malhotra (Room 302) - Due'
    },
    {
      id: 'res-208',
      name: 'Manish Pandey',
      roomNumber: '208',
      roomType: 'Room 208 (AC, Double)',
      dueAmount: 8800,
      statusLabel: 'Manish Pandey (Room 208) - Due'
    },
    {
      id: 'res-109',
      name: 'Aditya Sen',
      roomNumber: '109',
      roomType: 'Room 109 (Non-AC, Single)',
      dueAmount: 6000,
      statusLabel: 'Aditya Sen (Room 109) - Due'
    },
    {
      id: 'res-102',
      name: 'Priya Sharma',
      roomNumber: '102',
      roomType: 'Room 102 (AC, Premium)',
      dueAmount: 12000,
      statusLabel: 'Priya Sharma (Room 102) - Late'
    }
  ];

  const matchedInitial = initialResident
    ? residentsList.find(r => r.name.toLowerCase().includes(initialResident.name.toLowerCase()) || r.roomNumber === initialResident.roomNumber)
    : undefined;

  const [selectedResidentId, setSelectedResidentId] = useState<string>(matchedInitial ? matchedInitial.id : 'res-105');

  const activeResident = residentsList.find(r => r.id === selectedResidentId) || residentsList[0];

  const [rentReceived, setRentReceived] = useState<string>(
    initialResident && initialResident.amount ? initialResident.amount.toString() : activeResident.dueAmount.toString()
  );
  const [feePeriod, setFeePeriod] = useState<string>('July 2026');
  const [paymentMode, setPaymentMode] = useState<string>('UPI Gateway (GPAY/Paytm)');

  const handleResidentSelect = (id: string) => {
    setSelectedResidentId(id);
    const target = residentsList.find(r => r.id === id);
    if (target) {
      setRentReceived(target.dueAmount.toString());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(rentReceived) || activeResident.dueAmount;
    onSubmitReceipt(activeResident.id, amountNum, paymentMode, feePeriod);
  };

  return (
    <div className="collect-resident-fee-page-container">
      
      {/* HEADER BAR (EXACT MATCH TO REFERENCE PHOTO) */}
      <div className="crf-header-bar">
        <button className="crf-back-btn" onClick={onBack} type="button">
          <ChevronLeft size={20} className="text-blue-600" />
          <span className="crf-back-text">Back</span>
        </button>
        <h1 className="crf-header-title">Collect Resident Fee</h1>
      </div>

      <form onSubmit={handleSubmit} className="crf-form-container">
        
        {/* FIELD 1: SELECT RESIDENT */}
        <div className="crf-field-group">
          <label className="crf-field-label">Select Resident</label>
          <div className="crf-select-wrap">
            <select
              className="crf-select-input"
              value={selectedResidentId}
              onChange={e => handleResidentSelect(e.target.value)}
            >
              {residentsList.map(res => (
                <option key={res.id} value={res.id}>
                  {res.statusLabel}
                </option>
              ))}
            </select>
            <ChevronDown size={18} className="crf-select-arrow" />
          </div>
        </div>

        {/* RESIDENT DETAILS SUMMARY CARD (LIGHT GREY BOX WITH DASHED BORDER) */}
        <div className="crf-details-box">
          <div className="crf-details-row">
            <span className="crf-details-label">Room Allocation:</span>
            <span className="crf-details-val-bold">{activeResident.roomType}</span>
          </div>
          <div className="crf-details-row" style={{ marginTop: '8px' }}>
            <span className="crf-details-label">Outstanding Rent:</span>
            <span className="crf-details-val-amber">₹{activeResident.dueAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* FIELD 2: RENT RECEIVED (₹) */}
        <div className="crf-field-group">
          <label className="crf-field-label">Rent Received (₹)</label>
          <input
            type="number"
            className="crf-text-input"
            value={rentReceived}
            onChange={e => setRentReceived(e.target.value)}
            placeholder="e.g. 8500"
            required
          />
        </div>

        {/* FIELD 3: FEE PERIOD */}
        <div className="crf-field-group">
          <label className="crf-field-label">Fee Period</label>
          <div className="crf-select-wrap">
            <select
              className="crf-select-input"
              value={feePeriod}
              onChange={e => setFeePeriod(e.target.value)}
            >
              <option value="July 2026">July 2026</option>
              <option value="August 2026">August 2026</option>
              <option value="June 2026">June 2026</option>
            </select>
            <ChevronDown size={18} className="crf-select-arrow" />
          </div>
        </div>

        {/* FIELD 4: PAYMENT MODE */}
        <div className="crf-field-group">
          <label className="crf-field-label">Payment Mode</label>
          <div className="crf-select-wrap">
            <select
              className="crf-select-input"
              value={paymentMode}
              onChange={e => setPaymentMode(e.target.value)}
            >
              <option value="UPI Gateway (GPAY/Paytm)">UPI Gateway (GPAY/Paytm)</option>
              <option value="Cash Payment">Cash Payment</option>
              <option value="Card / POS">Card / POS</option>
              <option value="Net Banking">Net Banking</option>
            </select>
            <ChevronDown size={18} className="crf-select-arrow" />
          </div>
        </div>

        {/* SUBMIT BUTTON (LARGE SOLID BLUE BUTTON WITH ₹ SYMBOL) */}
        <div className="crf-submit-wrap">
          <button type="submit" className="crf-submit-btn">
            <span className="crf-rupee-icon">₹</span>
            Submit Payment Receipt
          </button>
        </div>

      </form>

    </div>
  );
};
