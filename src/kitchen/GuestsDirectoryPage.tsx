import React, { useState } from 'react';
import { ChevronLeft, Search, Phone, Calendar, Mail, MapPin, User, Smartphone, CreditCard, MessageSquare } from 'lucide-react';

interface GuestsDirectoryPageProps {
  onBack: () => void;
}

export const GuestsDirectoryPage: React.FC<GuestsDirectoryPageProps> = ({ onBack }) => {
  const [search, setSearch] = useState('');

  const [selectedGuest, setSelectedGuest] = useState<any>(null);

  const guests = [
    { id: 'g-1', name: 'Amit Verma', roomNumber: '101', bedNumber: 'Bed A', phone: '+91 98765 43210', altPhone: '+91 98765 43211', email: 'amit.verma@example.com', aadhar: '1234 5678 9012', location: 'Medchal, Hyderabad', course: 'B.Tech CSE 3rd Yr', checkIn: '2025-08-10', feeStatus: 'Paid', rent: 6500 },
    { id: 'g-2', name: 'Siddharth Rao', roomNumber: '101', bedNumber: 'Bed B', phone: '+91 98765 43211', altPhone: '+91 98765 43212', email: 'siddharth.r@example.com', aadhar: '2345 6789 0123', location: 'Koramangala, Bangalore', course: 'B.Tech ECE 3rd Yr', checkIn: '2025-08-12', feeStatus: 'Overdue', rent: 6500 },
    { id: 'g-3', name: 'Rahul Sharma', roomNumber: '102', bedNumber: 'Bed A', phone: '+91 98765 22334', altPhone: '+91 98765 22335', email: 'rahul.s@example.com', aadhar: '3456 7890 1234', location: 'Indiranagar, Bangalore', course: 'MBA 1st Yr', checkIn: '2026-01-15', feeStatus: 'Overdue', rent: 6500 },
    { id: 'g-4', name: 'Priya Singh', roomNumber: '103', bedNumber: 'Bed A', phone: '+91 98765 33445', altPhone: '+91 98765 33446', email: 'priya.s@example.com', aadhar: '4567 8901 2345', location: 'Kukatpally, Hyderabad', course: 'B.Pharm 2nd Yr', checkIn: '2025-09-01', feeStatus: 'Paid', rent: 5500 },
    { id: 'g-5', name: 'Neha Gupta', roomNumber: '103', bedNumber: 'Bed B', phone: '+91 98765 55443', altPhone: '+91 98765 55444', email: 'neha.g@example.com', aadhar: '5678 9012 3456', location: 'Gachibowli, Hyderabad', course: 'B.Arch 4th Yr', checkIn: '2025-09-05', feeStatus: 'Paid', rent: 5500 },
    { id: 'g-6', name: 'Vikas Kumar', roomNumber: '201', bedNumber: 'Bed A', phone: '+91 98765 66778', altPhone: '+91 98765 66779', email: 'vikas.k@example.com', aadhar: '6789 0123 4567', location: 'HSR Layout, Bangalore', course: 'M.Tech IT', checkIn: '2025-07-20', feeStatus: 'Paid', rent: 6800 },
  ];

  const filtered = guests.filter(g => {
    if (!search) return true;
    const q = search.toLowerCase();
    return g.name.toLowerCase().includes(q) || (g.location && g.location.toLowerCase().includes(q)) || g.phone.includes(q);
  });

  return (
    <div className="gdp-page-container">


      {/* SEARCH BAR */}
      <div className="gdp-search-box">
        <Search size={16} color="#94a3b8" />
        <input
          type="text"
          placeholder="Search by name, place, or hostel..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* LIST OF GUESTS */}
      <div className="gdp-list">
        {filtered.map(guest => (
          <div key={guest.id} className="gdp-card" onClick={() => setSelectedGuest(guest)} style={{ cursor: 'pointer' }}>
            <div className="gdp-card-top" style={{ borderBottom: 'none', paddingBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div className="gdp-avatar">
                  {guest.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div className="gdp-info">
                  <div className="gdp-name">{guest.name}</div>
                  <div style={{ color: '#64748b', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                    <MapPin size={14} color="#3b82f6" />
                    <span>{guest.location}</span>
                  </div>
                  <div style={{ color: '#64748b', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <Phone size={14} color="#10b981" />
                    <span>{guest.phone}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div
                  style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  onClick={(e) => { e.stopPropagation(); window.open(`tel:${guest.phone}`); }}
                >
                  <Phone size={16} color="#10b981" />
                </div>
                <div
                  style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  onClick={(e) => { e.stopPropagation(); window.open(`sms:${guest.phone}`); }}
                >
                  <MessageSquare size={16} color="#3b82f6" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL FOR GUEST DETAILS */}
      {selectedGuest && (
        <div className="ref-modal-overlay" onClick={() => setSelectedGuest(null)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '24px', width: '100%', maxWidth: '400px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }} onClick={e => e.stopPropagation()}>

            {/* Colorful Header */}
            <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', padding: '32px 24px', position: 'relative', color: 'white' }}>
              <button
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', backdropFilter: 'blur(4px)' }}
                onClick={() => setSelectedGuest(null)}
              >
                ✕
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'white', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                  {selectedGuest.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '700', letterSpacing: '-0.5px' }}>{selectedGuest.name}</h3>
                </div>
              </div>
            </div>

            {/* Modal Body with Icons */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={22} color="#3b82f6" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Address</div>
                  <div style={{ fontSize: '16px', color: '#0f172a', fontWeight: '600' }}>{selectedGuest.location}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={22} color="#8b5cf6" />
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Email Address</div>
                  <div style={{ fontSize: '16px', color: '#0f172a', fontWeight: '600', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{selectedGuest.email}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={22} color="#10b981" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Phone Number</div>
                  <div style={{ fontSize: '16px', color: '#0f172a', fontWeight: '600' }}>{selectedGuest.phone}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Smartphone size={22} color="#f59e0b" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Alt. Number</div>
                  <div style={{ fontSize: '16px', color: '#0f172a', fontWeight: '600' }}>{selectedGuest.altPhone}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CreditCard size={22} color="#ef4444" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Aadhar Number</div>
                  <div style={{ fontSize: '16px', color: '#0f172a', fontWeight: '600' }}>{selectedGuest.aadhar}</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};
