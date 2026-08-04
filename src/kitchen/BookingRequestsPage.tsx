import React, { useState } from 'react';
import { ChevronLeft, Calendar, Phone, CheckCircle, XCircle, User, Building } from 'lucide-react';

interface BookingRequestItem {
  id: string;
  name: string;
  phone: string;
  course: string;
  sharingPreferred: string;
  requestedDate: string;
  floorPreferred: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

interface BookingRequestsPageProps {
  onBack: () => void;
}

export const BookingRequestsPage: React.FC<BookingRequestsPageProps> = ({ onBack }) => {
  const [requests, setRequests] = useState<BookingRequestItem[]>([
    { id: 'br-1', name: 'Rohan Sharma', phone: '+91 98765 12345', course: 'B.Tech CSE 2nd Year', sharingPreferred: 'Double Attached', requestedDate: '2026-08-05', floorPreferred: '1st Floor', status: 'Pending' },
    { id: 'br-2', name: 'Kavya Nair', phone: '+91 98765 23456', course: 'MBA 1st Year', sharingPreferred: 'Single Deluxe', requestedDate: '2026-08-07', floorPreferred: '2nd Floor', status: 'Pending' },
    { id: 'br-3', name: 'Manish Verma', phone: '+91 98765 34567', course: 'B.Com Honors', sharingPreferred: 'Triple Non-AC', requestedDate: '2026-08-10', floorPreferred: '1st Floor', status: 'Pending' },
    { id: 'br-4', name: 'Sneha Patel', phone: '+91 98765 45678', course: 'MBBS 3rd Year', sharingPreferred: 'Double Attached', requestedDate: '2026-08-02', floorPreferred: '3rd Floor', status: 'Approved' },
    { id: 'br-5', name: 'Aditya Roy', phone: '+91 98765 56789', course: 'BCA 1st Year', sharingPreferred: 'Triple Non-AC', requestedDate: '2026-08-01', floorPreferred: '2nd Floor', status: 'Rejected' },
  ]);

  const [activeFilter, setActiveFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('Pending');

  const handleAction = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const filtered = requests.filter(r => activeFilter === 'All' || r.status === activeFilter);
  const pendingCount = requests.filter(r => r.status === 'Pending').length;
  const approvedCount = requests.filter(r => r.status === 'Approved').length;
  const rejectedCount = requests.filter(r => r.status === 'Rejected').length;

  return (
    <div className="brp-page-container">
      {/* HEADER */}
      <div className="brp-header-bar">
        <button className="brp-back-btn" onClick={onBack}>
          <ChevronLeft size={20} color="#2563eb" />
          <span className="brp-back-text">Back</span>
        </button>
        <h1 className="brp-header-title">Booking Requests</h1>
      </div>

      {/* STAT CARDS ROW */}
      <div className="brp-stats-row">
        <div className="brp-stat-card amber">
          <div className="brp-stat-num">{pendingCount}</div>
          <div className="brp-stat-lbl">Pending Review</div>
        </div>
        <div className="brp-stat-card green">
          <div className="brp-stat-num">{approvedCount}</div>
          <div className="brp-stat-lbl">Approved</div>
        </div>
        <div className="brp-stat-card red">
          <div className="brp-stat-num">{rejectedCount}</div>
          <div className="brp-stat-lbl">Rejected</div>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="brp-filter-tabs">
        {(['Pending', 'All', 'Approved', 'Rejected'] as const).map(tab => (
          <button
            key={tab}
            className={`brp-tab-btn ${activeFilter === tab ? 'active' : ''}`}
            onClick={() => setActiveFilter(tab)}
          >
            {tab} {tab === 'Pending' && `(${pendingCount})`}
          </button>
        ))}
      </div>

      {/* REQUESTS LIST */}
      <div className="brp-requests-list">
        {filtered.length === 0 ? (
          <div className="brp-empty">No booking requests in this category.</div>
        ) : (
          filtered.map(req => (
            <div key={req.id} className="brp-card">
              <div className="brp-card-top">
                <div className="brp-applicant-avatar">
                  <User size={20} color="#3b82f6" />
                </div>
                <div className="brp-applicant-info">
                  <h3 className="brp-applicant-name">{req.name}</h3>
                  <p className="brp-applicant-sub">{req.course}</p>
                </div>
                <span className={`brp-status-pill ${req.status.toLowerCase()}`}>
                  {req.status}
                </span>
              </div>

              <div className="brp-card-details">
                <div className="brp-detail-line">
                  <Phone size={14} color="#64748b" />
                  <span>{req.phone}</span>
                </div>
                <div className="brp-detail-line">
                  <Building size={14} color="#64748b" />
                  <span>Preferred: {req.sharingPreferred} ({req.floorPreferred})</span>
                </div>
                <div className="brp-detail-line">
                  <Calendar size={14} color="#64748b" />
                  <span>Move-in Date: {req.requestedDate}</span>
                </div>
              </div>

              {req.status === 'Pending' && (
                <div className="brp-actions-row">
                  <button className="brp-btn-approve" onClick={() => handleAction(req.id, 'Approved')}>
                    <CheckCircle size={16} /> Approve Booking
                  </button>
                  <button className="brp-btn-reject" onClick={() => handleAction(req.id, 'Rejected')}>
                    <XCircle size={16} /> Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
