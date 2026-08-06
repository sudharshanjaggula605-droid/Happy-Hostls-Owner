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
  BookOpen,
  ChevronRight,
  ArrowRightLeft
} from 'lucide-react';

export interface BookingRequestItem {
  id: string;
  name: string;
  phone: string;
  alternatePhone?: string;
  email?: string;
  course?: string;
  purpose?: string;
  aadhaar?: string;
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
  alternatePhone?: string;
  email?: string;
  aadhaar?: string;
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

export interface TransferRequestItem {
  id: string;
  tenantId: string;
  name: string;
  phone: string;
  alternatePhone?: string;
  email?: string;
  aadhaar?: string;
  currentRoom: string;
  currentSharing: string;
  targetRoom: string;
  targetSharing: string;
  reason: string;
  requestedDate: string;
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
  // Top Request Category: 'Booking' | 'Checkout' | 'Transfer'
  const [requestCategory, setRequestCategory] = useState<'Booking' | 'Checkout' | 'Transfer'>('Booking');

  // Booking Requests State
  const [bookingRequests, setBookingRequests] = useState<BookingRequestItem[]>([
    { id: 'br-1', name: 'Rohan Sharma', phone: '+91 98765 12345', alternatePhone: '+91 98765 11111', email: 'rohan.s@gmail.com', course: 'B.Tech CSE 2nd Year', purpose: 'Education (College)', aadhaar: '4532 8901 2345', sharingPreferred: '2-Sharing', requestedDate: '2026-08-05', floorPreferred: '1st Floor', status: 'Pending' },
    { id: 'br-2', name: 'Kavya Nair', phone: '+91 98765 23456', alternatePhone: '+91 98765 22222', email: 'kavya.n@gmail.com', course: 'MBA 1st Year', purpose: 'Higher Studies', aadhaar: '6789 1234 5678', sharingPreferred: '1-Sharing', requestedDate: '2026-08-07', floorPreferred: '2nd Floor', status: 'Pending' },
    { id: 'br-3', name: 'Manish Verma', phone: '+91 98765 34567', alternatePhone: '+91 98765 33333', email: 'manish.v@gmail.com', course: 'B.Com Honors', purpose: 'Education & Internship', aadhaar: '9012 3456 7890', sharingPreferred: '3-Sharing', requestedDate: '2026-08-10', floorPreferred: '1st Floor', status: 'Pending' },
    { id: 'br-4', name: 'Sneha Patel', phone: '+91 98765 45678', alternatePhone: '+91 98765 44444', email: 'sneha.p@gmail.com', course: 'MBBS 3rd Year', purpose: 'Medical Internship', aadhaar: '2345 6789 0123', sharingPreferred: '2-Sharing', requestedDate: '2026-08-02', floorPreferred: '3rd Floor', status: 'Approved' },
    { id: 'br-5', name: 'Aditya Roy', phone: '+91 98765 56789', alternatePhone: '+91 98765 55555', email: 'aditya.r@gmail.com', course: 'BCA 1st Year', purpose: 'Job Training', aadhaar: '5678 9012 3456', sharingPreferred: '3-Sharing', requestedDate: '2026-08-01', floorPreferred: '2nd Floor', status: 'Rejected' },
    { id: 'br-6', name: 'Ananya Reddy', phone: '+91 97654 32109', alternatePhone: '+91 97654 30000', email: 'ananya.r@gmail.com', course: 'B.Tech ECE 3rd Year', purpose: 'College Hostel Admission', aadhaar: '1234 9012 5678', sharingPreferred: '2-Sharing', requestedDate: '2026-08-08', floorPreferred: '2nd Floor', status: 'Pending' },
    { id: 'br-7', name: 'Rajesh Kulkarni', phone: '+91 96543 21098', alternatePhone: '+91 96543 20000', email: 'rajesh.k@gmail.com', course: 'Software Trainee', purpose: 'IT Park Job Placement', aadhaar: '5678 1234 9012', sharingPreferred: '1-Sharing', requestedDate: '2026-08-09', floorPreferred: '1st Floor', status: 'Pending' },
    { id: 'br-8', name: 'Divya Krishnan', phone: '+91 95432 10987', alternatePhone: '+91 95432 10000', email: 'divya.k@gmail.com', course: 'M.Tech BioTech', purpose: 'University Entrance', aadhaar: '9012 5678 1234', sharingPreferred: '3-Sharing', requestedDate: '2026-08-11', floorPreferred: '3rd Floor', status: 'Pending' },
  ]);

  // Checkout Requests State
  const [checkoutRequests, setCheckoutRequests] = useState<CheckoutRequestItem[]>([
    { id: 'cr-1', tenantId: 'u1', name: 'Aarav Sharma', phone: '+91 98765 43210', alternatePhone: '+91 98765 40000', email: 'aarav.s@gmail.com', aadhaar: '8901 2345 6789', roomNumber: '101', bedNumber: 'Bed A', hostelName: 'Happy Hostels', sharingType: '2-Sharing', requestedDate: '2026-08-06', reason: 'Course Completed & Relocating', pendingDues: 0, earnings: 14500, status: 'Pending' },
    { id: 'cr-2', tenantId: 'u2', name: 'Kabir Verma', phone: '+91 91234 56780', alternatePhone: '+91 91234 50000', email: 'kabir.v@gmail.com', aadhaar: '1234 5678 9012', roomNumber: '204', bedNumber: 'Bed B', hostelName: 'Happy Hostels', sharingType: '3-Sharing', requestedDate: '2026-08-08', reason: 'Job Location Change', pendingDues: 2500, earnings: 12000, status: 'Pending' },
    { id: 'cr-3', tenantId: 'u4', name: 'Rohit Rajpoot', phone: '+91 62657 75558', alternatePhone: '+91 62657 70000', email: 'rohit.r@gmail.com', aadhaar: '3456 7890 1234', roomNumber: '105', bedNumber: 'Bed A', hostelName: 'Happy Hostels', sharingType: '2-Sharing', requestedDate: '2026-08-04', reason: 'Moving to rented flat', pendingDues: 1200, earnings: 8500, status: 'Pending' },
    { id: 'cr-4', tenantId: 'u5', name: 'Ankit Kumar', phone: '+91 90321 09876', alternatePhone: '+91 90321 00000', email: 'ankit.k@gmail.com', aadhaar: '5678 9012 3456', roomNumber: '202', bedNumber: 'Bed B', hostelName: 'Happy Hostels', sharingType: '4-Sharing', requestedDate: '2026-08-01', reason: 'Completed internship', pendingDues: 0, earnings: 15000, status: 'Approved' },
    { id: 'cr-5', tenantId: 'u6', name: 'Meera Joshi', phone: '+91 91234 98765', alternatePhone: '+91 91234 90000', email: 'meera.j@gmail.com', aadhaar: '4321 8765 2109', roomNumber: '103', bedNumber: 'Bed B', hostelName: 'Happy Hostels', sharingType: '3-Sharing', requestedDate: '2026-08-09', reason: 'Semester Break & Returning Home', pendingDues: 0, earnings: 11000, status: 'Pending' },
    { id: 'cr-6', tenantId: 'u7', name: 'Siddharth Rao', phone: '+91 92345 87654', alternatePhone: '+91 92345 80000', email: 'siddharth.r@gmail.com', aadhaar: '8765 4321 0987', roomNumber: '201', bedNumber: 'Bed A', hostelName: 'Happy Hostels', sharingType: '1-Sharing', requestedDate: '2026-08-11', reason: 'Flat Transfer with Colleagues', pendingDues: 3000, earnings: 24000, status: 'Pending' },
    { id: 'cr-7', tenantId: 'u8', name: 'Pooja Hegde', phone: '+91 93456 76543', alternatePhone: '+91 93456 70000', email: 'pooja.h@gmail.com', aadhaar: '6543 2109 8765', roomNumber: '301', bedNumber: 'Bed A', hostelName: 'Happy Hostels', sharingType: '2-Sharing', requestedDate: '2026-08-03', reason: 'Project Completion', pendingDues: 0, earnings: 16000, status: 'Rejected' },
  ]);

  // Transfer Requests State
  const [transferRequests, setTransferRequests] = useState<TransferRequestItem[]>([
    { id: 'tr-1', tenantId: 'u10', name: 'Vikram Malhotra', phone: '+91 98123 45678', alternatePhone: '+91 98123 40000', email: 'vikram.m@gmail.com', aadhaar: '7890 1234 5678', currentRoom: 'Room 101 (Bed B)', currentSharing: '2-Sharing (1st Floor)', targetRoom: 'Room 202 (Bed A)', targetSharing: '1-Sharing (2nd Floor)', reason: 'Need private room for competitive exams study', requestedDate: '2026-08-06', status: 'Pending' },
    { id: 'tr-2', tenantId: 'u11', name: 'Priya Sundaram', phone: '+91 98234 56789', alternatePhone: '+91 98234 50000', email: 'priya.s@gmail.com', aadhaar: '9012 3456 7890', currentRoom: 'Room 204 (Bed C)', currentSharing: '3-Sharing (2nd Floor)', targetRoom: 'Room 102 (Bed B)', targetSharing: '2-Sharing (1st Floor)', reason: 'Medical preference for lower floor', requestedDate: '2026-08-05', status: 'Pending' },
    { id: 'tr-3', tenantId: 'u12', name: 'Rahul Deshmukh', phone: '+91 98345 67890', alternatePhone: '+91 98345 60000', email: 'rahul.d@gmail.com', aadhaar: '2345 6789 0123', currentRoom: 'Room 301 (Bed A)', currentSharing: '2-Sharing (3rd Floor)', targetRoom: 'Room 103 (Bed C)', targetSharing: '3-Sharing (1st Floor)', reason: 'Budget optimization request', requestedDate: '2026-08-02', status: 'Approved' },
    { id: 'tr-4', tenantId: 'u13', name: 'Harish Naidu', phone: '+91 94567 65432', alternatePhone: '+91 94567 60000', email: 'harish.n@gmail.com', aadhaar: '2109 8765 4321', currentRoom: 'Room 102 (Bed A)', currentSharing: '2-Sharing (1st Floor)', targetRoom: 'Room 201 (Bed A)', targetSharing: '1-Sharing (2nd Floor)', reason: 'Requested AC single room upgrade', requestedDate: '2026-08-07', status: 'Pending' },
    { id: 'tr-5', tenantId: 'u14', name: 'Nivedita Sen', phone: '+91 95678 54321', alternatePhone: '+91 95678 50000', email: 'nivedita.s@gmail.com', aadhaar: '0987 6543 2109', currentRoom: 'Room 204 (Bed A)', currentSharing: '3-Sharing (2nd Floor)', targetRoom: 'Room 101 (Bed A)', targetSharing: '2-Sharing (1st Floor)', reason: 'Wants ground/1st floor due to leg injury', requestedDate: '2026-08-08', status: 'Pending' },
    { id: 'tr-6', tenantId: 'u15', name: 'Amit Saxena', phone: '+91 96789 43210', alternatePhone: '+91 96789 40000', email: 'amit.s@gmail.com', aadhaar: '5432 1098 7654', currentRoom: 'Room 103 (Bed B)', currentSharing: '3-Sharing (1st Floor)', targetRoom: 'Room 105 (Bed B)', targetSharing: '2-Sharing (1st Floor)', reason: 'Moving to share with college classmate', requestedDate: '2026-08-01', status: 'Rejected' },
  ]);

  // View Modals State
  const [viewBookingReq, setViewBookingReq] = useState<BookingRequestItem | null>(null);
  const [viewCheckoutReq, setViewCheckoutReq] = useState<CheckoutRequestItem | null>(null);
  const [viewTransferReq, setViewTransferReq] = useState<TransferRequestItem | null>(null);

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
      return r.name.toLowerCase().includes(q) || r.phone.includes(q) || (r.course && r.course.toLowerCase().includes(q));
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

  // Filtered Transfer Requests
  const filteredTransferRequests = useMemo(() => {
    return transferRequests.filter(r => {
      if (activeFilter !== 'All' && r.status !== activeFilter) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return r.name.toLowerCase().includes(q) || r.phone.includes(q) || r.currentRoom.toLowerCase().includes(q);
    });
  }, [transferRequests, activeFilter, searchQuery]);

  // Reject Transfer Request
  const handleRejectTransfer = (id: string, name: string) => {
    setTransferRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));
    if (showToast) showToast(`Rejected transfer request for ${name}.`);
  };

  // Approve Transfer Request
  const handleApproveTransfer = (id: string, name: string) => {
    setTransferRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
    if (showToast) showToast(`Approved transfer request for ${name}.`);
  };

  // Counts for Booking Requests
  const bookingPendingCount = bookingRequests.filter(r => r.status === 'Pending').length;
  const bookingApprovedCount = bookingRequests.filter(r => r.status === 'Approved').length;
  const bookingRejectedCount = bookingRequests.filter(r => r.status === 'Rejected').length;

  // Counts for Checkout Requests
  const checkoutPendingCount = checkoutRequests.filter(r => r.status === 'Pending').length;
  const checkoutApprovedCount = checkoutRequests.filter(r => r.status === 'Approved').length;
  const checkoutRejectedCount = checkoutRequests.filter(r => r.status === 'Rejected').length;

  // Counts for Transfer Requests
  const transferPendingCount = transferRequests.filter(r => r.status === 'Pending').length;

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
      {/* 1. TOP TITLE HEADER & CATEGORY SWITCHER UNDER HEADING */}
      <div className="users-heading-header">
        <h1 className="users-page-title">Requests</h1>

        <div className="brp-ref-cat-switcher brp-cat-switcher-full">
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

          <button 
            type="button" 
            className={`brp-ref-cat-btn ${requestCategory === 'Transfer' ? 'active' : ''}`}
            onClick={() => setRequestCategory('Transfer')}
          >
            <ArrowRightLeft size={14} />
            <span>Transfer ({transferPendingCount})</span>
          </button>
        </div>
      </div>

      {/* 2. SEARCH BAR */}
      <div className="users-search-container">
        <Search size={18} className="search-icon-muted" />
        <input 
          type="text"
          className="users-clean-search-input"
          placeholder={requestCategory === 'Booking' ? "Search by applicant name or phone..." : requestCategory === 'Checkout' ? "Search by tenant or room no..." : "Search by tenant name or room..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button type="button" className="clear-search-btn" onClick={() => setSearchQuery('')}>
            <X size={16} />
          </button>
        )}
      </div>

      {/* 4. FILTER PILLS ROW (EXACT PAYMENTS PAGE FILTER BAR) */}
      <div className="brp-ref-filter-line">
        <span className="brp-filter-prefix">Filter:</span>
        <div className="brp-ref-filter-pills">
          {(['All', 'Pending', 'Approved', 'Rejected'] as const).map(tab => {
            const pendingNum = requestCategory === 'Booking' ? bookingPendingCount : requestCategory === 'Checkout' ? checkoutPendingCount : transferPendingCount;
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
            : requestCategory === 'Checkout'
            ? (activeFilter === 'Pending' ? 'PENDING CHECKOUT REQUESTS' : `${activeFilter.toUpperCase()} CHECKOUT REQUESTS`)
            : (activeFilter === 'Pending' ? 'PENDING TRANSFER REQUESTS' : `${activeFilter.toUpperCase()} TRANSFER REQUESTS`)}
        </span>
        <span className="roster-count-badge">
          {requestCategory === 'Booking' 
            ? filteredBookingRequests.length 
            : requestCategory === 'Checkout' 
            ? filteredCheckoutRequests.length 
            : filteredTransferRequests.length} Records
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
              <div 
                key={req.id} 
                className="ref-tenant-card brp-ref-card brp-clean-request-card"
                onClick={() => setViewBookingReq(req)}
              >
                <div className="brp-clean-card-left">
                  <h3 className="ref-tenant-name">{req.name}</h3>
                  <span className="ref-room-pill">{req.sharingPreferred} ({req.floorPreferred})</span>
                </div>

                <button 
                  type="button" 
                  className="brp-view-details-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewBookingReq(req);
                  }}
                >
                  <span>View</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            ))
          )
        ) : requestCategory === 'Checkout' ? (
          filteredCheckoutRequests.length === 0 ? (
            <div className="no-tenants-empty-card">
              <LogOut size={32} color="#94a3b8" />
              <div className="empty-title">No Checkout Requests</div>
              <div className="empty-desc">There are no checkout requests matching your filter.</div>
            </div>
          ) : (
            filteredCheckoutRequests.map(req => (
              <div 
                key={req.id} 
                className="ref-tenant-card brp-ref-card brp-clean-request-card"
                onClick={() => setViewCheckoutReq(req)}
              >
                <div className="brp-clean-card-left">
                  <h3 className="ref-tenant-name">{req.name}</h3>
                  <span className="ref-room-pill red-pill">Room {req.roomNumber} ({req.bedNumber})</span>
                </div>

                <button 
                  type="button" 
                  className="brp-view-details-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewCheckoutReq(req);
                  }}
                >
                  <span>View</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            ))
          )
        ) : (
          filteredTransferRequests.length === 0 ? (
            <div className="no-tenants-empty-card">
              <ArrowRightLeft size={32} color="#94a3b8" />
              <div className="empty-title">No Transfer Requests</div>
              <div className="empty-desc">There are no transfer requests matching your filter.</div>
            </div>
          ) : (
            filteredTransferRequests.map(req => (
              <div 
                key={req.id} 
                className="ref-tenant-card brp-ref-card brp-clean-request-card"
                onClick={() => setViewTransferReq(req)}
              >
                <div className="brp-clean-card-left">
                  <h3 className="ref-tenant-name">{req.name}</h3>
                  <span className="ref-room-pill blue-pill">{req.currentRoom} → {req.targetRoom}</span>
                </div>

                <button 
                  type="button" 
                  className="brp-view-details-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewTransferReq(req);
                  }}
                >
                  <span>View</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            ))
          )
        )}
      </div>

      {/* ========================================================================= */}
      {/* VIEW BOOKING REQUEST DETAILS POPUP MODAL                                  */}
      {/* ========================================================================= */}
      {viewBookingReq && (
        <div className="wizard-modal-backdrop" onClick={() => setViewBookingReq(null)}>
          <div className="booking-view-modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* MODAL HEADER */}
            <div className="view-modal-header">
              <div className="view-modal-title-wrap">
                <User size={20} className="view-modal-user-icon" />
                <h3 className="view-modal-title">Booking Request Details</h3>
              </div>
              <button 
                type="button" 
                className="wizard-close-btn"
                onClick={() => setViewBookingReq(null)}
              >
                <X size={18} />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="view-modal-body">
              <div className="view-details-grid">
                <div className="view-detail-card">
                  <span className="view-detail-label">Name</span>
                  <span className="view-detail-value font-bold">{viewBookingReq.name}</span>
                </div>

                <div className="view-detail-card">
                  <span className="view-detail-label">Number</span>
                  <span className="view-detail-value">{viewBookingReq.phone}</span>
                </div>

                <div className="view-detail-card">
                  <span className="view-detail-label">Alternative Number</span>
                  <span className="view-detail-value">{viewBookingReq.alternatePhone || '+91 98765 00000'}</span>
                </div>

                <div className="view-detail-card">
                  <span className="view-detail-label">Adhaar</span>
                  <span className="view-detail-value">{viewBookingReq.aadhaar || '1234 5678 9012'}</span>
                </div>

                <div className="view-detail-card">
                  <span className="view-detail-label">Mail</span>
                  <span className="view-detail-value">{viewBookingReq.email || `${viewBookingReq.name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`}</span>
                </div>

                <div className="view-detail-card">
                  <span className="view-detail-label">Purpose</span>
                  <span className="view-detail-value">{viewBookingReq.purpose || viewBookingReq.course || 'Education'}</span>
                </div>

                <div className="view-detail-card">
                  <span className="view-detail-label">Bed Type</span>
                  <span className="view-detail-value highlight-blue">{viewBookingReq.sharingPreferred} ({viewBookingReq.floorPreferred})</span>
                </div>

                <div className="view-detail-card">
                  <span className="view-detail-label">Date of Joining</span>
                  <span className="view-detail-value">{viewBookingReq.requestedDate}</span>
                </div>
              </div>
            </div>

            {/* MODAL ACTIONS FOOTER */}
            <div className="view-modal-footer">
              <button 
                type="button" 
                className="view-btn-reject"
                onClick={() => {
                  const req = viewBookingReq;
                  setViewBookingReq(null);
                  handleRejectBooking(req.id, req.name);
                }}
              >
                <XCircle size={16} />
                <span>Reject</span>
              </button>

              <button 
                type="button" 
                className="view-btn-approve"
                onClick={() => {
                  const req = viewBookingReq;
                  setViewBookingReq(null);
                  handleOpenBookingWizard(req);
                }}
              >
                <CheckCircle size={16} />
                <span>Approve &amp; Allocate Bed</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW CHECKOUT REQUEST DETAILS POPUP MODAL                                 */}
      {/* ========================================================================= */}
      {viewCheckoutReq && (
        <div className="wizard-modal-backdrop" onClick={() => setViewCheckoutReq(null)}>
          <div className="booking-view-modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* MODAL HEADER */}
            <div className="view-modal-header">
              <div className="view-modal-title-wrap">
                <LogOut size={20} className="view-modal-user-icon red-icon" />
                <h3 className="view-modal-title">Checkout Request Details</h3>
              </div>
              <button 
                type="button" 
                className="wizard-close-btn"
                onClick={() => setViewCheckoutReq(null)}
              >
                <X size={18} />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="view-modal-body">
              <div className="view-details-grid">
                <div className="view-detail-card">
                  <span className="view-detail-label">Name</span>
                  <span className="view-detail-value font-bold">{viewCheckoutReq.name}</span>
                </div>

                <div className="view-detail-card">
                  <span className="view-detail-label">Number</span>
                  <span className="view-detail-value">{viewCheckoutReq.phone}</span>
                </div>

                <div className="view-detail-card">
                  <span className="view-detail-label">Alternative Number</span>
                  <span className="view-detail-value">{viewCheckoutReq.alternatePhone || '+91 98765 00000'}</span>
                </div>

                <div className="view-detail-card">
                  <span className="view-detail-label">Adhaar</span>
                  <span className="view-detail-value">{viewCheckoutReq.aadhaar || '1234 5678 9012'}</span>
                </div>

                <div className="view-detail-card">
                  <span className="view-detail-label">Mail</span>
                  <span className="view-detail-value">{viewCheckoutReq.email || `${viewCheckoutReq.name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`}</span>
                </div>

                <div className="view-detail-card">
                  <span className="view-detail-label">Reason</span>
                  <span className="view-detail-value">{viewCheckoutReq.reason}</span>
                </div>

                <div className="view-detail-card">
                  <span className="view-detail-label">Bed Type / Room</span>
                  <span className="view-detail-value highlight-blue">Room {viewCheckoutReq.roomNumber} ({viewCheckoutReq.bedNumber}) • {viewCheckoutReq.sharingType}</span>
                </div>

                <div className="view-detail-card">
                  <span className="view-detail-label">Date of Joining / Move-out</span>
                  <span className="view-detail-value">{viewCheckoutReq.requestedDate}</span>
                </div>

                {viewCheckoutReq.pendingDues > 0 ? (
                  <div className="dues-warning-pill mt-4">
                    ⚠️ Pending Dues: ₹{viewCheckoutReq.pendingDues}
                  </div>
                ) : (
                  <div className="dues-clear-pill mt-4">
                    ✓ Clear Bill (No Dues)
                  </div>
                )}
              </div>
            </div>

            {/* MODAL ACTIONS FOOTER */}
            <div className="view-modal-footer">
              <button 
                type="button" 
                className="view-btn-reject"
                onClick={() => {
                  const req = viewCheckoutReq;
                  setViewCheckoutReq(null);
                  handleRejectCheckout(req.id, req.name);
                }}
              >
                <XCircle size={16} />
                <span>Reject</span>
              </button>

              <button 
                type="button" 
                className="view-btn-approve red-bg"
                onClick={() => {
                  const req = viewCheckoutReq;
                  setViewCheckoutReq(null);
                  setActiveCheckoutReq(req);
                }}
              >
                <LogOut size={16} />
                <span>Process Checkout</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW TRANSFER REQUEST DETAILS POPUP MODAL                                 */}
      {/* ========================================================================= */}
      {viewTransferReq && (
        <div className="wizard-modal-backdrop" onClick={() => setViewTransferReq(null)}>
          <div className="booking-view-modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* MODAL HEADER */}
            <div className="view-modal-header">
              <div className="view-modal-title-wrap">
                <ArrowRightLeft size={20} className="view-modal-user-icon" />
                <h3 className="view-modal-title">Transfer Request Details</h3>
              </div>
              <button 
                type="button" 
                className="wizard-close-btn"
                onClick={() => setViewTransferReq(null)}
              >
                <X size={18} />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="view-modal-body">
              <div className="view-details-grid">
                <div className="view-detail-card">
                  <span className="view-detail-label">Name</span>
                  <span className="view-detail-value font-bold">{viewTransferReq.name}</span>
                </div>

                <div className="view-detail-card">
                  <span className="view-detail-label">Number</span>
                  <span className="view-detail-value">{viewTransferReq.phone}</span>
                </div>

                <div className="view-detail-card">
                  <span className="view-detail-label">Alternative Number</span>
                  <span className="view-detail-value">{viewTransferReq.alternatePhone || '+91 98765 00000'}</span>
                </div>

                <div className="view-detail-card">
                  <span className="view-detail-label">Adhaar</span>
                  <span className="view-detail-value">{viewTransferReq.aadhaar || '1234 5678 9012'}</span>
                </div>

                <div className="view-detail-card">
                  <span className="view-detail-label">Mail</span>
                  <span className="view-detail-value">{viewTransferReq.email || `${viewTransferReq.name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`}</span>
                </div>

                <div className="view-detail-card">
                  <span className="view-detail-label">Current Bed</span>
                  <span className="view-detail-value">{viewTransferReq.currentRoom} • {viewTransferReq.currentSharing}</span>
                </div>

                <div className="view-detail-card">
                  <span className="view-detail-label">Transfer Bed</span>
                  <span className="view-detail-value highlight-blue">{viewTransferReq.targetRoom} • {viewTransferReq.targetSharing}</span>
                </div>

                <div className="view-detail-card">
                  <span className="view-detail-label">Date of Joining / Request</span>
                  <span className="view-detail-value">{viewTransferReq.requestedDate}</span>
                </div>
              </div>
            </div>

            {/* MODAL ACTIONS FOOTER */}
            <div className="view-modal-footer">
              <button 
                type="button" 
                className="view-btn-reject"
                onClick={() => {
                  const req = viewTransferReq;
                  setViewTransferReq(null);
                  handleRejectTransfer(req.id, req.name);
                }}
              >
                <XCircle size={16} />
                <span>Reject</span>
              </button>

              <button 
                type="button" 
                className="view-btn-approve"
                onClick={() => {
                  const req = viewTransferReq;
                  setViewTransferReq(null);
                  handleApproveTransfer(req.id, req.name);
                }}
              >
                <CheckCircle size={16} />
                <span>Approve Transfer</span>
              </button>
            </div>

          </div>
        </div>
      )}

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
