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
  Users,
  User,
  ShieldCheck,
  Briefcase,
  PhoneCall,
  Edit3,
  MapPin
} from 'lucide-react';

export interface TenantUser {
  id: string;
  name: string;
  email: string;
  mobile: string;
  altMobile?: string;
  nativeAddress?: string;
  aadharNo?: string;
  purpose?: string;
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
    "id": "u1",
    "name": "Ananya Sharma",
    "email": "ananya.sharma0@example.com",
    "mobile": "9876510002",
    "altMobile": "9876520002",
    "nativeAddress": "H.No 1-45, Main Road, Hyderabad, AP",
    "aadharNo": "3000 4000 5002",
    "purpose": "B.Tech CSE - JNTU Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "1 Jan 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u2",
    "name": "Riya Verma",
    "email": "riya.verma1@example.com",
    "mobile": "9876510003",
    "altMobile": "9876520003",
    "nativeAddress": "H.No 2-45, Main Road, Vijayawada, AP",
    "aadharNo": "3001 4001 5003",
    "purpose": "B.Tech ECE - IIIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "2 Feb 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u3",
    "name": "Sneha Reddy",
    "email": "sneha.reddy2@example.com",
    "mobile": "9876510004",
    "altMobile": "9876520004",
    "nativeAddress": "H.No 3-45, Main Road, Visakhapatnam, AP",
    "aadharNo": "3002 4002 5004",
    "purpose": "B.Tech IT - Osmania University",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "3 Mar 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u4",
    "name": "Kavya Nair",
    "email": "kavya.nair3@example.com",
    "mobile": "9876510005",
    "altMobile": "9876520005",
    "nativeAddress": "H.No 4-45, Main Road, Guntur, AP",
    "aadharNo": "3003 4003 5005",
    "purpose": "B.Tech Mechanical - ISB Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "4 Apr 2025",
    "pendingDues": 1500,
    "earnings": 5500
  },
  {
    "id": "u5",
    "name": "Pooja Hegde",
    "email": "pooja.hegde4@example.com",
    "mobile": "9876510006",
    "altMobile": "9876520006",
    "nativeAddress": "H.No 5-45, Main Road, Tirupati, AP",
    "aadharNo": "3004 4004 5006",
    "purpose": "B.Tech AI & ML - BITS Pilani Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "5 May 2025",
    "pendingDues": 2500,
    "earnings": 12500
  },
  {
    "id": "u6",
    "name": "Meera Patel",
    "email": "meera.patel5@example.com",
    "mobile": "9876510007",
    "altMobile": "9876520007",
    "nativeAddress": "H.No 6-45, Main Road, Warangal, TS",
    "aadharNo": "3005 4005 5007",
    "purpose": "MBA Finance - CBIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "6 Jun 2025",
    "pendingDues": 4500,
    "earnings": 8500
  },
  {
    "id": "u7",
    "name": "Divya Joshi",
    "email": "divya.joshi6@example.com",
    "mobile": "9876510008",
    "altMobile": "9876520008",
    "nativeAddress": "H.No 7-45, Main Road, Karimnagar, TS",
    "aadharNo": "3006 4006 5008",
    "purpose": "MBA Marketing - VNR VJIET",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "7 Jul 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u8",
    "name": "Sunita Rao",
    "email": "sunita.rao7@example.com",
    "mobile": "9876510009",
    "altMobile": "9876520009",
    "nativeAddress": "H.No 8-45, Main Road, Nizamabad, TS",
    "aadharNo": "3007 4007 5009",
    "purpose": "M.Tech Software Engineering - Vasavi College of Engineering",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "8 Aug 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u9",
    "name": "Swati Kulkarni",
    "email": "swati.kulkarni8@example.com",
    "mobile": "9876510010",
    "altMobile": "9876520010",
    "nativeAddress": "H.No 9-45, Main Road, Bangalore, KA",
    "aadharNo": "3008 4008 5010",
    "purpose": "B.Pharm 3rd Yr - Gokaraju Rangaraju Institute",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "9 Jan 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u10",
    "name": "Priyanka Das",
    "email": "priyanka.das9@example.com",
    "mobile": "9876510011",
    "altMobile": "9876520011",
    "nativeAddress": "H.No 10-45, Main Road, Chennai, TN",
    "aadharNo": "3009 4009 5011",
    "purpose": "M.Sc Data Science - Malla Reddy Engineering College",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "10 Feb 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u11",
    "name": "Aditi Deshmukh",
    "email": "aditi.deshmukh10@example.com",
    "mobile": "9876510012",
    "altMobile": "9876520012",
    "nativeAddress": "H.No 11-45, Main Road, Hyderabad, AP",
    "aadharNo": "3010 4010 5012",
    "purpose": "B.Tech CSE - JNTU Hyderabad",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "11 Mar 2025",
    "pendingDues": 1500,
    "earnings": 7000
  },
  {
    "id": "u12",
    "name": "Trisha Sen",
    "email": "trisha.sen11@example.com",
    "mobile": "9876510013",
    "altMobile": "9876520013",
    "nativeAddress": "H.No 12-45, Main Road, Vijayawada, AP",
    "aadharNo": "3011 4011 5013",
    "purpose": "B.Tech ECE - IIIT Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "12 Apr 2025",
    "pendingDues": 2500,
    "earnings": 5500
  },
  {
    "id": "u13",
    "name": "Rashmi Bhat",
    "email": "rashmi.bhat12@example.com",
    "mobile": "9876510014",
    "altMobile": "9876520014",
    "nativeAddress": "H.No 13-45, Main Road, Visakhapatnam, AP",
    "aadharNo": "3012 4012 5014",
    "purpose": "B.Tech IT - Osmania University",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "13 May 2025",
    "pendingDues": 4500,
    "earnings": 12500
  },
  {
    "id": "u14",
    "name": "Akanksha Saxena",
    "email": "akanksha.saxena13@example.com",
    "mobile": "9876510015",
    "altMobile": "9876520015",
    "nativeAddress": "H.No 14-45, Main Road, Guntur, AP",
    "aadharNo": "3013 4013 5015",
    "purpose": "B.Tech Mechanical - ISB Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "14 Jun 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u15",
    "name": "Tanvi Mehta",
    "email": "tanvi.mehta14@example.com",
    "mobile": "9876510016",
    "altMobile": "9876520016",
    "nativeAddress": "H.No 15-45, Main Road, Tirupati, AP",
    "aadharNo": "3014 4014 5016",
    "purpose": "B.Tech AI & ML - BITS Pilani Hyderabad",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "15 Jul 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u16",
    "name": "Ishita Roy",
    "email": "ishita.roy15@example.com",
    "mobile": "9876510017",
    "altMobile": "9876520017",
    "nativeAddress": "H.No 16-45, Main Road, Warangal, TS",
    "aadharNo": "3015 4015 5017",
    "purpose": "MBA Finance - CBIT Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "16 Aug 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u17",
    "name": "Niharika Gupta",
    "email": "niharika.gupta16@example.com",
    "mobile": "9876510018",
    "altMobile": "9876520018",
    "nativeAddress": "H.No 17-45, Main Road, Karimnagar, TS",
    "aadharNo": "3016 4016 5018",
    "purpose": "MBA Marketing - VNR VJIET",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "17 Jan 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u18",
    "name": "Shreya Malhotra",
    "email": "shreya.malhotra17@example.com",
    "mobile": "9876510019",
    "altMobile": "9876520019",
    "nativeAddress": "H.No 18-45, Main Road, Nizamabad, TS",
    "aadharNo": "3017 4017 5019",
    "purpose": "M.Tech Software Engineering - Vasavi College of Engineering",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "18 Feb 2025",
    "pendingDues": 1500,
    "earnings": 8500
  },
  {
    "id": "u19",
    "name": "Deepika Singh",
    "email": "deepika.singh18@example.com",
    "mobile": "9876510020",
    "altMobile": "9876520020",
    "nativeAddress": "H.No 19-45, Main Road, Bangalore, KA",
    "aadharNo": "3018 4018 5020",
    "purpose": "B.Pharm 3rd Yr - Gokaraju Rangaraju Institute",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "19 Mar 2025",
    "pendingDues": 2500,
    "earnings": 7000
  },
  {
    "id": "u20",
    "name": "Aparna Kumar",
    "email": "aparna.kumar19@example.com",
    "mobile": "9876510021",
    "altMobile": "9876520021",
    "nativeAddress": "H.No 20-45, Main Road, Chennai, TN",
    "aadharNo": "3019 4019 5021",
    "purpose": "M.Sc Data Science - Malla Reddy Engineering College",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "20 Apr 2025",
    "pendingDues": 4500,
    "earnings": 5500
  },
  {
    "id": "u21",
    "name": "Bhavana Rajpoot",
    "email": "bhavana.rajpoot20@example.com",
    "mobile": "9876510022",
    "altMobile": "9876520022",
    "nativeAddress": "H.No 21-45, Main Road, Hyderabad, AP",
    "aadharNo": "3020 4020 5022",
    "purpose": "B.Tech CSE - JNTU Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "21 May 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u22",
    "name": "Charulata Shah",
    "email": "charulata.shah21@example.com",
    "mobile": "9876510023",
    "altMobile": "9876520023",
    "nativeAddress": "H.No 22-45, Main Road, Vijayawada, AP",
    "aadharNo": "3021 4021 5023",
    "purpose": "B.Tech ECE - IIIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "22 Jun 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u23",
    "name": "Drishti Goel",
    "email": "drishti.goel22@example.com",
    "mobile": "9876510024",
    "altMobile": "9876520024",
    "nativeAddress": "H.No 23-45, Main Road, Visakhapatnam, AP",
    "aadharNo": "3022 4022 5024",
    "purpose": "B.Tech IT - Osmania University",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "23 Jul 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u24",
    "name": "Ekta Dutt",
    "email": "ekta.dutt23@example.com",
    "mobile": "9876510025",
    "altMobile": "9876520025",
    "nativeAddress": "H.No 24-45, Main Road, Guntur, AP",
    "aadharNo": "3023 4023 5025",
    "purpose": "B.Tech Mechanical - ISB Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "24 Aug 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u25",
    "name": "Farida Dhawan",
    "email": "farida.dhawan24@example.com",
    "mobile": "9876510026",
    "altMobile": "9876520026",
    "nativeAddress": "H.No 25-45, Main Road, Tirupati, AP",
    "aadharNo": "3024 4024 5026",
    "purpose": "B.Tech AI & ML - BITS Pilani Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "25 Jan 2025",
    "pendingDues": 1500,
    "earnings": 12500
  },
  {
    "id": "u26",
    "name": "Gautami Agrawal",
    "email": "gautami.agrawal25@example.com",
    "mobile": "9876510027",
    "altMobile": "9876520027",
    "nativeAddress": "H.No 26-45, Main Road, Warangal, TS",
    "aadharNo": "3025 4025 5027",
    "purpose": "MBA Finance - CBIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "26 Feb 2025",
    "pendingDues": 2500,
    "earnings": 8500
  },
  {
    "id": "u27",
    "name": "Harini Choudhury",
    "email": "harini.choudhury26@example.com",
    "mobile": "9876510028",
    "altMobile": "9876520028",
    "nativeAddress": "H.No 27-45, Main Road, Karimnagar, TS",
    "aadharNo": "3026 4026 5028",
    "purpose": "MBA Marketing - VNR VJIET",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "27 Mar 2025",
    "pendingDues": 4500,
    "earnings": 7000
  },
  {
    "id": "u28",
    "name": "Indu Pande",
    "email": "indu.pande27@example.com",
    "mobile": "9876510029",
    "altMobile": "9876520029",
    "nativeAddress": "H.No 28-45, Main Road, Nizamabad, TS",
    "aadharNo": "3027 4027 5029",
    "purpose": "M.Tech Software Engineering - Vasavi College of Engineering",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "28 Apr 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u29",
    "name": "Jaya Mishra",
    "email": "jaya.mishra28@example.com",
    "mobile": "9876510030",
    "altMobile": "9876520030",
    "nativeAddress": "H.No 29-45, Main Road, Bangalore, KA",
    "aadharNo": "3028 4028 5030",
    "purpose": "B.Pharm 3rd Yr - Gokaraju Rangaraju Institute",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "1 May 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u30",
    "name": "Krutika Tiwari",
    "email": "krutika.tiwari29@example.com",
    "mobile": "9876510031",
    "altMobile": "9876520031",
    "nativeAddress": "H.No 30-45, Main Road, Chennai, TN",
    "aadharNo": "3029 4029 5031",
    "purpose": "M.Sc Data Science - Malla Reddy Engineering College",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "2 Jun 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u31",
    "name": "Lata Yadav",
    "email": "lata.yadav30@example.com",
    "mobile": "9876510032",
    "altMobile": "9876520032",
    "nativeAddress": "H.No 31-45, Main Road, Hyderabad, AP",
    "aadharNo": "3030 4030 5032",
    "purpose": "B.Tech CSE - JNTU Hyderabad",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "3 Jul 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u32",
    "name": "Manasi Tripathi",
    "email": "manasi.tripathi31@example.com",
    "mobile": "9876510033",
    "altMobile": "9876520033",
    "nativeAddress": "H.No 32-45, Main Road, Vijayawada, AP",
    "aadharNo": "3031 4031 5033",
    "purpose": "B.Tech ECE - IIIT Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "4 Aug 2025",
    "pendingDues": 1500,
    "earnings": 5500
  },
  {
    "id": "u33",
    "name": "Nandini Shukla",
    "email": "nandini.shukla32@example.com",
    "mobile": "9876510034",
    "altMobile": "9876520034",
    "nativeAddress": "H.No 33-45, Main Road, Visakhapatnam, AP",
    "aadharNo": "3032 4032 5034",
    "purpose": "B.Tech IT - Osmania University",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "5 Jan 2025",
    "pendingDues": 2500,
    "earnings": 12500
  },
  {
    "id": "u34",
    "name": "Ojaswi Pandey",
    "email": "ojaswi.pandey33@example.com",
    "mobile": "9876510035",
    "altMobile": "9876520035",
    "nativeAddress": "H.No 34-45, Main Road, Guntur, AP",
    "aadharNo": "3033 4033 5035",
    "purpose": "B.Tech Mechanical - ISB Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "6 Feb 2025",
    "pendingDues": 4500,
    "earnings": 8500
  },
  {
    "id": "u35",
    "name": "Pranati Venkatesh",
    "email": "pranati.venkatesh34@example.com",
    "mobile": "9876510036",
    "altMobile": "9876520036",
    "nativeAddress": "H.No 35-45, Main Road, Tirupati, AP",
    "aadharNo": "3034 4034 5036",
    "purpose": "B.Tech AI & ML - BITS Pilani Hyderabad",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "7 Mar 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u36",
    "name": "Rachana Naidu",
    "email": "rachana.naidu35@example.com",
    "mobile": "9876510037",
    "altMobile": "9876520037",
    "nativeAddress": "H.No 36-45, Main Road, Warangal, TS",
    "aadharNo": "3035 4035 5037",
    "purpose": "MBA Finance - CBIT Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "8 Apr 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u37",
    "name": "Sowmya Subramanian",
    "email": "sowmya.subramanian36@example.com",
    "mobile": "9876510038",
    "altMobile": "9876520038",
    "nativeAddress": "H.No 37-45, Main Road, Karimnagar, TS",
    "aadharNo": "3036 4036 5038",
    "purpose": "MBA Marketing - VNR VJIET",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "9 May 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u38",
    "name": "Tanya Iyengar",
    "email": "tanya.iyengar37@example.com",
    "mobile": "9876510039",
    "altMobile": "9876520039",
    "nativeAddress": "H.No 38-45, Main Road, Nizamabad, TS",
    "aadharNo": "3037 4037 5039",
    "purpose": "M.Tech Software Engineering - Vasavi College of Engineering",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "10 Jun 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u39",
    "name": "Uma Menon",
    "email": "uma.menon38@example.com",
    "mobile": "9876510040",
    "altMobile": "9876520040",
    "nativeAddress": "H.No 39-45, Main Road, Bangalore, KA",
    "aadharNo": "3038 4038 5040",
    "purpose": "B.Pharm 3rd Yr - Gokaraju Rangaraju Institute",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "11 Jul 2025",
    "pendingDues": 1500,
    "earnings": 7000
  },
  {
    "id": "u40",
    "name": "Vandana Pillai",
    "email": "vandana.pillai39@example.com",
    "mobile": "9876510041",
    "altMobile": "9876520041",
    "nativeAddress": "H.No 40-45, Main Road, Chennai, TN",
    "aadharNo": "3039 4039 5041",
    "purpose": "M.Sc Data Science - Malla Reddy Engineering College",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "12 Aug 2025",
    "pendingDues": 2500,
    "earnings": 5500
  },
  {
    "id": "u41",
    "name": "Yamini Banerjee",
    "email": "yamini.banerjee40@example.com",
    "mobile": "9876510042",
    "altMobile": "9876520042",
    "nativeAddress": "H.No 41-45, Main Road, Hyderabad, AP",
    "aadharNo": "3040 4040 5042",
    "purpose": "B.Tech CSE - JNTU Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "13 Jan 2025",
    "pendingDues": 4500,
    "earnings": 12500
  },
  {
    "id": "u42",
    "name": "Zoya Chatterjee",
    "email": "zoya.chatterjee41@example.com",
    "mobile": "9876510043",
    "altMobile": "9876520043",
    "nativeAddress": "H.No 42-45, Main Road, Vijayawada, AP",
    "aadharNo": "3041 4041 5043",
    "purpose": "B.Tech ECE - IIIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "14 Feb 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u43",
    "name": "Anusha Dutta",
    "email": "anusha.dutta42@example.com",
    "mobile": "9876510044",
    "altMobile": "9876520044",
    "nativeAddress": "H.No 43-45, Main Road, Visakhapatnam, AP",
    "aadharNo": "3042 4042 5044",
    "purpose": "B.Tech IT - Osmania University",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Checked Out",
    "joinDate": "15 Mar 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u44",
    "name": "Bhoomika Goswami",
    "email": "bhoomika.goswami43@example.com",
    "mobile": "9876510045",
    "altMobile": "9876520045",
    "nativeAddress": "H.No 44-45, Main Road, Guntur, AP",
    "aadharNo": "3043 4043 5045",
    "purpose": "B.Tech Mechanical - ISB Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Checked Out",
    "joinDate": "16 Apr 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u45",
    "name": "Chandana Mukherjee",
    "email": "chandana.mukherjee44@example.com",
    "mobile": "9876510046",
    "altMobile": "9876520046",
    "nativeAddress": "H.No 45-45, Main Road, Tirupati, AP",
    "aadharNo": "3044 4044 5046",
    "purpose": "B.Tech AI & ML - BITS Pilani Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Checked Out",
    "joinDate": "17 May 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u46",
    "name": "Deepthi Paul",
    "email": "deepthi.paul45@example.com",
    "mobile": "9876510047",
    "altMobile": "9876520047",
    "nativeAddress": "H.No 46-45, Main Road, Warangal, TS",
    "aadharNo": "3045 4045 5047",
    "purpose": "MBA Finance - CBIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Checked Out",
    "joinDate": "18 Jun 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u47",
    "name": "Harshita Nandi",
    "email": "harshita.nandi46@example.com",
    "mobile": "9876510048",
    "altMobile": "9876520048",
    "nativeAddress": "H.No 47-45, Main Road, Karimnagar, TS",
    "aadharNo": "3046 4046 5048",
    "purpose": "MBA Marketing - VNR VJIET",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Checked Out",
    "joinDate": "19 Jul 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u48",
    "name": "Keerthi Saha",
    "email": "keerthi.saha47@example.com",
    "mobile": "9876510049",
    "altMobile": "9876520049",
    "nativeAddress": "H.No 48-45, Main Road, Nizamabad, TS",
    "aadharNo": "3047 4047 5049",
    "purpose": "M.Tech Software Engineering - Vasavi College of Engineering",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Checked Out",
    "joinDate": "20 Aug 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u49",
    "name": "Lavanya Bhowmick",
    "email": "lavanya.bhowmick48@example.com",
    "mobile": "9876510050",
    "altMobile": "9876520050",
    "nativeAddress": "H.No 49-45, Main Road, Bangalore, KA",
    "aadharNo": "3048 4048 5050",
    "purpose": "B.Pharm 3rd Yr - Gokaraju Rangaraju Institute",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Checked Out",
    "joinDate": "21 Jan 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u50",
    "name": "Monika Sarkar",
    "email": "monika.sarkar49@example.com",
    "mobile": "9876510051",
    "altMobile": "9876520051",
    "nativeAddress": "H.No 50-45, Main Road, Chennai, TN",
    "aadharNo": "3049 4049 5051",
    "purpose": "M.Sc Data Science - Malla Reddy Engineering College",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Checked Out",
    "joinDate": "22 Feb 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u51",
    "name": "Ananya Patel",
    "email": "ananya.patel0@example.com",
    "mobile": "9876510052",
    "altMobile": "9876520052",
    "nativeAddress": "H.No 1-45, Main Road, Hyderabad, AP",
    "aadharNo": "3000 4000 5052",
    "purpose": "B.Tech CSE - JNTU Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "1 Jan 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u52",
    "name": "Riya Joshi",
    "email": "riya.joshi1@example.com",
    "mobile": "9876510053",
    "altMobile": "9876520053",
    "nativeAddress": "H.No 2-45, Main Road, Vijayawada, AP",
    "aadharNo": "3001 4001 5053",
    "purpose": "B.Tech ECE - IIIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "2 Feb 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u53",
    "name": "Sneha Rao",
    "email": "sneha.rao2@example.com",
    "mobile": "9876510054",
    "altMobile": "9876520054",
    "nativeAddress": "H.No 3-45, Main Road, Visakhapatnam, AP",
    "aadharNo": "3002 4002 5054",
    "purpose": "B.Tech IT - Osmania University",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "3 Mar 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u54",
    "name": "Kavya Kulkarni",
    "email": "kavya.kulkarni3@example.com",
    "mobile": "9876510055",
    "altMobile": "9876520055",
    "nativeAddress": "H.No 4-45, Main Road, Guntur, AP",
    "aadharNo": "3003 4003 5055",
    "purpose": "B.Tech Mechanical - ISB Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "4 Apr 2025",
    "pendingDues": 1500,
    "earnings": 5500
  },
  {
    "id": "u55",
    "name": "Pooja Das",
    "email": "pooja.das4@example.com",
    "mobile": "9876510056",
    "altMobile": "9876520056",
    "nativeAddress": "H.No 5-45, Main Road, Tirupati, AP",
    "aadharNo": "3004 4004 5056",
    "purpose": "B.Tech AI & ML - BITS Pilani Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "5 May 2025",
    "pendingDues": 2500,
    "earnings": 12500
  },
  {
    "id": "u56",
    "name": "Meera Deshmukh",
    "email": "meera.deshmukh5@example.com",
    "mobile": "9876510057",
    "altMobile": "9876520057",
    "nativeAddress": "H.No 6-45, Main Road, Warangal, TS",
    "aadharNo": "3005 4005 5057",
    "purpose": "MBA Finance - CBIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "6 Jun 2025",
    "pendingDues": 4500,
    "earnings": 8500
  },
  {
    "id": "u57",
    "name": "Divya Sen",
    "email": "divya.sen6@example.com",
    "mobile": "9876510058",
    "altMobile": "9876520058",
    "nativeAddress": "H.No 7-45, Main Road, Karimnagar, TS",
    "aadharNo": "3006 4006 5058",
    "purpose": "MBA Marketing - VNR VJIET",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "7 Jul 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u58",
    "name": "Sunita Bhat",
    "email": "sunita.bhat7@example.com",
    "mobile": "9876510059",
    "altMobile": "9876520059",
    "nativeAddress": "H.No 8-45, Main Road, Nizamabad, TS",
    "aadharNo": "3007 4007 5059",
    "purpose": "M.Tech Software Engineering - Vasavi College of Engineering",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "8 Aug 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u59",
    "name": "Swati Saxena",
    "email": "swati.saxena8@example.com",
    "mobile": "9876510060",
    "altMobile": "9876520060",
    "nativeAddress": "H.No 9-45, Main Road, Bangalore, KA",
    "aadharNo": "3008 4008 5060",
    "purpose": "B.Pharm 3rd Yr - Gokaraju Rangaraju Institute",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "9 Jan 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u60",
    "name": "Priyanka Mehta",
    "email": "priyanka.mehta9@example.com",
    "mobile": "9876510061",
    "altMobile": "9876520061",
    "nativeAddress": "H.No 10-45, Main Road, Chennai, TN",
    "aadharNo": "3009 4009 5061",
    "purpose": "M.Sc Data Science - Malla Reddy Engineering College",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "10 Feb 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u61",
    "name": "Aditi Roy",
    "email": "aditi.roy10@example.com",
    "mobile": "9876510062",
    "altMobile": "9876520062",
    "nativeAddress": "H.No 11-45, Main Road, Hyderabad, AP",
    "aadharNo": "3010 4010 5062",
    "purpose": "B.Tech CSE - JNTU Hyderabad",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "11 Mar 2025",
    "pendingDues": 1500,
    "earnings": 7000
  },
  {
    "id": "u62",
    "name": "Trisha Gupta",
    "email": "trisha.gupta11@example.com",
    "mobile": "9876510063",
    "altMobile": "9876520063",
    "nativeAddress": "H.No 12-45, Main Road, Vijayawada, AP",
    "aadharNo": "3011 4011 5063",
    "purpose": "B.Tech ECE - IIIT Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "12 Apr 2025",
    "pendingDues": 2500,
    "earnings": 5500
  },
  {
    "id": "u63",
    "name": "Rashmi Malhotra",
    "email": "rashmi.malhotra12@example.com",
    "mobile": "9876510064",
    "altMobile": "9876520064",
    "nativeAddress": "H.No 13-45, Main Road, Visakhapatnam, AP",
    "aadharNo": "3012 4012 5064",
    "purpose": "B.Tech IT - Osmania University",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "13 May 2025",
    "pendingDues": 4500,
    "earnings": 12500
  },
  {
    "id": "u64",
    "name": "Akanksha Singh",
    "email": "akanksha.singh13@example.com",
    "mobile": "9876510065",
    "altMobile": "9876520065",
    "nativeAddress": "H.No 14-45, Main Road, Guntur, AP",
    "aadharNo": "3013 4013 5065",
    "purpose": "B.Tech Mechanical - ISB Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "14 Jun 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u65",
    "name": "Tanvi Kumar",
    "email": "tanvi.kumar14@example.com",
    "mobile": "9876510066",
    "altMobile": "9876520066",
    "nativeAddress": "H.No 15-45, Main Road, Tirupati, AP",
    "aadharNo": "3014 4014 5066",
    "purpose": "B.Tech AI & ML - BITS Pilani Hyderabad",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "15 Jul 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u66",
    "name": "Ishita Rajpoot",
    "email": "ishita.rajpoot15@example.com",
    "mobile": "9876510067",
    "altMobile": "9876520067",
    "nativeAddress": "H.No 16-45, Main Road, Warangal, TS",
    "aadharNo": "3015 4015 5067",
    "purpose": "MBA Finance - CBIT Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "16 Aug 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u67",
    "name": "Niharika Shah",
    "email": "niharika.shah16@example.com",
    "mobile": "9876510068",
    "altMobile": "9876520068",
    "nativeAddress": "H.No 17-45, Main Road, Karimnagar, TS",
    "aadharNo": "3016 4016 5068",
    "purpose": "MBA Marketing - VNR VJIET",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "17 Jan 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u68",
    "name": "Shreya Goel",
    "email": "shreya.goel17@example.com",
    "mobile": "9876510069",
    "altMobile": "9876520069",
    "nativeAddress": "H.No 18-45, Main Road, Nizamabad, TS",
    "aadharNo": "3017 4017 5069",
    "purpose": "M.Tech Software Engineering - Vasavi College of Engineering",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "18 Feb 2025",
    "pendingDues": 1500,
    "earnings": 8500
  },
  {
    "id": "u69",
    "name": "Deepika Dutt",
    "email": "deepika.dutt18@example.com",
    "mobile": "9876510070",
    "altMobile": "9876520070",
    "nativeAddress": "H.No 19-45, Main Road, Bangalore, KA",
    "aadharNo": "3018 4018 5070",
    "purpose": "B.Pharm 3rd Yr - Gokaraju Rangaraju Institute",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "19 Mar 2025",
    "pendingDues": 2500,
    "earnings": 7000
  },
  {
    "id": "u70",
    "name": "Aparna Dhawan",
    "email": "aparna.dhawan19@example.com",
    "mobile": "9876510071",
    "altMobile": "9876520071",
    "nativeAddress": "H.No 20-45, Main Road, Chennai, TN",
    "aadharNo": "3019 4019 5071",
    "purpose": "M.Sc Data Science - Malla Reddy Engineering College",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "20 Apr 2025",
    "pendingDues": 4500,
    "earnings": 5500
  },
  {
    "id": "u71",
    "name": "Bhavana Agrawal",
    "email": "bhavana.agrawal20@example.com",
    "mobile": "9876510072",
    "altMobile": "9876520072",
    "nativeAddress": "H.No 21-45, Main Road, Hyderabad, AP",
    "aadharNo": "3020 4020 5072",
    "purpose": "B.Tech CSE - JNTU Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "21 May 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u72",
    "name": "Charulata Choudhury",
    "email": "charulata.choudhury21@example.com",
    "mobile": "9876510073",
    "altMobile": "9876520073",
    "nativeAddress": "H.No 22-45, Main Road, Vijayawada, AP",
    "aadharNo": "3021 4021 5073",
    "purpose": "B.Tech ECE - IIIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "22 Jun 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u73",
    "name": "Drishti Pande",
    "email": "drishti.pande22@example.com",
    "mobile": "9876510074",
    "altMobile": "9876520074",
    "nativeAddress": "H.No 23-45, Main Road, Visakhapatnam, AP",
    "aadharNo": "3022 4022 5074",
    "purpose": "B.Tech IT - Osmania University",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "23 Jul 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u74",
    "name": "Ekta Mishra",
    "email": "ekta.mishra23@example.com",
    "mobile": "9876510075",
    "altMobile": "9876520075",
    "nativeAddress": "H.No 24-45, Main Road, Guntur, AP",
    "aadharNo": "3023 4023 5075",
    "purpose": "B.Tech Mechanical - ISB Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "24 Aug 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u75",
    "name": "Farida Tiwari",
    "email": "farida.tiwari24@example.com",
    "mobile": "9876510076",
    "altMobile": "9876520076",
    "nativeAddress": "H.No 25-45, Main Road, Tirupati, AP",
    "aadharNo": "3024 4024 5076",
    "purpose": "B.Tech AI & ML - BITS Pilani Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "25 Jan 2025",
    "pendingDues": 1500,
    "earnings": 12500
  },
  {
    "id": "u76",
    "name": "Gautami Yadav",
    "email": "gautami.yadav25@example.com",
    "mobile": "9876510077",
    "altMobile": "9876520077",
    "nativeAddress": "H.No 26-45, Main Road, Warangal, TS",
    "aadharNo": "3025 4025 5077",
    "purpose": "MBA Finance - CBIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "26 Feb 2025",
    "pendingDues": 2500,
    "earnings": 8500
  },
  {
    "id": "u77",
    "name": "Harini Tripathi",
    "email": "harini.tripathi26@example.com",
    "mobile": "9876510078",
    "altMobile": "9876520078",
    "nativeAddress": "H.No 27-45, Main Road, Karimnagar, TS",
    "aadharNo": "3026 4026 5078",
    "purpose": "MBA Marketing - VNR VJIET",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "27 Mar 2025",
    "pendingDues": 4500,
    "earnings": 7000
  },
  {
    "id": "u78",
    "name": "Indu Shukla",
    "email": "indu.shukla27@example.com",
    "mobile": "9876510079",
    "altMobile": "9876520079",
    "nativeAddress": "H.No 28-45, Main Road, Nizamabad, TS",
    "aadharNo": "3027 4027 5079",
    "purpose": "M.Tech Software Engineering - Vasavi College of Engineering",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "28 Apr 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u79",
    "name": "Jaya Pandey",
    "email": "jaya.pandey28@example.com",
    "mobile": "9876510080",
    "altMobile": "9876520080",
    "nativeAddress": "H.No 29-45, Main Road, Bangalore, KA",
    "aadharNo": "3028 4028 5080",
    "purpose": "B.Pharm 3rd Yr - Gokaraju Rangaraju Institute",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "1 May 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u80",
    "name": "Krutika Venkatesh",
    "email": "krutika.venkatesh29@example.com",
    "mobile": "9876510081",
    "altMobile": "9876520081",
    "nativeAddress": "H.No 30-45, Main Road, Chennai, TN",
    "aadharNo": "3029 4029 5081",
    "purpose": "M.Sc Data Science - Malla Reddy Engineering College",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "2 Jun 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u81",
    "name": "Lata Naidu",
    "email": "lata.naidu30@example.com",
    "mobile": "9876510082",
    "altMobile": "9876520082",
    "nativeAddress": "H.No 31-45, Main Road, Hyderabad, AP",
    "aadharNo": "3030 4030 5082",
    "purpose": "B.Tech CSE - JNTU Hyderabad",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "3 Jul 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u82",
    "name": "Manasi Subramanian",
    "email": "manasi.subramanian31@example.com",
    "mobile": "9876510083",
    "altMobile": "9876520083",
    "nativeAddress": "H.No 32-45, Main Road, Vijayawada, AP",
    "aadharNo": "3031 4031 5083",
    "purpose": "B.Tech ECE - IIIT Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "4 Aug 2025",
    "pendingDues": 1500,
    "earnings": 5500
  },
  {
    "id": "u83",
    "name": "Nandini Iyengar",
    "email": "nandini.iyengar32@example.com",
    "mobile": "9876510084",
    "altMobile": "9876520084",
    "nativeAddress": "H.No 33-45, Main Road, Visakhapatnam, AP",
    "aadharNo": "3032 4032 5084",
    "purpose": "B.Tech IT - Osmania University",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "5 Jan 2025",
    "pendingDues": 2500,
    "earnings": 12500
  },
  {
    "id": "u84",
    "name": "Ojaswi Menon",
    "email": "ojaswi.menon33@example.com",
    "mobile": "9876510085",
    "altMobile": "9876520085",
    "nativeAddress": "H.No 34-45, Main Road, Guntur, AP",
    "aadharNo": "3033 4033 5085",
    "purpose": "B.Tech Mechanical - ISB Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "6 Feb 2025",
    "pendingDues": 4500,
    "earnings": 8500
  },
  {
    "id": "u85",
    "name": "Pranati Pillai",
    "email": "pranati.pillai34@example.com",
    "mobile": "9876510086",
    "altMobile": "9876520086",
    "nativeAddress": "H.No 35-45, Main Road, Tirupati, AP",
    "aadharNo": "3034 4034 5086",
    "purpose": "B.Tech AI & ML - BITS Pilani Hyderabad",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "7 Mar 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u86",
    "name": "Rachana Banerjee",
    "email": "rachana.banerjee35@example.com",
    "mobile": "9876510087",
    "altMobile": "9876520087",
    "nativeAddress": "H.No 36-45, Main Road, Warangal, TS",
    "aadharNo": "3035 4035 5087",
    "purpose": "MBA Finance - CBIT Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "8 Apr 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u87",
    "name": "Sowmya Chatterjee",
    "email": "sowmya.chatterjee36@example.com",
    "mobile": "9876510088",
    "altMobile": "9876520088",
    "nativeAddress": "H.No 37-45, Main Road, Karimnagar, TS",
    "aadharNo": "3036 4036 5088",
    "purpose": "MBA Marketing - VNR VJIET",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "9 May 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u88",
    "name": "Tanya Dutta",
    "email": "tanya.dutta37@example.com",
    "mobile": "9876510089",
    "altMobile": "9876520089",
    "nativeAddress": "H.No 38-45, Main Road, Nizamabad, TS",
    "aadharNo": "3037 4037 5089",
    "purpose": "M.Tech Software Engineering - Vasavi College of Engineering",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "10 Jun 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u89",
    "name": "Uma Goswami",
    "email": "uma.goswami38@example.com",
    "mobile": "9876510090",
    "altMobile": "9876520090",
    "nativeAddress": "H.No 39-45, Main Road, Bangalore, KA",
    "aadharNo": "3038 4038 5090",
    "purpose": "B.Pharm 3rd Yr - Gokaraju Rangaraju Institute",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "11 Jul 2025",
    "pendingDues": 1500,
    "earnings": 7000
  },
  {
    "id": "u90",
    "name": "Vandana Mukherjee",
    "email": "vandana.mukherjee39@example.com",
    "mobile": "9876510091",
    "altMobile": "9876520091",
    "nativeAddress": "H.No 40-45, Main Road, Chennai, TN",
    "aadharNo": "3039 4039 5091",
    "purpose": "M.Sc Data Science - Malla Reddy Engineering College",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "12 Aug 2025",
    "pendingDues": 2500,
    "earnings": 5500
  },
  {
    "id": "u91",
    "name": "Yamini Paul",
    "email": "yamini.paul40@example.com",
    "mobile": "9876510092",
    "altMobile": "9876520092",
    "nativeAddress": "H.No 41-45, Main Road, Hyderabad, AP",
    "aadharNo": "3040 4040 5092",
    "purpose": "B.Tech CSE - JNTU Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "13 Jan 2025",
    "pendingDues": 4500,
    "earnings": 12500
  },
  {
    "id": "u92",
    "name": "Zoya Nandi",
    "email": "zoya.nandi41@example.com",
    "mobile": "9876510093",
    "altMobile": "9876520093",
    "nativeAddress": "H.No 42-45, Main Road, Vijayawada, AP",
    "aadharNo": "3041 4041 5093",
    "purpose": "B.Tech ECE - IIIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "14 Feb 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u93",
    "name": "Anusha Saha",
    "email": "anusha.saha42@example.com",
    "mobile": "9876510094",
    "altMobile": "9876520094",
    "nativeAddress": "H.No 43-45, Main Road, Visakhapatnam, AP",
    "aadharNo": "3042 4042 5094",
    "purpose": "B.Tech IT - Osmania University",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Checked Out",
    "joinDate": "15 Mar 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u94",
    "name": "Bhoomika Bhowmick",
    "email": "bhoomika.bhowmick43@example.com",
    "mobile": "9876510095",
    "altMobile": "9876520095",
    "nativeAddress": "H.No 44-45, Main Road, Guntur, AP",
    "aadharNo": "3043 4043 5095",
    "purpose": "B.Tech Mechanical - ISB Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Checked Out",
    "joinDate": "16 Apr 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u95",
    "name": "Chandana Sarkar",
    "email": "chandana.sarkar44@example.com",
    "mobile": "9876510096",
    "altMobile": "9876520096",
    "nativeAddress": "H.No 45-45, Main Road, Tirupati, AP",
    "aadharNo": "3044 4044 5096",
    "purpose": "B.Tech AI & ML - BITS Pilani Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Checked Out",
    "joinDate": "17 May 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u96",
    "name": "Deepthi Sharma",
    "email": "deepthi.sharma45@example.com",
    "mobile": "9876510097",
    "altMobile": "9876520097",
    "nativeAddress": "H.No 46-45, Main Road, Warangal, TS",
    "aadharNo": "3045 4045 5097",
    "purpose": "MBA Finance - CBIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Checked Out",
    "joinDate": "18 Jun 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u97",
    "name": "Harshita Verma",
    "email": "harshita.verma46@example.com",
    "mobile": "9876510098",
    "altMobile": "9876520098",
    "nativeAddress": "H.No 47-45, Main Road, Karimnagar, TS",
    "aadharNo": "3046 4046 5098",
    "purpose": "MBA Marketing - VNR VJIET",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Checked Out",
    "joinDate": "19 Jul 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u98",
    "name": "Keerthi Reddy",
    "email": "keerthi.reddy47@example.com",
    "mobile": "9876510099",
    "altMobile": "9876520099",
    "nativeAddress": "H.No 48-45, Main Road, Nizamabad, TS",
    "aadharNo": "3047 4047 5099",
    "purpose": "M.Tech Software Engineering - Vasavi College of Engineering",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Checked Out",
    "joinDate": "20 Aug 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u99",
    "name": "Lavanya Nair",
    "email": "lavanya.nair48@example.com",
    "mobile": "9876510100",
    "altMobile": "9876520100",
    "nativeAddress": "H.No 49-45, Main Road, Bangalore, KA",
    "aadharNo": "3048 4048 5100",
    "purpose": "B.Pharm 3rd Yr - Gokaraju Rangaraju Institute",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Checked Out",
    "joinDate": "21 Jan 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u100",
    "name": "Monika Hegde",
    "email": "monika.hegde49@example.com",
    "mobile": "9876510101",
    "altMobile": "9876520101",
    "nativeAddress": "H.No 50-45, Main Road, Chennai, TN",
    "aadharNo": "3049 4049 5101",
    "purpose": "M.Sc Data Science - Malla Reddy Engineering College",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Starlight Executive Girls Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Checked Out",
    "joinDate": "22 Feb 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u101",
    "name": "Aarav Deshmukh",
    "email": "aarav.deshmukh0@example.com",
    "mobile": "9876510102",
    "altMobile": "9876520102",
    "nativeAddress": "H.No 1-45, Main Road, Hyderabad, AP",
    "aadharNo": "3000 4000 5102",
    "purpose": "B.Tech CSE - JNTU Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "1 Jan 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u102",
    "name": "Vikram Sen",
    "email": "vikram.sen1@example.com",
    "mobile": "9876510103",
    "altMobile": "9876520103",
    "nativeAddress": "H.No 2-45, Main Road, Vijayawada, AP",
    "aadharNo": "3001 4001 5103",
    "purpose": "B.Tech ECE - IIIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "2 Feb 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u103",
    "name": "Ishaan Bhat",
    "email": "ishaan.bhat2@example.com",
    "mobile": "9876510104",
    "altMobile": "9876520104",
    "nativeAddress": "H.No 3-45, Main Road, Visakhapatnam, AP",
    "aadharNo": "3002 4002 5104",
    "purpose": "B.Tech IT - Osmania University",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "3 Mar 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u104",
    "name": "Aditya Saxena",
    "email": "aditya.saxena3@example.com",
    "mobile": "9876510105",
    "altMobile": "9876520105",
    "nativeAddress": "H.No 4-45, Main Road, Guntur, AP",
    "aadharNo": "3003 4003 5105",
    "purpose": "B.Tech Mechanical - ISB Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "4 Apr 2025",
    "pendingDues": 1500,
    "earnings": 5500
  },
  {
    "id": "u105",
    "name": "Rohan Mehta",
    "email": "rohan.mehta4@example.com",
    "mobile": "9876510106",
    "altMobile": "9876520106",
    "nativeAddress": "H.No 5-45, Main Road, Tirupati, AP",
    "aadharNo": "3004 4004 5106",
    "purpose": "B.Tech AI & ML - BITS Pilani Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "5 May 2025",
    "pendingDues": 2500,
    "earnings": 12500
  },
  {
    "id": "u106",
    "name": "Siddharth Roy",
    "email": "siddharth.roy5@example.com",
    "mobile": "9876510107",
    "altMobile": "9876520107",
    "nativeAddress": "H.No 6-45, Main Road, Warangal, TS",
    "aadharNo": "3005 4005 5107",
    "purpose": "MBA Finance - CBIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "6 Jun 2025",
    "pendingDues": 4500,
    "earnings": 8500
  },
  {
    "id": "u107",
    "name": "Nikhil Gupta",
    "email": "nikhil.gupta6@example.com",
    "mobile": "9876510108",
    "altMobile": "9876520108",
    "nativeAddress": "H.No 7-45, Main Road, Karimnagar, TS",
    "aadharNo": "3006 4006 5108",
    "purpose": "MBA Marketing - VNR VJIET",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "7 Jul 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u108",
    "name": "Yash Malhotra",
    "email": "yash.malhotra7@example.com",
    "mobile": "9876510109",
    "altMobile": "9876520109",
    "nativeAddress": "H.No 8-45, Main Road, Nizamabad, TS",
    "aadharNo": "3007 4007 5109",
    "purpose": "M.Tech Software Engineering - Vasavi College of Engineering",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "8 Aug 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u109",
    "name": "Kabir Singh",
    "email": "kabir.singh8@example.com",
    "mobile": "9876510110",
    "altMobile": "9876520110",
    "nativeAddress": "H.No 9-45, Main Road, Bangalore, KA",
    "aadharNo": "3008 4008 5110",
    "purpose": "B.Pharm 3rd Yr - Gokaraju Rangaraju Institute",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "9 Jan 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u110",
    "name": "Rohit Kumar",
    "email": "rohit.kumar9@example.com",
    "mobile": "9876510111",
    "altMobile": "9876520111",
    "nativeAddress": "H.No 10-45, Main Road, Chennai, TN",
    "aadharNo": "3009 4009 5111",
    "purpose": "M.Sc Data Science - Malla Reddy Engineering College",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "10 Feb 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u111",
    "name": "Deepak Rajpoot",
    "email": "deepak.rajpoot10@example.com",
    "mobile": "9876510112",
    "altMobile": "9876520112",
    "nativeAddress": "H.No 11-45, Main Road, Hyderabad, AP",
    "aadharNo": "3010 4010 5112",
    "purpose": "B.Tech CSE - JNTU Hyderabad",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "11 Mar 2025",
    "pendingDues": 1500,
    "earnings": 7000
  },
  {
    "id": "u112",
    "name": "Kunal Shah",
    "email": "kunal.shah11@example.com",
    "mobile": "9876510113",
    "altMobile": "9876520113",
    "nativeAddress": "H.No 12-45, Main Road, Vijayawada, AP",
    "aadharNo": "3011 4011 5113",
    "purpose": "B.Tech ECE - IIIT Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "12 Apr 2025",
    "pendingDues": 2500,
    "earnings": 5500
  },
  {
    "id": "u113",
    "name": "Manish Goel",
    "email": "manish.goel12@example.com",
    "mobile": "9876510114",
    "altMobile": "9876520114",
    "nativeAddress": "H.No 13-45, Main Road, Visakhapatnam, AP",
    "aadharNo": "3012 4012 5114",
    "purpose": "B.Tech IT - Osmania University",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "13 May 2025",
    "pendingDues": 4500,
    "earnings": 12500
  },
  {
    "id": "u114",
    "name": "Prateek Dutt",
    "email": "prateek.dutt13@example.com",
    "mobile": "9876510115",
    "altMobile": "9876520115",
    "nativeAddress": "H.No 14-45, Main Road, Guntur, AP",
    "aadharNo": "3013 4013 5115",
    "purpose": "B.Tech Mechanical - ISB Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "14 Jun 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u115",
    "name": "Sanjay Dhawan",
    "email": "sanjay.dhawan14@example.com",
    "mobile": "9876510116",
    "altMobile": "9876520116",
    "nativeAddress": "H.No 15-45, Main Road, Tirupati, AP",
    "aadharNo": "3014 4014 5116",
    "purpose": "B.Tech AI & ML - BITS Pilani Hyderabad",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "15 Jul 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u116",
    "name": "Varun Agrawal",
    "email": "varun.agrawal15@example.com",
    "mobile": "9876510117",
    "altMobile": "9876520117",
    "nativeAddress": "H.No 16-45, Main Road, Warangal, TS",
    "aadharNo": "3015 4015 5117",
    "purpose": "MBA Finance - CBIT Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "16 Aug 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u117",
    "name": "Amit Choudhury",
    "email": "amit.choudhury16@example.com",
    "mobile": "9876510118",
    "altMobile": "9876520118",
    "nativeAddress": "H.No 17-45, Main Road, Karimnagar, TS",
    "aadharNo": "3016 4016 5118",
    "purpose": "MBA Marketing - VNR VJIET",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "17 Jan 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u118",
    "name": "Gaurav Pande",
    "email": "gaurav.pande17@example.com",
    "mobile": "9876510119",
    "altMobile": "9876520119",
    "nativeAddress": "H.No 18-45, Main Road, Nizamabad, TS",
    "aadharNo": "3017 4017 5119",
    "purpose": "M.Tech Software Engineering - Vasavi College of Engineering",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "18 Feb 2025",
    "pendingDues": 1500,
    "earnings": 8500
  },
  {
    "id": "u119",
    "name": "Karthik Mishra",
    "email": "karthik.mishra18@example.com",
    "mobile": "9876510120",
    "altMobile": "9876520120",
    "nativeAddress": "H.No 19-45, Main Road, Bangalore, KA",
    "aadharNo": "3018 4018 5120",
    "purpose": "B.Pharm 3rd Yr - Gokaraju Rangaraju Institute",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "19 Mar 2025",
    "pendingDues": 2500,
    "earnings": 7000
  },
  {
    "id": "u120",
    "name": "Abhinav Tiwari",
    "email": "abhinav.tiwari19@example.com",
    "mobile": "9876510121",
    "altMobile": "9876520121",
    "nativeAddress": "H.No 20-45, Main Road, Chennai, TN",
    "aadharNo": "3019 4019 5121",
    "purpose": "M.Sc Data Science - Malla Reddy Engineering College",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "20 Apr 2025",
    "pendingDues": 4500,
    "earnings": 5500
  },
  {
    "id": "u121",
    "name": "Bhaven Yadav",
    "email": "bhaven.yadav20@example.com",
    "mobile": "9876510122",
    "altMobile": "9876520122",
    "nativeAddress": "H.No 21-45, Main Road, Hyderabad, AP",
    "aadharNo": "3020 4020 5122",
    "purpose": "B.Tech CSE - JNTU Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "21 May 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u122",
    "name": "Chaitanya Tripathi",
    "email": "chaitanya.tripathi21@example.com",
    "mobile": "9876510123",
    "altMobile": "9876520123",
    "nativeAddress": "H.No 22-45, Main Road, Vijayawada, AP",
    "aadharNo": "3021 4021 5123",
    "purpose": "B.Tech ECE - IIIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "22 Jun 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u123",
    "name": "Dinesh Shukla",
    "email": "dinesh.shukla22@example.com",
    "mobile": "9876510124",
    "altMobile": "9876520124",
    "nativeAddress": "H.No 23-45, Main Road, Visakhapatnam, AP",
    "aadharNo": "3022 4022 5124",
    "purpose": "B.Tech IT - Osmania University",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "23 Jul 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u124",
    "name": "Eashan Pandey",
    "email": "eashan.pandey23@example.com",
    "mobile": "9876510125",
    "altMobile": "9876520125",
    "nativeAddress": "H.No 24-45, Main Road, Guntur, AP",
    "aadharNo": "3023 4023 5125",
    "purpose": "B.Tech Mechanical - ISB Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "24 Aug 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u125",
    "name": "Farhan Venkatesh",
    "email": "farhan.venkatesh24@example.com",
    "mobile": "9876510126",
    "altMobile": "9876520126",
    "nativeAddress": "H.No 25-45, Main Road, Tirupati, AP",
    "aadharNo": "3024 4024 5126",
    "purpose": "B.Tech AI & ML - BITS Pilani Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "25 Jan 2025",
    "pendingDues": 1500,
    "earnings": 12500
  },
  {
    "id": "u126",
    "name": "Girish Naidu",
    "email": "girish.naidu25@example.com",
    "mobile": "9876510127",
    "altMobile": "9876520127",
    "nativeAddress": "H.No 26-45, Main Road, Warangal, TS",
    "aadharNo": "3025 4025 5127",
    "purpose": "MBA Finance - CBIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "26 Feb 2025",
    "pendingDues": 2500,
    "earnings": 8500
  },
  {
    "id": "u127",
    "name": "Harish Subramanian",
    "email": "harish.subramanian26@example.com",
    "mobile": "9876510128",
    "altMobile": "9876520128",
    "nativeAddress": "H.No 27-45, Main Road, Karimnagar, TS",
    "aadharNo": "3026 4026 5128",
    "purpose": "MBA Marketing - VNR VJIET",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "27 Mar 2025",
    "pendingDues": 4500,
    "earnings": 7000
  },
  {
    "id": "u128",
    "name": "Inian Iyengar",
    "email": "inian.iyengar27@example.com",
    "mobile": "9876510129",
    "altMobile": "9876520129",
    "nativeAddress": "H.No 28-45, Main Road, Nizamabad, TS",
    "aadharNo": "3027 4027 5129",
    "purpose": "M.Tech Software Engineering - Vasavi College of Engineering",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "28 Apr 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u129",
    "name": "Jatin Menon",
    "email": "jatin.menon28@example.com",
    "mobile": "9876510130",
    "altMobile": "9876520130",
    "nativeAddress": "H.No 29-45, Main Road, Bangalore, KA",
    "aadharNo": "3028 4028 5130",
    "purpose": "B.Pharm 3rd Yr - Gokaraju Rangaraju Institute",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "1 May 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u130",
    "name": "Kiran Pillai",
    "email": "kiran.pillai29@example.com",
    "mobile": "9876510131",
    "altMobile": "9876520131",
    "nativeAddress": "H.No 30-45, Main Road, Chennai, TN",
    "aadharNo": "3029 4029 5131",
    "purpose": "M.Sc Data Science - Malla Reddy Engineering College",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "2 Jun 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u131",
    "name": "Lokesh Banerjee",
    "email": "lokesh.banerjee30@example.com",
    "mobile": "9876510132",
    "altMobile": "9876520132",
    "nativeAddress": "H.No 31-45, Main Road, Hyderabad, AP",
    "aadharNo": "3030 4030 5132",
    "purpose": "B.Tech CSE - JNTU Hyderabad",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "3 Jul 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u132",
    "name": "Madhav Chatterjee",
    "email": "madhav.chatterjee31@example.com",
    "mobile": "9876510133",
    "altMobile": "9876520133",
    "nativeAddress": "H.No 32-45, Main Road, Vijayawada, AP",
    "aadharNo": "3031 4031 5133",
    "purpose": "B.Tech ECE - IIIT Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "4 Aug 2025",
    "pendingDues": 1500,
    "earnings": 5500
  },
  {
    "id": "u133",
    "name": "Naveen Dutta",
    "email": "naveen.dutta32@example.com",
    "mobile": "9876510134",
    "altMobile": "9876520134",
    "nativeAddress": "H.No 33-45, Main Road, Visakhapatnam, AP",
    "aadharNo": "3032 4032 5134",
    "purpose": "B.Tech IT - Osmania University",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "5 Jan 2025",
    "pendingDues": 2500,
    "earnings": 12500
  },
  {
    "id": "u134",
    "name": "Omkar Goswami",
    "email": "omkar.goswami33@example.com",
    "mobile": "9876510135",
    "altMobile": "9876520135",
    "nativeAddress": "H.No 34-45, Main Road, Guntur, AP",
    "aadharNo": "3033 4033 5135",
    "purpose": "B.Tech Mechanical - ISB Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "6 Feb 2025",
    "pendingDues": 4500,
    "earnings": 8500
  },
  {
    "id": "u135",
    "name": "Pawan Mukherjee",
    "email": "pawan.mukherjee34@example.com",
    "mobile": "9876510136",
    "altMobile": "9876520136",
    "nativeAddress": "H.No 35-45, Main Road, Tirupati, AP",
    "aadharNo": "3034 4034 5136",
    "purpose": "B.Tech AI & ML - BITS Pilani Hyderabad",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "7 Mar 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u136",
    "name": "Rahul Paul",
    "email": "rahul.paul35@example.com",
    "mobile": "9876510137",
    "altMobile": "9876520137",
    "nativeAddress": "H.No 36-45, Main Road, Warangal, TS",
    "aadharNo": "3035 4035 5137",
    "purpose": "MBA Finance - CBIT Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "8 Apr 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u137",
    "name": "Satish Nandi",
    "email": "satish.nandi36@example.com",
    "mobile": "9876510138",
    "altMobile": "9876520138",
    "nativeAddress": "H.No 37-45, Main Road, Karimnagar, TS",
    "aadharNo": "3036 4036 5138",
    "purpose": "MBA Marketing - VNR VJIET",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "9 May 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u138",
    "name": "Tarun Saha",
    "email": "tarun.saha37@example.com",
    "mobile": "9876510139",
    "altMobile": "9876520139",
    "nativeAddress": "H.No 38-45, Main Road, Nizamabad, TS",
    "aadharNo": "3037 4037 5139",
    "purpose": "M.Tech Software Engineering - Vasavi College of Engineering",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "10 Jun 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u139",
    "name": "Uday Bhowmick",
    "email": "uday.bhowmick38@example.com",
    "mobile": "9876510140",
    "altMobile": "9876520140",
    "nativeAddress": "H.No 39-45, Main Road, Bangalore, KA",
    "aadharNo": "3038 4038 5140",
    "purpose": "B.Pharm 3rd Yr - Gokaraju Rangaraju Institute",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "11 Jul 2025",
    "pendingDues": 1500,
    "earnings": 7000
  },
  {
    "id": "u140",
    "name": "Vijay Sarkar",
    "email": "vijay.sarkar39@example.com",
    "mobile": "9876510141",
    "altMobile": "9876520141",
    "nativeAddress": "H.No 40-45, Main Road, Chennai, TN",
    "aadharNo": "3039 4039 5141",
    "purpose": "M.Sc Data Science - Malla Reddy Engineering College",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "12 Aug 2025",
    "pendingDues": 2500,
    "earnings": 5500
  },
  {
    "id": "u141",
    "name": "Waman Sharma",
    "email": "waman.sharma40@example.com",
    "mobile": "9876510142",
    "altMobile": "9876520142",
    "nativeAddress": "H.No 41-45, Main Road, Hyderabad, AP",
    "aadharNo": "3040 4040 5142",
    "purpose": "B.Tech CSE - JNTU Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "13 Jan 2025",
    "pendingDues": 4500,
    "earnings": 12500
  },
  {
    "id": "u142",
    "name": "Yogesh Verma",
    "email": "yogesh.verma41@example.com",
    "mobile": "9876510143",
    "altMobile": "9876520143",
    "nativeAddress": "H.No 42-45, Main Road, Vijayawada, AP",
    "aadharNo": "3041 4041 5143",
    "purpose": "B.Tech ECE - IIIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "14 Feb 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u143",
    "name": "Zain Reddy",
    "email": "zain.reddy42@example.com",
    "mobile": "9876510144",
    "altMobile": "9876520144",
    "nativeAddress": "H.No 43-45, Main Road, Visakhapatnam, AP",
    "aadharNo": "3042 4042 5144",
    "purpose": "B.Tech IT - Osmania University",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Checked Out",
    "joinDate": "15 Mar 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u144",
    "name": "Anand Nair",
    "email": "anand.nair43@example.com",
    "mobile": "9876510145",
    "altMobile": "9876520145",
    "nativeAddress": "H.No 44-45, Main Road, Guntur, AP",
    "aadharNo": "3043 4043 5145",
    "purpose": "B.Tech Mechanical - ISB Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Checked Out",
    "joinDate": "16 Apr 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u145",
    "name": "Bhaskar Hegde",
    "email": "bhaskar.hegde44@example.com",
    "mobile": "9876510146",
    "altMobile": "9876520146",
    "nativeAddress": "H.No 45-45, Main Road, Tirupati, AP",
    "aadharNo": "3044 4044 5146",
    "purpose": "B.Tech AI & ML - BITS Pilani Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Checked Out",
    "joinDate": "17 May 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u146",
    "name": "Chandan Patel",
    "email": "chandan.patel45@example.com",
    "mobile": "9876510147",
    "altMobile": "9876520147",
    "nativeAddress": "H.No 46-45, Main Road, Warangal, TS",
    "aadharNo": "3045 4045 5147",
    "purpose": "MBA Finance - CBIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Checked Out",
    "joinDate": "18 Jun 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u147",
    "name": "Devendra Joshi",
    "email": "devendra.joshi46@example.com",
    "mobile": "9876510148",
    "altMobile": "9876520148",
    "nativeAddress": "H.No 47-45, Main Road, Karimnagar, TS",
    "aadharNo": "3046 4046 5148",
    "purpose": "MBA Marketing - VNR VJIET",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Checked Out",
    "joinDate": "19 Jul 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u148",
    "name": "Hemant Rao",
    "email": "hemant.rao47@example.com",
    "mobile": "9876510149",
    "altMobile": "9876520149",
    "nativeAddress": "H.No 48-45, Main Road, Nizamabad, TS",
    "aadharNo": "3047 4047 5149",
    "purpose": "M.Tech Software Engineering - Vasavi College of Engineering",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Checked Out",
    "joinDate": "20 Aug 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u149",
    "name": "Jitendra Kulkarni",
    "email": "jitendra.kulkarni48@example.com",
    "mobile": "9876510150",
    "altMobile": "9876520150",
    "nativeAddress": "H.No 49-45, Main Road, Bangalore, KA",
    "aadharNo": "3048 4048 5150",
    "purpose": "B.Pharm 3rd Yr - Gokaraju Rangaraju Institute",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Checked Out",
    "joinDate": "21 Jan 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u150",
    "name": "Kalyan Das",
    "email": "kalyan.das49@example.com",
    "mobile": "9876510151",
    "altMobile": "9876520151",
    "nativeAddress": "H.No 50-45, Main Road, Chennai, TN",
    "aadharNo": "3049 4049 5151",
    "purpose": "M.Sc Data Science - Malla Reddy Engineering College",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Vanguard Heights Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Checked Out",
    "joinDate": "22 Feb 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u151",
    "name": "Aarav Roy",
    "email": "aarav.roy0@example.com",
    "mobile": "9876510152",
    "altMobile": "9876520152",
    "nativeAddress": "H.No 1-45, Main Road, Hyderabad, AP",
    "aadharNo": "3000 4000 5152",
    "purpose": "B.Tech CSE - JNTU Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "1 Jan 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u152",
    "name": "Vikram Gupta",
    "email": "vikram.gupta1@example.com",
    "mobile": "9876510153",
    "altMobile": "9876520153",
    "nativeAddress": "H.No 2-45, Main Road, Vijayawada, AP",
    "aadharNo": "3001 4001 5153",
    "purpose": "B.Tech ECE - IIIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "2 Feb 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u153",
    "name": "Ishaan Malhotra",
    "email": "ishaan.malhotra2@example.com",
    "mobile": "9876510154",
    "altMobile": "9876520154",
    "nativeAddress": "H.No 3-45, Main Road, Visakhapatnam, AP",
    "aadharNo": "3002 4002 5154",
    "purpose": "B.Tech IT - Osmania University",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "3 Mar 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u154",
    "name": "Aditya Singh",
    "email": "aditya.singh3@example.com",
    "mobile": "9876510155",
    "altMobile": "9876520155",
    "nativeAddress": "H.No 4-45, Main Road, Guntur, AP",
    "aadharNo": "3003 4003 5155",
    "purpose": "B.Tech Mechanical - ISB Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "4 Apr 2025",
    "pendingDues": 1500,
    "earnings": 5500
  },
  {
    "id": "u155",
    "name": "Rohan Kumar",
    "email": "rohan.kumar4@example.com",
    "mobile": "9876510156",
    "altMobile": "9876520156",
    "nativeAddress": "H.No 5-45, Main Road, Tirupati, AP",
    "aadharNo": "3004 4004 5156",
    "purpose": "B.Tech AI & ML - BITS Pilani Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "5 May 2025",
    "pendingDues": 2500,
    "earnings": 12500
  },
  {
    "id": "u156",
    "name": "Siddharth Rajpoot",
    "email": "siddharth.rajpoot5@example.com",
    "mobile": "9876510157",
    "altMobile": "9876520157",
    "nativeAddress": "H.No 6-45, Main Road, Warangal, TS",
    "aadharNo": "3005 4005 5157",
    "purpose": "MBA Finance - CBIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "6 Jun 2025",
    "pendingDues": 4500,
    "earnings": 8500
  },
  {
    "id": "u157",
    "name": "Nikhil Shah",
    "email": "nikhil.shah6@example.com",
    "mobile": "9876510158",
    "altMobile": "9876520158",
    "nativeAddress": "H.No 7-45, Main Road, Karimnagar, TS",
    "aadharNo": "3006 4006 5158",
    "purpose": "MBA Marketing - VNR VJIET",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "7 Jul 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u158",
    "name": "Yash Goel",
    "email": "yash.goel7@example.com",
    "mobile": "9876510159",
    "altMobile": "9876520159",
    "nativeAddress": "H.No 8-45, Main Road, Nizamabad, TS",
    "aadharNo": "3007 4007 5159",
    "purpose": "M.Tech Software Engineering - Vasavi College of Engineering",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "8 Aug 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u159",
    "name": "Kabir Dutt",
    "email": "kabir.dutt8@example.com",
    "mobile": "9876510160",
    "altMobile": "9876520160",
    "nativeAddress": "H.No 9-45, Main Road, Bangalore, KA",
    "aadharNo": "3008 4008 5160",
    "purpose": "B.Pharm 3rd Yr - Gokaraju Rangaraju Institute",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "9 Jan 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u160",
    "name": "Rohit Dhawan",
    "email": "rohit.dhawan9@example.com",
    "mobile": "9876510161",
    "altMobile": "9876520161",
    "nativeAddress": "H.No 10-45, Main Road, Chennai, TN",
    "aadharNo": "3009 4009 5161",
    "purpose": "M.Sc Data Science - Malla Reddy Engineering College",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "10 Feb 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u161",
    "name": "Deepak Agrawal",
    "email": "deepak.agrawal10@example.com",
    "mobile": "9876510162",
    "altMobile": "9876520162",
    "nativeAddress": "H.No 11-45, Main Road, Hyderabad, AP",
    "aadharNo": "3010 4010 5162",
    "purpose": "B.Tech CSE - JNTU Hyderabad",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "11 Mar 2025",
    "pendingDues": 1500,
    "earnings": 7000
  },
  {
    "id": "u162",
    "name": "Kunal Choudhury",
    "email": "kunal.choudhury11@example.com",
    "mobile": "9876510163",
    "altMobile": "9876520163",
    "nativeAddress": "H.No 12-45, Main Road, Vijayawada, AP",
    "aadharNo": "3011 4011 5163",
    "purpose": "B.Tech ECE - IIIT Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "12 Apr 2025",
    "pendingDues": 2500,
    "earnings": 5500
  },
  {
    "id": "u163",
    "name": "Manish Pande",
    "email": "manish.pande12@example.com",
    "mobile": "9876510164",
    "altMobile": "9876520164",
    "nativeAddress": "H.No 13-45, Main Road, Visakhapatnam, AP",
    "aadharNo": "3012 4012 5164",
    "purpose": "B.Tech IT - Osmania University",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "13 May 2025",
    "pendingDues": 4500,
    "earnings": 12500
  },
  {
    "id": "u164",
    "name": "Prateek Mishra",
    "email": "prateek.mishra13@example.com",
    "mobile": "9876510165",
    "altMobile": "9876520165",
    "nativeAddress": "H.No 14-45, Main Road, Guntur, AP",
    "aadharNo": "3013 4013 5165",
    "purpose": "B.Tech Mechanical - ISB Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "14 Jun 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u165",
    "name": "Sanjay Tiwari",
    "email": "sanjay.tiwari14@example.com",
    "mobile": "9876510166",
    "altMobile": "9876520166",
    "nativeAddress": "H.No 15-45, Main Road, Tirupati, AP",
    "aadharNo": "3014 4014 5166",
    "purpose": "B.Tech AI & ML - BITS Pilani Hyderabad",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "15 Jul 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u166",
    "name": "Varun Yadav",
    "email": "varun.yadav15@example.com",
    "mobile": "9876510167",
    "altMobile": "9876520167",
    "nativeAddress": "H.No 16-45, Main Road, Warangal, TS",
    "aadharNo": "3015 4015 5167",
    "purpose": "MBA Finance - CBIT Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "16 Aug 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u167",
    "name": "Amit Tripathi",
    "email": "amit.tripathi16@example.com",
    "mobile": "9876510168",
    "altMobile": "9876520168",
    "nativeAddress": "H.No 17-45, Main Road, Karimnagar, TS",
    "aadharNo": "3016 4016 5168",
    "purpose": "MBA Marketing - VNR VJIET",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "17 Jan 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u168",
    "name": "Gaurav Shukla",
    "email": "gaurav.shukla17@example.com",
    "mobile": "9876510169",
    "altMobile": "9876520169",
    "nativeAddress": "H.No 18-45, Main Road, Nizamabad, TS",
    "aadharNo": "3017 4017 5169",
    "purpose": "M.Tech Software Engineering - Vasavi College of Engineering",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "18 Feb 2025",
    "pendingDues": 1500,
    "earnings": 8500
  },
  {
    "id": "u169",
    "name": "Karthik Pandey",
    "email": "karthik.pandey18@example.com",
    "mobile": "9876510170",
    "altMobile": "9876520170",
    "nativeAddress": "H.No 19-45, Main Road, Bangalore, KA",
    "aadharNo": "3018 4018 5170",
    "purpose": "B.Pharm 3rd Yr - Gokaraju Rangaraju Institute",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "19 Mar 2025",
    "pendingDues": 2500,
    "earnings": 7000
  },
  {
    "id": "u170",
    "name": "Abhinav Venkatesh",
    "email": "abhinav.venkatesh19@example.com",
    "mobile": "9876510171",
    "altMobile": "9876520171",
    "nativeAddress": "H.No 20-45, Main Road, Chennai, TN",
    "aadharNo": "3019 4019 5171",
    "purpose": "M.Sc Data Science - Malla Reddy Engineering College",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "20 Apr 2025",
    "pendingDues": 4500,
    "earnings": 5500
  },
  {
    "id": "u171",
    "name": "Bhaven Naidu",
    "email": "bhaven.naidu20@example.com",
    "mobile": "9876510172",
    "altMobile": "9876520172",
    "nativeAddress": "H.No 21-45, Main Road, Hyderabad, AP",
    "aadharNo": "3020 4020 5172",
    "purpose": "B.Tech CSE - JNTU Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "21 May 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u172",
    "name": "Chaitanya Subramanian",
    "email": "chaitanya.subramanian21@example.com",
    "mobile": "9876510173",
    "altMobile": "9876520173",
    "nativeAddress": "H.No 22-45, Main Road, Vijayawada, AP",
    "aadharNo": "3021 4021 5173",
    "purpose": "B.Tech ECE - IIIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "22 Jun 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u173",
    "name": "Dinesh Iyengar",
    "email": "dinesh.iyengar22@example.com",
    "mobile": "9876510174",
    "altMobile": "9876520174",
    "nativeAddress": "H.No 23-45, Main Road, Visakhapatnam, AP",
    "aadharNo": "3022 4022 5174",
    "purpose": "B.Tech IT - Osmania University",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "23 Jul 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u174",
    "name": "Eashan Menon",
    "email": "eashan.menon23@example.com",
    "mobile": "9876510175",
    "altMobile": "9876520175",
    "nativeAddress": "H.No 24-45, Main Road, Guntur, AP",
    "aadharNo": "3023 4023 5175",
    "purpose": "B.Tech Mechanical - ISB Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "24 Aug 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u175",
    "name": "Farhan Pillai",
    "email": "farhan.pillai24@example.com",
    "mobile": "9876510176",
    "altMobile": "9876520176",
    "nativeAddress": "H.No 25-45, Main Road, Tirupati, AP",
    "aadharNo": "3024 4024 5176",
    "purpose": "B.Tech AI & ML - BITS Pilani Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "25 Jan 2025",
    "pendingDues": 1500,
    "earnings": 12500
  },
  {
    "id": "u176",
    "name": "Girish Banerjee",
    "email": "girish.banerjee25@example.com",
    "mobile": "9876510177",
    "altMobile": "9876520177",
    "nativeAddress": "H.No 26-45, Main Road, Warangal, TS",
    "aadharNo": "3025 4025 5177",
    "purpose": "MBA Finance - CBIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "26 Feb 2025",
    "pendingDues": 2500,
    "earnings": 8500
  },
  {
    "id": "u177",
    "name": "Harish Chatterjee",
    "email": "harish.chatterjee26@example.com",
    "mobile": "9876510178",
    "altMobile": "9876520178",
    "nativeAddress": "H.No 27-45, Main Road, Karimnagar, TS",
    "aadharNo": "3026 4026 5178",
    "purpose": "MBA Marketing - VNR VJIET",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "27 Mar 2025",
    "pendingDues": 4500,
    "earnings": 7000
  },
  {
    "id": "u178",
    "name": "Inian Dutta",
    "email": "inian.dutta27@example.com",
    "mobile": "9876510179",
    "altMobile": "9876520179",
    "nativeAddress": "H.No 28-45, Main Road, Nizamabad, TS",
    "aadharNo": "3027 4027 5179",
    "purpose": "M.Tech Software Engineering - Vasavi College of Engineering",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "28 Apr 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u179",
    "name": "Jatin Goswami",
    "email": "jatin.goswami28@example.com",
    "mobile": "9876510180",
    "altMobile": "9876520180",
    "nativeAddress": "H.No 29-45, Main Road, Bangalore, KA",
    "aadharNo": "3028 4028 5180",
    "purpose": "B.Pharm 3rd Yr - Gokaraju Rangaraju Institute",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "1 May 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u180",
    "name": "Kiran Mukherjee",
    "email": "kiran.mukherjee29@example.com",
    "mobile": "9876510181",
    "altMobile": "9876520181",
    "nativeAddress": "H.No 30-45, Main Road, Chennai, TN",
    "aadharNo": "3029 4029 5181",
    "purpose": "M.Sc Data Science - Malla Reddy Engineering College",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "2 Jun 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u181",
    "name": "Lokesh Paul",
    "email": "lokesh.paul30@example.com",
    "mobile": "9876510182",
    "altMobile": "9876520182",
    "nativeAddress": "H.No 31-45, Main Road, Hyderabad, AP",
    "aadharNo": "3030 4030 5182",
    "purpose": "B.Tech CSE - JNTU Hyderabad",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "3 Jul 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u182",
    "name": "Madhav Nandi",
    "email": "madhav.nandi31@example.com",
    "mobile": "9876510183",
    "altMobile": "9876520183",
    "nativeAddress": "H.No 32-45, Main Road, Vijayawada, AP",
    "aadharNo": "3031 4031 5183",
    "purpose": "B.Tech ECE - IIIT Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "4 Aug 2025",
    "pendingDues": 1500,
    "earnings": 5500
  },
  {
    "id": "u183",
    "name": "Naveen Saha",
    "email": "naveen.saha32@example.com",
    "mobile": "9876510184",
    "altMobile": "9876520184",
    "nativeAddress": "H.No 33-45, Main Road, Visakhapatnam, AP",
    "aadharNo": "3032 4032 5184",
    "purpose": "B.Tech IT - Osmania University",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "5 Jan 2025",
    "pendingDues": 2500,
    "earnings": 12500
  },
  {
    "id": "u184",
    "name": "Omkar Bhowmick",
    "email": "omkar.bhowmick33@example.com",
    "mobile": "9876510185",
    "altMobile": "9876520185",
    "nativeAddress": "H.No 34-45, Main Road, Guntur, AP",
    "aadharNo": "3033 4033 5185",
    "purpose": "B.Tech Mechanical - ISB Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "6 Feb 2025",
    "pendingDues": 4500,
    "earnings": 8500
  },
  {
    "id": "u185",
    "name": "Pawan Sarkar",
    "email": "pawan.sarkar34@example.com",
    "mobile": "9876510186",
    "altMobile": "9876520186",
    "nativeAddress": "H.No 35-45, Main Road, Tirupati, AP",
    "aadharNo": "3034 4034 5186",
    "purpose": "B.Tech AI & ML - BITS Pilani Hyderabad",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "7 Mar 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u186",
    "name": "Rahul Sharma",
    "email": "rahul.sharma35@example.com",
    "mobile": "9876510187",
    "altMobile": "9876520187",
    "nativeAddress": "H.No 36-45, Main Road, Warangal, TS",
    "aadharNo": "3035 4035 5187",
    "purpose": "MBA Finance - CBIT Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "8 Apr 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u187",
    "name": "Satish Verma",
    "email": "satish.verma36@example.com",
    "mobile": "9876510188",
    "altMobile": "9876520188",
    "nativeAddress": "H.No 37-45, Main Road, Karimnagar, TS",
    "aadharNo": "3036 4036 5188",
    "purpose": "MBA Marketing - VNR VJIET",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "9 May 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u188",
    "name": "Tarun Reddy",
    "email": "tarun.reddy37@example.com",
    "mobile": "9876510189",
    "altMobile": "9876520189",
    "nativeAddress": "H.No 38-45, Main Road, Nizamabad, TS",
    "aadharNo": "3037 4037 5189",
    "purpose": "M.Tech Software Engineering - Vasavi College of Engineering",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "10 Jun 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u189",
    "name": "Uday Nair",
    "email": "uday.nair38@example.com",
    "mobile": "9876510190",
    "altMobile": "9876520190",
    "nativeAddress": "H.No 39-45, Main Road, Bangalore, KA",
    "aadharNo": "3038 4038 5190",
    "purpose": "B.Pharm 3rd Yr - Gokaraju Rangaraju Institute",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Active",
    "joinDate": "11 Jul 2025",
    "pendingDues": 1500,
    "earnings": 7000
  },
  {
    "id": "u190",
    "name": "Vijay Hegde",
    "email": "vijay.hegde39@example.com",
    "mobile": "9876510191",
    "altMobile": "9876520191",
    "nativeAddress": "H.No 40-45, Main Road, Chennai, TN",
    "aadharNo": "3039 4039 5191",
    "purpose": "M.Sc Data Science - Malla Reddy Engineering College",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Active",
    "joinDate": "12 Aug 2025",
    "pendingDues": 2500,
    "earnings": 5500
  },
  {
    "id": "u191",
    "name": "Waman Patel",
    "email": "waman.patel40@example.com",
    "mobile": "9876510192",
    "altMobile": "9876520192",
    "nativeAddress": "H.No 41-45, Main Road, Hyderabad, AP",
    "aadharNo": "3040 4040 5192",
    "purpose": "B.Tech CSE - JNTU Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Active",
    "joinDate": "13 Jan 2025",
    "pendingDues": 4500,
    "earnings": 12500
  },
  {
    "id": "u192",
    "name": "Yogesh Joshi",
    "email": "yogesh.joshi41@example.com",
    "mobile": "9876510193",
    "altMobile": "9876520193",
    "nativeAddress": "H.No 42-45, Main Road, Vijayawada, AP",
    "aadharNo": "3041 4041 5193",
    "purpose": "B.Tech ECE - IIIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Active",
    "joinDate": "14 Feb 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u193",
    "name": "Zain Rao",
    "email": "zain.rao42@example.com",
    "mobile": "9876510194",
    "altMobile": "9876520194",
    "nativeAddress": "H.No 43-45, Main Road, Visakhapatnam, AP",
    "aadharNo": "3042 4042 5194",
    "purpose": "B.Tech IT - Osmania University",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Checked Out",
    "joinDate": "15 Mar 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u194",
    "name": "Anand Kulkarni",
    "email": "anand.kulkarni43@example.com",
    "mobile": "9876510195",
    "altMobile": "9876520195",
    "nativeAddress": "H.No 44-45, Main Road, Guntur, AP",
    "aadharNo": "3043 4043 5195",
    "purpose": "B.Tech Mechanical - ISB Hyderabad",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Checked Out",
    "joinDate": "16 Apr 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u195",
    "name": "Bhaskar Das",
    "email": "bhaskar.das44@example.com",
    "mobile": "9876510196",
    "altMobile": "9876520196",
    "nativeAddress": "H.No 45-45, Main Road, Tirupati, AP",
    "aadharNo": "3044 4044 5196",
    "purpose": "B.Tech AI & ML - BITS Pilani Hyderabad",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Checked Out",
    "joinDate": "17 May 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u196",
    "name": "Chandan Deshmukh",
    "email": "chandan.deshmukh45@example.com",
    "mobile": "9876510197",
    "altMobile": "9876520197",
    "nativeAddress": "H.No 46-45, Main Road, Warangal, TS",
    "aadharNo": "3045 4045 5197",
    "purpose": "MBA Finance - CBIT Hyderabad",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Checked Out",
    "joinDate": "18 Jun 2025",
    "pendingDues": 0,
    "earnings": 8500
  },
  {
    "id": "u197",
    "name": "Devendra Sen",
    "email": "devendra.sen46@example.com",
    "mobile": "9876510198",
    "altMobile": "9876520198",
    "nativeAddress": "H.No 47-45, Main Road, Karimnagar, TS",
    "aadharNo": "3046 4046 5198",
    "purpose": "MBA Marketing - VNR VJIET",
    "roomNumber": "303",
    "bedNumber": "Bed C",
    "block": "Floor 3",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "3-Sharing (Triple)",
    "status": "Checked Out",
    "joinDate": "19 Jul 2025",
    "pendingDues": 0,
    "earnings": 7000
  },
  {
    "id": "u198",
    "name": "Hemant Bhat",
    "email": "hemant.bhat47@example.com",
    "mobile": "9876510199",
    "altMobile": "9876520199",
    "nativeAddress": "H.No 48-45, Main Road, Nizamabad, TS",
    "aadharNo": "3047 4047 5199",
    "purpose": "M.Tech Software Engineering - Vasavi College of Engineering",
    "roomNumber": "404",
    "bedNumber": "Bed D",
    "block": "Floor 4",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "4-Sharing (Quad)",
    "status": "Checked Out",
    "joinDate": "20 Aug 2025",
    "pendingDues": 0,
    "earnings": 5500
  },
  {
    "id": "u199",
    "name": "Jitendra Saxena",
    "email": "jitendra.saxena48@example.com",
    "mobile": "9876510200",
    "altMobile": "9876520200",
    "nativeAddress": "H.No 49-45, Main Road, Bangalore, KA",
    "aadharNo": "3048 4048 5200",
    "purpose": "B.Pharm 3rd Yr - Gokaraju Rangaraju Institute",
    "roomNumber": "101",
    "bedNumber": "Bed A",
    "block": "Floor 1",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "1-Sharing (Single)",
    "status": "Checked Out",
    "joinDate": "21 Jan 2025",
    "pendingDues": 0,
    "earnings": 12500
  },
  {
    "id": "u200",
    "name": "Kalyan Mehta",
    "email": "kalyan.mehta49@example.com",
    "mobile": "9876510201",
    "altMobile": "9876520201",
    "nativeAddress": "H.No 50-45, Main Road, Chennai, TN",
    "aadharNo": "3049 4049 5201",
    "purpose": "M.Sc Data Science - Malla Reddy Engineering College",
    "roomNumber": "202",
    "bedNumber": "Bed B",
    "block": "Floor 2",
    "hostelName": "Apex Signature Boys Hostel",
    "sharingType": "2-Sharing (Double)",
    "status": "Checked Out",
    "joinDate": "22 Feb 2025",
    "pendingDues": 0,
    "earnings": 8500
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
    "roomNumber": "101",
    "floor": "1st Floor",
    "sharingType": "1-Sharing",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "rentPerMonth": 12500,
    "beds": [
      {
        "id": "b_Sri_101_A",
        "bedNumber": "Bed A",
        "status": "Occupied",
        "occupantName": "Ananya Sharma"
      }
    ]
  },
  {
    "roomNumber": "102",
    "floor": "1st Floor",
    "sharingType": "2-Sharing",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "rentPerMonth": 8500,
    "beds": [
      {
        "id": "b_Sri_102_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_102_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "103",
    "floor": "1st Floor",
    "sharingType": "3-Sharing",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "rentPerMonth": 7000,
    "beds": [
      {
        "id": "b_Sri_103_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_103_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_103_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "104",
    "floor": "1st Floor",
    "sharingType": "4-Sharing",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "rentPerMonth": 5500,
    "beds": [
      {
        "id": "b_Sri_104_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_104_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_104_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_104_D",
        "bedNumber": "Bed D",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "201",
    "floor": "2nd Floor",
    "sharingType": "1-Sharing",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "rentPerMonth": 12500,
    "beds": [
      {
        "id": "b_Sri_201_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "202",
    "floor": "2nd Floor",
    "sharingType": "2-Sharing",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "rentPerMonth": 8500,
    "beds": [
      {
        "id": "b_Sri_202_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_202_B",
        "bedNumber": "Bed B",
        "status": "Occupied",
        "occupantName": "Riya Verma"
      }
    ]
  },
  {
    "roomNumber": "203",
    "floor": "2nd Floor",
    "sharingType": "3-Sharing",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "rentPerMonth": 7000,
    "beds": [
      {
        "id": "b_Sri_203_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_203_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_203_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "204",
    "floor": "2nd Floor",
    "sharingType": "4-Sharing",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "rentPerMonth": 5500,
    "beds": [
      {
        "id": "b_Sri_204_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_204_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_204_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_204_D",
        "bedNumber": "Bed D",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "301",
    "floor": "3rd Floor",
    "sharingType": "1-Sharing",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "rentPerMonth": 12500,
    "beds": [
      {
        "id": "b_Sri_301_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "302",
    "floor": "3rd Floor",
    "sharingType": "2-Sharing",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "rentPerMonth": 8500,
    "beds": [
      {
        "id": "b_Sri_302_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_302_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "303",
    "floor": "3rd Floor",
    "sharingType": "3-Sharing",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "rentPerMonth": 7000,
    "beds": [
      {
        "id": "b_Sri_303_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_303_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_303_C",
        "bedNumber": "Bed C",
        "status": "Occupied",
        "occupantName": "Sneha Reddy"
      }
    ]
  },
  {
    "roomNumber": "304",
    "floor": "3rd Floor",
    "sharingType": "4-Sharing",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "rentPerMonth": 5500,
    "beds": [
      {
        "id": "b_Sri_304_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_304_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_304_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_304_D",
        "bedNumber": "Bed D",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "401",
    "floor": "4th Floor",
    "sharingType": "1-Sharing",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "rentPerMonth": 12500,
    "beds": [
      {
        "id": "b_Sri_401_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "402",
    "floor": "4th Floor",
    "sharingType": "2-Sharing",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "rentPerMonth": 8500,
    "beds": [
      {
        "id": "b_Sri_402_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_402_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "403",
    "floor": "4th Floor",
    "sharingType": "3-Sharing",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "rentPerMonth": 7000,
    "beds": [
      {
        "id": "b_Sri_403_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_403_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_403_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "404",
    "floor": "4th Floor",
    "sharingType": "4-Sharing",
    "hostelName": "Sri Akshara Luxury Girls Hostel",
    "rentPerMonth": 5500,
    "beds": [
      {
        "id": "b_Sri_404_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_404_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_404_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      },
      {
        "id": "b_Sri_404_D",
        "bedNumber": "Bed D",
        "status": "Occupied",
        "occupantName": "Kavya Nair"
      }
    ]
  },
  {
    "roomNumber": "101",
    "floor": "1st Floor",
    "sharingType": "1-Sharing",
    "hostelName": "Starlight Executive Girls Hostel",
    "rentPerMonth": 12500,
    "beds": [
      {
        "id": "b_Sta_101_A",
        "bedNumber": "Bed A",
        "status": "Occupied",
        "occupantName": "Ananya Patel"
      }
    ]
  },
  {
    "roomNumber": "102",
    "floor": "1st Floor",
    "sharingType": "2-Sharing",
    "hostelName": "Starlight Executive Girls Hostel",
    "rentPerMonth": 8500,
    "beds": [
      {
        "id": "b_Sta_102_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_102_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "103",
    "floor": "1st Floor",
    "sharingType": "3-Sharing",
    "hostelName": "Starlight Executive Girls Hostel",
    "rentPerMonth": 7000,
    "beds": [
      {
        "id": "b_Sta_103_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_103_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_103_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "104",
    "floor": "1st Floor",
    "sharingType": "4-Sharing",
    "hostelName": "Starlight Executive Girls Hostel",
    "rentPerMonth": 5500,
    "beds": [
      {
        "id": "b_Sta_104_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_104_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_104_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_104_D",
        "bedNumber": "Bed D",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "201",
    "floor": "2nd Floor",
    "sharingType": "1-Sharing",
    "hostelName": "Starlight Executive Girls Hostel",
    "rentPerMonth": 12500,
    "beds": [
      {
        "id": "b_Sta_201_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "202",
    "floor": "2nd Floor",
    "sharingType": "2-Sharing",
    "hostelName": "Starlight Executive Girls Hostel",
    "rentPerMonth": 8500,
    "beds": [
      {
        "id": "b_Sta_202_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_202_B",
        "bedNumber": "Bed B",
        "status": "Occupied",
        "occupantName": "Riya Joshi"
      }
    ]
  },
  {
    "roomNumber": "203",
    "floor": "2nd Floor",
    "sharingType": "3-Sharing",
    "hostelName": "Starlight Executive Girls Hostel",
    "rentPerMonth": 7000,
    "beds": [
      {
        "id": "b_Sta_203_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_203_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_203_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "204",
    "floor": "2nd Floor",
    "sharingType": "4-Sharing",
    "hostelName": "Starlight Executive Girls Hostel",
    "rentPerMonth": 5500,
    "beds": [
      {
        "id": "b_Sta_204_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_204_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_204_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_204_D",
        "bedNumber": "Bed D",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "301",
    "floor": "3rd Floor",
    "sharingType": "1-Sharing",
    "hostelName": "Starlight Executive Girls Hostel",
    "rentPerMonth": 12500,
    "beds": [
      {
        "id": "b_Sta_301_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "302",
    "floor": "3rd Floor",
    "sharingType": "2-Sharing",
    "hostelName": "Starlight Executive Girls Hostel",
    "rentPerMonth": 8500,
    "beds": [
      {
        "id": "b_Sta_302_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_302_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "303",
    "floor": "3rd Floor",
    "sharingType": "3-Sharing",
    "hostelName": "Starlight Executive Girls Hostel",
    "rentPerMonth": 7000,
    "beds": [
      {
        "id": "b_Sta_303_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_303_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_303_C",
        "bedNumber": "Bed C",
        "status": "Occupied",
        "occupantName": "Sneha Rao"
      }
    ]
  },
  {
    "roomNumber": "304",
    "floor": "3rd Floor",
    "sharingType": "4-Sharing",
    "hostelName": "Starlight Executive Girls Hostel",
    "rentPerMonth": 5500,
    "beds": [
      {
        "id": "b_Sta_304_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_304_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_304_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_304_D",
        "bedNumber": "Bed D",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "401",
    "floor": "4th Floor",
    "sharingType": "1-Sharing",
    "hostelName": "Starlight Executive Girls Hostel",
    "rentPerMonth": 12500,
    "beds": [
      {
        "id": "b_Sta_401_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "402",
    "floor": "4th Floor",
    "sharingType": "2-Sharing",
    "hostelName": "Starlight Executive Girls Hostel",
    "rentPerMonth": 8500,
    "beds": [
      {
        "id": "b_Sta_402_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_402_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "403",
    "floor": "4th Floor",
    "sharingType": "3-Sharing",
    "hostelName": "Starlight Executive Girls Hostel",
    "rentPerMonth": 7000,
    "beds": [
      {
        "id": "b_Sta_403_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_403_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_403_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "404",
    "floor": "4th Floor",
    "sharingType": "4-Sharing",
    "hostelName": "Starlight Executive Girls Hostel",
    "rentPerMonth": 5500,
    "beds": [
      {
        "id": "b_Sta_404_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_404_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_404_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      },
      {
        "id": "b_Sta_404_D",
        "bedNumber": "Bed D",
        "status": "Occupied",
        "occupantName": "Kavya Kulkarni"
      }
    ]
  },
  {
    "roomNumber": "101",
    "floor": "1st Floor",
    "sharingType": "1-Sharing",
    "hostelName": "Vanguard Heights Boys Hostel",
    "rentPerMonth": 12500,
    "beds": [
      {
        "id": "b_Van_101_A",
        "bedNumber": "Bed A",
        "status": "Occupied",
        "occupantName": "Aarav Deshmukh"
      }
    ]
  },
  {
    "roomNumber": "102",
    "floor": "1st Floor",
    "sharingType": "2-Sharing",
    "hostelName": "Vanguard Heights Boys Hostel",
    "rentPerMonth": 8500,
    "beds": [
      {
        "id": "b_Van_102_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Van_102_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "103",
    "floor": "1st Floor",
    "sharingType": "3-Sharing",
    "hostelName": "Vanguard Heights Boys Hostel",
    "rentPerMonth": 7000,
    "beds": [
      {
        "id": "b_Van_103_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Van_103_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Van_103_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "104",
    "floor": "1st Floor",
    "sharingType": "4-Sharing",
    "hostelName": "Vanguard Heights Boys Hostel",
    "rentPerMonth": 5500,
    "beds": [
      {
        "id": "b_Van_104_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Van_104_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Van_104_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      },
      {
        "id": "b_Van_104_D",
        "bedNumber": "Bed D",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "201",
    "floor": "2nd Floor",
    "sharingType": "1-Sharing",
    "hostelName": "Vanguard Heights Boys Hostel",
    "rentPerMonth": 12500,
    "beds": [
      {
        "id": "b_Van_201_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "202",
    "floor": "2nd Floor",
    "sharingType": "2-Sharing",
    "hostelName": "Vanguard Heights Boys Hostel",
    "rentPerMonth": 8500,
    "beds": [
      {
        "id": "b_Van_202_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Van_202_B",
        "bedNumber": "Bed B",
        "status": "Occupied",
        "occupantName": "Vikram Sen"
      }
    ]
  },
  {
    "roomNumber": "203",
    "floor": "2nd Floor",
    "sharingType": "3-Sharing",
    "hostelName": "Vanguard Heights Boys Hostel",
    "rentPerMonth": 7000,
    "beds": [
      {
        "id": "b_Van_203_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Van_203_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Van_203_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "204",
    "floor": "2nd Floor",
    "sharingType": "4-Sharing",
    "hostelName": "Vanguard Heights Boys Hostel",
    "rentPerMonth": 5500,
    "beds": [
      {
        "id": "b_Van_204_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Van_204_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Van_204_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      },
      {
        "id": "b_Van_204_D",
        "bedNumber": "Bed D",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "301",
    "floor": "3rd Floor",
    "sharingType": "1-Sharing",
    "hostelName": "Vanguard Heights Boys Hostel",
    "rentPerMonth": 12500,
    "beds": [
      {
        "id": "b_Van_301_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "302",
    "floor": "3rd Floor",
    "sharingType": "2-Sharing",
    "hostelName": "Vanguard Heights Boys Hostel",
    "rentPerMonth": 8500,
    "beds": [
      {
        "id": "b_Van_302_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Van_302_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "303",
    "floor": "3rd Floor",
    "sharingType": "3-Sharing",
    "hostelName": "Vanguard Heights Boys Hostel",
    "rentPerMonth": 7000,
    "beds": [
      {
        "id": "b_Van_303_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Van_303_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Van_303_C",
        "bedNumber": "Bed C",
        "status": "Occupied",
        "occupantName": "Ishaan Bhat"
      }
    ]
  },
  {
    "roomNumber": "304",
    "floor": "3rd Floor",
    "sharingType": "4-Sharing",
    "hostelName": "Vanguard Heights Boys Hostel",
    "rentPerMonth": 5500,
    "beds": [
      {
        "id": "b_Van_304_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Van_304_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Van_304_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      },
      {
        "id": "b_Van_304_D",
        "bedNumber": "Bed D",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "401",
    "floor": "4th Floor",
    "sharingType": "1-Sharing",
    "hostelName": "Vanguard Heights Boys Hostel",
    "rentPerMonth": 12500,
    "beds": [
      {
        "id": "b_Van_401_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "402",
    "floor": "4th Floor",
    "sharingType": "2-Sharing",
    "hostelName": "Vanguard Heights Boys Hostel",
    "rentPerMonth": 8500,
    "beds": [
      {
        "id": "b_Van_402_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Van_402_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "403",
    "floor": "4th Floor",
    "sharingType": "3-Sharing",
    "hostelName": "Vanguard Heights Boys Hostel",
    "rentPerMonth": 7000,
    "beds": [
      {
        "id": "b_Van_403_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Van_403_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Van_403_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "404",
    "floor": "4th Floor",
    "sharingType": "4-Sharing",
    "hostelName": "Vanguard Heights Boys Hostel",
    "rentPerMonth": 5500,
    "beds": [
      {
        "id": "b_Van_404_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Van_404_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Van_404_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      },
      {
        "id": "b_Van_404_D",
        "bedNumber": "Bed D",
        "status": "Occupied",
        "occupantName": "Aditya Saxena"
      }
    ]
  },
  {
    "roomNumber": "101",
    "floor": "1st Floor",
    "sharingType": "1-Sharing",
    "hostelName": "Apex Signature Boys Hostel",
    "rentPerMonth": 12500,
    "beds": [
      {
        "id": "b_Ape_101_A",
        "bedNumber": "Bed A",
        "status": "Occupied",
        "occupantName": "Aarav Roy"
      }
    ]
  },
  {
    "roomNumber": "102",
    "floor": "1st Floor",
    "sharingType": "2-Sharing",
    "hostelName": "Apex Signature Boys Hostel",
    "rentPerMonth": 8500,
    "beds": [
      {
        "id": "b_Ape_102_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_102_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "103",
    "floor": "1st Floor",
    "sharingType": "3-Sharing",
    "hostelName": "Apex Signature Boys Hostel",
    "rentPerMonth": 7000,
    "beds": [
      {
        "id": "b_Ape_103_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_103_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_103_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "104",
    "floor": "1st Floor",
    "sharingType": "4-Sharing",
    "hostelName": "Apex Signature Boys Hostel",
    "rentPerMonth": 5500,
    "beds": [
      {
        "id": "b_Ape_104_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_104_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_104_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_104_D",
        "bedNumber": "Bed D",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "201",
    "floor": "2nd Floor",
    "sharingType": "1-Sharing",
    "hostelName": "Apex Signature Boys Hostel",
    "rentPerMonth": 12500,
    "beds": [
      {
        "id": "b_Ape_201_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "202",
    "floor": "2nd Floor",
    "sharingType": "2-Sharing",
    "hostelName": "Apex Signature Boys Hostel",
    "rentPerMonth": 8500,
    "beds": [
      {
        "id": "b_Ape_202_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_202_B",
        "bedNumber": "Bed B",
        "status": "Occupied",
        "occupantName": "Vikram Gupta"
      }
    ]
  },
  {
    "roomNumber": "203",
    "floor": "2nd Floor",
    "sharingType": "3-Sharing",
    "hostelName": "Apex Signature Boys Hostel",
    "rentPerMonth": 7000,
    "beds": [
      {
        "id": "b_Ape_203_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_203_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_203_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "204",
    "floor": "2nd Floor",
    "sharingType": "4-Sharing",
    "hostelName": "Apex Signature Boys Hostel",
    "rentPerMonth": 5500,
    "beds": [
      {
        "id": "b_Ape_204_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_204_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_204_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_204_D",
        "bedNumber": "Bed D",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "301",
    "floor": "3rd Floor",
    "sharingType": "1-Sharing",
    "hostelName": "Apex Signature Boys Hostel",
    "rentPerMonth": 12500,
    "beds": [
      {
        "id": "b_Ape_301_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "302",
    "floor": "3rd Floor",
    "sharingType": "2-Sharing",
    "hostelName": "Apex Signature Boys Hostel",
    "rentPerMonth": 8500,
    "beds": [
      {
        "id": "b_Ape_302_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_302_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "303",
    "floor": "3rd Floor",
    "sharingType": "3-Sharing",
    "hostelName": "Apex Signature Boys Hostel",
    "rentPerMonth": 7000,
    "beds": [
      {
        "id": "b_Ape_303_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_303_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_303_C",
        "bedNumber": "Bed C",
        "status": "Occupied",
        "occupantName": "Ishaan Malhotra"
      }
    ]
  },
  {
    "roomNumber": "304",
    "floor": "3rd Floor",
    "sharingType": "4-Sharing",
    "hostelName": "Apex Signature Boys Hostel",
    "rentPerMonth": 5500,
    "beds": [
      {
        "id": "b_Ape_304_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_304_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_304_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_304_D",
        "bedNumber": "Bed D",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "401",
    "floor": "4th Floor",
    "sharingType": "1-Sharing",
    "hostelName": "Apex Signature Boys Hostel",
    "rentPerMonth": 12500,
    "beds": [
      {
        "id": "b_Ape_401_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "402",
    "floor": "4th Floor",
    "sharingType": "2-Sharing",
    "hostelName": "Apex Signature Boys Hostel",
    "rentPerMonth": 8500,
    "beds": [
      {
        "id": "b_Ape_402_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_402_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "403",
    "floor": "4th Floor",
    "sharingType": "3-Sharing",
    "hostelName": "Apex Signature Boys Hostel",
    "rentPerMonth": 7000,
    "beds": [
      {
        "id": "b_Ape_403_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_403_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_403_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      }
    ]
  },
  {
    "roomNumber": "404",
    "floor": "4th Floor",
    "sharingType": "4-Sharing",
    "hostelName": "Apex Signature Boys Hostel",
    "rentPerMonth": 5500,
    "beds": [
      {
        "id": "b_Ape_404_A",
        "bedNumber": "Bed A",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_404_B",
        "bedNumber": "Bed B",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_404_C",
        "bedNumber": "Bed C",
        "status": "Vacant"
      },
      {
        "id": "b_Ape_404_D",
        "bedNumber": "Bed D",
        "status": "Occupied",
        "occupantName": "Aditya Singh"
      }
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
  const [selectedHostel, setSelectedHostel] = useState<string>('Sri Akshara Luxury Girls Hostel');

  // Modals state
  const [isAddWizardOpen, setIsAddWizardOpen] = useState<boolean>(false);
  const [viewingUser, setViewingUser] = useState<TenantUser | null>(null);
  const [checkoutUser, setCheckoutUser] = useState<TenantUser | null>(null);

  // Edit Mode state
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>('');
  const [editMobile, setEditMobile] = useState<string>('');
  const [editAltMobile, setEditAltMobile] = useState<string>('');
  const [editNativeAddress, setEditNativeAddress] = useState<string>('');
  const [editEmail, setEditEmail] = useState<string>('');
  const [editAadhaar, setEditAadhaar] = useState<string>('');
  const [editPurpose, setEditPurpose] = useState<string>('');
  const [editJoinDate, setEditJoinDate] = useState<string>('');

  const handleStartEdit = (user: TenantUser) => {
    setEditName(user.name);
    setEditMobile(user.mobile);
    setEditAltMobile(user.altMobile && user.altMobile !== 'N/A' ? user.altMobile : '');
    setEditNativeAddress(user.nativeAddress && user.nativeAddress !== 'N/A' ? user.nativeAddress : '');
    setEditEmail(user.email);
    setEditAadhaar(user.aadharNo && user.aadharNo !== 'N/A' ? user.aadharNo : '');
    setEditPurpose(user.purpose || 'Working Professional');
    setEditJoinDate(user.joinDate);
    setIsEditing(true);
  };

  const handleSaveUserEdit = () => {
    if (!viewingUser) return;
    if (!editName.trim() || !editMobile.trim()) {
      if (showToast) showToast('Name and Contact Number are required');
      return;
    }

    const updatedUser: TenantUser = {
      ...viewingUser,
      name: editName.trim(),
      mobile: editMobile.trim(),
      altMobile: editAltMobile.trim() || 'N/A',
      nativeAddress: editNativeAddress.trim() || 'N/A',
      email: editEmail.trim(),
      aadharNo: editAadhaar.trim() || 'N/A',
      purpose: editPurpose.trim() || 'Working Professional',
      joinDate: editJoinDate.trim()
    };

    setUsers(prev => prev.map(u => u.id === viewingUser.id ? updatedUser : u));
    setViewingUser(updatedUser);
    setIsEditing(false);
    if (showToast) showToast(`Tenant details for ${updatedUser.name} updated successfully!`);
  };

  // -------------------------------------------------------------
  // ADD USER WIZARD STATE (5 Steps)
  // -------------------------------------------------------------
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [wizHostel, setWizHostel] = useState<string>('Sri Akshara Luxury Girls Hostel');
  const [wizSharing, setWizSharing] = useState<string>('2-Sharing');
  const [wizRoom, setWizRoom] = useState<InventoryRoom | null>(null);
  const [wizBed, setWizBed] = useState<InventoryBed | null>(null);

  // Step 5 Tenant details form
  const [wizName, setWizName] = useState('');
  const [wizMobile, setWizMobile] = useState('');
  const [wizAltMobile, setWizAltMobile] = useState('');
  const [wizNativeAddress, setWizNativeAddress] = useState('');
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
    setWizNativeAddress('');
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
      altMobile: wizAltMobile.trim() || 'N/A',
      nativeAddress: wizNativeAddress.trim() || 'N/A',
      aadharNo: wizAadhaar.trim() || 'N/A',
      purpose: 'Working Professional',
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
    <div className="users-page-container">
      {/* 1. TOP HEADER ROW (USERS TITLE + ADD USER BUTTON) */}
      <div className="users-top-header-row">
        <h1 className="users-page-title">Users</h1>
        <button 
          type="button" 
          className="single-add-user-btn"
          onClick={openAddWizard}
        >
          <Plus size={16} />
          <span>Add User</span>
        </button>
      </div>

      {/* 2. HOSTEL FILTER SELECTOR BAR */}
      <div className="hostel-filter-select-box">
        <Building2 size={15} className="hostel-icon-muted" />
        <select 
          className="hostel-filter-dropdown"
          value={selectedHostel}
          onChange={(e) => setSelectedHostel(e.target.value)}
        >
          <option value="Sri Akshara Luxury Girls Hostel">Sri Akshara Luxury Girls Hostel</option>
          <option value="Starlight Executive Girls Hostel">Starlight Executive Girls Hostel</option>
          <option value="Vanguard Heights Boys Hostel">Vanguard Heights Boys Hostel</option>
          <option value="Apex Signature Boys Hostel">Apex Signature Boys Hostel</option>
          <option value="ALL HOSTELS">All Hostels</option>
        </select>
      </div>

      {/* 3. SEARCH BAR */}
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

      {/* 4. BIG STAT CARDS (TOTAL TENANTS & AVAILABLE BEDS) */}
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

      {/* 5. ROSTER LIST HEADER WITH RECORDS COUNT */}
      <div className="roster-list-header">
        <span className="roster-list-title">REGISTERED TENANTS</span>
        <span className="roster-count-badge">{filteredUsers.length} Records</span>
      </div>

      {/* 6. TENANT CARDS (BRIEF: NAME, ROOM & BED, VIEW >) */}
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
              className="ref-tenant-card brief-user-card"
              onClick={() => setViewingUser(user)}
            >
              <div className="ref-card-content">
                <div className="ref-card-top-row">
                  <div className="ref-name-group">
                    <h3 className="ref-tenant-name">{user.name}</h3>
                    <span className="ref-room-pill">Room {user.roomNumber} ({user.bedNumber})</span>
                  </div>
                  <button
                    type="button"
                    className="user-block-view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewingUser(user);
                    }}
                  >
                    <span>View</span>
                    <ChevronRight size={16} />
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
                      <label className="form-field-label">Native Address</label>
                      <input 
                        type="text" 
                        className="modal-text-input"
                        placeholder="e.g. H.No 4-12, Main Road, Vijayawada, AP"
                        value={wizNativeAddress}
                        onChange={(e) => setWizNativeAddress(e.target.value)}
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
      {/* ========================================================================= */}
      {/* VIEW / EDIT USER DETAILS MODAL                                            */}
      {/* ========================================================================= */}
      {viewingUser && (
        <div 
          className="user-detail-modal-overlay" 
          onClick={() => {
            setViewingUser(null);
            setIsEditing(false);
          }}
        >
          <div className="user-detail-modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* FIXED HEADER WITH TITLE & CLOSE BUTTON */}
            <div className="user-modal-header">
              <span className="user-modal-header-title">
                {isEditing ? 'Edit Tenant Details' : 'Tenant Details'}
              </span>
              <button
                type="button"
                className="user-detail-close-btn"
                onClick={() => {
                  setViewingUser(null);
                  setIsEditing(false);
                }}
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* SCROLLABLE MODAL BODY */}
            <div className="user-detail-modal-body">
              {!isEditing ? (
                /* VIEW MODE */
                <>
                  <div className="user-detail-hero">
                    <div className="user-detail-avatar">
                      {viewingUser.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                    </div>
                    <div className="user-detail-hero-info">
                      <div className="user-detail-hero-name">{viewingUser.name}</div>
                      <div className="user-detail-hero-hostel">{viewingUser.hostelName} • Room {viewingUser.roomNumber} ({viewingUser.bedNumber})</div>
                      <span className={`user-detail-status-badge ${viewingUser.status?.toLowerCase() === 'active' ? 'active' : 'inactive'}`}>
                        ● {viewingUser.status}
                      </span>
                    </div>
                  </div>

                  <div className="user-detail-info-list">
                    {/* 1. Name */}
                    <div className="user-detail-info-row">
                      <div className="user-detail-info-icon-wrap blue-icon">
                        <User size={16} />
                      </div>
                      <div className="user-detail-info-content">
                        <div className="user-detail-info-label">Name</div>
                        <div className="user-detail-info-value">{viewingUser.name}</div>
                      </div>
                    </div>

                    {/* 2. Contact Number */}
                    <div className="user-detail-info-row">
                      <div className="user-detail-info-icon-wrap blue-icon">
                        <Phone size={16} />
                      </div>
                      <div className="user-detail-info-content">
                        <div className="user-detail-info-label">Contact Number</div>
                        <div className="user-detail-info-value">{viewingUser.mobile}</div>
                      </div>
                    </div>

                    {/* 3. Alternate Number */}
                    <div className="user-detail-info-row">
                      <div className="user-detail-info-icon-wrap teal-icon">
                        <PhoneCall size={16} />
                      </div>
                      <div className="user-detail-info-content">
                        <div className="user-detail-info-label">Alternate Number</div>
                        <div className="user-detail-info-value">{viewingUser.altMobile || 'N/A'}</div>
                      </div>
                    </div>

                    {/* Native Address */}
                    <div className="user-detail-info-row">
                      <div className="user-detail-info-icon-wrap rose-icon">
                        <MapPin size={16} />
                      </div>
                      <div className="user-detail-info-content">
                        <div className="user-detail-info-label">Native Address</div>
                        <div className="user-detail-info-value">{viewingUser.nativeAddress || 'N/A'}</div>
                      </div>
                    </div>

                    {/* 4. Email */}
                    <div className="user-detail-info-row">
                      <div className="user-detail-info-icon-wrap purple-icon">
                        <Mail size={16} />
                      </div>
                      <div className="user-detail-info-content">
                        <div className="user-detail-info-label">Email</div>
                        <div className="user-detail-info-value">{viewingUser.email}</div>
                      </div>
                    </div>

                    {/* 5. Aadhar No */}
                    <div className="user-detail-info-row">
                      <div className="user-detail-info-icon-wrap indigo-icon">
                        <ShieldCheck size={16} />
                      </div>
                      <div className="user-detail-info-content">
                        <div className="user-detail-info-label">Aadhar No</div>
                        <div className="user-detail-info-value">{viewingUser.aadharNo || 'N/A'}</div>
                      </div>
                    </div>

                    {/* 6. Purpose (Joining Purpose) */}
                    <div className="user-detail-info-row">
                      <div className="user-detail-info-icon-wrap orange-icon">
                        <Briefcase size={16} />
                      </div>
                      <div className="user-detail-info-content">
                        <div className="user-detail-info-label">Purpose (Joining Purpose)</div>
                        <div className="user-detail-info-value">{viewingUser.purpose || 'Working Professional'}</div>
                      </div>
                    </div>

                    {/* 7. Date of Joined */}
                    <div className="user-detail-info-row">
                      <div className="user-detail-info-icon-wrap amber-icon">
                        <Calendar size={16} />
                      </div>
                      <div className="user-detail-info-content">
                        <div className="user-detail-info-label">Date of Joined</div>
                        <div className="user-detail-info-value">{viewingUser.joinDate}</div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* EDIT MODE FORM */
                <div className="user-edit-form-grid">
                  <div className="edit-form-field">
                    <label className="edit-field-label">Full Name *</label>
                    <div className="edit-input-wrapper">
                      <User size={16} className="edit-input-icon" />
                      <input 
                        type="text"
                        className="edit-text-input"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Full Name"
                      />
                    </div>
                  </div>

                  <div className="edit-form-field">
                    <label className="edit-field-label">Contact Number *</label>
                    <div className="edit-input-wrapper">
                      <Phone size={16} className="edit-input-icon" />
                      <input 
                        type="text"
                        className="edit-text-input"
                        value={editMobile}
                        onChange={(e) => setEditMobile(e.target.value)}
                        placeholder="Contact Mobile Number"
                      />
                    </div>
                  </div>

                  <div className="edit-form-field">
                    <label className="edit-field-label">Alternate Number</label>
                    <div className="edit-input-wrapper">
                      <PhoneCall size={16} className="edit-input-icon" />
                      <input 
                        type="text"
                        className="edit-text-input"
                        value={editAltMobile}
                        onChange={(e) => setEditAltMobile(e.target.value)}
                        placeholder="Alternate Mobile Number"
                      />
                    </div>
                  </div>

                  <div className="edit-form-field">
                    <label className="edit-field-label">Native Address</label>
                    <div className="edit-input-wrapper">
                      <MapPin size={16} className="edit-input-icon" />
                      <input 
                        type="text"
                        className="edit-text-input"
                        value={editNativeAddress}
                        onChange={(e) => setEditNativeAddress(e.target.value)}
                        placeholder="Native Address (City, District, State)"
                      />
                    </div>
                  </div>

                  <div className="edit-form-field">
                    <label className="edit-field-label">Email Address</label>
                    <div className="edit-input-wrapper">
                      <Mail size={16} className="edit-input-icon" />
                      <input 
                        type="email"
                        className="edit-text-input"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        placeholder="Email Address"
                      />
                    </div>
                  </div>

                  <div className="edit-form-field">
                    <label className="edit-field-label">Aadhar No.</label>
                    <div className="edit-input-wrapper">
                      <ShieldCheck size={16} className="edit-input-icon" />
                      <input 
                        type="text"
                        className="edit-text-input"
                        value={editAadhaar}
                        onChange={(e) => setEditAadhaar(e.target.value)}
                        placeholder="Aadhar Number"
                      />
                    </div>
                  </div>

                  <div className="edit-form-field">
                    <label className="edit-field-label">Joining Purpose</label>
                    <div className="edit-input-wrapper">
                      <Briefcase size={16} className="edit-input-icon" />
                      <input 
                        type="text"
                        className="edit-text-input"
                        value={editPurpose}
                        onChange={(e) => setEditPurpose(e.target.value)}
                        placeholder="e.g. Software Engineer, Student"
                      />
                    </div>
                  </div>

                  <div className="edit-form-field">
                    <label className="edit-field-label">Date of Joined</label>
                    <div className="edit-input-wrapper">
                      <Calendar size={16} className="edit-input-icon" />
                      <input 
                        type="text"
                        className="edit-text-input"
                        value={editJoinDate}
                        onChange={(e) => setEditJoinDate(e.target.value)}
                        placeholder="e.g. 15 Jan 2026"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* TWO BUTTONS AT BOTTOM: VIEW MODE (CHECKOUT & EDIT) OR EDIT MODE (CANCEL & SAVE) */}
            <div className="user-detail-bottom-actions">
              {!isEditing ? (
                <>
                  <button
                    type="button"
                    className="user-modal-checkout-btn"
                    onClick={() => {
                      const targetUser = viewingUser;
                      setViewingUser(null);
                      setIsEditing(false);
                      setCheckoutUser(targetUser);
                    }}
                  >
                    <LogOut size={16} />
                    <span>Checkout</span>
                  </button>

                  <button
                    type="button"
                    className="user-modal-edit-btn"
                    onClick={() => handleStartEdit(viewingUser)}
                  >
                    <Edit3 size={16} />
                    <span>Edit</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="user-modal-cancel-edit-btn"
                    onClick={() => setIsEditing(false)}
                  >
                    <span>Cancel</span>
                  </button>

                  <button
                    type="button"
                    className="user-modal-save-edit-btn"
                    onClick={handleSaveUserEdit}
                  >
                    <Check size={16} />
                    <span>Save Changes</span>
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default UsersHistoryPage;
