export interface MenuItem {
  breakfast: string;
  lunch: string;
  snacks: string;
  dinner: string;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type WeeklyMenu = Record<DayOfWeek, MenuItem>;

export interface PantryItem {
  id: string;
  name: string;
  unit: string;
  price: number;
  stock: number;
  threshold: number;
  supplier: string;
}

export interface KitchenExpense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  status: 'Paid' | 'Pending';
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  itemsSupplied: string;
  address: string;
  lastDeliveryDate: string;
  paymentStatus: 'Paid' | 'Pending' | 'Overdue';
}

// Hostel Management Redesign Data Models
export interface HostelAnnouncement {
  id: string;
  title: string;
  category: 'General' | 'Maintenance' | 'Food & Mess' | 'Urgent';
  date: string;
  author: string;
  content: string;
  pinned?: boolean;
}

export interface FloorOccupancy {
  floor: string;
  totalBeds: number;
  occupiedBeds: number;
  percentage: number;
}

export interface HostelStat {
  totalHostels: number;
  totalRooms: number;
  totalBeds: number;
  occupiedBeds: number;
  vacantBeds: number;
  totalResidents: number;
  pendingRequests: number;
  todayCheckIns: number;
  todayCheckOuts: number;
  monthlyRevenue: number;
  collectedRevenue: number;
  pendingRevenue: number;
}

export type RoomSharingType = 'Single AC' | 'Double Attached' | 'Triple Shared' | '4-Sharing';
export type RoomOccupancyStatus = 'Occupied' | 'Partially Occupied' | 'Vacant' | 'Maintenance';

export interface ResidentInfo {
  name: string;
  phone: string;
  checkInDate: string;
  course: string;
}

export interface HostelRoom {
  id: string;
  roomNumber: string;
  floor: '1st Floor' | '2nd Floor' | '3rd Floor';
  sharingType: RoomSharingType;
  status: RoomOccupancyStatus;
  totalBeds: number;
  occupiedBeds: number;
  vacantBeds: number;
  residents: ResidentInfo[];
  rentPerMonth: number;
  facilities: string[];
}

export type RequestType = 'Room Request' | 'Maintenance' | 'Complaint' | 'Leave Request' | 'Sick Meal' | 'Skip Meal' | 'Special Timing';
export type RequestStatus = 'Pending' | 'Approved' | 'Rejected' | 'Completed';

export interface ResidentRequest {
  id: string;
  residentName: string;
  roomNumber: string;
  type: RequestType;
  details: string;
  status: RequestStatus;
  date: string;
  priority: 'High' | 'Medium' | 'Low';
  avatarBg?: string;
}

export type PaymentStatus = 'Paid' | 'Pending' | 'Partial' | 'Overdue';

export interface FeeHistoryItem {
  id: string;
  date: string;
  amountPaid: number;
  paymentMethod: string;
  receiptNo: string;
}

export interface MonthRentRecord {
  id: string;
  monthName: string;
  isCurrentMonth?: boolean;
  dateRange: string;
  amount: number;
  amountPaid: number;
  dues: number;
  status: PaymentStatus;
  lastPaymentDate?: string;
  history?: FeeHistoryItem[];
}

export interface FeeTransaction {
  id: string;
  studentName: string;
  roomNumber: string;
  month: string;
  amount: number; // total monthly rent / fee
  amountPaid: number;
  dues: number;
  status: PaymentStatus;
  date: string;
  uploadedDate?: string;
  lastPaymentDate?: string;
  paymentMethod?: string;
  phone: string;
  history?: FeeHistoryItem[];
  monthlyRecords?: MonthRentRecord[];
}

export interface ActivityItem {
  id: string;
  time: string;
  title: string;
  description: string;
  category: 'checkin' | 'request' | 'payment' | 'maintenance';
}

// New Room Management Redesign Data Models
export type BedStatus = 'occupied' | 'vacant' | 'maintenance' | 'reserved';

export interface BedResident {
  id: string;
  name: string;
  phone: string;
  checkInDate: string;
  course?: string;
  rentAmount?: number;
  paymentStatus?: 'Paid' | 'Pending' | 'Overdue';
  emergencyContact?: string;
  email?: string;
  address?: string;
  aadhaarNumber?: string;
  password?: string;
  photoUrl?: string;
}

export interface BedModel {
  id: string;
  bedNumber: string;
  status: BedStatus;
  resident?: BedResident;
  maintenanceReason?: string;
  reservedFor?: string;
  reservedUntil?: string;
}

export interface RoomModel {
  id: string;
  roomNumber: string;
  floorId: string;
  sharingType: string;
  features: string[];
  beds: BedModel[];
  rentPerMonth?: number;
}

export interface FloorModel {
  id: string;
  floorNumber: string;
  rooms: RoomModel[];
}

