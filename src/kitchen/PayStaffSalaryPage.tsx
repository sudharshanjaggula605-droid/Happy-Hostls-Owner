import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, CheckCircle2 } from 'lucide-react';

interface StaffPayOption {
  id: string;
  name: string;
  role: string;
  statusLabel: string;
  standardSalary: number;
  absentDays: number;
  absenceDeduction: number;
  netPay: number;
}

interface PayStaffSalaryPageProps {
  initialStaff?: {
    name: string;
    role?: string;
    salaryMonthly: number;
    absentDays?: number;
  } | null;
  onBack: () => void;
  onDisburseSalary: (staffName: string, amount: number, month: string, channel: string, transactionId?: string) => void;
}

export const PayStaffSalaryPage: React.FC<PayStaffSalaryPageProps> = ({
  initialStaff,
  onBack,
  onDisburseSalary
}) => {
  const staffList: StaffPayOption[] = [
    {
      id: 'st-rk',
      name: 'Ramesh Kumar',
      role: 'Warden',
      statusLabel: 'Ramesh Kumar (Warden) - Paid',
      standardSalary: 18000,
      absentDays: 1,
      absenceDeduction: 692,
      netPay: 17308
    },
    {
      id: 'st-sd',
      name: 'Sita Devi',
      role: 'Cook/Cleaner',
      statusLabel: 'Sita Devi (Cook/Cleaner) - Unpaid',
      standardSalary: 14000,
      absentDays: 2,
      absenceDeduction: 1076,
      netPay: 12924
    },
    {
      id: 'st-bs',
      name: 'Bahadur Singh',
      role: 'Security',
      statusLabel: 'Bahadur Singh (Security) - Unpaid',
      standardSalary: 12000,
      absentDays: 0,
      absenceDeduction: 0,
      netPay: 12000
    },
    {
      id: 'st-sc',
      name: 'Suresh Cook',
      role: 'Head Chef',
      statusLabel: 'Suresh Cook (Head Chef) - Paid',
      standardSalary: 15000,
      absentDays: 1,
      absenceDeduction: 576,
      netPay: 14424
    }
  ];

  const matchedInitial = initialStaff
    ? staffList.find(s => s.name.toLowerCase().includes(initialStaff.name.toLowerCase()))
    : undefined;

  const [selectedStaffId, setSelectedStaffId] = useState<string>(matchedInitial ? matchedInitial.id : 'st-rk');

  const activeStaff = staffList.find(s => s.id === selectedStaffId) || staffList[0];

  const [salaryAmount, setSalaryAmount] = useState<string>(activeStaff.netPay.toString());
  const [salaryMonth, setSalaryMonth] = useState<string>('July');
  const [paymentChannel, setPaymentChannel] = useState<string>('UPI (Google Pay / PhonePe)');
  const [transactionId, setTransactionId] = useState<string>('');

  const handleStaffSelect = (id: string) => {
    setSelectedStaffId(id);
    const target = staffList.find(s => s.id === id);
    if (target) {
      setSalaryAmount(target.netPay.toString());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(salaryAmount) || activeStaff.netPay;
    onDisburseSalary(activeStaff.name, amountNum, salaryMonth, paymentChannel, transactionId);
  };

  return (
    <div className="pay-staff-salary-page-container">
      
      {/* HEADER BAR (EXACT MATCH TO REFERENCE PHOTO) */}
      <div className="pss-header-bar">
        
        <h1 className="pss-header-title">Pay Staff Salary</h1>
      </div>

      <form onSubmit={handleSubmit} className="pss-form-container">
        
        {/* SELECT STAFF MEMBER DROPDOWN REMOVED */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-color)' }}>{activeStaff.statusLabel}</h2>
        </div>

        {/* SALARY CALCULATION SUMMARY CARD (GREY BOX WITH DASHED BORDER) */}
        <div className="pss-summary-box">
          <div className="pss-summary-row">
            <span className="pss-label">Standard Salary:</span>
            <span className="pss-val-bold">₹{activeStaff.standardSalary.toLocaleString('en-IN')}</span>
          </div>

          <div className="pss-summary-row" style={{ marginTop: '8px' }}>
            <span className="pss-label-red">Unexcused Absences ({activeStaff.absentDays} days):</span>
            <span className="pss-val-red">-₹{activeStaff.absenceDeduction.toLocaleString('en-IN')}</span>
          </div>

          <div className="pss-divider" />

          <div className="pss-summary-row">
            <span className="pss-label-green">Suggested Net Pay:</span>
            <span className="pss-val-green">₹{activeStaff.netPay.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* FIELD 2: SALARY AMOUNT (₹) */}
        <div className="pss-field-group">
          <label className="pss-field-label">Salary Amount (₹)</label>
          <input
            type="number"
            className="pss-text-input"
            value={salaryAmount}
            onChange={e => setSalaryAmount(e.target.value)}
            placeholder="e.g. 17308"
            required
          />
        </div>

        {/* FIELD 3: SALARY MONTH */}
        <div className="pss-field-group">
          <label className="pss-field-label">Salary Month</label>
          <div className="pss-select-wrap">
            <select
              className="pss-select-input"
              value={salaryMonth}
              onChange={e => setSalaryMonth(e.target.value)}
            >
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="June">June</option>
              <option value="May">May</option>
            </select>
            <ChevronDown size={18} className="pss-select-arrow" />
          </div>
        </div>

        {/* FIELD 4: PAYMENT CHANNEL */}
        <div className="pss-field-group">
          <label className="pss-field-label">Payment Channel</label>
          <div className="pss-select-wrap">
            <select
              className="pss-select-input"
              value={paymentChannel}
              onChange={e => setPaymentChannel(e.target.value)}
            >
              <option value="UPI (Google Pay / PhonePe)">UPI (Google Pay / PhonePe)</option>
              <option value="Cash Payment">Cash Payment</option>
              <option value="Direct Bank Transfer (NEFT/IMPS)">Direct Bank Transfer (NEFT/IMPS)</option>
              <option value="Cheque">Cheque</option>
            </select>
            <ChevronDown size={18} className="pss-select-arrow" />
          </div>
        </div>

        {/* CONDITIONAL FIELD: TRANSACTION ID */}
        {paymentChannel !== 'Cash Payment' && paymentChannel !== 'Cheque' && (
          <div className="pss-field-group">
            <label className="pss-field-label">Transaction ID</label>
            <input
              type="text"
              className="pss-text-input"
              value={transactionId}
              onChange={e => setTransactionId(e.target.value)}
              placeholder="e.g. UTR / Ref Number"
              required
            />
          </div>
        )}

        {/* DISBURSE SALARY BUTTON (LARGE SOLID BLUE BUTTON WITH WHITE CHECKMARK CIRCLE) */}
        <div className="pss-submit-wrap">
          <button type="submit" className="pss-disburse-btn">
            <CheckCircle2 size={20} className="text-white" />
            Disburse Salary
          </button>
        </div>

      </form>

    </div>
  );
};
