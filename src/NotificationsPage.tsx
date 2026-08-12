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
  {
    id: 'n1',
    category: 'staff',
    title: 'New Student Check-in Registered',
    body: 'Ananya Sharma completed registration and check-in to Room 101 at Sri Akshara Luxury Girls Hostel.',
    time: '10 mins ago',
    read: false
  },
  {
    id: 'n2',
    category: 'system',
    title: 'Sick Meal Request Received',
    body: 'Riya Verma (Room 102) requested special Sick Meal (Khichdi & Curd).',
    time: '35 mins ago',
    read: false
  },
  {
    id: 'n3',
    category: 'payment',
    title: 'Monthly Rent Collected',
    body: '₹8,500 rent collected via UPI from Sneha Reddy (Room 101).',
    time: '2 hours ago',
    read: true
  },
  {
    id: 'n4',
    category: 'maintenance',
    title: 'Maintenance Ticket Resolved',
    body: 'Geyser repair completed in Room 102 by Maintenance Staff.',
    time: '4 hours ago',
    read: true
  }
];

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
