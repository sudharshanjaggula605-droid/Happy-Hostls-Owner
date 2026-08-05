import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Phone, 
  CheckCircle, 
  XCircle, 
  User, 
  Building,
  LogOut,
  AlertTriangle,
  Bed,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Check,
  X,
  Building2,
  Search,
  BookOpen
} from 'lucide-react';

export interface BookingRequestItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  course: string;
  sharingPreferred: string; // e.g. '2-Sharing' or 'Double Attached'
  floorPreferred: string;   // e.g. '1st Floor'
  requestedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  notes?: string;
}

export interface CheckoutRequestItem {
  id: string;
  tenantId: string;
  name: string;
  phone: string;
  roomNumber: string;
  bedNumber: string;
  hostelName: string;
  sharingType: string;
  requestedDate: string;
  reason: string;
  pendingDues: number;
  earnings: number;
  status: 'Pending' | 'Approved' | 'Rejected';
}

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

// Initial Mock Inventory Rooms
const initialInventoryRooms: InventoryRoom[] = [
  {
    roomNumber: '101',
    floor: '1st Floor',
    sharingType: '2-Sharing',
    hostelName: 'Happy Hostels',
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
    hostelName: 'Happy Hostels',
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
    hostelName: 'Happy Hostels',
    rentPerMonth: 6500,
    beds: [
      { id: 'b103a', bedNumber: 'Bed A', status: 'Vacant' },
      { id: 'b103b', bedNumber: 'Bed B', status: 'Vacant' },
      { id: 'b103c', bedNumber: 'Bed C', status: 'Vacant' }
    ]
  },
  {
    roomNumber: '201',
    floor: '2nd Floor',
    sharingType: '1-Sharing',
    hostelName: 'Happy Hostels',
    rentPerMonth: 12000,
    beds: [
      { id: 'b201a', bedNumber: 'Bed A', status: 'Vacant' }
    ]
  },
  {
    roomNumber: '202',
    floor: '2nd Floor',
    sharingType: '2-Sharing',
    hostelName: 'Happy Hostels',
    rentPerMonth: 7500,
    beds: [
      { id: 'b202a', bedNumber: 'Bed A', status: 'Vacant' },
      { id: 'b202b', bedNumber: 'Bed B', status: 'Vacant' }
    ]
  },
  {
    roomNumber: '204',
    floor: '2nd Floor',
    sharingType: '3-Sharing',
    hostelName: 'Happy Hostels',
    rentPerMonth: 6000,
    beds: [
      { id: 'b204a', bedNumber: 'Bed A', status: 'Vacant' },
      { id: 'b204b', bedNumber: 'Bed B', status: 'Occupied', occupantName: 'Kabir Verma' },
      { id: 'b204c', bedNumber: 'Bed C', status: 'Vacant' }
    ]
  },
  {
    roomNumber: '301',
    floor: '3rd Floor',
    sharingType: '2-Sharing',
    hostelName: 'Happy Hostels',
    rentPerMonth: 7000,
    beds: [
      { id: 'b301a', bedNumber: 'Bed A', status: 'Vacant' },
      { id: 'b301b', bedNumber: 'Bed B', status: 'Vacant' }
    ]
  }
];

interface BookingRequestsPageProps {
  onBack: () => void;
  showToast?: (msg: string) => void;
}

export const BookingRequestsPage: React.FC<BookingRequestsPageProps> = ({ onBack, showToast }) => {
  // Top Request Category: 'Booking' | 'Checkout'
  const [requestCategory, setRequestCategory] = useState<'Booking' | 'Checkout'>('Booking');

  // Booking Requests State
  const [bookingRequests, setBookingRequests] = useState<BookingRequestItem[]>([
    { id: 'br-1', name: 'Rohan Sharma', phone: '+91 98765 12345', email: 'rohan.s@gmail.com', course: 'B.Tech CSE 2nd Year', sharingPreferred: '2-Sharing', requestedDate: '2026-08-05', floorPreferred: '1st Floor', status: 'Pending' },
    { id: 'br-2', name: 'Kavya Nair', phone: '+91 98765 23456', email: 'kavya.n@gmail.com', course: 'MBA 1st Year', sharingPreferred: '1-Sharing', requestedDate: '2026-08-07', floorPreferred: '2nd Floor', status: 'Pending' },
    { id: 'br-3', name: 'Manish Verma', phone: '+91 98765 34567', email: 'manish.v@gmail.com', course: 'B.Com Honors', sharingPreferred: '3-Sharing', requestedDate: '2026-08-10', floorPreferred: '1st Floor', status: 'Pending' },
    { id: 'br-4', name: 'Sneha Patel', phone: '+91 98765 45678', email: 'sneha.p@gmail.com', course: 'MBBS 3rd Year', sharingPreferred: '2-Sharing', requestedDate: '2026-08-02', floorPreferred: '3rd Floor', status: 'Approved' },
    { id: 'br-5', name: 'Aditya Roy', phone: '+91 98765 56789', email: 'aditya.r@gmail.com', course: 'BCA 1st Year', sharingPreferred: '3-Sharing', requestedDate: '2026-08-01', floorPreferred: '2nd Floor', status: 'Rejected' },
  ]);

  // Checkout Requests State
  const [checkoutRequests, setCheckoutRequests] = useState<CheckoutRequestItem[]>([
    { id: 'cr-1', tenantId: 'u1', name: 'Aarav Sharma', phone: '+91 98765 43210', roomNumber: '101', bedNumber: 'Bed A', hostelName: 'Happy Hostels', sharingType: '2-Sharing', requestedDate: '2026-08-06', reason: 'Course Completed & Relocating', pendingDues: 0, earnings: 14500, status: 'Pending' },
    { id: 'cr-2', tenantId: 'u2', name: 'Kabir Verma', phone: '+91 91234 56780', roomNumber: '204', bedNumber: 'Bed B', hostelName: 'Happy Hostels', sharingType: '3-Sharing', requestedDate: '2026-08-08', reason: 'Job Location Change', pendingDues: 2500, earnings: 12000, status: 'Pending' },
    { id: 'cr-3', tenantId: 'u4', name: 'Rohit Rajpoot', phone: '+91 62657 75558', roomNumber: '105', bedNumber: 'Bed A', hostelName: 'Happy Hostels', sharingType: '2-Sharing', requestedDate: '2026-08-04', reason: 'Moving to rented flat', pendingDues: 1200, earnings: 8500, status: 'Pending' },
    { id: 'cr-4', tenantId: 'u5', name: 'Ankit Kumar', phone: '+91 90321 09876', roomNumber: '202', bedNumber: 'Bed B', hostelName: 'Happy Hostels', sharingType: '4-Sharing', requestedDate: '2026-08-01', reason: 'Completed internship', pendingDues: 0, earnings: 15000, status: 'Approved' },
  ]);

  // Room Inventory State
  const [inventoryRooms, setInventoryRooms] = useState<InventoryRoom[]>(initialInventoryRooms);

  // Status Filter ('Pending' | 'All' | 'Approved' | 'Rejected')
  const [activeFilter, setActiveFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('Pending');

  // Search Query State
  const [searchQuery, setSearchQuery] = useState('');

  // -------------------------------------------------------------
  // BOOKING APPROVAL WIZARD STATE (5 Steps)
  // -------------------------------------------------------------
  const [activeBookingReq, setActiveBookingReq] = useState<BookingRequestItem | null>(null);
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [wizHostel, setWizHostel] = useState<string>('Happy Hostels');
  const [wizSharing, setWizSharing] = useState<string>('2-Sharing');
  const [wizFloor, setWizFloor] = useState<string>('1st Floor');
  const [wizRoom, setWizRoom] = useState<InventoryRoom | null>(null);
  const [wizBed, setWizBed] = useState<InventoryBed | null>(null);

  // Form Details State for Step 5
  const [wizName, setWizName] = useState('');
  const [wizPhone, setWizPhone] = useState('');
  const [wizEmail, setWizEmail] = useState('');
  const [wizJoinDate, setWizJoinDate] = useState('2026-08-05');
  const [wizRent, setWizRent] = useState<number>(7500);

  // -------------------------------------------------------------
  // CHECKOUT MODAL STATE
  // -------------------------------------------------------------
  const [activeCheckoutReq, setActiveCheckoutReq] = useState<CheckoutRequestItem | null>(null);

  // Start Booking Approval Wizard
  const handleOpenBookingWizard = (req: BookingRequestItem) => {
    setActiveBookingReq(req);
    setWizardStep(1);
    setWizHostel('Happy Hostels');
    setWizSharing(req.sharingPreferred.includes('1') ? '1-Sharing' : req.sharingPreferred.includes('3') ? '3-Sharing' : '2-Sharing');
    setWizFloor(req.floorPreferred || '1st Floor');
    setWizRoom(null);
    setWizBed(null);
    setWizName(req.name);
    setWizPhone(req.phone);
    setWizEmail(req.email || `${req.name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`);
    setWizJoinDate(req.requestedDate || '2026-08-05');
    setWizRent(7500);
  };

  // Reject Booking Request
  const handleRejectBooking = (id: string, name: string) => {
    setBookingRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));
    if (showToast) showToast(`Rejected booking request for ${name}.`);
  };

  // Reject Checkout Request
  const handleRejectCheckout = (id: string, name: string) => {
    setCheckoutRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));
    if (showToast) showToast(`Rejected checkout request for ${name}.`);
  };

  // Complete Booking Approval Wizard
  const handleCompleteBookingApproval = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBookingReq || !wizRoom || !wizBed) {
      if (showToast) showToast('Please select a room and bed before approving');
      return;
    }

    // 1. Mark Booking Request as Approved
    setBookingRequests(prev => prev.map(r => r.id === activeBookingReq.id ? { ...r, status: 'Approved' } : r));

    // 2. Mark Bed as Occupied in Room Inventory
    setInventoryRooms(prevRooms => prevRooms.map(r => {
      if (r.roomNumber === wizRoom.roomNumber && r.hostelName === wizHostel) {
        return {
          ...r,
          beds: r.beds.map(b => b.id === wizBed.id ? { ...b, status: 'Occupied', occupantName: wizName } : b)
        };
      }
      return r;
    }));

    const msg = `Approved booking for ${wizName}! Allocated Room ${wizRoom.roomNumber} (${wizBed.bedNumber}).`;
    if (showToast) showToast(msg);
    setActiveBookingReq(null);
  };

  // Confirm Checkout Action
  const handleConfirmCheckoutAction = (waiveDues: boolean = false) => {
    if (!activeCheckoutReq) return;

    // 1. Mark Checkout Request as Approved
    setCheckoutRequests(prev => prev.map(r => r.id === activeCheckoutReq.id ? { ...r, status: 'Approved' } : r));

    // 2. Automatically Vacate Assigned Bed in Room Inventory
    setInventoryRooms(prevRooms => prevRooms.map(room => {
      if (room.roomNumber === activeCheckoutReq.roomNumber) {
        return {
          ...room,
          beds: room.beds.map(bed => {
            if (bed.bedNumber === activeCheckoutReq.bedNumber || bed.occupantName === activeCheckoutReq.name) {
              return { ...bed, status: 'Vacant', occupantName: undefined };
            }
            return bed;
          })
        };
      }
      return room;
    }));

    const msg = `Approved checkout for ${activeCheckoutReq.name}! Room ${activeCheckoutReq.roomNumber} (${activeCheckoutReq.bedNumber}) is now vacant.`;
    if (showToast) showToast(msg);
    setActiveCheckoutReq(null);
  };

  // Filtered Booking Requests
  const filteredBookingRequests = useMemo(() => {
    return bookingRequests.filter(r => {
      if (activeFilter !== 'All' && r.status !== activeFilter) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return r.name.toLowerCase().includes(q) || r.phone.includes(q) || r.course.toLowerCase().includes(q);
    });
  }, [bookingRequests, activeFilter, searchQuery]);

  // Filtered Checkout Requests
  const filteredCheckoutRequests = useMemo(() => {
    return checkoutRequests.filter(r => {
      if (activeFilter !== 'All' && r.status !== activeFilter) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return r.name.toLowerCase().includes(q) || r.phone.includes(q) || r.roomNumber.toLowerCase().includes(q);
    });
  }, [checkoutRequests, activeFilter, searchQuery]);

  // Counts for Booking Requests
  const bookingPendingCount = bookingRequests.filter(r => r.status === 'Pending').length;
  const bookingApprovedCount = bookingRequests.filter(r => r.status === 'Approved').length;
  const bookingRejectedCount = bookingRequests.filter(r => r.status === 'Rejected').length;

  // Counts for Checkout Requests
  const checkoutPendingCount = checkoutRequests.filter(r => r.status === 'Pending').length;
  const checkoutApprovedCount = checkoutRequests.filter(r => r.status === 'Approved').length;
  const checkoutRejectedCount = checkoutRequests.filter(r => r.status === 'Rejected').length;

  // Available Rooms matching Step 1 Hostel & Step 2 Sharing & Floor
  const availableWizardRooms = useMemo(() => {
    return inventoryRooms.filter(r => 
      r.hostelName === wizHostel && 
      r.sharingType === wizSharing &&
      (wizFloor === 'All Floors' || r.floor === wizFloor)
    );
  }, [inventoryRooms, wizHostel, wizSharing, wizFloor]);

  return (
    <div className="users-page-clean-container">
      {/* 1. TOP TITLE HEADER & CATEGORY SWITCHER (PAYMENTS PAGE DESIGN) */}
      <div className="users-heading-header">
        <div className="users-top-header-row">
          <h1 className="users-page-title">Requests</h1>

          <div className="brp-ref-cat-switcher">
            <button 
              type="button" 
              className={`brp-ref-cat-btn ${requestCategory === 'Booking' ? 'active' : ''}`}
              onClick={() => setRequestCategory('Booking')}
            >
              <BookOpen size={14} />
              <span>Booking ({bookingPendingCount})</span>
            </button>

            <button 
              type="button" 
              className={`brp-ref-cat-btn ${requestCategory === 'Checkout' ? 'active' : ''}`}
              onClick={() => setRequestCategory('Checkout')}
            >
              <LogOut size={14} />
              <span>Checkout ({checkoutPendingCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. SEARCH BAR */}
      <div className="users-search-container">
        <Search size={18} className="search-icon-muted" />
        <input 
          type="text"
          className="users-clean-search-input"
          placeholder={requestCategory === 'Booking' ? "Search by applicant name or phone..." : "Search by tenant or room no..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button type="button" className="clear-search-btn" onClick={() => setSearchQuery('')}>
            <X size={16} />
          </button>
        )}
      </div>

      {/* 3. 2 BIG STAT CARDS (BLUE & YELLOW TINTS - MATCHING REFERENCE IMAGE) */}
      <div className="users-big-stats-grid">
        {/* CARD 1: BLUE TINT CARD */}
        <div className="ref-stat-card blue-tint-card">
          <div className="ref-stat-label">
            {requestCategory === 'Booking' ? 'TOTAL BOOKINGS' : 'TOTAL CHECKOUTS'}
          </div>
          <div className="ref-stat-val">
            {requestCategory === 'Booking' ? bookingRequests.length : checkoutRequests.length}
          </div>
          <div className="ref-stat-sub blue-sub">
            <CheckCircle size={13} color="#2563eb" />
            <span>{requestCategory === 'Booking' ? bookingApprovedCount : checkoutApprovedCount} Approved</span>
          </div>
        </div>

        {/* CARD 2: YELLOW TINT CARD */}
        <div className="ref-stat-card yellow-tint-card">
          <div className="ref-stat-label">PENDING REVIEW</div>
          <div className="ref-stat-val">
            {requestCategory === 'Booking' ? bookingPendingCount : checkoutPendingCount}
          </div>
          <div className="ref-stat-sub yellow-sub">
            <AlertTriangle size={13} color="#d97706" />
            <span>! {requestCategory === 'Booking' ? bookingPendingCount : checkoutPendingCount} pending</span>
          </div>
        </div>
      </div>

      {/* 4. FILTER PILLS ROW (EXACT PAYMENTS PAGE FILTER BAR) */}
      <div className="brp-ref-filter-line">
        <span className="brp-filter-prefix">Filter:</span>
        <div className="brp-ref-filter-pills">
          {(['All', 'Pending', 'Approved', 'Rejected'] as const).map(tab => {
            const pendingNum = requestCategory === 'Booking' ? bookingPendingCount : checkoutPendingCount;
            return (
              <button
                key={tab}
                className={`brp-ref-pill ${activeFilter === tab ? 'active' : ''}`}
                onClick={() => setActiveFilter(tab)}
              >
                {tab === 'All' && 'All'}
                {tab === 'Pending' && (
                  <>
                    Pending <span className="pill-badge-red">{pendingNum}</span>
                  </>
                )}
                {tab === 'Approved' && 'Approved'}
                {tab === 'Rejected' && 'Rejected'}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. ROSTER LIST HEADER */}
      <div className="roster-list-header">
        <span className="roster-list-title">
          {requestCategory === 'Booking' 
            ? (activeFilter === 'Pending' ? 'PENDING BOOKING REQUESTS' : `${activeFilter.toUpperCase()} BOOKING REQUESTS`) 
            : (activeFilter === 'Pending' ? 'PENDING CHECKOUT REQUESTS' : `${activeFilter.toUpperCase()} CHECKOUT REQUESTS`)}
        </span>
        <span className="roster-count-badge">
          {requestCategory === 'Booking' ? filteredBookingRequests.length : filteredCheckoutRequests.length} Records
        </span>
      </div>

      {/* 6. REQUEST CARDS (PAYMENTS / USERS CARD DESIGN) */}
      <div className="users-roster-list">
        {requestCategory === 'Booking' ? (
          filteredBookingRequests.length === 0 ? (
            <div className="no-tenants-empty-card">
              <BookOpen size={32} color="#94a3b8" />
              <div className="empty-title">No Booking Requests</div>
              <div className="empty-desc">There are no booking requests matching your filter.</div>
            </div>
          ) : (
            filteredBookingRequests.map(req => (
              <div key={req.id} className="ref-tenant-card brp-ref-card">
                <div className="ref-card-top-row">
                  <div className="ref-name-group">
                    <h3 className="ref-tenant-name">{req.name}</h3>
                    <span className="ref-room-pill">{req.sharingPreferred} ({req.floorPreferred})</span>
                  </div>
                  <span className={`brp-status-pill ${req.status.toLowerCase()}`}>{req.status}</span>
                </div>

                <div className="brp-ref-card-details">
                  <div className="brp-ref-detail-item">
                    <Phone size={13} color="#64748b" />
                    <span>{req.phone} • {req.course}</span>
                  </div>
                  <div className="brp-ref-detail-item">
                    <Calendar size={13} color="#64748b" />
                    <span>Move-in Date: <strong>{req.requestedDate}</strong></span>
                  </div>
                </div>

                {req.status === 'Pending' && (
                  <div className="brp-ref-card-actions">
                    <button 
                      type="button" 
                      className="brp-ref-btn-approve"
                      onClick={() => handleOpenBookingWizard(req)}
                    >
                      <CheckCircle size={15} />
                      <span>Approve &amp; Allocate Bed</span>
                    </button>
                    <button 
                      type="button" 
                      className="brp-ref-btn-reject"
                      onClick={() => handleRejectBooking(req.id, req.name)}
                    >
                      <XCircle size={15} />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            ))
          )
        ) : (
          filteredCheckoutRequests.length === 0 ? (
            <div className="no-tenants-empty-card">
              <LogOut size={32} color="#94a3b8" />
              <div className="empty-title">No Checkout Requests</div>
              <div className="empty-desc">There are no checkout requests matching your filter.</div>
            </div>
          ) : (
            filteredCheckoutRequests.map(req => (
              <div key={req.id} className="ref-tenant-card brp-ref-card brp-checkout-border">
                <div className="ref-card-top-row">
                  <div className="ref-name-group">
                    <h3 className="ref-tenant-name">{req.name}</h3>
                    <span className="ref-room-pill red-pill">Room {req.roomNumber} ({req.bedNumber})</span>
                  </div>
                  <span className={`brp-status-pill ${req.status.toLowerCase()}`}>{req.status}</span>
                </div>

                <div className="brp-ref-card-details">
                  <div className="brp-ref-detail-item">
                    <Phone size={13} color="#64748b" />
                    <span>{req.phone} • {req.sharingType}</span>
                  </div>
                  <div className="brp-ref-detail-item">
                    <Calendar size={13} color="#64748b" />
                    <span>Checkout Date: <strong>{req.requestedDate}</strong></span>
                  </div>
                  <div className="brp-ref-detail-item">
                    <AlertTriangle size={13} color={req.pendingDues > 0 ? "#dc2626" : "#16a34a"} />
                    <span>Reason: {req.reason}</span>
                  </div>
                  {req.pendingDues > 0 ? (
                    <div className="dues-warning-pill">
                      ⚠️ Pending Dues: ₹{req.pendingDues}
                    </div>
                  ) : (
                    <div className="dues-clear-pill">
                      ✓ Clear Bill (No Dues)
                    </div>
                  )}
                </div>

                {req.status === 'Pending' && (
                  <div className="brp-ref-card-actions">
                    <button 
                      type="button" 
                      className="brp-ref-btn-checkout"
                      onClick={() => setActiveCheckoutReq(req)}
                    >
                      <LogOut size={15} />
                      <span>Process Checkout</span>
                    </button>
                    <button 
                      type="button" 
                      className="brp-ref-btn-reject"
                      onClick={() => handleRejectCheckout(req.id, req.name)}
                    >
                      <XCircle size={15} />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            ))
          )
        )}
      </div>

      {/* ========================================================================= */}
      {/* BOOKING APPROVAL & BED ALLOCATION WIZARD MODAL (5 STEPS)                  */}
      {/* ========================================================================= */}
      {activeBookingReq && (
        <div className="wizard-modal-backdrop" onClick={() => setActiveBookingReq(null)}>
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
                  >
                    <ArrowLeft size={18} />
                  </button>
                )}
                <div className="wizard-title-group">
                  <div className="wizard-badge-pill">
                    <Sparkles size={13} />
                    <span>APPROVE BOOKING • STEP {wizardStep} OF 5</span>
                  </div>
                  <h2 className="wizard-title">
                    {wizardStep === 1 && 'Applicant Preference Review'}
                    {wizardStep === 2 && 'Sharing & Floor Preference'}
                    {wizardStep === 3 && 'Select Available Room'}
                    {wizardStep === 4 && 'Bed Layout & Bed Selection'}
                    {wizardStep === 5 && 'Final Assignment & Approval'}
                  </h2>
                </div>
              </div>
              <button 
                type="button" 
                className="wizard-close-btn"
                onClick={() => setActiveBookingReq(null)}
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

              {/* STEP 1: APPLICANT PREFERENCE REVIEW */}
              {wizardStep === 1 && (
                <div className="wizard-step-pane">
                  <div className="applicant-req-preview-card">
                    <div className="preview-avatar-row">
                      <div className="preview-avatar">
                        <User size={24} color="#2563eb" />
                      </div>
                      <div>
                        <h3 className="preview-name">{activeBookingReq.name}</h3>
                        <p className="preview-sub">{activeBookingReq.course}</p>
                      </div>
                    </div>
                    <div className="preview-details-grid">
                      <div className="p-detail-item">
                        <span className="p-lbl">Phone:</span>
                        <span className="p-val">{activeBookingReq.phone}</span>
                      </div>
                      <div className="p-detail-item">
                        <span className="p-lbl">Preferred Sharing:</span>
                        <span className="p-val highlight-blue">{activeBookingReq.sharingPreferred}</span>
                      </div>
                      <div className="p-detail-item">
                        <span className="p-lbl">Preferred Floor:</span>
                        <span className="p-val highlight-blue">{activeBookingReq.floorPreferred}</span>
                      </div>
                      <div className="p-detail-item">
                        <span className="p-lbl">Requested Move-in:</span>
                        <span className="p-val">{activeBookingReq.requestedDate}</span>
                      </div>
                    </div>
                  </div>

                  <p className="step-instruction mt-14">Select hostel property for room allocation:</p>
                  <div className="hostel-cards-grid">
                    {[
                      { name: 'Happy Hostels', desc: 'Main Property • 8 Vacant Beds', location: 'Hitech City' },
                      { name: 'Akshara Ladies Hostel', desc: 'Main Campus • 12 Vacant Beds', location: 'Madhapur' },
                      { name: 'Sunrise Residency', desc: 'Premium Block • 6 Vacant Beds', location: 'Gachibowli' }
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
                          <Check size={18} color="#94a3b8" className="check-icon-right" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: SHARING TYPE & FLOOR SELECTION */}
              {wizardStep === 2 && (
                <div className="wizard-step-pane">
                  <div className="preference-alert-bar">
                    <Sparkles size={14} color="#7c3aed" />
                    <span>Applicant Preference: <strong>{activeBookingReq.sharingPreferred} ({activeBookingReq.floorPreferred})</strong></span>
                  </div>

                  <p className="step-instruction">Select room sharing configuration &amp; floor for {wizHostel}:</p>
                  
                  {/* FLOOR PICKER ROW */}
                  <div className="floor-picker-row mb-12">
                    <span className="picker-lbl">Floor Filter:</span>
                    {['1st Floor', '2nd Floor', '3rd Floor', 'All Floors'].map(flr => (
                      <button
                        key={flr}
                        type="button"
                        className={`floor-chip ${wizFloor === flr ? 'active' : ''}`}
                        onClick={() => setWizFloor(flr)}
                      >
                        {flr}
                      </button>
                    ))}
                  </div>

                  {/* SHARING OPTIONS GRID */}
                  <div className="sharing-options-grid">
                    {[
                      { type: '1-Sharing', label: 'Single Deluxe AC', price: '₹12,000 / mo', desc: 'Private single occupancy room' },
                      { type: '2-Sharing', label: 'Double Sharing', price: '₹7,500 / mo', desc: '2 Beds per room' },
                      { type: '3-Sharing', label: 'Triple Shared', price: '₹6,000 / mo', desc: '3 Beds per room' },
                      { type: '4-Sharing', label: 'Four Sharing', price: '₹5,000 / mo', desc: '4 Beds per room' }
                    ].map((s) => {
                      const roomsForSharing = inventoryRooms.filter(r => 
                        r.hostelName === wizHostel && 
                        r.sharingType === s.type &&
                        (wizFloor === 'All Floors' || r.floor === wizFloor)
                      );
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

              {/* STEP 3: SELECT AVAILABLE ROOM */}
              {wizardStep === 3 && (
                <div className="wizard-step-pane">
                  <p className="step-instruction">
                    Click an available <strong>{wizSharing}</strong> room in {wizHostel} ({wizFloor}):
                  </p>
                  {availableWizardRooms.length === 0 ? (
                    <div className="no-rooms-notice">
                      <AlertTriangle size={24} color="#f59e0b" />
                      <div>No available {wizSharing} rooms found for {wizFloor}. Please go back and select another sharing or floor preference.</div>
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

              {/* STEP 4: BED LAYOUT & BED SELECTION */}
              {wizardStep === 4 && wizRoom && (
                <div className="wizard-step-pane">
                  <div className="bed-layout-header">
                    <p className="step-instruction">
                      Click a vacant bed to select in <strong>Room {wizRoom.roomNumber}</strong>:
                    </p>
                    <span className="room-sharing-pill">{wizRoom.sharingType} • {wizRoom.floor}</span>
                  </div>

                  {/* VISUAL BED LAYOUT BOX */}
                  <div className="visual-bed-layout-box">
                    <div className="room-door-indicator">🚪 Room Entrance Door</div>
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

              {/* STEP 5: FINAL CONFIRMATION & SAVE */}
              {wizardStep === 5 && wizRoom && wizBed && (
                <form onSubmit={handleCompleteBookingApproval} className="wizard-form-step">
                  <div className="selected-assignment-summary">
                    <div className="summary-title">Booking Allocation Summary</div>
                    <div className="summary-pills">
                      <span className="sum-pill">{wizHostel}</span>
                      <span className="sum-pill highlight-blue">Room {wizRoom.roomNumber} ({wizBed.bedNumber})</span>
                      <span className="sum-pill">{wizSharing}</span>
                      <span className="sum-pill price-pill">₹{wizRent}/mo</span>
                    </div>
                  </div>

                  <div className="wizard-fields-grid">
                    <div className="form-group-field">
                      <label className="form-field-label">Applicant Name *</label>
                      <input 
                        type="text" 
                        required
                        className="modal-text-input"
                        value={wizName}
                        onChange={(e) => setWizName(e.target.value)}
                      />
                    </div>

                    <div className="form-group-field">
                      <label className="form-field-label">Phone Number *</label>
                      <input 
                        type="text" 
                        required
                        className="modal-text-input"
                        value={wizPhone}
                        onChange={(e) => setWizPhone(e.target.value)}
                      />
                    </div>

                    <div className="form-group-field">
                      <label className="form-field-label">Email Address</label>
                      <input 
                        type="email"
                        className="modal-text-input"
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
                    <span>Approve Booking &amp; Allocate Bed</span>
                  </button>
                </form>
              )}

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CHECKOUT REQUEST CONFIRMATION MODAL                                       */}
      {/* ========================================================================= */}
      {activeCheckoutReq && (
        <div className="modal-overlay-backdrop" onClick={() => setActiveCheckoutReq(null)}>
          <div className="checkout-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="checkout-modal-header">
              <div className="checkout-modal-title-wrap">
                <LogOut size={20} color="#dc2626" />
                <h3 className="checkout-modal-title">Tenant Checkout Approval</h3>
              </div>
              <button 
                type="button" 
                className="close-modal-btn"
                onClick={() => setActiveCheckoutReq(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="checkout-tenant-banner">
              <div className="checkout-tenant-name">{activeCheckoutReq.name}</div>
              <div className="checkout-tenant-room">
                Room {activeCheckoutReq.roomNumber} ({activeCheckoutReq.bedNumber}) • {activeCheckoutReq.hostelName}
              </div>
              <div className="checkout-reason-line mt-4">
                Reason: <strong>{activeCheckoutReq.reason}</strong>
              </div>
            </div>

            {/* DUES / EARNINGS STATUS CHECK */}
            {activeCheckoutReq.pendingDues > 0 ? (
              <div className="checkout-dues-alert warning-box">
                <div className="alert-top">
                  <AlertTriangle size={20} color="#dc2626" />
                  <span className="alert-title">Pending Rent Dues Identified</span>
                </div>
                <div className="dues-amount-row">
                  <span>Pending Dues Amount:</span>
                  <strong className="dues-value">₹{activeCheckoutReq.pendingDues}</strong>
                </div>
                <p className="dues-note">
                  Please clear or waive the pending dues before vacating the bed slot.
                </p>
                <div className="checkout-dues-actions">
                  <button 
                    type="button" 
                    className="dues-action-btn pay-btn"
                    onClick={() => handleConfirmCheckoutAction(true)}
                  >
                    Settle Dues &amp; Vacant Bed
                  </button>
                  <button 
                    type="button" 
                    className="dues-action-btn waive-btn"
                    onClick={() => handleConfirmCheckoutAction(true)}
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
                  <span>Total Rent Collected:</span>
                  <strong className="earnings-value">₹{activeCheckoutReq.earnings}</strong>
                </div>
                <p className="dues-note">
                  Tenant has cleared all dues. Approving checkout will automatically mark <strong>Room {activeCheckoutReq.roomNumber} ({activeCheckoutReq.bedNumber})</strong> as vacant in inventory.
                </p>
                <button 
                  type="button" 
                  className="confirm-checkout-btn"
                  onClick={() => handleConfirmCheckoutAction(false)}
                >
                  <CheckCircle size={16} />
                  <span>Confirm Checkout &amp; Vacant Bed</span>
                </button>
              </div>
            )}

            <button 
              type="button" 
              className="checkout-cancel-full-btn"
              onClick={() => setActiveCheckoutReq(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default BookingRequestsPage;
