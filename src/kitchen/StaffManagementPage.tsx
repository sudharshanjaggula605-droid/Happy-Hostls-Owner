import React, { useState } from 'react';
import { ChevronLeft, History, Calendar, Banknote, Phone, CalendarDays, Contact2, X, Check, MessageSquare, MessageCircle, AlertTriangle, User, Upload, MapPin, Plus, Trash2 } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  initials: string;
  salaryMonthly: number;
  contact: string;
  altContact: string;
  joinedDate: string;
  presentDays: number;
  absentDays: number;
  aadhaarNumber: string;
  address: string;
}

interface StaffManagementPageProps {
  onBack: () => void;
  onOpenHistory?: (staff?: any) => void;
  onPaySalary?: (staffName: string, amount: number) => void;
  onNavigateToPaySalary?: (staff: { name: string; role?: string; salaryMonthly: number; absentDays: number }) => void;
  onNavigateToAttendance?: (staff: { name: string; role?: string; presentDays: number; absentDays: number }) => void;
}

const initialStaffMembers: StaffMember[] = [
  {
    id: 'st-1',
    name: 'Ramesh Kumar',
    initials: 'RK',
    salaryMonthly: 18000,
    contact: '9876543210',
    altContact: '9876543211',
    joinedDate: '2025-03-10',
    presentDays: 25,
    absentDays: 1,
    aadhaarNumber: '1234 5678 9012',
    address: 'Flat 302, Sai Residency, Hitech City, Hyderabad'
  },
  {
    id: 'st-2',
    name: 'Sita Devi',
    initials: 'SD',
    salaryMonthly: 14000,
    contact: '9765432109',
    altContact: '9765432110',
    joinedDate: '2025-05-15',
    presentDays: 24,
    absentDays: 2,
    aadhaarNumber: '2345 6789 0123',
    address: 'Plot 45, Green Meadows, Madhapur, Hyderabad'
  },
  {
    id: 'st-3',
    name: 'Bahadur Singh',
    initials: 'BS',
    salaryMonthly: 12000,
    contact: '9654321098',
    altContact: '9654321099',
    joinedDate: '2024-11-01',
    presentDays: 26,
    absentDays: 0,
    aadhaarNumber: '3456 7890 1234',
    address: 'H.No 12-4, Near Bus Stand, Gachibowli, Hyderabad'
  },
  {
    id: 'st-4',
    name: 'Suresh Cook',
    initials: 'SC',
    salaryMonthly: 15000,
    contact: '9543210987',
    altContact: '9543210988',
    joinedDate: '2025-01-20',
    presentDays: 25,
    absentDays: 1,
    aadhaarNumber: '4567 8901 2345',
    address: 'Street No 5, Jubilee Hills, Hyderabad'
  }
];

export const StaffManagementPage: React.FC<StaffManagementPageProps> = ({
  onBack,
  onOpenHistory,
  onPaySalary,
  onNavigateToPaySalary,
  onNavigateToAttendance
}) => {
  const [activeCalendarStaff, setActiveCalendarStaff] = useState<StaffMember | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isGlobalAttendanceModalOpen, setIsGlobalAttendanceModalOpen] = useState(false);
  const [globalAttendanceState, setGlobalAttendanceState] = useState<Record<string, 'present' | 'absent' | null>>({});
  const [notificationPrefs, setNotificationPrefs] = useState<Record<string, { whatsapp?: boolean; sms?: boolean }>>({});

  const [staffMembers, setStaffMembers] = useState<StaffMember[]>(initialStaffMembers);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isEditingStaff, setIsEditingStaff] = useState(false);
  const [editedStaffData, setEditedStaffData] = useState<StaffMember | null>(null);
  const [showRemoveAlert, setShowRemoveAlert] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Add Staff Modal State
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffJoinedDate, setNewStaffJoinedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [newStaffSalary, setNewStaffSalary] = useState('');
  const [newStaffContact, setNewStaffContact] = useState('');
  const [newStaffAltContact, setNewStaffAltContact] = useState('');
  const [newStaffAadhaar, setNewStaffAadhaar] = useState('');
  const [newStaffAddress, setNewStaffAddress] = useState('');

  const handleAddStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName.trim() || !newStaffContact.trim() || !newStaffSalary) return;

    const names = newStaffName.trim().split(' ');
    const initials = names.length > 1
      ? `${names[0][0]}${names[1][0]}`.toUpperCase()
      : names[0].substring(0, 2).toUpperCase();

    const newStaff: StaffMember = {
      id: `st-${Date.now()}`,
      name: newStaffName.trim(),
      initials,
      salaryMonthly: Number(newStaffSalary),
      contact: newStaffContact.trim(),
      altContact: newStaffAltContact.trim(),
      joinedDate: newStaffJoinedDate,
      presentDays: 0,
      absentDays: 0,
      aadhaarNumber: newStaffAadhaar.trim(),
      address: newStaffAddress.trim()
    };

    setStaffMembers(prev => [newStaff, ...prev]);
    setIsAddStaffModalOpen(false);

    // Reset form
    setNewStaffName('');
    setNewStaffSalary('');
    setNewStaffContact('');
    setNewStaffAltContact('');
    setNewStaffAadhaar('');
    setNewStaffAddress('');

    setToastMessage(`Staff member "${newStaff.name}" added successfully.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Real data state for attendance
  const [attendanceDB, setAttendanceDB] = useState<Record<string, { absentDates: number[]; holidayDates: number[] }>>(() => {
    const saved = localStorage.getItem('staffAttendanceDB');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return {
      'st-1': { absentDates: [8], holidayDates: [] },
      'st-2': { absentDates: [8, 14], holidayDates: [] },
      'st-3': { absentDates: [], holidayDates: [] },
      'st-4': { absentDates: [18], holidayDates: [] }
    };
  });

  // Keep localStorage in sync when attendanceDB changes
  React.useEffect(() => {
    localStorage.setItem('staffAttendanceDB', JSON.stringify(attendanceDB));
  }, [attendanceDB]);

  // Prevent background scrolling when any modal is open
  React.useEffect(() => {
    const appContent = document.querySelector('.app-content') as HTMLElement;
    if (!appContent) return;

    if (activeCalendarStaff || isGlobalAttendanceModalOpen || showRemoveAlert || isAddStaffModalOpen) {
      appContent.style.overflow = 'hidden';
    } else {
      appContent.style.overflow = 'auto';
    }

    return () => {
      appContent.style.overflow = 'auto';
    };
  }, [activeCalendarStaff, isGlobalAttendanceModalOpen, showRemoveAlert, isAddStaffModalOpen]);

  // Helper to get real present/absent counts
  const getAttendanceStats = (staffId: string) => {
    const todayDate = 15;
    const data = attendanceDB[staffId] || { absentDates: [], holidayDates: [] };
    const pastAbsent = data.absentDates.filter(d => d <= todayDate);
    const pastHoliday = (data.holidayDates || []).filter(d => d <= todayDate);
    const absentDaysCount = pastAbsent.length;
    const holidayDaysCount = pastHoliday.length;
    const presentDaysCount = todayDate - absentDaysCount - holidayDaysCount;
    return { presentDays: presentDaysCount, absentDays: absentDaysCount };
  };

  const handleEditStaff = () => {
    setIsEditingStaff(true);
    setEditedStaffData(selectedStaff);
  };

  const handleSaveStaff = () => {
    if (editedStaffData) {
      setStaffMembers(prev => prev.map(s => s.id === editedStaffData.id ? editedStaffData : s));
      setSelectedStaff(editedStaffData);
    }
    setIsEditingStaff(false);
  };

  const handleRemoveStaff = () => {
    if (selectedStaff) {
      setStaffMembers(prev => prev.filter(s => s.id !== selectedStaff.id));
      alert(`Notification sent to ${selectedStaff.name}. They have been removed from service.`);
      setShowRemoveAlert(false);
      setSelectedStaff(null);
    }
  };

  const handlePay = (staff: StaffMember) => {
    const stats = getAttendanceStats(staff.id);
    if (onNavigateToPaySalary) {
      onNavigateToPaySalary({
        name: staff.name,
        salaryMonthly: staff.salaryMonthly,
        absentDays: stats.absentDays
      });
    } else if (onPaySalary) {
      onPaySalary(staff.name, staff.salaryMonthly);
    }
  };

  return (
    <div className="staff-management-page-container" style={{ width: '100%', boxSizing: 'border-box', padding: selectedStaff ? 0 : '16px' }}>

      {!selectedStaff ? (
        <>
      {/* TOP HEADER BAR */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        boxSizing: 'border-box',
        paddingBottom: '12px',
        marginBottom: '16px',
        borderBottom: '1px solid #f1f5f9',
      }}>
        {/* Staff title — far left */}
        <h1 style={{
          fontSize: '22px',
          fontWeight: '800',
          margin: 0,
          padding: 0,
          color: '#0f172a',
          lineHeight: 1,
          flexShrink: 0,
          alignSelf: 'center',
        }}>
          Staff
        </h1>

        {/* Spacer fills all middle space */}
        <div style={{ flex: 1 }} />

        {/* Buttons — far right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <button
            onClick={() => setIsAddStaffModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              borderRadius: '20px',
              background: '#eff6ff',
              color: '#2563eb',
              border: '1px solid #bfdbfe',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 6px rgba(37, 99, 235, 0.12)',
            }}
          >
            <Plus size={16} /> Add Staff
          </button>

          <button className="sm-history-circle-btn" onClick={onOpenHistory} title="Payment History">
            <History size={18} />
          </button>
        </div>
      </div>



      {/* STAFF MEMBERS CARDS LIST (EXACT REFERENCE MATCH) */}
      <div className="sm-cards-list">
        {staffMembers.map(staff => {
          const stats = getAttendanceStats(staff.id);
          return (
            <div key={staff.id} className="sm-staff-card" onClick={() => setSelectedStaff(staff)} style={{ cursor: 'pointer' }}>

              {/* TOP LINE: AVATAR INITIALS + STAFF NAME + SALARY */}
              <div className="sm-card-top-row">
                <div className="sm-avatar-group">
                  <div className="sm-avatar-circle">
                    {staff.initials}
                  </div>
                  <h3 className="sm-staff-name">{staff.name}</h3>
                </div>
                <div className="sm-salary-blue">
                  ₹{staff.salaryMonthly.toLocaleString('en-IN')}/mo
                </div>
              </div>

              {/* DETAILS ROWS */}
              <div className="sm-details-rows">

                {/* CONTACT INFO */}
                <div className="sm-detail-line">
                  <Phone size={15} className="sm-icon-blue" />
                  <span className="sm-detail-label">Contact:</span>
                  <span className="sm-detail-val-blue font-bold" style={{ color: '#0f172a' }}>
                    {staff.contact}
                  </span>
                </div>

              </div>

              {/* BOTTOM ACTION BUTTONS */}
              <div className="sm-card-actions-row">
                <button
                  className="sm-btn-calendar"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onNavigateToAttendance) {
                      onNavigateToAttendance({
                        name: staff.name,
                        presentDays: stats.presentDays,
                        absentDays: stats.absentDays
                      });
                    } else {
                      setActiveCalendarStaff({ ...staff, presentDays: stats.presentDays, absentDays: stats.absentDays });
                    }
                  }}
                >
                  <Calendar size={16} /> Attendance
                </button>

                <button
                  className="sm-btn-pay"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePay(staff);
                  }}
                >
                  <Banknote size={16} /> Pay
                </button>
              </div>

            </div>
          );
        })}
      </div>

        </>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '100vh', background: '#f8fafc', margin: 0, padding: '0', boxSizing: 'border-box', width: '100%' }}>
           
           {/* Top Navigation */}
           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'white', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 10 }}>
             <button
                onClick={() => { setSelectedStaff(null); setIsEditingStaff(false); }}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '12px', padding: '8px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: '#334155', fontWeight: '600', transition: 'background 0.2s' }}
             >
                <ChevronLeft size={20} /> <span style={{ fontSize: '15px' }}>Back</span>
             </button>
             {!isEditingStaff && (
               <button
                  onClick={handleEditStaff}
                  style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '8px 16px', cursor: 'pointer', color: '#2563eb', fontWeight: '600', fontSize: '14px', transition: 'background 0.2s' }}
               >
                 Edit Profile
               </button>
             )}
           </div>

           <div style={{ padding: '20px' }}>
             {/* Hero Section */}
             <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', borderRadius: '24px', padding: '32px 24px', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
               {!isEditingStaff && (
                 <button 
                   onClick={() => setShowRemoveAlert(true)}
                   style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', zIndex: 10, backdropFilter: 'blur(4px)' }}
                 >
                   <Trash2 size={18} />
                 </button>
               )}
               <div style={{ width: '88px', height: '88px', borderRadius: '24px', background: 'white', color: '#6d28d9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: '800', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', marginBottom: '16px', zIndex: 1 }}>
                 {selectedStaff.initials}
               </div>
               {isEditingStaff ? (
                 <input
                   style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '12px', padding: '8px 16px', color: 'white', fontSize: '20px', fontWeight: '700', textAlign: 'center', width: '80%', marginBottom: '8px', outline: 'none' }}
                   value={editedStaffData?.name || ''}
                   onChange={e => setEditedStaffData(prev => prev ? { ...prev, name: e.target.value } : prev)}
                 />
               ) : (
                 <h2 style={{ margin: 0, fontSize: '26px', fontWeight: '800', letterSpacing: '-0.5px', marginBottom: '6px', zIndex: 1, textAlign: 'center' }}>{selectedStaff.name}</h2>
               )}
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', zIndex: 1, opacity: 0.9 }}>
                  <span style={{ fontSize: '13px', background: 'rgba(255,255,255,0.25)', padding: '5px 12px', borderRadius: '20px', fontWeight: '500' }}>ID: {selectedStaff.id}</span>
                  <span style={{ fontSize: '13px', background: 'rgba(255,255,255,0.25)', padding: '5px 12px', borderRadius: '20px', fontWeight: '500' }}>Joined {selectedStaff.joinedDate}</span>
               </div>
             </div>

             {/* Info Cards */}
             <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
               
               {/* Compensation Card */}
               <div style={{ background: 'white', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' }}>
                 <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#334155', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}><Banknote size={18} color="#10b981" /> Compensation</h3>
                 
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '500' }}>Monthly Salary</span>
                   {isEditingStaff ? (
                     <input type="number" style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px', width: '120px', textAlign: 'right', outline: 'none', fontWeight: '600' }} value={editedStaffData?.salaryMonthly || ''} onChange={e => setEditedStaffData(prev => prev ? { ...prev, salaryMonthly: Number(e.target.value) } : prev)} />
                   ) : (
                     <span style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>₹{selectedStaff.salaryMonthly.toLocaleString('en-IN')}</span>
                   )}
                 </div>
               </div>

               {/* Contact Details Card */}
               <div style={{ background: 'white', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' }}>
                 <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#334155', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={18} color="#3b82f6" /> Contact Information</h3>
                 
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '500' }}>Primary Phone</span>
                     {isEditingStaff ? (
                       <input style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px', width: '150px', textAlign: 'right', outline: 'none', fontWeight: '600' }} value={editedStaffData?.contact || ''} onChange={e => setEditedStaffData(prev => prev ? { ...prev, contact: e.target.value } : prev)} />
                     ) : (
                       <span style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>{selectedStaff.contact}</span>
                     )}
                   </div>
                   <div style={{ height: '1px', background: '#f1f5f9' }} />
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '500' }}>Alt. Phone</span>
                     {isEditingStaff ? (
                       <input style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px', width: '150px', textAlign: 'right', outline: 'none', fontWeight: '600' }} value={editedStaffData?.altContact || ''} onChange={e => setEditedStaffData(prev => prev ? { ...prev, altContact: e.target.value } : prev)} />
                     ) : (
                       <span style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>{selectedStaff.altContact || 'N/A'}</span>
                     )}
                   </div>
                 </div>
               </div>

               {/* Identity & Address */}
               <div style={{ background: 'white', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' }}>
                 <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#334155', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}><Contact2 size={18} color="#f59e0b" /> Identity & Address</h3>
                 
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '500' }}>Aadhaar No.</span>
                     {isEditingStaff ? (
                       <input style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px', width: '150px', textAlign: 'right', outline: 'none', fontWeight: '600' }} value={editedStaffData?.aadhaarNumber || ''} onChange={e => setEditedStaffData(prev => prev ? { ...prev, aadhaarNumber: e.target.value } : prev)} />
                     ) : (
                       <span style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>{selectedStaff.aadhaarNumber || 'N/A'}</span>
                     )}
                   </div>
                   <div style={{ height: '1px', background: '#f1f5f9' }} />
                   <div>
                     <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Address</span>
                     {isEditingStaff ? (
                       <textarea style={{ border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px', width: '100%', boxSizing: 'border-box', outline: 'none' }} rows={2} value={editedStaffData?.address || ''} onChange={e => setEditedStaffData(prev => prev ? { ...prev, address: e.target.value } : prev)} />
                     ) : (
                       <span style={{ fontSize: '15px', fontWeight: '500', color: '#0f172a', lineHeight: 1.5, display: 'block' }}>{selectedStaff.address || 'N/A'}</span>
                     )}
                   </div>
                 </div>
               </div>

             </div>

             {/* History & Attendance Buttons */}
             {!isEditingStaff && (
               <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                 <button 
                   onClick={() => onOpenHistory && onOpenHistory(selectedStaff)}
                   style={{ flex: 1, padding: '14px', borderRadius: '16px', fontWeight: '600', color: '#4f46e5', background: '#e0e7ff', border: '1px solid #c7d2fe', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 2px 4px rgba(79,70,229,0.1)' }}
                 >
                   <History size={22} /> <span style={{ fontSize: '13px' }}>Payment History</span>
                 </button>
                 <button 
                   onClick={() => onNavigateToAttendance && onNavigateToAttendance({ name: selectedStaff.name, presentDays: selectedStaff.presentDays, absentDays: selectedStaff.absentDays })}
                   style={{ flex: 1, padding: '14px', borderRadius: '16px', fontWeight: '600', color: '#ea580c', background: '#ffedd5', border: '1px solid #fed7aa', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 2px 4px rgba(234,88,12,0.1)' }}
                 >
                   <Calendar size={22} /> <span style={{ fontSize: '13px' }}>Attendance Log</span>
                 </button>
               </div>
             )}

             {/* Action Buttons (Inline rather than fixed to avoid overlap with bottom nav) */}
             <div style={{ marginTop: '24px', display: 'flex', gap: '12px', paddingBottom: '32px' }}>
                {isEditingStaff ? (
                  <>
                    <button style={{ flex: 1, padding: '16px', borderRadius: '16px', fontWeight: '700', color: '#64748b', background: 'white', border: '1px solid #cbd5e1', cursor: 'pointer', fontSize: '15px' }} onClick={() => setIsEditingStaff(false)}>Cancel</button>
                    <button style={{ flex: 1, padding: '16px', borderRadius: '16px', fontWeight: '700', color: 'white', background: '#4f46e5', border: 'none', cursor: 'pointer', fontSize: '15px', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)' }} onClick={handleSaveStaff}>Save Changes</button>
                  </>
                ) : (
                  <>
                    <button style={{ flex: 1, padding: '16px', borderRadius: '16px', fontWeight: '700', color: 'white', background: '#10b981', border: 'none', cursor: 'pointer', fontSize: '15px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }} onClick={() => handlePay(selectedStaff)}>Pay Salary</button>
                  </>
                )}
             </div>

           </div>
        </div>
      )}

      {/* ADD STAFF MODAL */}
      {isAddStaffModalOpen && (
        <div className="ref-modal-overlay" onClick={() => setIsAddStaffModalOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1100 }}>
          <div style={{ background: 'white', borderRadius: '24px', width: '100%', maxWidth: '420px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>

            {/* Modal Header */}
            <div style={{ background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', padding: '24px', position: 'relative', color: 'white', flexShrink: 0 }}>
              <button
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', backdropFilter: 'blur(4px)' }}
                onClick={() => setIsAddStaffModalOpen(false)}
              >
                <X size={18} />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'white', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
                  <Plus size={24} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>Add New Staff</h3>
                  <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.85)', marginTop: '2px' }}>Fill in staff details below</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleAddStaffSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>

              {/* Name Input */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', display: 'block' }}>Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                  value={newStaffName}
                  onChange={e => setNewStaffName(e.target.value)}
                />
              </div>

              {/* Date of Joining */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', display: 'block' }}>Date of Joining *</label>
                <input
                  type="date"
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                  value={newStaffJoinedDate}
                  onChange={e => setNewStaffJoinedDate(e.target.value)}
                />
              </div>

              {/* Salary */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', display: 'block' }}>Salary (₹) *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 18000"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                  value={newStaffSalary}
                  onChange={e => setNewStaffSalary(e.target.value)}
                />
              </div>

              {/* Contact */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', display: 'block' }}>Contact *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                  value={newStaffContact}
                  onChange={e => setNewStaffContact(e.target.value)}
                />
              </div>

              {/* Alternative Number */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', display: 'block' }}>Alternative Number</label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543211"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                  value={newStaffAltContact}
                  onChange={e => setNewStaffAltContact(e.target.value)}
                />
              </div>

              {/* Aadhaar No */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', display: 'block' }}>Adhaar No</label>
                <input
                  type="text"
                  placeholder="e.g. 1234 5678 9012"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                  value={newStaffAadhaar}
                  onChange={e => setNewStaffAadhaar(e.target.value)}
                />
              </div>

              {/* Address */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', display: 'block' }}>Address</label>
                <textarea
                  rows={2}
                  placeholder="e.g. House No, Street, City"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }}
                  value={newStaffAddress}
                  onChange={e => setNewStaffAddress(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px', paddingTop: '12px', borderTop: '1px solid #e2e8f0' }}>
                <button
                  type="button"
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', fontWeight: '600', color: '#64748b', background: '#f8fafc', border: '1px solid #e2e8f0', cursor: 'pointer' }}
                  onClick={() => setIsAddStaffModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', fontWeight: '600', color: 'white', background: '#2563eb', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)' }}
                >
                  Save Staff
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* REMOVE ALERT MODAL */}
      {showRemoveAlert && selectedStaff && (
        <div className="ref-modal-overlay" style={{ zIndex: 100 }} onClick={() => setShowRemoveAlert(false)}>
          <div className="ref-modal-card" style={{ border: '1px solid #fca5a5', boxShadow: '0 10px 25px -5px rgba(239, 68, 68, 0.2)' }} onClick={e => e.stopPropagation()}>
            <div className="ref-modal-header" style={{ borderBottom: 'none', paddingBottom: '0' }}>
              <h3 style={{ color: '#ef4444', fontWeight: 'bold' }}>Remove Staff Member</h3>
            </div>
            <div className="ref-modal-body" style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ background: '#fef2f2', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <AlertTriangle size={40} color="#ef4444" />
              </div>
              <p style={{ fontSize: '16px', color: 'var(--text-color)' }}>Are you sure you want to remove <strong>{selectedStaff.name}</strong>?</p>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.4' }}>This will immediately remove them from service and send them a notification.</p>
            </div>
            <div className="ref-modal-actions" style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button className="ref-btn-cancel" style={{ flex: 1, padding: '12px', borderRadius: '12px', fontWeight: '600' }} onClick={() => setShowRemoveAlert(false)}>Cancel</button>
              <button className="ref-btn-approve" style={{ flex: 1, background: '#ef4444', color: 'white', borderColor: '#ef4444', padding: '12px', borderRadius: '12px', fontWeight: '600', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)' }} onClick={handleRemoveStaff}>Remove</button>
            </div>
          </div>
        </div>
      )}

      {/* GLOBAL ATTENDANCE MODAL */}
      {isGlobalAttendanceModalOpen && (
        <div className="ref-modal-overlay" onClick={() => setIsGlobalAttendanceModalOpen(false)}>
          <div className="ref-modal-card" style={{ maxHeight: '90%', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
            <div className="ref-modal-header" style={{ flexShrink: 0 }}>
              <div>
                <h3 className="ref-modal-title">Mark Staff Attendance</h3>
                <p className="ref-modal-subtitle" style={{ color: 'var(--primary)', fontWeight: '500', marginTop: '4px' }}>
                  For today, Saturday, August 15, 2026
                </p>
              </div>
              <button className="ref-close-btn" onClick={() => setIsGlobalAttendanceModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="ref-modal-body" style={{ overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
              {staffMembers.map(staff => {
                const status = globalAttendanceState[staff.id];
                return (
                  <div key={staff.id} style={{ flexShrink: 0, marginBottom: '16px', background: 'var(--surface-color)', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                      <div>
                        <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>{staff.name}</h4>
                        <p style={{ fontSize: '13px', color: '#64748b' }}>{staff.contact}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                          style={{
                            width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: status === 'present' ? '#22c55e' : '#f8fafc',
                            color: status === 'present' ? 'white' : '#94a3b8',
                            border: '2px solid', borderColor: status === 'present' ? '#22c55e' : '#e2e8f0',
                            cursor: 'pointer', transition: 'all 0.2s',
                            boxShadow: status === 'present' ? '0 4px 12px rgba(34, 197, 94, 0.3)' : 'none'
                          }}
                          onClick={() => setGlobalAttendanceState(prev => ({ ...prev, [staff.id]: 'present' }))}
                        >
                          <Check size={22} />
                        </button>
                        <button
                          style={{
                            width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: status === 'absent' ? '#ef4444' : '#f8fafc',
                            color: status === 'absent' ? 'white' : '#94a3b8',
                            border: '2px solid', borderColor: status === 'absent' ? '#ef4444' : '#e2e8f0',
                            cursor: 'pointer', transition: 'all 0.2s',
                            boxShadow: status === 'absent' ? '0 4px 12px rgba(239, 68, 68, 0.3)' : 'none'
                          }}
                          onClick={() => setGlobalAttendanceState(prev => ({ ...prev, [staff.id]: 'absent' }))}
                        >
                          <X size={22} />
                        </button>
                      </div>
                    </div>


                  </div>
                );
              })}
            </div>

            <div className="ref-modal-actions" style={{ flexShrink: 0, marginTop: '16px', display: 'flex', gap: '12px' }}>
              <button className="ref-btn-cancel" style={{ flex: 1, padding: '12px', borderRadius: '12px', fontWeight: '600' }} onClick={() => setIsGlobalAttendanceModalOpen(false)}>
                Cancel
              </button>
              <button
                className="ref-btn-approve"
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  background: Object.keys(globalAttendanceState).length > 0 ? 'var(--primary)' : '#e2e8f0',
                  color: Object.keys(globalAttendanceState).length > 0 ? 'white' : '#64748b',
                  borderColor: Object.keys(globalAttendanceState).length > 0 ? 'var(--primary)' : '#e2e8f0',
                  boxShadow: Object.keys(globalAttendanceState).length > 0 ? '0 4px 12px rgba(37, 99, 235, 0.3)' : 'none'
                }}
                disabled={Object.keys(globalAttendanceState).length === 0}
                onClick={() => {
                  const todayDate = 15;
                  const db = JSON.parse(JSON.stringify(attendanceDB));

                  Object.keys(globalAttendanceState).forEach(staffId => {
                    const status = globalAttendanceState[staffId];
                    if (!db[staffId]) db[staffId] = { absentDates: [], holidayDates: [] };

                    const absentSet = new Set(db[staffId].absentDates);
                    const holidaySet = new Set(db[staffId].holidayDates || []);

                    if (status === 'absent') {
                      absentSet.add(todayDate);
                      holidaySet.delete(todayDate);
                    } else if (status === 'present') {
                      absentSet.delete(todayDate);
                      holidaySet.delete(todayDate);
                    }

                    db[staffId].absentDates = Array.from(absentSet);
                    db[staffId].holidayDates = Array.from(holidaySet);
                  });

                  setAttendanceDB(db);

                  setIsGlobalAttendanceModalOpen(false);
                  setGlobalAttendanceState({});
                  setNotificationPrefs({});

                  setToastMessage('Attendance saved successfully.');
                  setTimeout(() => setToastMessage(null), 3000);
                }}
              >
                Save Attendance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="orp-toast" style={{ zIndex: 100000, whiteSpace: 'nowrap' }}>
          <Check size={16} color="#4ade80" style={{ flexShrink: 0 }} />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
