import React, { useState } from 'react';
import { ChevronLeft, History, Calendar, Banknote, Phone, CalendarDays, Contact2, X } from 'lucide-react';

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

export const StaffManagementPage: React.FC<StaffManagementPageProps> = ({
  onBack,
  onOpenHistory,
  onPaySalary,
  onNavigateToPaySalary,
  onNavigateToAttendance
}) => {
  const [activeCalendarStaff, setActiveCalendarStaff] = useState<StaffMember | null>(null);

  const staffMembers: StaffMember[] = [
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

  const handlePay = (staff: StaffMember) => {
    if (onNavigateToPaySalary) {
      onNavigateToPaySalary({
        name: staff.name,
        salaryMonthly: staff.salaryMonthly,
        absentDays: staff.absentDays
      });
    } else if (onPaySalary) {
      onPaySalary(staff.name, staff.salaryMonthly);
    }
  };

  return (
    <div className="staff-management-page-container">
      
      {/* TOP HEADER BAR (EXACT MATCH TO REFERENCE PHOTO) */}
      <div className="sm-header-bar">
        <button className="sm-back-btn" onClick={onBack}>
          <ChevronLeft size={20} className="text-blue-600" />
          <span className="sm-back-text">Back</span>
        </button>
        <h1 className="sm-header-title">Staff</h1>
        <button className="sm-history-circle-btn" onClick={onOpenHistory} title="Payment History">
          <History size={18} />
        </button>
      </div>

      {/* STAFF MEMBERS CARDS LIST (EXACT REFERENCE MATCH) */}
      <div className="sm-cards-list">
        {staffMembers.map(staff => (
          <div key={staff.id} className="sm-staff-card">
            
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
              
              {/* CONTACT NUMBER */}
              <div className="sm-detail-line">
                <Phone size={15} className="sm-icon-pink" />
                <span className="sm-detail-label">Contact:</span>
                <span className="sm-detail-val-bold">{staff.contact}</span>
              </div>

              {/* JOINED DATE */}
              <div className="sm-detail-line">
                <CalendarDays size={15} className="sm-icon-purple" />
                <span className="sm-detail-label">Joined:</span>
                <span className="sm-detail-val-bold">{staff.joinedDate}</span>
              </div>

              {/* ATTENDANCE SUMMARY */}
              <div className="sm-detail-line">
                <Calendar size={15} className="sm-icon-blue" />
                <span className="sm-detail-label">Attendance (July):</span>
                <span className="sm-detail-val-blue font-bold">
                  {staff.presentDays} Present / {staff.absentDays} Absent
                </span>
              </div>

              {/* AADHAAR STATUS */}
              <div className="sm-detail-line">
                <Contact2 size={15} className="sm-icon-cyan" />
                <span className="sm-detail-label">Aadhaar:</span>
                <span className={`sm-detail-val-status ${staff.aadhaarStatus === 'Verified' ? 'verified' : 'unverified'}`}>
                  {staff.aadhaarStatus}
                </span>
              </div>

            </div>

            {/* BOTTOM ACTION BUTTONS: CALENDAR & PAY */}
            <div className="sm-card-actions-row">
              <button
                className="sm-btn-calendar"
                onClick={() => {
                  if (onNavigateToAttendance) {
                    onNavigateToAttendance({
                      name: staff.name,
                      presentDays: staff.presentDays,
                      absentDays: staff.absentDays
                    });
                  } else {
                    setActiveCalendarStaff(staff);
                  }
                }}
              >
                <Calendar size={16} /> Calendar
              </button>
              
              <button
                className="sm-btn-pay"
                onClick={() => handlePay(staff)}
              >
                <Banknote size={16} /> Pay
              </button>
            </div>

          </div>
        ))}
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

    </div>
  );
};
