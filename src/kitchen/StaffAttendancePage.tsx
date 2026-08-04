import React, { useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';

interface StaffAttendanceOption {
  id: string;
  name: string;
  role: string;
  label: string;
  presentDays: number;
  absentDays: number;
  attendancePercentage: number;
  absentDates: number[];
  restDates: number[];
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
      id: 'st-rk',
      name: 'Ramesh Kumar',
      role: 'Warden',
      label: 'Ramesh Kumar (Warden)',
      presentDays: 25,
      absentDays: 1,
      attendancePercentage: 96,
      absentDates: [8],
      restDates: [5, 12, 19, 26]
    },
    {
      id: 'st-sd',
      name: 'Sita Devi',
      role: 'Cook/Cleaner',
      label: 'Sita Devi (Cook/Cleaner)',
      presentDays: 24,
      absentDays: 2,
      attendancePercentage: 92,
      absentDates: [8, 14],
      restDates: [5, 12, 19, 26]
    },
    {
      id: 'st-bs',
      name: 'Bahadur Singh',
      role: 'Security',
      label: 'Bahadur Singh (Security)',
      presentDays: 26,
      absentDays: 0,
      attendancePercentage: 100,
      absentDates: [],
      restDates: [5, 12, 19, 26]
    },
    {
      id: 'st-sc',
      name: 'Suresh Cook',
      role: 'Head Chef',
      label: 'Suresh Cook (Head Chef)',
      presentDays: 25,
      absentDays: 1,
      attendancePercentage: 96,
      absentDates: [18],
      restDates: [5, 12, 19, 26]
    }
  ];

  // Interactive Staff Attendance State
  const [staffAttendance, setStaffAttendance] = useState<{ [staffId: string]: { absentDates: number[]; restDates: number[] } }>({
    'st-rk': { absentDates: [8], restDates: [5, 12, 19, 26] },
    'st-sd': { absentDates: [8, 14], restDates: [5, 12, 19, 26] },
    'st-bs': { absentDates: [], restDates: [5, 12, 19, 26] },
    'st-sc': { absentDates: [18], restDates: [5, 12, 19, 26] }
  });

  const matchedInitial = initialStaff
    ? staffList.find(s => s.name.toLowerCase().includes(initialStaff.name.toLowerCase()))
    : undefined;

  const [selectedStaffId, setSelectedStaffId] = useState<string>(matchedInitial ? matchedInitial.id : 'st-rk');

  const activeStaff = staffList.find(s => s.id === selectedStaffId) || staffList[0];

  const currentAttendance = staffAttendance[selectedStaffId] || { absentDates: activeStaff.absentDates, restDates: activeStaff.restDates };
  const absentDaysCount = currentAttendance.absentDates.length;
  const restDaysCount = currentAttendance.restDates.length;
  const presentDaysCount = 31 - absentDaysCount - restDaysCount;
  const attendancePct = Math.round((presentDaysCount / (31 - restDaysCount)) * 100);

  // Toggle Day Status on click
  const handleToggleDayStatus = (dayNum: number) => {
    setStaffAttendance(prev => {
      const currentData = prev[selectedStaffId] || { absentDates: activeStaff.absentDates, restDates: activeStaff.restDates };
      const isCurrentlyAbsent = currentData.absentDates.includes(dayNum);
      const newAbsentDates = isCurrentlyAbsent
        ? currentData.absentDates.filter(d => d !== dayNum)
        : [...currentData.absentDates, dayNum];

      return {
        ...prev,
        [selectedStaffId]: {
          ...currentData,
          absentDates: newAbsentDates
        }
      };
    });
  };

  // July 2026 starts on Wednesday (offset = 2 empty cells)
  const emptyOffsetCells = [null, null];
  const totalMonthDays = Array.from({ length: 31 }, (_, i) => i + 1);

  const getDayStatusType = (dayNum: number): 'absent' | 'rest' | 'present' => {
    if (currentAttendance.absentDates.includes(dayNum)) return 'absent';
    if (currentAttendance.restDates.includes(dayNum)) return 'rest';
    return 'present';
  };

  return (
    <div className="staff-attendance-page-container">
      
      {/* TOP HEADER BAR (EXACT MATCH TO REFERENCE PHOTO) */}
      <div className="sa-header-bar">
        <button className="sa-back-btn" onClick={onBack} type="button">
          <ChevronLeft size={20} className="text-blue-600" />
          <span className="sa-back-text">Back</span>
        </button>
        <h1 className="sa-header-title">Staff Attendance</h1>
      </div>

      <div className="sa-body-container">
        
        {/* SELECT STAFF MEMBER DROPDOWN */}
        <div className="sa-field-group">
          <label className="sa-field-label">Select Staff Member</label>
          <div className="sa-select-wrap">
            <select
              className="sa-select-input"
              value={selectedStaffId}
              onChange={e => setSelectedStaffId(e.target.value)}
            >
              {staffList.map(st => (
                <option key={st.id} value={st.id}>
                  {st.label}
                </option>
              ))}
            </select>
            <ChevronDown size={18} className="sa-select-arrow" />
          </div>
        </div>

        {/* ATTENDANCE SUMMARY CARD (PRESENT, ABSENT, ATTENDANCE %) */}
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
            <span className="sa-stat-num blue">{attendancePct}%</span>
            <span className="sa-stat-label">Attendance</span>
          </div>
        </div>

        {/* MONTH TITLE */}
        <h2 className="sa-month-title">JULY 2026</h2>

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

            {/* July 1 to 31 */}
            {totalMonthDays.map(day => {
              const status = getDayStatusType(day);
              return (
                <div
                  key={day}
                  className={`sa-day-cell ${status}`}
                  onClick={() => handleToggleDayStatus(day)}
                  style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                  title={status === 'absent' ? `Day ${day}: Absent (Click to set Present)` : `Day ${day}: Present (Click to set Absent)`}
                >
                  {day}
                </div>
              );
            })}
          </div>

        </div>

        {/* LEGEND ROW BELOW CALENDAR */}
        <div className="sa-legend-row">
          <div className="sa-legend-item">
            <span className="sa-legend-text">Present</span>
          </div>

          <div className="sa-legend-item">
            <span className="sa-legend-dot-red" />
            <span className="sa-legend-text-red">Absent</span>
          </div>

          <div className="sa-legend-item">
            <span className="sa-legend-text">Rest Day</span>
          </div>
        </div>

      </div>

    </div>
  );
};
