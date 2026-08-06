import React, { useState } from 'react';
import { ChevronLeft, History, Calendar, Banknote, Phone, CalendarDays, Contact2, X, Check, MessageSquare, MessageCircle, AlertTriangle, User, Upload } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  initials: string;
  salaryMonthly: number;
  contact: string;
  joinedDate: string;
  presentDays: number;
  absentDays: number;
  aadhaarStatus: 'Not Uploaded' | 'Verified' | 'Pending Verification';
}

interface StaffManagementPageProps {
  onBack: () => void;
  onOpenHistory?: () => void;
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
    joinedDate: '2025-03-10',
    presentDays: 25,
    absentDays: 1,
    aadhaarStatus: 'Not Uploaded'
  },
  {
    id: 'st-2',
    name: 'Sita Devi',
    initials: 'SD',
    salaryMonthly: 14000,
    contact: '9765432109',
    joinedDate: '2025-05-15',
    presentDays: 24,
    absentDays: 2,
    aadhaarStatus: 'Not Uploaded'
  },
  {
    id: 'st-3',
    name: 'Bahadur Singh',
    initials: 'BS',
    salaryMonthly: 12000,
    contact: '9654321098',
    joinedDate: '2024-11-01',
    presentDays: 26,
    absentDays: 0,
    aadhaarStatus: 'Verified'
  },
  {
    id: 'st-4',
    name: 'Suresh Cook',
    initials: 'SC',
    salaryMonthly: 15000,
    contact: '9543210987',
    joinedDate: '2025-01-20',
    presentDays: 25,
    absentDays: 1,
    aadhaarStatus: 'Verified'
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

    if (activeCalendarStaff || isGlobalAttendanceModalOpen || selectedStaff || showRemoveAlert) {
      appContent.style.overflow = 'hidden';
    } else {
      appContent.style.overflow = 'auto';
    }

    return () => {
      appContent.style.overflow = 'auto';
    };
  }, [activeCalendarStaff, isGlobalAttendanceModalOpen, selectedStaff, showRemoveAlert]);

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
    <div className="staff-management-page-container">

      {/* TOP HEADER BAR (EXACT MATCH TO REFERENCE PHOTO) */}
      <div className="sm-header-bar">

        <h1 className="sm-header-title">Staff</h1>
        <button className="sm-history-circle-btn" onClick={onOpenHistory} title="Payment History">
          <History size={18} />
        </button>
      </div>

      <div style={{ padding: '0 16px', marginBottom: '16px' }}>
        <button
          className="quick-action-pill"
          style={{ width: '100%', padding: '12px', background: 'var(--primary-gradient)', color: 'white', border: 'none', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}
          onClick={() => setIsGlobalAttendanceModalOpen(true)}
        >
          <Check size={18} /> Mark Today's Attendance
        </button>
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

                {/* ATTENDANCE SUMMARY */}
                <div className="sm-detail-line">
                  <Calendar size={15} className="sm-icon-blue" />
                  <span className="sm-detail-label">Attendance (July):</span>
                  <span className="sm-detail-val-blue font-bold">
                    {stats.presentDays} Present / {stats.absentDays} Absent
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
                  <Calendar size={16} /> Calendar
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

      {/* ATTENDANCE CALENDAR MODAL */}
      {activeCalendarStaff && (
        <div className="ref-modal-overlay" onClick={() => setActiveCalendarStaff(null)}>
          <div className="ref-modal-card" onClick={e => e.stopPropagation()}>
            <div className="ref-modal-header">
              <div>
                <h3 className="ref-modal-title">{activeCalendarStaff.name} - July 2026</h3>
                <p className="ref-modal-subtitle">Attendance Log ({activeCalendarStaff.presentDays} Present / {activeCalendarStaff.absentDays} Absent)</p>
              </div>
              <button className="ref-close-btn" onClick={() => setActiveCalendarStaff(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="ref-modal-body">
              <div className="sm-calendar-grid">
                {Array.from({ length: 26 }).map((_, idx) => (
                  <div key={idx} className="sm-cal-day present">
                    <span className="sm-cal-num">{idx + 1}</span>
                    <span className="sm-cal-tag">P</span>
                  </div>
                ))}
                {Array.from({ length: activeCalendarStaff.absentDays }).map((_, idx) => (
                  <div key={`abs-${idx}`} className="sm-cal-day absent">
                    <span className="sm-cal-num">{27 + idx}</span>
                    <span className="sm-cal-tag">A</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ref-modal-actions">
              <button className="ref-btn-cancel" onClick={() => setActiveCalendarStaff(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STAFF DETAIL MODAL */}
      {selectedStaff && !showRemoveAlert && (
        <div className="ref-modal-overlay" onClick={() => { setSelectedStaff(null); setIsEditingStaff(false); }}>
          <div className="ref-modal-card" style={{ maxHeight: '100%' }} onClick={e => e.stopPropagation()}>
            <div className="ref-modal-header">
              <div>
                <h3 className="ref-modal-title">{isEditingStaff ? 'Edit Staff Details' : 'Staff Details'}</h3>
                <p className="ref-modal-subtitle">{selectedStaff.id}</p>
              </div>
              <button className="ref-close-btn" onClick={() => { setSelectedStaff(null); setIsEditingStaff(false); }}>
                <X size={18} />
              </button>
            </div>

            <div className="ref-modal-body" style={{ overflowY: 'auto', flex: 1, paddingRight: '4px', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <User size={14} color="#3b82f6" />
                    <label style={{ fontSize: '12px', color: '#2563eb', fontWeight: '500' }}>Name</label>
                  </div>
                  {isEditingStaff ? (
                    <input
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #bfdbfe', marginTop: '4px', fontSize: '15px' }}
                      value={editedStaffData?.name || ''}
                      onChange={e => setEditedStaffData(prev => prev ? { ...prev, name: e.target.value } : prev)}
                    />
                  ) : (
                    <p style={{ fontWeight: '600', fontSize: '16px', color: '#1d4ed8' }}>{selectedStaff.name}</p>
                  )}
                </div>

                <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <Phone size={14} color="#3b82f6" />
                    <label style={{ fontSize: '12px', color: '#2563eb', fontWeight: '500' }}>Contact</label>
                  </div>
                  {isEditingStaff ? (
                    <input
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #bfdbfe', marginTop: '4px', fontSize: '15px' }}
                      value={editedStaffData?.contact || ''}
                      onChange={e => setEditedStaffData(prev => prev ? { ...prev, contact: e.target.value } : prev)}
                    />
                  ) : (
                    <p style={{ fontSize: '16px', color: '#1d4ed8', fontWeight: '600' }}>{selectedStaff.contact}</p>
                  )}
                </div>

                <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <Banknote size={14} color="#3b82f6" />
                    <label style={{ fontSize: '12px', color: '#2563eb', fontWeight: '500' }}>Salary (Monthly)</label>
                  </div>
                  {isEditingStaff ? (
                    <input
                      type="number"
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #bfdbfe', marginTop: '4px', fontSize: '15px' }}
                      value={editedStaffData?.salaryMonthly || ''}
                      onChange={e => setEditedStaffData(prev => prev ? { ...prev, salaryMonthly: Number(e.target.value) } : prev)}
                    />
                  ) : (
                    <p style={{ fontSize: '16px', color: '#1d4ed8', fontWeight: '600' }}>₹{selectedStaff.salaryMonthly.toLocaleString('en-IN')}</p>
                  )}
                </div>

                <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <CalendarDays size={14} color="#3b82f6" />
                    <label style={{ fontSize: '12px', color: '#2563eb', fontWeight: '500' }}>Joined Date</label>
                  </div>
                  {isEditingStaff ? (
                    <input
                      type="date"
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #bfdbfe', marginTop: '4px', fontSize: '15px' }}
                      value={editedStaffData?.joinedDate || ''}
                      onChange={e => setEditedStaffData(prev => prev ? { ...prev, joinedDate: e.target.value } : prev)}
                    />
                  ) : (
                    <p style={{ fontSize: '16px', color: '#1d4ed8', fontWeight: '600' }}>{selectedStaff.joinedDate}</p>
                  )}
                </div>

                <div 
                  style={{ background: '#eff6ff', padding: '12px', borderRadius: '12px', border: '1px solid #bfdbfe', cursor: 'pointer', transition: 'all 0.2s' }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Contact2 size={14} color="#3b82f6" />
                      <label style={{ fontSize: '12px', color: '#2563eb', fontWeight: '500', cursor: 'pointer' }}>Aadhaar Status</label>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#2563eb', fontWeight: '600' }}>
                      <Upload size={14} /> Upload
                    </div>
                  </div>
                  {isEditingStaff ? (
                    <select
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #bfdbfe', marginTop: '4px', fontSize: '15px', background: 'white' }}
                      value={editedStaffData?.aadhaarStatus || 'Not Uploaded'}
                      onClick={(e) => e.stopPropagation()}
                      onChange={e => setEditedStaffData(prev => prev ? { ...prev, aadhaarStatus: e.target.value as any } : prev)}
                    >
                      <option value="Not Uploaded">Not Uploaded</option>
                      <option value="Pending Verification">Pending Verification</option>
                      <option value="Verified">Verified</option>
                    </select>
                  ) : (
                    <p style={{ fontSize: '16px', color: '#1d4ed8', fontWeight: '600' }}>{selectedStaff.aadhaarStatus}</p>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        if (isEditingStaff) {
                          setEditedStaffData(prev => prev ? { ...prev, aadhaarStatus: 'Pending Verification' } : prev);
                        } else {
                          setStaffMembers(prev => prev.map(s => s.id === selectedStaff.id ? { ...s, aadhaarStatus: 'Pending Verification' } : s));
                          setSelectedStaff(prev => prev ? { ...prev, aadhaarStatus: 'Pending Verification' } : prev);
                        }
                        setToastMessage('Aadhaar document uploaded successfully.');
                        setTimeout(() => setToastMessage(null), 3000);
                      }
                    }}
                  />
                </div>

                <div
                  style={{ background: '#eff6ff', padding: '12px', borderRadius: '12px', border: '1px solid #bfdbfe', cursor: 'pointer', transition: 'all 0.2s' }}
                  onClick={() => {
                    const stats = getAttendanceStats(selectedStaff.id);
                    if (onNavigateToAttendance) {
                      onNavigateToAttendance({
                        name: selectedStaff.name,
                        presentDays: stats.presentDays,
                        absentDays: stats.absentDays
                      });
                    } else {
                      setActiveCalendarStaff({ ...selectedStaff, presentDays: stats.presentDays, absentDays: stats.absentDays });
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <Calendar size={14} color="#3b82f6" />
                    <label style={{ fontSize: '12px', color: '#2563eb', fontWeight: '500', cursor: 'pointer' }}>Attendance (July)</label>
                  </div>
                  <p style={{ fontSize: '16px', color: '#1d4ed8', fontWeight: '600' }}>
                    {getAttendanceStats(selectedStaff.id).presentDays} Present / {getAttendanceStats(selectedStaff.id).absentDays} Absent
                  </p>
                </div>
              </div>
            </div>

            <div className="ref-modal-actions" style={{ display: 'flex', gap: '12px' }}>
              {isEditingStaff ? (
                <>
                  <button className="ref-btn-cancel" style={{ flex: 1, padding: '12px', borderRadius: '12px' }} onClick={() => setIsEditingStaff(false)}>Cancel</button>
                  <button className="ref-btn-approve" style={{ flex: 1, padding: '12px', borderRadius: '12px' }} onClick={handleSaveStaff}>Save</button>
                </>
              ) : (
                <>
                  <button className="ref-btn-cancel" style={{ flex: 1, color: '#64748b', borderColor: '#cbd5e1', background: '#f8fafc', fontWeight: '600', padding: '12px', borderRadius: '12px' }} onClick={() => setShowRemoveAlert(true)}>Remove</button>
                  <button className="ref-btn-approve" style={{ flex: 1, fontWeight: '600', padding: '12px', borderRadius: '12px' }} onClick={handleEditStaff}>Edit</button>
                </>
              )}
            </div>
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

                    {status === 'absent' && (
                      <div style={{ padding: '16px', background: '#fef2f2', borderTop: '1px solid #fee2e2' }}>
                        <p style={{ fontSize: '13px', color: '#991b1b', marginBottom: '12px', fontWeight: '500' }}>Notify {staff.name.split(' ')[0]} about absence:</p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <button
                            onClick={() => setNotificationPrefs(prev => ({ ...prev, [staff.id]: { ...prev[staff.id], whatsapp: !(prev[staff.id]?.whatsapp ?? false) } }))}
                            style={{
                              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px',
                              background: notificationPrefs[staff.id]?.whatsapp ? '#25d366' : 'transparent',
                              color: notificationPrefs[staff.id]?.whatsapp ? 'white' : '#16a34a',
                              border: notificationPrefs[staff.id]?.whatsapp ? '1px solid #25d366' : '1px solid #16a34a',
                              borderRadius: '10px', cursor: 'pointer', fontWeight: '600',
                              boxShadow: notificationPrefs[staff.id]?.whatsapp ? '0 4px 10px rgba(37, 211, 102, 0.3)' : 'none',
                              transition: 'all 0.2s'
                            }}>
                            <MessageCircle size={18} /> WhatsApp
                          </button>
                          <button
                            onClick={() => setNotificationPrefs(prev => ({ ...prev, [staff.id]: { ...prev[staff.id], sms: !(prev[staff.id]?.sms ?? false) } }))}
                            style={{
                              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px',
                              background: notificationPrefs[staff.id]?.sms ? '#3b82f6' : 'transparent',
                              color: notificationPrefs[staff.id]?.sms ? 'white' : '#2563eb',
                              border: notificationPrefs[staff.id]?.sms ? '1px solid #3b82f6' : '1px solid #2563eb',
                              borderRadius: '10px', cursor: 'pointer', fontWeight: '600',
                              boxShadow: notificationPrefs[staff.id]?.sms ? '0 4px 10px rgba(59, 130, 246, 0.3)' : 'none',
                              transition: 'all 0.2s'
                            }}>
                            <MessageSquare size={18} /> SMS
                          </button>
                        </div>
                      </div>
                    )}
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

                  let notificationsSent = 0;

                  Object.keys(globalAttendanceState).forEach(staffId => {
                    const status = globalAttendanceState[staffId];
                    if (!db[staffId]) db[staffId] = { absentDates: [], holidayDates: [] };

                    const absentSet = new Set(db[staffId].absentDates);
                    const holidaySet = new Set(db[staffId].holidayDates || []);

                    if (status === 'absent') {
                      absentSet.add(todayDate);
                      holidaySet.delete(todayDate);
                      if (notificationPrefs[staffId]?.whatsapp || notificationPrefs[staffId]?.sms) {
                        notificationsSent++;
                      }
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

                  if (notificationsSent > 0) {
                    setToastMessage(`Attendance saved. Sent notification to ${notificationsSent} absent staff.`);
                  } else {
                    setToastMessage('Attendance saved successfully.');
                  }
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
