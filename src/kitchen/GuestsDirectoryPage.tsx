import React, { useState } from 'react';
import { ChevronLeft, Search, Phone, Calendar } from 'lucide-react';

interface GuestsDirectoryPageProps {
  onBack: () => void;
}

export const GuestsDirectoryPage: React.FC<GuestsDirectoryPageProps> = ({ onBack }) => {
  const [search, setSearch] = useState('');

  const guests = [
    { id: 'g-1', name: 'Amit Verma', roomNumber: '101', bedNumber: 'Bed A', phone: '+91 98765 43210', course: 'B.Tech CSE 3rd Yr', checkIn: '2025-08-10', feeStatus: 'Paid', rent: 6500 },
    { id: 'g-2', name: 'Siddharth Rao', roomNumber: '101', bedNumber: 'Bed B', phone: '+91 98765 43211', course: 'B.Tech ECE 3rd Yr', checkIn: '2025-08-12', feeStatus: 'Overdue', rent: 6500 },
    { id: 'g-3', name: 'Rahul Sharma', roomNumber: '102', bedNumber: 'Bed A', phone: '+91 98765 22334', course: 'MBA 1st Yr', checkIn: '2026-01-15', feeStatus: 'Overdue', rent: 6500 },
    { id: 'g-4', name: 'Priya Singh', roomNumber: '103', bedNumber: 'Bed A', phone: '+91 98765 33445', course: 'B.Pharm 2nd Yr', checkIn: '2025-09-01', feeStatus: 'Paid', rent: 5500 },
    { id: 'g-5', name: 'Neha Gupta', roomNumber: '103', bedNumber: 'Bed B', phone: '+91 98765 55443', course: 'B.Arch 4th Yr', checkIn: '2025-09-05', feeStatus: 'Paid', rent: 5500 },
    { id: 'g-6', name: 'Vikas Kumar', roomNumber: '201', bedNumber: 'Bed A', phone: '+91 98765 66778', course: 'M.Tech IT', checkIn: '2025-07-20', feeStatus: 'Paid', rent: 6800 },
  ];

  const filtered = guests.filter(g => {
    if (!search) return true;
    const q = search.toLowerCase();
    return g.name.toLowerCase().includes(q) || g.roomNumber.includes(q) || g.phone.includes(q) || g.course.toLowerCase().includes(q);
  });

  return (
    <div className="gdp-page-container">
      {/* HEADER */}
      <div className="gdp-header-bar">
        <button className="gdp-back-btn" onClick={onBack}>
          <ChevronLeft size={20} color="#2563eb" />
          <span className="gdp-back-text">Back</span>
        </button>
        <h1 className="gdp-header-title">Guests & Residents</h1>
      </div>

      {/* STAT SUMMARY CARD */}
      <div className="gdp-hero-card">
        <div className="gdp-hero-stat">
          <div className="gdp-hero-num">{guests.length}</div>
          <div className="gdp-hero-lbl">Active Residents</div>
        </div>
        <div className="gdp-hero-stat">
          <div className="gdp-hero-num green">4</div>
          <div className="gdp-hero-lbl">Paid This Month</div>
        </div>
        <div className="gdp-hero-stat">
          <div className="gdp-hero-num red">2</div>
          <div className="gdp-hero-lbl">Overdue Fees</div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="gdp-search-box">
        <Search size={16} color="#94a3b8" />
        <input 
          type="text" 
          placeholder="Search guest by name, room, or phone..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* LIST OF GUESTS */}
      <div className="gdp-list">
        {filtered.map(guest => (
          <div key={guest.id} className="gdp-card">
            <div className="gdp-card-top">
              <div className="gdp-avatar">
                {guest.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="gdp-info">
                <div className="gdp-name">{guest.name}</div>
                <div className="gdp-course">{guest.course}</div>
              </div>
              <div className="gdp-room-badge">
                Room {guest.roomNumber} ({guest.bedNumber})
              </div>
            </div>

            <div className="gdp-details-grid">
              <div className="gdp-detail">
                <Phone size={13} color="#64748b" />
                <span>{guest.phone}</span>
              </div>
              <div className="gdp-detail">
                <Calendar size={13} color="#64748b" />
                <span>Joined {guest.checkIn}</span>
              </div>
            </div>

            <div className="gdp-card-bottom">
              <span className="gdp-rent">Rent: ₹{guest.rent.toLocaleString('en-IN')}/mo</span>
              <span className={`gdp-fee-badge ${guest.feeStatus.toLowerCase()}`}>
                Fee: {guest.feeStatus}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
