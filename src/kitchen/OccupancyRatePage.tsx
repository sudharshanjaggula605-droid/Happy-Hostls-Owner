import React, { useState } from 'react';
import { ChevronLeft, Users, Percent, Search } from 'lucide-react';

interface OccupancyRatePageProps {
  onBack: () => void;
}

export const OccupancyRatePage: React.FC<OccupancyRatePageProps> = ({ onBack }) => {
  const [filter, setFilter] = useState<'All' | 'Full' | 'Partial' | 'Vacant'>('All');
  const [search, setSearch] = useState('');

  const rooms = [
    { roomNumber: '101', floor: '1st Floor', sharing: 'Double Attached', totalBeds: 2, occupied: 2, rent: 6500, residents: ['Amit Verma', 'Siddharth Rao'], status: 'Full' },
    { roomNumber: '102', floor: '1st Floor', sharing: 'Double Attached', totalBeds: 2, occupied: 1, rent: 6500, residents: ['Rahul Sharma'], status: 'Partial' },
    { roomNumber: '103', floor: '1st Floor', sharing: 'Triple Non-AC', totalBeds: 3, occupied: 3, rent: 5500, residents: ['Priya Singh', 'Neha Gupta', 'Ananya Roy'], status: 'Full' },
    { roomNumber: '104', floor: '1st Floor', sharing: 'Single Deluxe', totalBeds: 1, occupied: 0, rent: 9000, residents: [], status: 'Vacant' },
    { roomNumber: '201', floor: '2nd Floor', sharing: 'Double Attached', totalBeds: 2, occupied: 2, rent: 6800, residents: ['Vikas Kumar', 'Rohan Mehta'], status: 'Full' },
    { roomNumber: '202', floor: '2nd Floor', sharing: 'Triple Attached', totalBeds: 3, occupied: 2, rent: 5800, residents: ['Karan Singh', 'Deepak Verma'], status: 'Partial' },
    { roomNumber: '203', floor: '2nd Floor', sharing: 'Single AC', totalBeds: 1, occupied: 1, rent: 9500, residents: ['Aakash Patel'], status: 'Full' },
    { roomNumber: '301', floor: '3rd Floor', sharing: 'Double Non-AC', totalBeds: 2, occupied: 0, rent: 6000, residents: [], status: 'Vacant' },
  ];

  const filtered = rooms.filter(r => {
    if (filter !== 'All' && r.status !== filter) return false;
    if (search && !r.roomNumber.includes(search) && !r.sharing.toLowerCase().includes(search.toLowerCase()) && !r.residents.some(n => n.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  const totalBeds = rooms.reduce((acc, r) => acc + r.totalBeds, 0);
  const occupiedBeds = rooms.reduce((acc, r) => acc + r.occupied, 0);
  const vacantBeds = totalBeds - occupiedBeds;
  const occupancyPercent = Math.round((occupiedBeds / totalBeds) * 100);

  return (
    <div className="orp-page-container">
      {/* HEADER */}
      <div className="orp-header-bar">
        <button className="orp-back-btn" onClick={onBack}>
          <ChevronLeft size={20} color="#2563eb" />
          <span className="orp-back-text">Back</span>
        </button>
        <h1 className="orp-header-title">Occupancy Rate Details</h1>
      </div>

      {/* OVERALL OCCUPANCY HERO STAT CARD */}
      <div className="orp-hero-card">
        <div className="orp-hero-top">
          <div>
            <div className="orp-hero-label">Overall Occupancy Rate</div>
            <div className="orp-hero-percentage">{occupancyPercent}%</div>
          </div>
          <div className="orp-hero-icon-wrap">
            <Percent size={28} color="#2563eb" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="orp-progress-track">
          <div className="orp-progress-fill" style={{ width: `${occupancyPercent}%` }} />
        </div>

        {/* Substats Grid */}
        <div className="orp-hero-stats">
          <div className="orp-substat">
            <span className="orp-substat-num green">{occupiedBeds}</span>
            <span className="orp-substat-lbl">Occupied Beds</span>
          </div>
          <div className="orp-substat">
            <span className="orp-substat-num red">{vacantBeds}</span>
            <span className="orp-substat-lbl">Vacant Beds</span>
          </div>
          <div className="orp-substat">
            <span className="orp-substat-num blue">{totalBeds}</span>
            <span className="orp-substat-lbl">Total Capacity</span>
          </div>
        </div>
      </div>

      {/* FLOOR BREAKDOWN STATS */}
      <div className="orp-section-title">FLOOR BREAKDOWN</div>
      <div className="orp-floors-grid">
        <div className="orp-floor-card">
          <div className="orp-floor-name">1st Floor</div>
          <div className="orp-floor-pct">87% Occupied</div>
          <div className="orp-floor-beds">7 / 8 Beds</div>
        </div>
        <div className="orp-floor-card">
          <div className="orp-floor-name">2nd Floor</div>
          <div className="orp-floor-pct">83% Occupied</div>
          <div className="orp-floor-beds">5 / 6 Beds</div>
        </div>
        <div className="orp-floor-card">
          <div className="orp-floor-name">3rd Floor</div>
          <div className="orp-floor-pct">0% Occupied</div>
          <div className="orp-floor-beds">0 / 2 Beds</div>
        </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="orp-section-title" style={{ marginTop: 20 }}>ROOM OCCUPANCY LIST</div>
      <div className="orp-controls-row">
        <div className="orp-search-box">
          <Search size={15} color="#94a3b8" />
          <input 
            type="text"
            placeholder="Search room or resident..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="orp-filter-pills">
          {(['All', 'Full', 'Partial', 'Vacant'] as const).map(f => (
            <button
              key={f}
              className={`orp-pill ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ROOM CARDS LIST */}
      <div className="orp-rooms-list">
        {filtered.map(room => (
          <div key={room.roomNumber} className="orp-room-card">
            <div className="orp-room-left">
              <div className="orp-room-num">Room {room.roomNumber}</div>
              <div className="orp-room-sub">{room.floor} • {room.sharing}</div>
              {room.residents.length > 0 ? (
                <div className="orp-room-residents">
                  <Users size={13} color="#64748b" />
                  <span>{room.residents.join(', ')}</span>
                </div>
              ) : (
                <div className="orp-room-vacant-tag">No occupants currently</div>
              )}
            </div>
            <div className="orp-room-right">
              <span className={`orp-status-badge ${room.status.toLowerCase()}`}>
                {room.status === 'Full' ? 'Fully Occupied' : room.status === 'Partial' ? 'Partially Filled' : '100% Vacant'}
              </span>
              <div className="orp-room-beds-count">{room.occupied} / {room.totalBeds} Beds</div>
              <div className="orp-room-rent">₹{room.rent.toLocaleString('en-IN')}/mo</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
