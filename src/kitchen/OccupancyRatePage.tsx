import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, Users, Percent, Search, Bed, Wrench, X, Check, 
  Phone, Calendar, BookOpen, AlertTriangle, UserPlus, Info, 
  CheckCircle2, RefreshCw, ShieldAlert, Plus, Clock, Tag
} from 'lucide-react';

interface OccupancyRatePageProps {
  onBack: () => void;
}

export type BedStatus = 'Assigned' | 'Reserved' | 'Maintenance' | 'Vacant';

export interface ResidentDetail {
  name: string;
  phone: string;
  course: string;
  checkInDate: string;
  emergencyContact?: string;
  idNumber?: string;
  paymentStatus?: 'Paid' | 'Pending' | 'Overdue';
}

export interface ReservedDetail {
  reservedBy: string;
  phone: string;
  advancePaid: number;
  reservedDate: string;
}

export interface MaintenanceDetail {
  issue: string;
  reportedDate: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface BedItem {
  id: string;
  bedNumber: string;
  status: BedStatus;
  pricePerMonth: number;
  resident?: ResidentDetail;
  reservedInfo?: ReservedDetail;
  maintenanceInfo?: MaintenanceDetail;
}

export interface RoomData {
  roomNumber: string;
  floor: '1st Floor' | '2nd Floor' | '3rd Floor';
  sharing: string;
  rent: number;
  beds: BedItem[];
}

export const OccupancyRatePage: React.FC<OccupancyRatePageProps> = ({ onBack }) => {
  // Master state for all rooms and beds
  const [roomsData, setRoomsData] = useState<RoomData[]>([
    {
      roomNumber: '101',
      floor: '1st Floor',
      sharing: 'Double Attached',
      rent: 6500,
      beds: [
        {
          id: '101-A',
          bedNumber: 'Bed 101-A',
          status: 'Assigned',
          pricePerMonth: 6500,
          resident: {
            name: 'Amit Verma',
            phone: '+91 98765 43210',
            course: 'B.Tech CS (3rd Year)',
            checkInDate: '12 Jan 2026',
            emergencyContact: '+91 98765 00000',
            idNumber: 'AADH-4920-1102',
            paymentStatus: 'Paid',
          },
        },
        {
          id: '101-B',
          bedNumber: 'Bed 101-B',
          status: 'Assigned',
          pricePerMonth: 6500,
          resident: {
            name: 'Siddharth Rao',
            phone: '+91 98123 45678',
            course: 'MBA Finance',
            checkInDate: '01 Feb 2026',
            emergencyContact: '+91 98123 11111',
            idNumber: 'AADH-8831-4491',
            paymentStatus: 'Paid',
          },
        },
      ],
    },
    {
      roomNumber: '102',
      floor: '1st Floor',
      sharing: 'Double Attached',
      rent: 6500,
      beds: [
        {
          id: '102-A',
          bedNumber: 'Bed 102-A',
          status: 'Assigned',
          pricePerMonth: 6500,
          resident: {
            name: 'Rahul Sharma',
            phone: '+91 97654 32109',
            course: 'B.Com Honors',
            checkInDate: '20 Feb 2026',
            emergencyContact: '+91 97654 99999',
            idNumber: 'AADH-2201-9988',
            paymentStatus: 'Paid',
          },
        },
        {
          id: '102-B',
          bedNumber: 'Bed 102-B',
          status: 'Reserved',
          pricePerMonth: 6500,
          reservedInfo: {
            reservedBy: 'Vikranth Kumar',
            phone: '+91 94567 89012',
            advancePaid: 2000,
            reservedDate: '01 Aug 2026',
          },
        },
      ],
    },
    {
      roomNumber: '103',
      floor: '1st Floor',
      sharing: 'Triple Non-AC',
      rent: 5500,
      beds: [
        {
          id: '103-A',
          bedNumber: 'Bed 103-A',
          status: 'Assigned',
          pricePerMonth: 5500,
          resident: {
            name: 'Priya Singh',
            phone: '+91 91234 56789',
            course: 'BCA Web Dev',
            checkInDate: '10 Mar 2026',
            paymentStatus: 'Paid',
          },
        },
        {
          id: '103-B',
          bedNumber: 'Bed 103-B',
          status: 'Assigned',
          pricePerMonth: 5500,
          resident: {
            name: 'Neha Gupta',
            phone: '+91 92345 67890',
            course: 'B.Sc Data Science',
            checkInDate: '15 Apr 2026',
            paymentStatus: 'Paid',
          },
        },
        {
          id: '103-C',
          bedNumber: 'Bed 103-C',
          status: 'Maintenance',
          pricePerMonth: 5500,
          maintenanceInfo: {
            issue: 'Air Conditioner & Plumbing Leakage',
            reportedDate: '02 Aug 2026',
            priority: 'High',
          },
        },
      ],
    },
    {
      roomNumber: '104',
      floor: '1st Floor',
      sharing: 'Single Deluxe',
      rent: 9000,
      beds: [
        {
          id: '104-A',
          bedNumber: 'Bed 104-A',
          status: 'Vacant',
          pricePerMonth: 9000,
        },
      ],
    },
    {
      roomNumber: '201',
      floor: '2nd Floor',
      sharing: 'Double Attached',
      rent: 6800,
      beds: [
        {
          id: '201-A',
          bedNumber: 'Bed 201-A',
          status: 'Assigned',
          pricePerMonth: 6800,
          resident: {
            name: 'Vikas Kumar',
            phone: '+91 93456 78901',
            course: 'B.Tech ECE',
            checkInDate: '05 Jan 2026',
            paymentStatus: 'Paid',
          },
        },
        {
          id: '201-B',
          bedNumber: 'Bed 201-B',
          status: 'Assigned',
          pricePerMonth: 6800,
          resident: {
            name: 'Rohan Mehta',
            phone: '+91 94567 12345',
            course: 'M.Tech AI',
            checkInDate: '18 Feb 2026',
            paymentStatus: 'Paid',
          },
        },
      ],
    },
    {
      roomNumber: '202',
      floor: '2nd Floor',
      sharing: 'Triple Attached',
      rent: 5800,
      beds: [
        {
          id: '202-A',
          bedNumber: 'Bed 202-A',
          status: 'Assigned',
          pricePerMonth: 5800,
          resident: {
            name: 'Karan Singh',
            phone: '+91 95678 90123',
            course: 'B.Arch 2nd Year',
            checkInDate: '22 May 2026',
            paymentStatus: 'Paid',
          },
        },
        {
          id: '202-B',
          bedNumber: 'Bed 202-B',
          status: 'Reserved',
          pricePerMonth: 5800,
          reservedInfo: {
            reservedBy: 'Suresh Reddy',
            phone: '+91 99887 76655',
            advancePaid: 3000,
            reservedDate: '03 Aug 2026',
          },
        },
        {
          id: '202-C',
          bedNumber: 'Bed 202-C',
          status: 'Vacant',
          pricePerMonth: 5800,
        },
      ],
    },
    {
      roomNumber: '203',
      floor: '2nd Floor',
      sharing: 'Single AC',
      rent: 9500,
      beds: [
        {
          id: '203-A',
          bedNumber: 'Bed 203-A',
          status: 'Maintenance',
          pricePerMonth: 9500,
          maintenanceInfo: {
            issue: 'Ceiling Fan & Electrical Wiring Check',
            reportedDate: '04 Aug 2026',
            priority: 'Medium',
          },
        },
      ],
    },
    {
      roomNumber: '301',
      floor: '3rd Floor',
      sharing: 'Double Non-AC',
      rent: 6000,
      beds: [
        {
          id: '301-A',
          bedNumber: 'Bed 301-A',
          status: 'Vacant',
          pricePerMonth: 6000,
        },
        {
          id: '301-B',
          bedNumber: 'Bed 301-B',
          status: 'Vacant',
          pricePerMonth: 6000,
        },
      ],
    },
    {
      roomNumber: '302',
      floor: '3rd Floor',
      sharing: 'Double Non-AC',
      rent: 6000,
      beds: [
        {
          id: '302-A',
          bedNumber: 'Bed 302-A',
          status: 'Reserved',
          pricePerMonth: 6000,
          reservedInfo: {
            reservedBy: 'Ankit Verma',
            phone: '+91 91122 33445',
            advancePaid: 1500,
            reservedDate: '02 Aug 2026',
          },
        },
        {
          id: '302-B',
          bedNumber: 'Bed 302-B',
          status: 'Vacant',
          pricePerMonth: 6000,
        },
      ],
    },
  ]);

  // Filtering states
  const [selectedFloor, setSelectedFloor] = useState<'All' | '1st Floor' | '2nd Floor' | '3rd Floor'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Full' | 'Partial' | 'Vacant' | 'Reserved' | 'Maintenance'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Modals state
  const [activeRoom, setActiveRoom] = useState<RoomData | null>(null);
  const [selectedBed, setSelectedBed] = useState<{ roomNumber: string; bed: BedItem } | null>(null);
  const [activeSubModal, setActiveSubModal] = useState<'ResidentDetails' | 'Unreserve' | 'RemoveMaintenance' | 'AddResident' | 'ReserveBed' | 'ReportMaintenance' | null>(null);

  // Refs for Auto-scroll
  const roomModalRef = useRef<HTMLDivElement>(null);
  const subModalRef = useRef<HTMLDivElement>(null);

  // Helper function to auto-scroll all modal and screen containers to top/center
  const scrollToTopAndCenter = (modalRef: React.RefObject<HTMLDivElement | null>) => {
    setTimeout(() => {
      // 1. Scroll inner modal container to top
      if (modalRef.current) {
        modalRef.current.scrollTop = 0;
        try {
          modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        } catch {
          // fallback
        }
      }

      // 2. Scroll overlay backdrop container to top
      const overlay = modalRef.current?.closest('.orp-modal-overlay');
      if (overlay) {
        overlay.scrollTop = 0;
      }

      // 3. Scroll outer page container to top
      const pageContainer = document.querySelector('.orp-page-container');
      if (pageContainer) {
        pageContainer.scrollTop = 0;
      }

      // 4. Scroll app-screen container to top
      const appScreen = document.querySelector('.app-screen');
      if (appScreen) {
        appScreen.scrollTop = 0;
      }
    }, 40);
  };

  // Auto-scroll when Room Modal opens
  useEffect(() => {
    if (activeRoom) {
      scrollToTopAndCenter(roomModalRef);
    }
  }, [activeRoom]);

  // Auto-scroll when Sub Modal / Action Pop-up opens
  useEffect(() => {
    if (activeSubModal) {
      scrollToTopAndCenter(subModalRef);
    }
  }, [activeSubModal]);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Add Resident Form State
  const [newResidentForm, setNewResidentForm] = useState({
    name: '',
    phone: '',
    course: '',
    checkInDate: new Date().toISOString().split('T')[0],
  });

  // Reserve Bed Form State
  const [reserveForm, setReserveForm] = useState({
    reservedBy: '',
    phone: '',
    advancePaid: '2000',
  });

  // Maintenance Form State
  const [maintenanceForm, setMaintenanceForm] = useState({
    issue: '',
    priority: 'Medium' as 'Low' | 'Medium' | 'High',
  });

  // Calculate dynamic stats across all beds
  const allBeds = roomsData.flatMap(r => r.beds);
  const totalCapacity = allBeds.length;
  const occupiedBedsCount = allBeds.filter(b => b.status === 'Assigned').length;
  const reservedBedsCount = allBeds.filter(b => b.status === 'Reserved').length;
  const maintenanceBedsCount = allBeds.filter(b => b.status === 'Maintenance').length;
  const vacantBedsCount = allBeds.filter(b => b.status === 'Vacant').length;

  const occupancyPercent = totalCapacity > 0 ? Math.round((occupiedBedsCount / totalCapacity) * 100) : 0;

  // Floor stats generator
  const getFloorStats = (floorName: '1st Floor' | '2nd Floor' | '3rd Floor') => {
    const floorBeds = roomsData.filter(r => r.floor === floorName).flatMap(r => r.beds);
    const floorTotal = floorBeds.length;
    const floorOccupied = floorBeds.filter(b => b.status === 'Assigned').length;
    const floorPct = floorTotal > 0 ? Math.round((floorOccupied / floorTotal) * 100) : 0;
    return { floorTotal, floorOccupied, floorPct };
  };

  // Filtered rooms display
  const filteredRooms = roomsData.filter(room => {
    // Floor Filter
    if (selectedFloor !== 'All' && room.floor !== selectedFloor) return false;

    // Room Status calculation
    const assigned = room.beds.filter(b => b.status === 'Assigned').length;
    const isFull = assigned === room.beds.length;
    const isVacant = assigned === 0;
    const isPartial = !isFull && !isVacant;
    const hasReserved = room.beds.some(b => b.status === 'Reserved');
    const hasMaintenance = room.beds.some(b => b.status === 'Maintenance');

    if (statusFilter === 'Full' && !isFull) return false;
    if (statusFilter === 'Partial' && !isPartial) return false;
    if (statusFilter === 'Vacant' && !isVacant) return false;
    if (statusFilter === 'Reserved' && !hasReserved) return false;
    if (statusFilter === 'Maintenance' && !hasMaintenance) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchRoom = room.roomNumber.toLowerCase().includes(q);
      const matchSharing = room.sharing.toLowerCase().includes(q);
      const matchResident = room.beds.some(
        b => b.resident?.name.toLowerCase().includes(q) || b.reservedInfo?.reservedBy.toLowerCase().includes(q)
      );
      if (!matchRoom && !matchSharing && !matchResident) return false;
    }

    return true;
  });

  // ACTION HANDLERS
  const handleUnreserve = (bedId: string) => {
    setRoomsData(prev => prev.map(r => ({
      ...r,
      beds: r.beds.map(b => b.id === bedId ? { ...b, status: 'Vacant', reservedInfo: undefined } : b)
    })));

    // Update active room copy
    if (activeRoom) {
      setActiveRoom(prev => prev ? {
        ...prev,
        beds: prev.beds.map(b => b.id === bedId ? { ...b, status: 'Vacant', reservedInfo: undefined } : b)
      } : null);
    }

    setActiveSubModal(null);
    setSelectedBed(null);
    showToast('Bed unreserved successfully! It is now vacant.');
  };

  const handleRemoveMaintenance = (bedId: string) => {
    setRoomsData(prev => prev.map(r => ({
      ...r,
      beds: r.beds.map(b => b.id === bedId ? { ...b, status: 'Vacant', maintenanceInfo: undefined } : b)
    })));

    if (activeRoom) {
      setActiveRoom(prev => prev ? {
        ...prev,
        beds: prev.beds.map(b => b.id === bedId ? { ...b, status: 'Vacant', maintenanceInfo: undefined } : b)
      } : null);
    }

    setActiveSubModal(null);
    setSelectedBed(null);
    showToast('Bed removed from maintenance! It is now vacant.');
  };

  const handleAddResidentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBed || !newResidentForm.name.trim() || !newResidentForm.phone.trim()) {
      showToast('Please fill in resident name and phone number.');
      return;
    }

    const bedId = selectedBed.bed.id;
    const newResident: ResidentDetail = {
      name: newResidentForm.name.trim(),
      phone: newResidentForm.phone.trim(),
      course: newResidentForm.course.trim() || 'General Resident',
      checkInDate: newResidentForm.checkInDate || new Date().toISOString().split('T')[0],
      paymentStatus: 'Paid',
    };

    setRoomsData(prev => prev.map(r => ({
      ...r,
      beds: r.beds.map(b => b.id === bedId ? { ...b, status: 'Assigned', resident: newResident } : b)
    })));

    if (activeRoom) {
      setActiveRoom(prev => prev ? {
        ...prev,
        beds: prev.beds.map(b => b.id === bedId ? { ...b, status: 'Assigned', resident: newResident } : b)
      } : null);
    }

    // Reset Form & Modals
    setNewResidentForm({ name: '', phone: '', course: '', checkInDate: new Date().toISOString().split('T')[0] });
    setActiveSubModal(null);
    setSelectedBed(null);
    showToast(`Resident ${newResident.name} assigned to Bed successfully!`);
  };

  const handleReserveBedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBed || !reserveForm.reservedBy.trim() || !reserveForm.phone.trim()) {
      showToast('Please enter reserved for name and phone number.');
      return;
    }

    const bedId = selectedBed.bed.id;
    const resInfo: ReservedDetail = {
      reservedBy: reserveForm.reservedBy.trim(),
      phone: reserveForm.phone.trim(),
      advancePaid: parseFloat(reserveForm.advancePaid) || 0,
      reservedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };

    setRoomsData(prev => prev.map(r => ({
      ...r,
      beds: r.beds.map(b => b.id === bedId ? { ...b, status: 'Reserved', reservedInfo: resInfo } : b)
    })));

    if (activeRoom) {
      setActiveRoom(prev => prev ? {
        ...prev,
        beds: prev.beds.map(b => b.id === bedId ? { ...b, status: 'Reserved', reservedInfo: resInfo } : b)
      } : null);
    }

    setReserveForm({ reservedBy: '', phone: '', advancePaid: '2000' });
    setActiveSubModal(null);
    setSelectedBed(null);
    showToast(`Bed reserved for ${resInfo.reservedBy}!`);
  };

  const handleReportMaintenanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBed || !maintenanceForm.issue.trim()) {
      showToast('Please describe the maintenance issue.');
      return;
    }

    const bedId = selectedBed.bed.id;
    const maintInfo: MaintenanceDetail = {
      issue: maintenanceForm.issue.trim(),
      priority: maintenanceForm.priority,
      reportedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };

    setRoomsData(prev => prev.map(r => ({
      ...r,
      beds: r.beds.map(b => b.id === bedId ? { ...b, status: 'Maintenance', maintenanceInfo: maintInfo } : b)
    })));

    if (activeRoom) {
      setActiveRoom(prev => prev ? {
        ...prev,
        beds: prev.beds.map(b => b.id === bedId ? { ...b, status: 'Maintenance', maintenanceInfo: maintInfo } : b)
      } : null);
    }

    setMaintenanceForm({ issue: '', priority: 'Medium' });
    setActiveSubModal(null);
    setSelectedBed(null);
    showToast('Bed marked under maintenance.');
  };

  // Helper for Status Badge styling
  const getBedStatusBadge = (status: BedStatus) => {
    switch (status) {
      case 'Assigned':
        return <span className="orp-bed-badge green"><CheckCircle2 size={12} /> Assigned</span>;
      case 'Reserved':
        return <span className="orp-bed-badge orange"><Clock size={12} /> Reserved</span>;
      case 'Maintenance':
        return <span className="orp-bed-badge red"><Wrench size={12} /> Maintenance</span>;
      case 'Vacant':
        return <span className="orp-bed-badge blue"><Tag size={12} /> Vacant</span>;
    }
  };

  const f1Stats = getFloorStats('1st Floor');
  const f2Stats = getFloorStats('2nd Floor');
  const f3Stats = getFloorStats('3rd Floor');

  return (
    <div className="orp-page-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="orp-toast">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER BAR */}
      <div className="orp-header-bar">
        <button className="orp-back-btn" onClick={onBack}>
          <ChevronLeft size={22} color="#2563eb" />
          <span className="orp-back-text">Back</span>
        </button>

        <h1 className="orp-header-title">Occupancy Rate Details</h1>
      </div>

      {/* OVERALL HERO STAT CARD */}
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

        {/* Dynamic Progress Bar */}
        <div className="orp-progress-track">
          <div className="orp-progress-fill" style={{ width: `${occupancyPercent}%` }} />
        </div>

        {/* Detailed Stats */}
        <div className="orp-hero-stats">
          <div className="orp-substat">
            <span className="orp-substat-num green">{occupiedBedsCount}</span>
            <span className="orp-substat-lbl">Occupied Beds</span>
          </div>
          <div className="orp-substat">
            <span className="orp-substat-num orange">{reservedBedsCount}</span>
            <span className="orp-substat-lbl">Reserved Beds</span>
          </div>
          <div className="orp-substat">
            <span className="orp-substat-num red">{maintenanceBedsCount}</span>
            <span className="orp-substat-lbl">Maintenance</span>
          </div>
          <div className="orp-substat">
            <span className="orp-substat-num blue">{vacantBedsCount}</span>
            <span className="orp-substat-lbl">Vacant Beds</span>
          </div>
        </div>
      </div>

      {/* FLOOR BREAKDOWN SECTION */}
      <div className="orp-section-header">
        <span className="orp-section-title">FLOOR BREAKDOWN</span>
        {selectedFloor !== 'All' && (
          <button className="orp-reset-floor-btn" onClick={() => setSelectedFloor('All')}>
            Reset Floor Filter ({selectedFloor})
          </button>
        )}
      </div>

      {/* FLOOR SELECTOR CARDS GRID */}
      <div className="orp-floors-grid">
        <div 
          className={`orp-floor-card ${selectedFloor === '1st Floor' ? 'selected' : ''}`}
          onClick={() => setSelectedFloor(selectedFloor === '1st Floor' ? 'All' : '1st Floor')}
        >
          {selectedFloor === '1st Floor' && <div className="orp-floor-check"><Check size={14} /></div>}
          <div className="orp-floor-name">1st Floor</div>
          <div className="orp-floor-pct">{f1Stats.floorPct}% Occupied</div>
          <div className="orp-floor-beds">{f1Stats.floorOccupied} / {f1Stats.floorTotal} Beds</div>
          <div className="orp-floor-tap-hint">
            {selectedFloor === '1st Floor' ? 'Selected • Tap to unselect' : 'Tap to filter rooms'}
          </div>
        </div>

        <div 
          className={`orp-floor-card ${selectedFloor === '2nd Floor' ? 'selected' : ''}`}
          onClick={() => setSelectedFloor(selectedFloor === '2nd Floor' ? 'All' : '2nd Floor')}
        >
          {selectedFloor === '2nd Floor' && <div className="orp-floor-check"><Check size={14} /></div>}
          <div className="orp-floor-name">2nd Floor</div>
          <div className="orp-floor-pct">{f2Stats.floorPct}% Occupied</div>
          <div className="orp-floor-beds">{f2Stats.floorOccupied} / {f2Stats.floorTotal} Beds</div>
          <div className="orp-floor-tap-hint">
            {selectedFloor === '2nd Floor' ? 'Selected • Tap to unselect' : 'Tap to filter rooms'}
          </div>
        </div>

        <div 
          className={`orp-floor-card ${selectedFloor === '3rd Floor' ? 'selected' : ''}`}
          onClick={() => setSelectedFloor(selectedFloor === '3rd Floor' ? 'All' : '3rd Floor')}
        >
          {selectedFloor === '3rd Floor' && <div className="orp-floor-check"><Check size={14} /></div>}
          <div className="orp-floor-name">3rd Floor</div>
          <div className="orp-floor-pct">{f3Stats.floorPct}% Occupied</div>
          <div className="orp-floor-beds">{f3Stats.floorOccupied} / {f3Stats.floorTotal} Beds</div>
          <div className="orp-floor-tap-hint">
            {selectedFloor === '3rd Floor' ? 'Selected • Tap to unselect' : 'Tap to filter rooms'}
          </div>
        </div>
      </div>

      {/* ROOM OCCUPANCY LIST SECTION */}
      <div className="orp-section-header" style={{ marginTop: 22 }}>
        <span className="orp-section-title">
          ROOM OCCUPANCY LIST {selectedFloor !== 'All' ? `(${selectedFloor})` : '(All Floors)'}
        </span>
        <span className="orp-rooms-count-pill">{filteredRooms.length} Rooms</span>
      </div>

      {/* CONTROLS ROW */}
      <div className="orp-controls-row">
        <div className="orp-search-box">
          <Search size={16} color="#94a3b8" />
          <input 
            type="text"
            placeholder="Search room, resident or sharing..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="orp-clear-search" onClick={() => setSearchQuery('')}>
              <X size={14} />
            </button>
          )}
        </div>

        <div className="orp-filter-pills">
          {(['All', 'Full', 'Partial', 'Vacant', 'Reserved', 'Maintenance'] as const).map(f => (
            <button
              key={f}
              className={`orp-pill ${statusFilter === f ? 'active' : ''}`}
              onClick={() => setStatusFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ROOM CARDS LIST */}
      <div className="orp-rooms-list">
        {filteredRooms.length === 0 ? (
          <div className="orp-empty-state">
            <Bed size={36} color="#94a3b8" />
            <div className="orp-empty-title">No rooms match your filter</div>
            <p>Try switching floor view or clearing search filters.</p>
          </div>
        ) : (
          filteredRooms.map(room => {
            const assignedBeds = room.beds.filter(b => b.status === 'Assigned');
            const totalBeds = room.beds.length;
            const assignedCount = assignedBeds.length;
            const isFull = assignedCount === totalBeds;
            const isVacant = assignedCount === 0;

            return (
              <div 
                key={room.roomNumber} 
                className="orp-room-card"
                onClick={() => {
                  setActiveRoom(room);
                  scrollToTopAndCenter(roomModalRef);
                }}
              >
                <div className="orp-room-card-top">
                  <div className="orp-room-left">
                    <div className="orp-room-num">Room {room.roomNumber}</div>
                    <div className="orp-room-sub">{room.floor} • {room.sharing}</div>
                  </div>
                  <div className="orp-room-right">
                    {isFull ? (
                      <span className="orp-status-badge full">Fully Occupied</span>
                    ) : isVacant ? (
                      <span className="orp-status-badge vacant">100% Vacant</span>
                    ) : (
                      <span className="orp-status-badge partial">Partially Filled</span>
                    )}
                  </div>
                </div>

                {/* Bed Layout Quick Icons Bar */}
                <div className="orp-room-beds-preview">
                  <div className="orp-beds-preview-title">Bed Layout (Tap room to manage):</div>
                  <div className="orp-bed-icons-flex">
                    {room.beds.map(bed => (
                      <div key={bed.id} className={`orp-bed-mini-pill ${bed.status.toLowerCase()}`}>
                        <Bed size={13} />
                        <span>{bed.bedNumber.replace('Bed ', '')}</span>
                        {bed.status === 'Assigned' && <span className="orp-mini-name">• {bed.resident?.name.split(' ')[0]}</span>}
                        {bed.status === 'Vacant' && <span className="orp-mini-price">• ₹{bed.pricePerMonth}</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="orp-room-card-footer">
                  <div className="orp-room-residents-summary">
                    <Users size={13} color="#64748b" />
                    <span>
                      {assignedBeds.length > 0
                        ? assignedBeds.map(b => b.resident?.name).join(', ')
                        : 'No active residents'}
                    </span>
                  </div>
                  <div className="orp-room-rent">₹{room.rent.toLocaleString('en-IN')}/mo</div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ========================================================================= */}
      {/* ROOM BED LAYOUT POPUP MODAL */}
      {/* ========================================================================= */}
      {activeRoom && (
        <div className="orp-modal-overlay" onClick={() => setActiveRoom(null)}>
          <div className="orp-modal-container mobile-sheet" ref={roomModalRef} onClick={e => e.stopPropagation()}>
            <div className="orp-modal-handle" />
            
            {/* Modal Header */}
            <div className="orp-modal-header">
              <div>
                <div className="orp-modal-title-row">
                  <h2 className="orp-modal-title">Room {activeRoom.roomNumber}</h2>
                  <span className="orp-modal-floor-tag">{activeRoom.floor}</span>
                </div>
                <div className="orp-modal-subtitle">{activeRoom.sharing} • ₹{activeRoom.rent.toLocaleString('en-IN')}/month</div>
              </div>
              <button className="orp-modal-close-btn" onClick={() => setActiveRoom(null)}>
                <X size={20} />
              </button>
            </div>

            {/* Bed Status Legend Bar */}
            <div className="orp-modal-legend">
              <span className="orp-legend-item green">🟢 Assigned ({activeRoom.beds.filter(b => b.status === 'Assigned').length})</span>
              <span className="orp-legend-item orange">🟧 Reserved ({activeRoom.beds.filter(b => b.status === 'Reserved').length})</span>
              <span className="orp-legend-item red">🔴 Maintenance ({activeRoom.beds.filter(b => b.status === 'Maintenance').length})</span>
              <span className="orp-legend-item blue">🟦 Vacant ({activeRoom.beds.filter(b => b.status === 'Vacant').length})</span>
            </div>

            {/* Interactive Bed Cards Layout */}
            <div className="orp-bed-layout-section">
              <div className="orp-bed-layout-heading">Tap any bed card below to take action:</div>
              
              <div className="orp-beds-grid">
                {activeRoom.beds.map(bed => (
                  <div 
                    key={bed.id}
                    className={`orp-bed-card ${bed.status.toLowerCase()}`}
                    onClick={() => {
                      setSelectedBed({ roomNumber: activeRoom.roomNumber, bed });
                      if (bed.status === 'Assigned') setActiveSubModal('ResidentDetails');
                      else if (bed.status === 'Reserved') setActiveSubModal('Unreserve');
                      else if (bed.status === 'Maintenance') setActiveSubModal('RemoveMaintenance');
                      else if (bed.status === 'Vacant') setActiveSubModal('AddResident');
                      scrollToTopAndCenter(subModalRef);
                    }}
                  >
                    <div className="orp-bed-card-top">
                      <div className="orp-bed-icon-wrapper">
                        {bed.status === 'Maintenance' ? <Wrench size={22} /> : <Bed size={24} />}
                      </div>
                      {getBedStatusBadge(bed.status)}
                    </div>

                    <div className="orp-bed-number-title">{bed.bedNumber}</div>

                    {/* BED CONTENT PER STATUS */}
                    {bed.status === 'Assigned' && (
                      <div className="orp-bed-assigned-content">
                        <div className="orp-resident-name-text">{bed.resident?.name}</div>
                        <div className="orp-resident-sub-text">{bed.resident?.phone}</div>
                        <div className="orp-bed-action-link green">
                          <span>View Details</span> &rarr;
                        </div>
                      </div>
                    )}

                    {bed.status === 'Reserved' && (
                      <div className="orp-bed-reserved-content">
                        <div className="orp-reserved-name">For: {bed.reservedInfo?.reservedBy}</div>
                        <div className="orp-reserved-advance">Adv: ₹{bed.reservedInfo?.advancePaid}</div>
                        <div className="orp-bed-action-link orange">
                          <span>Tap to Unreserve</span> &rarr;
                        </div>
                      </div>
                    )}

                    {bed.status === 'Maintenance' && (
                      <div className="orp-bed-maint-content">
                        <div className="orp-maint-issue">{bed.maintenanceInfo?.issue}</div>
                        <div className="orp-bed-action-link red">
                          <span>Remove Maint</span> &rarr;
                        </div>
                      </div>
                    )}

                    {bed.status === 'Vacant' && (
                      <div className="orp-bed-vacant-content">
                        <div className="orp-vacant-price-tag">₹{bed.pricePerMonth.toLocaleString('en-IN')} / mo</div>
                        <div className="orp-bed-action-link blue">
                          <Plus size={14} /> <span>Add Resident</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="orp-modal-footer">
              <button className="orp-secondary-btn" onClick={() => setActiveRoom(null)}>
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-MODAL 1: RESIDENT DETAILS (GREEN BED) */}
      {/* ========================================================================= */}
      {activeSubModal === 'ResidentDetails' && selectedBed?.bed.resident && (
        <div className="orp-modal-overlay nested" onClick={() => setActiveSubModal(null)}>
          <div className="orp-modal-container dialog-pop" ref={subModalRef} onClick={e => e.stopPropagation()}>
            <div className="orp-submodal-header green">
              <div className="orp-avatar-circle">
                {selectedBed.bed.resident.name.charAt(0)}
              </div>
              <div>
                <h3 className="orp-submodal-title">{selectedBed.bed.resident.name}</h3>
                <span className="orp-submodal-badge green">Assigned Resident</span>
              </div>
              <button className="orp-modal-close-btn" onClick={() => setActiveSubModal(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="orp-submodal-body">
              <div className="orp-detail-row">
                <div className="orp-detail-item">
                  <span className="orp-detail-label">Room & Bed</span>
                  <span className="orp-detail-val">Room {selectedBed.roomNumber} ({selectedBed.bed.bedNumber})</span>
                </div>
                <div className="orp-detail-item">
                  <span className="orp-detail-label">Payment Status</span>
                  <span className="orp-detail-val badge-green">Paid</span>
                </div>
              </div>

              <div className="orp-detail-card">
                <div className="orp-detail-line"><Phone size={15} color="#2563eb" /> <strong>Phone:</strong> {selectedBed.bed.resident.phone}</div>
                <div className="orp-detail-line"><BookOpen size={15} color="#2563eb" /> <strong>Course:</strong> {selectedBed.bed.resident.course}</div>
                <div className="orp-detail-line"><Calendar size={15} color="#2563eb" /> <strong>Check-in:</strong> {selectedBed.bed.resident.checkInDate}</div>
                {selectedBed.bed.resident.emergencyContact && (
                  <div className="orp-detail-line"><ShieldAlert size={15} color="#e11d48" /> <strong>Emergency Contact:</strong> {selectedBed.bed.resident.emergencyContact}</div>
                )}
                {selectedBed.bed.resident.idNumber && (
                  <div className="orp-detail-line"><Info size={15} color="#64748b" /> <strong>Govt ID:</strong> {selectedBed.bed.resident.idNumber}</div>
                )}
              </div>
            </div>

            <div className="orp-modal-footer">
              <a href={`tel:${selectedBed.bed.resident.phone}`} className="orp-primary-btn green flex-center" style={{ textDecoration: 'none' }}>
                <Phone size={16} /> Call Resident
              </a>
              <button className="orp-secondary-btn" onClick={() => setActiveSubModal(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-MODAL 2: UNRESERVE BED (ORANGE BED) */}
      {/* ========================================================================= */}
      {activeSubModal === 'Unreserve' && selectedBed?.bed.reservedInfo && (
        <div className="orp-modal-overlay nested" onClick={() => setActiveSubModal(null)}>
          <div className="orp-modal-container dialog-pop" ref={subModalRef} onClick={e => e.stopPropagation()}>
            <div className="orp-submodal-header orange">
              <Clock size={24} color="#ea580c" />
              <div>
                <h3 className="orp-submodal-title">Reserved Bed Actions</h3>
                <span className="orp-submodal-badge orange">{selectedBed.bed.bedNumber}</span>
              </div>
              <button className="orp-modal-close-btn" onClick={() => setActiveSubModal(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="orp-submodal-body">
              <div className="orp-info-banner orange">
                <AlertTriangle size={18} color="#ea580c" />
                <span>This bed is currently reserved. Unreserving will set the bed status back to <strong>Vacant</strong> so a new resident can be assigned.</span>
              </div>

              <div className="orp-detail-card margin-top">
                <div className="orp-detail-line"><strong>Reserved For:</strong> {selectedBed.bed.reservedInfo.reservedBy}</div>
                <div className="orp-detail-line"><strong>Contact Phone:</strong> {selectedBed.bed.reservedInfo.phone}</div>
                <div className="orp-detail-line"><strong>Advance Paid:</strong> ₹{selectedBed.bed.reservedInfo.advancePaid.toLocaleString('en-IN')}</div>
                <div className="orp-detail-line"><strong>Reserved Date:</strong> {selectedBed.bed.reservedInfo.reservedDate}</div>
              </div>
            </div>

            <div className="orp-modal-footer">
              <button 
                className="orp-primary-btn orange"
                onClick={() => handleUnreserve(selectedBed.bed.id)}
              >
                <RefreshCw size={16} /> Unreserve Bed (Make Vacant)
              </button>
              <button className="orp-secondary-btn" onClick={() => setActiveSubModal(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-MODAL 3: REMOVE FROM MAINTENANCE (RED BED) */}
      {/* ========================================================================= */}
      {activeSubModal === 'RemoveMaintenance' && selectedBed?.bed.maintenanceInfo && (
        <div className="orp-modal-overlay nested" onClick={() => setActiveSubModal(null)}>
          <div className="orp-modal-container dialog-pop" ref={subModalRef} onClick={e => e.stopPropagation()}>
            <div className="orp-submodal-header red">
              <Wrench size={24} color="#dc2626" />
              <div>
                <h3 className="orp-submodal-title">Maintenance Bed Actions</h3>
                <span className="orp-submodal-badge red">{selectedBed.bed.bedNumber}</span>
              </div>
              <button className="orp-modal-close-btn" onClick={() => setActiveSubModal(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="orp-submodal-body">
              <div className="orp-info-banner red">
                <Info size={18} color="#dc2626" />
                <span>Removing from maintenance will mark this bed clean, repaired, and <strong>Vacant</strong> for new check-ins.</span>
              </div>

              <div className="orp-detail-card margin-top">
                <div className="orp-detail-line"><strong>Issue Description:</strong> {selectedBed.bed.maintenanceInfo.issue}</div>
                <div className="orp-detail-line"><strong>Reported Date:</strong> {selectedBed.bed.maintenanceInfo.reportedDate}</div>
                <div className="orp-detail-line"><strong>Priority Level:</strong> {selectedBed.bed.maintenanceInfo.priority}</div>
              </div>
            </div>

            <div className="orp-modal-footer">
              <button 
                className="orp-primary-btn red"
                onClick={() => handleRemoveMaintenance(selectedBed.bed.id)}
              >
                <Check size={16} /> Remove from Maintenance
              </button>
              <button className="orp-secondary-btn" onClick={() => setActiveSubModal(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-MODAL 4: VACANT BED OPTIONS / ADD RESIDENT (VACANT BED) */}
      {/* ========================================================================= */}
      {activeSubModal === 'AddResident' && selectedBed && (
        <div className="orp-modal-overlay nested" onClick={() => setActiveSubModal(null)}>
          <div className="orp-modal-container mobile-sheet" ref={subModalRef} onClick={e => e.stopPropagation()}>
            <div className="orp-modal-handle" />
            
            <div className="orp-submodal-header blue">
              <UserPlus size={22} color="#2563eb" />
              <div>
                <h3 className="orp-submodal-title">Manage Vacant Bed</h3>
                <span className="orp-submodal-badge blue">{selectedBed.bed.bedNumber} • Room {selectedBed.roomNumber}</span>
              </div>
              <button className="orp-modal-close-btn" onClick={() => setActiveSubModal(null)}>
                <X size={18} />
              </button>
            </div>

            {/* Quick Action Selector */}
            <div className="orp-vacant-actions-tabs">
              <button 
                className={`orp-vtab ${activeSubModal === 'AddResident' ? 'active' : ''}`}
                onClick={() => setActiveSubModal('AddResident')}
              >
                <UserPlus size={15} /> Add Resident
              </button>
              <button 
                className="orp-vtab"
                onClick={() => setActiveSubModal('ReserveBed')}
              >
                <Clock size={15} /> Reserve Bed
              </button>
              <button 
                className="orp-vtab"
                onClick={() => setActiveSubModal('ReportMaintenance')}
              >
                <Wrench size={15} /> Report Issue
              </button>
            </div>

            <div className="orp-submodal-body">
              <div className="orp-price-highlight-card">
                <div className="orp-ph-label">Standard Bed Monthly Rent</div>
                <div className="orp-ph-val">₹{selectedBed.bed.pricePerMonth.toLocaleString('en-IN')} <span className="orp-ph-sub">/ month</span></div>
              </div>

              {/* Form to Add Resident */}
              <form onSubmit={handleAddResidentSubmit} className="orp-form">
                <div className="orp-form-group">
                  <label className="orp-label">Resident Full Name *</label>
                  <input 
                    type="text" 
                    className="orp-input" 
                    placeholder="e.g. Ramesh Chandra" 
                    required 
                    value={newResidentForm.name}
                    onChange={e => setNewResidentForm({ ...newResidentForm, name: e.target.value })}
                  />
                </div>

                <div className="orp-form-group">
                  <label className="orp-label">Mobile Phone Number *</label>
                  <input 
                    type="tel" 
                    className="orp-input" 
                    placeholder="e.g. +91 98765 43210" 
                    required 
                    value={newResidentForm.phone}
                    onChange={e => setNewResidentForm({ ...newResidentForm, phone: e.target.value })}
                  />
                </div>

                <div className="orp-form-row">
                  <div className="orp-form-group half">
                    <label className="orp-label">Course / Profession</label>
                    <input 
                      type="text" 
                      className="orp-input" 
                      placeholder="e.g. B.Tech / Software Dev" 
                      value={newResidentForm.course}
                      onChange={e => setNewResidentForm({ ...newResidentForm, course: e.target.value })}
                    />
                  </div>
                  <div className="orp-form-group half">
                    <label className="orp-label">Check-in Date</label>
                    <input 
                      type="date" 
                      className="orp-input" 
                      value={newResidentForm.checkInDate}
                      onChange={e => setNewResidentForm({ ...newResidentForm, checkInDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="orp-modal-footer no-padding">
                  <button type="submit" className="orp-primary-btn green">
                    <CheckCircle2 size={16} /> Assign Resident to Bed
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-MODAL 5: RESERVE VACANT BED */}
      {/* ========================================================================= */}
      {activeSubModal === 'ReserveBed' && selectedBed && (
        <div className="orp-modal-overlay nested" onClick={() => setActiveSubModal(null)}>
          <div className="orp-modal-container mobile-sheet" ref={subModalRef} onClick={e => e.stopPropagation()}>
            <div className="orp-modal-handle" />

            <div className="orp-submodal-header orange">
              <Clock size={22} color="#ea580c" />
              <div>
                <h3 className="orp-submodal-title">Reserve Bed</h3>
                <span className="orp-submodal-badge orange">{selectedBed.bed.bedNumber} • Room {selectedBed.roomNumber}</span>
              </div>
              <button className="orp-modal-close-btn" onClick={() => setActiveSubModal(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="orp-vacant-actions-tabs">
              <button className="orp-vtab" onClick={() => setActiveSubModal('AddResident')}>
                <UserPlus size={15} /> Add Resident
              </button>
              <button className="orp-vtab active" onClick={() => setActiveSubModal('ReserveBed')}>
                <Clock size={15} /> Reserve Bed
              </button>
              <button className="orp-vtab" onClick={() => setActiveSubModal('ReportMaintenance')}>
                <Wrench size={15} /> Report Issue
              </button>
            </div>

            <div className="orp-submodal-body">
              <form onSubmit={handleReserveBedSubmit} className="orp-form">
                <div className="orp-form-group">
                  <label className="orp-label">Reserve For (Name) *</label>
                  <input 
                    type="text" 
                    className="orp-input" 
                    placeholder="e.g. Ankit Sharma" 
                    required 
                    value={reserveForm.reservedBy}
                    onChange={e => setReserveForm({ ...reserveForm, reservedBy: e.target.value })}
                  />
                </div>

                <div className="orp-form-group">
                  <label className="orp-label">Contact Phone Number *</label>
                  <input 
                    type="tel" 
                    className="orp-input" 
                    placeholder="e.g. +91 98765 43210" 
                    required 
                    value={reserveForm.phone}
                    onChange={e => setReserveForm({ ...reserveForm, phone: e.target.value })}
                  />
                </div>

                <div className="orp-form-group">
                  <label className="orp-label">Advance Amount Paid (₹)</label>
                  <input 
                    type="number" 
                    className="orp-input" 
                    placeholder="2000" 
                    value={reserveForm.advancePaid}
                    onChange={e => setReserveForm({ ...reserveForm, advancePaid: e.target.value })}
                  />
                </div>

                <div className="orp-modal-footer no-padding">
                  <button type="submit" className="orp-primary-btn orange">
                    <Clock size={16} /> Save Reservation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-MODAL 6: REPORT MAINTENANCE FOR VACANT BED */}
      {/* ========================================================================= */}
      {activeSubModal === 'ReportMaintenance' && selectedBed && (
        <div className="orp-modal-overlay nested" onClick={() => setActiveSubModal(null)}>
          <div className="orp-modal-container mobile-sheet" ref={subModalRef} onClick={e => e.stopPropagation()}>
            <div className="orp-modal-handle" />

            <div className="orp-submodal-header red">
              <Wrench size={22} color="#dc2626" />
              <div>
                <h3 className="orp-submodal-title">Put Bed under Maintenance</h3>
                <span className="orp-submodal-badge red">{selectedBed.bed.bedNumber} • Room {selectedBed.roomNumber}</span>
              </div>
              <button className="orp-modal-close-btn" onClick={() => setActiveSubModal(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="orp-vacant-actions-tabs">
              <button className="orp-vtab" onClick={() => setActiveSubModal('AddResident')}>
                <UserPlus size={15} /> Add Resident
              </button>
              <button className="orp-vtab" onClick={() => setActiveSubModal('ReserveBed')}>
                <Clock size={15} /> Reserve Bed
              </button>
              <button className="orp-vtab active" onClick={() => setActiveSubModal('ReportMaintenance')}>
                <Wrench size={15} /> Report Issue
              </button>
            </div>

            <div className="orp-submodal-body">
              <form onSubmit={handleReportMaintenanceSubmit} className="orp-form">
                <div className="orp-form-group">
                  <label className="orp-label">Maintenance Issue Description *</label>
                  <textarea 
                    className="orp-textarea" 
                    placeholder="e.g. Broken bed frame, Painting work required" 
                    required 
                    rows={3}
                    value={maintenanceForm.issue}
                    onChange={e => setMaintenanceForm({ ...maintenanceForm, issue: e.target.value })}
                  />
                </div>

                <div className="orp-form-group">
                  <label className="orp-label">Priority Level</label>
                  <select 
                    className="orp-select"
                    value={maintenanceForm.priority}
                    onChange={e => setMaintenanceForm({ ...maintenanceForm, priority: e.target.value as any })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div className="orp-modal-footer no-padding">
                  <button type="submit" className="orp-primary-btn red">
                    <Wrench size={16} /> Mark Bed under Maintenance
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
