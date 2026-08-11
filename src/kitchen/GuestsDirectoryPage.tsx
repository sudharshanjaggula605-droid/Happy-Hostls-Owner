import React, { useState } from 'react';
import { ChevronLeft, Search, Phone, Calendar, Mail, MapPin, User, Smartphone, CreditCard, MessageSquare, ClipboardList, Home, Users } from 'lucide-react';

interface GuestsDirectoryPageProps {
  onBack: () => void;
}

export const GuestsDirectoryPage: React.FC<GuestsDirectoryPageProps> = ({ onBack }) => {
  const [search, setSearch] = useState('');

  const [selectedGuest, setSelectedGuest] = useState<any>(null);

  const guests = [
  {
    "id": "g-1",
    "name": "Ananya Sharma",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "phone": "9876510002",
    "altPhone": "9876520002",
    "email": "ananya.sharma0@example.com",
    "aadhar": "3000 4000 5002",
    "location": "Hyderabad, AP",
    "hostel": "Sri Akshara Luxury Girls Hostel",
    "sharing": "1-Sharing (Single)",
    "course": "B.Tech CSE - JNTU Hyderabad",
    "checkIn": "1 Jan 2025",
    "feeStatus": "Paid",
    "rent": 12500
  },
  {
    "id": "g-2",
    "name": "Riya Verma",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "phone": "9876510003",
    "altPhone": "9876520003",
    "email": "riya.verma1@example.com",
    "aadhar": "3001 4001 5003",
    "location": "Vijayawada, AP",
    "hostel": "Sri Akshara Luxury Girls Hostel",
    "sharing": "2-Sharing (Double)",
    "course": "B.Tech ECE - IIIT Hyderabad",
    "checkIn": "2 Feb 2025",
    "feeStatus": "Paid",
    "rent": 8500
  },
  {
    "id": "g-3",
    "name": "Sneha Reddy",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "phone": "9876510004",
    "altPhone": "9876520004",
    "email": "sneha.reddy2@example.com",
    "aadhar": "3002 4002 5004",
    "location": "Visakhapatnam, AP",
    "hostel": "Sri Akshara Luxury Girls Hostel",
    "sharing": "3-Sharing (Triple)",
    "course": "B.Tech IT - Osmania University",
    "checkIn": "3 Mar 2025",
    "feeStatus": "Paid",
    "rent": 7000
  },
  {
    "id": "g-4",
    "name": "Kavya Nair",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "phone": "9876510005",
    "altPhone": "9876520005",
    "email": "kavya.nair3@example.com",
    "aadhar": "3003 4003 5005",
    "location": "Guntur, AP",
    "hostel": "Sri Akshara Luxury Girls Hostel",
    "sharing": "4-Sharing (Quad)",
    "course": "B.Tech Mechanical - ISB Hyderabad",
    "checkIn": "4 Apr 2025",
    "feeStatus": "Overdue",
    "rent": 5500
  },
  {
    "id": "g-5",
    "name": "Pooja Hegde",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "phone": "9876510006",
    "altPhone": "9876520006",
    "email": "pooja.hegde4@example.com",
    "aadhar": "3004 4004 5006",
    "location": "Tirupati, AP",
    "hostel": "Sri Akshara Luxury Girls Hostel",
    "sharing": "1-Sharing (Single)",
    "course": "B.Tech AI & ML - BITS Pilani Hyderabad",
    "checkIn": "5 May 2025",
    "feeStatus": "Overdue",
    "rent": 12500
  },
  {
    "id": "g-6",
    "name": "Meera Patel",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "phone": "9876510007",
    "altPhone": "9876520007",
    "email": "meera.patel5@example.com",
    "aadhar": "3005 4005 5007",
    "location": "Warangal, TS",
    "hostel": "Sri Akshara Luxury Girls Hostel",
    "sharing": "2-Sharing (Double)",
    "course": "MBA Finance - CBIT Hyderabad",
    "checkIn": "6 Jun 2025",
    "feeStatus": "Overdue",
    "rent": 8500
  },
  {
    "id": "g-7",
    "name": "Divya Joshi",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "phone": "9876510008",
    "altPhone": "9876520008",
    "email": "divya.joshi6@example.com",
    "aadhar": "3006 4006 5008",
    "location": "Karimnagar, TS",
    "hostel": "Sri Akshara Luxury Girls Hostel",
    "sharing": "3-Sharing (Triple)",
    "course": "MBA Marketing - VNR VJIET",
    "checkIn": "7 Jul 2025",
    "feeStatus": "Paid",
    "rent": 7000
  },
  {
    "id": "g-8",
    "name": "Sunita Rao",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "phone": "9876510009",
    "altPhone": "9876520009",
    "email": "sunita.rao7@example.com",
    "aadhar": "3007 4007 5009",
    "location": "Nizamabad, TS",
    "hostel": "Sri Akshara Luxury Girls Hostel",
    "sharing": "4-Sharing (Quad)",
    "course": "M.Tech Software Engineering - Vasavi College of Engineering",
    "checkIn": "8 Aug 2025",
    "feeStatus": "Paid",
    "rent": 5500
  },
  {
    "id": "g-9",
    "name": "Swati Kulkarni",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "phone": "9876510010",
    "altPhone": "9876520010",
    "email": "swati.kulkarni8@example.com",
    "aadhar": "3008 4008 5010",
    "location": "Bangalore, KA",
    "hostel": "Sri Akshara Luxury Girls Hostel",
    "sharing": "1-Sharing (Single)",
    "course": "B.Pharm 3rd Yr - Gokaraju Rangaraju Institute",
    "checkIn": "9 Jan 2025",
    "feeStatus": "Paid",
    "rent": 12500
  },
  {
    "id": "g-10",
    "name": "Priyanka Das",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "phone": "9876510011",
    "altPhone": "9876520011",
    "email": "priyanka.das9@example.com",
    "aadhar": "3009 4009 5011",
    "location": "Chennai, TN",
    "hostel": "Sri Akshara Luxury Girls Hostel",
    "sharing": "2-Sharing (Double)",
    "course": "M.Sc Data Science - Malla Reddy Engineering College",
    "checkIn": "10 Feb 2025",
    "feeStatus": "Paid",
    "rent": 8500
  }
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
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Location / Address</div>
                  <div style={{ fontSize: '16px', color: '#0f172a', fontWeight: '600' }}>{selectedGuest.location}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Home size={22} color="#10b981" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Hostel</div>
                  <div style={{ fontSize: '16px', color: '#0f172a', fontWeight: '600' }}>{selectedGuest.hostel}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fdf4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Users size={22} color="#d946ef" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Sharing Type</div>
                  <div style={{ fontSize: '16px', color: '#0f172a', fontWeight: '600' }}>{selectedGuest.sharing}</div>
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



            </div>
          </div>
        </div>
      )}
    </div>
  );
};
