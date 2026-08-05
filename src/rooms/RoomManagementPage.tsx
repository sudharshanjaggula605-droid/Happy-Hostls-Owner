import React, { useState, useEffect } from 'react';
import {
  BedDouble,
  Users,
  Key,
  Wrench,
  ChevronRight,
  Plus,
  Search,
  Filter,
  ArrowLeft,
  MoreVertical,
  Wifi,
  Tv,
  Bath,
  FileText,
  Bell,
  X,
  Building,
  DoorOpen,
  Download,
  Settings as SettingsIcon,
  HelpCircle,
  LogOut
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────── */
/*  DATA TYPES                                                                */
/* ─────────────────────────────────────────────────────────────────────────── */
export type BedStatus = 'vacant' | 'reserved' | 'occupied' | 'maintenance';

export interface Student {
  name: string;
  phone: string;
  checkInDate: string;
  duration: number; // in months
  monthlyRent: number;
  advancePaid: boolean | number;
  notes?: string;
}

export interface Bed {
  id: string;
  bedNumber: string; // e.g. "B101-A", "B101-B"
  bedType: string; // e.g. "Single Bed", "Bunk Bed"
  status: BedStatus;
  sortIndex: number;
  monthlyRent: number;
  student?: Student;
}

export interface Room {
  id: string;
  roomNumber: string;
  floorId: string;
  floorName: string;
  roomType: string; // e.g. "Single Sharing", "Double Sharing"
  monthlyRent: number;
  description?: string;
  amenities: string[];
  beds: Bed[];
}

export interface Floor {
  id: string;
  floorName: string;
  totalRooms: number;
  totalBeds: number;
  rooms: Room[];
}

export interface Hostel {
  id: string;
  name: string;
  floors: Floor[];
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  LOCAL STORAGE KEYS                                                        */
/* ─────────────────────────────────────────────────────────────────────────── */
const STORAGE_HOSTELS_KEY = 'happyhostel_room_management_hostels_list';
const STORAGE_ACTIVE_ID_KEY = 'happyhostel_room_management_active_id';

/* ─────────────────────────────────────────────────────────────────────────── */
/*  SEED DATA EXACTLY MATCHING REFERENCE MOCKUPS                              */
/* ─────────────────────────────────────────────────────────────────────────── */
const DEFAULT_HOSTELS: Hostel[] = [
  {
    id: 'h-1',
    name: 'HappyHostel Main Branch',
    floors: [
      {
        id: 'f-1',
        floorName: 'Floor 1',
        totalRooms: 20,
        totalBeds: 40,
        rooms: [
          {
            id: 'r-101',
            roomNumber: 'Room 101',
            floorId: 'f-1',
            floorName: 'Floor 1',
            roomType: 'Single Sharing',
            monthlyRent: 8000,
            description: 'Well furnished single sharing room with attached bathroom.',
            amenities: ['Wi-Fi', 'AC', 'Attached Bath', 'Wardrobe'],
            beds: [
              {
                id: 'b-101-a',
                bedNumber: 'B101-A',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 1,
                monthlyRent: 8000,
                student: {
                  name: 'Rohit Sharma',
                  phone: '9876543210',
                  checkInDate: '01 May 2024',
                  duration: 12,
                  monthlyRent: 8000,
                  advancePaid: true,
                  notes: 'Standard resident'
                }
              },
              {
                id: 'b-101-b',
                bedNumber: 'B101-B',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 2,
                monthlyRent: 8000,
                student: {
                  name: 'Aman Verma',
                  phone: '9876543211',
                  checkInDate: '10 Apr 2024',
                  duration: 12,
                  monthlyRent: 8000,
                  advancePaid: true
                }
              }
            ]
          },
          {
            id: 'r-102',
            roomNumber: 'Room 102',
            floorId: 'f-1',
            floorName: 'Floor 1',
            roomType: 'Double Sharing',
            monthlyRent: 6500,
            amenities: ['Wi-Fi', 'Attached Bath'],
            beds: [
              {
                id: 'b-102-a',
                bedNumber: 'B102-A',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 1,
                monthlyRent: 6500,
                student: {
                  name: 'Vikas Kumar',
                  phone: '9876522334',
                  checkInDate: '15 Jan 2024',
                  duration: 6,
                  monthlyRent: 6500,
                  advancePaid: true
                }
              },
              {
                id: 'b-102-b',
                bedNumber: 'B102-B',
                bedType: 'Single Bed',
                status: 'vacant',
                sortIndex: 2,
                monthlyRent: 6500
              }
            ]
          },
          {
            id: 'r-103',
            roomNumber: 'Room 103',
            floorId: 'f-1',
            floorName: 'Floor 1',
            roomType: 'Double Sharing',
            monthlyRent: 6500,
            amenities: ['Wi-Fi'],
            beds: [
              { id: 'b-103-a', bedNumber: 'B103-A', bedType: 'Single Bed', status: 'vacant', sortIndex: 1, monthlyRent: 6500 },
              { id: 'b-103-b', bedNumber: 'B103-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 6500 }
            ]
          },
          {
            id: 'r-104',
            roomNumber: 'Room 104',
            floorId: 'f-1',
            floorName: 'Floor 1',
            roomType: 'Double Sharing',
            monthlyRent: 6500,
            amenities: ['Wi-Fi', 'AC'],
            beds: [
              {
                id: 'b-104-a',
                bedNumber: 'B104-A',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 1,
                monthlyRent: 6500,
                student: {
                  name: 'Kavya Nair',
                  phone: '9876533445',
                  checkInDate: '20 Feb 2024',
                  duration: 12,
                  monthlyRent: 6500,
                  advancePaid: true
                }
              },
              {
                id: 'b-104-b',
                bedNumber: 'B104-B',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 2,
                monthlyRent: 6500,
                student: {
                  name: 'Priya Singh',
                  phone: '9876555443',
                  checkInDate: '05 Mar 2024',
                  duration: 12,
                  monthlyRent: 6500,
                  advancePaid: true
                }
              }
            ]
          },
          {
            id: 'r-105',
            roomNumber: 'Room 105',
            floorId: 'f-1',
            floorName: 'Floor 1',
            roomType: 'Double Sharing',
            monthlyRent: 6500,
            amenities: ['Wi-Fi'],
            beds: [
              {
                id: 'b-105-a',
                bedNumber: 'B105-A',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 1,
                monthlyRent: 6500,
                student: {
                  name: 'Siddharth Rao',
                  phone: '9876577889',
                  checkInDate: '12 Apr 2024',
                  duration: 12,
                  monthlyRent: 6500,
                  advancePaid: true
                }
              },
              { id: 'b-105-b', bedNumber: 'B105-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 6500 }
            ]
          },
          {
            id: 'r-106',
            roomNumber: 'Room 106',
            floorId: 'f-1',
            floorName: 'Floor 1',
            roomType: 'Double Sharing',
            monthlyRent: 6500,
            amenities: ['Wi-Fi'],
            beds: [
              { id: 'b-106-a', bedNumber: 'B106-A', bedType: 'Single Bed', status: 'vacant', sortIndex: 1, monthlyRent: 6500 },
              { id: 'b-106-b', bedNumber: 'B106-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 6500 }
            ]
          }
        ]
      },
      {
        id: 'f-2',
        floorName: 'Floor 2',
        totalRooms: 18,
        totalBeds: 36,
        rooms: [
          {
            id: 'r-201',
            roomNumber: 'Room 201',
            floorId: 'f-2',
            floorName: 'Floor 2',
            roomType: 'Single Sharing',
            monthlyRent: 7500,
            amenities: ['Wi-Fi', 'AC'],
            beds: [
              {
                id: 'b-201-a',
                bedNumber: 'B201-A',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 1,
                monthlyRent: 7500,
                student: {
                  name: 'Amit Verma',
                  phone: '9876543212',
                  checkInDate: '01 Jan 2024',
                  duration: 12,
                  monthlyRent: 7500,
                  advancePaid: true
                }
              },
              {
                id: 'b-201-b',
                bedNumber: 'B201-B',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 2,
                monthlyRent: 7500,
                student: {
                  name: 'Rohan Mehta',
                  phone: '9876511223',
                  checkInDate: '10 Feb 2024',
                  duration: 12,
                  monthlyRent: 7500,
                  advancePaid: true
                }
              }
            ]
          },
          {
            id: 'r-202',
            roomNumber: 'Room 202',
            floorId: 'f-2',
            floorName: 'Floor 2',
            roomType: 'Double Sharing',
            monthlyRent: 6500,
            amenities: ['Wi-Fi'],
            beds: [
              {
                id: 'b-202-a',
                bedNumber: 'B202-A',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 1,
                monthlyRent: 6500,
                student: {
                  name: 'Anish Giri',
                  phone: '9876599887',
                  checkInDate: '25 Mar 2024',
                  duration: 6,
                  monthlyRent: 6500,
                  advancePaid: true
                }
              },
              { id: 'b-202-b', bedNumber: 'B202-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 6500 }
            ]
          },
          {
            id: 'r-205',
            roomNumber: 'Room 205',
            floorId: 'f-2',
            floorName: 'Floor 2',
            roomType: 'Double Sharing',
            monthlyRent: 8000,
            amenities: ['Wi-Fi', 'AC', 'Attached Bath'],
            beds: [
              {
                id: 'b-205-a',
                bedNumber: 'B205-A',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 1,
                monthlyRent: 8000,
                student: {
                  name: 'Aman Verma',
                  phone: '9876543211',
                  checkInDate: '10 Apr 2024',
                  duration: 12,
                  monthlyRent: 8000,
                  advancePaid: true,
                  notes: 'Premium resident'
                }
              },
              {
                id: 'b-205-b',
                bedNumber: 'B205-B',
                bedType: 'Single Bed',
                status: 'vacant',
                sortIndex: 2,
                monthlyRent: 8000
              },
              {
                id: 'b-205-c',
                bedNumber: 'B205-C',
                bedType: 'Single Bed',
                status: 'vacant',
                sortIndex: 3,
                monthlyRent: 8000
              }
            ]
          }
        ]
      },
      {
        id: 'f-3',
        floorName: 'Floor 3',
        totalRooms: 4,
        totalBeds: 8,
        rooms: [
          {
            id: 'r-301',
            roomNumber: 'Room 301',
            floorId: 'f-3',
            floorName: 'Floor 3',
            roomType: 'Single Sharing',
            monthlyRent: 7500,
            amenities: ['Wi-Fi', 'AC'],
            beds: [
              {
                id: 'b-301-a',
                bedNumber: 'B301-A',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 1,
                monthlyRent: 7500,
                student: {
                  name: 'Arjun Reddy',
                  phone: '9876500998',
                  checkInDate: '15 Mar 2024',
                  duration: 12,
                  monthlyRent: 7500,
                  advancePaid: true
                }
              },
              { id: 'b-301-b', bedNumber: 'B301-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 7500 }
            ]
          },
          {
            id: 'r-302',
            roomNumber: 'Room 302',
            floorId: 'f-3',
            floorName: 'Floor 3',
            roomType: 'Double Sharing',
            monthlyRent: 6500,
            amenities: ['Wi-Fi', 'Attached Bath'],
            beds: [
              {
                id: 'b-302-a',
                bedNumber: 'B302-A',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 1,
                monthlyRent: 6500,
                student: {
                  name: 'Manish Malhotra',
                  phone: '9876588776',
                  checkInDate: '01 Apr 2024',
                  duration: 6,
                  monthlyRent: 6500,
                  advancePaid: true
                }
              },
              { id: 'b-302-b', bedNumber: 'B302-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 6500 }
            ]
          },
          {
            id: 'r-303',
            roomNumber: 'Room 303',
            floorId: 'f-3',
            floorName: 'Floor 3',
            roomType: 'Double Sharing',
            monthlyRent: 6500,
            amenities: ['Wi-Fi'],
            beds: [
              { id: 'b-303-a', bedNumber: 'B303-A', bedType: 'Single Bed', status: 'vacant', sortIndex: 1, monthlyRent: 6500 },
              { id: 'b-303-b', bedNumber: 'B303-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 6500 }
            ]
          },
          {
            id: 'r-312',
            roomNumber: 'Room 312',
            floorId: 'f-3',
            floorName: 'Floor 3',
            roomType: 'Single Sharing',
            monthlyRent: 7500,
            amenities: ['Wi-Fi'],
            beds: [
              { id: 'b-312-a', bedNumber: 'B312-A', bedType: 'Single Bed', status: 'maintenance', sortIndex: 1, monthlyRent: 7500 }
            ]
          }
        ]
      },
      {
        id: 'f-4',
        floorName: 'Floor 4',
        totalRooms: 3,
        totalBeds: 6,
        rooms: [
          {
            id: 'r-401',
            roomNumber: 'Room 401',
            floorId: 'f-4',
            floorName: 'Floor 4',
            roomType: 'Double Sharing',
            monthlyRent: 7000,
            amenities: ['Wi-Fi', 'AC'],
            beds: [
              {
                id: 'b-401-a',
                bedNumber: 'B401-A',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 1,
                monthlyRent: 7000,
                student: {
                  name: 'Tanmay Bhat',
                  phone: '9876512345',
                  checkInDate: '10 Feb 2024',
                  duration: 12,
                  monthlyRent: 7000,
                  advancePaid: true
                }
              },
              { id: 'b-401-b', bedNumber: 'B401-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 7000 }
            ]
          },
          {
            id: 'r-402',
            roomNumber: 'Room 402',
            floorId: 'f-4',
            floorName: 'Floor 4',
            roomType: 'Single Sharing',
            monthlyRent: 8500,
            amenities: ['Wi-Fi', 'AC', 'Attached Bath'],
            beds: [
              {
                id: 'b-402-a',
                bedNumber: 'B402-A',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 1,
                monthlyRent: 8500,
                student: {
                  name: 'Suresh Raina',
                  phone: '9876523456',
                  checkInDate: '01 May 2024',
                  duration: 12,
                  monthlyRent: 8500,
                  advancePaid: true
                }
              }
            ]
          },
          {
            id: 'r-403',
            roomNumber: 'Room 403',
            floorId: 'f-4',
            floorName: 'Floor 4',
            roomType: 'Double Sharing',
            monthlyRent: 7000,
            amenities: ['Wi-Fi'],
            beds: [
              { id: 'b-403-a', bedNumber: 'B403-A', bedType: 'Single Bed', status: 'vacant', sortIndex: 1, monthlyRent: 7000 },
              { id: 'b-403-b', bedNumber: 'B403-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 7000 }
            ]
          }
        ]
      },
      {
        id: 'f-5',
        floorName: 'Floor 5',
        totalRooms: 3,
        totalBeds: 5,
        rooms: [
          {
            id: 'r-501',
            roomNumber: 'Room 501',
            floorId: 'f-5',
            floorName: 'Floor 5',
            roomType: 'Double Sharing',
            monthlyRent: 7200,
            amenities: ['Wi-Fi', 'AC'],
            beds: [
              {
                id: 'b-501-a',
                bedNumber: 'B501-A',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 1,
                monthlyRent: 7200,
                student: {
                  name: 'Kartik Aaryan',
                  phone: '9876534567',
                  checkInDate: '20 Mar 2024',
                  duration: 12,
                  monthlyRent: 7200,
                  advancePaid: true
                }
              },
              { id: 'b-501-b', bedNumber: 'B501-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 7200 }
            ]
          },
          {
            id: 'r-502',
            roomNumber: 'Room 502',
            floorId: 'f-5',
            floorName: 'Floor 5',
            roomType: 'Single Sharing',
            monthlyRent: 8000,
            amenities: ['Wi-Fi', 'AC'],
            beds: [
              { id: 'b-502-a', bedNumber: 'B502-A', bedType: 'Single Bed', status: 'vacant', sortIndex: 1, monthlyRent: 8000 }
            ]
          },
          {
            id: 'r-503',
            roomNumber: 'Room 503',
            floorId: 'f-5',
            floorName: 'Floor 5',
            roomType: 'Double Sharing',
            monthlyRent: 7200,
            amenities: ['Wi-Fi'],
            beds: [
              { id: 'b-503-a', bedNumber: 'B503-A', bedType: 'Single Bed', status: 'vacant', sortIndex: 1, monthlyRent: 7200 },
              { id: 'b-503-b', bedNumber: 'B503-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 7200 }
            ]
          }
        ]
      },
      {
        id: 'f-6',
        floorName: 'Floor 6 (Penthouse)',
        totalRooms: 3,
        totalBeds: 5,
        rooms: [
          {
            id: 'r-601',
            roomNumber: 'Room 601',
            floorId: 'f-6',
            floorName: 'Floor 6 (Penthouse)',
            roomType: 'Executive Suite',
            monthlyRent: 12000,
            amenities: ['Wi-Fi', 'AC', 'Attached Bath', 'Wardrobe', 'Balcony'],
            beds: [
              {
                id: 'b-601-a',
                bedNumber: 'B601-A',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 1,
                monthlyRent: 12000,
                student: {
                  name: 'Hardik Pandya',
                  phone: '9876598765',
                  checkInDate: '01 May 2024',
                  duration: 12,
                  monthlyRent: 12000,
                  advancePaid: true
                }
              },
              { id: 'b-601-b', bedNumber: 'B601-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 12000 }
            ]
          },
          {
            id: 'r-602',
            roomNumber: 'Room 602',
            floorId: 'f-6',
            floorName: 'Floor 6 (Penthouse)',
            roomType: 'Single Suite',
            monthlyRent: 10000,
            amenities: ['Wi-Fi', 'AC', 'Attached Bath', 'Balcony'],
            beds: [
              { id: 'b-602-a', bedNumber: 'B602-A', bedType: 'Single Bed', status: 'vacant', sortIndex: 1, monthlyRent: 10000 }
            ]
          },
          {
            id: 'r-603',
            roomNumber: 'Room 603',
            floorId: 'f-6',
            floorName: 'Floor 6 (Penthouse)',
            roomType: 'Executive Double',
            monthlyRent: 9500,
            amenities: ['Wi-Fi', 'AC', 'Attached Bath'],
            beds: [
              { id: 'b-603-a', bedNumber: 'B603-A', bedType: 'Single Bed', status: 'vacant', sortIndex: 1, monthlyRent: 9500 },
              { id: 'b-603-b', bedNumber: 'B603-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 9500 }
            ]
          }
        ]
      },
      {
        id: 'f-7',
        floorName: 'Floor 7',
        totalRooms: 4,
        totalBeds: 8,
        rooms: [
          {
            id: 'r-701',
            roomNumber: 'Room 701',
            floorId: 'f-7',
            floorName: 'Floor 7',
            roomType: 'Single Sharing',
            monthlyRent: 7800,
            amenities: ['Wi-Fi', 'AC'],
            beds: [
              {
                id: 'b-701-a',
                bedNumber: 'B701-A',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 1,
                monthlyRent: 7800,
                student: {
                  name: 'Vikram Seth',
                  phone: '9876541100',
                  checkInDate: '01 Mar 2024',
                  duration: 12,
                  monthlyRent: 7800,
                  advancePaid: true
                }
              },
              { id: 'b-701-b', bedNumber: 'B701-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 7800 }
            ]
          },
          {
            id: 'r-702',
            roomNumber: 'Room 702',
            floorId: 'f-7',
            floorName: 'Floor 7',
            roomType: 'Double Sharing',
            monthlyRent: 6800,
            amenities: ['Wi-Fi'],
            beds: [
              {
                id: 'b-702-a',
                bedNumber: 'B702-A',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 1,
                monthlyRent: 6800,
                student: {
                  name: 'Rishabh Pant',
                  phone: '9876542211',
                  checkInDate: '15 Apr 2024',
                  duration: 12,
                  monthlyRent: 6800,
                  advancePaid: true
                }
              },
              { id: 'b-702-b', bedNumber: 'B702-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 6800 }
            ]
          },
          {
            id: 'r-703',
            roomNumber: 'Room 703',
            floorId: 'f-7',
            floorName: 'Floor 7',
            roomType: 'Double Sharing',
            monthlyRent: 6800,
            amenities: ['Wi-Fi'],
            beds: [
              { id: 'b-703-a', bedNumber: 'B703-A', bedType: 'Single Bed', status: 'vacant', sortIndex: 1, monthlyRent: 6800 },
              { id: 'b-703-b', bedNumber: 'B703-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 6800 }
            ]
          },
          {
            id: 'r-704',
            roomNumber: 'Room 704',
            floorId: 'f-7',
            floorName: 'Floor 7',
            roomType: 'Double Sharing',
            monthlyRent: 6800,
            amenities: ['Wi-Fi'],
            beds: [
              { id: 'b-704-a', bedNumber: 'B704-A', bedType: 'Single Bed', status: 'vacant', sortIndex: 1, monthlyRent: 6800 },
              { id: 'b-704-b', bedNumber: 'B704-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 6800 }
            ]
          }
        ]
      },
      {
        id: 'f-8',
        floorName: 'Floor 8',
        totalRooms: 4,
        totalBeds: 8,
        rooms: [
          {
            id: 'r-801',
            roomNumber: 'Room 801',
            floorId: 'f-8',
            floorName: 'Floor 8',
            roomType: 'Single Sharing',
            monthlyRent: 8000,
            amenities: ['Wi-Fi', 'AC'],
            beds: [
              {
                id: 'b-801-a',
                bedNumber: 'B801-A',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 1,
                monthlyRent: 8000,
                student: {
                  name: 'KL Rahul',
                  phone: '9876543322',
                  checkInDate: '01 Feb 2024',
                  duration: 12,
                  monthlyRent: 8000,
                  advancePaid: true
                }
              },
              { id: 'b-801-b', bedNumber: 'B801-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 8000 }
            ]
          },
          {
            id: 'r-802',
            roomNumber: 'Room 802',
            floorId: 'f-8',
            floorName: 'Floor 8',
            roomType: 'Double Sharing',
            monthlyRent: 7000,
            amenities: ['Wi-Fi'],
            beds: [
              {
                id: 'b-802-a',
                bedNumber: 'B802-A',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 1,
                monthlyRent: 7000,
                student: {
                  name: 'Shreyas Iyer',
                  phone: '9876544433',
                  checkInDate: '20 May 2024',
                  duration: 12,
                  monthlyRent: 7000,
                  advancePaid: true
                }
              },
              { id: 'b-802-b', bedNumber: 'B802-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 7000 }
            ]
          },
          {
            id: 'r-803',
            roomNumber: 'Room 803',
            floorId: 'f-8',
            floorName: 'Floor 8',
            roomType: 'Double Sharing',
            monthlyRent: 7000,
            amenities: ['Wi-Fi'],
            beds: [
              { id: 'b-803-a', bedNumber: 'B803-A', bedType: 'Single Bed', status: 'vacant', sortIndex: 1, monthlyRent: 7000 },
              { id: 'b-803-b', bedNumber: 'B803-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 7000 }
            ]
          },
          {
            id: 'r-804',
            roomNumber: 'Room 804',
            floorId: 'f-8',
            floorName: 'Floor 8',
            roomType: 'Double Sharing',
            monthlyRent: 7000,
            amenities: ['Wi-Fi'],
            beds: [
              { id: 'b-804-a', bedNumber: 'B804-A', bedType: 'Single Bed', status: 'vacant', sortIndex: 1, monthlyRent: 7000 },
              { id: 'b-804-b', bedNumber: 'B804-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 7000 }
            ]
          }
        ]
      },
      {
        id: 'f-9',
        floorName: 'Floor 9',
        totalRooms: 4,
        totalBeds: 8,
        rooms: [
          {
            id: 'r-901',
            roomNumber: 'Room 901',
            floorId: 'f-9',
            floorName: 'Floor 9',
            roomType: 'Single Sharing',
            monthlyRent: 8200,
            amenities: ['Wi-Fi', 'AC'],
            beds: [
              {
                id: 'b-901-a',
                bedNumber: 'B901-A',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 1,
                monthlyRent: 8200,
                student: {
                  name: 'Shubman Gill',
                  phone: '9876555544',
                  checkInDate: '10 Apr 2024',
                  duration: 12,
                  monthlyRent: 8200,
                  advancePaid: true
                }
              },
              { id: 'b-901-b', bedNumber: 'B901-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 8200 }
            ]
          },
          {
            id: 'r-902',
            roomNumber: 'Room 902',
            floorId: 'f-9',
            floorName: 'Floor 9',
            roomType: 'Double Sharing',
            monthlyRent: 7200,
            amenities: ['Wi-Fi'],
            beds: [
              {
                id: 'b-902-a',
                bedNumber: 'B902-A',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 1,
                monthlyRent: 7200,
                student: {
                  name: 'Yuzvendra Chahal',
                  phone: '9876566655',
                  checkInDate: '01 Jun 2024',
                  duration: 12,
                  monthlyRent: 7200,
                  advancePaid: true
                }
              },
              { id: 'b-902-b', bedNumber: 'B902-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 7200 }
            ]
          },
          {
            id: 'r-903',
            roomNumber: 'Room 903',
            floorId: 'f-9',
            floorName: 'Floor 9',
            roomType: 'Double Sharing',
            monthlyRent: 7200,
            amenities: ['Wi-Fi'],
            beds: [
              { id: 'b-903-a', bedNumber: 'B903-A', bedType: 'Single Bed', status: 'vacant', sortIndex: 1, monthlyRent: 7200 },
              { id: 'b-903-b', bedNumber: 'B903-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 7200 }
            ]
          },
          {
            id: 'r-904',
            roomNumber: 'Room 904',
            floorId: 'f-9',
            floorName: 'Floor 9',
            roomType: 'Double Sharing',
            monthlyRent: 7200,
            amenities: ['Wi-Fi'],
            beds: [
              { id: 'b-904-a', bedNumber: 'B904-A', bedType: 'Single Bed', status: 'vacant', sortIndex: 1, monthlyRent: 7200 },
              { id: 'b-904-b', bedNumber: 'B904-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 7200 }
            ]
          }
        ]
      },
      {
        id: 'f-10',
        floorName: 'Floor 10 (Executive Penthouse)',
        totalRooms: 3,
        totalBeds: 6,
        rooms: [
          {
            id: 'r-1001',
            roomNumber: 'Room 1001',
            floorId: 'f-10',
            floorName: 'Floor 10 (Executive Penthouse)',
            roomType: 'Executive Suite',
            monthlyRent: 13500,
            amenities: ['Wi-Fi', 'AC', 'Attached Bath', 'Balcony', 'TV'],
            beds: [
              {
                id: 'b-1001-a',
                bedNumber: 'B1001-A',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 1,
                monthlyRent: 13500,
                student: {
                  name: 'Jasprit Bumrah',
                  phone: '9876577766',
                  checkInDate: '01 Jan 2024',
                  duration: 12,
                  monthlyRent: 13500,
                  advancePaid: true
                }
              },
              { id: 'b-1001-b', bedNumber: 'B1001-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 13500 }
            ]
          },
          {
            id: 'r-1002',
            roomNumber: 'Room 1002',
            floorId: 'f-10',
            floorName: 'Floor 10 (Executive Penthouse)',
            roomType: 'Executive Suite',
            monthlyRent: 13500,
            amenities: ['Wi-Fi', 'AC', 'Attached Bath', 'Balcony'],
            beds: [
              {
                id: 'b-1002-a',
                bedNumber: 'B1002-A',
                bedType: 'Single Bed',
                status: 'occupied',
                sortIndex: 1,
                monthlyRent: 13500,
                student: {
                  name: 'Mohammed Shami',
                  phone: '9876588877',
                  checkInDate: '15 Feb 2024',
                  duration: 12,
                  monthlyRent: 13500,
                  advancePaid: true
                }
              },
              { id: 'b-1002-b', bedNumber: 'B1002-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 13500 }
            ]
          },
          {
            id: 'r-1003',
            roomNumber: 'Room 1003',
            floorId: 'f-10',
            floorName: 'Floor 10 (Executive Penthouse)',
            roomType: 'Executive Double',
            monthlyRent: 11000,
            amenities: ['Wi-Fi', 'AC', 'Attached Bath'],
            beds: [
              { id: 'b-1003-a', bedNumber: 'B1003-A', bedType: 'Single Bed', status: 'vacant', sortIndex: 1, monthlyRent: 11000 },
              { id: 'b-1003-b', bedNumber: 'B1003-B', bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 11000 }
            ]
          }
        ]
      }
    ]
  }
];

export const RoomManagementPage: React.FC = () => {
  /* ── State & Storage ── */
  const [hostels, setHostels] = useState<Hostel[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_HOSTELS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.[0]?.floors?.length >= 10) {
          return parsed;
        }
      }
      return DEFAULT_HOSTELS;
    } catch {
      return DEFAULT_HOSTELS;
    }
  });

  const [activeHostelId, setActiveHostelId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ACTIVE_ID_KEY);
      return saved && hostels.some(h => h.id === saved) ? saved : hostels[0]?.id || 'h-1';
    } catch {
      return hostels[0]?.id || 'h-1';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_HOSTELS_KEY, JSON.stringify(hostels));
    } catch (e) {
      console.error('Failed to save hostels:', e);
    }
  }, [hostels]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ACTIVE_ID_KEY, activeHostelId);
    } catch (e) {
      console.error('Failed to save active hostel ID:', e);
    }
  }, [activeHostelId]);

  const activeHostel = hostels.find(h => h.id === activeHostelId) || hostels[0];

  /* ── View Navigation State ── */
  type ViewState =
    | 'dashboard'
    | 'floors-list'
    | 'floor-details'
    | 'rooms-list'
    | 'room-details'
    | 'beds-in-room'
    | 'bed-details'
    | 'add-bed'
    | 'add-room'
    | 'filters'
    | 'reports'
    | 'notifications'
    | 'menu-drawer'
    | 'settings'
    | 'allocate-bed';

  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [dashTab, setDashTab] = useState<'floors' | 'beds' | 'stats'>('floors');

  /* ── Selected Pointers for Detail Views ── */
  const [selectedFloorId, setSelectedFloorId] = useState<string>('f-1');
  const [selectedRoomId, setSelectedRoomId] = useState<string>('r-101');
  const [selectedBedId, setSelectedBedId] = useState<string>('b-101-a');

  /* ── Bed Allocation Form State ── */
  const [residentMode, setResidentMode] = useState<'existing' | 'new'>('existing');
  const [allocateTargetBedId, setAllocateTargetBedId] = useState<string>('');
  const [allocateStudentName, setAllocateStudentName] = useState<string>('');
  const [allocateStudentPhone, setAllocateStudentPhone] = useState<string>('');
  const [allocateCheckInDate, setAllocateCheckInDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [allocateRent, setAllocateRent] = useState<number>(8000);
  const [allocateAdvancePaid, setAllocateAdvancePaid] = useState<boolean>(true);
  const [allocateNotes, setAllocateNotes] = useState<string>('');

  const existingResidents: Student[] = [
    { name: 'Rohit Sharma', phone: '9876543210', checkInDate: '01 May 2024', duration: 12, monthlyRent: 8000, advancePaid: true },
    { name: 'Aman Verma', phone: '9876543211', checkInDate: '10 Apr 2024', duration: 12, monthlyRent: 8000, advancePaid: true },
    { name: 'Vikas Kumar', phone: '9876522334', checkInDate: '15 Jan 2024', duration: 6, monthlyRent: 6500, advancePaid: true },
    { name: 'Kavya Nair', phone: '9876533445', checkInDate: '20 Feb 2024', duration: 12, monthlyRent: 6500, advancePaid: true },
    { name: 'Priya Singh', phone: '9876555443', checkInDate: '05 Mar 2024', duration: 12, monthlyRent: 6500, advancePaid: true },
    { name: 'Siddharth Rao', phone: '9876577889', checkInDate: '12 Apr 2024', duration: 12, monthlyRent: 6500, advancePaid: true },
    { name: 'Rahul Sharma', phone: '9876500112', checkInDate: '01 Jun 2024', duration: 12, monthlyRent: 8000, advancePaid: true }
  ];

  /* ── Search & Filter State ── */
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFloorFilter, setSelectedFloorFilter] = useState('All Floors');
  const [selectedRoomTypeFilter, setSelectedRoomTypeFilter] = useState('All Room Types');
  const [selectedBedTypeFilter, setSelectedBedTypeFilter] = useState('All Bed Types');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All Status');

  /* ── Form Inputs ── */
  const [formFloorId, setFormFloorId] = useState('f-1');
  const [formRoomId, setFormRoomId] = useState('r-101');
  const [formBedIdText, setFormBedIdText] = useState('B101-C');
  const [formBedType, setFormBedType] = useState('Single Bed');
  const [formRent, setFormRent] = useState(8000);
  const [formStatus, setFormStatus] = useState<BedStatus>('vacant');
  const [formNotes, setFormNotes] = useState('');
  const [formStudentName, setFormStudentName] = useState('');
  const [formStudentPhone, setFormStudentPhone] = useState('');

  // Add Room Form
  const [formRoomNumberInput, setFormRoomNumberInput] = useState('Room 107');
  const [formRoomTypeInput, setFormRoomTypeInput] = useState('Single Sharing');

  /* ── Computed Metrics across active Hostel ── */
  let computedTotalBeds = 0;
  let computedOccupiedBeds = 0;
  let computedVacantBeds = 0;
  let computedMaintenanceBeds = 0;
  let computedReservedBeds = 0;

  activeHostel.floors.forEach(f => {
    f.rooms.forEach(r => {
      r.beds.forEach(b => {
        computedTotalBeds++;
        if (b.status === 'occupied') computedOccupiedBeds++;
        else if (b.status === 'vacant') computedVacantBeds++;
        else if (b.status === 'maintenance') computedMaintenanceBeds++;
        else if (b.status === 'reserved') computedReservedBeds++;
      });
    });
  });

  /* ── Helper Resolution Objects ── */
  const currentFloorObj = activeHostel.floors.find(f => f.id === selectedFloorId) || activeHostel.floors[0] || {
    id: 'f-1',
    floorName: 'Floor 1',
    totalRooms: 20,
    totalBeds: 40,
    rooms: []
  };

  // All beds across active hostel with room & floor metadata
  const allBedsWithMetadata = activeHostel.floors.flatMap(f =>
    f.rooms.flatMap(r =>
      r.beds.map(b => ({
        bed: b,
        room: r,
        floor: f
      }))
    )
  );

  const defaultRoomFallback: Room = {
    id: 'r-default',
    roomNumber: 'Room 101',
    floorId: 'f-1',
    floorName: 'Floor 1',
    roomType: 'Single Sharing',
    monthlyRent: 8000,
    description: 'Well furnished single sharing room with attached bathroom.',
    amenities: ['Wi-Fi', 'AC', 'Attached Bath', 'Wardrobe'],
    beds: [
      { id: 'b-default-1', bedNumber: 'B101-A', bedType: 'Single Bed', status: 'occupied', sortIndex: 1, monthlyRent: 8000 },
      { id: 'b-default-2', bedNumber: 'B101-B', bedType: 'Single Bed', status: 'occupied', sortIndex: 2, monthlyRent: 8000 }
    ]
  };

  let currentRoomObj: Room = defaultRoomFallback;
  activeHostel.floors.forEach(f => {
    const found = f.rooms.find(r => r.id === selectedRoomId);
    if (found) currentRoomObj = found;
  });
  if (currentRoomObj === defaultRoomFallback && activeHostel.floors[0]?.rooms[0]) {
    currentRoomObj = activeHostel.floors[0].rooms[0];
  }

  const handleSelectRoom = (roomId: string) => {
    activeHostel.floors.forEach(f => {
      const found = f.rooms.find(r => r.id === roomId);
      if (found) {
        setSelectedFloorId(f.id);
        setSelectedRoomId(found.id);
        setCurrentView('room-details');
      }
    });
  };

  const defaultBedFallback: Bed = {
    id: 'b-default-1',
    bedNumber: 'B101-A',
    bedType: 'Single Bed',
    status: 'occupied',
    sortIndex: 1,
    monthlyRent: 8000,
    student: {
      name: 'Rohit Sharma',
      phone: '9876543210',
      checkInDate: '01 May 2024',
      duration: 12,
      monthlyRent: 8000,
      advancePaid: true,
      notes: 'Standard resident'
    }
  };

  let currentBedObj: Bed = defaultBedFallback;
  let parentRoomForBed: Room = currentRoomObj || defaultRoomFallback;
  let parentFloorForBed: Floor = currentFloorObj;

  activeHostel.floors.forEach(f => {
    f.rooms.forEach(r => {
      const found = r.beds.find(b => b.id === selectedBedId);
      if (found) {
        currentBedObj = found;
        parentRoomForBed = r;
        parentFloorForBed = f;
      }
    });
  });
  if (currentBedObj === defaultBedFallback && currentRoomObj?.beds?.[0]) {
    currentBedObj = currentRoomObj.beds[0];
  }

  const handleSelectBed = (bedId: string) => {
    activeHostel.floors.forEach(f => {
      f.rooms.forEach(r => {
        const found = r.beds.find(b => b.id === bedId);
        if (found) {
          setSelectedFloorId(f.id);
          setSelectedRoomId(r.id);
          setSelectedBedId(found.id);
          if (found.status === 'vacant' || found.status === 'reserved') {
            setAllocateTargetBedId(found.id);
            setAllocateRent(found.monthlyRent || r.monthlyRent || 8000);
            setCurrentView('allocate-bed');
          } else {
            setCurrentView('bed-details');
          }
        }
      });
    });
  };

  /* ── Helper Functions for Updates ── */
  const updateFloors = (newFloors: Floor[]) => {
    setHostels(prev =>
      prev.map(h => (h.id === activeHostel.id ? { ...h, floors: newFloors } : h))
    );
  };

  const handleSaveBed = () => {
    if (!formBedIdText.trim()) return;

    const newBed: Bed = {
      id: `b-${Date.now()}`,
      bedNumber: formBedIdText.trim(),
      bedType: formBedType,
      status: formStatus,
      sortIndex: 99,
      monthlyRent: formRent,
      student: formStudentName ? {
        name: formStudentName,
        phone: formStudentPhone || '9876543210',
        checkInDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        duration: 12,
        monthlyRent: formRent,
        advancePaid: true,
        notes: formNotes
      } : undefined
    };

    updateFloors(
      activeHostel.floors.map(f => ({
        ...f,
        rooms: f.rooms.map(r => {
          if (r.id === formRoomId) {
            return { ...r, beds: [...r.beds, newBed] };
          }
          return r;
        })
      }))
    );

    setCurrentView('dashboard');
  };

  const handleSaveRoom = () => {
    if (!formRoomNumberInput.trim()) return;
    const newRoom: Room = {
      id: `r-${Date.now()}`,
      roomNumber: formRoomNumberInput.trim(),
      floorId: formFloorId,
      floorName: activeHostel.floors.find(f => f.id === formFloorId)?.floorName || 'Floor 1',
      roomType: formRoomTypeInput,
      monthlyRent: 8000,
      amenities: ['Wi-Fi', 'AC', 'Attached Bath'],
      beds: [
        { id: `b-${Date.now()}-1`, bedNumber: `${formRoomNumberInput.replace(/\s+/g, '')}-A`, bedType: 'Single Bed', status: 'vacant', sortIndex: 1, monthlyRent: 8000 },
        { id: `b-${Date.now()}-2`, bedNumber: `${formRoomNumberInput.replace(/\s+/g, '')}-B`, bedType: 'Single Bed', status: 'vacant', sortIndex: 2, monthlyRent: 8000 }
      ]
    };

    updateFloors(
      activeHostel.floors.map(f => {
        if (f.id === formFloorId) {
          return { ...f, rooms: [...f.rooms, newRoom] };
        }
        return f;
      })
    );

    setCurrentView('dashboard');
  };

  const handleConfirmAllocation = () => {
    updateFloors(
      activeHostel.floors.map(f => ({
        ...f,
        rooms: f.rooms.map(r => ({
          ...r,
          beds: r.beds.map(b => {
            if (b.id === allocateTargetBedId) {
              return {
                ...b,
                status: 'occupied',
                monthlyRent: allocateRent,
                student: {
                  name: allocateStudentName,
                  phone: allocateStudentPhone,
                  checkInDate: new Date(allocateCheckInDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                  duration: 12,
                  monthlyRent: allocateRent,
                  advancePaid: allocateAdvancePaid,
                  notes: allocateNotes
                }
              };
            }
            return b;
          })
        }))
      }))
    );
    setCurrentView('dashboard');
  };

  const handleUnallocateStudent = (roomId: string, bedId: string) => {
    if (confirm('Are you sure you want to unallocate this student?')) {
      updateFloors(
        activeHostel.floors.map(f => ({
          ...f,
          rooms: f.rooms.map(r => {
            if (r.id === roomId) {
              return {
                ...r,
                beds: r.beds.map(b => (b.id === bedId ? { ...b, status: 'vacant', student: undefined } : b))
              };
            }
            return r;
          })
        }))
      );
      setCurrentView('dashboard');
    }
  };

  const handleToggleBedStatus = (roomId: string, bedId: string, nextStatus: BedStatus) => {
    updateFloors(
      activeHostel.floors.map(f => ({
        ...f,
        rooms: f.rooms.map(r => {
          if (r.id === roomId) {
            return {
              ...r,
              beds: r.beds.map(b => (b.id === bedId ? { ...b, status: nextStatus, student: nextStatus === 'vacant' || nextStatus === 'maintenance' ? undefined : b.student } : b))
            };
          }
          return r;
        })
      }))
    );
  };

  /* ─────────────────────────────────────────────────────────────────────────── */
  /*  RENDER SCREEN VIEWS MATCHING REFERENCE DESIGN SYSTEM                       */
  /* ─────────────────────────────────────────────────────────────────────────── */

  return (
    <div className="bm-ref-app-container">

      {/* ────────────────── SCREEN 1: DASHBOARD (HOME) ────────────────── */}
      {currentView === 'dashboard' && (
        <div className="bm-ref-screen animate-fade-in" style={{ paddingBottom: 80 }}>
          
          {/* Hero Header Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
              borderRadius: '20px',
              padding: '18px 16px',
              color: '#ffffff',
              marginBottom: '14px',
              boxShadow: '0 4px 14px rgba(49, 46, 129, 0.25)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <select
                  value={activeHostelId}
                  onChange={e => setActiveHostelId(e.target.value)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '12px',
                    padding: '4px 10px',
                    fontSize: '12px',
                    fontWeight: 700,
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {hostels.map(h => (
                    <option key={h.id} value={h.id} style={{ color: '#0f172a' }}>
                      {h.name}
                    </option>
                  ))}
                </select>
                <h1 style={{ fontSize: '20px', fontWeight: 800, margin: '6px 0 0 0', fontFamily: 'Outfit, sans-serif' }}>
                  Bed Management
                </h1>
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button
                  style={{
                    background: '#10b981',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '8px 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)'
                  }}
                  onClick={() => {
                    const vacant = allBedsWithMetadata.find(b => b.bed.status === 'vacant');
                    if (vacant) setAllocateTargetBedId(vacant.bed.id);
                    setCurrentView('allocate-bed');
                  }}
                >
                  + Allocate Bed
                </button>
                <button
                  className="bm-ref-bell-btn"
                  onClick={() => setCurrentView('notifications')}
                  title="Notifications"
                  style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff' }}
                >
                  <Bell size={18} color="#ffffff" />
                  <span className="bm-ref-bell-badge">1</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div style={{ display: 'flex', gap: 12, marginTop: 14, background: 'rgba(255, 255, 255, 0.1)', padding: '10px 12px', borderRadius: '14px' }}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: 800 }}>{computedTotalBeds}</div>
                <div style={{ fontSize: '10.5px', opacity: 0.8 }}>Total Beds</div>
              </div>
              <div style={{ width: '1px', background: 'rgba(255, 255, 255, 0.2)' }} />
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#6ee7b7' }}>{computedOccupiedBeds}</div>
                <div style={{ fontSize: '10.5px', opacity: 0.8 }}>Occupied</div>
              </div>
              <div style={{ width: '1px', background: 'rgba(255, 255, 255, 0.2)' }} />
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#fcd34d' }}>{computedVacantBeds}</div>
                <div style={{ fontSize: '10.5px', opacity: 0.8 }}>Vacant</div>
              </div>
            </div>
          </div>

          {/* Clean Segmented Tab Switcher */}
          <div
            style={{
              display: 'flex',
              background: '#f1f5f9',
              borderRadius: '14px',
              padding: '4px',
              marginBottom: '14px'
            }}
          >
            <button
              style={{
                flex: 1,
                border: 'none',
                padding: '9px 0',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                background: dashTab === 'floors' ? '#ffffff' : 'transparent',
                color: dashTab === 'floors' ? '#4f46e5' : '#64748b',
                boxShadow: dashTab === 'floors' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s ease'
              }}
              onClick={() => setDashTab('floors')}
            >
              🏢 Floors & Rooms ({activeHostel.floors.length})
            </button>
            <button
              style={{
                flex: 1,
                border: 'none',
                padding: '9px 0',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                background: dashTab === 'beds' ? '#ffffff' : 'transparent',
                color: dashTab === 'beds' ? '#4f46e5' : '#64748b',
                boxShadow: dashTab === 'beds' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s ease'
              }}
              onClick={() => setDashTab('beds')}
            >
              🛏️ All Beds ({allBedsWithMetadata.length})
            </button>
            <button
              style={{
                flex: 1,
                border: 'none',
                padding: '9px 0',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                background: dashTab === 'stats' ? '#ffffff' : 'transparent',
                color: dashTab === 'stats' ? '#4f46e5' : '#64748b',
                boxShadow: dashTab === 'stats' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s ease'
              }}
              onClick={() => setDashTab('stats')}
            >
              📊 Stats
            </button>
          </div>

          {/* ──────────────── TAB 1: FLOORS & ROOMS ──────────────── */}
          {dashTab === 'floors' && (
            <div className="animate-fade-in">
              <div className="bm-ref-search-row" style={{ marginBottom: 12 }}>
                <div className="bm-ref-search-box">
                  <Search size={18} className="bm-ref-search-icon" />
                  <input
                    type="text"
                    placeholder="Search floor or room..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  className="bm-ref-filter-icon-btn"
                  onClick={() => setCurrentView('filters')}
                >
                  <Filter size={18} color="#6366f1" />
                </button>
              </div>

              <div className="bm-ref-section-header">
                <h2 className="bm-ref-section-title">All Floors Overview</h2>
                <button className="bm-ref-view-all-btn" onClick={() => setCurrentView('floors-list')}>
                  View List <ChevronRight size={16} />
                </button>
              </div>

              <div className="bm-ref-cards-list" style={{ marginTop: 8 }}>
                {activeHostel.floors
                  .filter(f => !searchQuery || f.floorName.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(floor => {
                    let fTotalBeds = 0;
                    let fOccupied = 0;
                    let fVacant = 0;

                    floor.rooms.forEach(r => {
                      r.beds.forEach(b => {
                        fTotalBeds++;
                        if (b.status === 'occupied') fOccupied++;
                        else if (b.status === 'vacant') fVacant++;
                      });
                    });

                    const occupancyPct = fTotalBeds > 0 ? Math.round((fOccupied / fTotalBeds) * 100) : 0;

                    return (
                      <div
                        key={floor.id}
                        className="bm-ref-floor-card"
                        onClick={() => {
                          setSelectedFloorId(floor.id);
                          setCurrentView('floor-details');
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="bm-ref-floor-card-top">
                          <div className="bm-ref-icon-box purple">
                            <Building size={18} />
                          </div>
                          <div className="bm-ref-floor-titles">
                            <div className="bm-ref-floor-name">{floor.floorName}</div>
                            <div className="bm-ref-floor-sub">
                              {floor.rooms.length} Rooms • {fTotalBeds} Beds
                            </div>
                          </div>
                          <div className="bm-ref-pct-badge">{occupancyPct}% <ChevronRight size={14} /></div>
                        </div>

                        <div className="bm-ref-progress-track">
                          <div className="bm-ref-progress-fill" style={{ width: `${occupancyPct}%` }} />
                        </div>

                        <div className="bm-ref-floor-footer">
                          <span>🟢 {fOccupied} Occupied</span>
                          <span>•</span>
                          <span>🔴 {fVacant} Vacant</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* ──────────────── TAB 2: ALL BEDS ──────────────── */}
          {dashTab === 'beds' && (
            <div className="animate-fade-in">
              <div className="bm-ref-search-row" style={{ marginBottom: 12 }}>
                <div className="bm-ref-search-box">
                  <Search size={18} className="bm-ref-search-icon" />
                  <input
                    type="text"
                    placeholder="Search bed number or student..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Status Filter Pills */}
              <div className="bm-ref-amenities-pills" style={{ marginBottom: 12 }}>
                <button
                  className={`bm-ref-pct-tag ${selectedStatusFilter === 'All Status' ? 'green' : 'gray'}`}
                  onClick={() => setSelectedStatusFilter('All Status')}
                  style={{ border: 'none', cursor: 'pointer', padding: '6px 12px' }}
                >
                  All ({allBedsWithMetadata.length})
                </button>
                <button
                  className={`bm-ref-pct-tag ${selectedStatusFilter === 'occupied' ? 'green' : 'gray'}`}
                  onClick={() => setSelectedStatusFilter('occupied')}
                  style={{ border: 'none', cursor: 'pointer', padding: '6px 12px' }}
                >
                  🟢 Occupied ({allBedsWithMetadata.filter(b => b.bed.status === 'occupied').length})
                </button>
                <button
                  className={`bm-ref-pct-tag ${selectedStatusFilter === 'vacant' ? 'mint' : 'gray'}`}
                  onClick={() => setSelectedStatusFilter('vacant')}
                  style={{ border: 'none', cursor: 'pointer', padding: '6px 12px' }}
                >
                  🔴 Vacant ({allBedsWithMetadata.filter(b => b.bed.status === 'vacant').length})
                </button>
              </div>

              <div className="bm-ref-beds-full-list">
                {allBedsWithMetadata
                  .filter(item => {
                    const matchStatus = selectedStatusFilter === 'All Status' || item.bed.status === selectedStatusFilter;
                    const matchQuery = !searchQuery ||
                      item.bed.bedNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      item.room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      (item.bed.student?.name && item.bed.student.name.toLowerCase().includes(searchQuery.toLowerCase()));
                    return matchStatus && matchQuery;
                  })
                  .map(item => {
                    const isOccupied = item.bed.status === 'occupied';

                    return (
                      <div
                        key={item.bed.id}
                        className="bm-ref-bed-full-card"
                        onClick={() => handleSelectBed(item.bed.id)}
                        style={{
                          cursor: 'pointer',
                          borderLeft: isOccupied ? '4px solid #10b981' : '4px solid #ef4444'
                        }}
                      >
                        <div className="bm-ref-bed-full-top">
                          <div>
                            <div className="bm-ref-bed-full-num">
                              {item.bed.bedNumber} {isOccupied ? '🟢' : '🔴'}
                            </div>
                            <div className="bm-ref-bed-full-type">
                              {item.bed.bedType} • {item.room.roomNumber} • {item.floor.floorName}
                            </div>
                          </div>
                          <span
                            className="bm-ref-badge"
                            style={{
                              background: isOccupied ? '#dcfce7' : '#fee2e2',
                              color: isOccupied ? '#15803d' : '#dc2626'
                            }}
                          >
                            {isOccupied ? 'Occupied' : 'Vacant (Available)'}
                          </span>
                        </div>

                        {item.bed.student ? (
                          <div className="bm-ref-bed-student-box">
                            <div className="bm-ref-student-lbl">Allotted Resident</div>
                            <div className="bm-ref-student-name">{item.bed.student.name} ({item.bed.student.phone})</div>
                            <div className="bm-ref-student-lbl" style={{ marginTop: 4 }}>Since: {item.bed.student.checkInDate}</div>
                          </div>
                        ) : (
                          <div style={{ marginTop: 8, fontSize: 12, color: '#10b981', fontWeight: 700 }}>
                            + Tap to Allocate Resident
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* ──────────────── TAB 3: STATS OVERVIEW ──────────────── */}
          {dashTab === 'stats' && (
            <div className="animate-fade-in">
              <div className="bm-ref-stats-grid" style={{ marginBottom: 16 }}>
                <div className="bm-ref-stat-card purple">
                  <div className="bm-ref-stat-icon-wrap purple"><BedDouble size={20} /></div>
                  <div>
                    <div className="bm-ref-stat-val">{computedTotalBeds}</div>
                    <div className="bm-ref-stat-lbl">Total Capacity</div>
                  </div>
                </div>

                <div className="bm-ref-stat-card green">
                  <div className="bm-ref-stat-icon-wrap green"><Users size={20} /></div>
                  <div>
                    <div className="bm-ref-stat-val">{computedOccupiedBeds}</div>
                    <div className="bm-ref-stat-lbl">Occupied Beds</div>
                  </div>
                </div>

                <div className="bm-ref-stat-card orange">
                  <div className="bm-ref-stat-icon-wrap orange"><Key size={20} /></div>
                  <div>
                    <div className="bm-ref-stat-val">{computedVacantBeds}</div>
                    <div className="bm-ref-stat-lbl">Vacant Beds</div>
                  </div>
                </div>

                <div className="bm-ref-stat-card red">
                  <div className="bm-ref-stat-icon-wrap red"><Wrench size={20} /></div>
                  <div>
                    <div className="bm-ref-stat-val">{computedMaintenanceBeds}</div>
                    <div className="bm-ref-stat-lbl">Under Maintenance</div>
                  </div>
                </div>
              </div>

              {/* Occupancy Rate Bar Card */}
              <div className="bm-ref-overview-card" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#0f172a' }}>Overall Hostel Occupancy</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{activeHostel.name}</div>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: '#10b981' }}>
                    {computedTotalBeds > 0 ? Math.round((computedOccupiedBeds / computedTotalBeds) * 100) : 0}%
                  </div>
                </div>

                <div className="bm-ref-progress-track" style={{ height: 10, margin: '14px 0 10px 0', borderRadius: 6 }}>
                  <div
                    className="bm-ref-progress-fill"
                    style={{
                      width: `${computedTotalBeds > 0 ? Math.round((computedOccupiedBeds / computedTotalBeds) * 100) : 0}%`,
                      background: 'linear-gradient(90deg, #10b981, #059669)'
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Floating Action Button */}
          <button
            className="bm-ref-fab-btn"
            onClick={() => setCurrentView('add-bed')}
          >
            <Plus size={20} /> Add Bed
          </button>
        </div>
      )}


      {/* ────────────────── SCREEN 2: FLOORS LIST (< Floors) ────────────────── */}
      {currentView === 'floors-list' && (
        <div className="bm-ref-screen animate-fade-in">
          <div className="bm-ref-sub-header">
            
            <h1 className="bm-ref-sub-title">Floors</h1>
          </div>

          <div className="bm-ref-search-row">
            <div className="bm-ref-search-box full">
              <Search size={18} className="bm-ref-search-icon" />
              <input type="text" placeholder="Search floor" />
            </div>
          </div>

          <div className="bm-ref-cards-list">
            {activeHostel.floors.map((floor, idx) => {
              const pctList = [75, 78, 45, 90, 60];
              const pct = pctList[idx % pctList.length];
              return (
                <div
                  key={floor.id}
                  className="bm-ref-floor-card"
                  onClick={() => {
                    setSelectedFloorId(floor.id);
                    setCurrentView('floor-details');
                  }}
                >
                  <div className="bm-ref-floor-card-top">
                    <div className="bm-ref-icon-box purple">
                      <Building size={18} />
                    </div>
                    <div className="bm-ref-floor-titles">
                      <div className="bm-ref-floor-name">{floor.floorName}</div>
                      <div className="bm-ref-floor-sub">
                        {floor.totalRooms || floor.rooms.length} Rooms • {floor.totalBeds || 40} Beds
                      </div>
                    </div>
                    <div className="bm-ref-pct-badge">{pct}% <ChevronRight size={14} /></div>
                  </div>

                  <div className="bm-ref-progress-track">
                    <div className="bm-ref-progress-fill" style={{ width: `${pct}%` }} />
                  </div>

                  <div className="bm-ref-floor-footer">
                    <span>{Math.round((pct / 100) * (floor.totalBeds || 40))} Occupied</span>
                    <span>•</span>
                    <span>{(floor.totalBeds || 40) - Math.round((pct / 100) * (floor.totalBeds || 40))} Vacant</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ────────────────── SCREEN 3: FLOOR DETAILS (< Floor 1) ────────────────── */}
      {currentView === 'floor-details' && (
        <div className="bm-ref-screen animate-fade-in">
          <div className="bm-ref-sub-header">
            
            <h1 className="bm-ref-sub-title">{currentFloorObj.floorName}</h1>
            <MoreVertical size={20} color="#64748b" style={{ marginLeft: 'auto' }} />
          </div>

          {/* Floor Overview Card */}
          <div className="bm-ref-overview-card">
            <div className="bm-ref-overview-top">
              <div>
                <div className="bm-ref-overview-title">{currentFloorObj.floorName} Overview</div>
                <div className="bm-ref-overview-sub">
                  {currentFloorObj.totalRooms || currentFloorObj.rooms.length} Rooms • {currentFloorObj.totalBeds || 40} Beds
                </div>
              </div>
              <div className="bm-ref-overview-pct">75%</div>
            </div>

            <div className="bm-ref-progress-track" style={{ margin: '12px 0 16px 0' }}>
              <div className="bm-ref-progress-fill" style={{ width: '75%' }} />
            </div>

            {/* 3 Stat Cards in a row */}
            <div className="bm-ref-triple-stats">
              <div className="bm-ref-mini-stat green">
                <div className="bm-ref-mini-num">30</div>
                <div className="bm-ref-mini-lbl">Occupied</div>
              </div>
              <div className="bm-ref-mini-stat orange">
                <div className="bm-ref-mini-num">10</div>
                <div className="bm-ref-mini-lbl">Vacant</div>
              </div>
              <div className="bm-ref-mini-stat red">
                <div className="bm-ref-mini-num">0</div>
                <div className="bm-ref-mini-lbl">Maintenance</div>
              </div>
            </div>
          </div>

          {/* Section Header */}
          <div className="bm-ref-section-header" style={{ marginTop: 20 }}>
            <h2 className="bm-ref-section-title">Rooms on {currentFloorObj.floorName}</h2>
            <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Tap any room to view bed layout</span>
          </div>

          {/* Small Room Cards Grid for Floor */}
          <div className="bm-ref-rooms-cards-grid" style={{ marginTop: 10 }}>
            {currentFloorObj.rooms.map(room => {
              const occBeds = room.beds.filter(b => b.status === 'occupied').length;
              const totalBeds = room.beds.length || 2;
              const pct = totalBeds > 0 ? Math.round((occBeds / totalBeds) * 100) : 0;

              return (
                <div
                  key={room.id}
                  className="bm-ref-room-full-card"
                  onClick={() => handleSelectRoom(room.id)}
                  style={{ cursor: 'pointer', padding: '14px', borderRadius: '16px' }}
                >
                  <div className="bm-ref-room-full-top">
                    <div className="bm-ref-icon-box purple"><DoorOpen size={18} /></div>
                    <div className="bm-ref-room-full-titles">
                      <div className="bm-ref-room-full-num">{room.roomNumber}</div>
                      <div className="bm-ref-room-full-sub">{totalBeds} Beds • {room.roomType || 'Single Sharing'}</div>
                    </div>
                    <span className={`bm-ref-pct-tag ${pct === 100 ? 'green' : pct > 0 ? 'mint' : 'gray'}`}>
                      {pct}%
                    </span>
                  </div>

                  {/* Bed Icon Dots (Green = Occupied, Red = Vacant) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                    {room.beds.map((b, bi) => (
                      <span
                        key={bi}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          fontSize: 10.5,
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 10,
                          background: b.status === 'occupied' ? '#dcfce7' : '#fee2e2',
                          color: b.status === 'occupied' ? '#15803d' : '#dc2626'
                        }}
                      >
                        {b.status === 'occupied' ? '🟢' : '🔴'} {b.bedNumber}
                      </span>
                    ))}
                  </div>

                  <div className="bm-ref-room-full-bottom" style={{ marginTop: 8 }}>
                    <span>{occBeds}/{totalBeds} Occupied</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ────────────────── SCREEN 4: ROOMS LIST (< Rooms) ────────────────── */}
      {currentView === 'rooms-list' && (
        <div className="bm-ref-screen animate-fade-in">
          <div className="bm-ref-sub-header">
            
            <h1 className="bm-ref-sub-title">Rooms</h1>
            <MoreVertical size={20} color="#64748b" style={{ marginLeft: 'auto' }} />
          </div>

          <div className="bm-ref-search-row">
            <div className="bm-ref-search-box">
              <Search size={18} className="bm-ref-search-icon" />
              <input type="text" placeholder="Search room" />
            </div>
            <button className="bm-ref-filter-icon-btn" onClick={() => setCurrentView('filters')}>
              <Filter size={18} color="#6366f1" />
            </button>
          </div>

          <div className="bm-ref-rooms-cards-grid">
            {activeHostel.floors.flatMap(f => f.rooms).map((room, idx) => {
              const occPctList = [100, 50, 0, 100, 50];
              const pct = occPctList[idx % occPctList.length];
              const occBeds = pct === 100 ? 2 : pct === 50 ? 1 : 0;

              return (
                <div
                  key={room.id}
                  className="bm-ref-room-full-card"
                  onClick={() => handleSelectRoom(room.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="bm-ref-room-full-top">
                    <div className="bm-ref-icon-box purple"><DoorOpen size={18} /></div>
                    <div className="bm-ref-room-full-titles">
                      <div className="bm-ref-room-full-num">{room.roomNumber}</div>
                      <div className="bm-ref-room-full-sub">{room.floorName} • {room.beds.length} Beds</div>
                    </div>
                    <span className={`bm-ref-pct-tag ${pct === 100 ? 'green' : pct === 50 ? 'mint' : 'gray'}`}>
                      {pct}%
                    </span>
                  </div>
                  <div className="bm-ref-room-full-bottom">
                    <span>{occBeds}/{room.beds.length} Occupied</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="bm-ref-fab-btn" onClick={() => setCurrentView('add-room')}>
            <Plus size={20} /> Add Room
          </button>
        </div>
      )}

      {/* ────────────────── SCREEN 5: ROOM DETAILS (< Room 101) ────────────────── */}
      {currentView === 'room-details' && (
        <div className="bm-ref-screen animate-fade-in">
          <div className="bm-ref-sub-header">
            
            <h1 className="bm-ref-sub-title">{currentRoomObj?.roomNumber || 'Room Details'}</h1>
            <MoreVertical size={20} color="#64748b" style={{ marginLeft: 'auto' }} />
          </div>

          {/* Room Overview Box */}
          <div className="bm-ref-room-header-box">
            <div className="bm-ref-room-header-top">
              <div>
                <div className="bm-ref-room-h-title">{currentRoomObj?.roomNumber || 'Room 101'}</div>
                <div className="bm-ref-room-h-sub">{currentRoomObj?.floorName || 'Floor 1'} • {currentRoomObj?.beds?.length || 0} Beds</div>
              </div>
              <div className="bm-ref-pct-tag green">100%</div>
            </div>
            <div className="bm-ref-room-h-occ">
              {currentRoomObj?.beds?.filter(b => b.status === 'occupied').length || 0} / {currentRoomObj?.beds?.length || 0} Occupied
            </div>
          </div>

          {/* Key Details List */}
          <div className="bm-ref-details-spec-list">
            <div className="bm-ref-spec-row">
              <span className="bm-ref-spec-lbl">Room Type</span>
              <span className="bm-ref-spec-val">{currentRoomObj?.roomType || 'Single Sharing'}</span>
            </div>
            <div className="bm-ref-spec-row">
              <span className="bm-ref-spec-lbl">Rent</span>
              <span className="bm-ref-spec-val">₹{(currentRoomObj?.monthlyRent || 8000).toLocaleString('en-IN')} / Month</span>
            </div>
            <div className="bm-ref-spec-row col">
              <span className="bm-ref-spec-lbl">Description</span>
              <span className="bm-ref-spec-desc">
                {currentRoomObj?.description || 'Well furnished single sharing room with attached bathroom.'}
              </span>
            </div>
            <div className="bm-ref-spec-row col">
              <span className="bm-ref-spec-lbl">Amenities</span>
              <div className="bm-ref-amenities-pills">
                {(currentRoomObj?.amenities || ['Wi-Fi', 'AC', 'Attached Bath', 'Wardrobe']).map((amenity, i) => (
                  <span key={i} className="bm-ref-amenity-pill">
                    {amenity === 'Wi-Fi' ? <Wifi size={13} /> : amenity === 'AC' ? <Tv size={13} /> : amenity === 'Attached Bath' ? <Bath size={13} /> : <DoorOpen size={13} />} {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Beds in Room Section Header */}
          <div className="bm-ref-section-header" style={{ marginTop: 24 }}>
            <h2 className="bm-ref-section-title">Beds Layout in {currentRoomObj?.roomNumber || 'Room'}</h2>
            <button
              className="bm-ref-view-all-btn"
              onClick={() => setCurrentView('beds-in-room')}
            >
              All Beds <ChevronRight size={16} />
            </button>
          </div>

          {/* Interactive Bed Cards Layout */}
          <div className="bm-ref-beds-list" style={{ marginTop: 10 }}>
            {(currentRoomObj?.beds || []).map(bed => {
              const isOccupied = bed.status === 'occupied';

              return (
                <div
                  key={bed.id}
                  className="bm-ref-bed-row-card"
                  onClick={() => handleSelectBed(bed.id)}
                  style={{
                    cursor: 'pointer',
                    borderLeft: isOccupied ? '4px solid #10b981' : '4px solid #ef4444',
                    background: '#ffffff'
                  }}
                >
                  {/* Bed Icon: Green for Occupied, Red for Vacant */}
                  <div
                    className="bm-ref-icon-box"
                    style={{
                      background: isOccupied ? '#dcfce7' : '#fee2e2',
                      color: isOccupied ? '#10b981' : '#ef4444'
                    }}
                  >
                    <BedDouble size={20} />
                  </div>

                  <div className="bm-ref-bed-row-titles">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 14.5, fontWeight: 800, color: '#0f172a' }}>{bed.bedNumber}</span>
                      <span style={{ fontSize: 12 }}>{isOccupied ? '🟢' : '🔴'}</span>
                    </div>
                    <div className="bm-ref-bed-row-type">
                      {isOccupied ? `Allotted To: ${bed.student?.name || 'Resident'}` : 'Vacant • Tap to Allocate'}
                    </div>
                  </div>

                  <span
                    className="bm-ref-badge"
                    style={{
                      background: isOccupied ? '#dcfce7' : '#fee2e2',
                      color: isOccupied ? '#15803d' : '#dc2626'
                    }}
                  >
                    {isOccupied ? 'Occupied' : 'Vacant (Available)'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ────────────────── SCREEN 6: BEDS IN ROOM / ALL BEDS ────────────────── */}
      {currentView === 'beds-in-room' && (
        <div className="bm-ref-screen animate-fade-in">
          <div className="bm-ref-sub-header">
            
            <h1 className="bm-ref-sub-title">
              {selectedStatusFilter !== 'All Status'
                ? `${selectedStatusFilter.charAt(0).toUpperCase() + selectedStatusFilter.slice(1)} Beds`
                : 'All Beds'}
            </h1>
          </div>

          {/* Quick Filter Pills */}
          <div className="bm-ref-amenities-pills" style={{ marginBottom: 12 }}>
            <button
              className={`bm-ref-pct-tag ${selectedStatusFilter === 'All Status' ? 'green' : 'gray'}`}
              onClick={() => setSelectedStatusFilter('All Status')}
              style={{ border: 'none', cursor: 'pointer', padding: '6px 12px' }}
            >
              All Beds ({allBedsWithMetadata.length})
            </button>
            <button
              className={`bm-ref-pct-tag ${selectedStatusFilter === 'occupied' ? 'green' : 'gray'}`}
              onClick={() => setSelectedStatusFilter('occupied')}
              style={{ border: 'none', cursor: 'pointer', padding: '6px 12px' }}
            >
              Occupied ({allBedsWithMetadata.filter(b => b.bed.status === 'occupied').length})
            </button>
            <button
              className={`bm-ref-pct-tag ${selectedStatusFilter === 'vacant' ? 'mint' : 'gray'}`}
              onClick={() => setSelectedStatusFilter('vacant')}
              style={{ border: 'none', cursor: 'pointer', padding: '6px 12px' }}
            >
              Vacant ({allBedsWithMetadata.filter(b => b.bed.status === 'vacant').length})
            </button>
            <button
              className={`bm-ref-pct-tag ${selectedStatusFilter === 'maintenance' ? 'gray' : 'gray'}`}
              onClick={() => setSelectedStatusFilter('maintenance')}
              style={{ border: 'none', cursor: 'pointer', padding: '6px 12px' }}
            >
              Maintenance ({allBedsWithMetadata.filter(b => b.bed.status === 'maintenance').length})
            </button>
          </div>

          <div className="bm-ref-beds-full-list">
            {allBedsWithMetadata
              .filter(item => selectedStatusFilter === 'All Status' || item.bed.status === selectedStatusFilter)
              .map(item => (
                <div
                  key={item.bed.id}
                  className="bm-ref-bed-full-card"
                  onClick={() => handleSelectBed(item.bed.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="bm-ref-bed-full-top">
                    <div>
                      <div className="bm-ref-bed-full-num">{item.bed.bedNumber}</div>
                      <div className="bm-ref-bed-full-type">
                        {item.bed.bedType} • {item.room.roomNumber} • {item.floor.floorName}
                      </div>
                    </div>
                    <span className={`bm-ref-badge ${item.bed.status === 'occupied' ? 'green' : item.bed.status === 'vacant' ? 'mint' : 'maintenance'}`}>
                      {item.bed.status.charAt(0).toUpperCase() + item.bed.status.slice(1)}
                    </span>
                  </div>

                  {item.bed.student && (
                    <div className="bm-ref-bed-student-box">
                      <div className="bm-ref-student-lbl">Allotted To</div>
                      <div className="bm-ref-student-name">{item.bed.student.name}</div>
                      <div className="bm-ref-student-lbl" style={{ marginTop: 6 }}>Since</div>
                      <div className="bm-ref-student-date">{item.bed.student.checkInDate}</div>
                    </div>
                  )}
                </div>
              ))}
          </div>

          <button className="bm-ref-fab-btn" onClick={() => setCurrentView('add-bed')}>
            <Plus size={20} /> Add Bed
          </button>
        </div>
      )}

      {/* ────────────────── SCREEN 7: BED DETAILS (< Bed Details) ────────────────── */}
      {currentView === 'bed-details' && (
        <div className="bm-ref-screen animate-fade-in">
          <div className="bm-ref-sub-header">
            
            <h1 className="bm-ref-sub-title">Bed Details</h1>
          </div>

          {/* Hero Card */}
          <div className="bm-ref-bed-detail-hero">
            <div className="bm-ref-bed-detail-hero-top">
              <div>
                <div className="bm-ref-bd-hero-num">{currentBedObj?.bedNumber || 'B101-A'}</div>
                <div className="bm-ref-bd-hero-type">{currentBedObj?.bedType || 'Single Bed'}</div>
              </div>
              <span className={`bm-ref-badge ${currentBedObj?.status === 'occupied' ? 'green' : 'mint'}`}>
                {currentBedObj?.status ? currentBedObj.status.charAt(0).toUpperCase() + currentBedObj.status.slice(1) : 'Occupied'}
              </span>
            </div>
          </div>

          {/* Detail Table */}
          <div className="bm-ref-details-table">
            <div className="bm-ref-table-row">
              <span className="bm-ref-tbl-lbl">Room</span>
              <span className="bm-ref-tbl-val">{parentRoomForBed?.roomNumber || currentRoomObj?.roomNumber || 'Room 101'}</span>
            </div>
            <div className="bm-ref-table-row">
              <span className="bm-ref-tbl-lbl">Floor</span>
              <span className="bm-ref-tbl-val">{parentFloorForBed?.floorName || currentRoomObj?.floorName || 'Floor 1'}</span>
            </div>
            <div className="bm-ref-table-row">
              <span className="bm-ref-tbl-lbl">Bed Type</span>
              <span className="bm-ref-tbl-val">{currentBedObj?.bedType || 'Single Bed'}</span>
            </div>
            <div className="bm-ref-table-row">
              <span className="bm-ref-tbl-lbl">Rent</span>
              <span className="bm-ref-tbl-val">₹{(currentBedObj?.monthlyRent || 8000).toLocaleString('en-IN')} / Month</span>
            </div>
            <div className="bm-ref-table-row">
              <span className="bm-ref-tbl-lbl">Status</span>
              <span className="bm-ref-tbl-val">
                {currentBedObj?.status ? currentBedObj.status.charAt(0).toUpperCase() + currentBedObj.status.slice(1) : 'Occupied'}
              </span>
            </div>
            <div className="bm-ref-table-row">
              <span className="bm-ref-tbl-lbl">Allotted To</span>
              <span className="bm-ref-tbl-val bold">{currentBedObj?.student?.name || 'Rohit Sharma'}</span>
            </div>
            <div className="bm-ref-table-row">
              <span className="bm-ref-tbl-lbl">Contact</span>
              <span className="bm-ref-tbl-val">{currentBedObj?.student?.phone || '9876543210'}</span>
            </div>
            <div className="bm-ref-table-row">
              <span className="bm-ref-tbl-lbl">Since</span>
              <span className="bm-ref-tbl-val">{currentBedObj?.student?.checkInDate || '01 May 2024'}</span>
            </div>
            <div className="bm-ref-table-row">
              <span className="bm-ref-tbl-lbl">Notes</span>
              <span className="bm-ref-tbl-val">{currentBedObj?.student?.notes || '-'}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bm-ref-bd-actions-row">
            <button
              className="bm-ref-outline-btn purple"
              onClick={() => setCurrentView('add-bed')}
            >
              Edit
            </button>
            <button
              className="bm-ref-outline-btn orange"
              onClick={() => {
                const next: BedStatus = currentBedObj?.status === 'vacant' ? 'occupied' : 'vacant';
                if (currentRoomObj && currentBedObj) {
                  handleToggleBedStatus(currentRoomObj.id, currentBedObj.id, next);
                }
              }}
            >
              Change Status
            </button>
            <button
              className="bm-ref-outline-btn red"
              onClick={() => {
                if (currentRoomObj && currentBedObj) {
                  handleUnallocateStudent(currentRoomObj.id, currentBedObj.id);
                }
              }}
            >
              Unallocate
            </button>
          </div>
        </div>
      )}

      {/* ────────────────── SCREEN 8: ADD BED (< Add Bed) ────────────────── */}
      {currentView === 'add-bed' && (
        <div className="bm-ref-screen animate-fade-in">
          <div className="bm-ref-sub-header">
            
            <h1 className="bm-ref-sub-title">Add Bed</h1>
          </div>

          <div className="bm-ref-form-card">
            <label className="bm-ref-form-lbl">Floor *</label>
            <select
              className="bm-ref-form-input"
              value={formFloorId}
              onChange={e => setFormFloorId(e.target.value)}
            >
              {activeHostel.floors.map(f => (
                <option key={f.id} value={f.id}>{f.floorName}</option>
              ))}
            </select>

            <label className="bm-ref-form-lbl">Room *</label>
            <select
              className="bm-ref-form-input"
              value={formRoomId}
              onChange={e => setFormRoomId(e.target.value)}
            >
              {activeHostel.floors.flatMap(f => f.rooms).map(r => (
                <option key={r.id} value={r.id}>{r.roomNumber}</option>
              ))}
            </select>

            <label className="bm-ref-form-lbl">Bed ID *</label>
            <input
              type="text"
              className="bm-ref-form-input"
              placeholder="e.g. B101-A"
              value={formBedIdText}
              onChange={e => setFormBedIdText(e.target.value)}
            />

            <label className="bm-ref-form-lbl">Bed Type *</label>
            <select
              className="bm-ref-form-input"
              value={formBedType}
              onChange={e => setFormBedType(e.target.value)}
            >
              <option value="Single Bed">Single Bed</option>
              <option value="Bunk Bed">Bunk Bed</option>
            </select>

            <div className="bm-ref-form-two-col">
              <div>
                <label className="bm-ref-form-lbl">Rent (₹)</label>
                <input
                  type="number"
                  className="bm-ref-form-input"
                  value={formRent}
                  onChange={e => setFormRent(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="bm-ref-form-lbl">Status *</label>
                <select
                  className="bm-ref-form-input"
                  value={formStatus}
                  onChange={e => setFormStatus(e.target.value as BedStatus)}
                >
                  <option value="vacant">Vacant</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="reserved">Reserved</option>
                </select>
              </div>
            </div>

            {formStatus === 'occupied' && (
              <>
                <label className="bm-ref-form-lbl" style={{ marginTop: 12 }}>Student Name *</label>
                <input
                  type="text"
                  className="bm-ref-form-input"
                  placeholder="e.g. Rohit Sharma"
                  value={formStudentName}
                  onChange={e => setFormStudentName(e.target.value)}
                />

                <label className="bm-ref-form-lbl">Phone Contact</label>
                <input
                  type="text"
                  className="bm-ref-form-input"
                  placeholder="9876543210"
                  value={formStudentPhone}
                  onChange={e => setFormStudentPhone(e.target.value)}
                />
              </>
            )}

            <label className="bm-ref-form-lbl">Notes</label>
            <textarea
              className="bm-ref-form-input textarea"
              placeholder="Enter notes (optional)"
              value={formNotes}
              onChange={e => setFormNotes(e.target.value)}
            />

            <button className="bm-ref-btn-primary" onClick={handleSaveBed}>
              Save Bed
            </button>
          </div>
        </div>
      )}

      {/* ────────────────── SCREEN: ADD ROOM (< Add Room) ────────────────── */}
      {currentView === 'add-room' && (
        <div className="bm-ref-screen animate-fade-in">
          <div className="bm-ref-sub-header">
            
            <h1 className="bm-ref-sub-title">Add Room</h1>
          </div>

          <div className="bm-ref-form-card">
            <label className="bm-ref-form-lbl">Floor *</label>
            <select
              className="bm-ref-form-input"
              value={formFloorId}
              onChange={e => setFormFloorId(e.target.value)}
            >
              {activeHostel.floors.map(f => (
                <option key={f.id} value={f.id}>{f.floorName}</option>
              ))}
            </select>

            <label className="bm-ref-form-lbl">Room Number *</label>
            <input
              type="text"
              className="bm-ref-form-input"
              placeholder="e.g. Room 107"
              value={formRoomNumberInput}
              onChange={e => setFormRoomNumberInput(e.target.value)}
            />

            <label className="bm-ref-form-lbl">Room Type *</label>
            <select
              className="bm-ref-form-input"
              value={formRoomTypeInput}
              onChange={e => setFormRoomTypeInput(e.target.value)}
            >
              <option value="Single Sharing">Single Sharing</option>
              <option value="Double Sharing">Double Sharing</option>
            </select>

            <button className="bm-ref-btn-primary" onClick={handleSaveRoom}>
              Save Room
            </button>
          </div>
        </div>
      )}

      {/* ────────────────── SCREEN 9: FILTERS MODAL ────────────────── */}
      {currentView === 'filters' && (
        <div className="bm-ref-screen animate-fade-in">
          <div className="bm-ref-sub-header">
            
            <h1 className="bm-ref-sub-title">Filters</h1>
            <button
              className="bm-ref-reset-btn"
              onClick={() => {
                setSelectedFloorFilter('All Floors');
                setSelectedRoomTypeFilter('All Room Types');
                setSelectedBedTypeFilter('All Bed Types');
                setSelectedStatusFilter('All Status');
              }}
            >
              Reset
            </button>
          </div>

          <div className="bm-ref-form-card">
            <label className="bm-ref-form-lbl">Floor</label>
            <select className="bm-ref-form-input" value={selectedFloorFilter} onChange={e => setSelectedFloorFilter(e.target.value)}>
              <option value="All Floors">All Floors</option>
              {activeHostel.floors.map(f => <option key={f.id} value={f.id}>{f.floorName}</option>)}
            </select>

            <label className="bm-ref-form-lbl">Room Type</label>
            <select className="bm-ref-form-input" value={selectedRoomTypeFilter} onChange={e => setSelectedRoomTypeFilter(e.target.value)}>
              <option value="All Room Types">All Room Types</option>
              <option value="Single Sharing">Single Sharing</option>
              <option value="Double Sharing">Double Sharing</option>
            </select>

            <label className="bm-ref-form-lbl">Bed Type</label>
            <select className="bm-ref-form-input" value={selectedBedTypeFilter} onChange={e => setSelectedBedTypeFilter(e.target.value)}>
              <option value="All Bed Types">All Bed Types</option>
              <option value="Single Bed">Single Bed</option>
              <option value="Bunk Bed">Bunk Bed</option>
            </select>

            <label className="bm-ref-form-lbl">Status</label>
            <select className="bm-ref-form-input" value={selectedStatusFilter} onChange={e => setSelectedStatusFilter(e.target.value)}>
              <option value="All Status">All Status</option>
              <option value="vacant">Vacant</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
            </select>

            <button className="bm-ref-btn-primary" onClick={() => setCurrentView('dashboard')}>
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* ────────────────── SCREEN 11: REPORTS VIEW ────────────────── */}
      {currentView === 'reports' && (
        <div className="bm-ref-screen animate-fade-in">
          <div className="bm-ref-sub-header">
            
            <h1 className="bm-ref-sub-title">Reports</h1>
          </div>

          <div className="bm-ref-reports-list">
            <div className="bm-ref-report-card">
              <div className="bm-ref-icon-box purple"><FileText size={18} /></div>
              <div className="bm-ref-report-titles">
                <div className="bm-ref-report-name">Bed Occupancy Report</div>
              </div>
              <button className="bm-ref-view-link">View</button>
            </div>

            <div className="bm-ref-report-card">
              <div className="bm-ref-icon-box purple"><FileText size={18} /></div>
              <div className="bm-ref-report-titles">
                <div className="bm-ref-report-name">Room Occupancy Report</div>
              </div>
              <button className="bm-ref-view-link">View</button>
            </div>

            <div className="bm-ref-report-card">
              <div className="bm-ref-icon-box purple"><FileText size={18} /></div>
              <div className="bm-ref-report-titles">
                <div className="bm-ref-report-name">Floor Occupancy Report</div>
              </div>
              <button className="bm-ref-view-link">View</button>
            </div>

            <div className="bm-ref-report-card">
              <div className="bm-ref-icon-box green"><FileText size={18} /></div>
              <div className="bm-ref-report-titles">
                <div className="bm-ref-report-name">Vacant Beds Report</div>
              </div>
              <button className="bm-ref-view-link">View</button>
            </div>

            <div className="bm-ref-report-card">
              <div className="bm-ref-icon-box red"><FileText size={18} /></div>
              <div className="bm-ref-report-titles">
                <div className="bm-ref-report-name">Maintenance Beds Report</div>
              </div>
              <button className="bm-ref-view-link">View</button>
            </div>

            <div className="bm-ref-report-card" style={{ marginTop: 12 }}>
              <div className="bm-ref-icon-box purple"><Download size={18} /></div>
              <div className="bm-ref-report-titles">
                <div className="bm-ref-report-name">Export Data</div>
              </div>
              <button className="bm-ref-view-link">Download</button>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────── SCREEN 12: NOTIFICATIONS ────────────────── */}
      {currentView === 'notifications' && (
        <div className="bm-ref-screen animate-fade-in">
          <div className="bm-ref-sub-header">
            
            <h1 className="bm-ref-sub-title">Notifications</h1>
            <span className="bm-ref-mark-read" onClick={() => alert('Marked all as read')}>Mark all as read</span>
          </div>

          <div className="bm-ref-notif-list">
            <div className="bm-ref-notif-card">
              <div className="bm-ref-notif-icon green"><BedDouble size={16} /></div>
              <div className="bm-ref-notif-content">
                <div className="bm-ref-notif-title">Bed B205 is now Vacant</div>
                <div className="bm-ref-notif-time">10 May 2024, 10:30 AM</div>
              </div>
            </div>

            <div className="bm-ref-notif-card">
              <div className="bm-ref-notif-icon orange"><Wrench size={16} /></div>
              <div className="bm-ref-notif-content">
                <div className="bm-ref-notif-title">Maintenance scheduled for Bed B312</div>
                <div className="bm-ref-notif-time">09 May 2024, 04:15 PM</div>
              </div>
            </div>

            <div className="bm-ref-notif-card">
              <div className="bm-ref-notif-icon purple"><DoorOpen size={16} /></div>
              <div className="bm-ref-notif-content">
                <div className="bm-ref-notif-title">New bed added in Room 203</div>
                <div className="bm-ref-notif-time">09 May 2024, 11:20 AM</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────── SCREEN 10: MORE / MENU DRAWER ────────────────── */}
      {currentView === 'menu-drawer' && (
        <div className="bm-ref-screen animate-fade-in">
          <div className="bm-ref-drawer-profile-box">
            <div className="bm-ref-avatar">JS</div>
            <div className="bm-ref-profile-info">
              <div className="bm-ref-profile-name">J. Sudharshan</div>
              <div className="bm-ref-profile-role">Admin</div>
            </div>
            
          </div>

          <div className="bm-ref-drawer-menu">
            <button className="bm-ref-drawer-item" onClick={() => setCurrentView('dashboard')}>
              <Building size={18} /> Dashboard
            </button>
            <button className="bm-ref-drawer-item" onClick={() => setCurrentView('beds-in-room')}>
              <BedDouble size={18} /> Beds
            </button>
            <button className="bm-ref-drawer-item" onClick={() => setCurrentView('rooms-list')}>
              <DoorOpen size={18} /> Rooms
            </button>
            <button className="bm-ref-drawer-item" onClick={() => setCurrentView('reports')}>
              <FileText size={18} /> Reports
            </button>
            <button className="bm-ref-drawer-item" onClick={() => setCurrentView('dashboard')}>
              <Wrench size={18} /> Maintenance
            </button>
            <button className="bm-ref-drawer-item" onClick={() => setCurrentView('dashboard')}>
              <Users size={18} /> Users
            </button>
            <button className="bm-ref-drawer-item" onClick={() => setCurrentView('settings')}>
              <SettingsIcon size={18} /> Settings
            </button>
            <button className="bm-ref-drawer-item" onClick={() => alert('Help & Support')}>
              <HelpCircle size={18} /> Help & Support
            </button>
            <div className="bm-ref-dropdown-divider" />
            <button className="bm-ref-drawer-item danger" onClick={() => alert('Logged out')}>
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      )}

      {/* ────────────────── SCREEN 13: PROFILE / SETTINGS ────────────────── */}
      {currentView === 'settings' && (
        <div className="bm-ref-screen animate-fade-in">
          <div className="bm-ref-sub-header">
            
            <h1 className="bm-ref-sub-title">Settings</h1>
          </div>

          <div className="bm-ref-profile-card">
            <div className="bm-ref-profile-card-title">Profile</div>
            <div className="bm-ref-spec-row" style={{ marginTop: 8 }}>
              <span className="bm-ref-spec-lbl">Name</span>
              <span className="bm-ref-spec-val">J. Sudharshan</span>
            </div>
            <div className="bm-ref-spec-row">
              <span className="bm-ref-spec-lbl">Email</span>
              <span className="bm-ref-spec-val">sudharshan@example.com</span>
            </div>
            <div className="bm-ref-spec-row">
              <span className="bm-ref-spec-lbl">Phone</span>
              <span className="bm-ref-spec-val">9876543210</span>
            </div>
          </div>

          <div className="bm-ref-settings-list" style={{ marginTop: 16 }}>
            <div className="bm-ref-settings-item" onClick={() => alert('Change password modal')}>
              <span>Change Password</span>
              <ChevronRight size={16} color="#94a3b8" />
            </div>
            <div className="bm-ref-settings-item" onClick={() => alert('Notification Settings')}>
              <span>Notification Settings</span>
              <ChevronRight size={16} color="#94a3b8" />
            </div>
            <div className="bm-ref-settings-item" onClick={() => alert('App Settings')}>
              <span>App Settings</span>
              <ChevronRight size={16} color="#94a3b8" />
            </div>
            <div className="bm-ref-settings-item">
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>About App</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>Version 1.0.0</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────── SCREEN 14: ALLOCATE BED ────────────────── */}
      {currentView === 'allocate-bed' && (
        <div className="bm-ref-screen animate-fade-in">
          <div className="bm-ref-sub-header">
            
            <h1 className="bm-ref-sub-title">Allocate Bed</h1>
          </div>

          <div className="bm-ref-form-card">
            {/* Vacant Bed Selector */}
            <label className="bm-ref-form-lbl">Select Available / Vacant Bed *</label>
            <select
              className="bm-ref-form-input"
              value={allocateTargetBedId}
              onChange={e => setAllocateTargetBedId(e.target.value)}
            >
              <option value="">-- Choose Vacant Bed --</option>
              {allBedsWithMetadata
                .filter(item => item.bed.status === 'vacant' || item.bed.status === 'reserved')
                .map(item => (
                  <option key={item.bed.id} value={item.bed.id}>
                    {item.bed.bedNumber} ({item.room.roomNumber} • {item.floor.floorName}) - {item.bed.status.toUpperCase()}
                  </option>
                ))}
            </select>

            {/* Resident Mode Segmented Control */}
            <label className="bm-ref-form-lbl" style={{ marginTop: 12 }}>Assign Resident *</label>
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              <button
                type="button"
                className={`bm-ref-pct-tag ${residentMode === 'existing' ? 'green' : 'gray'}`}
                style={{ border: 'none', cursor: 'pointer', flex: 1, padding: '8px', textAlign: 'center' }}
                onClick={() => setResidentMode('existing')}
              >
                Select Existing Resident
              </button>
              <button
                type="button"
                className={`bm-ref-pct-tag ${residentMode === 'new' ? 'green' : 'gray'}`}
                style={{ border: 'none', cursor: 'pointer', flex: 1, padding: '8px', textAlign: 'center' }}
                onClick={() => setResidentMode('new')}
              >
                + Add New Resident
              </button>
            </div>

            {residentMode === 'existing' ? (
              <>
                <label className="bm-ref-form-lbl">Select Existing Resident *</label>
                <select
                  className="bm-ref-form-input"
                  onChange={e => {
                    const idx = Number(e.target.value);
                    if (idx >= 0 && existingResidents[idx]) {
                      const res = existingResidents[idx];
                      setAllocateStudentName(res.name);
                      setAllocateStudentPhone(res.phone);
                      setAllocateRent(res.monthlyRent);
                    }
                  }}
                >
                  <option value="-1">-- Choose Registered Resident --</option>
                  {existingResidents.map((res, idx) => (
                    <option key={idx} value={idx}>
                      {res.name} ({res.phone}) - Rent ₹{res.monthlyRent}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <>
                <label className="bm-ref-form-lbl">Student Full Name *</label>
                <input
                  type="text"
                  className="bm-ref-form-input"
                  placeholder="e.g. Rahul Sharma"
                  value={allocateStudentName}
                  onChange={e => setAllocateStudentName(e.target.value)}
                />

                <label className="bm-ref-form-lbl">Phone Contact *</label>
                <input
                  type="text"
                  className="bm-ref-form-input"
                  placeholder="9876543210"
                  value={allocateStudentPhone}
                  onChange={e => setAllocateStudentPhone(e.target.value)}
                />
              </>
            )}

            <div className="bm-ref-form-two-col" style={{ marginTop: 8 }}>
              <div>
                <label className="bm-ref-form-lbl">Check-In Date</label>
                <input
                  type="date"
                  className="bm-ref-form-input"
                  value={allocateCheckInDate}
                  onChange={e => setAllocateCheckInDate(e.target.value)}
                />
              </div>
              <div>
                <label className="bm-ref-form-lbl">Monthly Rent (₹)</label>
                <input
                  type="number"
                  className="bm-ref-form-input"
                  value={allocateRent}
                  onChange={e => setAllocateRent(Number(e.target.value))}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
              <input
                type="checkbox"
                id="advancePaidCheck"
                checked={allocateAdvancePaid}
                onChange={e => setAllocateAdvancePaid(e.target.checked)}
              />
              <label htmlFor="advancePaidCheck" style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>
                Advance Rent Paid
              </label>
            </div>

            <label className="bm-ref-form-lbl">Notes</label>
            <textarea
              className="bm-ref-form-input textarea"
              placeholder="e.g. Standard 1 year agreement"
              value={allocateNotes}
              onChange={e => setAllocateNotes(e.target.value)}
            />

            <button
              className="bm-ref-btn-primary"
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)', marginTop: 14 }}
              onClick={handleConfirmAllocation}
            >
              Confirm Bed Allocation
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
