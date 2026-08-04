import React, { useState } from 'react';
import { ChevronLeft, Wrench, CheckCircle2, Clock } from 'lucide-react';

interface ComplaintItem {
  id: string;
  roomNumber: string;
  residentName: string;
  category: 'Plumbing' | 'Electrical' | 'Wi-Fi' | 'Cleaning' | 'Furniture';
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  dateLogged: string;
  status: 'Open' | 'In Progress' | 'Resolved';
}

interface OpenComplaintsPageProps {
  onBack: () => void;
  showToast?: (msg: string) => void;
}

export const OpenComplaintsPage: React.FC<OpenComplaintsPageProps> = ({ onBack, showToast }) => {
  const [complaints, setComplaints] = useState<ComplaintItem[]>([
    { id: 'c-1', roomNumber: '204', residentName: 'Riya Sharma', category: 'Plumbing', title: 'Bathroom tap leaking continuously', priority: 'High', dateLogged: '2026-08-01', status: 'Open' },
    { id: 'c-2', roomNumber: '108', residentName: 'Deepak Verma', category: 'Electrical', title: 'Study desk lamp light socket faulty', priority: 'Medium', dateLogged: '2026-08-02', status: 'Open' },
    { id: 'c-3', roomNumber: '302', residentName: 'Kavya Nair', category: 'Wi-Fi', title: '3rd Floor Wi-Fi router slow connection', priority: 'High', dateLogged: '2026-08-02', status: 'In Progress' },
    { id: 'c-4', roomNumber: '101', residentName: 'Amit Verma', category: 'Cleaning', title: 'Balcony cleaning requested', priority: 'Low', dateLogged: '2026-08-03', status: 'Open' },
    { id: 'c-5', roomNumber: '210', residentName: 'Rahul Sharma', category: 'Furniture', title: 'Cupboard door handle loose', priority: 'Low', dateLogged: '2026-08-03', status: 'Open' },
    { id: 'c-6', roomNumber: '105', residentName: 'Suresh Patel', category: 'Plumbing', title: 'Geyser water heating slow', priority: 'Medium', dateLogged: '2026-07-29', status: 'Resolved' },
  ]);

  const [activeFilter, setActiveFilter] = useState<'All' | 'Open' | 'In Progress' | 'Resolved'>('Open');

  const updateStatus = (id: string, newStatus: 'In Progress' | 'Resolved') => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    if (showToast) showToast(`Complaint marked as ${newStatus}`);
  };

  const filtered = complaints.filter(c => activeFilter === 'All' || c.status === activeFilter);
  const openCount = complaints.filter(c => c.status === 'Open').length;
  const progressCount = complaints.filter(c => c.status === 'In Progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;

  return (
    <div className="ocp-page-container">
      {/* HEADER */}
      <div className="ocp-header-bar">
        <button className="ocp-back-btn" onClick={onBack}>
          <ChevronLeft size={20} color="#2563eb" />
          <span className="ocp-back-text">Back</span>
        </button>
        <h1 className="ocp-header-title">Open Complaints</h1>
      </div>

      {/* STATS SUMMARY ROW */}
      <div className="ocp-stats-row">
        <div className="ocp-stat-card purple">
          <div className="ocp-stat-num">{openCount}</div>
          <div className="ocp-stat-lbl">Open Issues</div>
        </div>
        <div className="ocp-stat-card amber">
          <div className="ocp-stat-num">{progressCount}</div>
          <div className="ocp-stat-lbl">In Progress</div>
        </div>
        <div className="ocp-stat-card green">
          <div className="ocp-stat-num">{resolvedCount}</div>
          <div className="ocp-stat-lbl">Resolved</div>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="ocp-filter-row">
        {(['Open', 'In Progress', 'All', 'Resolved'] as const).map(tab => (
          <button
            key={tab}
            className={`ocp-pill ${activeFilter === tab ? 'active' : ''}`}
            onClick={() => setActiveFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* COMPLAINTS LIST */}
      <div className="ocp-list">
        {filtered.length === 0 ? (
          <div className="ocp-empty">No complaints found in this category.</div>
        ) : (
          filtered.map(item => (
            <div key={item.id} className="ocp-card">
              <div className="ocp-card-top">
                <div className="ocp-card-left">
                  <div className="ocp-room-badge">Room {item.roomNumber}</div>
                  <span className={`ocp-priority-badge ${item.priority.toLowerCase()}`}>
                    {item.priority} Priority
                  </span>
                </div>
                <span className={`ocp-status-pill ${item.status.toLowerCase().replace(' ', '-')}`}>
                  {item.status}
                </span>
              </div>

              <div className="ocp-title">{item.title}</div>
              <div className="ocp-sub">
                <span>Category: <strong>{item.category}</strong></span> • <span>Resident: {item.residentName}</span>
              </div>
              <div className="ocp-date">
                <Clock size={12} color="#94a3b8" />
                <span>Logged on {item.dateLogged}</span>
              </div>

              {item.status !== 'Resolved' && (
                <div className="ocp-actions-row">
                  {item.status === 'Open' && (
                    <button className="ocp-btn-progress" onClick={() => updateStatus(item.id, 'In Progress')}>
                      <Wrench size={15} /> Mark In Progress
                    </button>
                  )}
                  <button className="ocp-btn-resolve" onClick={() => updateStatus(item.id, 'Resolved')}>
                    <CheckCircle2 size={15} /> Resolve Issue
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
