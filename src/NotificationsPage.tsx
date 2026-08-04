import React, { useState } from 'react';
import {
  ChevronLeft,
  CheckCircle,
  Clock,
  IndianRupee,
  UserCheck,
  Megaphone,
  Wrench,
  Star,
  Bell
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────── */
/*  DATA TYPES                                                                */
/* ─────────────────────────────────────────────────────────────────────────── */
type NotifCategory = 'payment' | 'staff' | 'maintenance' | 'broadcast' | 'system';

interface Notif {
  id: string;
  category: NotifCategory;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

interface NotificationsPageProps {
  onBack: () => void;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  SAMPLE NOTIFICATIONS DATA                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */
const INITIAL_NOTIFS: Notif[] = [
  { id: 'n1',  category: 'payment',     title: 'Payment Received',           body: 'Riya Sharma paid ₹8,500 for July 2026. Payment verified successfully.',               time: '2 mins ago',    read: false },
  { id: 'n2',  category: 'payment',     title: 'Pending Fee Alert',           body: 'Arjun Mehta has not paid fees for 3 days. Amount due: ₹7,200.',                       time: '15 mins ago',   read: false },
  { id: 'n3',  category: 'payment',     title: 'Payment Uploaded',            body: 'Priya Singh uploaded payment proof for ₹6,000. Awaiting your verification.',          time: '32 mins ago',   read: false },
  { id: 'n4',  category: 'staff',       title: 'Salary Disbursed',            body: 'Monthly salary of ₹17,308 disbursed to Ramesh Kumar (Warden) via UPI.',               time: '1 hr ago',      read: false },
  { id: 'n5',  category: 'staff',       title: 'Staff Absent Today',          body: 'Sita Devi (Cook) marked absent for today. 2 absences this month.',                    time: '2 hrs ago',     read: true  },
  { id: 'n6',  category: 'maintenance', title: 'Maintenance Request',         body: 'Room 204 reported a leaking tap. Maintenance team has been notified.',                 time: '3 hrs ago',     read: true  },
  { id: 'n7',  category: 'broadcast',   title: 'Broadcast Sent',              body: 'Announcement "Mess Holiday - Independence Day" sent to all 32 residents.',             time: '5 hrs ago',     read: true  },
  { id: 'n8',  category: 'payment',     title: 'Rent Paid',                   body: 'Monthly rent of ₹25,000 deducted successfully on 01 Jul 2026.',                        time: 'Yesterday',     read: true  },
  { id: 'n9',  category: 'system',      title: 'New Resident Joined',         body: 'Kavya Nair checked in to Room 301. Onboarding documents verified.',                   time: 'Yesterday',     read: true  },
  { id: 'n10', category: 'maintenance', title: 'Repair Completed',            body: 'Broken window in Room 108 has been repaired. Resident notified.',                      time: '2 days ago',    read: true  },
  { id: 'n11', category: 'payment',     title: 'Overdue Fee Reminder',        body: 'Vikram Patel fees are overdue by 5 days. Last reminder sent automatically.',           time: '2 days ago',    read: true  },
  { id: 'n12', category: 'system',      title: 'Monthly Report Ready',        body: 'July 2026 collection summary: ₹1,12,400 collected out of ₹1,38,000 total.',            time: '3 days ago',    read: true  },
];

/* ─────────────────────────────────────────────────────────────────────────── */
/*  HELPERS                                                                   */
/* ─────────────────────────────────────────────────────────────────────────── */
function categoryIcon(cat: NotifCategory): React.ReactNode {
  switch (cat) {
    case 'payment':     return <IndianRupee size={16} />;
    case 'staff':       return <UserCheck size={16} />;
    case 'maintenance': return <Wrench size={16} />;
    case 'broadcast':   return <Megaphone size={16} />;
    case 'system':      return <Star size={16} />;
  }
}

function categoryColor(cat: NotifCategory): string {
  switch (cat) {
    case 'payment':     return '#2563eb';
    case 'staff':       return '#7c3aed';
    case 'maintenance': return '#d97706';
    case 'broadcast':   return '#0891b2';
    case 'system':      return '#16a34a';
  }
}

function categoryBg(cat: NotifCategory): string {
  switch (cat) {
    case 'payment':     return '#eff6ff';
    case 'staff':       return '#f5f3ff';
    case 'maintenance': return '#fffbeb';
    case 'broadcast':   return '#ecfeff';
    case 'system':      return '#f0fdf4';
  }
}

const FILTERS = ['All', 'Unread', 'Payment', 'Staff', 'Maintenance'];

/* ─────────────────────────────────────────────────────────────────────────── */
/*  COMPONENT                                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */
export const NotificationsPage: React.FC<NotificationsPageProps> = ({ onBack }) => {
  const [notifs, setNotifs]         = useState<Notif[]>(INITIAL_NOTIFS);
  const [activeFilter, setFilter]   = useState('All');

  const unreadCount = notifs.filter(n => !n.read).length;

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  const markRead    = (id: string) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const filtered = notifs.filter(n => {
    if (activeFilter === 'All')         return true;
    if (activeFilter === 'Unread')      return !n.read;
    if (activeFilter === 'Payment')     return n.category === 'payment';
    if (activeFilter === 'Staff')       return n.category === 'staff';
    if (activeFilter === 'Maintenance') return n.category === 'maintenance';
    return true;
  });

  return (
    <div className="notif-page">

      {/* HEADER */}
      <div className="notif-header">
        <button className="notif-back-btn" onClick={onBack}>
          <ChevronLeft size={20} color="#2563eb" />
          <span className="notif-back-text">Back</span>
        </button>
        <div className="notif-header-center">
          <h1 className="notif-title">Notifications</h1>
          {unreadCount > 0 && (
            <span className="notif-count-badge">{unreadCount}</span>
          )}
        </div>
        {unreadCount > 0 && (
          <button className="notif-mark-all-btn" onClick={markAllRead}>
            <CheckCircle size={14} />
            Mark all read
          </button>
        )}
      </div>

      {/* FILTER PILLS */}
      <div className="notif-filter-row">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`notif-filter-pill ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* NOTIFICATION LIST */}
      {filtered.length === 0 ? (
        <div className="notif-empty">
          <Bell size={40} color="#cbd5e1" />
          <p>No notifications here</p>
        </div>
      ) : (
        <div className="notif-list">
          {filtered.map(n => (
            <div
              key={n.id}
              className={`notif-card ${n.read ? 'read' : 'unread'}`}
              onClick={() => markRead(n.id)}
            >
              {/* ICON CIRCLE */}
              <div
                className="notif-icon-circle"
                style={{ background: categoryBg(n.category), color: categoryColor(n.category) }}
              >
                {categoryIcon(n.category)}
              </div>

              {/* TEXT */}
              <div className="notif-card-body">
                <div className="notif-card-title">{n.title}</div>
                <div className="notif-card-body-text">{n.body}</div>
                <div className="notif-card-time">
                  <Clock size={11} color="#94a3b8" />
                  {n.time}
                </div>
              </div>

              {/* UNREAD DOT */}
              {!n.read && <div className="notif-unread-dot" />}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
