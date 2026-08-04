import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  X,
  CheckCircle2,
  AlertCircle,
  MoreVertical
} from 'lucide-react';
import type { FeeTransaction } from '../types';

interface PaymentVerificationPageProps {
  transaction: FeeTransaction;
  onBack: () => void;
  onAcceptPayment: (id: string) => void;
  onRejectPayment: (id: string, reason: string) => void;
}

export const PaymentVerificationPage: React.FC<PaymentVerificationPageProps> = ({
  transaction,
  onBack,
  onAcceptPayment,
  onRejectPayment
}) => {
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('Incorrect Amount Uploaded');
  const [customRejectNote, setCustomRejectNote] = useState('');

  const displayAmount = transaction.dues > 0 ? transaction.dues : (transaction.amountPaid > 0 ? transaction.amountPaid : transaction.amount);

  const handleConfirmAccept = () => {
    onAcceptPayment(transaction.id);
    setShowAcceptDialog(false);
  };

  const handleConfirmReject = () => {
    const finalReason = rejectReason === 'Other' ? (customRejectNote || 'Unspecified Reason') : rejectReason;
    onRejectPayment(transaction.id, finalReason);
    setShowRejectDialog(false);
  };

  return (
    <div className="payment-verification-page-container">
      
      {/* HEADER BAR */}
      <div className="pv-header-bar">
        <button className="pv-back-btn" onClick={onBack} title="Back to Fees">
          <ArrowLeft size={20} />
        </button>
        <h1 className="pv-header-title">Payment Verification</h1>
        <button className="pv-icon-btn" title="Options">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* STUDENT INFORMATION HEADER SECTION */}
      <div className="pv-student-info-section">
        <div className="pv-student-top-line">
          <h2 className="pv-student-name">{transaction.studentName}</h2>
          <span className="pv-room-badge">Room {transaction.roomNumber}</span>
        </div>

        <div className="pv-uploaded-timestamp">
          Uploaded: {transaction.uploadedDate || `${transaction.date}, 08:30 am`}
        </div>
      </div>

      {/* CENTER PAYMENT PROOF PREVIEW CARD (EXACT 1:1 MATCH TO REFERENCE IMAGE) */}
      <div className="pv-center-card-outer">
        <div className="pv-proof-inner-card">
          
          {/* LARGE GREEN CIRCULAR CHECKMARK BADGE */}
          <div className="pv-green-check-badge-wrap">
            <div className="pv-green-check-outer-ring">
              <div className="pv-green-check-inner-circle">
                <Check size={36} strokeWidth={3} style={{ color: '#ffffff' }} />
              </div>
            </div>
          </div>

          {/* LARGE BOLD GREEN AMOUNT */}
          <div className="pv-amount-display">
            ₹{displayAmount.toLocaleString('en-IN')}
          </div>

          {/* STUDENT NAME BELOW AMOUNT */}
          <div className="pv-student-sub-name">
            {transaction.studentName}
          </div>

          {/* STATUS BADGE: "Payment Uploaded" */}
          <div className="pv-status-pill-badge">
            Payment Uploaded
          </div>

        </div>
      </div>

      {/* BOTTOM ACTION BUTTONS */}
      <div className="pv-bottom-actions-container">
        
        {/* ACCEPT PAYMENT BUTTON (LARGE SOLID GREEN) */}
        <button
          className="pv-btn-accept"
          onClick={() => setShowAcceptDialog(true)}
        >
          <span className="pv-btn-icon-check">
            <Check size={18} strokeWidth={3} />
          </span>
          Accept Payment
        </button>

        {/* REJECT PAYMENT BUTTON (LARGE WHITE WITH RED OUTLINE) */}
        <button
          className="pv-btn-reject"
          onClick={() => setShowRejectDialog(true)}
        >
          <span className="pv-btn-icon-cross">
            <X size={18} strokeWidth={3} />
          </span>
          Reject Payment
        </button>

      </div>

      {/* ACCEPT PAYMENT CONFIRMATION DIALOG */}
      {showAcceptDialog && (
        <div className="ref-modal-overlay" onClick={() => setShowAcceptDialog(false)}>
          <div className="ref-modal-card" onClick={e => e.stopPropagation()}>
            <div className="ref-modal-header">
              <div>
                <h3 className="ref-modal-title">Accept Payment</h3>
                <p className="ref-modal-subtitle">{transaction.studentName} • Room {transaction.roomNumber}</p>
              </div>
              <button className="ref-close-btn" onClick={() => setShowAcceptDialog(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="ref-modal-body text-center">
              <div className="pv-dialog-icon-wrap green">
                <CheckCircle2 size={40} style={{ color: '#16a34a' }} />
              </div>
              <p className="pv-dialog-prompt-text">
                Are you sure you want to accept this payment of <strong style={{ color: '#16a34a' }}>₹{displayAmount.toLocaleString('en-IN')}</strong>?
              </p>
              <p className="pv-dialog-sub-text">
                This will mark the fee as Paid, generate the digital receipt automatically, and update dashboard collections.
              </p>
            </div>

            <div className="ref-modal-actions">
              <button className="ref-btn-cancel" onClick={() => setShowAcceptDialog(false)}>
                Cancel
              </button>
              <button className="ref-btn-submit bg-emerald-600" onClick={handleConfirmAccept}>
                <Check size={16} /> Yes, Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REJECT PAYMENT DIALOG */}
      {showRejectDialog && (
        <div className="ref-modal-overlay" onClick={() => setShowRejectDialog(false)}>
          <div className="ref-modal-card" onClick={e => e.stopPropagation()}>
            <div className="ref-modal-header">
              <div>
                <h3 className="ref-modal-title">Reject Payment Proof</h3>
                <p className="ref-modal-subtitle">{transaction.studentName} • Room {transaction.roomNumber}</p>
              </div>
              <button className="ref-close-btn" onClick={() => setShowRejectDialog(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="ref-modal-body">
              <div className="pv-dialog-icon-wrap red">
                <AlertCircle size={36} style={{ color: '#dc2626' }} />
              </div>
              <p className="pv-dialog-prompt-text">
                Please select a reason for rejecting this payment:
              </p>

              <div className="pv-rejection-reasons-list">
                {[
                  'Incorrect Amount Uploaded',
                  'Blurry or Unclear Screenshot',
                  'Invalid UPI Transaction Ref',
                  'Duplicate Receipt Uploaded',
                  'Other'
                ].map(reason => (
                  <label key={reason} className={`pv-reason-radio-label ${rejectReason === reason ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="rejectReason"
                      value={reason}
                      checked={rejectReason === reason}
                      onChange={e => setRejectReason(e.target.value)}
                    />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>

              {rejectReason === 'Other' && (
                <textarea
                  className="pv-reject-note-input"
                  placeholder="Specify custom reason..."
                  value={customRejectNote}
                  onChange={e => setCustomRejectNote(e.target.value)}
                  rows={2}
                />
              )}
            </div>

            <div className="ref-modal-actions">
              <button className="ref-btn-cancel" onClick={() => setShowRejectDialog(false)}>
                Cancel
              </button>
              <button className="ref-btn-submit bg-red-600" onClick={handleConfirmReject}>
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
