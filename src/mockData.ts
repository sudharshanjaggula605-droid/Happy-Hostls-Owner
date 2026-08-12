import type { 
  WeeklyMenu, 
  PantryItem, 
  KitchenExpense, 
  Supplier,
  HostelStat,
  FloorOccupancy,
  HostelAnnouncement,
  HostelRoom,
  ResidentRequest,
  FeeTransaction,
  ActivityItem
} from './types';

export const initialWeeklyMenu: WeeklyMenu = {
  Monday: {
    breakfast: 'Idli Sambar',
    lunch: 'Roti, Dal, Paneer, Rice',
    snacks: 'Samosa, Tea',
    dinner: 'Aloo Gobi, Roti, Rice',
  },
  Tuesday: {
    breakfast: 'Aloo Paratha',
    lunch: 'Veg Biryani, Raita',
    snacks: 'Pakoda, Coffee',
    dinner: 'Dal Tadka, Roti, Rice',
  },
  Wednesday: {
    breakfast: 'Poha',
    lunch: 'Rajma Chawal, Salad',
    snacks: 'Sandwich, Tea',
    dinner: 'Mix Veg, Roti, Rice',
  },
  Thursday: {
    breakfast: 'Bread Toast, Eggs',
    lunch: 'Chole Bhature, Rice',
    snacks: 'Biscuits, Tea',
    dinner: 'Kadhi Chawal, Roti',
  },
  Friday: {
    breakfast: 'Uttapam, Chutney',
    lunch: 'Egg Curry, Rice, Roti',
    snacks: 'Kachori, Tea',
    dinner: 'Bhindi Masala, Roti, Rice',
  },
  Saturday: {
    breakfast: 'Puri Sabji',
    lunch: 'Khichdi, Papad, Dahi',
    snacks: 'Maggi, Tea',
    dinner: 'Paneer Bhurji, Roti',
  },
  Sunday: {
    breakfast: 'Chole Bhature',
    lunch: 'Special Veg Thali, Rice',
    snacks: 'Pav Bhaji, Tea',
    dinner: 'Dal Makhani, Butter Roti',
  },
};

export const initialPantryItems: PantryItem[] = [
  {
    id: 'p1',
    name: 'Amul Milk',
    unit: 'Liters',
    price: 60,
    stock: 12,
    threshold: 20,
    supplier: 'Mother Dairy Local',
  },
  {
    id: 'p2',
    name: 'Fresh Eggs',
    unit: 'pcs',
    price: 7,
    stock: 150,
    threshold: 50,
    supplier: 'Poultry Farm Direct',
  },
  {
    id: 'p3',
    name: 'Paneer (Cottage Cheese)',
    unit: 'kg',
    price: 320,
    stock: 5,
    threshold: 10,
    supplier: 'Amul Distributor',
  },
  {
    id: 'p4',
    name: 'Wheat Flour (Atta)',
    unit: 'kg',
    price: 40,
    stock: 120,
    threshold: 50,
    supplier: 'Anaj Bhandar Wholesale',
  },
  {
    id: 'p5',
    name: 'Cooking Oil',
    unit: 'Liters',
    price: 140,
    stock: 15,
    threshold: 30,
    supplier: 'Aggarwal Provision Store',
  },
];

export const initialExpenses: KitchenExpense[] = [
  {
    id: 'e1',
    date: '2026-07-25',
    category: 'Grocery / Grains',
    description: 'Purchased 120kg wheat flour and spices',
    amount: 4800,
    status: 'Paid',
  },
  {
    id: 'e2',
    date: '2026-07-24',
    category: 'Dairy',
    description: 'Weekly milk and paneer procurement',
    amount: 2400,
    status: 'Paid',
  },
  {
    id: 'e3',
    date: '2026-07-22',
    category: 'Eggs / Poultry',
    description: 'Egg crates from farm',
    amount: 1050,
    status: 'Paid',
  },
  {
    id: 'e4',
    date: '2026-07-20',
    category: 'Veggies / Fruits',
    description: 'Fresh vegetables and onions',
    amount: 1500,
    status: 'Paid',
  },
];

export const initialSuppliers: Supplier[] = [
  {
    id: 's1',
    name: 'Anaj Bhandar Wholesale',
    contactPerson: 'Vikram Gupta',
    phone: '+91 99881 22334',
    itemsSupplied: 'Wheat Flour, Rice, Pulses, Spices',
    address: 'Shop #14, Grain Market, Sector 12, City',
    lastDeliveryDate: '2026-07-25',
    paymentStatus: 'Paid',
  },
  {
    id: 's2',
    name: 'Mother Dairy Local',
    contactPerson: 'Ramesh Kumar',
    phone: '+91 99883 44556',
    itemsSupplied: 'Fresh Milk, Curd, Butter, Paneer',
    address: 'Booth #8, Dairy Complex, Main Road',
    lastDeliveryDate: '2026-07-28',
    paymentStatus: 'Pending',
  },
  {
    id: 's3',
    name: 'Poultry Farm Direct',
    contactPerson: 'Suresh Patel',
    phone: '+91 99884 55667',
    itemsSupplied: 'Farm Fresh Eggs',
    address: 'Village Farm Outlet, NH-44 Bypass',
    lastDeliveryDate: '2026-07-22',
    paymentStatus: 'Paid',
  },
  {
    id: 's4',
    name: 'Aggarwal Provision Store',
    contactPerson: 'Sanjay Aggarwal',
    phone: '+91 99882 33445',
    itemsSupplied: 'Edible Oils, Packaged Condiments, Tea',
    address: 'Store #4, Central Market, City',
    lastDeliveryDate: '2026-07-15',
    paymentStatus: 'Overdue',
  },
  {
    id: 's5',
    name: 'Green Leaf Mandi Traders',
    contactPerson: 'Arun Yadav',
    phone: '+91 99885 66778',
    itemsSupplied: 'Fresh Vegetables, Onions, Potatoes, Tomatoes',
    address: 'Shop #42, Sabzi Mandi, Main Market',
    lastDeliveryDate: '2026-08-05',
    paymentStatus: 'Paid',
  },
  {
    id: 's6',
    name: 'Fresh Fruits Suppliers',
    contactPerson: 'Mohammad Tariq',
    phone: '+91 99886 77889',
    itemsSupplied: 'Seasonal Fruits, Bananas, Apples, Oranges',
    address: 'Stall #12, Fruit Market Hub',
    lastDeliveryDate: '2026-08-06',
    paymentStatus: 'Pending',
  },
];

// Hostel Management Dashboard Data
export const initialHostelStats: HostelStat = {
  "totalHostels": 4,
  "totalRooms": 65,
  "totalBeds": 200,
  "occupiedBeds": 161,
  "vacantBeds": 39,
  "totalResidents": 161,
  "pendingRequests": 12,
  "todayCheckIns": 3,
  "todayCheckOuts": 1,
  "monthlyRevenue": 1368000,
  "collectedRevenue": 1120000,
  "pendingRevenue": 248000
};

export const initialFloorOccupancy: FloorOccupancy[] = [
  {
    "floor": "1st Floor",
    "totalBeds": 50,
    "occupiedBeds": 44,
    "percentage": 88
  },
  {
    "floor": "2nd Floor",
    "totalBeds": 50,
    "occupiedBeds": 42,
    "percentage": 84
  },
  {
    "floor": "3rd Floor",
    "totalBeds": 50,
    "occupiedBeds": 39,
    "percentage": 78
  },
  {
    "floor": "4th Floor",
    "totalBeds": 50,
    "occupiedBeds": 36,
    "percentage": 72
  }
];

export const initialAnnouncements: HostelAnnouncement[] = [
  {
    "id": "ann-1",
    "title": "Biometric & CCTV System Maintenance Notice",
    "category": "Maintenance",
    "date": "2026-08-05",
    "author": "Warden Sunitha",
    "content": "Overhead tank cleaning and biometric scanner servicing is scheduled for Sunday between 9:00 AM and 1:00 PM across all blocks.",
    "pinned": true
  },
  {
    "id": "ann-2",
    "title": "Special Weekend Mess Menu & Extended Hours",
    "category": "Food & Mess",
    "date": "2026-08-04",
    "author": "Mess Committee",
    "content": "Special Paneer Butter Masala & Gulab Jamun feast will be served this Sunday. Dinner timings extended till 10:00 PM.",
    "pinned": true
  },
  {
    "id": "ann-3",
    "title": "24/7 High-Speed Wi-Fi & Quiet Study Lounge Access",
    "category": "General",
    "date": "2026-08-02",
    "author": "Student Warden",
    "content": "In view of ongoing semester examinations, 2nd Floor Study Room will remain open 24/7 with dual-band fiber Wi-Fi.",
    "pinned": false
  }
];

export const initialHostelRooms: HostelRoom[] = [
  {
    id: 'r101',
    roomNumber: '101',
    floor: '1st Floor',
    sharingType: 'Double Attached',
    status: 'Occupied',
    totalBeds: 2,
    occupiedBeds: 2,
    vacantBeds: 0,
    rentPerMonth: 6500,
    facilities: ['Attached Bath', 'Balcony', 'Study Desks', 'Wi-Fi'],
    residents: [
      { name: 'Amit Verma', phone: '+91 98765 43210', checkInDate: '2025-08-10', course: 'B.Tech CSE' },
      { name: 'Siddharth Rao', phone: '+91 98765 43211', checkInDate: '2025-08-12', course: 'B.Tech ECE' },
    ],
  },
  {
    id: 'r102',
    roomNumber: '102',
    floor: '1st Floor',
    sharingType: 'Double Attached',
    status: 'Partially Occupied',
    totalBeds: 2,
    occupiedBeds: 1,
    vacantBeds: 1,
    rentPerMonth: 6500,
    facilities: ['Attached Bath', 'Wi-Fi', 'Wardrobe'],
    residents: [
      { name: 'Rohan Sharma', phone: '+91 98765 43212', checkInDate: '2025-09-01', course: 'B.Com Hons' },
    ],
  },
  {
    id: 'r103',
    roomNumber: '103',
    floor: '1st Floor',
    sharingType: 'Single AC',
    status: 'Occupied',
    totalBeds: 1,
    occupiedBeds: 1,
    vacantBeds: 0,
    rentPerMonth: 9500,
    facilities: ['AC', 'Attached Bath', 'Study Desk', 'Wi-Fi'],
    residents: [
      { name: 'Dr. Ananya Roy', phone: '+91 98765 43213', checkInDate: '2026-01-05', course: 'M.Tech AI' },
    ],
  },
  {
    id: 'r104',
    roomNumber: '104',
    floor: '1st Floor',
    sharingType: 'Triple Shared',
    status: 'Occupied',
    totalBeds: 3,
    occupiedBeds: 3,
    vacantBeds: 0,
    rentPerMonth: 5000,
    facilities: ['Common Bath', 'Wi-Fi', 'Lockers'],
    residents: [
      { name: 'Kabir Das', phone: '+91 98765 43214', checkInDate: '2025-08-15', course: 'B.Sc Physics' },
      { name: 'Nikhil Mehta', phone: '+91 98765 43215', checkInDate: '2025-08-16', course: 'B.Sc Chem' },
      { name: 'Yash Paul', phone: '+91 98765 43216', checkInDate: '2025-08-20', course: 'B.Sc Math' },
    ],
  },
  {
    id: 'r201',
    roomNumber: '201',
    floor: '2nd Floor',
    sharingType: 'Single AC',
    status: 'Vacant',
    totalBeds: 1,
    occupiedBeds: 0,
    vacantBeds: 1,
    rentPerMonth: 9500,
    facilities: ['AC', 'Attached Bath', 'Balcony', 'Wi-Fi'],
    residents: [],
  },
  {
    id: 'r202',
    roomNumber: '202',
    floor: '2nd Floor',
    sharingType: 'Double Attached',
    status: 'Occupied',
    totalBeds: 2,
    occupiedBeds: 2,
    vacantBeds: 0,
    rentPerMonth: 6500,
    facilities: ['Attached Bath', 'Wi-Fi', 'Study Lamp'],
    residents: [
      { name: 'Aditya Patel', phone: '+91 98765 43217', checkInDate: '2025-08-11', course: 'MBA Marketing' },
      { name: 'Varun Dhawan', phone: '+91 98765 43218', checkInDate: '2025-08-14', course: 'MBA Finance' },
    ],
  },
  {
    id: 'r203',
    roomNumber: '203',
    floor: '2nd Floor',
    sharingType: '4-Sharing',
    status: 'Partially Occupied',
    totalBeds: 4,
    occupiedBeds: 3,
    vacantBeds: 1,
    rentPerMonth: 4200,
    facilities: ['Common Bath', 'Wi-Fi', 'Lockers'],
    residents: [
      { name: 'Kunal Shah', phone: '+91 98765 43219', checkInDate: '2025-09-10', course: 'BCA' },
      { name: 'Manish Goel', phone: '+91 98765 43220', checkInDate: '2025-09-11', course: 'BCA' },
      { name: 'Deepak Joshi', phone: '+91 98765 43221', checkInDate: '2025-09-15', course: 'MCA' },
    ],
  },
  {
    id: 'r204',
    roomNumber: '204',
    floor: '2nd Floor',
    sharingType: 'Double Attached',
    status: 'Maintenance',
    totalBeds: 2,
    occupiedBeds: 0,
    vacantBeds: 2,
    rentPerMonth: 6500,
    facilities: ['Plumbing Overhaul', 'Paint Touchup'],
    residents: [],
  },
  {
    id: 'r301',
    roomNumber: '301',
    floor: '3rd Floor',
    sharingType: 'Single AC',
    status: 'Occupied',
    totalBeds: 1,
    occupiedBeds: 1,
    vacantBeds: 0,
    rentPerMonth: 9500,
    facilities: ['AC', 'Attached Bath', 'Wi-Fi'],
    residents: [
      { name: 'Vikram Singh', phone: '+91 98765 43222', checkInDate: '2025-08-01', course: 'Ph.D Biotech' },
    ],
  },
  {
    id: 'r302',
    roomNumber: '302',
    floor: '3rd Floor',
    sharingType: 'Double Attached',
    status: 'Occupied',
    totalBeds: 2,
    occupiedBeds: 2,
    vacantBeds: 0,
    rentPerMonth: 6500,
    facilities: ['Attached Bath', 'Wi-Fi'],
    residents: [
      { name: 'Rahul Gupta', phone: '+91 98765 43223', checkInDate: '2025-08-05', course: 'B.Tech IT' },
      { name: 'Gaurav Kumar', phone: '+91 98765 43224', checkInDate: '2025-08-08', course: 'B.Tech Mechanical' },
    ],
  },
  {
    id: 'r303',
    roomNumber: '303',
    floor: '3rd Floor',
    sharingType: 'Triple Shared',
    status: 'Partially Occupied',
    totalBeds: 3,
    occupiedBeds: 2,
    vacantBeds: 1,
    rentPerMonth: 5000,
    facilities: ['Common Bath', 'Wi-Fi'],
    residents: [
      { name: 'Sanjay Dutt', phone: '+91 98765 43225', checkInDate: '2025-08-02', course: 'BA English' },
      { name: 'Prateek Sen', phone: '+91 98765 43226', checkInDate: '2025-08-03', course: 'BA History' },
    ],
  },
  {
    id: 'r304',
    roomNumber: '304',
    floor: '3rd Floor',
    sharingType: 'Double Attached',
    status: 'Vacant',
    totalBeds: 2,
    occupiedBeds: 0,
    vacantBeds: 2,
    rentPerMonth: 6500,
    facilities: ['Attached Bath', 'Wi-Fi'],
    residents: [],
  },
];

export const initialResidentRequests: ResidentRequest[] = [
  {
    "id": "req-01",
    "residentName": "Ananya Sharma",
    "roomNumber": "101",
    "type": "Sick Meal",
    "details": "Requested light Khichdi and Curd for Lunch (mild fever).",
    "status": "Pending",
    "date": "2026-08-06",
    "priority": "High",
    "avatarBg": "#3b82f6"
  },
  {
    "id": "req-02",
    "residentName": "Riya Verma",
    "roomNumber": "202",
    "type": "Leave Request",
    "details": "Weekend home leave permission from Friday Aug 8 to Sunday Aug 10.",
    "status": "Approved",
    "date": "2026-08-06",
    "priority": "Medium",
    "avatarBg": "#10b981"
  },
  {
    "id": "req-03",
    "residentName": "Sneha Reddy",
    "roomNumber": "303",
    "type": "Maintenance",
    "details": "AC remote battery replacement & filter cleaning needed in Room.",
    "status": "Pending",
    "date": "2026-08-05",
    "priority": "High",
    "avatarBg": "#ef4444"
  },
  {
    "id": "req-04",
    "residentName": "Kavya Nair",
    "roomNumber": "404",
    "type": "Room Request",
    "details": "Requesting room change from 4-Sharing to 2-Sharing Double Attached.",
    "status": "Pending",
    "date": "2026-08-05",
    "priority": "Medium",
    "avatarBg": "#8b5cf6"
  },
  {
    "id": "req-05",
    "residentName": "Pooja Hegde",
    "roomNumber": "101",
    "type": "Complaint",
    "details": "Wi-Fi connectivity flickering on 2nd Floor East Wing.",
    "status": "Completed",
    "date": "2026-08-04",
    "priority": "Low",
    "avatarBg": "#f59e0b"
  }
];

export const initialFeeTransactions: FeeTransaction[] = [
  {
    "id": "ft-101",
    "studentName": "Ananya Sharma",
    "roomNumber": "101",
    "month": "July 2026",
    "amount": 12500,
    "amountPaid": 12500,
    "dues": 0,
    "status": "Paid",
    "date": "2026-07-28",
    "uploadedDate": "28 Jul, 10:00 am",
    "lastPaymentDate": "28 Jul 2026",
    "paymentMethod": "UPI / GPay",
    "phone": "9876510002",
    "history": [
      {
        "id": "h-1",
        "date": "2026-07-28",
        "amountPaid": 12500,
        "paymentMethod": "UPI / GPay",
        "receiptNo": "REC-2026-700"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-1-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 12500,
        "amountPaid": 12500,
        "dues": 0,
        "status": "Paid",
        "lastPaymentDate": "28 Jul 2026",
        "history": [
          {
            "id": "h-1",
            "date": "2026-07-28",
            "amountPaid": 12500,
            "paymentMethod": "UPI / GPay",
            "receiptNo": "REC-2026-700"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-102",
    "studentName": "Riya Verma",
    "roomNumber": "202",
    "month": "July 2026",
    "amount": 8500,
    "amountPaid": 8500,
    "dues": 0,
    "status": "Paid",
    "date": "2026-07-27",
    "uploadedDate": "27 Jul, 10:00 am",
    "lastPaymentDate": "27 Jul 2026",
    "paymentMethod": "NetBanking",
    "phone": "9876510003",
    "history": [
      {
        "id": "h-2",
        "date": "2026-07-27",
        "amountPaid": 8500,
        "paymentMethod": "NetBanking",
        "receiptNo": "REC-2026-701"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-2-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 8500,
        "amountPaid": 8500,
        "dues": 0,
        "status": "Paid",
        "lastPaymentDate": "27 Jul 2026",
        "history": [
          {
            "id": "h-2",
            "date": "2026-07-27",
            "amountPaid": 8500,
            "paymentMethod": "NetBanking",
            "receiptNo": "REC-2026-701"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-103",
    "studentName": "Sneha Reddy",
    "roomNumber": "303",
    "month": "July 2026",
    "amount": 7000,
    "amountPaid": 7000,
    "dues": 0,
    "status": "Paid",
    "date": "2026-07-26",
    "uploadedDate": "26 Jul, 10:00 am",
    "lastPaymentDate": "26 Jul 2026",
    "paymentMethod": "Cash",
    "phone": "9876510004",
    "history": [
      {
        "id": "h-3",
        "date": "2026-07-26",
        "amountPaid": 7000,
        "paymentMethod": "Cash",
        "receiptNo": "REC-2026-702"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-3-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 7000,
        "amountPaid": 7000,
        "dues": 0,
        "status": "Paid",
        "lastPaymentDate": "26 Jul 2026",
        "history": [
          {
            "id": "h-3",
            "date": "2026-07-26",
            "amountPaid": 7000,
            "paymentMethod": "NetBanking",
            "receiptNo": "REC-2026-702"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-104",
    "studentName": "Kavya Nair",
    "roomNumber": "404",
    "month": "July 2026",
    "amount": 5500,
    "amountPaid": 4000,
    "dues": 1500,
    "status": "Partial",
    "date": "2026-07-25",
    "uploadedDate": "25 Jul, 10:00 am",
    "lastPaymentDate": "20 Jun 2026",
    "paymentMethod": "UPI / GPay",
    "phone": "9876510005",
    "history": [
      {
        "id": "h-4",
        "date": "2026-07-25",
        "amountPaid": 4000,
        "paymentMethod": "UPI / GPay",
        "receiptNo": "REC-2026-703"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-4-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 5500,
        "amountPaid": 4000,
        "dues": 1500,
        "status": "Partial",
        "lastPaymentDate": "25 Jul 2026",
        "history": [
          {
            "id": "h-4",
            "date": "2026-07-25",
            "amountPaid": 4000,
            "paymentMethod": "UPI / GPay",
            "receiptNo": "REC-2026-703"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-105",
    "studentName": "Pooja Hegde",
    "roomNumber": "101",
    "month": "July 2026",
    "amount": 12500,
    "amountPaid": 10000,
    "dues": 2500,
    "status": "Partial",
    "date": "2026-07-24",
    "uploadedDate": "24 Jul, 10:00 am",
    "lastPaymentDate": "20 Jun 2026",
    "paymentMethod": "NetBanking",
    "phone": "9876510006",
    "history": [
      {
        "id": "h-5",
        "date": "2026-07-24",
        "amountPaid": 10000,
        "paymentMethod": "NetBanking",
        "receiptNo": "REC-2026-704"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-5-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 12500,
        "amountPaid": 10000,
        "dues": 2500,
        "status": "Partial",
        "lastPaymentDate": "24 Jul 2026",
        "history": [
          {
            "id": "h-5",
            "date": "2026-07-24",
            "amountPaid": 10000,
            "paymentMethod": "NetBanking",
            "receiptNo": "REC-2026-704"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-106",
    "studentName": "Meera Patel",
    "roomNumber": "202",
    "month": "July 2026",
    "amount": 8500,
    "amountPaid": 4000,
    "dues": 4500,
    "status": "Partial",
    "date": "2026-07-23",
    "uploadedDate": "23 Jul, 10:00 am",
    "lastPaymentDate": "20 Jun 2026",
    "paymentMethod": "Cash",
    "phone": "9876510007",
    "history": [
      {
        "id": "h-6",
        "date": "2026-07-23",
        "amountPaid": 4000,
        "paymentMethod": "Cash",
        "receiptNo": "REC-2026-705"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-6-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 8500,
        "amountPaid": 4000,
        "dues": 4500,
        "status": "Partial",
        "lastPaymentDate": "23 Jul 2026",
        "history": [
          {
            "id": "h-6",
            "date": "2026-07-23",
            "amountPaid": 4000,
            "paymentMethod": "NetBanking",
            "receiptNo": "REC-2026-705"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-107",
    "studentName": "Divya Joshi",
    "roomNumber": "303",
    "month": "July 2026",
    "amount": 7000,
    "amountPaid": 7000,
    "dues": 0,
    "status": "Paid",
    "date": "2026-07-22",
    "uploadedDate": "22 Jul, 10:00 am",
    "lastPaymentDate": "22 Jul 2026",
    "paymentMethod": "UPI / GPay",
    "phone": "9876510008",
    "history": [
      {
        "id": "h-7",
        "date": "2026-07-22",
        "amountPaid": 7000,
        "paymentMethod": "UPI / GPay",
        "receiptNo": "REC-2026-706"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-7-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 7000,
        "amountPaid": 7000,
        "dues": 0,
        "status": "Paid",
        "lastPaymentDate": "22 Jul 2026",
        "history": [
          {
            "id": "h-7",
            "date": "2026-07-22",
            "amountPaid": 7000,
            "paymentMethod": "UPI / GPay",
            "receiptNo": "REC-2026-706"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-108",
    "studentName": "Sunita Rao",
    "roomNumber": "404",
    "month": "July 2026",
    "amount": 5500,
    "amountPaid": 5500,
    "dues": 0,
    "status": "Paid",
    "date": "2026-07-21",
    "uploadedDate": "21 Jul, 10:00 am",
    "lastPaymentDate": "21 Jul 2026",
    "paymentMethod": "NetBanking",
    "phone": "9876510009",
    "history": [
      {
        "id": "h-8",
        "date": "2026-07-21",
        "amountPaid": 5500,
        "paymentMethod": "NetBanking",
        "receiptNo": "REC-2026-707"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-8-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 5500,
        "amountPaid": 5500,
        "dues": 0,
        "status": "Paid",
        "lastPaymentDate": "21 Jul 2026",
        "history": [
          {
            "id": "h-8",
            "date": "2026-07-21",
            "amountPaid": 5500,
            "paymentMethod": "NetBanking",
            "receiptNo": "REC-2026-707"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-109",
    "studentName": "Swati Kulkarni",
    "roomNumber": "101",
    "month": "July 2026",
    "amount": 12500,
    "amountPaid": 12500,
    "dues": 0,
    "status": "Paid",
    "date": "2026-07-20",
    "uploadedDate": "20 Jul, 10:00 am",
    "lastPaymentDate": "20 Jul 2026",
    "paymentMethod": "Cash",
    "phone": "9876510010",
    "history": [
      {
        "id": "h-9",
        "date": "2026-07-20",
        "amountPaid": 12500,
        "paymentMethod": "Cash",
        "receiptNo": "REC-2026-708"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-9-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 12500,
        "amountPaid": 12500,
        "dues": 0,
        "status": "Paid",
        "lastPaymentDate": "20 Jul 2026",
        "history": [
          {
            "id": "h-9",
            "date": "2026-07-20",
            "amountPaid": 12500,
            "paymentMethod": "NetBanking",
            "receiptNo": "REC-2026-708"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-110",
    "studentName": "Priyanka Das",
    "roomNumber": "202",
    "month": "July 2026",
    "amount": 8500,
    "amountPaid": 8500,
    "dues": 0,
    "status": "Paid",
    "date": "2026-07-19",
    "uploadedDate": "19 Jul, 10:00 am",
    "lastPaymentDate": "19 Jul 2026",
    "paymentMethod": "UPI / GPay",
    "phone": "9876510011",
    "history": [
      {
        "id": "h-10",
        "date": "2026-07-19",
        "amountPaid": 8500,
        "paymentMethod": "UPI / GPay",
        "receiptNo": "REC-2026-709"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-10-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 8500,
        "amountPaid": 8500,
        "dues": 0,
        "status": "Paid",
        "lastPaymentDate": "19 Jul 2026",
        "history": [
          {
            "id": "h-10",
            "date": "2026-07-19",
            "amountPaid": 8500,
            "paymentMethod": "UPI / GPay",
            "receiptNo": "REC-2026-709"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-111",
    "studentName": "Aditi Deshmukh",
    "roomNumber": "303",
    "month": "July 2026",
    "amount": 7000,
    "amountPaid": 5500,
    "dues": 1500,
    "status": "Partial",
    "date": "2026-07-18",
    "uploadedDate": "18 Jul, 10:00 am",
    "lastPaymentDate": "20 Jun 2026",
    "paymentMethod": "NetBanking",
    "phone": "9876510012",
    "history": [
      {
        "id": "h-11",
        "date": "2026-07-18",
        "amountPaid": 5500,
        "paymentMethod": "NetBanking",
        "receiptNo": "REC-2026-710"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-11-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 7000,
        "amountPaid": 5500,
        "dues": 1500,
        "status": "Partial",
        "lastPaymentDate": "18 Jul 2026",
        "history": [
          {
            "id": "h-11",
            "date": "2026-07-18",
            "amountPaid": 5500,
            "paymentMethod": "NetBanking",
            "receiptNo": "REC-2026-710"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-112",
    "studentName": "Trisha Sen",
    "roomNumber": "404",
    "month": "July 2026",
    "amount": 5500,
    "amountPaid": 3000,
    "dues": 2500,
    "status": "Partial",
    "date": "2026-07-17",
    "uploadedDate": "17 Jul, 10:00 am",
    "lastPaymentDate": "20 Jun 2026",
    "paymentMethod": "Cash",
    "phone": "9876510013",
    "history": [
      {
        "id": "h-12",
        "date": "2026-07-17",
        "amountPaid": 3000,
        "paymentMethod": "Cash",
        "receiptNo": "REC-2026-711"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-12-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 5500,
        "amountPaid": 3000,
        "dues": 2500,
        "status": "Partial",
        "lastPaymentDate": "17 Jul 2026",
        "history": [
          {
            "id": "h-12",
            "date": "2026-07-17",
            "amountPaid": 3000,
            "paymentMethod": "NetBanking",
            "receiptNo": "REC-2026-711"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-113",
    "studentName": "Rashmi Bhat",
    "roomNumber": "101",
    "month": "July 2026",
    "amount": 12500,
    "amountPaid": 8000,
    "dues": 4500,
    "status": "Partial",
    "date": "2026-07-16",
    "uploadedDate": "16 Jul, 10:00 am",
    "lastPaymentDate": "20 Jun 2026",
    "paymentMethod": "UPI / GPay",
    "phone": "9876510014",
    "history": [
      {
        "id": "h-13",
        "date": "2026-07-16",
        "amountPaid": 8000,
        "paymentMethod": "UPI / GPay",
        "receiptNo": "REC-2026-712"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-13-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 12500,
        "amountPaid": 8000,
        "dues": 4500,
        "status": "Partial",
        "lastPaymentDate": "16 Jul 2026",
        "history": [
          {
            "id": "h-13",
            "date": "2026-07-16",
            "amountPaid": 8000,
            "paymentMethod": "UPI / GPay",
            "receiptNo": "REC-2026-712"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-114",
    "studentName": "Akanksha Saxena",
    "roomNumber": "202",
    "month": "July 2026",
    "amount": 8500,
    "amountPaid": 8500,
    "dues": 0,
    "status": "Paid",
    "date": "2026-07-15",
    "uploadedDate": "15 Jul, 10:00 am",
    "lastPaymentDate": "15 Jul 2026",
    "paymentMethod": "NetBanking",
    "phone": "9876510015",
    "history": [
      {
        "id": "h-14",
        "date": "2026-07-15",
        "amountPaid": 8500,
        "paymentMethod": "NetBanking",
        "receiptNo": "REC-2026-713"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-14-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 8500,
        "amountPaid": 8500,
        "dues": 0,
        "status": "Paid",
        "lastPaymentDate": "15 Jul 2026",
        "history": [
          {
            "id": "h-14",
            "date": "2026-07-15",
            "amountPaid": 8500,
            "paymentMethod": "NetBanking",
            "receiptNo": "REC-2026-713"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-115",
    "studentName": "Tanvi Mehta",
    "roomNumber": "303",
    "month": "July 2026",
    "amount": 7000,
    "amountPaid": 7000,
    "dues": 0,
    "status": "Paid",
    "date": "2026-07-14",
    "uploadedDate": "14 Jul, 10:00 am",
    "lastPaymentDate": "14 Jul 2026",
    "paymentMethod": "Cash",
    "phone": "9876510016",
    "history": [
      {
        "id": "h-15",
        "date": "2026-07-14",
        "amountPaid": 7000,
        "paymentMethod": "Cash",
        "receiptNo": "REC-2026-714"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-15-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 7000,
        "amountPaid": 7000,
        "dues": 0,
        "status": "Paid",
        "lastPaymentDate": "14 Jul 2026",
        "history": [
          {
            "id": "h-15",
            "date": "2026-07-14",
            "amountPaid": 7000,
            "paymentMethod": "NetBanking",
            "receiptNo": "REC-2026-714"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-116",
    "studentName": "Ishita Roy",
    "roomNumber": "404",
    "month": "July 2026",
    "amount": 5500,
    "amountPaid": 5500,
    "dues": 0,
    "status": "Paid",
    "date": "2026-07-28",
    "uploadedDate": "28 Jul, 10:00 am",
    "lastPaymentDate": "28 Jul 2026",
    "paymentMethod": "UPI / GPay",
    "phone": "9876510017",
    "history": [
      {
        "id": "h-16",
        "date": "2026-07-28",
        "amountPaid": 5500,
        "paymentMethod": "UPI / GPay",
        "receiptNo": "REC-2026-715"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-16-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 5500,
        "amountPaid": 5500,
        "dues": 0,
        "status": "Paid",
        "lastPaymentDate": "28 Jul 2026",
        "history": [
          {
            "id": "h-16",
            "date": "2026-07-28",
            "amountPaid": 5500,
            "paymentMethod": "UPI / GPay",
            "receiptNo": "REC-2026-715"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-117",
    "studentName": "Niharika Gupta",
    "roomNumber": "101",
    "month": "July 2026",
    "amount": 12500,
    "amountPaid": 12500,
    "dues": 0,
    "status": "Paid",
    "date": "2026-07-27",
    "uploadedDate": "27 Jul, 10:00 am",
    "lastPaymentDate": "27 Jul 2026",
    "paymentMethod": "NetBanking",
    "phone": "9876510018",
    "history": [
      {
        "id": "h-17",
        "date": "2026-07-27",
        "amountPaid": 12500,
        "paymentMethod": "NetBanking",
        "receiptNo": "REC-2026-716"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-17-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 12500,
        "amountPaid": 12500,
        "dues": 0,
        "status": "Paid",
        "lastPaymentDate": "27 Jul 2026",
        "history": [
          {
            "id": "h-17",
            "date": "2026-07-27",
            "amountPaid": 12500,
            "paymentMethod": "NetBanking",
            "receiptNo": "REC-2026-716"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-118",
    "studentName": "Shreya Malhotra",
    "roomNumber": "202",
    "month": "July 2026",
    "amount": 8500,
    "amountPaid": 7000,
    "dues": 1500,
    "status": "Partial",
    "date": "2026-07-26",
    "uploadedDate": "26 Jul, 10:00 am",
    "lastPaymentDate": "20 Jun 2026",
    "paymentMethod": "Cash",
    "phone": "9876510019",
    "history": [
      {
        "id": "h-18",
        "date": "2026-07-26",
        "amountPaid": 7000,
        "paymentMethod": "Cash",
        "receiptNo": "REC-2026-717"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-18-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 8500,
        "amountPaid": 7000,
        "dues": 1500,
        "status": "Partial",
        "lastPaymentDate": "26 Jul 2026",
        "history": [
          {
            "id": "h-18",
            "date": "2026-07-26",
            "amountPaid": 7000,
            "paymentMethod": "NetBanking",
            "receiptNo": "REC-2026-717"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-119",
    "studentName": "Deepika Singh",
    "roomNumber": "303",
    "month": "July 2026",
    "amount": 7000,
    "amountPaid": 4500,
    "dues": 2500,
    "status": "Partial",
    "date": "2026-07-25",
    "uploadedDate": "25 Jul, 10:00 am",
    "lastPaymentDate": "20 Jun 2026",
    "paymentMethod": "UPI / GPay",
    "phone": "9876510020",
    "history": [
      {
        "id": "h-19",
        "date": "2026-07-25",
        "amountPaid": 4500,
        "paymentMethod": "UPI / GPay",
        "receiptNo": "REC-2026-718"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-19-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 7000,
        "amountPaid": 4500,
        "dues": 2500,
        "status": "Partial",
        "lastPaymentDate": "25 Jul 2026",
        "history": [
          {
            "id": "h-19",
            "date": "2026-07-25",
            "amountPaid": 4500,
            "paymentMethod": "UPI / GPay",
            "receiptNo": "REC-2026-718"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-120",
    "studentName": "Aparna Kumar",
    "roomNumber": "404",
    "month": "July 2026",
    "amount": 5500,
    "amountPaid": 1000,
    "dues": 4500,
    "status": "Partial",
    "date": "2026-07-24",
    "uploadedDate": "24 Jul, 10:00 am",
    "lastPaymentDate": "20 Jun 2026",
    "paymentMethod": "NetBanking",
    "phone": "9876510021",
    "history": [
      {
        "id": "h-20",
        "date": "2026-07-24",
        "amountPaid": 1000,
        "paymentMethod": "NetBanking",
        "receiptNo": "REC-2026-719"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-20-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 5500,
        "amountPaid": 1000,
        "dues": 4500,
        "status": "Partial",
        "lastPaymentDate": "24 Jul 2026",
        "history": [
          {
            "id": "h-20",
            "date": "2026-07-24",
            "amountPaid": 1000,
            "paymentMethod": "NetBanking",
            "receiptNo": "REC-2026-719"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-121",
    "studentName": "Bhavana Rajpoot",
    "roomNumber": "101",
    "month": "July 2026",
    "amount": 12500,
    "amountPaid": 12500,
    "dues": 0,
    "status": "Paid",
    "date": "2026-07-23",
    "uploadedDate": "23 Jul, 10:00 am",
    "lastPaymentDate": "23 Jul 2026",
    "paymentMethod": "Cash",
    "phone": "9876510022",
    "history": [
      {
        "id": "h-21",
        "date": "2026-07-23",
        "amountPaid": 12500,
        "paymentMethod": "Cash",
        "receiptNo": "REC-2026-720"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-21-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 12500,
        "amountPaid": 12500,
        "dues": 0,
        "status": "Paid",
        "lastPaymentDate": "23 Jul 2026",
        "history": [
          {
            "id": "h-21",
            "date": "2026-07-23",
            "amountPaid": 12500,
            "paymentMethod": "NetBanking",
            "receiptNo": "REC-2026-720"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-122",
    "studentName": "Charulata Shah",
    "roomNumber": "202",
    "month": "July 2026",
    "amount": 8500,
    "amountPaid": 8500,
    "dues": 0,
    "status": "Paid",
    "date": "2026-07-22",
    "uploadedDate": "22 Jul, 10:00 am",
    "lastPaymentDate": "22 Jul 2026",
    "paymentMethod": "UPI / GPay",
    "phone": "9876510023",
    "history": [
      {
        "id": "h-22",
        "date": "2026-07-22",
        "amountPaid": 8500,
        "paymentMethod": "UPI / GPay",
        "receiptNo": "REC-2026-721"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-22-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 8500,
        "amountPaid": 8500,
        "dues": 0,
        "status": "Paid",
        "lastPaymentDate": "22 Jul 2026",
        "history": [
          {
            "id": "h-22",
            "date": "2026-07-22",
            "amountPaid": 8500,
            "paymentMethod": "UPI / GPay",
            "receiptNo": "REC-2026-721"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-123",
    "studentName": "Drishti Goel",
    "roomNumber": "303",
    "month": "July 2026",
    "amount": 7000,
    "amountPaid": 7000,
    "dues": 0,
    "status": "Paid",
    "date": "2026-07-21",
    "uploadedDate": "21 Jul, 10:00 am",
    "lastPaymentDate": "21 Jul 2026",
    "paymentMethod": "NetBanking",
    "phone": "9876510024",
    "history": [
      {
        "id": "h-23",
        "date": "2026-07-21",
        "amountPaid": 7000,
        "paymentMethod": "NetBanking",
        "receiptNo": "REC-2026-722"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-23-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 7000,
        "amountPaid": 7000,
        "dues": 0,
        "status": "Paid",
        "lastPaymentDate": "21 Jul 2026",
        "history": [
          {
            "id": "h-23",
            "date": "2026-07-21",
            "amountPaid": 7000,
            "paymentMethod": "NetBanking",
            "receiptNo": "REC-2026-722"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-124",
    "studentName": "Ekta Dutt",
    "roomNumber": "404",
    "month": "July 2026",
    "amount": 5500,
    "amountPaid": 5500,
    "dues": 0,
    "status": "Paid",
    "date": "2026-07-20",
    "uploadedDate": "20 Jul, 10:00 am",
    "lastPaymentDate": "20 Jul 2026",
    "paymentMethod": "Cash",
    "phone": "9876510025",
    "history": [
      {
        "id": "h-24",
        "date": "2026-07-20",
        "amountPaid": 5500,
        "paymentMethod": "Cash",
        "receiptNo": "REC-2026-723"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-24-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 5500,
        "amountPaid": 5500,
        "dues": 0,
        "status": "Paid",
        "lastPaymentDate": "20 Jul 2026",
        "history": [
          {
            "id": "h-24",
            "date": "2026-07-20",
            "amountPaid": 5500,
            "paymentMethod": "NetBanking",
            "receiptNo": "REC-2026-723"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-125",
    "studentName": "Farida Dhawan",
    "roomNumber": "101",
    "month": "July 2026",
    "amount": 12500,
    "amountPaid": 11000,
    "dues": 1500,
    "status": "Partial",
    "date": "2026-07-19",
    "uploadedDate": "19 Jul, 10:00 am",
    "lastPaymentDate": "20 Jun 2026",
    "paymentMethod": "UPI / GPay",
    "phone": "9876510026",
    "history": [
      {
        "id": "h-25",
        "date": "2026-07-19",
        "amountPaid": 11000,
        "paymentMethod": "UPI / GPay",
        "receiptNo": "REC-2026-724"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-25-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 12500,
        "amountPaid": 11000,
        "dues": 1500,
        "status": "Partial",
        "lastPaymentDate": "19 Jul 2026",
        "history": [
          {
            "id": "h-25",
            "date": "2026-07-19",
            "amountPaid": 11000,
            "paymentMethod": "UPI / GPay",
            "receiptNo": "REC-2026-724"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-126",
    "studentName": "Gautami Agrawal",
    "roomNumber": "202",
    "month": "July 2026",
    "amount": 8500,
    "amountPaid": 6000,
    "dues": 2500,
    "status": "Partial",
    "date": "2026-07-18",
    "uploadedDate": "18 Jul, 10:00 am",
    "lastPaymentDate": "20 Jun 2026",
    "paymentMethod": "NetBanking",
    "phone": "9876510027",
    "history": [
      {
        "id": "h-26",
        "date": "2026-07-18",
        "amountPaid": 6000,
        "paymentMethod": "NetBanking",
        "receiptNo": "REC-2026-725"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-26-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 8500,
        "amountPaid": 6000,
        "dues": 2500,
        "status": "Partial",
        "lastPaymentDate": "18 Jul 2026",
        "history": [
          {
            "id": "h-26",
            "date": "2026-07-18",
            "amountPaid": 6000,
            "paymentMethod": "NetBanking",
            "receiptNo": "REC-2026-725"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-127",
    "studentName": "Harini Choudhury",
    "roomNumber": "303",
    "month": "July 2026",
    "amount": 7000,
    "amountPaid": 2500,
    "dues": 4500,
    "status": "Partial",
    "date": "2026-07-17",
    "uploadedDate": "17 Jul, 10:00 am",
    "lastPaymentDate": "20 Jun 2026",
    "paymentMethod": "Cash",
    "phone": "9876510028",
    "history": [
      {
        "id": "h-27",
        "date": "2026-07-17",
        "amountPaid": 2500,
        "paymentMethod": "Cash",
        "receiptNo": "REC-2026-726"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-27-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 7000,
        "amountPaid": 2500,
        "dues": 4500,
        "status": "Partial",
        "lastPaymentDate": "17 Jul 2026",
        "history": [
          {
            "id": "h-27",
            "date": "2026-07-17",
            "amountPaid": 2500,
            "paymentMethod": "NetBanking",
            "receiptNo": "REC-2026-726"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-128",
    "studentName": "Indu Pande",
    "roomNumber": "404",
    "month": "July 2026",
    "amount": 5500,
    "amountPaid": 5500,
    "dues": 0,
    "status": "Paid",
    "date": "2026-07-16",
    "uploadedDate": "16 Jul, 10:00 am",
    "lastPaymentDate": "16 Jul 2026",
    "paymentMethod": "UPI / GPay",
    "phone": "9876510029",
    "history": [
      {
        "id": "h-28",
        "date": "2026-07-16",
        "amountPaid": 5500,
        "paymentMethod": "UPI / GPay",
        "receiptNo": "REC-2026-727"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-28-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 5500,
        "amountPaid": 5500,
        "dues": 0,
        "status": "Paid",
        "lastPaymentDate": "16 Jul 2026",
        "history": [
          {
            "id": "h-28",
            "date": "2026-07-16",
            "amountPaid": 5500,
            "paymentMethod": "UPI / GPay",
            "receiptNo": "REC-2026-727"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-129",
    "studentName": "Jaya Mishra",
    "roomNumber": "101",
    "month": "July 2026",
    "amount": 12500,
    "amountPaid": 12500,
    "dues": 0,
    "status": "Paid",
    "date": "2026-07-15",
    "uploadedDate": "15 Jul, 10:00 am",
    "lastPaymentDate": "15 Jul 2026",
    "paymentMethod": "NetBanking",
    "phone": "9876510030",
    "history": [
      {
        "id": "h-29",
        "date": "2026-07-15",
        "amountPaid": 12500,
        "paymentMethod": "NetBanking",
        "receiptNo": "REC-2026-728"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-29-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 12500,
        "amountPaid": 12500,
        "dues": 0,
        "status": "Paid",
        "lastPaymentDate": "15 Jul 2026",
        "history": [
          {
            "id": "h-29",
            "date": "2026-07-15",
            "amountPaid": 12500,
            "paymentMethod": "NetBanking",
            "receiptNo": "REC-2026-728"
          }
        ]
      }
    ]
  },
  {
    "id": "ft-130",
    "studentName": "Krutika Tiwari",
    "roomNumber": "202",
    "month": "July 2026",
    "amount": 8500,
    "amountPaid": 8500,
    "dues": 0,
    "status": "Paid",
    "date": "2026-07-14",
    "uploadedDate": "14 Jul, 10:00 am",
    "lastPaymentDate": "14 Jul 2026",
    "paymentMethod": "Cash",
    "phone": "9876510031",
    "history": [
      {
        "id": "h-30",
        "date": "2026-07-14",
        "amountPaid": 8500,
        "paymentMethod": "Cash",
        "receiptNo": "REC-2026-729"
      }
    ],
    "monthlyRecords": [
      {
        "id": "mr-30-jul",
        "monthName": "July 2026",
        "isCurrentMonth": true,
        "dateRange": "01-07-2026 to 31-07-2026",
        "amount": 8500,
        "amountPaid": 8500,
        "dues": 0,
        "status": "Paid",
        "lastPaymentDate": "14 Jul 2026",
        "history": [
          {
            "id": "h-30",
            "date": "2026-07-14",
            "amountPaid": 8500,
            "paymentMethod": "NetBanking",
            "receiptNo": "REC-2026-729"
          }
        ]
      }
    ]
  }
];

export const initialActivities: ActivityItem[] = [
  {
    "id": "act-1",
    "time": "12m ago",
    "title": "New Check-in Registered",
    "description": "Ananya Sharma checked in to Room 101.",
    "category": "checkin"
  },
  {
    "id": "act-2",
    "time": "45m ago",
    "title": "Sick Meal Request Received",
    "description": "Ananya Sharma (Room 101) requested Light Khichdi.",
    "category": "request"
  },
  {
    "id": "act-3",
    "time": "2h ago",
    "title": "Fee Payment Received",
    "description": "₹8500 received via UPI from Riya Verma (Room 202).",
    "category": "payment"
  },
  {
    "id": "act-4",
    "time": "4h ago",
    "title": "Maintenance Marked Done",
    "description": "Geyser repair in Room 102 resolved by Maintenance Staff.",
    "category": "maintenance"
  }
];

export const initialHostelsData = [
  {
    "id": "h1",
    "name": "Sri Akshara Luxury Girls Hostel",
    "type": "Girls Hostel",
    "owner": "Smt. Radhika Reddy",
    "manager": "Mrs. Sunitha Sharma",
    "contact": "+91 98490 12345",
    "email": "contact@aksharagirlshostel.com",
    "address": "Plot 42, Silicon Valley Colony, Gachibowli, Hyderabad",
    "capacity": 50,
    "currentOccupancy": 40,
    "floorsCount": 4,
    "roomsCount": 16,
    "status": "Operational",
    "facilities": [
      "High-Speed Wi-Fi",
      "24/7 Security & CCTV",
      "Three Meals & Snacks",
      "Daily Housekeeping",
      "Hot Water Geyser",
      "Biometric Entry"
    ],
    "rules": [
      "Curfew time 9:30 PM",
      "Visitors allowed only in reception",
      "No outside food in bedrooms",
      "Quiet hours 10:00 PM to 6:00 AM"
    ],
    "description": "Premier luxury hostel for women with high-grade security, nutritious meals, and modern amenities near Gachibowli IT hub.",
    "createdDate": "2022-04-15"
  },
  {
    "id": "h2",
    "name": "Starlight Executive Girls Hostel",
    "type": "Girls Hostel",
    "owner": "Mr. V. K. Rao",
    "manager": "Mrs. Anita Rao",
    "contact": "+91 98490 23456",
    "email": "info@starlightgirls.com",
    "address": "Flat 102, Near Botanical Garden Road, Kondapur, Hyderabad",
    "capacity": 50,
    "currentOccupancy": 42,
    "floorsCount": 3,
    "roomsCount": 15,
    "status": "Operational",
    "facilities": [
      "AC Rooms",
      "Attached Balcony",
      "RO Water Filter",
      "Laundry Service",
      "Study Lounges",
      "Power Backup"
    ],
    "rules": [
      "Curfew time 10:00 PM",
      "ID card mandatory for entry",
      "Keep common areas clean"
    ],
    "description": "Executive living for women professionals and students with study-friendly ambience.",
    "createdDate": "2023-01-10"
  },
  {
    "id": "h3",
    "name": "Vanguard Heights Boys Hostel",
    "type": "Boys Hostel",
    "owner": "Mr. Rajesh Verma",
    "manager": "Mr. Suresh Kumar",
    "contact": "+91 98490 34567",
    "email": "admin@vanguardboys.com",
    "address": "H.No 8-3-229, Cyber Hills, Hitech City, Hyderabad",
    "capacity": 50,
    "currentOccupancy": 41,
    "floorsCount": 5,
    "roomsCount": 18,
    "status": "Operational",
    "facilities": [
      "Gym & Fitness Corner",
      "High-Speed Wi-Fi",
      "Gaming Lounge",
      "Buffet Mess",
      "Parking Space",
      "Daily Laundry"
    ],
    "rules": [
      "No smoking inside premises",
      "Visitors permitted till 8:00 PM",
      "Maintain room hygiene"
    ],
    "description": "Modern boys hostel with fitness facilities and high-speed fiber internet for techies and students.",
    "createdDate": "2021-08-20"
  },
  {
    "id": "h4",
    "name": "Apex Signature Boys Hostel",
    "type": "Boys Hostel",
    "owner": "Mr. K. Srinivas",
    "manager": "Mr. Mahesh Gupta",
    "contact": "+91 98490 45678",
    "email": "support@apexboyhostel.com",
    "address": "Plot 18, Phase 2, Kavuri Hills, Madhapur, Hyderabad",
    "capacity": 50,
    "currentOccupancy": 38,
    "floorsCount": 4,
    "roomsCount": 16,
    "status": "Operational",
    "facilities": [
      "Attached Bathrooms",
      "AC & Non-AC Rooms",
      "Solar Hot Water",
      "CCTV Campus",
      "24/7 Caretaker"
    ],
    "rules": [
      "Curfew time 10:30 PM",
      "No alcohol or loud noise",
      "Gate closes at 11:00 PM"
    ],
    "description": "Comfortable and affordable executive hostel located in the heart of Madhapur.",
    "createdDate": "2022-11-05"
  }
];
