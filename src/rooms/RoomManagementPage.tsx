import React, { useState } from 'react';
import { LiveCameraModal } from '../components/LiveCameraModal';
import {
  Building,
  BedDouble,
  Users,
  Wrench,
  Clock,
  Plus,
  Search,
  ArrowLeft,
  X,
  CheckCircle,
  Edit3,
  Trash2,
  Bath,
  Wind,
  Wifi,
  Tv,
  Maximize2,
  Shield,
  Phone,
  User,
  Calendar,
  AlertTriangle,
  Check,
  CheckSquare,
  Square,
  ChevronRight,
  Filter,
  Sparkles,
  CheckCircle2,
  Eye,
  EyeOff,
  Camera,
  Upload
} from 'lucide-react';
import type { BedStatus, BedResident, BedModel, RoomModel, FloorModel } from '../types';

/* ─────────────────────────────────────────────────────────────────────────── */
/*  INITIAL SEED DATA                                                          */
/* ─────────────────────────────────────────────────────────────────────────── */
const initialFloorsData: FloorModel[] = [
  {
    id: 'f1',
    floorNumber: 'Floor 1',
    rooms: [
      {
        id: 'r101',
        roomNumber: '101',
        floorId: 'f1',
        sharingType: '2-Sharing (Double)',
        features: ['Attached Bathroom', 'Air Conditioning (AC)', 'High-Speed WiFi'],
        rentPerMonth: 8500,
        beds: [
          {
            id: 'b101a',
            bedNumber: 'Bed 101-A',
            status: 'occupied',
            resident: {
              id: 'res1',
              name: 'Rahul Sharma',
              phone: '+91 98765 43210',
              checkInDate: '2024-01-15',
              course: 'B.Tech CSE',
              rentAmount: 8500,
              paymentStatus: 'Paid',
              emergencyContact: '+91 98765 00000'
            }
          },
          {
            id: 'b101b',
            bedNumber: 'Bed 101-B',
            status: 'vacant'
          }
        ]
      },
      {
        id: 'r102',
        roomNumber: '102',
        floorId: 'f1',
        sharingType: '3-Sharing (Triple)',
        features: ['Attached Bathroom', 'Hot Water Geyser', 'Study Desk & Chair'],
        rentPerMonth: 7000,
        beds: [
          {
            id: 'b102a',
            bedNumber: 'Bed 102-A',
            status: 'occupied',
            resident: {
              id: 'res2',
              name: 'Vikram Singh',
              phone: '+91 98123 45678',
              checkInDate: '2024-02-01',
              course: 'MBA Marketing',
              rentAmount: 7000,
              paymentStatus: 'Paid',
              emergencyContact: '+91 98123 11111'
            }
          },
          {
            id: 'b102b',
            bedNumber: 'Bed 102-B',
            status: 'occupied',
            resident: {
              id: 'res3',
              name: 'Amit Kumar',
              phone: '+91 97111 22334',
              checkInDate: '2024-03-10',
              course: 'B.Com Finance',
              rentAmount: 7000,
              paymentStatus: 'Pending',
              emergencyContact: '+91 97111 99999'
            }
          },
          {
            id: 'b102c',
            bedNumber: 'Bed 102-C',
            status: 'maintenance',
            maintenanceReason: 'AC Servicing & Electrical Maintenance'
          }
        ]
      },
      {
        id: 'r103',
        roomNumber: '103',
        floorId: 'f1',
        sharingType: '1-Sharing (Single)',
        features: ['Attached Bathroom', 'Air Conditioning (AC)', 'Private Balcony', 'High-Speed WiFi'],
        rentPerMonth: 12500,
        beds: [
          {
            id: 'b103a',
            bedNumber: 'Bed 103-A',
            status: 'reserved',
            reservedFor: 'Priya S.',
            reservedUntil: '15th Aug 2026'
          }
        ]
      }
    ]
  },
  {
    id: 'f2',
    floorNumber: 'Floor 2',
    rooms: [
      {
        id: 'r201',
        roomNumber: '201',
        floorId: 'f2',
        sharingType: '2-Sharing (Double)',
        features: ['Attached Bathroom', 'Air Conditioning (AC)'],
        rentPerMonth: 8500,
        beds: [
          {
            id: 'b201a',
            bedNumber: 'Bed 201-A',
            status: 'occupied',
            resident: {
              id: 'res4',
              name: 'Suresh Patel',
              phone: '+91 99887 76655',
              checkInDate: '2024-01-10',
              course: 'M.Tech IT',
              rentAmount: 8500,
              paymentStatus: 'Paid',
              emergencyContact: '+91 99887 00000'
            }
          },
          {
            id: 'b201b',
            bedNumber: 'Bed 201-B',
            status: 'vacant'
          }
        ]
      },
      {
        id: 'r202',
        roomNumber: '202',
        floorId: 'f2',
        sharingType: '4-Sharing (Quad)',
        features: ['Hot Water Geyser', 'Study Desk & Chair', 'High-Speed WiFi'],
        rentPerMonth: 6000,
        beds: [
          {
            id: 'b202a',
            bedNumber: 'Bed 202-A',
            status: 'vacant'
          },
          {
            id: 'b202b',
            bedNumber: 'Bed 202-B',
            status: 'vacant'
          },
          {
            id: 'b202c',
            bedNumber: 'Bed 202-C',
            status: 'occupied',
            resident: {
              id: 'res5',
              name: 'Deepak Verma',
              phone: '+91 95554 43322',
              checkInDate: '2024-05-01',
              course: 'BCA',
              rentAmount: 6000,
              paymentStatus: 'Paid'
            }
          },
          {
            id: 'b202d',
            bedNumber: 'Bed 202-D',
            status: 'vacant'
          }
        ]
      }
    ]
  },
  {
    id: 'f3',
    floorNumber: 'Floor 3',
    rooms: [
      {
        id: 'r301',
        roomNumber: '301',
        floorId: 'f3',
        sharingType: '2-Sharing (Double)',
        features: ['Attached Bathroom', 'Private Balcony'],
        rentPerMonth: 8000,
        beds: [
          { id: 'b301a', bedNumber: 'Bed 301-A', status: 'vacant' },
          { id: 'b301b', bedNumber: 'Bed 301-B', status: 'vacant' }
        ]
      },
      {
        id: 'r302',
        roomNumber: '302',
        floorId: 'f3',
        sharingType: '1-Sharing (Single)',
        features: ['Air Conditioning (AC)', 'High-Speed WiFi'],
        rentPerMonth: 12000,
        beds: [
          {
            id: 'b302a',
            bedNumber: 'Bed 302-A',
            status: 'occupied',
            resident: {
              id: 'res6',
              name: 'Rohan Gupta',
              phone: '+91 91234 56789',
              checkInDate: '2024-04-12',
              course: 'BBA',
              rentAmount: 12000,
              paymentStatus: 'Paid'
            }
          }
        ]
      }
    ]
  }
];

const ALL_FEATURES = [
  'Attached Bathroom',
  'Air Conditioning (AC)',
  'Private Balcony',
  'Hot Water Geyser',
  'Study Desk & Chair',
  'High-Speed WiFi'
];

/* ─────────────────────────────────────────────────────────────────────────── */
/*  MAIN ROOM MANAGEMENT PAGE COMPONENT                                       */
/* ─────────────────────────────────────────────────────────────────────────── */
export const RoomManagementPage: React.FC = () => {
  const [floors, setFloors] = useState<FloorModel[]>(initialFloorsData);
  const [selectedFloorId, setSelectedFloorId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLiveCameraOpen, setIsLiveCameraOpen] = useState(false);

  // Modals state
  const [isAddFloorModalOpen, setIsAddFloorModalOpen] = useState(false);
  const [addFloorStep, setAddFloorStep] = useState<1 | 2>(1);
  const [newFloorName, setNewFloorName] = useState('');
  const [newFloorRoomCount, setNewFloorRoomCount] = useState<number>(2);
  const [newFloorRoomsDraft, setNewFloorRoomsDraft] = useState<
    { roomNumber: string; sharingType: string; bedCount: number; features: string[] }[]
  >([]);

  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [targetFloorIdForNewRoom, setTargetFloorIdForNewRoom] = useState<string | null>(null);
  const [newRoomDraft, setNewRoomDraft] = useState<{
    roomNumber: string;
    sharingType: string;
    bedCount: number;
    features: string[];
    rentPerMonth: number;
  }>({
    roomNumber: '',
    sharingType: '2-Sharing (Double)',
    bedCount: 2,
    features: ['Attached Bathroom', 'High-Speed WiFi'],
    rentPerMonth: 8000
  });

  // Active room popup
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  // Bed action modals
  const [activeBedAction, setActiveBedAction] = useState<{
    floorId: string;
    roomId: string;
    bed: BedModel;
    type: 'assign' | 'maintenance' | 'reserved' | 'view_resident' | 'view_maintenance' | 'view_reserved' | 'options';
  } | null>(null);

  // Form states for bed action modals
  const [assignForm, setAssignForm] = useState({
    name: '',
    phone: '',
    altPhone: '',
    address: '',
    aadhaarNumber: '',
    email: '',
    password: '',
    photoUrl: '',
    checkInDate: new Date().toISOString().split('T')[0],
    rentAmount: 8000
  });
  const [showAssignPassword, setShowAssignPassword] = useState(false);
  const [maintenanceForm, setMaintenanceForm] = useState({ reason: '' });
  const [reservedForm, setReservedForm] = useState({ reservedFor: '', untilDate: '' });

  // CRUD Edit / Delete Modals State
  const [editingFloor, setEditingFloor] = useState<FloorModel | null>(null);
  const [editingRoom, setEditingRoom] = useState<{ floorId: string; room: RoomModel } | null>(null);
  const [editingBed, setEditingBed] = useState<{ floorId: string; roomId: string; bed: BedModel } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: 'floor' | 'room' | 'bed';
    id: string;
    title: string;
    floorId?: string;
    roomId?: string;
  } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  /* ───────────────────────────────────────────────────────────────────────── */
  /*  CALCULATE STATS                                                         */
  /* ───────────────────────────────────────────────────────────────────────── */
  let totalRooms = 0;
  let totalBeds = 0;
  let occupiedBeds = 0;
  let vacantBeds = 0;
  let maintenanceBeds = 0;
  let reservedBeds = 0;

  floors.forEach((fl) => {
    totalRooms += fl.rooms.length;
    fl.rooms.forEach((rm) => {
      totalBeds += rm.beds.length;
      rm.beds.forEach((bd) => {
        if (bd.status === 'occupied') occupiedBeds++;
        else if (bd.status === 'vacant') vacantBeds++;
        else if (bd.status === 'maintenance') maintenanceBeds++;
        else if (bd.status === 'reserved') reservedBeds++;
      });
    });
  });

  const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  /* ───────────────────────────────────────────────────────────────────────── */
  /*  FLOOR CRUD HANDLERS                                                     */
  /* ───────────────────────────────────────────────────────────────────────── */
  const handleOpenAddFloor = () => {
    setNewFloorName(`Floor ${floors.length + 1}`);
    setNewFloorRoomCount(2);
    setAddFloorStep(1);
    setIsAddFloorModalOpen(true);
  };

  const handleProceedToAddFloorStep2 = () => {
    if (!newFloorName.trim()) {
      showToast('Please enter a floor name/number');
      return;
    }
    const count = Math.max(1, Math.min(10, newFloorRoomCount));
    const draft = [];
    for (let i = 1; i <= count; i++) {
      const roomNum = `${floors.length + 1}0${i}`;
      draft.push({
        roomNumber: roomNum,
        sharingType: '2-Sharing (Double)',
        bedCount: 2,
        features: ['Attached Bathroom', 'High-Speed WiFi']
      });
    }
    setNewFloorRoomsDraft(draft);
    setAddFloorStep(2);
  };

  const handleSaveNewFloor = () => {
    const newFloorId = `f_${Date.now()}`;
    const createdRooms: RoomModel[] = newFloorRoomsDraft.map((r, idx) => {
      const roomId = `r_${Date.now()}_${idx}`;
      const beds: BedModel[] = [];
      for (let b = 1; b <= r.bedCount; b++) {
        beds.push({
          id: `b_${roomId}_${b}`,
          bedNumber: `Bed ${r.roomNumber}-${String.fromCharCode(64 + b)}`,
          status: 'vacant'
        });
      }
      return {
        id: roomId,
        roomNumber: r.roomNumber || `${newFloorId}-${idx + 1}`,
        floorId: newFloorId,
        sharingType: r.sharingType,
        features: r.features,
        rentPerMonth: r.sharingType.includes('Single') ? 12000 : 8000,
        beds
      };
    });

    const newFloor: FloorModel = {
      id: newFloorId,
      floorNumber: newFloorName.trim(),
      rooms: createdRooms
    };

    setFloors([...floors, newFloor]);
    setIsAddFloorModalOpen(false);
    showToast(`Added ${newFloorName} with ${createdRooms.length} rooms!`);
  };

  const handleEditFloorSave = () => {
    if (!editingFloor || !editingFloor.floorNumber.trim()) return;
    setFloors(floors.map((f) => (f.id === editingFloor.id ? editingFloor : f)));
    setEditingFloor(null);
    showToast('Floor name updated successfully!');
  };

  const handleDeleteFloor = (floorId: string) => {
    setFloors(floors.filter((f) => f.id !== floorId));
    if (selectedFloorId === floorId) setSelectedFloorId(null);
    setDeleteConfirm(null);
    showToast('Floor deleted successfully');
  };

  /* ───────────────────────────────────────────────────────────────────────── */
  /*  ROOM CRUD HANDLERS                                                      */
  /* ───────────────────────────────────────────────────────────────────────── */
  const handleOpenAddRoom = (floorId: string) => {
    setTargetFloorIdForNewRoom(floorId);
    const targetFloor = floors.find((f) => f.id === floorId);
    const roomNum = targetFloor ? `${targetFloor.rooms.length + 1}01` : '101';
    setNewRoomDraft({
      roomNumber: roomNum,
      sharingType: '2-Sharing (Double)',
      bedCount: 2,
      features: ['Attached Bathroom', 'High-Speed WiFi'],
      rentPerMonth: 8000
    });
    setIsAddRoomModalOpen(true);
  };

  const handleSaveNewRoom = () => {
    if (!targetFloorIdForNewRoom || !newRoomDraft.roomNumber.trim()) return;
    const roomId = `r_${Date.now()}`;
    const beds: BedModel[] = [];
    for (let b = 1; b <= newRoomDraft.bedCount; b++) {
      beds.push({
        id: `b_${roomId}_${b}`,
        bedNumber: `Bed ${newRoomDraft.roomNumber}-${String.fromCharCode(64 + b)}`,
        status: 'vacant'
      });
    }

    const createdRoom: RoomModel = {
      id: roomId,
      roomNumber: newRoomDraft.roomNumber.trim(),
      floorId: targetFloorIdForNewRoom,
      sharingType: newRoomDraft.sharingType,
      features: newRoomDraft.features,
      rentPerMonth: newRoomDraft.rentPerMonth,
      beds
    };

    setFloors(
      floors.map((f) => {
        if (f.id === targetFloorIdForNewRoom) {
          return { ...f, rooms: [...f.rooms, createdRoom] };
        }
        return f;
      })
    );
    setIsAddRoomModalOpen(false);
    showToast(`Added Room ${createdRoom.roomNumber}!`);
  };

  const handleEditRoomSave = () => {
    if (!editingRoom || !editingRoom.room.roomNumber.trim()) return;
    setFloors(
      floors.map((f) => {
        if (f.id === editingRoom.floorId) {
          return {
            ...f,
            rooms: f.rooms.map((r) => (r.id === editingRoom.room.id ? editingRoom.room : r))
          };
        }
        return f;
      })
    );
    setEditingRoom(null);
    showToast(`Room ${editingRoom.room.roomNumber} updated!`);
  };

  const handleDeleteRoom = (floorId: string, roomId: string) => {
    setFloors(
      floors.map((f) => {
        if (f.id === floorId) {
          return { ...f, rooms: f.rooms.filter((r) => r.id !== roomId) };
        }
        return f;
      })
    );
    if (activeRoomId === roomId) setActiveRoomId(null);
    setDeleteConfirm(null);
    showToast('Room deleted successfully');
  };

  /* ───────────────────────────────────────────────────────────────────────── */
  /*  BED CRUD & STATUS HANDLERS                                              */
  /* ───────────────────────────────────────────────────────────────────────── */
  const handleAddBedToRoom = (floorId: string, roomId: string) => {
    setFloors(
      floors.map((f) => {
        if (f.id === floorId) {
          return {
            ...f,
            rooms: f.rooms.map((r) => {
              if (r.id === roomId) {
                const nextChar = String.fromCharCode(65 + r.beds.length);
                const newBed: BedModel = {
                  id: `b_${Date.now()}`,
                  bedNumber: `Bed ${r.roomNumber}-${nextChar}`,
                  status: 'vacant'
                };
                return { ...r, beds: [...r.beds, newBed] };
              }
              return r;
            })
          };
        }
        return f;
      })
    );
    showToast('New bed added to room!');
  };

  const handleEditBedSave = () => {
    if (!editingBed || !editingBed.bed.bedNumber.trim()) return;
    setFloors(
      floors.map((f) => {
        if (f.id === editingBed.floorId) {
          return {
            ...f,
            rooms: f.rooms.map((r) => {
              if (r.id === editingBed.roomId) {
                return {
                  ...r,
                  beds: r.beds.map((b) => (b.id === editingBed.bed.id ? editingBed.bed : b))
                };
              }
              return r;
            })
          };
        }
        return f;
      })
    );
    setEditingBed(null);
    showToast('Bed updated successfully!');
  };

  const handleDeleteBed = (floorId: string, roomId: string, bedId: string) => {
    setFloors(
      floors.map((f) => {
        if (f.id === floorId) {
          return {
            ...f,
            rooms: f.rooms.map((r) => {
              if (r.id === roomId) {
                return { ...r, beds: r.beds.filter((b) => b.id !== bedId) };
              }
              return r;
            })
          };
        }
        return f;
      })
    );
    setActiveBedAction(null);
    setDeleteConfirm(null);
    showToast('Bed removed from room');
  };

  // Bed Status Actions: Assign, Maintenance, Reserved, Unassign, Remove Maintenance, Remove Reserved
  const handleAssignResidentSubmit = () => {
    if (!activeBedAction || !assignForm.name.trim()) {
      showToast('Please enter full name');
      return;
    }
    if (!assignForm.phone.trim()) {
      showToast('Please enter mobile number');
      return;
    }
    const resident: BedResident = {
      id: `res_${Date.now()}`,
      name: assignForm.name.trim(),
      phone: assignForm.phone.trim(),
      checkInDate: assignForm.checkInDate || new Date().toISOString().split('T')[0],
      course: 'Tenant',
      rentAmount: Number(assignForm.rentAmount) || 8000,
      paymentStatus: 'Paid',
      emergencyContact: assignForm.altPhone.trim() || assignForm.phone.trim(),
      email: assignForm.email.trim(),
      address: assignForm.address.trim(),
      aadhaarNumber: assignForm.aadhaarNumber.trim(),
      password: assignForm.password.trim(),
      photoUrl: assignForm.photoUrl
    };

    updateBedInState(activeBedAction.floorId, activeBedAction.roomId, activeBedAction.bed.id, {
      status: 'occupied',
      resident
    });
    setActiveBedAction(null);
    showToast(`Tenant ${resident.name} assigned & saved!`);
  };

  const handlePutInMaintenanceSubmit = () => {
    if (!activeBedAction) return;
    const reason = maintenanceForm.reason.trim() || 'Scheduled Maintenance';
    updateBedInState(activeBedAction.floorId, activeBedAction.roomId, activeBedAction.bed.id, {
      status: 'maintenance',
      maintenanceReason: reason
    });
    setActiveBedAction(null);
    showToast('Bed placed under maintenance');
  };

  const handlePutInReservedSubmit = () => {
    if (!activeBedAction) return;
    const reservedFor = reservedForm.reservedFor.trim() || 'Guest / Upcoming Resident';
    updateBedInState(activeBedAction.floorId, activeBedAction.roomId, activeBedAction.bed.id, {
      status: 'reserved',
      reservedFor,
      reservedUntil: reservedForm.untilDate || 'TBD'
    });
    setActiveBedAction(null);
    showToast('Bed reserved successfully');
  };

  const handleRemoveFromMaintenance = (floorId: string, roomId: string, bedId: string) => {
    updateBedInState(floorId, roomId, bedId, {
      status: 'vacant',
      maintenanceReason: undefined
    });
    setActiveBedAction(null);
    showToast('Removed from maintenance (Now Vacant)');
  };

  const handleRemoveFromReserved = (floorId: string, roomId: string, bedId: string) => {
    updateBedInState(floorId, roomId, bedId, {
      status: 'vacant',
      reservedFor: undefined,
      reservedUntil: undefined
    });
    setActiveBedAction(null);
    showToast('Reservation removed (Now Vacant)');
  };

  const handleUnassignResident = (floorId: string, roomId: string, bedId: string) => {
    updateBedInState(floorId, roomId, bedId, {
      status: 'vacant',
      resident: undefined
    });
    setActiveBedAction(null);
    showToast('Resident unassigned (Bed is now Vacant)');
  };

  const updateBedInState = (floorId: string, roomId: string, bedId: string, updates: Partial<BedModel>) => {
    setFloors(
      floors.map((f) => {
        if (f.id === floorId) {
          return {
            ...f,
            rooms: f.rooms.map((r) => {
              if (r.id === roomId) {
                return {
                  ...r,
                  beds: r.beds.map((b) => (b.id === bedId ? { ...b, ...updates } : b))
                };
              }
              return r;
            })
          };
        }
        return f;
      })
    );
  };

  /* ───────────────────────────────────────────────────────────────────────── */
  /*  SEARCH FILTERING LOGIC                                                  */
  /* ───────────────────────────────────────────────────────────────────────── */
  const query = searchQuery.trim().toLowerCase();

  const filteredFloors = floors
    .map((fl) => {
      const floorMatch = fl.floorNumber.toLowerCase().includes(query);
      const matchingRooms = fl.rooms.filter((rm) => {
        const roomMatch = rm.roomNumber.toLowerCase().includes(query);
        const residentMatch = rm.beds.some(
          (b) => b.resident && b.resident.name.toLowerCase().includes(query)
        );
        return floorMatch || roomMatch || residentMatch;
      });

      if (floorMatch || matchingRooms.length > 0) {
        return {
          ...fl,
          rooms: query && !floorMatch ? matchingRooms : fl.rooms
        };
      }
      return null;
    })
    .filter(Boolean) as FloorModel[];

  const selectedFloor = floors.find((f) => f.id === selectedFloorId);
  const activeRoom = activeRoomId
    ? floors.flatMap((f) => f.rooms).find((r) => r.id === activeRoomId)
    : null;
  const activeRoomFloor = activeRoom
    ? floors.find((f) => f.id === activeRoom.floorId)
    : null;

  /* ───────────────────────────────────────────────────────────────────────── */
  /*  RENDER                                                                   */
  /* ───────────────────────────────────────────────────────────────────────── */
  return (
    <div style={{ background: '#F8FAFC', minHeight: '100%', paddingBottom: '80px', color: '#1E293B', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Toast Banner */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '52px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            background: '#1E293B',
            color: '#FFFFFF',
            padding: '10px 18px',
            borderRadius: '24px',
            fontSize: '13px',
            fontWeight: 600,
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            maxWidth: '90%',
            whiteSpace: 'nowrap'
          }}
        >
          <CheckCircle size={16} color="#10B981" />
          {toastMessage}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/*  HEADER & ROOM MANAGEMENT TITLE                                    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div style={{ padding: '16px 16px 12px 16px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ marginBottom: '12px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
            Room Management
          </h1>
        </div>

        {/* ── STATS CARDS BAR ── */}
        <div
          style={{
            background: '#F1F5F9',
            borderRadius: '14px',
            padding: '12px 14px',
            marginBottom: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>Occupancy Rate</span>
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#4F46E5' }}>{occupancyRate}% Occupied</span>
          </div>

          {/* Progress Bar */}
          <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden', display: 'flex', marginBottom: '12px' }}>
            <div style={{ width: `${occupancyRate}%`, background: '#10B981', transition: 'width 0.3s' }} />
            <div style={{ width: `${totalBeds > 0 ? (vacantBeds / totalBeds) * 100 : 0}%`, background: '#3B82F6', transition: 'width 0.3s' }} />
            <div style={{ width: `${totalBeds > 0 ? (maintenanceBeds / totalBeds) * 100 : 0}%`, background: '#EF4444', transition: 'width 0.3s' }} />
            <div style={{ width: `${totalBeds > 0 ? (reservedBeds / totalBeds) * 100 : 0}%`, background: '#F97316', transition: 'width 0.3s' }} />
          </div>

          {/* Stat Pills Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
            <div style={{ background: '#FFFFFF', padding: '8px 4px', borderRadius: '8px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#10B981' }}>{occupiedBeds}</div>
              <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>Occupied</div>
            </div>
            <div style={{ background: '#FFFFFF', padding: '8px 4px', borderRadius: '8px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#3B82F6' }}>{vacantBeds}</div>
              <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>Vacant</div>
            </div>
            <div style={{ background: '#FFFFFF', padding: '8px 4px', borderRadius: '8px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#EF4444' }}>{maintenanceBeds}</div>
              <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>Maint</div>
            </div>
            <div style={{ background: '#FFFFFF', padding: '8px 4px', borderRadius: '8px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#F97316' }}>{reservedBeds}</div>
              <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>Reserved</div>
            </div>
          </div>
        </div>

        {/* ── SEARCH BAR ── */}
        <div style={{ position: 'relative' }}>
          <Search
            size={16}
            color="#94A3B8"
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search floor, room number, or resident..."
            style={{
              width: '100%',
              padding: '10px 36px 10px 36px',
              fontSize: '13px',
              borderRadius: '10px',
              border: '1px solid #CBD5E1',
              background: '#F8FAFC',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#94A3B8'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/*  CONTENT VIEW: SUB-PAGE (FLOOR DETAILS) OR MAIN FLOORS LIST        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div style={{ padding: '16px' }}>
        {selectedFloorId && selectedFloor ? (
          /* ── FLOOR DETAIL SUB-PAGE VIEW ── */
          <div>
            {/* Top Navigation Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <button
                onClick={() => setSelectedFloorId(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#334155',
                  cursor: 'pointer'
                }}
              >
                <ArrowLeft size={16} />
                All Floors
              </button>

              <button
                onClick={() => handleOpenAddRoom(selectedFloor.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#2563EB',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
                }}
              >
                <Plus size={16} />
                Add Room
              </button>
            </div>

            {/* Floor Header Info */}
            <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4F46E5' }}>
                    <Building size={20} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '17px', fontWeight: 800, margin: 0, color: '#0F172A' }}>{selectedFloor.floorNumber}</h2>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0 0' }}>
                      {selectedFloor.rooms.length} Rooms • {selectedFloor.rooms.reduce((acc, r) => acc + r.beds.length, 0)} Total Beds
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setEditingFloor(selectedFloor)}
                    style={{ background: '#F1F5F9', border: 'none', padding: '9px 11px', borderRadius: '10px', cursor: 'pointer', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    title="Edit Floor Name"
                  >
                    <Edit3 size={19} />
                  </button>
                  <button
                    onClick={() =>
                      setDeleteConfirm({
                        type: 'floor',
                        id: selectedFloor.id,
                        title: selectedFloor.floorNumber
                      })
                    }
                    style={{ background: '#FEF2F2', border: 'none', padding: '9px 11px', borderRadius: '10px', cursor: 'pointer', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    title="Delete Floor"
                  >
                    <Trash2 size={19} />
                  </button>
                </div>
              </div>
            </div>

            {/* Rooms Grid */}
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#475569', marginBottom: '10px' }}>
              Rooms on {selectedFloor.floorNumber}
            </h3>

            {selectedFloor.rooms.length === 0 ? (
              <div style={{ background: '#FFFFFF', padding: '32px', textAlign: 'center', borderRadius: '12px', border: '1px border-dashed #CBD5E1' }}>
                <BedDouble size={32} color="#94A3B8" style={{ marginBottom: '8px' }} />
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#64748B', margin: 0 }}>No rooms created on this floor yet.</p>
                <button
                  onClick={() => handleOpenAddRoom(selectedFloor.id)}
                  style={{ marginTop: '12px', background: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: '24px', padding: '10px 20px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)' }}
                >
                  <Plus size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Add First Room
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedFloor.rooms.map((room) => {
                  const roomOccupied = room.beds.filter((b) => b.status === 'occupied').length;
                  const roomVacant = room.beds.filter((b) => b.status === 'vacant').length;
                  const roomMaint = room.beds.filter((b) => b.status === 'maintenance').length;
                  const roomRes = room.beds.filter((b) => b.status === 'reserved').length;

                  return (
                    <div
                      key={room.id}
                      onClick={() => setActiveRoomId(room.id)}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '14px',
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                        cursor: 'pointer',
                        transition: 'transform 0.15s, border-color 0.15s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>Room {room.roomNumber}</span>
                            <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: '#EEF2FF', color: '#4F46E5' }}>
                              {room.sharingType}
                            </span>
                          </div>

                          {/* Features Pills */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', margin: '4px 0 0 0' }}>
                            {room.features.map((feat, i) => (
                              <span key={i} style={{ fontSize: '10px', background: '#F1F5F9', color: '#475569', padding: '2px 6px', borderRadius: '4px', fontWeight: 500 }}>
                                {feat}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Top-Right: Navigation Arrow */}
                        <div style={{ flexShrink: 0, padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <ChevronRight size={22} color="#94A3B8" />
                        </div>
                      </div>

                      {/* Bed Status Summary & Action Buttons */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #F1F5F9', marginTop: '10px' }}>
                        <div style={{ display: 'flex', gap: '8px', fontSize: '11px', fontWeight: 600, flexWrap: 'wrap', alignItems: 'center' }}>
                          <span style={{ color: '#10B981' }}>{roomOccupied} Occupied</span>
                          <span style={{ color: '#3B82F6' }}>{roomVacant} Vacant</span>
                          {roomMaint > 0 && <span style={{ color: '#EF4444' }}>{roomMaint} Maint</span>}
                          {roomRes > 0 && <span style={{ color: '#F97316' }}>{roomRes} Reserved</span>}
                        </div>

                        {/* Bottom-Right: Edit & Delete Buttons */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingRoom({ floorId: selectedFloor.id, room });
                            }}
                            style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                            title="Edit Room"
                          >
                            <Edit3 size={17} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirm({
                                type: 'room',
                                id: room.id,
                                title: `Room ${room.roomNumber}`,
                                floorId: selectedFloor.id
                              });
                            }}
                            style={{ background: '#FEF2F2', border: 'none', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                            title="Delete Room"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* ── MAIN ALL FLOORS OVERVIEW VIEW ── */
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>All Floors</h2>
              <button
                onClick={handleOpenAddFloor}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#2563EB',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
                }}
              >
                <Plus size={16} />
                Add Floor
              </button>
            </div>

            {filteredFloors.length === 0 ? (
              <div style={{ background: '#FFFFFF', padding: '32px', textAlign: 'center', borderRadius: '14px', border: '1px dashed #CBD5E1' }}>
                <Building size={36} color="#94A3B8" style={{ marginBottom: '8px' }} />
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#475569', margin: 0 }}>No floors matching search query</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredFloors.map((floor) => {
                  const floorRooms = floor.rooms.length;
                  let fOccupied = 0;
                  let fVacant = 0;
                  let fMaint = 0;
                  let fRes = 0;
                  let fTotalBeds = 0;

                  floor.rooms.forEach((r) => {
                    fTotalBeds += r.beds.length;
                    r.beds.forEach((b) => {
                      if (b.status === 'occupied') fOccupied++;
                      else if (b.status === 'vacant') fVacant++;
                      else if (b.status === 'maintenance') fMaint++;
                      else if (b.status === 'reserved') fRes++;
                    });
                  });

                  const fPercentage = fTotalBeds > 0 ? Math.round((fOccupied / fTotalBeds) * 100) : 0;

                  return (
                    <div
                      key={floor.id}
                      onClick={() => setSelectedFloorId(floor.id)}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: '14px',
                        padding: '16px',
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                        cursor: 'pointer',
                        transition: 'transform 0.15s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4F46E5' }}>
                            <Building size={22} />
                          </div>
                          <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#0F172A' }}>{floor.floorNumber}</h3>
                            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>
                              {floorRooms} Rooms • {fTotalBeds} Beds
                            </span>
                          </div>
                        </div>

                        {/* Top-Right: % badge + ChevronRight Arrow */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                          <span style={{ fontSize: '14px', fontWeight: 800, color: '#4F46E5' }}>{fPercentage}%</span>
                          <ChevronRight size={22} color="#94A3B8" />
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div style={{ height: '6px', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden', display: 'flex', marginBottom: '10px' }}>
                        <div style={{ width: `${fPercentage}%`, background: '#10B981' }} />
                        <div style={{ width: `${fTotalBeds > 0 ? (fVacant / fTotalBeds) * 100 : 0}%`, background: '#3B82F6' }} />
                        <div style={{ width: `${fTotalBeds > 0 ? (fMaint / fTotalBeds) * 100 : 0}%`, background: '#EF4444' }} />
                        <div style={{ width: `${fTotalBeds > 0 ? (fRes / fTotalBeds) * 100 : 0}%`, background: '#F97316' }} />
                      </div>

                      {/* Footer Stats Row with Edit & Delete Buttons on Right */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', fontSize: '11px', fontWeight: 600, flexWrap: 'wrap' }}>
                          <span style={{ color: '#10B981' }}>{fOccupied} Occupied</span>
                          <span style={{ color: '#3B82F6' }}>{fVacant} Vacant</span>
                          {fMaint > 0 && <span style={{ color: '#EF4444' }}>{fMaint} Maint</span>}
                          {fRes > 0 && <span style={{ color: '#F97316' }}>{fRes} Reserved</span>}
                        </div>

                        {/* Bottom-Right: Edit & Delete Buttons */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingFloor(floor);
                            }}
                            style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                            title="Edit Floor"
                          >
                            <Edit3 size={17} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirm({
                                type: 'floor',
                                id: floor.id,
                                title: floor.floorNumber
                              });
                            }}
                            style={{ background: '#FEF2F2', border: 'none', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                            title="Delete Floor"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/*  ROOM BED LAYOUT POPUP MODAL                                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeRoom && activeRoomFloor && (
        <div style={{ position: 'fixed', top: '44px', left: 0, right: 0, bottom: '64px', zIndex: 1000, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '500px', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '20px 20px 28px 20px', maxHeight: '100%', overflowY: 'auto', boxShadow: '0 -10px 30px rgba(0,0,0,0.2)' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#0F172A' }}>Room {activeRoom.roomNumber} Details</h2>
                  <span style={{ fontSize: '11px', fontWeight: 700, background: '#EEF2FF', color: '#4F46E5', padding: '2px 8px', borderRadius: '12px' }}>
                    {activeRoom.sharingType}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0 0' }}>{activeRoomFloor.floorNumber}</p>
              </div>
              <button onClick={() => setActiveRoomId(null)} style={{ background: '#F1F5F9', border: 'none', padding: '6px', borderRadius: '50%', cursor: 'pointer' }}>
                <X size={18} color="#64748B" />
              </button>
            </div>

            {/* Room Features */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
              {activeRoom.features.map((feat, i) => (
                <span key={i} style={{ fontSize: '11px', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '3px 8px', borderRadius: '6px', color: '#475569', fontWeight: 600 }}>
                  {feat}
                </span>
              ))}
            </div>

            {/* Room Actions Row */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <button
                onClick={() => handleAddBedToRoom(activeRoomFloor.id, activeRoom.id)}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: '24px', padding: '10px 14px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)' }}
              >
                <Plus size={16} /> Add Bed
              </button>
              <button
                onClick={() => setEditingRoom({ floorId: activeRoomFloor.id, room: activeRoom })}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#F1F5F9', color: '#334155', border: 'none', borderRadius: '24px', padding: '10px 14px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
              >
                <Edit3 size={18} /> Edit Room
              </button>
              <button
                onClick={() => setDeleteConfirm({ type: 'room', id: activeRoom.id, title: `Room ${activeRoom.roomNumber}`, floorId: activeRoomFloor.id })}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', background: '#FEF2F2', color: '#EF4444', border: 'none', borderRadius: '24px', padding: '10px 14px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Beds Grid */}
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '10px' }}>
              Bed Layout ({activeRoom.beds.length} Beds)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '16px' }}>
              {activeRoom.beds.map((bed) => {
                let cardBg = '#FFFFFF';
                let borderColor = '#E2E8F0';
                let statusBadgeBg = '#E1EFFE';
                let statusTextColor = '#1E429F';
                let statusLabel = 'Vacant';
                let IconComponent = BedDouble;

                if (bed.status === 'occupied') {
                  cardBg = '#F0FDF4';
                  borderColor = '#86EFAC';
                  statusBadgeBg = '#DEF7EC';
                  statusTextColor = '#03543F';
                  statusLabel = 'Occupied';
                  IconComponent = User;
                } else if (bed.status === 'maintenance') {
                  cardBg = '#FEF2F2';
                  borderColor = '#FCA5A5';
                  statusBadgeBg = '#FDE8E8';
                  statusTextColor = '#9B1C1C';
                  statusLabel = 'Maintenance';
                  IconComponent = Wrench;
                } else if (bed.status === 'reserved') {
                  cardBg = '#FFFBEB';
                  borderColor = '#FDE68A';
                  statusBadgeBg = '#FEF3C7';
                  statusTextColor = '#92400E';
                  statusLabel = 'Reserved';
                  IconComponent = Clock;
                }

                return (
                  <div
                    key={bed.id}
                    onClick={() => {
                      if (bed.status === 'occupied') {
                        setActiveBedAction({ floorId: activeRoomFloor.id, roomId: activeRoom.id, bed, type: 'view_resident' });
                      } else if (bed.status === 'maintenance') {
                        setActiveBedAction({ floorId: activeRoomFloor.id, roomId: activeRoom.id, bed, type: 'view_maintenance' });
                      } else if (bed.status === 'reserved') {
                        setActiveBedAction({ floorId: activeRoomFloor.id, roomId: activeRoom.id, bed, type: 'view_reserved' });
                      } else {
                        // vacant bed options popup
                        setActiveBedAction({ floorId: activeRoomFloor.id, roomId: activeRoom.id, bed, type: 'options' });
                      }
                    }}
                    style={{
                      background: cardBg,
                      border: `1.5px solid ${borderColor}`,
                      borderRadius: '12px',
                      padding: '12px',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>{bed.bedNumber}</span>
                      <span style={{ fontSize: '10px', fontWeight: 700, background: statusBadgeBg, color: statusTextColor, padding: '2px 6px', borderRadius: '10px' }}>
                        {statusLabel}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <IconComponent size={14} color={statusTextColor} />
                      </div>
                      <div style={{ overflow: 'hidden' }}>
                        {bed.status === 'occupied' ? (
                          <>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                              {bed.resident?.name || 'Resident'}
                            </div>
                            <div style={{ fontSize: '10px', color: '#64748B' }}>Tap to view details</div>
                          </>
                        ) : bed.status === 'maintenance' ? (
                          <>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: '#9B1C1C', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                              Under Maintenance
                            </div>
                            <div style={{ fontSize: '10px', color: '#9B1C1C' }}>Tap for actions</div>
                          </>
                        ) : bed.status === 'reserved' ? (
                          <>
                            <div style={{ fontSize: '11px', fontWeight: 600, color: '#92400E', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                              {bed.reservedFor || 'Reserved'}
                            </div>
                            <div style={{ fontSize: '10px', color: '#92400E' }}>Tap for actions</div>
                          </>
                        ) : (
                          <>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: '#1E429F' }}>Available</div>
                            <div style={{ fontSize: '10px', color: '#3B82F6' }}>Tap to assign</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/*  VACANT BED ACTIONS POPUP (Assign, Maintenance, Reserved)           */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeBedAction?.type === 'options' && (
        <div style={{ position: 'fixed', top: '44px', left: 0, right: 0, bottom: '64px', zIndex: 1100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '360px', borderRadius: '16px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>Options for {activeBedAction.bed.bedNumber}</h3>
              <button onClick={() => setActiveBedAction(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => {
                  setAssignForm({
                    name: '',
                    phone: '',
                    altPhone: '',
                    address: '',
                    aadhaarNumber: '',
                    email: '',
                    password: '',
                    photoUrl: '',
                    checkInDate: new Date().toISOString().split('T')[0],
                    rentAmount: activeRoom?.rentPerMonth || 8000
                  });
                  setActiveBedAction({ ...activeBedAction, type: 'assign' });
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F0FDF4', border: '1px solid #86EFAC', padding: '12px', borderRadius: '10px', cursor: 'pointer', textAlign: 'left' }}
              >
                <User size={20} color="#10B981" />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#065F46' }}>Assign Resident</div>
                  <div style={{ fontSize: '11px', color: '#047857' }}>Mark bed as occupied (Green)</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setMaintenanceForm({ reason: '' });
                  setActiveBedAction({ ...activeBedAction, type: 'maintenance' });
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#FEF2F2', border: '1px solid #FCA5A5', padding: '12px', borderRadius: '10px', cursor: 'pointer', textAlign: 'left' }}
              >
                <Wrench size={20} color="#EF4444" />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#991B1B' }}>Put in Maintenance</div>
                  <div style={{ fontSize: '11px', color: '#B91C1C' }}>Mark bed under repair (Red)</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setReservedForm({ reservedFor: '', untilDate: '' });
                  setActiveBedAction({ ...activeBedAction, type: 'reserved' });
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#FFFBEB', border: '1px solid #FDE68A', padding: '12px', borderRadius: '10px', cursor: 'pointer', textAlign: 'left' }}
              >
                <Clock size={20} color="#F97316" />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#9A3412' }}>Put in Reserved</div>
                  <div style={{ fontSize: '11px', color: '#C2410C' }}>Reserve for upcoming resident (Orange)</div>
                </div>
              </button>

              <div style={{ paddingTop: '6px', display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setEditingBed({ floorId: activeBedAction.floorId, roomId: activeBedAction.roomId, bed: activeBedAction.bed })}
                  style={{ flex: 1, background: '#F1F5F9', border: 'none', padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Rename Bed
                </button>
                <button
                  onClick={() => handleDeleteBed(activeBedAction.floorId, activeBedAction.roomId, activeBedAction.bed.id)}
                  style={{ background: '#FEF2F2', color: '#EF4444', border: 'none', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Delete Bed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── ASSIGN RESIDENT FORM MODAL (TENANT DETAILS & ASSIGN - STEP 5 FLOW MATCH) ── */}
      {activeBedAction?.type === 'assign' && (
        <div style={{ position: 'fixed', top: '44px', left: 0, right: 0, bottom: '64px', zIndex: 1100, background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '420px', maxHeight: '100%', borderRadius: '20px', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)', overflow: 'hidden' }}>
            
            {/* Modal Header - Fixed Sticky */}
            <div style={{ padding: '14px 16px 12px 16px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', flexShrink: 0 }}>
              <button onClick={() => setActiveBedAction(null)} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F1F5F9', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <ArrowLeft size={16} color="#334155" />
              </button>

              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#EFF6FF', color: '#2563EB', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '12px', marginBottom: '2px' }}>
                  <Sparkles size={11} /> STEP 5 OF 5
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>Tenant Details & Assign</h3>
              </div>

              <button onClick={() => setActiveBedAction(null)} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F1F5F9', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={16} color="#64748B" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div style={{ padding: '16px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* ALLOCATION SUMMARY Card */}
              <div style={{ background: '#EFF6FF', border: '1px solid #DBEAFE', borderRadius: '12px', padding: '10px 12px' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#1D4ED8', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  ALLOCATION SUMMARY
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, color: '#334155' }}>
                    Happy Hostels
                  </span>
                  <span style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, color: '#334155' }}>
                    Room {activeRoom?.roomNumber} ({activeBedAction.bed.bedNumber})
                  </span>
                  <span style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, color: '#334155' }}>
                    {activeRoom?.sharingType}
                  </span>
                  <span style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, color: '#2563EB' }}>
                    ₹{assignForm.rentAmount}/mo
                  </span>
                </div>
              </div>

              {/* Form Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                
                {/* Upload Image Input */}
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '3px', display: 'block' }}>Upload Image / Photo</label>
                  {assignForm.photoUrl ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', border: '1px solid #CBD5E1', padding: '8px 10px', borderRadius: '8px' }}>
                      <img
                        src={assignForm.photoUrl}
                        alt="Profile preview"
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #2563EB' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>Photo Uploaded</div>
                        <div style={{ fontSize: '10px', color: '#16A34A', fontWeight: 600 }}>Ready to save</div>
                      </div>
                      <label style={{ cursor: 'pointer', background: '#EFF6FF', color: '#2563EB', padding: '5px 9px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Upload size={12} /> Change
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => setAssignForm(prev => ({ ...prev, photoUrl: reader.result as string }));
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setAssignForm(prev => ({ ...prev, photoUrl: '' }))}
                        style={{ background: '#FEE2E2', color: '#EF4444', border: 'none', padding: '5px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <label style={{
                        border: '2px dashed #CBD5E1',
                        borderRadius: '10px',
                        padding: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        background: '#F8FAFC'
                      }}>
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => setAssignForm(prev => ({ ...prev, photoUrl: reader.result as string }));
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Camera size={16} color="#2563EB" />
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', fontWeight: 700, color: '#1E293B' }}>Upload Image Input</div>
                          <div style={{ fontSize: '9px', color: '#64748B' }}>Click to select photo</div>
                        </div>
                      </label>

                      <button
                        type="button"
                        onClick={() => setIsLiveCameraOpen(true)}
                        style={{
                          border: '2px dashed #93C5FD',
                          borderRadius: '10px',
                          padding: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          background: '#EFF6FF',
                          textAlign: 'left'
                        }}
                      >
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Camera size={16} color="#FFFFFF" />
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', fontWeight: 800, color: '#1E40AF' }}>📷 Live Camera</div>
                          <div style={{ fontSize: '9px', color: '#2563EB', fontWeight: 600 }}>Snap live photo</div>
                        </div>
                      </button>
                    </div>
                  )}

                  {/* Live Camera Capture Modal */}
                  <LiveCameraModal
                    isOpen={isLiveCameraOpen}
                    onClose={() => setIsLiveCameraOpen(false)}
                    onCapture={(photoDataUrl) => setAssignForm(prev => ({ ...prev, photoUrl: photoDataUrl }))}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '3px', display: 'block' }}>Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Aarav Sharma"
                    value={assignForm.name}
                    onChange={(e) => setAssignForm({ ...assignForm, name: e.target.value })}
                    style={{ width: '100%', padding: '9px 11px', fontSize: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '3px', display: 'block' }}>Password *</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showAssignPassword ? 'text' : 'password'}
                      placeholder="Enter tenant password (e.g. Pass@1234)"
                      value={assignForm.password}
                      onChange={(e) => setAssignForm({ ...assignForm, password: e.target.value })}
                      style={{ width: '100%', padding: '9px 34px 9px 11px', fontSize: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowAssignPassword(!showAssignPassword)}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#64748B',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {showAssignPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '3px', display: 'block' }}>Mobile Number *</label>
                  <input
                    type="text"
                    placeholder="e.g. 9876543210"
                    value={assignForm.phone}
                    onChange={(e) => setAssignForm({ ...assignForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '9px 11px', fontSize: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '3px', display: 'block' }}>Alternative Mobile Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 9876543211"
                    value={assignForm.altPhone}
                    onChange={(e) => setAssignForm({ ...assignForm, altPhone: e.target.value })}
                    style={{ width: '100%', padding: '9px 11px', fontSize: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '3px', display: 'block' }}>Native Address</label>
                  <input
                    type="text"
                    placeholder="e.g. H.No 4-12, Main Road, Vijayawada, AP"
                    value={assignForm.address}
                    onChange={(e) => setAssignForm({ ...assignForm, address: e.target.value })}
                    style={{ width: '100%', padding: '9px 11px', fontSize: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '3px', display: 'block' }}>Aadhar No. *</label>
                  <input
                    type="text"
                    placeholder="e.g. 1234 5678 9012"
                    value={assignForm.aadhaarNumber}
                    onChange={(e) => setAssignForm({ ...assignForm, aadhaarNumber: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', fontSize: '13px', borderRadius: '10px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '4px', display: 'block' }}>Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. aarav@example.com"
                    value={assignForm.email}
                    onChange={(e) => setAssignForm({ ...assignForm, email: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', fontSize: '13px', borderRadius: '10px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '4px', display: 'block' }}>Joining Date</label>
                    <input
                      type="date"
                      value={assignForm.checkInDate}
                      onChange={(e) => setAssignForm({ ...assignForm, checkInDate: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', fontSize: '13px', borderRadius: '10px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '3px', display: 'block' }}>Monthly Rent (₹)</label>
                    <input
                      type="number"
                      value={assignForm.rentAmount}
                      onChange={(e) => setAssignForm({ ...assignForm, rentAmount: Number(e.target.value) })}
                      style={{ width: '100%', padding: '9px 11px', fontSize: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Fixed Footer Button */}
            <div style={{ padding: '12px 16px', borderTop: '1px solid #E2E8F0', background: '#FFFFFF', flexShrink: 0 }}>
              <button
                onClick={handleAssignResidentSubmit}
                style={{
                  width: '100%',
                  background: '#2563EB',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
                }}
              >
                <CheckCircle2 size={18} /> Assign & Save User
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── MAINTENANCE FORM MODAL ── */}
      {activeBedAction?.type === 'maintenance' && (
        <div style={{ position: 'fixed', top: '44px', left: 0, right: 0, bottom: '64px', zIndex: 1100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '360px', borderRadius: '16px', padding: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 10px 0' }}>Put {activeBedAction.bed.bedNumber} in Maintenance</h3>
            <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 12px 0' }}>This bed will be marked in Red (Under Repair).</p>
            <input
              type="text"
              placeholder="Reason (e.g. Plumbing issue, painting...)"
              value={maintenanceForm.reason}
              onChange={(e) => setMaintenanceForm({ reason: e.target.value })}
              style={{ width: '100%', padding: '9px 10px', fontSize: '13px', borderRadius: '8px', border: '1px solid #CBD5E1', marginBottom: '14px', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setActiveBedAction(null)} style={{ flex: 1, background: '#F1F5F9', border: 'none', padding: '9px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={handlePutInMaintenanceSubmit} style={{ flex: 1, background: '#EF4444', color: '#FFFFFF', border: 'none', padding: '9px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                Set Maintenance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── RESERVED FORM MODAL ── */}
      {activeBedAction?.type === 'reserved' && (
        <div style={{ position: 'fixed', top: '44px', left: 0, right: 0, bottom: '64px', zIndex: 1100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '360px', borderRadius: '16px', padding: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 10px 0' }}>Put {activeBedAction.bed.bedNumber} in Reserved</h3>
            <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 12px 0' }}>This bed will be marked in Orange.</p>
            <input
              type="text"
              placeholder="Reserved for name (e.g. S. Kumar)"
              value={reservedForm.reservedFor}
              onChange={(e) => setReservedForm({ ...reservedForm, reservedFor: e.target.value })}
              style={{ width: '100%', padding: '9px 10px', fontSize: '13px', borderRadius: '8px', border: '1px solid #CBD5E1', marginBottom: '10px', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setActiveBedAction(null)} style={{ flex: 1, background: '#F1F5F9', border: 'none', padding: '9px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={handlePutInReservedSubmit} style={{ flex: 1, background: '#F97316', color: '#FFFFFF', border: 'none', padding: '9px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                Confirm Reserve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── VIEW RESIDENT MODAL (GREEN BED) ── */}
      {activeBedAction?.type === 'view_resident' && (
        <div style={{ position: 'fixed', top: '44px', left: 0, right: 0, bottom: '64px', zIndex: 1100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '380px', borderRadius: '16px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#DEF7EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#03543F' }}>
                  <User size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>{activeBedAction.bed.resident?.name}</h3>
                  <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700 }}>Occupying {activeBedAction.bed.bedNumber}</span>
                </div>
              </div>
              <button onClick={() => setActiveBedAction(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0', marginBottom: '14px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div><strong>Phone:</strong> {activeBedAction.bed.resident?.phone}</div>
              <div><strong>Check-In Date:</strong> {activeBedAction.bed.resident?.checkInDate}</div>
              <div><strong>Course:</strong> {activeBedAction.bed.resident?.course || 'N/A'}</div>
              <div><strong>Rent Amount:</strong> ₹{activeBedAction.bed.resident?.rentAmount?.toLocaleString('en-IN')}/mo</div>
              <div><strong>Payment Status:</strong> <span style={{ color: '#10B981', fontWeight: 700 }}>{activeBedAction.bed.resident?.paymentStatus}</span></div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => handleUnassignResident(activeBedAction.floorId, activeBedAction.roomId, activeBedAction.bed.id)}
                style={{ flex: 1, background: '#FEF2F2', color: '#EF4444', border: '1px solid #FCA5A5', padding: '10px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
              >
                Unassign / Vacate Resident
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── VIEW MAINTENANCE MODAL (RED BED) ── */}
      {activeBedAction?.type === 'view_maintenance' && (
        <div style={{ position: 'fixed', top: '44px', left: 0, right: 0, bottom: '64px', zIndex: 1100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '360px', borderRadius: '16px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#FDE8E8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9B1C1C' }}>
                <Wrench size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>{activeBedAction.bed.bedNumber}</h3>
                <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: 700 }}>Under Maintenance</span>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#475569', background: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '14px' }}>
              <strong>Reason:</strong> {activeBedAction.bed.maintenanceReason || 'General Maintenance'}
            </p>

            <button
              onClick={() => handleRemoveFromMaintenance(activeBedAction.floorId, activeBedAction.roomId, activeBedAction.bed.id)}
              style={{ width: '100%', background: '#4F46E5', color: '#FFFFFF', border: 'none', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
            >
              Remove from Maintenance (Set Vacant)
            </button>
          </div>
        </div>
      )}

      {/* ── VIEW RESERVED MODAL (ORANGE BED) ── */}
      {activeBedAction?.type === 'view_reserved' && (
        <div style={{ position: 'fixed', top: '44px', left: 0, right: 0, bottom: '64px', zIndex: 1100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '360px', borderRadius: '16px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#92400E' }}>
                <Clock size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>{activeBedAction.bed.bedNumber}</h3>
                <span style={{ fontSize: '11px', color: '#F97316', fontWeight: 700 }}>Reserved</span>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#475569', background: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '14px' }}>
              <strong>Reserved For:</strong> {activeBedAction.bed.reservedFor || 'Upcoming Guest'}
            </p>

            <button
              onClick={() => handleRemoveFromReserved(activeBedAction.floorId, activeBedAction.roomId, activeBedAction.bed.id)}
              style={{ width: '100%', background: '#4F46E5', color: '#FFFFFF', border: 'none', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
            >
              Remove Reservation (Set Vacant)
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/*  ADD FLOOR WIZARD MODAL                                            */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {isAddFloorModalOpen && (
        <div style={{ position: 'fixed', top: '44px', left: 0, right: 0, bottom: '64px', zIndex: 1100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '440px', borderRadius: '16px', padding: '20px', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 800, margin: 0 }}>Add New Floor</h3>
              <button onClick={() => setIsAddFloorModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            {addFloorStep === 1 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>Floor Name / Number *</label>
                  <input
                    type="text"
                    value={newFloorName}
                    onChange={(e) => setNewFloorName(e.target.value)}
                    placeholder="e.g. Floor 4 or 4th Floor"
                    style={{ width: '100%', padding: '9px 10px', fontSize: '13px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>Number of Rooms to Create</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={newFloorRoomCount}
                    onChange={(e) => setNewFloorRoomCount(Number(e.target.value))}
                    style={{ width: '100%', padding: '9px 10px', fontSize: '13px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                  />
                </div>

                <button
                  onClick={handleProceedToAddFloorStep2}
                  style={{ marginTop: '8px', background: '#2563EB', color: '#FFFFFF', border: 'none', padding: '12px', borderRadius: '24px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)' }}
                >
                  Configure Rooms (Step 2) →
                </button>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 12px 0' }}>Configure details for each room on {newFloorName}:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '16px' }}>
                  {newFloorRoomsDraft.map((rm, idx) => (
                    <div key={idx} style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontWeight: 800, fontSize: '13px', color: '#0F172A', marginBottom: '8px' }}>Room #{idx + 1}</div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                        <div>
                          <label style={{ fontSize: '10px', fontWeight: 700, color: '#64748B' }}>Room No</label>
                          <input
                            type="text"
                            value={rm.roomNumber}
                            onChange={(e) => {
                              const updated = [...newFloorRoomsDraft];
                              updated[idx].roomNumber = e.target.value;
                              setNewFloorRoomsDraft(updated);
                            }}
                            style={{ width: '100%', padding: '6px 8px', fontSize: '12px', borderRadius: '6px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '10px', fontWeight: 700, color: '#64748B' }}>Sharing Type</label>
                          <select
                            value={rm.sharingType}
                            onChange={(e) => {
                              const updated = [...newFloorRoomsDraft];
                              updated[idx].sharingType = e.target.value;
                              const bedsCount = e.target.value.includes('Single')
                                ? 1
                                : e.target.value.includes('Double')
                                ? 2
                                : e.target.value.includes('Triple')
                                ? 3
                                : 4;
                              updated[idx].bedCount = bedsCount;
                              setNewFloorRoomsDraft(updated);
                            }}
                            style={{ width: '100%', padding: '6px 8px', fontSize: '12px', borderRadius: '6px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                          >
                            <option value="1-Sharing (Single)">1-Sharing (Single)</option>
                            <option value="2-Sharing (Double)">2-Sharing (Double)</option>
                            <option value="3-Sharing (Triple)">3-Sharing (Triple)</option>
                            <option value="4-Sharing (Quad)">4-Sharing (Quad)</option>
                          </select>
                        </div>
                      </div>

                      {/* Features Checkboxes */}
                      <label style={{ fontSize: '10px', fontWeight: 700, color: '#64748B' }}>Features</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginTop: '4px' }}>
                        {ALL_FEATURES.map((feat) => {
                          const isSelected = rm.features.includes(feat);
                          return (
                            <button
                              type="button"
                              key={feat}
                              onClick={() => {
                                const updated = [...newFloorRoomsDraft];
                                if (isSelected) {
                                  updated[idx].features = updated[idx].features.filter((f) => f !== feat);
                                } else {
                                  updated[idx].features.push(feat);
                                }
                                setNewFloorRoomsDraft(updated);
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                background: isSelected ? '#EEF2FF' : '#FFFFFF',
                                border: `1px solid ${isSelected ? '#818CF8' : '#CBD5E1'}`,
                                borderRadius: '4px',
                                padding: '4px 6px',
                                fontSize: '10px',
                                cursor: 'pointer',
                                textAlign: 'left',
                                color: isSelected ? '#4F46E5' : '#475569'
                              }}
                            >
                              {isSelected ? <CheckSquare size={12} color="#4F46E5" /> : <Square size={12} color="#94A3B8" />}
                              {feat}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setAddFloorStep(1)} style={{ flex: 1, background: '#F1F5F9', border: 'none', padding: '10px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                    ← Back
                  </button>
                  <button onClick={handleSaveNewFloor} style={{ flex: 1, background: '#2563EB', color: '#FFFFFF', border: 'none', padding: '12px', borderRadius: '24px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)' }}>
                    Create Floor & Rooms
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/*  ADD ROOM MODAL                                                    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {isAddRoomModalOpen && (
        <div style={{ position: 'fixed', top: '44px', left: 0, right: 0, bottom: '64px', zIndex: 1100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '400px', borderRadius: '16px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 800, margin: 0 }}>Add New Room</h3>
              <button onClick={() => setIsAddRoomModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>Room Number *</label>
                <input
                  type="text"
                  placeholder="e.g. 104"
                  value={newRoomDraft.roomNumber}
                  onChange={(e) => setNewRoomDraft({ ...newRoomDraft, roomNumber: e.target.value })}
                  style={{ width: '100%', padding: '9px 10px', fontSize: '13px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>Sharing Type</label>
                <select
                  value={newRoomDraft.sharingType}
                  onChange={(e) => {
                    const type = e.target.value;
                    const bedCount = type.includes('Single') ? 1 : type.includes('Double') ? 2 : type.includes('Triple') ? 3 : 4;
                    setNewRoomDraft({ ...newRoomDraft, sharingType: type, bedCount });
                  }}
                  style={{ width: '100%', padding: '9px 10px', fontSize: '13px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                >
                  <option value="1-Sharing (Single)">1-Sharing (Single)</option>
                  <option value="2-Sharing (Double)">2-Sharing (Double)</option>
                  <option value="3-Sharing (Triple)">3-Sharing (Triple)</option>
                  <option value="4-Sharing (Quad)">4-Sharing (Quad)</option>
                </select>
              </div>

              {/* Features selection */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>Room Features</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '6px' }}>
                  {ALL_FEATURES.map((feat) => {
                    const isSel = newRoomDraft.features.includes(feat);
                    return (
                      <button
                        type="button"
                        key={feat}
                        onClick={() => {
                          if (isSel) {
                            setNewRoomDraft({ ...newRoomDraft, features: newRoomDraft.features.filter((f) => f !== feat) });
                          } else {
                            setNewRoomDraft({ ...newRoomDraft, features: [...newRoomDraft.features, feat] });
                          }
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: isSel ? '#EEF2FF' : '#F8FAFC',
                          border: `1px solid ${isSel ? '#818CF8' : '#CBD5E1'}`,
                          borderRadius: '6px',
                          padding: '6px',
                          fontSize: '11px',
                          cursor: 'pointer',
                          textAlign: 'left',
                          color: isSel ? '#4F46E5' : '#475569'
                        }}
                      >
                        {isSel ? <CheckSquare size={14} color="#4F46E5" /> : <Square size={14} color="#94A3B8" />}
                        {feat}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={handleSaveNewRoom}
                style={{ marginTop: '8px', background: '#2563EB', color: '#FFFFFF', border: 'none', padding: '12px', borderRadius: '24px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)' }}
              >
                Save Room
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/*  EDIT FLOOR MODAL                                                  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {editingFloor && (
        <div style={{ position: 'fixed', top: '44px', left: 0, right: 0, bottom: '64px', zIndex: 1200, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '360px', borderRadius: '16px', padding: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 12px 0' }}>Edit Floor Name</h3>
            <input
              type="text"
              value={editingFloor.floorNumber}
              onChange={(e) => setEditingFloor({ ...editingFloor, floorNumber: e.target.value })}
              style={{ width: '100%', padding: '9px 10px', fontSize: '13px', borderRadius: '8px', border: '1px solid #CBD5E1', marginBottom: '14px', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setEditingFloor(null)} style={{ flex: 1, background: '#F1F5F9', border: 'none', padding: '9px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={handleEditFloorSave} style={{ flex: 1, background: '#4F46E5', color: '#FFFFFF', border: 'none', padding: '9px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/*  EDIT ROOM MODAL                                                   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {editingRoom && (
        <div style={{ position: 'fixed', top: '44px', left: 0, right: 0, bottom: '64px', zIndex: 1200, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '380px', borderRadius: '16px', padding: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 12px 0' }}>Edit Room Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569' }}>Room Number</label>
                <input
                  type="text"
                  value={editingRoom.room.roomNumber}
                  onChange={(e) => setEditingRoom({ ...editingRoom, room: { ...editingRoom.room, roomNumber: e.target.value } })}
                  style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569' }}>Sharing Type</label>
                <select
                  value={editingRoom.room.sharingType}
                  onChange={(e) => setEditingRoom({ ...editingRoom, room: { ...editingRoom.room, sharingType: e.target.value } })}
                  style={{ width: '100%', padding: '8px 10px', fontSize: '13px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }}
                >
                  <option value="1-Sharing (Single)">1-Sharing (Single)</option>
                  <option value="2-Sharing (Double)">2-Sharing (Double)</option>
                  <option value="3-Sharing (Triple)">3-Sharing (Triple)</option>
                  <option value="4-Sharing (Quad)">4-Sharing (Quad)</option>
                </select>
              </div>

              {/* Room Features selection */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569' }}>Room Features</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '6px' }}>
                  {ALL_FEATURES.map((feat) => {
                    const isSel = editingRoom.room.features.includes(feat);
                    return (
                      <button
                        type="button"
                        key={feat}
                        onClick={() => {
                          if (isSel) {
                            setEditingRoom({
                              ...editingRoom,
                              room: {
                                ...editingRoom.room,
                                features: editingRoom.room.features.filter((f) => f !== feat)
                              }
                            });
                          } else {
                            setEditingRoom({
                              ...editingRoom,
                              room: {
                                ...editingRoom.room,
                                features: [...editingRoom.room.features, feat]
                              }
                            });
                          }
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: isSel ? '#EEF2FF' : '#F8FAFC',
                          border: `1px solid ${isSel ? '#818CF8' : '#CBD5E1'}`,
                          borderRadius: '6px',
                          padding: '6px',
                          fontSize: '11px',
                          cursor: 'pointer',
                          textAlign: 'left',
                          color: isSel ? '#4F46E5' : '#475569'
                        }}
                      >
                        {isSel ? <CheckSquare size={14} color="#4F46E5" /> : <Square size={14} color="#94A3B8" />}
                        {feat}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button onClick={() => setEditingRoom(null)} style={{ flex: 1, background: '#F1F5F9', border: 'none', padding: '9px', borderRadius: '24px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button onClick={handleEditRoomSave} style={{ flex: 1, background: '#2563EB', color: '#FFFFFF', border: 'none', padding: '9px', borderRadius: '24px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)' }}>
                  Save Room
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/*  EDIT BED MODAL                                                    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {editingBed && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1200, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '360px', borderRadius: '16px', padding: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 12px 0' }}>Edit Bed Label</h3>
            <input
              type="text"
              value={editingBed.bed.bedNumber}
              onChange={(e) => setEditingBed({ ...editingBed, bed: { ...editingBed.bed, bedNumber: e.target.value } })}
              style={{ width: '100%', padding: '9px 10px', fontSize: '13px', borderRadius: '8px', border: '1px solid #CBD5E1', marginBottom: '14px', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setEditingBed(null)} style={{ flex: 1, background: '#F1F5F9', border: 'none', padding: '9px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={handleEditBedSave} style={{ flex: 1, background: '#4F46E5', color: '#FFFFFF', border: 'none', padding: '9px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                Save Bed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/*  DELETE CONFIRMATION MODAL                                         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {deleteConfirm && (
        <div style={{ position: 'fixed', top: '44px', left: 0, right: 0, bottom: '64px', zIndex: 1300, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '340px', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#FEF2F2', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
              <AlertTriangle size={24} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 6px 0' }}>Delete {deleteConfirm.type}?</h3>
            <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 16px 0' }}>
              Are you sure you want to delete <strong>{deleteConfirm.title}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ flex: 1, background: '#F1F5F9', border: 'none', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteConfirm.type === 'floor') {
                    handleDeleteFloor(deleteConfirm.id);
                  } else if (deleteConfirm.type === 'room' && deleteConfirm.floorId) {
                    handleDeleteRoom(deleteConfirm.floorId, deleteConfirm.id);
                  }
                }}
                style={{ flex: 1, background: '#EF4444', color: '#FFFFFF', border: 'none', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
