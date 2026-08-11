import React, { useState } from 'react';
import { 
  ChevronLeft, Search, Phone, Calendar, Mail, MapPin, User, 
  Smartphone, CreditCard, MessageSquare, ClipboardList, Home, 
  Users, UserPlus, Plus, X, Sparkles, Check, Building2, Briefcase 
} from 'lucide-react';

interface GuestsDirectoryPageProps {
  onBack?: () => void;
  showToast?: (msg: string) => void;
}

export const GuestsDirectoryPage: React.FC<GuestsDirectoryPageProps> = ({ onBack, showToast }) => {
  const [search, setSearch] = useState('');
  const [selectedGuest, setSelectedGuest] = useState<any>(null);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);

<<<<<<< HEAD
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
=======
  const [guests, setGuests] = useState([
    { id: 'g-1', name: 'Amit Verma', roomNumber: '101', bedNumber: 'Bed A', phone: '+91 98765 43210', altPhone: '+91 98765 43211', email: 'amit.verma@example.com', aadhar: '1234 5678 9012', location: 'Medchal, Hyderabad', hostel: 'Boys Hostel', sharing: '2 Sharing', course: 'B.Tech CSE 3rd Yr', profession: 'Student (B.Tech CSE)', checkIn: '2025-08-10', feeStatus: 'Paid', rent: 6500 },
    { id: 'g-2', name: 'Siddharth Rao', roomNumber: '101', bedNumber: 'Bed B', phone: '+91 98765 43211', altPhone: '+91 98765 43212', email: 'siddharth.r@example.com', aadhar: '2345 6789 0123', location: 'Koramangala, Bangalore', hostel: 'Co-living', sharing: '2 Sharing', course: 'B.Tech ECE 3rd Yr', profession: 'Software Engineer', checkIn: '2025-08-12', feeStatus: 'Overdue', rent: 6500 },
    { id: 'g-3', name: 'Rahul Sharma', roomNumber: '102', bedNumber: 'Bed A', phone: '+91 98765 22334', altPhone: '+91 98765 22335', email: 'rahul.s@example.com', aadhar: '3456 7890 1234', location: 'Indiranagar, Bangalore', hostel: 'Boys Hostel', sharing: '1 Sharing', course: 'MBA 1st Yr', profession: 'Business Analyst', checkIn: '2026-01-15', feeStatus: 'Overdue', rent: 6500 },
    { id: 'g-4', name: 'Priya Singh', roomNumber: '103', bedNumber: 'Bed A', phone: '+91 98765 33445', altPhone: '+91 98765 33446', email: 'priya.s@example.com', aadhar: '4567 8901 2345', location: 'Kukatpally, Hyderabad', hostel: 'Girls Hostel', sharing: '3 Sharing', course: 'B.Pharm 2nd Yr', profession: 'Pharmacist', checkIn: '2025-09-01', feeStatus: 'Paid', rent: 5500 },
    { id: 'g-5', name: 'Neha Gupta', roomNumber: '103', bedNumber: 'Bed B', phone: '+91 98765 55443', altPhone: '+91 98765 55444', email: 'neha.g@example.com', aadhar: '5678 9012 3456', location: 'Gachibowli, Hyderabad', hostel: 'Girls Hostel', sharing: '4 Sharing', course: 'B.Arch 4th Yr', profession: 'Architect Intern', checkIn: '2025-09-05', feeStatus: 'Paid', rent: 5500 },
    { id: 'g-6', name: 'Vikas Kumar', roomNumber: '201', bedNumber: 'Bed A', phone: '+91 98765 66778', altPhone: '+91 98765 66779', email: 'vikas.k@example.com', aadhar: '6789 0123 4567', location: 'HSR Layout, Bangalore', hostel: 'Co-living', sharing: '1 Sharing', course: 'M.Tech IT', profession: 'IT Professional', checkIn: '2025-07-20', feeStatus: 'Paid', rent: 6800 },
  ]);

  // Form state for Manual Entry Lead
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    altPhone: '',
    location: '',
    hostel: 'Boys Hostel',
    sharing: '2 Sharing',
    email: '',
    profession: '',
    course: '',
  });

  const [formError, setFormError] = useState('');

  const handleAddLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Please enter lead name');
      return;
    }
    if (!formData.phone.trim()) {
      setFormError('Please enter phone number');
      return;
    }

    const formattedPhone = formData.phone.trim().startsWith('+') ? formData.phone.trim() : `+91 ${formData.phone.trim()}`;
    const formattedAltPhone = formData.altPhone.trim() 
      ? (formData.altPhone.trim().startsWith('+') ? formData.altPhone.trim() : `+91 ${formData.altPhone.trim()}`)
      : '';

    const newLead = {
      id: `g-${Date.now()}`,
      name: formData.name.trim(),
      roomNumber: 'Unassigned',
      bedNumber: '-',
      phone: formattedPhone,
      altPhone: formattedAltPhone || formattedPhone,
      email: formData.email.trim() || `${formData.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      aadhar: 'Pending',
      location: formData.location.trim() || 'Hyderabad',
      hostel: formData.hostel,
      sharing: formData.sharing,
      profession: formData.profession.trim() || formData.course.trim() || 'Software Engineer',
      course: formData.course.trim() || formData.profession.trim() || 'Manual Lead Inquiry',
      checkIn: new Date().toISOString().split('T')[0],
      feeStatus: 'Inquiry',
      rent: 6500
    };

    setGuests(prev => [newLead, ...prev]);
    if (showToast) {
      showToast(`Manual lead "${newLead.name}" added successfully!`);
    }

    // Reset Form
    setFormData({
      name: '',
      phone: '',
      altPhone: '',
      location: '',
      hostel: 'Boys Hostel',
      sharing: '2 Sharing',
      email: '',
      profession: '',
      course: '',
    });
    setFormError('');
    setIsAddLeadModalOpen(false);
  };
>>>>>>> e7f9e7202adfec5ab28bbed18f20b2ab8c7698e7

  const filtered = guests.filter(g => {
    if (!search) return true;
    const q = search.toLowerCase();
    return g.name.toLowerCase().includes(q) || (g.location && g.location.toLowerCase().includes(q)) || g.phone.includes(q) || (g.profession && g.profession.toLowerCase().includes(q));
  });

  return (
    <div className="gdp-page-container">

      {/* HEADER & ACTION ROW */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', gap: '12px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.3px' }}>Leads</h2>
          <p style={{ margin: '2px 0 0', fontSize: '12.5px', color: '#64748b', fontWeight: '500' }}>Manage lead inquiries & entries</p>
        </div>
        <button
          onClick={() => setIsAddLeadModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '14px',
            padding: '10px 16px',
            fontSize: '13.5px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease'
          }}
        >
          <UserPlus size={18} />
          <span>Manual Entry</span>
        </button>
      </div>

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

      {/* LIST OF GUESTS / LEADS */}
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
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
            <UserPlus size={40} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
            <p style={{ margin: 0, fontWeight: '600', fontSize: '15px' }}>No leads found</p>
            <p style={{ margin: '4px 0 16px', fontSize: '13px' }}>Try searching another keyword or add a lead manually.</p>
            <button
              onClick={() => setIsAddLeadModalOpen(true)}
              style={{
                background: '#eff6ff',
                color: '#2563eb',
                border: '1px solid #bfdbfe',
                borderRadius: '12px',
                padding: '8px 16px',
                fontWeight: '700',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              + Add Manual Entry Lead
            </button>
          </div>
        )}
      </div>

      {/* MODAL FOR MANUAL ENTRY LEAD */}
      {isAddLeadModalOpen && (
        <div className="ref-modal-overlay" onClick={() => setIsAddLeadModalOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1100 }}>
          <div style={{ background: 'white', borderRadius: '24px', width: '100%', maxWidth: '440px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
            
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)', padding: '24px', color: 'white', position: 'relative', flexShrink: 0 }}>
              <button
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', backdropFilter: 'blur(4px)' }}
                onClick={() => setIsAddLeadModalOpen(false)}
              >
                ✕
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                  <UserPlus size={24} color="white" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800' }}>Manual Entry Lead</h3>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', opacity: 0.9 }}>Add lead details to directory</p>
                </div>
              </div>
            </div>

            {/* Form Body */}
            <form onSubmit={handleAddLeadSubmit} style={{ padding: '20px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {formError && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', fontWeight: '600' }}>
                  {formError}
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  Full Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Phone Number <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Alt. Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="9876543211"
                    value={formData.altPhone}
                    onChange={e => setFormData({ ...formData, altPhone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  Profession / Occupation
                </label>
                <input
                  type="text"
                  placeholder="e.g. Software Engineer / Student"
                  value={formData.profession}
                  onChange={e => setFormData({ ...formData, profession: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  Location / Area
                </label>
                <input
                  type="text"
                  placeholder="e.g. Madhapur, Hyderabad"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Hostel Preference
                  </label>
                  <select
                    value={formData.hostel}
                    onChange={e => setFormData({ ...formData, hostel: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', background: 'white', boxSizing: 'border-box' }}
                  >
                    <option value="Boys Hostel">Boys Hostel</option>
                    <option value="Girls Hostel">Girls Hostel</option>
                    <option value="Co-living">Co-living</option>
                    <option value="Executive PG">Executive PG</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Sharing Type
                  </label>
                  <select
                    value={formData.sharing}
                    onChange={e => setFormData({ ...formData, sharing: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', background: 'white', boxSizing: 'border-box' }}
                  >
                    <option value="1 Sharing">1 Sharing</option>
                    <option value="2 Sharing">2 Sharing</option>
                    <option value="3 Sharing">3 Sharing</option>
                    <option value="4 Sharing">4 Sharing</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. ramesh@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                <button
                  type="button"
                  onClick={() => setIsAddLeadModalOpen(false)}
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'white', color: '#64748b', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1.5, padding: '12px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)', color: 'white', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)' }}
                >
                  <Check size={18} />
                  <span>Save Lead</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                  <div style={{ fontSize: '13.5px', opacity: 0.9, marginTop: '2px', fontWeight: '500' }}>
                    {selectedGuest.profession || selectedGuest.course || 'Lead Applicant'}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body with Icons */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Briefcase size={22} color="#ea580c" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Profession / Course</div>
                  <div style={{ fontSize: '16px', color: '#0f172a', fontWeight: '600' }}>{selectedGuest.profession || selectedGuest.course || 'Not Specified'}</div>
                </div>
              </div>

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

