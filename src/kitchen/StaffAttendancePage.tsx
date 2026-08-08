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

  // Interactive Staff Attendance State
  const [staffAttendance, setStaffAttendance] = React.useState<{ [staffId: string]: { absentDates: number[]; holidayDates: number[] } }>(() => {
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
            <span className="sa-stat-num" style={{ color: '#9333ea' }}>{holidayDaysCount}</span>
            <span className="sa-stat-label">Holidays</span>
          </div>

          <div className="sa-stat-col">
            <span className="sa-stat-num blue">{attendancePct}%</span>
            <span className="sa-stat-label">Attendance</span>
          </div>
        </div>

        {/* MONTH TITLE */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', marginTop: '24px' }}>
          <h2 className="sa-month-title" style={{ marginBottom: 0 }}>AUGUST 2026 - ABSENT DATES</h2>
        </div>

        {/* ABSENT DATES LIST */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' }}>
          {pastAbsent.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '15px' }}>
              No absences recorded for this month.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {pastAbsent.sort((a, b) => b - a).map(dateNum => (
                <div key={dateNum} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#fff1f2', borderRadius: '12px', border: '1px solid #ffe4e6' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fecdd3', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px' }}>
                      {dateNum}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '15px', fontWeight: '700', color: '#9f1239' }}>August {dateNum}, 2026</span>
                      <span style={{ fontSize: '13px', color: '#be123c', fontWeight: '500' }}>Marked Absent</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PAST MONTHS ABSENT DATES */}
        {activeStaff.pastMonthsAbsences?.map((pastMonth, idx) => (
          <React.Fragment key={idx}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', marginTop: '24px' }}>
              <h2 className="sa-month-title" style={{ marginBottom: 0 }}>{pastMonth.monthName.toUpperCase()} {pastMonth.year} - ABSENT DATES</h2>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' }}>
              {pastMonth.dates.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '15px' }}>
                  No absences recorded for this month.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {pastMonth.dates.sort((a, b) => b - a).map(dateNum => (
                    <div key={dateNum} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#fff1f2', borderRadius: '12px', border: '1px solid #ffe4e6' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fecdd3', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px' }}>
                          {dateNum}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '15px', fontWeight: '700', color: '#9f1239' }}>{pastMonth.monthName} {dateNum}, {pastMonth.year}</span>
                          <span style={{ fontSize: '13px', color: '#be123c', fontWeight: '500' }}>Marked Absent</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </React.Fragment>
        ))}

      </div>

    </div>
  );
};
