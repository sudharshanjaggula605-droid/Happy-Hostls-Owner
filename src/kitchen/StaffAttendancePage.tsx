import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, Edit2, Check } from 'lucide-react';

interface StaffAttendanceOption {
  id: string;
  name: string;
  role: string;
  label: string;
  presentDays: number;
  absentDays: number;
  attendancePercentage: number;
  absentDates: number[];
  holidayDates?: number[];
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
      presentDays: 25,
      absentDays: 1,
      attendancePercentage: 96,
      absentDates: [8],
      holidayDates: []
    },
    {
      id: 'st-2',
      name: 'Sita Devi',
      role: 'Cook/Cleaner',
      label: 'Sita Devi (Cook/Cleaner)',
      presentDays: 24,
      absentDays: 2,
      attendancePercentage: 92,
      absentDates: [8, 14],
      holidayDates: []
    },
    {
      id: 'st-3',
      name: 'Bahadur Singh',
      role: 'Security',
      label: 'Bahadur Singh (Security)',
      presentDays: 26,
      absentDays: 0,
      attendancePercentage: 100,
      absentDates: [],
      holidayDates: []
    },
    {
      id: 'st-4',
      name: 'Suresh Cook',
      role: 'Head Chef',
      label: 'Suresh Cook (Head Chef)',
      presentDays: 25,
      absentDays: 1,
      attendancePercentage: 96,
      absentDates: [18],
      holidayDates: []
    }
  ];

  // Interactive Staff Attendance State
  const [staffAttendance, setStaffAttendance] = React.useState<{ [staffId: string]: { absentDates: number[]; holidayDates: number[] } }>(() => {
    const saved = localStorage.getItem('staffAttendanceDB');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      'st-1': { absentDates: [8], holidayDates: [] },
      'st-2': { absentDates: [8, 14], holidayDates: [] },
      'st-3': { absentDates: [], holidayDates: [] },
      'st-4': { absentDates: [18], holidayDates: [] }
    };
  });

  React.useEffect(() => {
    localStorage.setItem('staffAttendanceDB', JSON.stringify(staffAttendance));
  }, [staffAttendance]);

  const matchedInitial = initialStaff
    ? staffList.find(s => s.name.toLowerCase().includes(initialStaff.name.toLowerCase()))
    : undefined;

  const [selectedStaffId, setSelectedStaffId] = useState<string>(matchedInitial ? matchedInitial.id : 'st-1');

  const activeStaff = staffList.find(s => s.id === selectedStaffId) || staffList[0];

  const todayDate = 15;
  const currentAttendance = staffAttendance[selectedStaffId] || { absentDates: activeStaff.absentDates, holidayDates: activeStaff.holidayDates || [] };
  
  const pastAbsent = currentAttendance.absentDates.filter(d => d <= todayDate);
  const pastHoliday = (currentAttendance.holidayDates || []).filter(d => d <= todayDate);

  const absentDaysCount = pastAbsent.length;
  const holidayDaysCount = pastHoliday.length;
  const presentDaysCount = todayDate - absentDaysCount - holidayDaysCount;
  const totalWorkingDays = todayDate - holidayDaysCount;
  
  const attendancePct = totalWorkingDays > 0 ? Math.round((presentDaysCount / totalWorkingDays) * 100) : 0;

  const [isEditingAttendance, setIsEditingAttendance] = useState(false);

  // Toggle Day Status on click
  const handleToggleDayStatus = (dayNum: number) => {
    if (!isEditingAttendance || dayNum > todayDate) return;

    setStaffAttendance(prev => {
      const currentData = prev[selectedStaffId] || { absentDates: activeStaff.absentDates, holidayDates: activeStaff.holidayDates || [] };
      const isAbsent = currentData.absentDates.includes(dayNum);
      const isHoliday = (currentData.holidayDates || []).includes(dayNum);

      let newAbsentDates = currentData.absentDates.filter(d => d !== dayNum);
      let newHolidayDates = (currentData.holidayDates || []).filter(d => d !== dayNum);

      if (isAbsent) {
        // Was absent -> Make holiday
        newHolidayDates.push(dayNum);
      } else if (isHoliday) {
        // Was holiday -> Make present (removed from both)
      } else {
        // Was present -> Make absent
        newAbsentDates.push(dayNum);
      }

      return {
        ...prev,
        [selectedStaffId]: {
          ...currentData,
          absentDates: newAbsentDates,
          holidayDates: newHolidayDates
        }
      };
    });
  };

  // July 2026 starts on Wednesday (offset = 2 empty cells)
  const emptyOffsetCells = [null, null];
  const totalMonthDays = Array.from({ length: 31 }, (_, i) => i + 1);

  const getDayStatusType = (dayNum: number): 'absent' | 'present' | 'holiday' => {
    if (currentAttendance.absentDates.includes(dayNum)) return 'absent';
    if ((currentAttendance.holidayDates || []).includes(dayNum)) return 'holiday';
    return 'present';
  };

  return (
    <div className="staff-attendance-page-container">
      
      {/* TOP HEADER BAR (EXACT MATCH TO REFERENCE PHOTO) */}
      <div className="sa-header-bar">
        
        <h1 className="sa-header-title">Staff Attendance</h1>
      </div>

      <div className="sa-body-container">
        
        {/* SELECT STAFF MEMBER DROPDOWN REMOVED */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-color)' }}>{activeStaff.label}</h2>
        </div>

        {/* ATTENDANCE SUMMARY CARD */}
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
            <span className="sa-stat-num" style={{ color: '#d97706' }}>{holidayDaysCount}</span>
            <span className="sa-stat-label">Holidays</span>
          </div>

          <div className="sa-stat-col">
            <span className="sa-stat-num blue">{attendancePct}%</span>
            <span className="sa-stat-label">Attendance</span>
          </div>
        </div>

        {/* MONTH TITLE & EDIT BUTTON */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h2 className="sa-month-title" style={{ marginBottom: 0 }}>AUGUST 2026</h2>
          <button 
            onClick={() => setIsEditingAttendance(!isEditingAttendance)}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', 
              background: isEditingAttendance ? '#22c55e' : '#f1f5f9', 
              color: isEditingAttendance ? 'white' : '#64748b', 
              border: 'none', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s' 
            }}
          >
            {isEditingAttendance ? <><Check size={16} /> Done</> : <><Edit2 size={16} /> Edit</>}
          </button>
        </div>

        {/* MONTHLY CALENDAR CARD (1:1 MATCH TO REFERENCE PHOTO) */}
        <div className="sa-calendar-card">
          
          {/* WEEKDAYS HEADER ROW */}
          <div className="sa-weekdays-row">
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
            <span>Su</span>
          </div>

          {/* DAYS GRID */}
          <div className="sa-days-grid">
            {/* Empty offset cells for Wed start */}
            {emptyOffsetCells.map((_, idx) => (
              <div key={`empty-${idx}`} className="sa-day-cell empty" />
            ))}

            {/* August 1 to 31 */}
            {totalMonthDays.map(day => {
              const status = getDayStatusType(day);
              const isFuture = day > todayDate;
              return (
                <div
                  key={day}
                  className={`sa-day-cell ${isFuture ? '' : status}`}
                  onClick={() => handleToggleDayStatus(day)}
                  style={{ 
                    cursor: (!isEditingAttendance || isFuture) ? 'default' : 'pointer', 
                    transition: 'all 0.15s ease',
                    color: isFuture ? '#cbd5e1' : undefined,
                    background: isFuture ? 'transparent' : undefined,
                    fontWeight: isFuture ? '400' : '600'
                  }}
                  title={isFuture ? 'Future date' : (status === 'absent' ? `Day ${day}: Absent (Click to set Present)` : `Day ${day}: Present (Click to set Absent)`)}
                >
                  {day}
                </div>
              );
            })}
          </div>

        </div>

        {/* LEGEND ROW BELOW CALENDAR */}
        <div className="sa-legend-row" style={{ marginTop: '20px' }}>
          <div className="sa-legend-item">
            <span className="sa-legend-text">Present</span>
          </div>

          <div className="sa-legend-item">
            <span className="sa-legend-dot-red" />
            <span className="sa-legend-text-red">Absent</span>
          </div>

          <div className="sa-legend-item">
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block', marginRight: '6px' }} />
            <span style={{ fontSize: '13px', color: '#b45309', fontWeight: '500' }}>Holiday</span>
          </div>
        </div>

      </div>

    </div>
  );
};
