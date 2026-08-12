import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, User, Check, X, Info, AlertTriangle, Sparkles, RefreshCw, Phone } from 'lucide-react';

interface StaffAttendanceOption {
  id: string;
  name: string;
  role: string;
  label: string;
  initials: string;
  salaryMonthly: number;
  contact: string;
  presentDays: number;
  absentDays: number;
  attendancePercentage: number;
  absentDates: number[];
  holidayDates?: number[];
  pastMonthsAbsences?: { monthName: string; year: string; dates: number[] }[];
}

interface StaffAttendancePageProps {
  initialStaff?: {
    name: string;
    role?: string;
    presentDays?: number;
    absentDays?: number;
  } | null;
  onBack: () => void;
}

export const StaffAttendancePage: React.FC<StaffAttendancePageProps> = ({
  initialStaff,
  onBack
}) => {
  const staffList: StaffAttendanceOption[] = [
    {
      id: 'st-1',
      name: 'Ramesh Kumar',
      role: 'Warden',
      label: 'Ramesh Kumar (Warden)',
      initials: 'RK',
      salaryMonthly: 18000,
      contact: '9876543210',
      presentDays: 25,
      absentDays: 1,
      attendancePercentage: 96,
      absentDates: [8],
      holidayDates: [],
      pastMonthsAbsences: [
        { monthName: 'July', year: '2026', dates: [12, 4] },
        { monthName: 'June', year: '2026', dates: [22] }
      ]
    },
    {
      id: 'st-2',
      name: 'Sita Devi',
      role: 'Cook/Cleaner',
      label: 'Sita Devi (Cook/Cleaner)',
      initials: 'SD',
      salaryMonthly: 14000,
      contact: '9765432109',
      presentDays: 24,
      absentDays: 2,
      attendancePercentage: 92,
      absentDates: [8, 14],
      holidayDates: [],
      pastMonthsAbsences: [
        { monthName: 'July', year: '2026', dates: [25] },
        { monthName: 'June', year: '2026', dates: [11, 2] }
      ]
    },
    {
      id: 'st-3',
      name: 'Bahadur Singh',
      role: 'Security',
      label: 'Bahadur Singh (Security)',
      initials: 'BS',
      salaryMonthly: 12000,
      contact: '9654321098',
      presentDays: 26,
      absentDays: 0,
      attendancePercentage: 100,
      absentDates: [],
      holidayDates: [],
      pastMonthsAbsences: [
        { monthName: 'July', year: '2026', dates: [] },
        { monthName: 'June', year: '2026', dates: [] }
      ]
    },
    {
      id: 'st-4',
      name: 'Suresh Cook',
      role: 'Head Chef',
      label: 'Suresh Cook (Head Chef)',
      initials: 'SC',
      salaryMonthly: 15000,
      contact: '9543210987',
      presentDays: 25,
      absentDays: 1,
      attendancePercentage: 96,
      absentDates: [18],
      holidayDates: [],
      pastMonthsAbsences: [
        { monthName: 'July', year: '2026', dates: [5] }
      ]
    }
  ];

  // Load attendance database from localStorage
  const [staffAttendance, setStaffAttendance] = useState<{ [staffId: string]: { absentDates: number[]; holidayDates: number[] } }>(() => {
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

  const matchedInitial = initialStaff
    ? staffList.find(s => s.name.toLowerCase().includes(initialStaff.name.toLowerCase()))
    : undefined;

  const [selectedStaffId, setSelectedStaffId] = useState<string>(matchedInitial ? matchedInitial.id : 'st-1');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [markMode, setMarkMode] = useState<'toggle' | 'absent' | 'present' | 'holiday'>('toggle');

  // Sync selectedStaffId whenever initialStaff changes
  React.useEffect(() => {
    if (initialStaff) {
      const match = staffList.find(s => s.name.toLowerCase().includes(initialStaff.name.toLowerCase()));
      if (match) {
        setSelectedStaffId(match.id);
      }
    }
  }, [initialStaff]);

  // Sync staffAttendance to localStorage in a side-effect
  React.useEffect(() => {
    localStorage.setItem('staffAttendanceDB', JSON.stringify(staffAttendance));
    window.dispatchEvent(new Event('storage'));
  }, [staffAttendance]);

  const activeStaff = staffList.find(s => s.id === selectedStaffId) || staffList[0];

  // Today is August 15, 2026
  const todayDate = 15;

  const currentAttendance = staffAttendance[selectedStaffId] || {
    absentDates: activeStaff.absentDates,
    holidayDates: activeStaff.holidayDates || []
  };

  // Only count dates <= todayDate
  const pastAbsent = (currentAttendance.absentDates || []).filter(d => d <= todayDate);
  const pastHoliday = (currentAttendance.holidayDates || []).filter(d => d <= todayDate);

  const absentDaysCount = pastAbsent.length;
  const holidayDaysCount = pastHoliday.length;
  const presentDaysCount = Math.max(0, todayDate - absentDaysCount - holidayDaysCount);
  const totalWorkingDays = todayDate - holidayDaysCount;

  const attendancePct = totalWorkingDays > 0 ? Math.round((presentDaysCount / totalWorkingDays) * 100) : 0;

  const handleToggleDayStatus = (dayNum: number) => {
    if (dayNum > todayDate) {
      setToastMessage(`Cannot mark attendance for future date (August ${dayNum})`);
      setTimeout(() => setToastMessage(null), 2500);
      return;
    }

    const currentData = staffAttendance[selectedStaffId] || {
      absentDates: [...activeStaff.absentDates],
      holidayDates: [...(activeStaff.holidayDates || [])]
    };

    const isAbsent = currentData.absentDates.includes(dayNum);
    const isHoliday = (currentData.holidayDates || []).includes(dayNum);

    let newAbsent = [...currentData.absentDates];
    let newHoliday = [...(currentData.holidayDates || [])];
    let msg = '';

    if (markMode === 'absent') {
      if (!isAbsent) {
        newAbsent.push(dayNum);
        newHoliday = newHoliday.filter(d => d !== dayNum);
        msg = `Aug ${dayNum}: Marked ABSENT for ${activeStaff.name}`;
      }
    } else if (markMode === 'present') {
      newAbsent = newAbsent.filter(d => d !== dayNum);
      newHoliday = newHoliday.filter(d => d !== dayNum);
      msg = `Aug ${dayNum}: Marked PRESENT for ${activeStaff.name}`;
    } else if (markMode === 'holiday') {
      if (!isHoliday) {
        newHoliday.push(dayNum);
        newAbsent = newAbsent.filter(d => d !== dayNum);
        msg = `Aug ${dayNum}: Marked HOLIDAY for ${activeStaff.name}`;
      }
    } else {
      // Default Toggle cycle: Present -> Absent -> Holiday -> Present
      if (!isAbsent && !isHoliday) {
        // Was Present -> Make Absent
        newAbsent.push(dayNum);
        msg = `Aug ${dayNum}: Marked ABSENT for ${activeStaff.name}`;
      } else if (isAbsent) {
        // Was Absent -> Make Holiday
        newAbsent = newAbsent.filter(d => d !== dayNum);
        newHoliday.push(dayNum);
        msg = `Aug ${dayNum}: Marked HOLIDAY for ${activeStaff.name}`;
      } else {
        // Was Holiday -> Make Present
        newHoliday = newHoliday.filter(d => d !== dayNum);
        msg = `Aug ${dayNum}: Marked PRESENT for ${activeStaff.name}`;
      }
    }

    if (msg) {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(null), 3000);
    }

    setStaffAttendance(prev => ({
      ...prev,
      [selectedStaffId]: {
        absentDates: newAbsent,
        holidayDates: newHoliday
      }
    }));
  };

  const handleResetToPresent = () => {
    setStaffAttendance(prev => ({
      ...prev,
      [selectedStaffId]: { absentDates: [], holidayDates: [] }
    }));
    setToastMessage(`All dates reset to PRESENT for ${activeStaff.name}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // August 2026 starts on Saturday (6 empty cells)
  const emptyOffsetCells = Array.from({ length: 6 }, (_, i) => i);
  const totalMonthDays = Array.from({ length: 31 }, (_, i) => i + 1);

  const getDayStatusType = (dayNum: number): 'absent' | 'present' | 'holiday' | 'future' => {
    if (dayNum > todayDate) return 'future';
    if (currentAttendance.absentDates.includes(dayNum)) return 'absent';
    if ((currentAttendance.holidayDates || []).includes(dayNum)) return 'holiday';
    return 'present';
  };

  return (
    <div className="staff-attendance-page-container">

      {/* TOP HEADER BAR WITH BACK BUTTON */}
      <div className="sa-header-bar">
        <button className="sa-back-btn" onClick={onBack} title="Back to Staff Management">
          <ChevronLeft size={22} className="sa-back-icon" color="#2563eb" />
          <span className="sa-back-text">Back</span>
        </button>
        <h1 className="sa-header-title">Staff Attendance</h1>
      </div>

      <div className="sa-body-container">

        {/* PARTICULAR STAFF MEMBER CARD ONLY (NO OTHER NAMES ON SIDE) */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '16px 18px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Top Row: Avatar + Name + Role & Salary + Absent Badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: '800',
                border: '2px solid #bfdbfe',
                flexShrink: 0
              }}>
                {activeStaff.initials}
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>
                  {activeStaff.name}
                </h2>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', marginTop: '3px' }}>
                  {activeStaff.role} • <span style={{ color: '#2563eb', fontWeight: '700' }}>₹{activeStaff.salaryMonthly.toLocaleString('en-IN')}/mo</span>
                </div>
              </div>
            </div>

            {absentDaysCount > 0 ? (
              <span style={{
                fontSize: '12px',
                fontWeight: '800',
                background: '#fee2e2',
                color: '#dc2626',
                padding: '5px 12px',
                borderRadius: '14px',
                border: '1px solid #fca5a5',
                boxShadow: '0 2px 6px rgba(239, 68, 68, 0.1)',
                flexShrink: 0
              }}>
                {absentDaysCount} Absent
              </span>
            ) : (
              <span style={{
                fontSize: '12px',
                fontWeight: '800',
                background: '#dcfce7',
                color: '#15803d',
                padding: '5px 12px',
                borderRadius: '14px',
                border: '1px solid #86efac',
                boxShadow: '0 2px 6px rgba(34, 197, 94, 0.1)',
                flexShrink: 0
              }}>
                All Present
              </span>
            )}
          </div>

          {/* Bottom Details Line: Contact Info */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #f1f5f9', fontSize: '13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', fontWeight: '600' }}>
              <Phone size={14} color="#2563eb" />
              <span>Contact: <strong style={{ color: '#0f172a' }}>{activeStaff.contact}</strong></span>
            </div>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
              ID: {activeStaff.id}
            </span>
          </div>
        </div>

        {/* ATTENDANCE SUMMARY STATS CARD */}
        <div className="sa-summary-card">
          <div className="sa-stat-col">
            <span className="sa-stat-num green">{presentDaysCount}</span>
            <span className="sa-stat-label">Present</span>
          </div>

          <div className="sa-stat-col">
            <span className="sa-stat-num red">{absentDaysCount}</span>
            <span className="sa-stat-label">Absent</span>
          </div>

          <div className="sa-stat-col">
            <span className="sa-stat-num" style={{ color: '#9333ea' }}>{holidayDaysCount}</span>
            <span className="sa-stat-label">Holidays</span>
          </div>

          <div className="sa-stat-col">
            <span className="sa-stat-num blue">{attendancePct}%</span>
            <span className="sa-stat-label">Rate</span>
          </div>
        </div>

        {/* MONTH HEADER & ACTIONS */}
        <div className="sa-calendar-card">

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={20} color="#2563eb" />
                AUGUST 2026
              </h2>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>
                Showing attendance up to today (Aug 15)
              </span>
            </div>

            <button
              onClick={handleResetToPresent}
              title="Reset all to Present"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '12px',
                background: '#f1f5f9',
                border: '1px solid #e2e8f0',
                color: '#475569',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={14} /> Reset
            </button>
          </div>

          {/* INSTRUCTION HINT BANNER */}
          <div style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
            border: '1px solid #bfdbfe',
            borderRadius: '14px',
            padding: '10px 14px',
            fontSize: '12.5px',
            color: '#1e3a8a',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 6px rgba(37, 99, 235, 0.05)'
          }}>
            <Sparkles size={16} color="#2563eb" style={{ flexShrink: 0 }} />
            <span>
              <strong>Default is Present until today (Aug 15).</strong> Tap any date to toggle: <span style={{ color: '#166534', fontWeight: '800' }}>Present</span> → <span style={{ color: '#dc2626', fontWeight: '800' }}>Absent</span> → <span style={{ color: '#7e22ce', fontWeight: '800' }}>Holiday</span>.
            </span>
          </div>

          {/* WEEKDAYS ROW */}
          <div className="sa-weekdays-row">
            <div>SUN</div>
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
          </div>

          {/* DAYS GRID */}
          <div className="sa-days-grid">
            {/* Offset empty cells */}
            {emptyOffsetCells.map((_, idx) => (
              <div key={`empty-${idx}`} className="sa-day-cell empty" />
            ))}

            {/* August days 1 to 31 */}
            {totalMonthDays.map(dayNum => {
              const status = getDayStatusType(dayNum);
              const isToday = dayNum === todayDate;

              return (
                <div
                  key={`day-${dayNum}`}
                  className={`sa-day-cell ${status} ${isToday ? 'today' : ''}`}
                  onClick={() => handleToggleDayStatus(dayNum)}
                  title={
                    status === 'future'
                      ? `August ${dayNum} is in the future`
                      : `August ${dayNum}: ${status.toUpperCase()} (Click to toggle)`
                  }
                >
                  <span style={{ fontSize: '13px', fontWeight: '800', lineHeight: 1 }}>{dayNum}</span>

                  {status === 'absent' && (
                    <span style={{ fontSize: '9px', fontWeight: '900', color: '#b91c1c', marginTop: '2px' }}>ABS</span>
                  )}
                  {status === 'present' && (
                    <span style={{ fontSize: '9px', fontWeight: '800', color: '#15803d', marginTop: '2px' }}>P</span>
                  )}
                  {status === 'holiday' && (
                    <span style={{ fontSize: '9px', fontWeight: '900', color: '#7e22ce', marginTop: '2px' }}>HOL</span>
                  )}

                  {isToday && (
                    <div style={{
                      position: 'absolute',
                      bottom: '-5px',
                      background: '#2563eb',
                      color: 'white',
                      fontSize: '7px',
                      fontWeight: '900',
                      padding: '1px 4px',
                      borderRadius: '6px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                      boxShadow: '0 2px 4px rgba(37, 99, 235, 0.4)'
                    }}>
                      TODAY
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* LEGEND ROW */}
          <div className="sa-legend-row">
            <div className="sa-legend-item">
              <span className="sa-legend-dot-green" />
              <span>Present (Default)</span>
            </div>
            <div className="sa-legend-item">
              <span className="sa-legend-dot-red" />
              <span style={{ color: '#b91c1c', fontWeight: '700' }}>Absent</span>
            </div>
            <div className="sa-legend-item">
              <span className="sa-legend-dot-purple" />
              <span style={{ color: '#7e22ce', fontWeight: '700' }}>Holiday</span>
            </div>
            <div className="sa-legend-item">
              <span className="sa-legend-dot-gray" />
              <span>Upcoming</span>
            </div>
          </div>

        </div>

      </div>

      {/* TOAST NOTIFICATION POPUP */}
      {toastMessage && (
        <div className="orp-toast" style={{ zIndex: 100000, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Check size={16} color="#4ade80" style={{ flexShrink: 0 }} />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
