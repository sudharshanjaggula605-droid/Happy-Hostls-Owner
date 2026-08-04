import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  UserPlus, 
  Upload, 
  Download, 
  UserCheck, 
  SlidersHorizontal, 
  ChevronDown, 
  Eye, 
  Ban, 
  CheckCircle, 
  X,
  Plus,
  Phone,
  Mail,
  Home,
  Calendar
} from 'lucide-react';

export interface TenantUser {
  id: string;
  name: string;
  email: string;
  mobile: string;
  roomNumber: string;
  block: string;
  hostelName: string;
  status: 'Active' | 'Blocked';
  joinDate: string;
  avatar?: string;
}

export const initialTenantUsers: TenantUser[] = [
  {
    id: 'u1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    mobile: '9876543210',
    roomNumber: '101',
    block: 'Block A',
    hostelName: 'Akshara Ladies Hostel',
    status: 'Active',
    joinDate: '15 Jan 2026'
  },
  {
    id: 'u2',
    name: 'Kabir Verma',
    email: 'kabir.verma@example.com',
    mobile: '9123456780',
    roomNumber: '204',
    block: 'Block A',
    hostelName: 'Akshara Ladies Hostel',
    status: 'Active',
    joinDate: '01 Feb 2026'
  },
  {
    id: 'u3',
    name: 'Ishaan Gupta',
    email: 'ishaan.gupta@example.com',
    mobile: '9988776655',
    roomNumber: '112',
    block: 'Block B',
    hostelName: 'Sunrise Residency',
    status: 'Active',
    joinDate: '10 Mar 2026'
  },
  {
    id: 'u4',
    name: 'Rohit Rajpoot',
    email: 'rohitrajpoot21119@gmail.com',
    mobile: '6265775558',
    roomNumber: '105',
    block: 'Block C',
    hostelName: 'Akshara Ladies Hostel',
    status: 'Blocked',
    joinDate: '12 Dec 2025'
  },
  {
    id: 'u5',
    name: 'Ankit Kumar',
    email: 'ankit.kumar@example.com',
    mobile: '9032109876',
    roomNumber: '202',
    block: 'Block B',
    hostelName: 'Sunrise Residency',
    status: 'Blocked',
    joinDate: '20 Nov 2025'
  }
];

export interface GuestRequest {
  id: string;
  name: string;
  email?: string;
  mobile: string;
  hostelName?: string;
  requestedRoom: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export const initialGuestRequests: GuestRequest[] = [
  {
    id: 'gr1',
    name: 'Saniya Gupta',
    email: 'saniya.g@gmail.com',
    mobile: '+91 91234 56789',
    hostelName: 'AKSHARA LADIES HOSTEL',
    requestedRoom: 'Room 104 (Block A)',
    requestDate: 'Today, 2:30 PM',
    status: 'Pending'
  },
  {
    id: 'gr2',
    name: 'Divya Nair',
    email: 'divya.nair@hotmail.com',
    mobile: '+91 90123 45678',
    hostelName: 'AKSHARA LADIES HOSTEL',
    requestedRoom: 'Room 208 (Block B)',
    requestDate: 'Yesterday, 11:15 AM',
    status: 'Pending'
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
  const [guestRequests, setGuestRequests] = useState<GuestRequest[]>(initialGuestRequests);
  const [exportHostelFilter, setExportHostelFilter] = useState<string>('AKSHARA LADIES HOSTEL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Blocked'>('All');
  const [subTab, setSubTab] = useState<'history' | 'add' | 'import'>('history');

  // Modals
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);
  const [isGuestRequestsModalOpen, setIsGuestRequestsModalOpen] = useState<boolean>(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [viewingUser, setViewingUser] = useState<TenantUser | null>(null);

  // Approve Confirmation & Room Allocation State
  const [confirmingGuestReq, setConfirmingGuestReq] = useState<GuestRequest | null>(null);
  const [allocateOption, setAllocateOption] = useState<'now' | 'later'>('now');
  const [selectedVacantRoom, setSelectedVacantRoom] = useState('Room 102–B (Vacant)');
  const [customRoomNo, setCustomRoomNo] = useState('');

  // Lock the inner scrollable pane while the detail modal is open
  useEffect(() => {
    const pane = document.querySelector<HTMLElement>('.screen-content');
    if (!pane) return;
    if (viewingUser) {
      pane.style.overflow = 'hidden';
    } else {
      pane.style.overflow = '';
    }
    return () => { pane.style.overflow = ''; };
  }, [viewingUser]);

  // New User Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [newRoomNumber, setNewRoomNumber] = useState('101');
  const [newBlock, setNewBlock] = useState('Block A');

  // Counts Calculation
  const totalCount = users.length;
  const activeCount = users.filter(u => u.status === 'Active').length;
  const blockedCount = users.filter(u => u.status === 'Blocked').length;

  // Filtered Users List
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      // Search filter
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        user.name.toLowerCase().includes(query) ||
        user.mobile.includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.roomNumber.toLowerCase().includes(query) ||
        user.block.toLowerCase().includes(query);

      // Status filter
      const matchesStatus = statusFilter === 'All' || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, searchQuery, statusFilter]);

  // Toggle User Block Status
  const handleToggleBlock = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Active' ? 'Blocked' : 'Active';
        if (showToast) showToast(`User ${u.name} is now ${nextStatus}`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  // Add User Form Submission
  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newMobile) {
      if (showToast) showToast('Please enter user name and mobile number');
      return;
    }

    const newUser: TenantUser = {
      id: 'u_' + Date.now(),
      name: newName,
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      mobile: newMobile,
      roomNumber: newRoomNumber,
      block: newBlock,
      hostelName: exportHostelFilter,
      status: 'Active',
      joinDate: 'Today'
    };

    setUsers([newUser, ...users]);
    if (showToast) showToast(`Tenant user ${newName} added successfully!`);

    setNewName('');
    setNewEmail('');
    setNewMobile('');
    setIsAddUserModalOpen(false);
    setSubTab('history');
  };

  // Export CSV Action
  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Mobile', 'Room', 'Block', 'Status', 'Join Date'];
    const rows = filteredUsers.map(u => [
      u.id,
      `"${u.name}"`,
      `"${u.email}"`,
      `"${u.mobile}"`,
      `"${u.roomNumber}"`,
      `"${u.block}"`,
      u.status,
      `"${u.joinDate}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Users_History_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (showToast) showToast(`Exported ${filteredUsers.length} users to CSV file`);
  };

  // In-popup success notification message
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Approve / Reject Guest Request
  const handleGuestAction = (reqId: string, action: 'Approved' | 'Rejected', reqName: string) => {
    setGuestRequests(prev => prev.map(gr => gr.id === reqId ? { ...gr, status: action } : gr));
    const msg = `Guest request for ${reqName} ${action.toLowerCase()} successfully!`;
    setActionSuccessMsg(msg);
    if (showToast) showToast(msg);
    setTimeout(() => setActionSuccessMsg(null), 3500);
  };

  const handleConfirmApprove = () => {
    if (!confirmingGuestReq) return;

    const roomText = allocateOption === 'now' 
      ? (customRoomNo.trim() || selectedVacantRoom)
      : 'Unassigned';

    setGuestRequests(prev => prev.map(gr => 
      gr.id === confirmingGuestReq.id ? { ...gr, status: 'Approved' } : gr
    ));

    const newTenant: TenantUser = {
      id: `u-${Date.now()}`,
      name: confirmingGuestReq.name,
      email: confirmingGuestReq.email || `${confirmingGuestReq.name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      mobile: confirmingGuestReq.mobile,
      roomNumber: roomText,
      block: 'Block A',
      hostelName: confirmingGuestReq.hostelName || 'Akshara Ladies Hostel',
      status: 'Active',
      joinDate: '01 Aug 2026'
    };

    setUsers(prev => [newTenant, ...prev]);

    const msg = `Guest request for ${confirmingGuestReq.name} approved & room allocated successfully!`;
    setActionSuccessMsg(msg);
    if (showToast) showToast(msg);

    setConfirmingGuestReq(null);
  };

  return (
    <div className="users-history-wrapper">
      {/* BREADCRUMB NAVIGATION */}
      <div className="users-breadcrumb">
        <span className="breadcrumb-link active">Dashboard</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-link">Users</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">History</span>
      </div>

      {/* TOP HEADER SUMMARY CARD */}
      <div className="users-header-summary-card">
        {/* Label & Stats Counter Row */}
        <div className="tenant-management-top-row">
          <div className="tenant-label">TENANT MANAGEMENT</div>

          <div className="tenant-stats-pills">
            {/* TOTAL STAT */}
            <div className="stat-pill-box total-pill">
              <span className="pill-lbl">TOTAL</span>
              <span className="pill-num">{totalCount}</span>
            </div>

            {/* ACTIVE STAT */}
            <div className="stat-pill-box active-pill">
              <span className="pill-lbl">ACTIVE</span>
              <span className="pill-num">{activeCount}</span>
            </div>

            {/* BLOCKED STAT */}
            <div className="stat-pill-box blocked-pill">
              <span className="pill-lbl">BLOCKED</span>
              <span className="pill-num">{blockedCount}</span>
            </div>
          </div>
        </div>

        {/* Page Title */}
        <h2 className="users-history-title">Users history</h2>

        {/* Description Subtext */}
        <p className="users-history-desc">
          Browse registered tenants, filter by status, export hostel rosters, and manage pending join requests from Guest requests.
        </p>

        {/* Top Sub-Tabs Navigation */}
        <div className="users-segmented-nav">
          <button 
            type="button"
            className={`segmented-btn ${subTab === 'history' ? 'active' : ''}`}
            onClick={() => setSubTab('history')}
          >
            <SlidersHorizontal size={14} />
            <span>History</span>
          </button>

          <button 
            type="button"
            className={`segmented-btn ${subTab === 'add' ? 'active' : ''}`}
            onClick={() => {
              setSubTab('add');
              setIsAddUserModalOpen(true);
            }}
          >
            <UserPlus size={14} />
            <span>Add User</span>
          </button>

          <button 
            type="button"
            className={`segmented-btn ${subTab === 'import' ? 'active' : ''}`}
            onClick={() => {
              setSubTab('import');
              setIsImportModalOpen(true);
            }}
          >
            <Upload size={14} />
            <span>Import Users</span>
          </button>
        </div>
      </div>

      {/* EXPORT FROM DROPDOWN SECTION */}
      <div className="export-from-section">
        <label className="export-from-label">EXPORT FROM</label>
        <div className="export-from-select-wrapper">
          <select 
            className="export-from-select"
            value={exportHostelFilter}
            onChange={(e) => setExportHostelFilter(e.target.value)}
          >
            <option value="AKSHARA LADIES HOSTEL">AKSHARA LADIES HOSTEL</option>
            <option value="SUNRISE RESIDENCY">SUNRISE RESIDENCY</option>
            <option value="ST. MARY BOYS HOSTEL">ST. MARY BOYS HOSTEL</option>
            <option value="ALL HOSTELS">ALL HOSTELS</option>
          </select>
          <ChevronDown size={18} className="select-arrow-icon" />
        </div>
      </div>

      {/* QUICK ACTION BUTTONS (2x2 GRID) */}
      <div className="quick-actions-2x2-grid">
        {/* Button 1: Guest Requests */}
        <button 
          type="button" 
          className="quick-act-btn soft-btn"
          onClick={() => setIsGuestRequestsModalOpen(true)}
        >
          <UserCheck size={16} />
          <span>Guest requests</span>
        </button>

        {/* Button 2: Import Users */}
        <button 
          type="button" 
          className="quick-act-btn soft-btn"
          onClick={() => setIsImportModalOpen(true)}
        >
          <Upload size={16} />
          <span>Import Users</span>
        </button>

        {/* Button 3: Add User */}
        <button 
          type="button" 
          className="quick-act-btn solid-blue-btn"
          onClick={() => {
            if (onNavigateToAddUser) {
              onNavigateToAddUser();
            } else {
              setIsAddUserModalOpen(true);
            }
          }}
        >
          <Plus size={16} />
          <span>Add User</span>
        </button>

        {/* Button 4: Export CSV */}
        <button 
          type="button" 
          className="quick-act-btn soft-btn"
          onClick={handleExportCSV}
        >
          <Download size={16} />
          <span>Export CSV</span>
        </button>
      </div>

      {/* SEARCH BAR & STATUS FILTER CHIPS */}
      <div className="users-search-filter-card">
        {/* Search Bar */}
        <div className="users-search-box">
          <Search size={16} className="search-icon-muted" />
          <input 
            type="text"
            className="users-search-input"
            placeholder="Search by name, mobile, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button type="button" className="clear-search-btn" onClick={() => setSearchQuery('')}>
              <X size={14} />
            </button>
          )}
        </div>

        {/* Status Filter Chips */}
        <div className="status-chips-row">
          <button 
            type="button"
            className={`status-chip-btn ${statusFilter === 'All' ? 'active' : ''}`}
            onClick={() => setStatusFilter('All')}
          >
            All {totalCount}
          </button>

          <button 
            type="button"
            className={`status-chip-btn ${statusFilter === 'Active' ? 'active' : ''}`}
            onClick={() => setStatusFilter('Active')}
          >
            Active {activeCount}
          </button>

          <button 
            type="button"
            className={`status-chip-btn ${statusFilter === 'Blocked' ? 'active' : ''}`}
            onClick={() => setStatusFilter('Blocked')}
          >
            Blocked {blockedCount}
          </button>
        </div>
      </div>

      {/* USERS LIST — CLEAN MOBILE CARDS */}
      <div className="users-cards-list">
        {filteredUsers.length === 0 ? (
          <div className="no-users-card">
            <Search size={28} color="#94a3b8" />
            <div className="no-users-title">No Tenants Found</div>
            <div className="no-users-desc">No registered tenants match your search criteria.</div>
          </div>
        ) : (
          filteredUsers.map((user) => {
            const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
            const avatarColors = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#d97706'];
            const colorIndex = user.name.charCodeAt(0) % avatarColors.length;
            const avatarColor = avatarColors[colorIndex];

            return (
              <div key={user.id} className="user-info-card">
                {/* LEFT: Avatar + Name + Email */}
                <div className="user-card-left">
                  <div className="user-avatar-circle" style={{ background: avatarColor }}>
                    {initials}
                  </div>
                  <div className="user-card-details">
                    <div className="user-card-name">{user.name}</div>
                    <div className="user-card-email">{user.email}</div>
                    <div className="user-card-meta-row">
                      <span className="user-card-mobile">📱 {user.mobile}</span>
                      <span className="user-card-dot-sep">·</span>
                      <span className="user-card-room">Room {user.roomNumber} · {user.block}</span>
                    </div>
                    <div className="user-card-join">Joined {user.joinDate}</div>
                  </div>
                </div>

                {/* RIGHT: Status + Actions */}
                <div className="user-card-right">
                  <span className={`user-status-pill ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                  <div className="user-card-actions">
                    <button
                      type="button"
                      className="user-action-btn view-btn"
                      onClick={() => setViewingUser(user)}
                      aria-label="View user"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      type="button"
                      className={`user-action-btn ${user.status === 'Active' ? 'block-btn' : 'unblock-btn'}`}
                      onClick={() => handleToggleBlock(user.id)}
                      aria-label={user.status === 'Active' ? 'Block' : 'Unblock'}
                    >
                      {user.status === 'Active' ? <Ban size={14} /> : <CheckCircle size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL 1: ADD USER */}
      {isAddUserModalOpen && (
        <div className="modal-overlay-backdrop" onClick={() => setIsAddUserModalOpen(false)}>
          <div className="bottom-sheet-content" onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-handle" />

            <div className="modal-header-row">
              <h3 className="modal-title">+ Add New Tenant User</h3>
              <button 
                type="button" 
                className="close-modal-btn" 
                onClick={() => setIsAddUserModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="modal-form-body">
              <div className="form-group-field">
                <label className="form-field-label">Full Name *</label>
                <input 
                  type="text" 
                  required 
                  className="modal-text-input" 
                  placeholder="e.g. Aarav Sharma"
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)} 
                />
              </div>

              <div className="form-group-field">
                <label className="form-field-label">Mobile Number *</label>
                <input 
                  type="text" 
                  required 
                  className="modal-text-input" 
                  placeholder="e.g. 9876543210"
                  value={newMobile} 
                  onChange={(e) => setNewMobile(e.target.value)} 
                />
              </div>

              <div className="form-group-field">
                <label className="form-field-label">Email Address</label>
                <input 
                  type="email" 
                  className="modal-text-input" 
                  placeholder="e.g. aarav@example.com"
                  value={newEmail} 
                  onChange={(e) => setNewEmail(e.target.value)} 
                />
              </div>

              <div className="form-two-cols">
                <div className="form-group-field">
                  <label className="form-field-label">Room Number</label>
                  <input 
                    type="text" 
                    className="modal-text-input" 
                    value={newRoomNumber} 
                    onChange={(e) => setNewRoomNumber(e.target.value)} 
                  />
                </div>

                <div className="form-group-field">
                  <label className="form-field-label">Hostel Block</label>
                  <select 
                    className="modal-select-input"
                    value={newBlock}
                    onChange={(e) => setNewBlock(e.target.value)}
                  >
                    <option value="Block A">Block A</option>
                    <option value="Block B">Block B</option>
                    <option value="Block C">Block C</option>
                  </select>
                </div>
              </div>

              <div className="modal-buttons-row">
                <button 
                  type="button" 
                  className="modal-cancel-btn" 
                  onClick={() => setIsAddUserModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="modal-submit-btn">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PENDING GUEST REQUESTS POPUP (TOP ALIGNED) */}
      {isGuestRequestsModalOpen && (
        <div className="modal-overlay-backdrop modal-top-align" onClick={() => setIsGuestRequestsModalOpen(false)}>
          <div className="guest-requests-popup-card" onClick={(e) => e.stopPropagation()}>
            
            <div className="guest-popup-header-row">
              <div className="guest-popup-header-left">
                <h3 className="guest-popup-title">Pending Guest Requests</h3>
                <p className="guest-popup-subtitle">Review join requests from new occupants</p>
              </div>
              <button 
                type="button" 
                className="guest-popup-close-btn" 
                onClick={() => setIsGuestRequestsModalOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {actionSuccessMsg && (
              <div className="guest-popup-success-banner">
                <CheckCircle size={15} color="#059669" />
                <span>{actionSuccessMsg}</span>
              </div>
            )}

            <div className="guest-popup-cards-list">
              {guestRequests.length === 0 ? (
                <div className="no-users-desc">No pending guest requests.</div>
              ) : (
                guestRequests.map((gr) => (
                  <div key={gr.id} className="guest-popup-item-card">
                    <div className="guest-popup-item-name">{gr.name}</div>
                    <div className="guest-popup-item-contact">
                      {gr.email || 'guest@example.com'} • {gr.mobile}
                    </div>
                    <div className="guest-popup-item-hostel">
                      {gr.hostelName || 'AKSHARA LADIES HOSTEL'}
                    </div>

                    <div className="guest-popup-item-actions">
                      {gr.status === 'Pending' ? (
                        <>
                          <button 
                            type="button" 
                            className="guest-popup-btn-approve"
                            onClick={() => {
                              setConfirmingGuestReq(gr);
                              setAllocateOption('now');
                              setSelectedVacantRoom('Room 102–B (Vacant)');
                              setCustomRoomNo('');
                            }}
                          >
                            Approve
                          </button>
                          <button 
                            type="button" 
                            className="guest-popup-btn-reject"
                            onClick={() => handleGuestAction(gr.id, 'Rejected', gr.name)}
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className={`status-pill status-${gr.status.toLowerCase()}`}>
                          {gr.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}

      {/* MODAL: APPROVE & ALLOCATE ROOM CONFIRMATION (EXACT REFERENCE DESIGN) */}
      {confirmingGuestReq && (
        <div className="modal-overlay-backdrop modal-center-align" onClick={() => setConfirmingGuestReq(null)}>
          <div className="approve-allocate-modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Header */}
            <div className="approve-modal-header">
              <div className="approve-modal-header-text">
                <h3 className="approve-modal-title">Approve &amp; Allocate Room</h3>
                <p className="approve-modal-subtitle">
                  Accepting request from {confirmingGuestReq.name}
                </p>
              </div>
              <button 
                type="button" 
                className="guest-popup-close-btn"
                onClick={() => setConfirmingGuestReq(null)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Question Label */}
            <div className="approve-question-label">
              Do you want to allocate a room now?
            </div>

            {/* Radio Option 1: Allocate Room Now */}
            <div 
              className={`radio-card-option ${allocateOption === 'now' ? 'selected' : ''}`}
              onClick={() => setAllocateOption('now')}
            >
              <div className="radio-circle">
                {allocateOption === 'now' && <div className="radio-dot" />}
              </div>
              <div className="radio-option-text">
                <div className="radio-title">Allocate Room Now</div>
                <div className="radio-subtitle">Assign an available room/bed number</div>
              </div>
            </div>

            {/* Radio Option 2: Do Not Allocate Room Now */}
            <div 
              className={`radio-card-option ${allocateOption === 'later' ? 'selected' : ''}`}
              onClick={() => setAllocateOption('later')}
            >
              <div className="radio-circle">
                {allocateOption === 'later' && <div className="radio-dot" />}
              </div>
              <div className="radio-option-text">
                <div className="radio-title">Do Not Allocate Room Now (Unassigned)</div>
                <div className="radio-subtitle">Leave room unassigned for later bed allocation</div>
              </div>
            </div>

            {/* Form Fields (Active when allocateOption === 'now') */}
            {allocateOption === 'now' && (
              <div className="approve-form-fields">
                <div className="approve-field-group">
                  <label className="approve-field-label">Select Vacant Room / Bed *</label>
                  <div className="approve-select-wrapper">
                    <select 
                      className="approve-select-input"
                      value={selectedVacantRoom}
                      onChange={(e) => setSelectedVacantRoom(e.target.value)}
                    >
                      <option value="Room 102–B (Vacant)">Room 102–B (Vacant)</option>
                      <option value="Room 104–A (Vacant)">Room 104–A (Vacant)</option>
                      <option value="Room 208–A (Vacant)">Room 208–A (Vacant)</option>
                      <option value="Room 301–C (Vacant)">Room 301–C (Vacant)</option>
                    </select>
                    <ChevronDown size={16} className="approve-select-arrow" />
                  </div>
                </div>

                <div className="approve-field-group">
                  <label className="approve-field-label">Enter Custom Room No. *</label>
                  <input 
                    type="text"
                    className="approve-text-input"
                    placeholder="e.g. 402–C"
                    value={customRoomNo}
                    onChange={(e) => setCustomRoomNo(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Description Text */}
            <div className="approve-confirmation-note">
              <CheckCircle size={15} color="#166534" className="note-icon" />
              <span>
                Are you sure you want to approve this guest request? Once approved, the guest will be added to the hostel records and the request status will be updated.
              </span>
            </div>

            {/* Action Buttons Row */}
            <div className="approve-modal-actions-row">
              <button 
                type="button" 
                className="btn-approve-cancel"
                onClick={() => setConfirmingGuestReq(null)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn-approve-save"
                onClick={handleConfirmApprove}
              >
                Approve &amp; Save
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 3: IMPORT USERS */}
      {isImportModalOpen && (
        <div className="modal-overlay-backdrop" onClick={() => setIsImportModalOpen(false)}>
          <div className="bottom-sheet-content" onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-handle" />

            <div className="modal-header-row">
              <h3 className="modal-title">Import Users CSV / Excel</h3>
              <button 
                type="button" 
                className="close-modal-btn" 
                onClick={() => setIsImportModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="import-box-dropzone">
              <Upload size={32} color="#0055ff" />
              <div className="import-drop-title">Upload .CSV or .XLSX roster file</div>
              <div className="import-drop-sub">Drag and drop file here, or click to browse</div>
              <button 
                type="button" 
                className="modal-submit-btn" 
                style={{ marginTop: '12px', width: 'auto', padding: '8px 20px' }}
                onClick={() => {
                  if (showToast) showToast('Roster imported successfully! Added 4 new users.');
                  setIsImportModalOpen(false);
                }}
              >
                Select File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: VIEW USER PROFILE — REDESIGNED */}
      {viewingUser && (() => {
        const initials = viewingUser.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
        const avatarColors: Record<string, string> = {
          'A': '#2563eb', 'B': '#7c3aed', 'C': '#059669', 'D': '#dc2626',
          'E': '#d97706', 'F': '#0891b2', 'G': '#4f46e5', 'H': '#be185d',
          'I': '#16a34a', 'J': '#b45309', 'K': '#1d4ed8', 'L': '#7c3aed',
          'M': '#0f766e', 'N': '#c2410c', 'O': '#4338ca', 'P': '#9333ea',
          'Q': '#0369a1', 'R': '#b91c1c', 'S': '#065f46', 'T': '#d97706',
        };
        const firstChar = viewingUser.name.charAt(0).toUpperCase();
        const avatarBg = avatarColors[firstChar] || '#2563eb';

        return (
          <div className="user-detail-modal-overlay" onClick={() => setViewingUser(null)}>
            <div className="user-detail-modal-card" onClick={(e) => e.stopPropagation()}>

              {/* CLOSE BUTTON */}
              <button
                type="button"
                className="user-detail-close-btn"
                onClick={() => setViewingUser(null)}
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* AVATAR + NAME HEADER */}
              <div className="user-detail-hero">
                <div className="user-detail-avatar" style={{ background: `linear-gradient(135deg, ${avatarBg}cc, ${avatarBg})` }}>
                  {initials}
                </div>
                <div className="user-detail-hero-name">{viewingUser.name}</div>
                <div className="user-detail-hero-hostel">{viewingUser.hostelName}</div>
                <span className={`user-detail-status-badge ${viewingUser.status.toLowerCase()}`}>
                  <span style={{ fontSize: '9px' }}>●</span> {viewingUser.status}
                </span>
              </div>

              {/* INFO ROWS */}
              <div className="user-detail-info-list">

                {/* Mobile */}
                <div className="user-detail-info-row">
                  <div className="user-detail-info-icon-wrap blue-icon">
                    <Phone size={16} />
                  </div>
                  <div className="user-detail-info-content">
                    <div className="user-detail-info-label">Mobile Number</div>
                    <div className="user-detail-info-value">{viewingUser.mobile}</div>
                  </div>
                </div>

                {/* Email */}
                <div className="user-detail-info-row">
                  <div className="user-detail-info-icon-wrap purple-icon">
                    <Mail size={16} />
                  </div>
                  <div className="user-detail-info-content">
                    <div className="user-detail-info-label">Email Address</div>
                    <div className="user-detail-info-value" style={{ wordBreak: 'break-all' }}>{viewingUser.email}</div>
                  </div>
                </div>

                {/* Room & Block */}
                <div className="user-detail-info-row">
                  <div className="user-detail-info-icon-wrap green-icon">
                    <Home size={16} />
                  </div>
                  <div className="user-detail-info-content">
                    <div className="user-detail-info-label">Room &amp; Block</div>
                    <div className="user-detail-info-value">Room {viewingUser.roomNumber} · {viewingUser.block}</div>
                  </div>
                </div>

                {/* Registration Date */}
                <div className="user-detail-info-row">
                  <div className="user-detail-info-icon-wrap amber-icon">
                    <Calendar size={16} />
                  </div>
                  <div className="user-detail-info-content">
                    <div className="user-detail-info-label">Registration Date</div>
                    <div className="user-detail-info-value">{viewingUser.joinDate}</div>
                  </div>
                </div>

              </div>

              {/* CLOSE BUTTON */}
              <button
                type="button"
                className="user-detail-close-full-btn"
                onClick={() => setViewingUser(null)}
              >
                Close Details
              </button>
            </div>
          </div>
        );
      })()}

    </div>
  );
};

export default UsersHistoryPage;
