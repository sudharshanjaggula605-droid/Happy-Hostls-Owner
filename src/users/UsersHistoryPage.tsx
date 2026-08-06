import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  Home, 
  Calendar, 
  X, 
  ChevronRight, 
  CheckCircle, 
  AlertTriangle, 
  Bed, 
  LogOut, 
  Eye, 
  Building2, 
  Sparkles, 
  Check, 
  ArrowLeft,
  CheckCircle2,
  Users
} from 'lucide-react';

export interface TenantUser {
  id: string;
  name: string;
  email: string;
  mobile: string;
  roomNumber: string;
  bedNumber: string;
  block: string;
  hostelName: string;
  sharingType: string;
  status: 'Active' | 'Checked Out';
  joinDate: string;
  pendingDues: number;
  earnings: number;
  avatar?: string;
}

export const initialTenantUsers: TenantUser[] = [
  {
    id: 'u1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    mobile: '9876543210',
    roomNumber: '101',
    bedNumber: 'Bed A',
    block: 'Block A',
    hostelName: 'Akshara Ladies Hostel',
    sharingType: '2-Sharing',
    status: 'Active',
    joinDate: '15 Jan 2026',
    pendingDues: 0,
    earnings: 13500
  },
  {
    id: 'u2',
    name: 'Kabir Verma',
    email: 'kabir.verma@example.com',
    mobile: '9123456780',
    roomNumber: '204',
    bedNumber: 'Bed B',
    block: 'Block A',
    hostelName: 'Akshara Ladies Hostel',
    sharingType: '3-Sharing',
    status: 'Active',
    joinDate: '01 Feb 2026',
    pendingDues: 2500,
    earnings: 15000
  },
  {
    id: 'u3',
    name: 'Ishaan Gupta',
    email: 'ishaan.gupta@example.com',
    mobile: '9988776655',
    roomNumber: '112',
    bedNumber: 'Bed A',
    block: 'Block B',
    hostelName: 'Sunrise Residency',
    sharingType: '1-Sharing',
    status: 'Active',
    joinDate: '10 Mar 2026',
    pendingDues: 0,
    earnings: 21000
  },
  {
    id: 'u4',
    name: 'Rohit Rajpoot',
    email: 'rohitrajpoot21119@gmail.com',
    mobile: '6265775558',
    roomNumber: '105',
    bedNumber: 'Bed A',
    block: 'Block C',
    hostelName: 'Akshara Ladies Hostel',
    sharingType: '2-Sharing',
    status: 'Active',
    joinDate: '12 Dec 2025',
    pendingDues: 1200,
    earnings: 8500
  },
  {
    id: 'u5',
    name: 'Ankit Kumar',
    email: 'ankit.kumar@example.com',
    mobile: '9032109876',
    roomNumber: '202',
    bedNumber: 'Bed B',
    block: 'Block B',
    hostelName: 'Sunrise Residency',
    sharingType: '4-Sharing',
    status: 'Active',
    joinDate: '20 Nov 2025',
    pendingDues: 0,
    earnings: 12000
  }
];

// Room Data Schema for Bed Selection
export interface InventoryBed {
  id: string;
  bedNumber: string;
  status: 'Occupied' | 'Vacant';
  occupantName?: string;
}

export interface InventoryRoom {
  roomNumber: string;
  floor: string;
  sharingType: string; // '1-Sharing', '2-Sharing', '3-Sharing', '4-Sharing'
  hostelName: string;
  rentPerMonth: number;
  beds: InventoryBed[];
}

export const initialInventoryRooms: InventoryRoom[] = [
  {
    roomNumber: '101',
    floor: '1st Floor',
    sharingType: '2-Sharing',
    hostelName: 'Akshara Ladies Hostel',
    rentPerMonth: 7500,
    beds: [
      { id: 'b101a', bedNumber: 'Bed A', status: 'Occupied', occupantName: 'Aarav Sharma' },
      { id: 'b101b', bedNumber: 'Bed B', status: 'Vacant' }
    ]
  },
  {
    roomNumber: '102',
    floor: '1st Floor',
    sharingType: '2-Sharing',
    hostelName: 'Akshara Ladies Hostel',
    rentPerMonth: 7500,
    beds: [
      { id: 'b102a', bedNumber: 'Bed A', status: 'Vacant' },
      { id: 'b102b', bedNumber: 'Bed B', status: 'Vacant' }
    ]
  },
  {
    roomNumber: '103',
    floor: '1st Floor',
    sharingType: '3-Sharing',
    hostelName: 'Akshara Ladies Hostel',
    rentPerMonth: 6500,
    beds: [
      { id: 'b103a', bedNumber: 'Bed A', status: 'Vacant' },
      { id: 'b103b', bedNumber: 'Bed B', status: 'Vacant' },
      { id: 'b103c', bedNumber: 'Bed C', status: 'Vacant' }
    ]
  },
  {
    roomNumber: '105',
    floor: '1st Floor',
    sharingType: '2-Sharing',
    hostelName: 'Akshara Ladies Hostel',
    rentPerMonth: 7500,
    beds: [
      { id: 'b105a', bedNumber: 'Bed A', status: 'Occupied', occupantName: 'Rohit Rajpoot' },
      { id: 'b105b', bedNumber: 'Bed B', status: 'Vacant' }
    ]
  },
  {
    roomNumber: '204',
    floor: '2nd Floor',
    sharingType: '3-Sharing',
    hostelName: 'Akshara Ladies Hostel',
    rentPerMonth: 6000,
    beds: [
      { id: 'b204a', bedNumber: 'Bed A', status: 'Vacant' },
      { id: 'b204b', bedNumber: 'Bed B', status: 'Occupied', occupantName: 'Kabir Verma' },
      { id: 'b204c', bedNumber: 'Bed C', status: 'Vacant' }
    ]
  },
  {
    roomNumber: '112',
    floor: '1st Floor',
    sharingType: '1-Sharing',
    hostelName: 'Sunrise Residency',
    rentPerMonth: 12000,
    beds: [
      { id: 'b112a', bedNumber: 'Bed A', status: 'Occupied', occupantName: 'Ishaan Gupta' }
    ]
  },
  {
    roomNumber: '202',
    floor: '2nd Floor',
    sharingType: '4-Sharing',
    hostelName: 'Sunrise Residency',
    rentPerMonth: 5000,
    beds: [
      { id: 'b202a', bedNumber: 'Bed A', status: 'Vacant' },
      { id: 'b202b', bedNumber: 'Bed B', status: 'Occupied', occupantName: 'Ankit Kumar' },
      { id: 'b202c', bedNumber: 'Bed C', status: 'Vacant' },
      { id: 'b202d', bedNumber: 'Bed D', status: 'Vacant' }
    ]
  },
  {
    roomNumber: '301',
    floor: '3rd Floor',
    sharingType: '1-Sharing',
    hostelName: 'Happy Hostels',
    rentPerMonth: 11000,
    beds: [
      { id: 'b301a', bedNumber: 'Bed A', status: 'Vacant' }
    ]
  },
  {
    roomNumber: '302',
    floor: '3rd Floor',
    sharingType: '2-Sharing',
    hostelName: 'Happy Hostels',
    rentPerMonth: 7000,
    beds: [
      { id: 'b302a', bedNumber: 'Bed A', status: 'Vacant' },
      { id: 'b302b', bedNumber: 'Bed B', status: 'Vacant' }
    ]
  }
];

interface UsersHistoryPageProps {
  showToast?: (msg: string) => void;
  onNavigateToAddUser?: () => void;
}

export const UsersHistoryPage: React.FC<UsersHistoryPageProps> = ({ 
  showToast, 
  onNavigateToAddUser 
}) => {
  const [users, setUsers] = useState<TenantUser[]>(initialTenantUsers);
  const [inventoryRooms, setInventoryRooms] = useState<InventoryRoom[]>(initialInventoryRooms);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Hostel Filter
  const [selectedHostel, setSelectedHostel] = useState<string>('Akshara Ladies Hostel');

  // Modals state
  const [isAddWizardOpen, setIsAddWizardOpen] = useState<boolean>(false);
  const [viewingUser, setViewingUser] = useState<TenantUser | null>(null);
  const [checkoutUser, setCheckoutUser] = useState<TenantUser | null>(null);

  // -------------------------------------------------------------
  // ADD USER WIZARD STATE (5 Steps)
  // -------------------------------------------------------------
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [wizHostel, setWizHostel] = useState<string>('Akshara Ladies Hostel');
  const [wizSharing, setWizSharing] = useState<string>('2-Sharing');
  const [wizRoom, setWizRoom] = useState<InventoryRoom | null>(null);
  const [wizBed, setWizBed] = useState<InventoryBed | null>(null);

  // Step 5 Tenant details form
  const [wizName, setWizName] = useState('');
  const [wizMobile, setWizMobile] = useState('');
  const [wizAltMobile, setWizAltMobile] = useState('');
  const [wizAadhaar, setWizAadhaar] = useState('');
  const [wizEmail, setWizEmail] = useState('');
  const [wizJoinDate, setWizJoinDate] = useState('2026-08-05');
  const [wizRent, setWizRent] = useState<number>(7500);

  // Reset Add Wizard
  const openAddWizard = () => {
    setWizardStep(1);
    setWizHostel(selectedHostel || 'Akshara Ladies Hostel');
    setWizSharing('2-Sharing');
    setWizRoom(null);
    setWizBed(null);
    setWizName('');
    setWizMobile('');
    setWizAltMobile('');
    setWizAadhaar('');
    setWizEmail('');
    setWizJoinDate('2026-08-05');
    setWizRent(7500);
    setIsAddWizardOpen(true);
  };

  // Lock scroll when viewing user profile or wizard open
  useEffect(() => {
    const pane = document.querySelector<HTMLElement>('.screen-content');
    if (!pane) return;
    if (viewingUser || checkoutUser || isAddWizardOpen) {
      pane.style.overflow = 'hidden';
    } else {
      pane.style.overflow = '';
    }
    return () => { pane.style.overflow = ''; };
  }, [viewingUser, checkoutUser, isAddWizardOpen]);

  // Counts Calculation
  const totalCount = users.length;
  const activeCount = users.filter(u => u.status === 'Active').length;

  // Filtered Users List (Active tenants only, matching search & hostel)
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      if (user.status !== 'Active') return false;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        user.name.toLowerCase().includes(query) ||
        user.mobile.includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.roomNumber.toLowerCase().includes(query) ||
        user.bedNumber.toLowerCase().includes(query);

      const matchesHostel = !selectedHostel || selectedHostel === 'ALL HOSTELS' || user.hostelName === selectedHostel;

      return matchesSearch && matchesHostel;
    });
  }, [users, searchQuery, selectedHostel]);

  // Handle Checkout Confirmation
  const handleConfirmCheckout = (waiveDues: boolean = false) => {
    if (!checkoutUser) return;

    // 1. Mark User as Checked Out
    setUsers(prev => prev.map(u => {
      if (u.id === checkoutUser.id) {
        return {
          ...u,
          status: 'Checked Out',
          pendingDues: waiveDues ? 0 : u.pendingDues
        };
      }
      return u;
    }));

    // 2. Automatically Vacate Assigned Bed in Room Inventory
    setInventoryRooms(prevRooms => prevRooms.map(room => {
      if (room.roomNumber === checkoutUser.roomNumber && room.hostelName === checkoutUser.hostelName) {
        return {
          ...room,
          beds: room.beds.map(bed => {
            if (bed.bedNumber === checkoutUser.bedNumber || bed.occupantName === checkoutUser.name) {
              return { ...bed, status: 'Vacant', occupantName: undefined };
            }
            return bed;
          })
        };
      }
      return room;
    }));

    const msg = `Checked out ${checkoutUser.name} successfully! Room ${checkoutUser.roomNumber} (${checkoutUser.bedNumber}) is now vacant.`;
    if (showToast) showToast(msg);
    setCheckoutUser(null);
  };

  // Available Rooms matching step 1 Hostel & step 2 Sharing
  const availableWizardRooms = useMemo(() => {
    return inventoryRooms.filter(r => 
      r.hostelName === wizHostel && r.sharingType === wizSharing
    );
  }, [inventoryRooms, wizHostel, wizSharing]);

  // Handle Complete Wizard Submission
  const handleCompleteWizard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wizName.trim() || !wizMobile.trim()) {
      if (showToast) showToast('Please enter full name and mobile number');
      return;
    }
    if (!wizRoom || !wizBed) {
      if (showToast) showToast('Please select room and bed');
      return;
    }

    // New Tenant Record
    const newTenant: TenantUser = {
      id: 'u_' + Date.now(),
      name: wizName.trim(),
      email: wizEmail.trim() || `${wizName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      mobile: wizMobile.trim(),
      roomNumber: wizRoom.roomNumber,
      bedNumber: wizBed.bedNumber,
      block: wizRoom.floor,
      hostelName: wizHostel,
      sharingType: wizSharing,
      status: 'Active',
      joinDate: wizJoinDate,
      pendingDues: 0,
      earnings: wizRent
    };

    // 1. Add tenant to state
    setUsers(prev => [newTenant, ...prev]);

    // 2. Mark Bed as Occupied in Inventory
    setInventoryRooms(prevRooms => prevRooms.map(r => {
      if (r.roomNumber === wizRoom.roomNumber && r.hostelName === wizHostel) {
        return {
          ...r,
          beds: r.beds.map(b => b.id === wizBed.id ? { ...b, status: 'Occupied', occupantName: wizName } : b)
        };
      }
      return r;
    }));

    if (showToast) showToast(`User ${wizName} assigned to Room ${wizRoom.roomNumber} (${wizBed.bedNumber}) successfully!`);
    setIsAddWizardOpen(false);
  };

  return (
    <div className="users-page-clean-container">
      {/* 1. USERS HEADING */}
      <div className="users-heading-header">
        <h1 className="users-page-title">Users</h1>
      </div>

      {/* 2. HOSTEL SELECTOR & "+ ADD USER" BUTTON (BELOW USERS, ABOVE SEARCH) */}
      <div className="users-actions-row">
        <div className="hostel-filter-select-box">
          <Building2 size={15} className="hostel-icon-muted" />
          <select 
            className="hostel-filter-dropdown"
            value={selectedHostel}
            onChange={(e) => setSelectedHostel(e.target.value)}
          >
            <option value="Akshara Ladies Hostel">Akshara Ladies Hostel</option>
            <option value="Sunrise Residency">Sunrise Residency</option>
            <option value="Happy Hostels">Happy Hostels</option>
            <option value="ALL HOSTELS">All Hostels</option>
          </select>
        </div>

        <button 
          type="button" 
          className="single-add-user-btn"
          onClick={openAddWizard}
        >
          <Plus size={16} />
          <span>Add User</span>
        </button>
      </div>

      {/* 3. SEARCH BAR DIRECTLY BELOW HOSTEL & ADD USER ROW */}
      <div className="users-search-container">
        <Search size={18} className="search-icon-muted" />
        <input 
          type="text"
          className="users-clean-search-input"
          placeholder="Search by name or room no..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button type="button" className="clear-search-btn" onClick={() => setSearchQuery('')}>
            <X size={16} />
          </button>
        )}
      </div>

      {/* 3. BIG STAT CARDS (BLUE & YELLOW TINTS) */}
      <div className="users-big-stats-grid">
        {/* TOTAL TENANTS CARD (BLUE TINT) */}
        <div className="ref-stat-card blue-tint-card">
          <div className="ref-stat-label">TOTAL TENANTS</div>
          <div className="ref-stat-val">{totalCount}</div>
          <div className="ref-stat-sub blue-sub">
            <CheckCircle size={13} color="#2563eb" />
            <span>{activeCount} Active occupants</span>
          </div>
        </div>

        {/* AVAILABLE BEDS CARD (YELLOW/AMBER TINT) */}
        <div className="ref-stat-card yellow-tint-card">
          <div className="ref-stat-label">AVAILABLE BEDS</div>
          <div className="ref-stat-val">
            {inventoryRooms
              .filter(r => selectedHostel === 'ALL HOSTELS' || r.hostelName === selectedHostel)
              .reduce((acc, r) => acc + r.beds.filter(b => b.status === 'Vacant').length, 0)}
          </div>
          <div className="ref-stat-sub yellow-sub">
            <AlertTriangle size={13} color="#d97706" />
            <span>Vacant bed slots</span>
          </div>
        </div>
      </div>

      {/* 4. ROSTER LIST HEADER WITH RECORDS COUNT */}
      <div className="roster-list-header">
        <span className="roster-list-title">REGISTERED TENANTS</span>
        <span className="roster-count-badge">{filteredUsers.length} Records</span>
      </div>

      {/* 5. TENANT CARDS (MATCHING REFERENCE DESIGN) */}
      <div className="users-roster-list">
        {filteredUsers.length === 0 ? (
          <div className="no-tenants-empty-card">
            <Users size={32} color="#94a3b8" />
            <div className="empty-title">No Tenants Found</div>
            <div className="empty-desc">There are no active occupants matching your search or hostel filter.</div>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div 
              key={user.id} 
              className="ref-tenant-card"
              onClick={() => setViewingUser(user)}
            >
              <div className="ref-card-content">
                <div className="ref-card-top-row">
                  <div className="ref-name-group">
                    <h3 className="ref-tenant-name">{user.name}</h3>
                    <span className="ref-room-pill">Room {user.roomNumber} ({user.bedNumber})</span>
                  </div>
                  <ChevronRight size={18} className="ref-chevron-icon" />
                </div>

                <div className="ref-card-bottom-row">
                  <div className="ref-tenant-subtext">
                    Joined: {user.joinDate} • {user.hostelName}
                  </div>
                  <button 
                    type="button" 
                    className="ref-checkout-quick-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCheckoutUser(user);
                    }}
                    title="Checkout Tenant"
                  >
                    <LogOut size={13} />
                    <span>Checkout</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ========================================================================= */}
      {/* 5-STEP ADD USER WIZARD MODAL                                              */}
      {/* ========================================================================= */}
      {isAddWizardOpen && (
        <div className="wizard-modal-backdrop" onClick={() => setIsAddWizardOpen(false)}>
          <div className="wizard-modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* WIZARD HEADER */}
            <div className="wizard-header">
              <div className="wizard-header-left">
                {wizardStep > 1 && (
                  <button 
                    type="button" 
                    className="wizard-top-back-btn"
                    onClick={() => setWizardStep(prev => prev - 1)}
                    title="Go Back"
                    aria-label="Back"
                  >
                    <ArrowLeft size={18} />
                  </button>
                )}
                <div className="wizard-title-group">
                  <div className="wizard-badge-pill">
                    <Sparkles size={13} />
                    <span>STEP {wizardStep} OF 5</span>
                  </div>
                  <h2 className="wizard-title">
                    {wizardStep === 1 && 'Select Hostel'}
                    {wizardStep === 2 && 'Select Sharing Type'}
                    {wizardStep === 3 && 'Select Available Room'}
                    {wizardStep === 4 && 'Bed Layout & Selection'}
                    {wizardStep === 5 && 'Tenant Details & Assign'}
                  </h2>
                </div>
              </div>
              <button 
                type="button" 
                className="wizard-close-btn"
                onClick={() => setIsAddWizardOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            {/* PROGRESS BAR */}
            <div className="wizard-progress-track">
              <div 
                className="wizard-progress-fill" 
                style={{ width: `${(wizardStep / 5) * 100}%` }} 
              />
            </div>

            {/* WIZARD BODY CONTENT */}
            <div className="wizard-body">

              {/* STEP 1: SELECT HOSTEL */}
              {wizardStep === 1 && (
                <div className="wizard-step-pane">
                  <p className="step-instruction">Select hostel property (Click to proceed):</p>
                  <div className="hostel-cards-grid">
                    {[
                      { name: 'Akshara Ladies Hostel', desc: 'Main Campus • 12 Vacant Beds', location: 'Madhapur' },
                      { name: 'Sunrise Residency', desc: 'Premium Block • 8 Vacant Beds', location: 'Gachibowli' },
                      { name: 'Happy Hostels', desc: 'Executive Stay • 5 Vacant Beds', location: 'Hitech City' }
                    ].map((h) => (
                      <div 
                        key={h.name}
                        className={`hostel-select-card ${wizHostel === h.name ? 'selected' : ''}`}
                        onClick={() => {
                          setWizHostel(h.name);
                          setWizardStep(2); // Auto advance to Step 2
                        }}
                      >
                        <div className="hostel-select-icon">
                          <Building2 size={22} color={wizHostel === h.name ? '#2563eb' : '#64748b'} />
                        </div>
                        <div className="hostel-select-info">
                          <div className="hostel-select-name">{h.name}</div>
                          <div className="hostel-select-desc">{h.desc}</div>
                        </div>
                        {wizHostel === h.name ? (
                          <CheckCircle2 size={20} color="#2563eb" className="check-icon-right" />
                        ) : (
                          <ChevronRight size={18} color="#94a3b8" className="check-icon-right" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: SELECT SHARING TYPE */}
              {wizardStep === 2 && (
                <div className="wizard-step-pane">
                  <p className="step-instruction">Choose room sharing configuration for {wizHostel}:</p>
                  <div className="sharing-options-grid">
                    {[
                      { type: '1-Sharing', label: 'Single AC', price: '₹12,000 / mo', desc: 'Private room with attached bath' },
                      { type: '2-Sharing', label: 'Double Sharing', price: '₹7,500 / mo', desc: '2 Beds per room' },
                      { type: '3-Sharing', label: 'Triple Shared', price: '₹6,000 / mo', desc: '3 Beds per room' },
                      { type: '4-Sharing', label: 'Four Sharing', price: '₹5,000 / mo', desc: '4 Beds per room' }
                    ].map((s) => {
                      const roomsForSharing = inventoryRooms.filter(r => r.hostelName === wizHostel && r.sharingType === s.type);
                      const availBedsCount = roomsForSharing.reduce((acc, r) => acc + r.beds.filter(b => b.status === 'Vacant').length, 0);

                      return (
                        <div 
                          key={s.type}
                          className={`sharing-card ${wizSharing === s.type ? 'selected' : ''}`}
                          onClick={() => {
                            setWizSharing(s.type);
                            setWizardStep(3); // Auto advance to Step 3
                          }}
                        >
                          <div className="sharing-top">
                            <span className="sharing-type-tag">{s.type}</span>
                            <span className="sharing-price">{s.price}</span>
                          </div>
                          <div className="sharing-label">{s.label}</div>
                          <div className="sharing-desc">{s.desc}</div>
                          <div className={`sharing-avail-rooms-tag ${availBedsCount === 0 ? 'zero-beds' : ''}`}>
                            <Bed size={12} className="inline-room-icon" />
                            <span>{availBedsCount} {availBedsCount === 1 ? 'Bed' : 'Beds'} Available</span>
                          </div>
                          {wizSharing === s.type && (
                            <div className="selected-check-badge">
                              <Check size={14} color="#ffffff" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: SELECT ROOM */}
              {wizardStep === 3 && (
                <div className="wizard-step-pane">
                  <p className="step-instruction">
                    Click an available {wizSharing} room in {wizHostel}:
                  </p>
                  {availableWizardRooms.length === 0 ? (
                    <div className="no-rooms-notice">
                      <AlertTriangle size={24} color="#f59e0b" />
                      <div>No available {wizSharing} rooms in {wizHostel}. Please go back and select another sharing type.</div>
                    </div>
                  ) : (
                    <div className="rooms-list-grid">
                      {availableWizardRooms.map((room) => {
                        const vacantBedsCount = room.beds.filter(b => b.status === 'Vacant').length;
                        return (
                          <div 
                            key={room.roomNumber}
                            className={`room-choice-card ${wizRoom?.roomNumber === room.roomNumber ? 'selected' : ''}`}
                            onClick={() => {
                              setWizRoom(room);
                              const firstVacant = room.beds.find(b => b.status === 'Vacant');
                              setWizBed(firstVacant || null);
                              setWizRent(room.rentPerMonth);
                              setWizardStep(4); // Auto advance to Step 4
                            }}
                          >
                            <div className="room-card-header">
                              <div className="room-number">Room {room.roomNumber}</div>
                              <span className="floor-badge">{room.floor}</span>
                            </div>
                            <div className="room-card-body">
                              <div className="room-rent-val">₹{room.rentPerMonth} / month</div>
                              <div className="vacant-beds-tag">
                                {vacantBedsCount > 0 ? `${vacantBedsCount} Vacant Bed(s)` : 'Fully Occupied'}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4: BED LAYOUT WITH BED ICONS */}
              {wizardStep === 4 && wizRoom && (
                <div className="wizard-step-pane">
                  <div className="bed-layout-header">
                    <p className="step-instruction">
                      Click a vacant bed in <strong>Room {wizRoom.roomNumber}</strong>:
                    </p>
                    <span className="room-sharing-pill">{wizRoom.sharingType}</span>
                  </div>

                  {/* VISUAL BED LAYOUT GRID WITH BED ICONS */}
                  <div className="visual-bed-layout-box">
                    <div className="room-door-indicator">🚪 Entrance Door</div>
                    <div className="beds-icons-grid">
                      {wizRoom.beds.map((bed) => {
                        const isOccupied = bed.status === 'Occupied';
                        const isSelected = wizBed?.id === bed.id;

                        return (
                          <div 
                            key={bed.id}
                            className={`bed-icon-card ${isOccupied ? 'occupied' : 'vacant'} ${isSelected ? 'selected' : ''}`}
                            onClick={() => {
                              if (!isOccupied) {
                                setWizBed(bed);
                                setWizardStep(5); // Auto advance to Step 5
                              }
                            }}
                          >
                            <div className="bed-visual-icon">
                              <Bed size={32} color={isOccupied ? '#dc2626' : (isSelected ? '#2563eb' : '#16a34a')} />
                            </div>
                            <div className="bed-name">{bed.bedNumber}</div>
                            <div className={`bed-status-badge ${isOccupied ? 'occupied' : 'vacant'}`}>
                              {isOccupied ? `Occupied (${bed.occupantName || 'Occupant'})` : 'Vacant (Click to select)'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: ENTER DETAILS & ASSIGN */}
              {wizardStep === 5 && wizRoom && wizBed && (
                <form onSubmit={handleCompleteWizard} className="wizard-form-step">
                  <div className="selected-assignment-summary">
                    <div className="summary-title">Allocation Summary</div>
                    <div className="summary-pills">
                      <span className="sum-pill">{wizHostel}</span>
                      <span className="sum-pill">Room {wizRoom.roomNumber} ({wizBed.bedNumber})</span>
                      <span className="sum-pill">{wizSharing}</span>
                      <span className="sum-pill price-pill">₹{wizRent}/mo</span>
                    </div>
                  </div>

                  <div className="wizard-fields-grid">
                    <div className="form-group-field">
                      <label className="form-field-label">Full Name *</label>
                      <input 
                        type="text" 
                        required
                        className="modal-text-input"
                        placeholder="e.g. Aarav Sharma"
                        value={wizName}
                        onChange={(e) => setWizName(e.target.value)}
                      />
                    </div>

                    <div className="form-group-field">
                      <label className="form-field-label">Mobile Number *</label>
                      <input 
                        type="text" 
                        required
                        className="modal-text-input"
                        placeholder="e.g. 9876543210"
                        value={wizMobile}
                        onChange={(e) => setWizMobile(e.target.value)}
                      />
                    </div>

                    <div className="form-group-field">
                      <label className="form-field-label">Alternative Mobile Number</label>
                      <input 
                        type="text" 
                        className="modal-text-input"
                        placeholder="e.g. 9876543211"
                        value={wizAltMobile}
                        onChange={(e) => setWizAltMobile(e.target.value)}
                      />
                    </div>

                    <div className="form-group-field">
                      <label className="form-field-label">Aadhar No. *</label>
                      <input 
                        type="text" 
                        required
                        className="modal-text-input"
                        placeholder="e.g. 1234 5678 9012"
                        value={wizAadhaar}
                        onChange={(e) => setWizAadhaar(e.target.value)}
                      />
                    </div>

                    <div className="form-group-field">
                      <label className="form-field-label">Email Address</label>
                      <input 
                        type="email"
                        className="modal-text-input"
                        placeholder="e.g. aarav@example.com"
                        value={wizEmail}
                        onChange={(e) => setWizEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-two-cols">
                      <div className="form-group-field">
                        <label className="form-field-label">Joining Date</label>
                        <input 
                          type="date"
                          className="modal-text-input"
                          value={wizJoinDate}
                          onChange={(e) => setWizJoinDate(e.target.value)}
                        />
                      </div>

                      <div className="form-group-field">
                        <label className="form-field-label">Monthly Rent (₹)</label>
                        <input 
                          type="number"
                          className="modal-text-input"
                          value={wizRent}
                          onChange={(e) => setWizRent(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="wizard-submit-assign-btn">
                    <CheckCircle size={18} />
                    <span>Assign &amp; Save User</span>
                  </button>
                </form>
              )}

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CHECKOUT CONFIRMATION MODAL                                               */}
      {/* ========================================================================= */}
      {checkoutUser && (
        <div className="modal-overlay-backdrop" onClick={() => setCheckoutUser(null)}>
          <div className="checkout-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="checkout-modal-header">
              <div className="checkout-modal-title-wrap">
                <LogOut size={20} color="#dc2626" />
                <h3 className="checkout-modal-title">Tenant Checkout</h3>
              </div>
              <button 
                type="button" 
                className="close-modal-btn"
                onClick={() => setCheckoutUser(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="checkout-tenant-banner">
              <div className="checkout-tenant-name">{checkoutUser.name}</div>
              <div className="checkout-tenant-room">
                Room {checkoutUser.roomNumber} ({checkoutUser.bedNumber}) • {checkoutUser.hostelName}
              </div>
            </div>

            {/* DUES / EARNINGS STATUS CHECK */}
            {checkoutUser.pendingDues > 0 ? (
              <div className="checkout-dues-alert warning-box">
                <div className="alert-top">
                  <AlertTriangle size={20} color="#dc2626" />
                  <span className="alert-title">Pending Rent Dues Identified</span>
                </div>
                <div className="dues-amount-row">
                  <span>Pending Dues Amount:</span>
                  <strong className="dues-value">₹{checkoutUser.pendingDues}</strong>
                </div>
                <p className="dues-note">
                  Please clear or waive the pending dues before vacating the bed.
                </p>
                <div className="checkout-dues-actions">
                  <button 
                    type="button" 
                    className="dues-action-btn pay-btn"
                    onClick={() => handleConfirmCheckout(true)}
                  >
                    Settle Dues &amp; Vacant Bed
                  </button>
                  <button 
                    type="button" 
                    className="dues-action-btn waive-btn"
                    onClick={() => handleConfirmCheckout(true)}
                  >
                    Waive &amp; Vacant Bed
                  </button>
                </div>
              </div>
            ) : (
              <div className="checkout-dues-alert success-box">
                <div className="alert-top">
                  <CheckCircle size={20} color="#16a34a" />
                  <span className="alert-title">No Pending Dues • Clear Bill</span>
                </div>
                <div className="dues-amount-row">
                  <span>Total Earnings Collected:</span>
                  <strong className="earnings-value">₹{checkoutUser.earnings}</strong>
                </div>
                <p className="dues-note">
                  Tenant has cleared all dues. Confirming checkout will automatically mark <strong>Room {checkoutUser.roomNumber} ({checkoutUser.bedNumber})</strong> as vacant.
                </p>
                <button 
                  type="button" 
                  className="confirm-checkout-btn"
                  onClick={() => handleConfirmCheckout(false)}
                >
                  <CheckCircle size={16} />
                  <span>Confirm Checkout &amp; Vacant Bed</span>
                </button>
              </div>
            )}

            <button 
              type="button" 
              className="checkout-cancel-full-btn"
              onClick={() => setCheckoutUser(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW USER DETAILS MODAL                                                   */}
      {/* ========================================================================= */}
      {viewingUser && (
        <div className="user-detail-modal-overlay" onClick={() => setViewingUser(null)}>
          <div className="user-detail-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="user-detail-close-btn"
              onClick={() => setViewingUser(null)}
            >
              <X size={18} />
            </button>

            <div className="user-detail-hero">
              <div className="user-detail-avatar">
                {viewingUser.name.split(' ').map(n => n[0]).join('').slice(0,2)}
              </div>
              <div className="user-detail-hero-name">{viewingUser.name}</div>
              <div className="user-detail-hero-hostel">{viewingUser.hostelName}</div>
              <span className="user-detail-status-badge active">
                ● {viewingUser.status}
              </span>
            </div>

            <div className="user-detail-info-list">
              <div className="user-detail-info-row">
                <div className="user-detail-info-icon-wrap blue-icon">
                  <Phone size={16} />
                </div>
                <div className="user-detail-info-content">
                  <div className="user-detail-info-label">Mobile Number</div>
                  <div className="user-detail-info-value">{viewingUser.mobile}</div>
                </div>
              </div>

              <div className="user-detail-info-row">
                <div className="user-detail-info-icon-wrap purple-icon">
                  <Mail size={16} />
                </div>
                <div className="user-detail-info-content">
                  <div className="user-detail-info-label">Email Address</div>
                  <div className="user-detail-info-value">{viewingUser.email}</div>
                </div>
              </div>

              <div className="user-detail-info-row">
                <div className="user-detail-info-icon-wrap green-icon">
                  <Home size={16} />
                </div>
                <div className="user-detail-info-content">
                  <div className="user-detail-info-label">Room &amp; Bed</div>
                  <div className="user-detail-info-value">Room {viewingUser.roomNumber} ({viewingUser.bedNumber}) • {viewingUser.sharingType}</div>
                </div>
              </div>

              <div className="user-detail-info-row">
                <div className="user-detail-info-icon-wrap amber-icon">
                  <Calendar size={16} />
                </div>
                <div className="user-detail-info-content">
                  <div className="user-detail-info-label">Joining Date</div>
                  <div className="user-detail-info-value">{viewingUser.joinDate}</div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="user-detail-close-full-btn"
              onClick={() => setViewingUser(null)}
            >
              Close Details
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default UsersHistoryPage;
